


/**
 * LEC PRONOS - Sync LoL Esports API -> Supabase
 */
 
import { createClient } from "@supabase/supabase-js";
 
var SUPABASE_URL = process.env.SUPABASE_URL;
var SUPABASE_KEY = process.env.SUPABASE_KEY;
var ESPORTS_API = "https://esports-api.lolesports.com/persisted/gw";
var API_KEY = "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z";
 
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_KEY env vars");
  process.exit(1);
}
 
var supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
 
var TEAM_MAP = {
  "G2": "G2 Esports", "SK": "SK Gaming", "TH": "Heretics",
  "NAVI": "NaVi", "GX": "GIANTX", "FNC": "Fnatic",
  "SHFT": "Shifters", "VIT": "Vitality", "KC": "KCorp",
  "MKOI": "KOI", "LR": "Los Ratones",
};
 
var LEAGUES_TO_SYNC = [
  { leagueId: "98767991302996019", seasonName: "LEC", boFilter: 3 },
];
 
function teamName(code) { return TEAM_MAP[code] || code; }
 
function extractWeek(blockName) {
  if (!blockName) return null;
  var m = blockName.match(/[Ss]emaine\s*(\d+)/);
  if (!m) m = blockName.match(/[Ww]eek\s*(\d+)/);
  return m ? parseInt(m[1]) : null;
}
 
function formatDay(startTime) {
  var d = new Date(startTime);
  var days = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
  var dd = String(d.getUTCDate()).padStart(2, "0");
  var mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return days[d.getUTCDay()] + " " + dd + "/" + mm;
}
 
async function fetchEsportsSchedule(leagueId) {
  var url = ESPORTS_API + "/getSchedule?hl=fr-FR&leagueId=" + leagueId;
  var resp = await fetch(url, { headers: { "x-api-key": API_KEY } });
  var data = await resp.json();
  return data.data.schedule.events || [];
}
 
function findExistingMatch(existing, t1name, t2name, week) {
  return existing.find(function(m) {
    var same = m.team1 === t1name && m.team2 === t2name;
    var rev = m.team1 === t2name && m.team2 === t1name;
    return (same || rev) && m.week === week;
  });
}
 
async function getMaxMatchId() {
  var res = await supabase.from("matches").select("id").order("id", { ascending: false }).limit(1);
  return (res.data && res.data[0]) ? res.data[0].id : 0;
}
 
async function syncLeague(leagueId, seasonName, boFilter) {
  console.log("--- Syncing " + seasonName + " ---");
 
  var events = await fetchEsportsSchedule(leagueId);
 
  var boMatches = events.filter(function(e) {
    if (e.type !== "match" || !e.match) return false;
    if (e.match.strategy.count !== boFilter) return false;
    return !!extractWeek(e.blockName);
  });
 
  console.log("Found " + boMatches.length + " Bo" + boFilter + " matches from API");
 
  var seasonRes = await supabase.from("seasons").select("*").ilike("name", "%" + seasonName + "%Spring%");
  var season = seasonRes.data && seasonRes.data[0];
  if (!season) { console.log("No season found, skipping"); return; }
  console.log("Using season: " + season.name + " (id=" + season.id + ")");
 
  var existRes = await supabase.from("matches").select("*").eq("season_id", season.id).order("id");
  var existing = existRes.data || [];
  console.log("Existing matches in DB: " + existing.length);
 
  var updated = 0, added = 0, skipped = 0;
 
  for (var i = 0; i < boMatches.length; i++) {
    var evt = boMatches[i];
    var t1name = teamName(evt.match.teams[0].code);
    var t2name = teamName(evt.match.teams[1].code);
    var week = extractWeek(evt.blockName);
    var day = formatDay(evt.startTime);
    var startTime = evt.startTime;
 
    var found = findExistingMatch(existing, t1name, t2name, week);
 
    if (evt.state === "completed") {
      var t1wins = evt.match.teams[0].result.gameWins;
      var t2wins = evt.match.teams[1].result.gameWins;
      var winner = t1wins > t2wins ? t1name : t2name;
 
      if (found) {
        if (!found.winner) {
          var score = found.team1 === t1name ? t1wins + "-" + t2wins : t2wins + "-" + t1wins;
          await supabase.from("matches").update({
            winner: winner, score: score, start_time: startTime
          }).eq("id", found.id);
          console.log("  Updated: " + found.team1 + " vs " + found.team2 + " -> " + winner + " " + score);
          updated++;
        } else if (!found.start_time) {
          await supabase.from("matches").update({ start_time: startTime }).eq("id", found.id);
          skipped++;
        } else {
          skipped++;
        }
      } else {
        var maxId = await getMaxMatchId();
        await supabase.from("matches").insert({
          id: maxId + 1, season_id: season.id, week: week, day: day,
          team1: t1name, team2: t2name, bo: boFilter,
          cote1: 1.5, cote2: 2.5, winner: winner,
          score: t1wins + "-" + t2wins, start_time: startTime
        });
        console.log("  Added completed: " + t1name + " vs " + t2name + " (W" + week + ")");
        added++;
      }
    } else if (evt.state === "unstarted") {
      if (!found) {
        var maxId2 = await getMaxMatchId();
        await supabase.from("matches").insert({
          id: maxId2 + 1, season_id: season.id, week: week, day: day,
          team1: t1name, team2: t2name, bo: boFilter,
          cote1: 1.5, cote2: 2.5, winner: null, score: null,
          start_time: startTime
        });
        console.log("  Added upcoming: " + t1name + " vs " + t2name + " (W" + week + ")");
        added++;
      } else if (!found.start_time) {
        await supabase.from("matches").update({ start_time: startTime }).eq("id", found.id);
        skipped++;
      } else {
        skipped++;
      }
    }
  }
 
  console.log("Done: " + updated + " updated, " + added + " added, " + skipped + " up to date\n");
}
 
async function main() {
  console.log("=== LEC PRONOS - Esports Sync ===");
  console.log("Time: " + new Date().toISOString() + "\n");
  for (var i = 0; i < LEAGUES_TO_SYNC.length; i++) {
    var l = LEAGUES_TO_SYNC[i];
    await syncLeague(l.leagueId, l.seasonName, l.boFilter);
  }
  console.log("=== Sync complete ===");
}
 
main().catch(function(err) { console.error("Sync failed:", err); process.exit(1); });
 
