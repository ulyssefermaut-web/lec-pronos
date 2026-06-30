import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

/* ============================================================
   LEC PRONOS - v1 (reconstruction propre)
   Identite neon d'origine. Coeur : pronostiquer + se comparer.
   ============================================================ */

const supabase = createClient(
  "https://wokhcfcbkbvekcvyltci.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indva2hjZmNia2J2ZWtjdnlsdGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Mjk4ODcsImV4cCI6MjA5MjIwNTg4N30.oe7dXTkxKje1w6ClLDiAjuyITOaWYU1jjzRyZ03ORU4"
);

/* ----- Theme ----- */
const C = {
  bg: "#06060e", s1: "#0c0c1a", s2: "#131328", bd: "#1e1e3a",
  tp: "#e8e8f8", td: "#6a6a8a", n1: "#00f0ff", n2: "#a855f7",
  n3: "#f43f5e", mint: "#3df0c8",
};
const FD = "'Chakra Petch', sans-serif";
const FB = "'DM Sans', sans-serif";

/* ----- Teams (abbreviation + couleur ; logos ajoutables plus tard) ----- */
const TEAMS = {
  "G2 Esports": { a: "G2", c: "#00f0ff", logo: "https://static.lolesports.com/teams/G2-FullonDark.png" },
  "SK Gaming": { a: "SK", c: "#0088cc", logo: "https://static.lolesports.com/teams/1643979272144_SK_Monochrome.png" },
  "Heretics": { a: "TH", c: "#ff4655", logo: "https://static.lolesports.com/teams/1672933861879_Heretics-Full-Color.png" },
  "NaVi": { a: "NAVI", c: "#ffd700", logo: "https://static.lolesports.com/teams/1752746833620_NAVI_FullColor.png" },
  "GIANTX": { a: "GX", c: "#00c8ff", logo: "https://static.lolesports.com/teams/1765897105091_GIANTX-logotype-white.png" },
  "Fnatic": { a: "FNC", c: "#ff5900", logo: "https://static.lolesports.com/teams/1631819669150_fnc-2021-worlds.png" },
  "Shifters": { a: "SHFT", c: "#6c5ce7", logo: "https://static.lolesports.com/teams/1765897071435_600px-Shifters_allmode.png" },
  "Vitality": { a: "VIT", c: "#fee800", logo: "https://static.lolesports.com/teams/1675865863968_Vitality_FullColor.png" },
  "KCorp": { a: "KC", c: "#4a90d9", logo: "https://static.lolesports.com/teams/1704714951336_KC.png" },
  "Karmine Corp": { a: "KC", c: "#00bfff", logo: "https://static.lolesports.com/teams/1704714951336_KC.png" },
  "KOI": { a: "KOI", c: "#00a6ff", logo: "https://static.lolesports.com/teams/1734012609283_MKOI_FullColor_Blue.png" },
  "Los Ratones": { a: "LR", c: "#c87533", logo: "https://static.lolesports.com/teams/1736206905390_LR1.png" },
  "Top Esports": { a: "TES", c: "#d20a2e" }, "T1": { a: "T1", c: "#e2012d" },
  "Hanwha Life": { a: "HLE", c: "#ff7900" }, "Bilibili Gaming": { a: "BLG", c: "#2a4bd7" },
  "LYON": { a: "LYON", c: "#1f8fff" }, "FURIA": { a: "FUR", c: "#111111" },
  "Team Secret Whales": { a: "TSW", c: "#0fb5a0" }, "Revolve Deep Cross": { a: "RDCG", c: "#e23b6d" },
  "Team Liquid": { a: "TL", c: "#0a1432" },
};

/* Participants par competition (pour filtrer les suggestions a la creation d'un match) */
const ROSTERS = {
  "MSI 2026": ["G2 Esports", "Top Esports", "Bilibili Gaming", "Hanwha Life", "T1", "LYON", "FURIA", "Team Secret Whales", "Karmine Corp", "Revolve Deep Cross", "Team Liquid"],
};
const PALETTE = ["#00f0ff", "#a855f7", "#f43f5e", "#22d3ee", "#fbbf24", "#10b981", "#f97316", "#ec4899"];
function teamInfo(name) {
  if (TEAMS[name]) return TEAMS[name];
  const a = (name || "?").replace(/[^A-Za-z0-9 ]/g, "").split(" ").map(w => w[0]).join("").slice(0, 4).toUpperCase() || "?";
  let h = 0;
  for (let i = 0; i < (name || "").length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return { a, c: PALETTE[h % PALETTE.length] };
}

/* ----- Scoring ----- */
function calcPts(m, pr) {
  if (!pr || !pr.winner || !m.winner) return 0;
  if (pr.winner !== m.winner) return 0;
  const base = pr.winner === m.team1 ? m.cote1 : m.cote2;
  return pr.score && pr.score === m.score ? base * 2 : base;
}
/* score stocke en ordre team1-team2 ; ici on affiche du point de vue du vainqueur */
function asWinnerScore(winner, score, team1) {
  if (!score) return "";
  if (winner === team1) return score;
  const p = score.split("-");
  return p[1] + "-" + p[0];
}
/* options affichees du point de vue du vainqueur */
function winnerScoreOptions(bo) {
  return bo === 5 ? ["3-0", "3-1", "3-2"] : ["2-0", "2-1"];
}
/* convertit le score "vainqueur" en ordre team1-team2 pour le stockage */
function toStoredScore(winnerScore, winnerIsTeam1) {
  if (winnerIsTeam1) return winnerScore;
  const p = winnerScore.split("-");
  return p[1] + "-" + p[0];
}

function fmtCountdown(ms) {
  if (ms <= 0) return "00:00:00";
  const t = Math.floor(ms / 1000);
  const d = Math.floor(t / 86400);
  const h = Math.floor((t % 86400) / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
  const p = n => String(n).padStart(2, "0");
  return (d > 0 ? d + "j " : "") + p(h) + ":" + p(m) + ":" + p(s);
}

/* ============================================================ */

export default function App() {
  const [me, setMe] = useState(() => { try { return localStorage.getItem("lec_me") || null; } catch { return null; } });
  const [tab, setTab] = useState("matchs");
  const [selectedId, setSelectedId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    loadData();
    const ch = supabase.channel("lec")
      .on("postgres_changes", { event: "*", schema: "public", table: "preds" }, loadData)
      .on("postgres_changes", { event: "*", schema: "public", table: "matches" }, loadData)
      .subscribe();
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => { supabase.removeChannel(ch); clearInterval(t); };
  }, []);

  function loadData() {
    Promise.all([
      supabase.from("players").select("*").order("id"),
      supabase.from("matches").select("*").order("id"),
      supabase.from("preds").select("*"),
      supabase.from("seasons").select("*").order("id"),
    ]).then(r => {
      const pData = r[0].data || [], mData = r[1].data || [], prData = r[2].data || [], sData = r[3].data || [];
      setPlayers(pData.map(p => ({ name: p.name, color: p.color || "#00f0ff" })));
      setMatches(mData.map(m => {
        const preds = {};
        prData.forEach(pr => { if (pr.match_id === m.id) preds[pr.player_name] = { winner: pr.winner, score: pr.score }; });
        return { id: m.id, week: m.week, day: m.day, team1: m.team1, team2: m.team2, bo: m.bo, cote1: m.cote1, cote2: m.cote2, winner: m.winner, score: m.score, season_id: m.season_id, start_time: m.start_time, preds };
      }));
      setSeasons(sData.length ? sData : [{ id: 1, name: "LEC", short_name: "LEC", status: "active" }]);
      setLoading(false);
    });
  }

  function savePred(matchId, field, value) {
    supabase.from("preds").select("*").eq("match_id", matchId).eq("player_name", me).then(res => {
      const exists = res.data && res.data.length > 0;
      if (exists) {
        supabase.from("preds").update({ [field]: value }).eq("match_id", matchId).eq("player_name", me).then(loadData);
      } else {
        const ins = { match_id: matchId, player_name: me, winner: null, score: null, [field]: value };
        supabase.from("preds").insert(ins).then(loadData);
      }
    });
    setMatches(prev => prev.map(m => m.id !== matchId ? m : { ...m, preds: { ...m.preds, [me]: { ...(m.preds[me] || { winner: null, score: null }), [field]: value } } }));
  }

  function login(name) { try { localStorage.setItem("lec_me", name); } catch {} setMe(name); }
  function logout() { try { localStorage.removeItem("lec_me"); } catch {} setMe(null); }

  /* ----- admin (proprietaire) ----- */
  const isAdmin = me === "Ulysse";
  async function nextId(table) {
    const r = await supabase.from(table).select("id").order("id", { ascending: false }).limit(1);
    return ((r.data && r.data[0] && r.data[0].id) || 0) + 1;
  }
  async function createSeason(name, short) {
    const id = await nextId("seasons");
    await supabase.from("seasons").insert({ id, name, short_name: short, status: "inactive" });
    loadData();
  }
  async function toggleSeason(id, makeActive) {
    await supabase.from("seasons").update({ status: makeActive ? "active" : "inactive" }).eq("id", id);
    loadData();
  }
  async function addMatch(d) {
    const id = await nextId("matches");
    await supabase.from("matches").insert({ id, season_id: d.season_id, week: d.week, day: d.day, team1: d.team1, team2: d.team2, bo: d.bo, cote1: d.cote1, cote2: d.cote2, winner: null, score: null, start_time: d.start_time });
    loadData();
  }
  async function setResult(matchId, winner, score) {
    await supabase.from("matches").update({ winner, score }).eq("id", matchId);
    loadData();
  }
  async function deleteMatch(matchId) {
    await supabase.from("matches").delete().eq("id", matchId);
    loadData();
  }

  /* ----- competitions actives + selection ----- */
  const activeSeasons = seasons.filter(s => s.status === "active");
  const visibleSeasons = activeSeasons.length ? activeSeasons : (seasons.length ? [seasons[seasons.length - 1]] : [{ id: 1, short_name: "LEC", name: "LEC", status: "active" }]);
  const season = visibleSeasons.find(s => s.id === selectedId) || visibleSeasons[0];
  const seasonMatches = matches.filter(m => m.season_id === season.id || (!m.season_id && season.id === 1));

  /* ----- equipes proposees pour la competition active ----- */
  const usedTeams = [...new Set(seasonMatches.flatMap(m => [m.team1, m.team2]))];
  const roster = ROSTERS[season.name] || ROSTERS[season.short_name];
  const compTeams = roster || (usedTeams.length ? usedTeams : Object.keys(TEAMS));

  /* ----- reveal anti-spoil : un resultat se devoile quand le 1er match de la semaine suivante a commence ----- */
  const enriched = seasonMatches.map(m => {
    const started = m.start_time ? now >= new Date(m.start_time).getTime() : false;
    if (!m.winner) return { ...m, locked: started, revealed: false };
    const nextWk = seasonMatches.filter(x => x.week === m.week + 1 && x.start_time);
    if (!nextWk.length) return { ...m, locked: true, revealed: true };
    const earliest = Math.min(...nextWk.map(x => new Date(x.start_time).getTime()));
    return { ...m, locked: true, revealed: now >= earliest };
  });

  /* ----- classement (matchs devoiles uniquement) ----- */
  const standings = players.map(p => {
    let pts = 0, perfects = 0;
    enriched.forEach(m => {
      if (!m.revealed || !m.winner) return;
      const pr = m.preds[p.name];
      const got = calcPts(m, pr);
      pts += got;
      if (got > 0 && pr.score === m.score) perfects++;
    });
    return { name: p.name, color: p.color, pts: Math.round(pts * 100) / 100, perfects };
  }).sort((a, b) => b.pts - a.pts);

  const playerToken = name => "P" + (players.findIndex(p => p.name === name) + 1 || 1);

  if (loading) return <Splash />;
  if (!me) return <Login players={players} onLogin={login} />;

  const upcoming = enriched.filter(m => !m.winner || !m.revealed).sort((a, b) => new Date(a.start_time || 0) - new Date(b.start_time || 0));
  const done = enriched.filter(m => m.winner && m.revealed).sort((a, b) => new Date(b.start_time || 0) - new Date(a.start_time || 0));

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.tp, fontFamily: FB, maxWidth: 480, margin: "0 auto", paddingBottom: 88 }}>
      <Header me={me} token={playerToken(me)} comps={visibleSeasons} current={season} onSelect={setSelectedId} onLogout={logout} />
      <div style={{ padding: "0 14px" }}>
        {tab === "matchs" && (
          <MatchesScreen upcoming={upcoming} done={done} me={me} players={players} now={now} onSave={savePred} playerToken={playerToken} />
        )}
        {tab === "classement" && (
          <Classement standings={standings} me={me} playerToken={playerToken} />
        )}
        {tab === "profil" && <Profil me={me} token={playerToken(me)} standings={standings} onLogout={logout} />}
        {tab === "admin" && isAdmin && (
          <Admin seasons={seasons} activeId={season.id} compTeams={compTeams} matches={enriched}
            onCreateSeason={createSeason} onToggle={toggleSeason} onAddMatch={addMatch} onSetResult={setResult} onDeleteMatch={deleteMatch} />
        )}
      </div>
      <Tabs tab={tab} setTab={setTab} isAdmin={isAdmin} />
    </div>
  );
}

/* ============================================================ */

function Splash() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.n1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, letterSpacing: 3 }}>
      <span style={{ animation: "pulse 1.2s ease-in-out infinite" }}>CHARGEMENT…</span>
      <style>{"@keyframes pulse{50%{opacity:.4}}"}</style>
    </div>
  );
}

function Login({ players, onLogin }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.tp, fontFamily: FB, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, maxWidth: 480, margin: "0 auto" }}>
      <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 30, letterSpacing: 2 }}>
        LEC <span style={{ color: C.n1, textShadow: "0 0 14px rgba(0,240,255,.55)" }}>PRONOS</span>
      </div>
      <div style={{ color: C.td, fontFamily: FD, letterSpacing: 4, fontSize: 12, margin: "8px 0 40px" }}>QUI ES-TU ?</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 340 }}>
        {players.map((p, i) => (
          <button key={p.name} onClick={() => onLogin(p.name)}
            style={{ background: C.s1, border: "1px solid " + C.bd, borderRadius: 14, padding: "18px 10px", color: C.tp, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontFamily: FB }}>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, color: p.color }}>P{i + 1}</span>
            <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 16 }}>{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Header({ me, token, comps, current, onSelect, onLogout }) {
  return (
    <div style={{ padding: "16px 14px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, letterSpacing: 1 }}>
          LEC <span style={{ color: C.n1, textShadow: "0 0 10px rgba(0,240,255,.5)" }}>PRONOS</span>
        </div>
        <button onClick={onLogout} title="Changer de joueur"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer" }}>
          <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 9, color: C.n2, letterSpacing: 1 }}>{token}</span>
          <span style={{ width: 31, height: 31, borderRadius: "50%", background: C.s2, border: "1.5px solid " + C.n2, color: C.n2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontWeight: 700, fontSize: 13, boxShadow: "0 0 10px rgba(168,85,247,.4)" }}>{me[0]}</span>
        </button>
      </div>
      {comps.length > 1 ? (
        <div style={{ display: "flex", gap: 7, marginTop: 12, overflowX: "auto" }}>
          {comps.map(c => {
            const on = c.id === current.id;
            return (
              <button key={c.id} onClick={() => onSelect(c.id)}
                style={{ flexShrink: 0, fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: 1, padding: "6px 12px", borderRadius: 20, cursor: "pointer",
                  border: "1px solid " + (on ? C.n1 : C.bd), background: on ? "rgba(0,240,255,.08)" : "transparent", color: on ? C.n1 : C.td }}>
                {(c.short_name || c.name).toUpperCase()}
              </button>
            );
          })}
        </div>
      ) : (
        <div style={{ fontFamily: FD, fontSize: 11, letterSpacing: 2, color: C.td, marginTop: 4 }}>{((current.short_name || current.name) || "").toUpperCase()}</div>
      )}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, margin: "6px 0 12px" }}>
      <b style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: 3, color: C.n1 }}>{children}</b>
      <i style={{ flex: 1, height: 1, background: C.bd }} />
    </div>
  );
}

function MatchesScreen({ upcoming, done, me, players, now, onSave, playerToken }) {
  return (
    <div>
      <SectionTitle>{upcoming.length ? "À VENIR" : "AUCUN MATCH À VENIR"}</SectionTitle>
      {upcoming.map(m => (
        <MatchCard key={m.id} m={m} me={me} players={players} now={now} onSave={onSave} playerToken={playerToken} />
      ))}
      {done.length > 0 && <SectionTitle>TERMINÉS</SectionTitle>}
      {done.map(m => <ResultCard key={m.id} m={m} me={me} />)}
    </div>
  );
}

function Badge({ name, size = 38 }) {
  const ti = teamInfo(name);
  const [err, setErr] = useState(false);
  if (ti.logo && !err) {
    return <img src={ti.logo} alt={name} onError={() => setErr(true)}
      style={{ width: size, height: size, borderRadius: size * 0.2, objectFit: "contain", background: "#0a0a16", flexShrink: 0 }} />;
  }
  const fs = ti.a.length >= 4 ? size * 0.26 : size * 0.32;
  return (
    <span style={{ width: size, height: size, borderRadius: size * 0.24, background: ti.c, color: "#06060e", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontWeight: 700, fontSize: fs, flexShrink: 0 }}>{ti.a}</span>
  );
}

function RiskTag({ cote }) {
  const ris = cote >= 2.0;
  return (
    <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, padding: "1px 6px", borderRadius: 4, letterSpacing: .5,
      background: ris ? "rgba(244,63,94,.16)" : "rgba(0,240,255,.12)", color: ris ? C.n3 : C.n1 }}>
      {ris ? "RISQUE" : "FAVORI"}
    </span>
  );
}

function MatchCard({ m, me, players, now, onSave, playerToken }) {
  const myPred = m.preds[me] || { winner: null, score: null };
  const locked = m.locked;
  const startMs = m.start_time ? new Date(m.start_time).getTime() : null;
  const cd = startMs ? fmtCountdown(startMs - now) : null;

  const [openWinner, setOpenWinner] = useState(myPred.winner);
  useEffect(() => { setOpenWinner(myPred.winner); }, [myPred.winner]);

  const winnerCote = w => (w === m.team1 ? m.cote1 : m.cote2);
  const betCount = players.filter(p => m.preds[p.name] && m.preds[p.name].winner).length;

  function pickWinner(team) {
    if (locked) return;
    onSave(m.id, "winner", team);
    onSave(m.id, "score", null);
    setOpenWinner(team);
  }
  function pickScore(ws) {
    if (locked) return;
    const stored = toStoredScore(ws, openWinner === m.team1);
    onSave(m.id, "score", stored);
  }

  const card = { position: "relative", background: C.s1, border: "1px solid " + C.bd, borderRadius: 14, padding: 15, marginBottom: 12 };
  const teamBtn = sel => ({ display: "flex", alignItems: "center", gap: 11, padding: 10, width: "100%", textAlign: "left", marginBottom: 9, cursor: locked ? "default" : "pointer", fontFamily: FB,
    borderRadius: 11, background: "#0a0a16", transition: ".15s",
    border: "1.5px solid " + (sel ? C.n1 : C.bd), boxShadow: sel ? "0 0 16px rgba(0,240,255,.3)" : "none",
    opacity: openWinner && !sel ? .4 : 1 });

  return (
    <div style={card}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 13 }}>
        <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: 1, color: C.td }}>S{m.week}{m.day ? " · " + m.day : ""}</span>
        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 10, color: C.bg, background: C.n1, padding: "2px 7px", borderRadius: 4 }}>BO{m.bo}</span>
        {cd && <span style={{ marginLeft: "auto", fontFamily: FD, fontWeight: 600, fontSize: 11, color: locked ? C.n3 : C.n2, display: "flex", alignItems: "center", gap: 5 }}>{locked ? "EN ATTENTE" : "⏱ " + cd}</span>}
      </div>

      {[m.team1, m.team2].map((team, idx) => {
        const sel = openWinner === team;
        return (
          <div key={team}>
            <button disabled={locked} onClick={() => pickWinner(team)} style={teamBtn(sel)}>
              <Badge name={team} />
              <span>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 7 }}>{team} <RiskTag cote={winnerCote(team)} /></span>
              </span>
              <span style={{ marginLeft: "auto", textAlign: "right" }}>
                <b style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: sel ? C.n1 : C.tp }}>{winnerCote(team).toFixed(2)}</b>
                <span style={{ display: "block", fontFamily: FD, fontSize: 9, letterSpacing: 1, color: C.td, marginTop: 2 }}>COTE</span>
              </span>
            </button>
            {idx === 0 && <div style={{ textAlign: "center", fontFamily: FD, fontWeight: 600, fontSize: 9, letterSpacing: 3, color: "#3a3a55", margin: "1px 0 8px" }}>— VS —</div>}
          </div>
        );
      })}

      {!openWinner && !locked && (
        <div style={{ fontFamily: FD, fontWeight: 500, fontSize: 11, letterSpacing: 1, color: C.td, textAlign: "center", marginTop: 12 }}>CHOISIS LE VAINQUEUR</div>
      )}

      {openWinner && (
        <div style={{ marginTop: 13 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 11px", borderRadius: 9, background: "rgba(61,240,200,.07)", border: "1px solid rgba(61,240,200,.4)" }}>
            <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, color: C.mint, display: "flex", alignItems: "center", gap: 6 }}>
              GAIN POTENTIEL{myPred.score && <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 10, color: C.bg, background: C.mint, padding: "1px 6px", borderRadius: 4 }}>SCORE EXACT ×2</span>}
            </span>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: C.mint, textShadow: "0 0 8px rgba(61,240,200,.45)" }}>
              +{((myPred.score ? 2 : 1) * winnerCote(openWinner)).toFixed(2)}
            </span>
          </div>

          {!locked && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(" + winnerScoreOptions(m.bo).length + ",1fr)", gap: 8, marginTop: 10 }}>
              {winnerScoreOptions(m.bo).map(ws => {
                const stored = toStoredScore(ws, openWinner === m.team1);
                const sel = myPred.score === stored;
                return (
                  <button key={ws} onClick={() => pickScore(ws)}
                    style={{ padding: "12px 0", borderRadius: 9, cursor: "pointer", fontFamily: FD, fontWeight: 700, fontSize: 14,
                      border: "1.5px solid " + (sel ? C.n1 : C.bd), background: sel ? C.n1 : "#0a0a16", color: sel ? C.bg : C.tp,
                      boxShadow: sel ? "0 0 14px rgba(0,240,255,.4)" : "none" }}>{ws}</button>
                );
              })}
            </div>
          )}

          {myPred.winner && myPred.score && (
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 13, borderRadius: 10, background: "rgba(0,240,255,.06)", border: "1px solid " + C.n1, padding: 11, boxShadow: "0 0 16px rgba(0,240,255,.2)" }}>
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: C.n1, color: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>✓</span>
              <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 13, color: C.n1, flex: 1 }}>
                {myPred.winner} · {asWinnerScore(myPred.winner, myPred.score, m.team1)}
                <small style={{ display: "block", fontFamily: FB, color: C.td, fontWeight: 400, fontSize: 11, marginTop: 3 }}>{locked ? "Prono verrouillé" : "Modifiable jusqu'au coup d'envoi"}</small>
              </span>
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 14, paddingTop: 12, borderTop: "1px solid #14142a" }}>
        <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, letterSpacing: 2, color: "#3a3a55" }}>CREW</span>
        {players.map(p => {
          const bet = m.preds[p.name] && m.preds[p.name].winner;
          const you = p.name === me;
          return (
            <span key={p.name} title={p.name} style={{ width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontWeight: 700, fontSize: 9, position: "relative",
              border: "1.5px solid " + (bet ? C.n1 : you ? C.n2 : C.bd), color: bet ? C.n1 : you ? C.n2 : C.td }}>
              {playerToken(p.name)}
            </span>
          );
        })}
        <span style={{ marginLeft: "auto", fontFamily: FD, fontWeight: 600, fontSize: 10, color: C.td }}>{betCount}/{players.length} PARIÉ</span>
      </div>
    </div>
  );
}

function ResultCard({ m, me }) {
  const pr = m.preds[me] || { winner: null, score: null };
  const pts = calcPts(m, pr);
  const perfect = pts > 0 && pr.score === m.score;
  const win = t => m.winner === t;
  return (
    <div style={{ background: C.s1, border: "1px solid " + C.bd, borderRadius: 14, padding: 13, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 11 }}>
        <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, color: C.td }}>S{m.week}{m.day ? " · " + m.day : ""}</span>
        <span style={{ marginLeft: "auto", fontFamily: FD, fontWeight: 700, fontSize: 14, color: perfect ? C.mint : pts > 0 ? C.n1 : C.td }}>
          {pr.winner ? (pts > 0 ? "+" + (Math.round(pts * 100) / 100) + (perfect ? " ★" : "") : "+0") : "—"}
        </span>
      </div>
      {[m.team1, m.team2].map(team => (
        <div key={team} style={{ display: "flex", alignItems: "center", gap: 11, padding: "7px 0", opacity: win(team) ? 1 : .5 }}>
          <Badge name={team} size={30} />
          <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 14, color: win(team) ? C.n1 : C.tp }}>{team}</span>
          {win(team) && <span style={{ fontFamily: FD, fontSize: 10, color: C.n1, letterSpacing: 1 }}>VAINQUEUR</span>}
          <span style={{ marginLeft: "auto", fontFamily: FD, fontWeight: 700, fontSize: 15, color: win(team) ? C.n1 : C.td }}>{asWinnerScore(m.winner, m.score, m.team1).split("-")[win(team === m.team1 ? m.team1 : m.team2) ? 0 : 1] || ""}</span>
        </div>
      ))}
      {pr.winner && (
        <div style={{ marginTop: 9, paddingTop: 9, borderTop: "1px solid #14142a", fontFamily: FB, fontSize: 12, color: C.td }}>
          Ton prono : <b style={{ color: pr.winner === m.winner ? C.n1 : C.n3 }}>{pr.winner}</b>{pr.score ? " " + asWinnerScore(pr.winner, pr.score, m.team1) : ""}
        </div>
      )}
    </div>
  );
}

function Classement({ standings, me, playerToken }) {
  const max = Math.max(1, ...standings.map(s => s.pts));
  const myIdx = standings.findIndex(s => s.name === me);
  const target = myIdx > 0 ? standings[myIdx - 1] : null;
  const gap = target ? Math.round((target.pts - standings[myIdx].pts) * 100) / 100 : 0;
  const rankColor = i => [C.n1, "#22d3ee", C.n2, C.td][i] || C.td;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 9, margin: "8px 0 14px" }}>
        <b style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: C.n1, display: "flex", alignItems: "center", gap: 7 }}>🏆 HIGH SCORES</b>
        <i style={{ flex: 1, height: 1, background: C.bd }} />
      </div>

      {standings.map((s, i) => {
        const you = s.name === me;
        return (
          <div key={s.name} style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, padding: "11px 12px 13px", background: C.s1, borderRadius: 12, marginBottom: 9,
            border: "1.5px solid " + (you ? C.n1 : C.bd), boxShadow: you ? "0 0 14px rgba(0,240,255,.18)" : "none" }}>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 15, width: 22, textAlign: "center", color: rankColor(i) }}>{i + 1}</span>
            <span style={{ width: 34, height: 34, borderRadius: "50%", border: "1.5px solid " + (you ? C.n1 : C.bd), color: you ? C.n1 : C.td, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontWeight: 700, fontSize: 11 }}>{s.name.slice(0, 3).toUpperCase()}</span>
            <span>
              <b style={{ fontFamily: FD, fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 7 }}>
                {s.name} {i === 0 && <span style={{ color: "#ffd700" }}>👑</span>}
                {you && <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 10, color: C.bg, background: C.n1, padding: "0 5px", borderRadius: 3 }}>TOI</span>}
              </b>
              <span style={{ fontFamily: FD, fontSize: 11, color: C.mint, marginTop: 3, display: "block" }}>{s.perfects} PERFECT{s.perfects > 1 ? "S" : ""}</span>
            </span>
            <span style={{ marginLeft: "auto", textAlign: "right" }}>
              <b style={{ fontFamily: FD, fontWeight: 700, fontSize: 15, color: you ? C.n1 : C.tp }}>{s.pts}</b>
              <span style={{ display: "block", fontFamily: FD, fontSize: 10, color: C.td, marginTop: 2 }}>PTS</span>
            </span>
            <span style={{ position: "absolute", left: 0, bottom: 0, height: 3, borderRadius: 2, width: (s.pts / max * 100) + "%", background: rankColor(i) }} />
          </div>
        );
      })}

      {target && (
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 4, padding: 12, borderRadius: 10, background: "rgba(0,240,255,.06)", border: "1px solid " + C.n1 }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: C.n1, color: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>🎯</span>
          <span style={{ flex: 1 }}>
            <b style={{ fontFamily: FD, fontWeight: 600, fontSize: 13, color: C.n1, letterSpacing: .3 }}>PROCHAINE CIBLE — {target.name.toUpperCase()}</b>
            <small style={{ display: "block", fontFamily: FB, fontSize: 11, color: C.td, marginTop: 3 }}>Encore quelques points et tu passes devant</small>
          </span>
          <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: C.mint, flexShrink: 0 }}>+{gap}</span>
        </div>
      )}
      {!target && myIdx === 0 && (
        <div style={{ textAlign: "center", fontFamily: FD, letterSpacing: 2, color: C.n1, marginTop: 10, fontSize: 13 }}>👑 MENEUR — DÉFENDS TA PLACE</div>
      )}
    </div>
  );
}

function Profil({ me, token, standings, onLogout }) {
  const s = standings.find(x => x.name === me) || { pts: 0, perfects: 0 };
  const rank = standings.findIndex(x => x.name === me) + 1;
  return (
    <div style={{ paddingTop: 8 }}>
      <SectionTitle>PROFIL</SectionTitle>
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: C.s1, border: "1px solid " + C.bd, borderRadius: 14, padding: 16, marginBottom: 12 }}>
        <span style={{ width: 50, height: 50, borderRadius: "50%", background: C.s2, border: "2px solid " + C.n2, color: C.n2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontWeight: 700, fontSize: 20, boxShadow: "0 0 12px rgba(168,85,247,.4)" }}>{me[0]}</span>
        <div>
          <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 20 }}>{me}</div>
          <div style={{ fontFamily: FD, fontSize: 12, color: C.td, letterSpacing: 1, marginTop: 2 }}>{token} · #{rank} AU CLASSEMENT</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[["POINTS", s.pts], ["PERFECTS", s.perfects]].map(([k, v]) => (
          <div key={k} style={{ background: C.s1, border: "1px solid " + C.bd, borderRadius: 12, padding: 14 }}>
            <div style={{ fontFamily: FD, fontSize: 11, letterSpacing: 1, color: C.td }}>{k}</div>
            <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 24, color: C.n1, marginTop: 4 }}>{v}</div>
          </div>
        ))}
      </div>
      <button onClick={onLogout} style={{ width: "100%", background: "none", border: "1px solid " + C.bd, borderRadius: 10, padding: 12, color: C.n3, fontFamily: FD, fontWeight: 600, letterSpacing: 1, cursor: "pointer" }}>CHANGER DE JOUEUR</button>
    </div>
  );
}

function Tabs({ tab, setTab, isAdmin }) {
  const items = [["matchs", "🎮", "MATCHS"], ["classement", "🏆", "CLASSEMENT"], ["profil", "👤", "PROFIL"]];
  if (isAdmin) items.push(["admin", "⚙️", "ADMIN"]);
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 480, margin: "0 auto", background: "rgba(6,6,14,.92)", borderTop: "1px solid " + C.bd, backdropFilter: "blur(8px)", display: "flex", padding: "8px 14px 14px" }}>
      {items.map(([id, ic, label]) => {
        const on = tab === id;
        return (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            fontFamily: FD, fontWeight: 600, fontSize: 10, letterSpacing: 1, color: on ? C.n1 : "#3a3a55" }}>
            <span style={{ fontSize: 18 }}>{ic}</span>{label}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   PANNEAU ADMIN (proprietaire uniquement)
   ============================================================ */

function resultOptions(bo) {
  return bo === 5 ? ["3-0", "3-1", "3-2", "2-3", "1-3", "0-3"] : ["2-0", "2-1", "1-2", "0-2"];
}
function winnerFromScore(sc, team1, team2) {
  const p = sc.split("-").map(Number);
  return p[0] > p[1] ? team1 : team2;
}

function Admin({ seasons, activeId, compTeams, matches, onCreateSeason, onToggle, onAddMatch, onSetResult, onDeleteMatch }) {
  const [sName, setSName] = useState("");
  const [sShort, setSShort] = useState("");
  const [f, setF] = useState({ team1: "", team2: "", bo: 5, cote1: "", cote2: "", week: 1, day: "", start: "" });
  const up = (k, v) => setF(p => ({ ...p, [k]: v }));
  const activeName = (seasons.find(s => s.id === activeId) || {}).name || "—";

  const inS = { width: "100%", background: "#0a0a16", border: "1px solid " + C.bd, borderRadius: 8, padding: "10px 11px", color: C.tp, fontFamily: FB, fontSize: 14, marginTop: 5, boxSizing: "border-box" };
  const lblS = { fontFamily: FD, fontSize: 10, letterSpacing: 1, color: C.td, display: "block", marginTop: 11 };
  const cardS = { background: C.s1, border: "1px solid " + C.bd, borderRadius: 14, padding: 15, marginBottom: 14 };
  const btnS = (bg, fg) => ({ background: bg, color: fg, border: "none", borderRadius: 8, padding: "11px 14px", fontFamily: FD, fontWeight: 700, fontSize: 12, letterSpacing: 1, cursor: "pointer" });

  function submitMatch() {
    if (!f.team1.trim() || !f.team2.trim() || !f.cote1 || !f.cote2) return;
    onAddMatch({ season_id: activeId, team1: f.team1.trim(), team2: f.team2.trim(), bo: Number(f.bo), cote1: Number(f.cote1), cote2: Number(f.cote2), week: Number(f.week) || 1, day: f.day.trim(), start_time: f.start || null });
    setF({ team1: "", team2: "", bo: Number(f.bo), cote1: "", cote2: "", week: Number(f.week) || 1, day: "", start: "" });
  }

  return (
    <div style={{ paddingTop: 8 }}>
      <datalist id="teamlist">{compTeams.map(t => <option key={t} value={t} />)}</datalist>

      <SectionTitle>COMPÉTITIONS</SectionTitle>
      <div style={cardS}>
        {seasons.map(s => {
          const active = s.status === "active";
          return (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #14142a" }}>
              <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 14, flex: 1, color: active ? C.tp : C.td }}>{s.name}</span>
              {active && <span style={{ fontFamily: FD, fontSize: 10, color: C.n1, letterSpacing: 1, border: "1px solid " + C.n1, borderRadius: 4, padding: "2px 7px" }}>ACTIVE</span>}
              <button onClick={() => onToggle(s.id, !active)} style={btnS(C.s2, active ? C.td : C.n1)}>{active ? "DÉSACTIVER" : "ACTIVER"}</button>
            </div>
          );
        })}
        <div style={{ marginTop: 12 }}>
          <label style={lblS}>NOUVELLE COMPÉTITION — NOM</label>
          <input style={inS} value={sName} onChange={e => setSName(e.target.value)} placeholder="MSI 2026" />
          <label style={lblS}>NOM COURT (affiché en haut)</label>
          <input style={inS} value={sShort} onChange={e => setSShort(e.target.value)} placeholder="MSI 2026" />
          <button onClick={() => { if (sName.trim()) { onCreateSeason(sName.trim(), (sShort || sName).trim()); setSName(""); setSShort(""); } }}
            style={{ ...btnS(C.n2, "#06060e"), width: "100%", marginTop: 12 }}>CRÉER LA COMPÉTITION</button>
          <div style={{ fontFamily: FB, fontSize: 11, color: C.td, marginTop: 8 }}>Après création, clique sur « Activer » pour qu'elle s'affiche dans l'app.</div>
        </div>
      </div>

      <SectionTitle>AJOUTER UN MATCH</SectionTitle>
      <div style={cardS}>
        <div style={{ fontFamily: FB, fontSize: 11, color: C.td, marginBottom: 2 }}>Ajouté à : <b style={{ color: C.n1 }}>{activeName}</b> <span style={{ color: "#3a3a55" }}>(change via le sélecteur en haut)</span></div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}><label style={lblS}>ÉQUIPE 1</label><input list="teamlist" style={inS} value={f.team1} onChange={e => up("team1", e.target.value)} placeholder="G2 Esports" /></div>
          <div style={{ flex: 1 }}><label style={lblS}>ÉQUIPE 2</label><input list="teamlist" style={inS} value={f.team2} onChange={e => up("team2", e.target.value)} placeholder="Top Esports" /></div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}><label style={lblS}>COTE ÉQ.1</label><input type="number" step="0.01" style={inS} value={f.cote1} onChange={e => up("cote1", e.target.value)} placeholder="2.10" /></div>
          <div style={{ flex: 1 }}><label style={lblS}>COTE ÉQ.2</label><input type="number" step="0.01" style={inS} value={f.cote2} onChange={e => up("cote2", e.target.value)} placeholder="1.65" /></div>
          <div style={{ width: 80 }}><label style={lblS}>FORMAT</label>
            <select style={inS} value={f.bo} onChange={e => up("bo", e.target.value)}><option value={5}>Bo5</option><option value={3}>Bo3</option></select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 80 }}><label style={lblS}>TOUR</label><input type="number" style={inS} value={f.week} onChange={e => up("week", e.target.value)} /></div>
          <div style={{ flex: 1 }}><label style={lblS}>JOUR (libellé)</label><input style={inS} value={f.day} onChange={e => up("day", e.target.value)} placeholder="VEN 03/07" /></div>
        </div>
        <label style={lblS}>DATE & HEURE DU MATCH (verrouille les pronos)</label>
        <input type="datetime-local" style={inS} value={f.start} onChange={e => up("start", e.target.value)} />
        <button onClick={submitMatch} style={{ ...btnS(C.n1, "#06060e"), width: "100%", marginTop: 14 }}>AJOUTER LE MATCH</button>
      </div>

      <SectionTitle>RÉSULTATS</SectionTitle>
      <div style={cardS}>
        {matches.length === 0 && <div style={{ fontFamily: FB, fontSize: 13, color: C.td }}>Aucun match dans la compétition active.</div>}
        {matches.map(m => (
          <div key={m.id} style={{ padding: "10px 0", borderBottom: "1px solid #14142a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 13 }}>{m.team1} <span style={{ color: C.td }}>vs</span> {m.team2}</span>
              <button onClick={() => { if (confirm("Supprimer ce match ?")) onDeleteMatch(m.id); }} style={{ marginLeft: "auto", background: "none", border: "none", color: C.n3, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {resultOptions(m.bo).map(sc => {
                const sel = m.score === sc;
                return (
                  <button key={sc} onClick={() => onSetResult(m.id, winnerFromScore(sc, m.team1, m.team2), sc)}
                    style={{ padding: "6px 10px", borderRadius: 6, fontFamily: FD, fontWeight: 700, fontSize: 12, cursor: "pointer",
                      border: "1px solid " + (sel ? C.n1 : C.bd), background: sel ? C.n1 : "#0a0a16", color: sel ? "#06060e" : C.tp }}>{sc}</button>
                );
              })}
              {m.winner && <button onClick={() => onSetResult(m.id, null, null)} style={{ padding: "6px 10px", borderRadius: 6, fontFamily: FD, fontWeight: 600, fontSize: 11, cursor: "pointer", border: "1px solid " + C.bd, background: "none", color: C.td }}>EFFACER</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
