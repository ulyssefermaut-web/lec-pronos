/**
 * LEC PRONOS - Sync LoL Esports API -> Supabase
 * 
 * Ce script recupere les matchs et resultats depuis l'API LoL Esports
 * et met a jour la base Supabase automatiquement.
 * 
 * Ligue IDs:
 * - LEC: 98767991302996019
 * - LCK: 98767991310872058
 * - LFL: 105266103462388553
 * - Worlds: 98767975604431411
 * - MSI: 98767991325878492
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
 
/* Team code mapping: API code -> our team name */
var TEAM_MAP = {
  "G2": "G2 Esports",
  "SK": "SK Gaming",
  "TH": "Heretics",
  "NAVI": "NaVi",
  "GX": "GIANTX",
  "FNC": "Fnatic",
  "SHFT": "Shifters",
  "VIT": "Vitality",
  "KC": "KCorp",
  "MKOI": "KOI",
  "LR": "Los Ratones",
};
 
/* League configs */
var LEAGUES_TO_SYNC = [
  { leagueId: "98767991302996019", seasonName: "LEC", boFilter: 3 },
];
 
function teamName(code) {
  return TEAM_MAP[code] || code;
}
 
function extractWeek(blockName) {
  if (!blockName) return null;
  var m = blockName.match(/[Ss]emaine\s*(\d+)/);
  if (!m) {
    m = blockName.match(/[Ww]eek\s*(\d+)/);
  }
  return m ? parseInt(m[1]) : null;
}
 
function formatDay(startTime) {
  var d = new Date(startTime);
  var days = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
  var day = days[d.getUTCDay()];
  var dd = String(d.getUTCDate()).padStart(2, "0");
  var mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return day + " " + dd + "/" + mm;
}
 
async function fetchEsportsSchedule(leagueId) {
  var url = ESPORTS_API + "/getSchedule?hl=fr-FR&leagueId=" + leagueId;
  var resp = await fetch(url, {
    headers: { "x-api-key": API_KEY }
  });
  var data = await resp.json();
  return data.data.schedule.events || [];
}
 
/* Find a match in existing DB, checking both team orders */
function findExistingMatch(existing, t1name, t2name, week) {
  return existing.find(function(m) {
    var sameOrder = m.team1 === t1name && m.team2 === t2name;
    var reverseOrder = m.team1 === t2name && m.team2 === t1name;
    return (sameOrder || reverseOrder) && m.week === week;
  });
}
 
async function syncLeague(leagueId, seasonName, boFilter) {
  console.log("--- Syncing " + seasonName + " ---");
 
  /* 1. Fetch events from API */
  var events = await fetchEsportsSchedule(leagueId);
  
  /* Filter: only matches with the right Bo count AND a valid week number */
  var boMatches = events.filter(function(e) {
    if (e.type !== "match" || !e.match) return false;
    if (e.match.strategy.count !== boFilter) return false;
    var week = extractWeek(e.blockName);
    if (!week) return false;
    return true;
  });
 
  console.log("Found " + boMatches.length + " Bo" + boFilter + " matches with valid week from API");
 
  /* 2. Get season from Supabase */
  var seasonRes = await supabase.from("seasons").select("*").ilike("name", "%" + seasonName + "%Spring%");
  var season = seasonRes.data && seasonRes.data[0];
  if (!season) {
    console.log("No matching season found for " + seasonName + ", skipping");
    return;
  }
  console.log("Using season: " + season.name + " (id=" + season.id + ")");
 
  /* 3. Get existing matches from Supabase */
  var existRes = await supabase.from("matches").select("*").eq("season_id", season.id).order("id");
  var existing = existRes.data || [];
  console.log("Existing matches in DB: " + existing.length);
 
  var updated = 0;
  var added = 0;
  var skipped = 0;
 
  for (var i = 0; i < boMatches.length; i++) {
    var evt = boMatches[i];
    var t1code = evt.match.teams[0].code;
    var t2code = evt.match.teams[1].code;
    var t1name = teamName(t1code);
    var t2name = teamName(t2code);
    var week = extractWeek(evt.blockName);
    var day = formatDay(evt.startTime);
    var bo = evt.match.strategy.count;
 
    /* Find matching existing match (checks both team orders) */
    var found = findExistingMatch(existing, t1name, t2name, week);
 
    if (evt.state === "completed") {
      var t1wins = evt.match.teams[0].result.gameWins;
      var t2wins = evt.match.teams[1].result.gameWins;
      var winner = t1wins > t2wins ? t1name : t2name;
 
      if (found) {
        /* Update result only if not already set */
        if (!found.winner) {
          /* Build score in the order of our DB (team1-team2) */
          var score;
          if (found.team1 === t1name) {
            score = t1wins + "-" + t2wins;
          } else {
            score = t2wins + "-" + t1wins;
          }
          await supabase.from("matches").update({
            winner: winner,
            score: score
          }).eq("id", found.id);
          console.log("  Updated: " + found.team1 + " vs " + found.team2 + " -> " + winner + " " + score);
          updated++;
        } else {
          skipped++;
        }
      } else {
        /* New completed match not in DB - add it */
        var maxId = await getMaxMatchId();
        var newScore = t1wins + "-" + t2wins;
        await supabase.from("matches").insert({
          id: maxId + 1,
          season_id: season.id,
          week: week,
          day: day,
          team1: t1name,
          team2: t2name,
          bo: bo,
          cote1: 1.5,
          cote2: 2.5,
          winner: winner,
          score: newScore
        });
        console.log("  Added completed: " + t1name + " vs " + t2name + " (W" + week + ") -> " + winner + " " + newScore);
        added++;
      }
    } else if (evt.state === "unstarted") {
      if (!found) {
        /* New upcoming match - add it */
        var maxId2 = await getMaxMatchId();
        await supabase.from("matches").insert({
          id: maxId2 + 1,
          season_id: season.id,
          week: week,
          day: day,
          team1: t1name,
          team2: t2name,
          bo: bo,
          cote1: 1.5,
          cote2: 2.5,
          winner: null,
          score: null
        });
        console.log("  Added upcoming: " + t1name + " vs " + t2name + " (W" + week + ")");
        added++;
      } else {
        skipped++;
      }
    }
  }
 
  console.log("Done: " + updated + " updated, " + added + " added, " + skipped + " already up to date\n");
}
 
async function getMaxMatchId() {
  var res = await supabase.from("matches").select("id").order("id", { ascending: false }).limit(1);
  return (res.data && res.data[0]) ? res.data[0].id : 0;
}
 
async function main() {
  console.log("=== LEC PRONOS - Esports Sync ===");
  console.log("Time: " + new Date().toISOString());
  console.log("");
 
  for (var i = 0; i < LEAGUES_TO_SYNC.length; i++) {
    var league = LEAGUES_TO_SYNC[i];
    await syncLeague(league.leagueId, league.seasonName, league.boFilter);
  }
 
  console.log("=== Sync complete ===");
}
 
main().catch(function(err) {
  console.error("Sync failed:", err);
  process.exit(1);
});
 
