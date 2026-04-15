import { useState, useMemo, useCallback } from "react";

/* ── Theme ── */
const BG = "#0a0a0f";
const S1 = "#111118";
const S2 = "#1a1a26";
const BD = "#252535";
const TP = "#e4e4ee";
const TD = "#5a5a72";
const AC = "#c8aa2a";
const FD = "'Chakra Petch', sans-serif";
const FB = "'DM Sans', sans-serif";

/* ── Teams ── */
const TEAM_INFO = {
  "G2 Esports": { short: "G2", color: "#aaa" },
  "SK Gaming": { short: "SK", color: "#0088cc" },
  "Heretics": { short: "TH", color: "#ff4655" },
  "NaVi": { short: "NAVI", color: "#ffd700" },
  "GIANTX": { short: "GX", color: "#00c8ff" },
  "Fnatic": { short: "FNC", color: "#ff5900" },
  "Shifters": { short: "SHFT", color: "#6c5ce7" },
  "Vitality": { short: "VIT", color: "#fee800" },
  "KCorp": { short: "KC", color: "#4a90d9" },
  "KOI": { short: "KOI", color: "#00a6ff" },
  "Los Ratones": { short: "LR", color: "#c87533" },
};

/* ── Players ── */
const AVATARS = ["🦁","⚔️","🐉","🏰","🎯","🔥","💎","🌟","🐺","🦅","🎮","👑","⚡","🛡️","🗡️","🏆","🎪","🦊","🐍","🦈","🌙","☄️","🎲","🃏","🧙","🤖","👹","🐲"];
const COLORS = ["#e8364f","#3b82f6","#10b981","#f59e0b","#a855f7","#ec4899","#06b6d4","#84cc16","#f97316","#6366f1","#14b8a6","#e11d48"];

const INIT_PLAYERS = [
  { name: "Ulysse", color: "#e8364f", emoji: "🦁", pin: "1111", badge: null },
  { name: "César", color: "#3b82f6", emoji: "⚔️", pin: "2222", badge: null },
  { name: "Emilien", color: "#10b981", emoji: "🐉", pin: "3333", badge: null },
  { name: "Arthur", color: "#f59e0b", emoji: "🏰", pin: "4444", badge: null },
];

/* ── Scores ── */
const SC3 = ["2-0", "2-1", "0-2", "1-2"];
const SC5 = ["3-0", "3-1", "3-2", "0-3", "1-3", "2-3"];

/* ── Match Data ── */
const INIT_MATCHES = [
  { id: 1, week: 1, day: "SAM 28/03", team1: "GIANTX", team2: "Fnatic", bo: 3, cote1: 1.5, cote2: 2.4, winner: "GIANTX", score: "2-1", preds: { Ulysse: { winner: "GIANTX", score: "2-1" }, "César": { winner: "GIANTX", score: "2-1" }, Emilien: { winner: "Fnatic", score: "0-2" }, Arthur: { winner: "Fnatic", score: "1-2" } } },
  { id: 2, week: 1, day: "SAM 28/03", team1: "KCorp", team2: "Vitality", bo: 3, cote1: 1.2, cote2: 3.7, winner: "KCorp", score: "2-1", preds: { Ulysse: { winner: "KCorp", score: "2-0" }, "César": { winner: "KCorp", score: "2-0" }, Emilien: { winner: "KCorp", score: "2-0" }, Arthur: { winner: "KCorp", score: "2-1" } } },
  { id: 3, week: 1, day: "SAM 28/03", team1: "NaVi", team2: "KOI", bo: 3, cote1: 3, cote2: 1.4, winner: "NaVi", score: "2-1", preds: { Ulysse: { winner: "KOI", score: "1-2" }, "César": { winner: "NaVi", score: "2-1" }, Emilien: { winner: "KOI", score: "0-2" }, Arthur: { winner: "KOI", score: "1-2" } } },
  { id: 4, week: 1, day: "DIM 29/03", team1: "SK Gaming", team2: "Heretics", bo: 3, cote1: 2.7, cote2: 1.4, winner: "Heretics", score: "1-2", preds: { Ulysse: { winner: "Heretics", score: "1-2" }, "César": { winner: "SK Gaming", score: "2-1" }, Emilien: { winner: "SK Gaming", score: "2-0" }, Arthur: { winner: "Heretics", score: "0-2" } } },
  { id: 5, week: 1, day: "DIM 29/03", team1: "KOI", team2: "Fnatic", bo: 3, cote1: 1.3, cote2: 3.3, winner: "KOI", score: "2-0", preds: { Ulysse: { winner: "KOI", score: "2-0" }, "César": { winner: "KOI", score: "2-1" }, Emilien: { winner: "KOI", score: "2-1" }, Arthur: { winner: "KOI", score: "2-1" } } },
  { id: 6, week: 1, day: "LUN 30/03", team1: "NaVi", team2: "SK Gaming", bo: 3, cote1: 1.2, cote2: 3.9, winner: "NaVi", score: "2-1", preds: { Ulysse: { winner: "NaVi", score: "2-0" }, "César": { winner: "SK Gaming", score: "1-2" }, Emilien: { winner: "NaVi", score: "2-1" }, Arthur: { winner: "NaVi", score: "2-0" } } },
  { id: 7, week: 1, day: "LUN 30/03", team1: "Heretics", team2: "Vitality", bo: 3, cote1: 2.4, cote2: 1.5, winner: "Vitality", score: "0-2", preds: { Ulysse: { winner: "Vitality", score: "0-2" }, "César": { winner: "Vitality", score: "0-2" }, Emilien: { winner: "Vitality", score: "0-2" }, Arthur: { winner: "Vitality", score: "0-2" } } },
  { id: 8, week: 2, day: "SAM 04/04", team1: "SK Gaming", team2: "Shifters", bo: 3, cote1: 2.1, cote2: 1.6, winner: "SK Gaming", score: "2-0", preds: { Ulysse: { winner: "SK Gaming", score: "2-0" }, "César": { winner: "Shifters", score: "1-2" }, Emilien: { winner: "Shifters", score: "1-2" }, Arthur: { winner: "Shifters", score: "1-2" } } },
  { id: 9, week: 2, day: "SAM 04/04", team1: "G2 Esports", team2: "Heretics", bo: 3, cote1: 1.1, cote2: 7, winner: "G2 Esports", score: "2-0", preds: { Ulysse: { winner: "G2 Esports", score: "2-0" }, "César": { winner: "G2 Esports", score: "2-0" }, Emilien: { winner: "G2 Esports", score: "2-0" }, Arthur: { winner: "G2 Esports", score: "2-0" } } },
  { id: 10, week: 2, day: "SAM 04/04", team1: "NaVi", team2: "Vitality", bo: 3, cote1: 2, cote2: 1.7, winner: "Vitality", score: "0-2", preds: { Ulysse: { winner: "Vitality", score: "1-2" }, "César": { winner: "NaVi", score: "2-1" }, Emilien: { winner: "NaVi", score: "2-1" }, Arthur: { winner: "Vitality", score: "1-2" } } },
  { id: 11, week: 2, day: "DIM 05/04", team1: "SK Gaming", team2: "GIANTX", bo: 3, cote1: 5, cote2: 1.2, winner: "GIANTX", score: "0-2", preds: { Ulysse: { winner: "GIANTX", score: "1-2" }, "César": { winner: "GIANTX", score: "0-2" }, Emilien: { winner: "GIANTX", score: "1-2" }, Arthur: { winner: "SK Gaming", score: "2-0" } } },
  { id: 12, week: 2, day: "DIM 05/04", team1: "Fnatic", team2: "G2 Esports", bo: 3, cote1: 6.3, cote2: 1.2, winner: "Fnatic", score: "2-1", preds: { Ulysse: { winner: "G2 Esports", score: "0-2" }, "César": { winner: "G2 Esports", score: "0-2" }, Emilien: { winner: "G2 Esports", score: "0-2" }, Arthur: { winner: "G2 Esports", score: "0-2" } } },
  { id: 13, week: 2, day: "LUN 06/04", team1: "GIANTX", team2: "Heretics", bo: 3, cote1: 1.3, cote2: 3.3, winner: "GIANTX", score: "2-1", preds: { Ulysse: { winner: "GIANTX", score: "2-1" }, "César": { winner: "GIANTX", score: "2-1" }, Emilien: { winner: "GIANTX", score: "2-1" }, Arthur: { winner: "Heretics", score: "1-2" } } },
  { id: 14, week: 2, day: "LUN 06/04", team1: "Vitality", team2: "KOI", bo: 3, cote1: 2.7, cote2: 1.4, winner: "Vitality", score: "2-1", preds: { Ulysse: { winner: "Vitality", score: "2-1" }, "César": { winner: "Vitality", score: "2-1" }, Emilien: { winner: "KOI", score: "1-2" }, Arthur: { winner: "Vitality", score: "2-1" } } },
  { id: 15, week: 3, day: "SAM 11/04", team1: "Heretics", team2: "NaVi", bo: 3, cote1: 2.8, cote2: 1.4, winner: null, score: null, preds: { Ulysse: { winner: "NaVi", score: "1-2" }, "César": { winner: null, score: null }, Emilien: { winner: "NaVi", score: "0-2" }, Arthur: { winner: null, score: null } } },
  { id: 16, week: 3, day: "SAM 11/04", team1: "G2 Esports", team2: "Vitality", bo: 3, cote1: 1.3, cote2: 3.5, winner: null, score: null, preds: { Ulysse: { winner: "G2 Esports", score: "2-1" }, "César": { winner: null, score: null }, Emilien: { winner: "G2 Esports", score: "2-1" }, Arthur: { winner: null, score: null } } },
  { id: 17, week: 3, day: "SAM 11/04", team1: "KOI", team2: "SK Gaming", bo: 3, cote1: 1.2, cote2: 4.5, winner: null, score: null, preds: { Ulysse: { winner: "KOI", score: "2-0" }, "César": { winner: null, score: null }, Emilien: { winner: "KOI", score: "2-1" }, Arthur: { winner: null, score: null } } },
  { id: 18, week: 3, day: "DIM 12/04", team1: "Vitality", team2: "Shifters", bo: 3, cote1: 1.2, cote2: 4.5, winner: null, score: null, preds: { Ulysse: { winner: "Vitality", score: "2-0" }, "César": { winner: null, score: null }, Emilien: { winner: "Vitality", score: "2-1" }, Arthur: { winner: null, score: null } } },
  { id: 19, week: 3, day: "DIM 12/04", team1: "Heretics", team2: "KCorp", bo: 3, cote1: 4.7, cote2: 1.2, winner: null, score: null, preds: { Ulysse: { winner: "KCorp", score: "0-2" }, "César": { winner: null, score: null }, Emilien: { winner: "KCorp", score: "0-2" }, Arthur: { winner: null, score: null } } },
  { id: 20, week: 3, day: "LUN 13/04", team1: "Fnatic", team2: "SK Gaming", bo: 3, cote1: 1.3, cote2: 3.4, winner: null, score: null, preds: {} },
  { id: 21, week: 3, day: "LUN 13/04", team1: "GIANTX", team2: "Shifters", bo: 3, cote1: 1.1, cote2: 6, winner: null, score: null, preds: {} },
];

/* ── Achievements ── */
const ACHIEVE = [
  { id: "w1", icon: "⭐", name: "Premiere victoire", desc: "1 prono gagne", ck: "wins", min: 1 },
  { id: "w5", icon: "🎯", name: "Sniper", desc: "5 pronos gagnes", ck: "wins", min: 5 },
  { id: "w10", icon: "🏹", name: "Archer", desc: "10 pronos gagnes", ck: "wins", min: 10 },
  { id: "p1", icon: "✨", name: "Etoile filante", desc: "1 score parfait", ck: "perfects", min: 1 },
  { id: "p3", icon: "💫", name: "Devin", desc: "3 scores parfaits", ck: "perfects", min: 3 },
  { id: "p5", icon: "🔮", name: "Oracle", desc: "5 scores parfaits", ck: "perfects", min: 5 },
  { id: "s3", icon: "🔥", name: "En feu", desc: "3 de suite", ck: "maxStreak", min: 3 },
  { id: "s5", icon: "💥", name: "Inarretable", desc: "5 de suite", ck: "maxStreak", min: 5 },
  { id: "u1", icon: "🎲", name: "Risk taker", desc: "1 upset predit", ck: "upsets", min: 1 },
  { id: "u3", icon: "🃏", name: "Upset King", desc: "3 upsets", ck: "upsets", min: 3 },
  { id: "t20", icon: "💰", name: "Bankeur", desc: "20 points", ck: "total", min: 20 },
  { id: "t50", icon: "👑", name: "Roi du prono", desc: "50 points", ck: "total", min: 50 },
];

/* ── Utils ── */
function pts(m, pr) {
  if (!m.winner || !pr || !pr.winner) return 0;
  if (pr.winner !== m.winner) return 0;
  var c = pr.winner === m.team1 ? m.cote1 : m.cote2;
  if (pr.score === m.score) return c * 2;
  return c;
}

function winOf(t1, t2, sc) {
  if (!sc) return null;
  var parts = sc.split("-");
  return Number(parts[0]) > Number(parts[1]) ? t1 : t2;
}

function rd(n) { return Math.round(n * 10) / 10; }

function getStats(matches, name) {
  var w = 0, pf = 0, tot = 0, pl = 0, streak = 0, maxS = 0, ups = 0;
  matches.forEach(function(m) {
    if (!m.winner || !m.preds[name] || !m.preds[name].winner) return;
    pl++;
    var p = pts(m, m.preds[name]);
    tot += p;
    if (p > 0) {
      w++;
      streak++;
      if (streak > maxS) maxS = streak;
      var cw = m.winner === m.team1 ? m.cote1 : m.cote2;
      if (cw >= 2.5) ups++;
    } else {
      streak = 0;
    }
    if (p > 0 && m.preds[name].score === m.score) pf++;
  });
  return { played: pl, wins: w, perfects: pf, total: rd(tot), wr: pl > 0 ? Math.round(w / pl * 100) : 0, maxStreak: maxS, upsets: ups };
}

function getUnlocked(stats) {
  return ACHIEVE.filter(function(a) { return stats[a.ck] >= a.min; });
}

/* ── Team Logo ── */
function TeamLogo(props) {
  var team = props.team;
  var size = props.size || 30;
  var info = TEAM_INFO[team] || { short: "??", color: "#555" };
  return (
    <div style={{
      width: size, height: size, borderRadius: 8,
      background: info.color + "22", border: "1.5px solid " + info.color + "44",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: Math.max(size * 0.28, 8), fontWeight: 800, color: info.color,
      flexShrink: 0, fontFamily: FD, letterSpacing: 0.5
    }}>
      {info.short}
    </div>
  );
}

/* ── Login Screen ── */
function LoginScreen(props) {
  var players = props.players;
  var onLogin = props.onLogin;
  var sel = useState(null);
  var selected = sel[0];
  var setSel = sel[1];
  var pi = useState("");
  var pin = pi[0];
  var setPin = pi[1];
  var er = useState(false);
  var error = er[0];
  var setErr = er[1];

  function handleKey(n) {
    if (n === "del") { setPin(pin.slice(0, -1)); setErr(false); return; }
    if (pin.length >= 4) return;
    var next = pin + String(n);
    setPin(next);
    if (next.length === 4) {
      setTimeout(function() {
        if (players[selected].pin === next) { onLogin(players[selected].name); }
        else { setErr(true); setTimeout(function() { setErr(false); setPin(""); }, 1000); }
      }, 200);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: FB, color: TP }}>
      <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <h1 style={{ fontFamily: FD, fontSize: 32, fontWeight: 800, margin: "0 0 4px", letterSpacing: 3, color: AC }}>LEC PRONOS</h1>
      <p style={{ fontSize: 11, color: TD, margin: "0 0 36px", letterSpacing: 2 }}>SPRING 2026</p>
      <div style={{ fontSize: 11, fontWeight: 600, color: TD, letterSpacing: 2, marginBottom: 14 }}>QUI ES-TU ?</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap", justifyContent: "center" }}>
        {players.map(function(p, i) {
          return (
            <button key={p.name} onClick={function() { setSel(i); setPin(""); setErr(false); }}
              style={{ width: 80, padding: "14px 8px", borderRadius: 14, border: selected === i ? "2px solid " + p.color : "2px solid " + BD, background: selected === i ? p.color + "15" : S1, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ fontSize: 28 }}>{p.emoji}</div>
              <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, color: p.color }}>{p.name}</div>
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 11, color: TD, fontWeight: 600 }}>Code PIN</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2, 3].map(function(idx) {
              return (
                <div key={idx} style={{ width: 40, height: 48, borderRadius: 10, border: "2px solid " + (error ? "#ef4444" : pin.length > idx ? players[selected].color : BD), background: S2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: TP }}>
                  {pin[idx] ? "•" : ""}
                </div>
              );
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 4 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, "del"].map(function(n, idx) {
              if (n === -1) return <div key={idx} />;
              return (
                <button key={idx} onClick={function() { handleKey(n); }}
                  style={{ width: 52, height: 44, borderRadius: 10, border: "1px solid " + BD, background: S1, color: TP, fontSize: n === "del" ? 14 : 18, fontWeight: 600, cursor: "pointer", fontFamily: FD }}>
                  {n === "del" ? "←" : n}
                </button>
              );
            })}
          </div>
          {error && <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginTop: 4 }}>Code incorrect</div>}
        </div>
      )}
      <button onClick={function() { onLogin("__admin"); }} style={{ marginTop: 32, background: "none", border: "none", color: TD, fontSize: 10, cursor: "pointer", fontFamily: FD, opacity: 0.5 }}>
        Admin
      </button>
    </div>
  );
}

/* ── Match Card ── */
function MatchCard(props) {
  var m = props.match;
  var players = props.players;
  var onUpdate = props.onUpdate;
  var user = props.currentUser;
  var isAdmin = props.isAdmin;
  var spoil = props.spoil;
  var exp = useState(false);
  var expanded = exp[0];
  var setExp = exp[1];
  var played = !!m.winner;
  var scores = m.bo === 5 ? SC5 : SC3;
  var myPred = m.preds[user] || {};

  return (
    <div style={{ background: S1, borderRadius: 14, overflow: "hidden", border: played ? "1px solid " + BD : "2px solid " + AC + "40" }}>
      {/* Banner */}
      {!played && (
        <div style={{ background: "linear-gradient(90deg, " + AC + "25, transparent)", padding: "6px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: AC, letterSpacing: 1 }}>{m.day}</span>
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {players.map(function(p) {
              var done = !!(m.preds[p.name] && m.preds[p.name].winner);
              return (
                <div key={p.name} style={{ width: 18, height: 18, borderRadius: "50%", background: done ? p.color + "30" : S2, border: "2px solid " + (done ? p.color : BD), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: done ? p.color : TD }}>
                  {done ? "✓" : "?"}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {played && (
        <div style={{ padding: "3px 14px", background: S2 }}>
          <span style={{ fontSize: 9, color: TD, letterSpacing: 1 }}>{spoil ? m.day : "TERMINE - " + m.day}</span>
        </div>
      )}

      {/* Teams */}
      <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={function() { setExp(!expanded); }}>
        <TeamLogo team={m.team1} size={32} />
        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, flex: 1, textAlign: "right", color: !spoil && played && m.winner === m.team1 ? "#10b981" : TP }}>{m.team1}</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 70 }}>
          <div style={{ display: "flex", gap: 5, fontSize: 10 }}>
            <span style={{ color: "#e8364f", fontWeight: 600 }}>{m.cote1}</span>
            <span style={{ color: TD }}>|</span>
            <span style={{ color: "#3b82f6", fontWeight: 600 }}>{m.cote2}</span>
          </div>
          {played && !spoil && <div style={{ fontFamily: FD, fontSize: 18, fontWeight: 800, color: "#10b981", letterSpacing: 2 }}>{m.score}</div>}
          {played && spoil && <div style={{ fontSize: 14, marginTop: 2 }}>🔒</div>}
          {!played && <div style={{ fontSize: 12, fontWeight: 800, color: AC, marginTop: 2 }}>VS</div>}
        </div>
        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, flex: 1, color: !spoil && played && m.winner === m.team2 ? "#10b981" : TP }}>{m.team2}</span>
        <TeamLogo team={m.team2} size={32} />
        <span style={{ fontSize: 10, color: TD, transform: expanded ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▼</span>
      </div>

      {/* Quick pred for upcoming */}
      {!played && !expanded && (
        <div style={{ padding: "0 14px 10px" }}>
          {myPred.winner ? (
            <div style={{ padding: "6px 10px", borderRadius: 8, background: "#10b98110", border: "1px solid #10b98120", fontSize: 11, color: "#10b981", fontWeight: 600 }}>
              Ton prono : {myPred.winner} - {myPred.score}
            </div>
          ) : (
            <div style={{ padding: "6px 10px", borderRadius: 8, background: "#f59e0b10", border: "1px solid #f59e0b20", fontSize: 11, color: "#f59e0b", fontWeight: 600 }}>
              Clique pour pronostiquer
            </div>
          )}
        </div>
      )}

      {/* Played: show predictions */}
      {played && !spoil && (
        <div style={{ padding: "0 14px 10px", display: "flex", gap: 4 }}>
          {players.map(function(p) {
            var pr = m.preds[p.name] || {};
            var pt = pts(m, pr);
            var ok = pt > 0;
            var pf = pr.score === m.score && ok;
            return (
              <div key={p.name} style={{ flex: 1, borderRadius: 10, padding: "6px 2px", textAlign: "center", background: pf ? "#FFD70010" : ok ? "#10b9810e" : "#ef444408", border: "1px solid " + (pf ? "#FFD70028" : ok ? "#10b98118" : "#ef444415") }}>
                <div style={{ fontSize: 12, marginBottom: 1 }}>{p.emoji}</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: p.color }}>{p.name}</div>
                <div style={{ fontSize: 9, color: TD }}>{pr.winner || "-"}</div>
                <div style={{ fontSize: 9, color: TD }}>{pr.score || ""}</div>
                <div style={{ fontSize: 12, fontWeight: 800, marginTop: 2, color: pf ? "#FFD700" : ok ? "#10b981" : "#ef4444" }}>
                  {!pr.winner ? "-" : pf ? "+" + pt + " ★" : ok ? "+" + pt : "0"}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {played && spoil && !expanded && (
        <div style={{ padding: "0 14px 10px", textAlign: "center" }}>
          <div style={{ padding: 8, borderRadius: 8, border: "1px dashed " + AC, background: AC + "10", fontSize: 10, color: AC, fontWeight: 600 }}>
            🔒 Resultat masque
          </div>
        </div>
      )}

      {/* Expanded upcoming: edit pred */}
      {!played && expanded && (
        <div style={{ borderTop: "1px solid " + BD, padding: "10px 14px" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: AC, letterSpacing: 2, marginBottom: 8 }}>TON PRONOSTIC</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: TD, marginBottom: 2 }}>VAINQUEUR</div>
              <select value={myPred.winner || ""} onChange={function(e) { onUpdate(m.id, user, "winner", e.target.value || null); }}
                style={{ background: S2, color: TP, border: "1px solid " + BD, borderRadius: 8, padding: "5px 8px", fontSize: 11, width: "100%", outline: "none" }}>
                <option value="">Choisis...</option>
                <option value={m.team1}>{m.team1}</option>
                <option value={m.team2}>{m.team2}</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: TD, marginBottom: 2 }}>SCORE</div>
              <select value={myPred.score || ""} onChange={function(e) { onUpdate(m.id, user, "score", e.target.value || null); }}
                style={{ background: S2, color: TP, border: "1px solid " + BD, borderRadius: 8, padding: "5px 8px", fontSize: 11, width: "100%", outline: "none" }}>
                <option value="">Score...</option>
                {scores.map(function(s) { return <option key={s} value={s}>{s}</option>; })}
              </select>
            </div>
          </div>
          {isAdmin && (
            <div style={{ borderTop: "1px solid " + BD, paddingTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: AC }}>RESULTAT :</span>
              <select value={m.score || ""} onChange={function(e) { var sc = e.target.value || null; onUpdate(m.id, "__result", "score", sc); onUpdate(m.id, "__result", "winner", sc ? winOf(m.team1, m.team2, sc) : null); }}
                style={{ background: S2, color: TP, border: "1px solid " + BD, borderRadius: 8, padding: "5px 8px", fontSize: 11, outline: "none" }}>
                <option value="">Score final...</option>
                {scores.map(function(s) { return <option key={s} value={s}>{s}</option>; })}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Dashboard ── */
function Dashboard(props) {
  var matches = props.matches;
  var players = props.players;
  var user = props.currentUser;
  var onNav = props.onNav;
  var spoil = props.spoil;

  var stats = players.map(function(p) {
    var s = getStats(matches, p.name);
    return Object.assign({}, p, s);
  }).sort(function(a, b) { return b.total - a.total; });

  var myPending = matches.filter(function(m) { return !m.winner && (!m.preds[user] || !m.preds[user].winner); });
  var upcoming = matches.filter(function(m) { return !m.winner; }).slice(0, 3);
  var me = stats.find(function(s) { return s.name === user; });
  var myRank = stats.findIndex(function(s) { return s.name === user; }) + 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Welcome */}
      <div style={{ background: "linear-gradient(135deg, " + (me ? me.color : AC) + "12, transparent)", border: "1px solid " + (me ? me.color : AC) + "25", borderRadius: 16, padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: (me ? me.color : "#888") + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{me ? me.emoji : "?"}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: me ? me.color : TP }}>Salut {user} !</div>
            <div style={{ fontSize: 11, color: TD }}>{myPending.length > 0 ? myPending.length + " prono(s) en attente" : "Pronos a jour"}</div>
          </div>
          {!spoil && me && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: TP }}>{me.total}<span style={{ fontSize: 10, color: TD }}> pts</span></div>
              <div style={{ fontSize: 10, color: TD }}>{myRank}{myRank === 1 ? "er" : "e"} - WR {me.wr}%</div>
            </div>
          )}
        </div>
      </div>

      {/* Pending alert */}
      {myPending.length > 0 && (
        <button onClick={function() { onNav("matches"); }} style={{ background: "#f59e0b10", border: "1px solid #f59e0b25", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", width: "100%", textAlign: "left" }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, color: "#f59e0b" }}>Pronos manquants</div>
            <div style={{ fontSize: 10, color: TD }}>{myPending.length} match(s)</div>
          </div>
          <span style={{ fontSize: 12, color: "#f59e0b", fontFamily: FD, fontWeight: 600 }}>Parier</span>
        </button>
      )}

      {/* Leaderboard */}
      {!spoil && (
        <div style={{ background: S1, border: "1px solid " + BD, borderRadius: 14, padding: "14px 16px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: AC, letterSpacing: 3, marginBottom: 10 }}>CLASSEMENT</div>
          {stats.map(function(s, i) {
            return (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: i < stats.length - 1 ? "1px solid " + BD : "none" }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 13, width: 18, textAlign: "center", color: i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : i === 2 ? "#CD7F32" : TD }}>{i + 1}</span>
                <span style={{ fontSize: 14 }}>{s.emoji}</span>
                <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, color: s.name === user ? s.color : TP, flex: 1 }}>{s.name}</span>
                <span style={{ fontSize: 10, color: TD }}>WR {s.wr}%</span>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: TP, minWidth: 40, textAlign: "right" }}>{s.total}</span>
              </div>
            );
          })}
        </div>
      )}

      {spoil && (
        <div style={{ background: S1, border: "1px solid " + BD, borderRadius: 14, padding: 30, textAlign: "center" }}>
          <div style={{ fontSize: 24 }}>🔒</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: AC, marginTop: 8 }}>ANTI-SPOIL ACTIF</div>
        </div>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: AC, letterSpacing: 3 }}>PROCHAINS MATCHS</span>
            <button onClick={function() { onNav("matches"); }} style={{ background: "none", border: "none", color: AC, fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: FD }}>Tout</button>
          </div>
          {upcoming.map(function(um) {
            var done = !!(um.preds[user] && um.preds[user].winner);
            return (
              <div key={um.id} style={{ background: S1, border: "1px solid " + BD, borderRadius: 10, padding: "10px 12px", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                <TeamLogo team={um.team1} size={22} />
                <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, flex: 1, textAlign: "right" }}>{um.team1}</span>
                <div style={{ textAlign: "center", minWidth: 50 }}>
                  <div style={{ display: "flex", gap: 4, justifyContent: "center", fontSize: 9 }}>
                    <span style={{ color: "#e8364f", fontWeight: 600 }}>{um.cote1}</span>
                    <span style={{ color: TD }}>-</span>
                    <span style={{ color: "#3b82f6", fontWeight: 600 }}>{um.cote2}</span>
                  </div>
                  <div style={{ fontSize: 8, color: TD }}>{um.day}</div>
                </div>
                <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, flex: 1 }}>{um.team2}</span>
                <TeamLogo team={um.team2} size={22} />
                <div style={{ background: done ? "#10b98118" : "#f59e0b18", color: done ? "#10b981" : "#f59e0b", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 6 }}>{done ? "OK" : "..."}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Matches Page ── */
function MatchesPage(props) {
  var matches = props.matches;
  var players = props.players;
  var onUpdate = props.onUpdate;
  var user = props.currentUser;
  var isAdmin = props.isAdmin;
  var spoil = props.spoil;
  var wf = useState("all");
  var weekFilter = wf[0];
  var setWf = wf[1];

  var weeks = [];
  matches.forEach(function(m) { if (weeks.indexOf(m.week) === -1) weeks.push(m.week); });
  weeks.sort(function(a, b) { return a - b; });

  var fil = weekFilter === "all" ? matches : matches.filter(function(m) { return m.week === Number(weekFilter); });
  var up = fil.filter(function(m) { return !m.winner; });
  var done = fil.filter(function(m) { return !!m.winner; });

  return (
    <div>
      <div style={{ display: "flex", gap: 5, marginBottom: 16, flexWrap: "wrap" }}>
        <button onClick={function() { setWf("all"); }} style={{ border: "1px solid " + BD, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: FD, background: weekFilter === "all" ? AC : S2, color: weekFilter === "all" ? "#000" : TD }}>Toutes</button>
        {weeks.map(function(w) {
          return (
            <button key={w} onClick={function() { setWf(w); }} style={{ border: "1px solid " + BD, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: FD, background: weekFilter === w ? AC : S2, color: weekFilter === w ? "#000" : TD }}>
              W{w}
            </button>
          );
        })}
      </div>

      {/* Upcoming */}
      {up.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "8px 14px", borderRadius: 10, background: "linear-gradient(90deg, #10b98115, transparent)", borderLeft: "3px solid #10b981" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981", letterSpacing: 2, fontFamily: FD }}>MATCHS A VENIR ({up.length})</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {up.map(function(m) { return <MatchCard key={m.id} match={m} players={players} onUpdate={onUpdate} currentUser={user} isAdmin={isAdmin} spoil={false} />; })}
          </div>
        </div>
      )}

      {up.length > 0 && done.length > 0 && (
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, " + BD + ", transparent)", margin: "4px 0 20px" }} />
      )}

      {/* Completed */}
      {done.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "8px 14px", borderRadius: 10, background: S2, borderLeft: "3px solid " + TD }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: TD, letterSpacing: 2, fontFamily: FD }}>MATCHS TERMINES ({done.length})</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {done.map(function(m) { return <MatchCard key={m.id} match={m} players={players} onUpdate={onUpdate} currentUser={user} isAdmin={isAdmin} spoil={spoil} />; })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Stats Page ── */
function StatsPage(props) {
  var matches = props.matches;
  var players = props.players;
  var spoil = props.spoil;

  if (spoil) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <div style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: AC }}>Anti-spoil actif</div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {players.map(function(p) {
        var s = getStats(matches, p.name);
        var unlocked = getUnlocked(s);
        return (
          <div key={p.name} style={{ background: S1, border: "1px solid " + p.color + "20", borderRadius: 12, padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{p.emoji}</span>
              <span style={{ fontFamily: FD, fontWeight: 700, color: p.color, fontSize: 13 }}>{p.name}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 10, marginBottom: unlocked.length > 0 ? 6 : 0 }}>
              <div><span style={{ color: TD }}>Winrate</span><br /><span style={{ fontWeight: 700 }}>{s.wr}%</span></div>
              <div><span style={{ color: TD }}>Moy/match</span><br /><span style={{ fontWeight: 700 }}>{s.played > 0 ? (s.total / s.played).toFixed(1) : "0"}</span></div>
              <div><span style={{ color: TD }}>Parfaits</span><br /><span style={{ fontWeight: 700, color: "#FFD700" }}>{s.perfects}</span></div>
              <div><span style={{ color: TD }}>Total</span><br /><span style={{ fontWeight: 700, color: "#10b981" }}>{s.total}</span></div>
            </div>
            {unlocked.length > 0 && (
              <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {unlocked.map(function(a) { return <span key={a.id} title={a.desc} style={{ fontSize: 9, padding: "2px 5px", borderRadius: 4, background: S2, border: "1px solid " + BD }}>{a.icon} {a.name}</span>; })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Profile Page ── */
function ProfilePage(props) {
  var matches = props.matches;
  var players = props.players;
  var user = props.currentUser;
  var onUp = props.onUpdatePlayer;
  var me = players.find(function(p) { return p.name === user; });
  var pi = players.findIndex(function(p) { return p.name === user; });
  if (!me) return null;
  var s = getStats(matches, user);
  var unlocked = getUnlocked(s);
  var locked = ACHIEVE.filter(function(a) { return s[a.ck] < a.min; });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Profile card */}
      <div style={{ background: "linear-gradient(135deg, " + me.color + "15, transparent)", border: "1px solid " + me.color + "30", borderRadius: 18, padding: "20px 18px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: me.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 8px", border: "3px solid " + me.color + "44", position: "relative" }}>
          {me.emoji}
          {me.badge && <span style={{ position: "absolute", bottom: -4, right: -4, fontSize: 20, background: S1, borderRadius: "50%", padding: 2 }}>{me.badge}</span>}
        </div>
        <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: me.color }}>{me.name}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 12 }}>
          <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: TP }}>{s.total}</div><div style={{ fontSize: 9, color: TD }}>POINTS</div></div>
          <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: TP }}>{s.wr}%</div><div style={{ fontSize: 9, color: TD }}>WINRATE</div></div>
          <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: "#FFD700" }}>{s.perfects}</div><div style={{ fontSize: 9, color: TD }}>PARFAITS</div></div>
          <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: TP }}>{s.played}</div><div style={{ fontSize: 9, color: TD }}>MATCHS</div></div>
        </div>
      </div>

      {/* Customization */}
      <div style={{ background: S1, border: "1px solid " + BD, borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: AC, letterSpacing: 3, marginBottom: 12 }}>PERSONNALISATION</div>
        <div style={{ fontSize: 9, fontWeight: 600, color: TD, marginBottom: 6 }}>AVATAR</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
          {AVATARS.map(function(em) {
            return (
              <button key={em} onClick={function() { onUp(pi, Object.assign({}, me, { emoji: em })); }}
                style={{ width: 36, height: 36, borderRadius: 8, border: me.emoji === em ? "2px solid " + AC : "1px solid " + BD, background: me.emoji === em ? AC + "18" : S2, fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {em}
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: 9, fontWeight: 600, color: TD, marginBottom: 6 }}>COULEUR</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
          {COLORS.map(function(co) {
            return (
              <button key={co} onClick={function() { onUp(pi, Object.assign({}, me, { color: co })); }}
                style={{ width: 32, height: 32, borderRadius: "50%", border: me.color === co ? "3px solid #fff" : "2px solid transparent", background: co, cursor: "pointer" }} />
            );
          })}
        </div>
        <div style={{ fontSize: 9, fontWeight: 600, color: TD, marginBottom: 6 }}>BADGE MIS EN AVANT</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <button onClick={function() { onUp(pi, Object.assign({}, me, { badge: null })); }}
            style={{ padding: "4px 10px", borderRadius: 6, border: !me.badge ? "2px solid " + AC : "1px solid " + BD, background: !me.badge ? AC + "18" : S2, fontSize: 10, cursor: "pointer", color: TD }}>
            Aucun
          </button>
          {unlocked.map(function(a) {
            return (
              <button key={a.id} onClick={function() { onUp(pi, Object.assign({}, me, { badge: a.icon })); }}
                style={{ padding: "4px 10px", borderRadius: 6, border: me.badge === a.icon ? "2px solid " + AC : "1px solid " + BD, background: me.badge === a.icon ? AC + "18" : S2, fontSize: 12, cursor: "pointer" }}
                title={a.name}>
                {a.icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div style={{ background: S1, border: "1px solid " + BD, borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: AC, letterSpacing: 3, marginBottom: 4 }}>SUCCES</div>
        <div style={{ fontSize: 10, color: TD, marginBottom: 14 }}>{unlocked.length}/{ACHIEVE.length} debloques</div>
        <div style={{ height: 6, borderRadius: 3, background: S2, marginBottom: 16, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg, " + me.color + ", " + AC + ")", width: (unlocked.length / ACHIEVE.length * 100) + "%", transition: "width 0.5s" }} />
        </div>

        {unlocked.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#10b981", letterSpacing: 2, marginBottom: 8 }}>DEBLOQUES</div>
            {unlocked.map(function(a) {
              return (
                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: "#10b98108", border: "1px solid #10b98120", marginBottom: 6 }}>
                  <span style={{ fontSize: 22 }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, color: TP }}>{a.name}</div>
                    <div style={{ fontSize: 10, color: TD }}>{a.desc}</div>
                  </div>
                  <span style={{ fontSize: 10, color: "#10b981", fontWeight: 700 }}>OK</span>
                </div>
              );
            })}
          </div>
        )}

        {locked.length > 0 && (
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: TD, letterSpacing: 2, marginBottom: 8 }}>VERROUILLES</div>
            {locked.map(function(a) {
              return (
                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: S2, border: "1px solid " + BD, marginBottom: 6, opacity: 0.6 }}>
                  <span style={{ fontSize: 22, filter: "grayscale(1)" }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, color: TD }}>{a.name}</div>
                    <div style={{ fontSize: 10, color: TD }}>{a.desc}</div>
                  </div>
                  <span style={{ fontSize: 10, color: TD }}>🔒</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main App ── */
export default function App() {
  var ms = useState(INIT_MATCHES);
  var matches = ms[0];
  var setMatches = ms[1];
  var ps = useState(INIT_PLAYERS);
  var players = ps[0];
  var setPlayers = ps[1];
  var li = useState(null);
  var loggedIn = li[0];
  var setLoggedIn = li[1];
  var tb = useState("home");
  var tab = tb[0];
  var setTab = tb[1];
  var sp = useState(false);
  var spoil = sp[0];
  var setSpoil = sp[1];

  var isAdmin = loggedIn === "__admin";
  var currentUser = isAdmin ? "Ulysse" : loggedIn;
  var me = players.find(function(p) { return p.name === currentUser; });

  function handleUpdate(mid, player, field, value) {
    setMatches(function(prev) {
      return prev.map(function(m) {
        if (m.id !== mid) return m;
        if (player === "__result") {
          var copy = Object.assign({}, m);
          copy[field] = value;
          return copy;
        }
        var newPreds = Object.assign({}, m.preds);
        newPreds[player] = Object.assign({}, newPreds[player] || {});
        newPreds[player][field] = value;
        return Object.assign({}, m, { preds: newPreds });
      });
    });
  }

  function handleUpdatePlayer(i, p) {
    setPlayers(function(prev) {
      var n = prev.slice();
      n[i] = p;
      return n;
    });
  }

  if (!loggedIn) return <LoginScreen players={players} onLogin={setLoggedIn} />;

  var navItems = [
    { id: "home", label: "Accueil", icon: "🏠" },
    { id: "matches", label: "Matchs", icon: "⚔️" },
    { id: "stats", label: "Stats", icon: "📊" },
    { id: "profile", label: "Profil", icon: "👤" },
  ];

  return (
    <div style={{ background: BG, color: TP, fontFamily: FB, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "14px 16px 0", maxWidth: 660, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ cursor: "pointer" }} onClick={function() { setTab("home"); }}>
            <h1 style={{ fontFamily: FD, fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: 2, color: AC }}>LEC PRONOS</h1>
          </div>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <button onClick={function() { setSpoil(!spoil); }}
              style={{ background: spoil ? "#e8364f18" : S2, border: "1px solid " + (spoil ? "#e8364f33" : BD), borderRadius: 8, padding: "5px 8px", fontSize: 10, fontWeight: 600, color: spoil ? "#e8364f" : TD, cursor: "pointer" }}>
              {spoil ? "🔒" : "👁️"}
            </button>
            {isAdmin && <span style={{ fontSize: 9, padding: "3px 6px", borderRadius: 4, background: AC, color: "#000", fontWeight: 700 }}>ADMIN</span>}
            <button onClick={function() { setLoggedIn(null); }}
              style={{ background: S2, border: "1px solid " + BD, borderRadius: 8, padding: "5px 8px", fontSize: 9, fontWeight: 600, color: TD, cursor: "pointer" }}>
              Quitter
            </button>
          </div>
        </div>

        {spoil && (
          <div style={{ margin: "8px 0 0", padding: "5px 12px", borderRadius: 8, background: "#e8364f12", border: "1px solid #e8364f25", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, color: "#e8364f", fontWeight: 600 }}>🔒 Anti-spoil actif</span>
            <button onClick={function() { setSpoil(false); }}
              style={{ background: "#e8364f", color: "#fff", border: "none", borderRadius: 5, padding: "2px 8px", fontSize: 9, fontWeight: 600, cursor: "pointer" }}>
              Off
            </button>
          </div>
        )}

        <div style={{ display: "flex", gap: 0, marginTop: 10, borderBottom: "1px solid " + BD }}>
          {navItems.map(function(n) {
            return (
              <button key={n.id} onClick={function() { setTab(n.id); }}
                style={{ background: "transparent", border: "none", borderBottom: tab === n.id ? "2px solid " + AC : "2px solid transparent", color: tab === n.id ? AC : TD, padding: "8px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: FD, letterSpacing: 1 }}>
                {n.icon} {n.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "14px 16px 70px", maxWidth: 660, margin: "0 auto" }}>
        {tab === "home" && <Dashboard matches={matches} players={players} currentUser={currentUser} onNav={setTab} spoil={spoil} />}
        {tab === "matches" && <MatchesPage matches={matches} players={players} onUpdate={handleUpdate} currentUser={currentUser} isAdmin={isAdmin} spoil={spoil} />}
        {tab === "stats" && <StatsPage matches={matches} players={players} spoil={spoil} />}
        {tab === "profile" && <ProfilePage matches={matches} players={players} currentUser={currentUser} onUpdatePlayer={handleUpdatePlayer} />}
      </div>
    </div>
  );
}
