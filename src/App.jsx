import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

var supabase = createClient(
  "https://wokhcfcbkbvekcvyltci.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indva2hjZmNia2J2ZWtjdnlsdGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Mjk4ODcsImV4cCI6MjA5MjIwNTg4N30.oe7dXTkxKje1w6ClLDiAjuyITOaWYU1jjzRyZ03ORU4"
);

/* ═══ THEME ═══ */
var BG = "#06060e";
var S1 = "#0c0c1a";
var S2 = "#131328";
var BD = "#1e1e3a";
var TP = "#e8e8f8";
var TD = "#6a6a8a";
var N1 = "#00f0ff";
var N2 = "#a855f7";
var N3 = "#f43f5e";
var NG = "#22d3ee";
var FD = "'Chakra Petch', sans-serif";
var FB = "'DM Sans', sans-serif";
var CSS_ANIM = "@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}body{margin:0;background:#06060e}";

/* ═══ TEAMS ═══ */
var TI = {
  "G2 Esports": { s: "G2", c: "#00f0ff", logo: "http://static.lolesports.com/teams/G2-FullonDark.png" },
  "SK Gaming": { s: "SK", c: "#0088cc", logo: "http://static.lolesports.com/teams/1643979272144_SK_Monochrome.png" },
  "Heretics": { s: "TH", c: "#ff4655", logo: "http://static.lolesports.com/teams/1672933861879_Heretics-Full-Color.png" },
  "NaVi": { s: "NAVI", c: "#ffd700", logo: "http://static.lolesports.com/teams/1752746833620_NAVI_FullColor.png" },
  "GIANTX": { s: "GX", c: "#00c8ff", logo: "http://static.lolesports.com/teams/1765897105091_GIANTX-logotype-white.png" },
  "Fnatic": { s: "FNC", c: "#ff5900", logo: "http://static.lolesports.com/teams/1631819669150_fnc-2021-worlds.png" },
  "Shifters": { s: "SHFT", c: "#6c5ce7", logo: "http://static.lolesports.com/teams/1765897071435_600px-Shifters_allmode.png" },
  "Vitality": { s: "VIT", c: "#fee800", logo: "http://static.lolesports.com/teams/1675865863968_Vitality_FullColor.png" },
  "KCorp": { s: "KC", c: "#4a90d9", logo: "http://static.lolesports.com/teams/1704714951336_KC.png" },
  "KOI": { s: "KOI", c: "#00a6ff", logo: "http://static.lolesports.com/teams/1734012609283_MKOI_FullColor_Blue.png" },
  "Los Ratones": { s: "LR", c: "#c87533", logo: "http://static.lolesports.com/teams/1736206905390_LR1.png" },
};

/* ═══ PLAYERS ═══ */
var AVATARS = ["🦁","⚔️","🐉","🏰","🎯","🔥","💎","🌟","🐺","🦅","🎮","👑","⚡","🛡️","🗡️","🦊","🐍","🦈","🌙","🎲","🃏","🧙","🤖","👹","🐲","🎪"];
var PCOLORS = ["#e8364f","#3b82f6","#10b981","#f59e0b","#a855f7","#ec4899","#06b6d4","#84cc16","#f97316","#6366f1","#14b8a6","#e11d48"];

/* Exclusive SVG avatars unlocked by achievements */
var EX_AVATARS = [
  { id: "svg_dragon", name: "Dragon", req: "perfects_25", color: "#a855f7" },
  { id: "svg_swords", name: "Lames", req: "wins_100", color: "#f43f5e" },
  { id: "svg_crown", name: "Couronne", req: "wins_250", color: "#ffd700" },
  { id: "svg_eye", name: "Oracle", req: "wr85", color: "#00f0ff" },
  { id: "svg_mask", name: "Chaos", req: "upsets_25", color: "#f97316" },
  { id: "svg_shield", name: "Bouclier", req: "games_100", color: "#3b82f6" },
  { id: "svg_potion", name: "Potion", req: "games_200", color: "#10b981" },
  { id: "svg_stars", name: "Constellation", req: "pts_500", color: "#fbbf24" },
  { id: "svg_serpent", name: "Serpent", req: "leg_wins", color: "#7c3aed" },
  { id: "svg_phoenix", name: "Phoenix", req: "streak_15", color: "#f59e0b" },
];

/* Ornaments (avatar frames) */
var ORNAMENTS = [
  { id: "none", name: "Aucun", req: null, color: null },
  { id: "bronze", name: "Bronze", req: "rank_bronze1", color: "#cd7f32", style: "solid" },
  { id: "silver", name: "Silver", req: "rank_silver1", color: "#c0c0c0", style: "solid" },
  { id: "gold", name: "Gold", req: "rank_gold1", color: "#ffd700", style: "solid" },
  { id: "plat", name: "Platinum", req: "rank_plat1", color: "#00f0ff", style: "double" },
  { id: "diamond", name: "Diamond", req: "rank_dia1", color: "#a855f7", style: "double" },
  { id: "master", name: "Master", req: "rank_master1", color: "#f43f5e", style: "double" },
  { id: "chall", name: "Challenger", req: "rank_chall1", color: "#ff6b35", style: "glow" },
  { id: "flame", name: "Flammes", req: "streak_15", color: "#ff6b35", style: "special" },
  { id: "cosmic", name: "Cosmique", req: "perfects_25", color: "#a855f7", style: "special" },
  { id: "hextech", name: "Hextech", req: "leg_wins", color: "#00f0ff", style: "special" },
  { id: "glacial", name: "Glacial", req: "wr85", color: "#67e8f9", style: "special" },
  { id: "abyssal", name: "Abyssal", req: "upsets_25", color: "#6366f1", style: "special" },
  { id: "infernal", name: "Infernal", req: "streak_20", color: "#dc2626", style: "special" },
];

/* Color name styles */
var CSTYLES = [
  { id: "solid", name: "Classique", req: null, effect: "none" },
  { id: "neon", name: "Neon", req: "rank_gold1", effect: "neon" },
  { id: "fire", name: "Flamme", req: "rank_plat1", effect: "fire" },
  { id: "gold", name: "Or", req: "rank_master1", effect: "gold" },
  { id: "rainbow", name: "Arc-en-ciel", req: "upsets_25", effect: "rainbow" },
  { id: "void", name: "Void", req: "rank_chall1", effect: "void" },
];
var SC3 = ["2-0","2-1","0-2","1-2"];
var SC5 = ["3-0","3-1","3-2","0-3","1-3","2-3"];

var INIT_P = [
  { name: "Ulysse", color: "#e8364f", emoji: "🦁", pin: "1111", title: null, ornament: "none", cstyle: "solid" },
  { name: "César", color: "#3b82f6", emoji: "⚔️", pin: "2222", title: null, ornament: "none", cstyle: "solid" },
  { name: "Emilien", color: "#10b981", emoji: "🐉", pin: "3333", title: null, ornament: "none", cstyle: "solid" },
  { name: "Arthur", color: "#f59e0b", emoji: "🏰", pin: "4444", title: null, ornament: "none", cstyle: "solid" },
];

/* ═══ MATCHES ═══ */
var INIT_M = [
  {id:1,week:1,day:"SAM 28/03",team1:"GIANTX",team2:"Fnatic",bo:3,cote1:1.5,cote2:2.4,winner:"GIANTX",score:"2-1",preds:{Ulysse:{winner:"GIANTX",score:"2-1"},"César":{winner:"GIANTX",score:"2-1"},Emilien:{winner:"Fnatic",score:"0-2"},Arthur:{winner:"Fnatic",score:"1-2"}}},
  {id:2,week:1,day:"SAM 28/03",team1:"KCorp",team2:"Vitality",bo:3,cote1:1.2,cote2:3.7,winner:"KCorp",score:"2-1",preds:{Ulysse:{winner:"KCorp",score:"2-0"},"César":{winner:"KCorp",score:"2-0"},Emilien:{winner:"KCorp",score:"2-0"},Arthur:{winner:"KCorp",score:"2-1"}}},
  {id:3,week:1,day:"SAM 28/03",team1:"NaVi",team2:"KOI",bo:3,cote1:3,cote2:1.4,winner:"NaVi",score:"2-1",preds:{Ulysse:{winner:"KOI",score:"1-2"},"César":{winner:"NaVi",score:"2-1"},Emilien:{winner:"KOI",score:"0-2"},Arthur:{winner:"KOI",score:"1-2"}}},
  {id:4,week:1,day:"DIM 29/03",team1:"SK Gaming",team2:"Heretics",bo:3,cote1:2.7,cote2:1.4,winner:"Heretics",score:"1-2",preds:{Ulysse:{winner:"Heretics",score:"1-2"},"César":{winner:"SK Gaming",score:"2-1"},Emilien:{winner:"SK Gaming",score:"2-0"},Arthur:{winner:"Heretics",score:"0-2"}}},
  {id:5,week:1,day:"DIM 29/03",team1:"KOI",team2:"Fnatic",bo:3,cote1:1.3,cote2:3.3,winner:"KOI",score:"2-0",preds:{Ulysse:{winner:"KOI",score:"2-0"},"César":{winner:"KOI",score:"2-1"},Emilien:{winner:"KOI",score:"2-1"},Arthur:{winner:"KOI",score:"2-1"}}},
  {id:6,week:1,day:"LUN 30/03",team1:"NaVi",team2:"SK Gaming",bo:3,cote1:1.2,cote2:3.9,winner:"NaVi",score:"2-1",preds:{Ulysse:{winner:"NaVi",score:"2-0"},"César":{winner:"SK Gaming",score:"1-2"},Emilien:{winner:"NaVi",score:"2-1"},Arthur:{winner:"NaVi",score:"2-0"}}},
  {id:7,week:1,day:"LUN 30/03",team1:"Heretics",team2:"Vitality",bo:3,cote1:2.4,cote2:1.5,winner:"Vitality",score:"0-2",preds:{Ulysse:{winner:"Vitality",score:"0-2"},"César":{winner:"Vitality",score:"0-2"},Emilien:{winner:"Vitality",score:"0-2"},Arthur:{winner:"Vitality",score:"0-2"}}},
  {id:8,week:2,day:"SAM 04/04",team1:"SK Gaming",team2:"Shifters",bo:3,cote1:2.1,cote2:1.6,winner:"SK Gaming",score:"2-0",preds:{Ulysse:{winner:"SK Gaming",score:"2-0"},"César":{winner:"Shifters",score:"1-2"},Emilien:{winner:"Shifters",score:"1-2"},Arthur:{winner:"Shifters",score:"1-2"}}},
  {id:9,week:2,day:"SAM 04/04",team1:"G2 Esports",team2:"Heretics",bo:3,cote1:1.1,cote2:7,winner:"G2 Esports",score:"2-0",preds:{Ulysse:{winner:"G2 Esports",score:"2-0"},"César":{winner:"G2 Esports",score:"2-0"},Emilien:{winner:"G2 Esports",score:"2-0"},Arthur:{winner:"G2 Esports",score:"2-0"}}},
  {id:10,week:2,day:"SAM 04/04",team1:"NaVi",team2:"Vitality",bo:3,cote1:2,cote2:1.7,winner:"Vitality",score:"0-2",preds:{Ulysse:{winner:"Vitality",score:"1-2"},"César":{winner:"NaVi",score:"2-1"},Emilien:{winner:"NaVi",score:"2-1"},Arthur:{winner:"Vitality",score:"1-2"}}},
  {id:11,week:2,day:"DIM 05/04",team1:"SK Gaming",team2:"GIANTX",bo:3,cote1:5,cote2:1.2,winner:"GIANTX",score:"0-2",preds:{Ulysse:{winner:"GIANTX",score:"1-2"},"César":{winner:"GIANTX",score:"0-2"},Emilien:{winner:"GIANTX",score:"1-2"},Arthur:{winner:"SK Gaming",score:"2-0"}}},
  {id:12,week:2,day:"DIM 05/04",team1:"Fnatic",team2:"G2 Esports",bo:3,cote1:6.3,cote2:1.2,winner:"Fnatic",score:"2-1",preds:{Ulysse:{winner:"G2 Esports",score:"0-2"},"César":{winner:"G2 Esports",score:"0-2"},Emilien:{winner:"G2 Esports",score:"0-2"},Arthur:{winner:"G2 Esports",score:"0-2"}}},
  {id:13,week:2,day:"LUN 06/04",team1:"GIANTX",team2:"Heretics",bo:3,cote1:1.3,cote2:3.3,winner:"GIANTX",score:"2-1",preds:{Ulysse:{winner:"GIANTX",score:"2-1"},"César":{winner:"GIANTX",score:"2-1"},Emilien:{winner:"GIANTX",score:"2-1"},Arthur:{winner:"Heretics",score:"1-2"}}},
  {id:14,week:2,day:"LUN 06/04",team1:"Vitality",team2:"KOI",bo:3,cote1:2.7,cote2:1.4,winner:"Vitality",score:"2-1",preds:{Ulysse:{winner:"Vitality",score:"2-1"},"César":{winner:"Vitality",score:"2-1"},Emilien:{winner:"KOI",score:"1-2"},Arthur:{winner:"Vitality",score:"2-1"}}},
  {id:15,week:3,day:"SAM 11/04",team1:"Heretics",team2:"NaVi",bo:3,cote1:2.8,cote2:1.4,winner:"NaVi",score:"0-2",preds:{Ulysse:{winner:"NaVi",score:"1-2"},"César":{winner:"NaVi",score:"0-2"},Emilien:{winner:"NaVi",score:"0-2"},Arthur:{winner:"NaVi",score:"0-2"}}},
  {id:16,week:3,day:"SAM 11/04",team1:"G2 Esports",team2:"Vitality",bo:3,cote1:1.3,cote2:3.5,winner:"Vitality",score:"1-2",preds:{Ulysse:{winner:"G2 Esports",score:"2-1"},"César":{winner:"G2 Esports",score:"2-1"},Emilien:{winner:"G2 Esports",score:"2-1"},Arthur:{winner:"G2 Esports",score:"2-1"}}},
  {id:17,week:3,day:"SAM 11/04",team1:"KOI",team2:"SK Gaming",bo:3,cote1:1.2,cote2:4.5,winner:"KOI",score:"2-0",preds:{Ulysse:{winner:"KOI",score:"2-0"},"César":{winner:"KOI",score:"2-0"},Emilien:{winner:"KOI",score:"2-1"},Arthur:{winner:"SK Gaming",score:"1-2"}}},
  {id:18,week:3,day:"DIM 12/04",team1:"Vitality",team2:"Shifters",bo:3,cote1:1.2,cote2:4.5,winner:"Vitality",score:"2-1",preds:{Ulysse:{winner:"Vitality",score:"2-0"},"César":{winner:"Vitality",score:"2-0"},Emilien:{winner:"Vitality",score:"2-1"},Arthur:{winner:"Vitality",score:"2-1"}}},
  {id:19,week:3,day:"DIM 12/04",team1:"Heretics",team2:"KCorp",bo:3,cote1:4.7,cote2:1.2,winner:"KCorp",score:"0-2",preds:{Ulysse:{winner:"KCorp",score:"0-2"},"César":{winner:"KCorp",score:"0-2"},Emilien:{winner:"KCorp",score:"0-2"},Arthur:{winner:"KCorp",score:"0-2"}}},
  {id:20,week:3,day:"LUN 13/04",team1:"Fnatic",team2:"SK Gaming",bo:3,cote1:1.3,cote2:3.4,winner:"SK Gaming",score:"0-2",preds:{Ulysse:{winner:"Fnatic",score:"2-0"},"César":{winner:"Fnatic",score:"2-0"},Emilien:{winner:"Fnatic",score:"2-1"},Arthur:{winner:"Fnatic",score:"2-1"}}},
  {id:21,week:3,day:"LUN 13/04",team1:"GIANTX",team2:"Shifters",bo:3,cote1:1.1,cote2:6,winner:"GIANTX",score:"2-0",preds:{Ulysse:{winner:"GIANTX",score:"2-0"},"César":{winner:"GIANTX",score:"2-0"},Emilien:{winner:"Shifters",score:"1-2"},Arthur:{winner:"GIANTX",score:"2-0"}}},
  /* ═══ WEEK 4 ═══ */
  {id:22,week:4,day:"SAM 18/04",team1:"GIANTX",team2:"NaVi",bo:3,cote1:1.7,cote2:2,winner:"NaVi",score:"1-2",preds:{Ulysse:{winner:"GIANTX",score:"2-1"},"César":{winner:"NaVi",score:"1-2"},Emilien:{winner:"NaVi",score:"1-2"},Arthur:{winner:"NaVi",score:"0-2"}}},
  {id:23,week:4,day:"SAM 18/04",team1:"G2 Esports",team2:"SK Gaming",bo:3,cote1:1.1,cote2:5.3,winner:"G2 Esports",score:"2-0",preds:{Ulysse:{winner:"G2 Esports",score:"2-0"},"César":{winner:"G2 Esports",score:"2-0"},Emilien:{winner:"G2 Esports",score:"2-1"},Arthur:{winner:"G2 Esports",score:"2-1"}}},
  {id:24,week:4,day:"DIM 19/04",team1:"Vitality",team2:"GIANTX",bo:3,cote1:1.8,cote2:1.9,winner:"Vitality",score:"2-1",preds:{Ulysse:{winner:"Vitality",score:"2-1"},"César":{winner:"GIANTX",score:"2-1"},Emilien:{winner:"Vitality",score:"2-1"},Arthur:{winner:"Vitality",score:"0-2"}}},
  {id:25,week:4,day:"DIM 19/04",team1:"Heretics",team2:"KOI",bo:3,cote1:5.3,cote2:1.1,winner:"KOI",score:"0-2",preds:{Ulysse:{winner:"KOI",score:"0-2"},"César":{winner:"KOI",score:"0-2"},Emilien:{winner:"KOI",score:"0-2"},Arthur:{winner:"KOI",score:"0-2"}}},
  {id:26,week:4,day:"LUN 20/04",team1:"Shifters",team2:"G2 Esports",bo:3,cote1:5.8,cote2:1.1,winner:null,score:null,preds:{Ulysse:{winner:"G2 Esports",score:"0-2"},"César":{winner:"G2 Esports",score:"0-2"},Emilien:{winner:"G2 Esports",score:"0-2"},Arthur:{winner:"G2 Esports",score:"0-2"}}},
  {id:27,week:4,day:"LUN 20/04",team1:"SK Gaming",team2:"KCorp",bo:3,cote1:5.8,cote2:1.1,winner:null,score:null,preds:{Ulysse:{winner:"KCorp",score:"0-2"},"César":{winner:"KCorp",score:"0-2"},Emilien:{winner:"KCorp",score:"0-2"},Arthur:{winner:"KCorp",score:"0-2"}}},
  /* ═══ WEEK 5 (LEC Roadtrip KC) ═══ */
  {id:28,week:5,day:"JEU 24/04",team1:"Shifters",team2:"Fnatic",bo:3,cote1:3.5,cote2:1.3,winner:null,score:null,preds:{}},
  {id:29,week:5,day:"JEU 24/04",team1:"NaVi",team2:"KCorp",bo:3,cote1:1.8,cote2:1.9,winner:null,score:null,preds:{}},
  {id:30,week:5,day:"VEN 25/04",team1:"Fnatic",team2:"NaVi",bo:3,cote1:3.5,cote2:1.3,winner:null,score:null,preds:{}},
  {id:31,week:5,day:"VEN 25/04",team1:"KCorp",team2:"Shifters",bo:3,cote1:1.2,cote2:4,winner:null,score:null,preds:{}},
  {id:32,week:5,day:"SAM 26/04",team1:"KCorp",team2:"Fnatic",bo:3,cote1:1.3,cote2:3.5,winner:null,score:null,preds:{}},
  /* ═══ WEEK 6 ═══ */
  {id:33,week:6,day:"SAM 02/05",team1:"Fnatic",team2:"Heretics",bo:3,cote1:1.5,cote2:2.5,winner:null,score:null,preds:{}},
  {id:34,week:6,day:"SAM 02/05",team1:"Vitality",team2:"SK Gaming",bo:3,cote1:1.1,cote2:5.5,winner:null,score:null,preds:{}},
  {id:35,week:6,day:"DIM 03/05",team1:"Heretics",team2:"Shifters",bo:3,cote1:1.8,cote2:1.9,winner:null,score:null,preds:{}},
  {id:36,week:6,day:"DIM 03/05",team1:"G2 Esports",team2:"NaVi",bo:3,cote1:1.4,cote2:2.8,winner:null,score:null,preds:{}},
  {id:37,week:6,day:"LUN 04/05",team1:"KOI",team2:"GIANTX",bo:3,cote1:1.5,cote2:2.3,winner:null,score:null,preds:{}},
  {id:38,week:6,day:"LUN 04/05",team1:"SK Gaming",team2:"NaVi",bo:3,cote1:4,cote2:1.2,winner:null,score:null,preds:{}},
  /* ═══ WEEK 7 ═══ */
  {id:39,week:7,day:"SAM 09/05",team1:"KOI",team2:"Vitality",bo:3,cote1:2.5,cote2:1.5,winner:null,score:null,preds:{}},
  {id:40,week:7,day:"SAM 09/05",team1:"Shifters",team2:"NaVi",bo:3,cote1:4,cote2:1.2,winner:null,score:null,preds:{}},
  {id:41,week:7,day:"DIM 10/05",team1:"GIANTX",team2:"G2 Esports",bo:3,cote1:1.6,cote2:2.2,winner:null,score:null,preds:{}},
  {id:42,week:7,day:"DIM 10/05",team1:"Fnatic",team2:"KOI",bo:3,cote1:3,cote2:1.4,winner:null,score:null,preds:{}},
  {id:43,week:7,day:"LUN 11/05",team1:"SK Gaming",team2:"Heretics",bo:3,cote1:1.8,cote2:1.9,winner:null,score:null,preds:{}},
  {id:44,week:7,day:"LUN 11/05",team1:"Vitality",team2:"Fnatic",bo:3,cote1:1.2,cote2:4,winner:null,score:null,preds:{}},
];

/* ═══ 28 RANKS (7 tiers x 4 divisions) ═══ */
var TIERS = [
  { n: "Bronze", c: "#cd7f32", base: 0 },
  { n: "Silver", c: "#c0c0c0", base: 50 },
  { n: "Gold", c: "#ffd700", base: 150 },
  { n: "Platinum", c: "#00f0ff", base: 350 },
  { n: "Diamond", c: "#a855f7", base: 700 },
  { n: "Master", c: "#f43f5e", base: 1300 },
  { n: "Challenger", c: "#ff6b35", base: 2500 },
];

var RANKS = [];
(function() {
  for (var t = 0; t < TIERS.length; t++) {
    var tier = TIERS[t];
    var nb = t < TIERS.length - 1 ? TIERS[t + 1].base : tier.base + 3000;
    var step = (nb - tier.base) / 4;
    for (var d = 4; d >= 1; d--) {
      var divLabel = d === 4 ? "IV" : d === 3 ? "III" : d === 2 ? "II" : "I";
      RANKS.push({
        tier: tier.n, div: d, color: tier.c,
        xp: Math.round(tier.base + (4 - d) * step),
        label: tier.n + " " + divLabel,
      });
    }
  }
})();

function getRank(xp) {
  var cur = RANKS[0];
  var idx = 0;
  for (var i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i].xp) { cur = RANKS[i]; idx = i; }
  }
  var nx = idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
  var prog = nx ? Math.min((xp - cur.xp) / (nx.xp - cur.xp), 1) : 1;
  return { rank: cur, next: nx, progress: prog, xp: xp, idx: idx };
}

/* ═══ TITLES ═══ */
var TITLES = [
  { id: null, name: "Aucun" },
  { id: "rookie", name: "Rookie", req: "first_win" },
  { id: "sniper", name: "Le Sniper", req: "wins_25" },
  { id: "veteran", name: "Le Veteran", req: "games_50" },
  { id: "devin", name: "Le Devin", req: "perfects_10" },
  { id: "oracle", name: "L'Oracle", req: "perfects_25" },
  { id: "risk", name: "Le Risk Taker", req: "upsets_10" },
  { id: "chaos", name: "Chaos Master", req: "upsets_25" },
  { id: "analyste", name: "L'Analyste", req: "wr70" },
  { id: "prodige", name: "Le Prodige", req: "wr85" },
  { id: "inarretable", name: "L'Inarretable", req: "streak_10" },
  { id: "immortel", name: "L'Immortel", req: "streak_15" },
  { id: "kcfan", name: "Fan Karmine", req: "kc_master" },
  { id: "perfectday", name: "Le Perfectionniste", req: "perfect_day" },
  { id: "goat", name: "Le GOAT", req: "wins_250" },
];

/* ═══ 40 ACHIEVEMENTS ═══ */
var ACH_CATS = [
  { id: "prog", name: "Progression", color: N1 },
  { id: "prec", name: "Precision", color: "#FFD700" },
  { id: "risk", name: "Risque", color: N3 },
  { id: "streak", name: "Series", color: "#f97316" },
  { id: "team", name: "Equipes", color: NG },
  { id: "meta", name: "Meta", color: N2 },
  { id: "legend", name: "Legende", color: "#ff6b35" },
];

var ACHS = [
  /* PROGRESSION */
  { id:"first_win",cat:"prog",icon:"⭐",name:"Premiere victoire",desc:"Gagne 1 prono",xp:10,title:"rookie" },
  { id:"wins_10",cat:"prog",icon:"🎯",name:"10 victoires",desc:"Gagne 10 pronos",xp:20 },
  { id:"wins_25",cat:"prog",icon:"🏹",name:"Tireur d'elite",desc:"Gagne 25 pronos",xp:40,title:"sniper" },
  { id:"wins_50",cat:"prog",icon:"💪",name:"Machine",desc:"Gagne 50 pronos",xp:80 },
  { id:"wins_100",cat:"prog",icon:"🗡️",name:"Centurion",desc:"Gagne 100 pronos",xp:150 },
  { id:"wins_250",cat:"prog",icon:"🏆",name:"Legende des pronos",desc:"Gagne 250 pronos",xp:400,title:"goat" },
  { id:"games_25",cat:"prog",icon:"📝",name:"Regulier",desc:"Joue 25 matchs",xp:15 },
  { id:"games_50",cat:"prog",icon:"📚",name:"Veteran",desc:"Joue 50 matchs",xp:40,title:"veteran" },
  { id:"games_100",cat:"prog",icon:"🏛️",name:"Pilier",desc:"Joue 100 matchs",xp:80 },
  { id:"games_200",cat:"prog",icon:"⚱️",name:"Monument",desc:"Joue 200 matchs",xp:200 },
  { id:"pts_50",cat:"prog",icon:"💵",name:"Premier gain",desc:"Cumule 50 points",xp:20 },
  { id:"pts_150",cat:"prog",icon:"💰",name:"Bankeur",desc:"Cumule 150 points",xp:50 },
  { id:"pts_500",cat:"prog",icon:"💎",name:"Millionnaire",desc:"Cumule 500 points",xp:150 },
  { id:"pts_1000",cat:"prog",icon:"👑",name:"Magnat",desc:"Cumule 1000 points",xp:400 },
  /* PRECISION */
  { id:"perf_1",cat:"prec",icon:"✨",name:"Etoile filante",desc:"1 score exact",xp:15 },
  { id:"perf_5",cat:"prec",icon:"💫",name:"Devin",desc:"5 scores exacts",xp:40 },
  { id:"perfects_10",cat:"prec",icon:"🔮",name:"Oracle",desc:"10 scores exacts",xp:80,title:"devin" },
  { id:"perfects_25",cat:"prec",icon:"🌠",name:"Omniscient",desc:"25 scores exacts",xp:200,title:"oracle" },
  { id:"perfects_50",cat:"prec",icon:"🪐",name:"Dieu du prono",desc:"50 scores exacts",xp:500 },
  { id:"wr70",cat:"prec",icon:"📊",name:"Analyste",desc:"WR 70%+ (10 matchs min)",xp:50,title:"analyste" },
  { id:"wr85",cat:"prec",icon:"🧠",name:"Prodige",desc:"WR 85%+ (20 matchs min)",xp:150,title:"prodige" },
  /* RISQUE */
  { id:"upset_1",cat:"risk",icon:"🎲",name:"Risk taker",desc:"1 upset (cote 2.5+)",xp:15 },
  { id:"upset_5",cat:"risk",icon:"🃏",name:"Intuition",desc:"5 upsets",xp:50 },
  { id:"upsets_10",cat:"risk",icon:"🎪",name:"Upset Master",desc:"10 upsets",xp:120,title:"risk" },
  { id:"upsets_25",cat:"risk",icon:"🎭",name:"Prince du chaos",desc:"25 upsets",xp:300,title:"chaos" },
  { id:"huge_upset",cat:"risk",icon:"🚀",name:"L'impossible",desc:"Gagne avec cote 5+",xp:75 },
  { id:"big_win",cat:"risk",icon:"🎰",name:"Jackpot",desc:"+10 pts en 1 match",xp:50 },
  { id:"mega_win",cat:"risk",icon:"🤑",name:"Mega Jackpot",desc:"+20 pts en 1 match",xp:150 },
  /* SERIES */
  { id:"streak_3",cat:"streak",icon:"🔥",name:"En feu",desc:"3 wins de suite",xp:20 },
  { id:"streak_5",cat:"streak",icon:"💥",name:"Enchaine",desc:"5 wins de suite",xp:50 },
  { id:"streak_10",cat:"streak",icon:"🌋",name:"Inarretable",desc:"10 wins de suite",xp:150,title:"inarretable" },
  { id:"streak_15",cat:"streak",icon:"☄️",name:"Comete",desc:"15 wins de suite",xp:350,title:"immortel" },
  { id:"streak_20",cat:"streak",icon:"⚡",name:"Foudre divine",desc:"20 wins de suite",xp:700 },
  /* EQUIPES */
  { id:"kc_master",cat:"team",icon:"🦁",name:"Fan Karmine",desc:"10 wins sur KCorp",xp:60,title:"kcfan" },
  { id:"team_spec",cat:"team",icon:"🎯",name:"Specialiste",desc:"20 wins sur 1 equipe",xp:150 },
  { id:"team_8",cat:"team",icon:"🌈",name:"Cosmopolite",desc:"Gagne sur 8 equipes diff.",xp:100 },
  { id:"team_all",cat:"team",icon:"🗺️",name:"Expert LEC",desc:"Gagne sur les 10 equipes",xp:250 },
  /* META */
  { id:"perfect_day",cat:"meta",icon:"🌞",name:"Journee parfaite",desc:"100% de wins en 1 jour (3+ matchs)",xp:100,title:"perfectday" },
  { id:"early_bird",cat:"meta",icon:"🐦",name:"Early bird",desc:"Pronostique tous les matchs d'1 semaine",xp:30 },
  /* LEGENDE */
  { id:"leg_wins",cat:"legend",icon:"💀",name:"500 victoires",desc:"Gagne 500 pronos",xp:1000,hidden:true },
  { id:"leg_streak",cat:"legend",icon:"🔥",name:"Chaine incassable",desc:"25 wins de suite",xp:1500,hidden:true },
  { id:"leg_perf",cat:"legend",icon:"🌌",name:"Voyant cosmique",desc:"100 scores exacts",xp:1500,hidden:true },
];

/* ═══ UTILS ═══ */
function calcPts(m, pr) {
  if (!m.winner || !pr || !pr.winner) return 0;
  if (pr.winner !== m.winner) return 0;
  var c = pr.winner === m.team1 ? m.cote1 : m.cote2;
  return pr.score === m.score ? c * 2 : c;
}

function winOf(t1, t2, sc) {
  if (!sc) return null;
  var p = sc.split("-");
  return Number(p[0]) > Number(p[1]) ? t1 : t2;
}

function rd(n) { return Math.round(n * 10) / 10; }

function getStats(matches, name) {
  var w = 0, pf = 0, tot = 0, pl = 0, streak = 0, maxS = 0, ups = 0;
  var bigW = 0, hugeUps = 0;
  var teams = {};
  var teamWins = {};
  matches.forEach(function(m) {
    if (!m.winner || !m.preds[name] || !m.preds[name].winner) return;
    pl++;
    var p = calcPts(m, m.preds[name]);
    tot += p;
    if (p > 0) {
      w++; streak++;
      if (streak > maxS) maxS = streak;
      if (p > bigW) bigW = p;
      var cw = m.winner === m.team1 ? m.cote1 : m.cote2;
      if (cw >= 2.5) ups++;
      if (cw >= 5) hugeUps++;
      teams[m.winner] = true;
      teamWins[m.winner] = (teamWins[m.winner] || 0) + 1;
    } else {
      streak = 0;
    }
    if (p > 0 && m.preds[name].score === m.score) pf++;
  });
  var wr = pl > 0 ? Math.round(w / pl * 100) : 0;
  var maxTW = 0;
  Object.keys(teamWins).forEach(function(k) {
    if (teamWins[k] > maxTW) maxTW = teamWins[k];
  });
  return {
    played: pl, wins: w, perfects: pf, total: rd(tot), wr: wr,
    maxStreak: maxS, upsets: ups, bigWin: bigW,
    hugeUpsets: hugeUps, diffTeams: Object.keys(teams).length,
    kcWins: teamWins["KCorp"] || 0, maxTeamWins: maxTW,
  };
}

function checkAch(a, s) {
  switch (a.id) {
    case "first_win": return s.wins >= 1;
    case "wins_10": return s.wins >= 10;
    case "wins_25": return s.wins >= 25;
    case "wins_50": return s.wins >= 50;
    case "wins_100": return s.wins >= 100;
    case "wins_250": return s.wins >= 250;
    case "games_25": return s.played >= 25;
    case "games_50": return s.played >= 50;
    case "games_100": return s.played >= 100;
    case "games_200": return s.played >= 200;
    case "pts_50": return s.total >= 50;
    case "pts_150": return s.total >= 150;
    case "pts_500": return s.total >= 500;
    case "pts_1000": return s.total >= 1000;
    case "perf_1": return s.perfects >= 1;
    case "perf_5": return s.perfects >= 5;
    case "perfects_10": return s.perfects >= 10;
    case "perfects_25": return s.perfects >= 25;
    case "perfects_50": return s.perfects >= 50;
    case "wr70": return s.played >= 10 && s.wr >= 70;
    case "wr85": return s.played >= 20 && s.wr >= 85;
    case "upset_1": return s.upsets >= 1;
    case "upset_5": return s.upsets >= 5;
    case "upsets_10": return s.upsets >= 10;
    case "upsets_25": return s.upsets >= 25;
    case "huge_upset": return s.hugeUpsets >= 1;
    case "big_win": return s.bigWin >= 10;
    case "mega_win": return s.bigWin >= 20;
    case "streak_3": return s.maxStreak >= 3;
    case "streak_5": return s.maxStreak >= 5;
    case "streak_10": return s.maxStreak >= 10;
    case "streak_15": return s.maxStreak >= 15;
    case "streak_20": return s.maxStreak >= 20;
    case "kc_master": return s.kcWins >= 10;
    case "team_spec": return s.maxTeamWins >= 20;
    case "team_8": return s.diffTeams >= 8;
    case "team_all": return s.diffTeams >= 10;
    case "perfect_day": return false;
    case "early_bird": return s.played >= 7;
    case "leg_wins": return s.wins >= 500;
    case "leg_streak": return s.maxStreak >= 25;
    case "leg_perf": return s.perfects >= 100;
    default: return false;
  }
}

function getUnlocked(s) {
  return ACHS.filter(function(a) { return checkAch(a, s); });
}

function getTotalXP(s) {
  var base = Math.floor(s.total * 2);
  var bonus = 0;
  getUnlocked(s).forEach(function(a) { bonus += a.xp; });
  return base + bonus;
}

function getAvailTitles(s) {
  var ids = getUnlocked(s).map(function(a) { return a.id; });
  return TITLES.filter(function(t) {
    return !t.req || ids.indexOf(t.req) !== -1;
  });
}

/* Get all unlocked IDs (achievements + rank milestones) */
function getAllIds(s) {
  var ids = getUnlocked(s).map(function(a) { return a.id; });
  var xp = getTotalXP(s);
  var r = getRank(xp);
  /* Add rank milestone IDs based on rank index */
  if (r.idx >= 3) ids.push("rank_bronze1");
  if (r.idx >= 7) ids.push("rank_silver1");
  if (r.idx >= 11) ids.push("rank_gold1");
  if (r.idx >= 15) ids.push("rank_plat1");
  if (r.idx >= 19) ids.push("rank_dia1");
  if (r.idx >= 23) ids.push("rank_master1");
  if (r.idx >= 27) ids.push("rank_chall1");
  return ids;
}

function getAvailAvatars(ids, preview) {
  var avail = AVATARS.slice();
  EX_AVATARS.forEach(function(ea) {
    if (ids.indexOf(ea.req) !== -1 || preview) avail.push(ea.id);
  });
  return avail;
}

function getAvailOrnaments(ids) {
  return ORNAMENTS.filter(function(o) {
    return !o.req || ids.indexOf(o.req) !== -1;
  });
}

function getAvailCStyles(ids) {
  return CSTYLES.filter(function(cs) {
    return !cs.req || ids.indexOf(cs.req) !== -1;
  });
}

/* ═══ SMALL COMPONENTS ═══ */
function TeamLogo(props) {
  var t = props.team;
  var sz = props.size || 30;
  var info = TI[t] || { s: "??", c: "#555", logo: null };
  var err = useState(false);
  var hasError = err[0];
  var setError = err[1];

  if (info.logo && !hasError) {
    return (
      <div style={{ width: sz, height: sz, borderRadius: 8, background: info.c + "10", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
        <img
          src={info.logo}
          alt={info.s}
          onError={function() { setError(true); }}
          style={{ width: sz - 4, height: sz - 4, objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <div style={{ width: sz, height: sz, borderRadius: 8, background: info.c + "15", border: "1px solid " + info.c + "40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.max(sz * 0.28, 8), fontWeight: 800, color: info.c, flexShrink: 0, fontFamily: FD }}>
      {info.s}
    </div>
  );
}

/* Helper: display emoji or SVG avatar inline at given size */
function MiniAvatar(props) {
  var player = props.player; var sz = props.size || 14;
  if (player.emoji && player.emoji.indexOf("svg_") === 0) {
    return <span style={{ display: "inline-block", width: sz, height: sz, verticalAlign: "middle" }}><PlayerAvatar player={Object.assign({}, player, { ornament: "none" })} size={sz} rankInfo={null} /></span>;
  }
  return <span style={{ fontSize: sz }}>{player.emoji}</span>;
}

function NeonCard(props) {
  var g = props.glow || N1;
  return (
    <div style={{ background: S1, borderRadius: 16, border: "1px solid " + g + "20", boxShadow: "0 0 20px " + g + "08", padding: props.pad || "16px 18px", overflow: "hidden" }}>
      {props.children}
    </div>
  );
}

function RankBadge(props) {
  var r = props.rank;
  return (
    <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 6, fontSize: 9, fontWeight: 700, fontFamily: FD, letterSpacing: 1, background: r.color + "18", border: "1px solid " + r.color + "40", color: r.color }}>
      {r.label}
    </span>
  );
}

function TitleTag(props) {
  var tid = props.titleId;
  if (!tid) return null;
  var t = TITLES.find(function(x) { return x.id === tid; });
  if (!t) return null;
  return (
    <div style={{ fontSize: 9, fontStyle: "italic", color: N1, fontFamily: FD, marginTop: 1 }}>
      "{t.name}"
    </div>
  );
}

/* Avatar with hexagonal rank frame */
function PlayerAvatar(props) {
  var player = props.player;
  var sz = props.size || 48;
  var ri = props.rankInfo;
  var rankColor = player.color;
  var tierName = ri ? ri.rank.tier : "Bronze";

  /* Scale factor based on size */
  var s = sz / 100;
  var vb = "0 0 100 100";

  /* Determine tier level for visual complexity */
  var tierLevel = 0;
  if (tierName === "Bronze") tierLevel = 1;
  else if (tierName === "Silver") tierLevel = 2;
  else if (tierName === "Gold") tierLevel = 3;
  else if (tierName === "Platinum") tierLevel = 4;
  else if (tierName === "Diamond") tierLevel = 5;
  else if (tierName === "Master") tierLevel = 6;
  else if (tierName === "Challenger") tierLevel = 7;

  /* Hex points helper centered at 50,50 */
  var hexOuter = "50,8 86.4,29 86.4,71 50,92 13.6,71 13.6,29";
  var hexMid = "50,12 83,31 83,69 50,88 17,69 17,31";
  var hexInner = "50,18 77.7,35 77.7,65 50,82 22.3,65 22.3,35";

  return (
    <div style={{ width: sz, height: sz, flexShrink: 0, position: "relative" }}>
      <svg viewBox={vb} width={sz} height={sz} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Iron: simple single hex */}
        {tierLevel <= 0 && (
          <polygon points={hexMid} fill={S1} stroke={rankColor} strokeWidth="2.5" />
        )}

        {/* Bronze: hex with corner dots */}
        {tierLevel === 1 && (
          <g>
            <polygon points={hexMid} fill="none" stroke={rankColor} strokeWidth="3" />
            <polygon points={hexInner} fill={S1} />
            <circle cx="50" cy="12" r="3" fill={rankColor} opacity=".5" />
          </g>
        )}

        {/* Silver: double hex + top accent */}
        {tierLevel === 2 && (
          <g>
            <polygon points={hexOuter} fill="none" stroke={rankColor} strokeWidth="1.5" opacity=".4" />
            <polygon points={hexMid} fill="none" stroke={rankColor} strokeWidth="3" />
            <polygon points={hexInner} fill={S1} />
            <path d="M42,12L50,4L58,12" fill="none" stroke={rankColor} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {/* Gold: hex + crown */}
        {tierLevel === 3 && (
          <g>
            <polygon points={hexOuter} fill="none" stroke={rankColor} strokeWidth="1.5" opacity=".3" />
            <polygon points={hexMid} fill="none" stroke={rankColor} strokeWidth="3" />
            <polygon points={hexInner} fill={S1} />
            <path d="M38,10L44,0L50,8L56,0L62,10" fill="none" stroke={rankColor} strokeWidth="2" strokeLinejoin="round" />
            <circle cx="44" cy="0" r="2.5" fill={rankColor} />
            <circle cx="50" cy="8" r="2" fill={rankColor} />
            <circle cx="56" cy="0" r="2.5" fill={rankColor} />
          </g>
        )}

        {/* Platinum: hex + blade + dashed ring */}
        {tierLevel === 4 && (
          <g>
            <polygon points={hexOuter} fill="none" stroke={rankColor} strokeWidth="1" opacity=".25" strokeDasharray="4 3">
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="20s" repeatCount="indefinite" />
            </polygon>
            <polygon points={hexMid} fill="none" stroke={rankColor} strokeWidth="3" />
            <polygon points={hexInner} fill={S1} />
            <path d="M50,12L46,0L50,4L54,0Z" fill={rankColor} opacity=".6" />
          </g>
        )}

        {/* Diamond: hex + gems + sparkles */}
        {tierLevel === 5 && (
          <g>
            <polygon points="50,4 90.6,27 90.6,73 50,96 9.4,73 9.4,27" fill="none" stroke={rankColor} strokeWidth="1" opacity=".2" strokeDasharray="6 4">
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="25s" repeatCount="indefinite" />
            </polygon>
            <polygon points={hexOuter} fill="none" stroke={rankColor} strokeWidth="1.5" opacity=".4" />
            <polygon points={hexMid} fill="none" stroke={rankColor} strokeWidth="3.5" />
            <polygon points={hexInner} fill={S1} />
            <polygon points="50,8 47,12 50,16 53,12" fill={rankColor} opacity=".7" />
            <circle cx="12" cy="35" r="1.5" fill={rankColor} opacity=".5">
              <animate attributeName="opacity" values=".3;.8;.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="88" cy="35" r="1.5" fill={rankColor} opacity=".5">
              <animate attributeName="opacity" values=".3;.8;.3" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* Master: triple hex + sword + wings */}
        {tierLevel === 6 && (
          <g>
            <polygon points="50,4 90.6,27 90.6,73 50,96 9.4,73 9.4,27" fill="none" stroke={rankColor} strokeWidth="1" opacity=".15" />
            <polygon points={hexOuter} fill="none" stroke={rankColor} strokeWidth="1.5" opacity=".35" />
            <polygon points={hexMid} fill="none" stroke={rankColor} strokeWidth="3.5" />
            <polygon points={hexInner} fill={S1} />
            <line x1="50" y1="12" x2="50" y2="-4" stroke={rankColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M46,-2L50,-8L54,-2" fill={rankColor} opacity=".8" />
            <line x1="44" y1="4" x2="56" y2="4" stroke={rankColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M86.4,29Q96,24 98,32Q94,36 88,34" fill="none" stroke={rankColor} strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
            <path d="M13.6,29Q4,24 2,32Q6,36 12,34" fill="none" stroke={rankColor} strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
            <circle cx="45" cy="-2" r="2" fill={rankColor} opacity=".6">
              <animate attributeName="opacity" values=".2;.8;.2" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* Challenger: rotating rings + dragon wings + blade + orbiting particles */}
        {tierLevel === 7 && (
          <g>
            <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke={rankColor} strokeWidth="1" strokeDasharray="3 5" opacity=".3">
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="15s" repeatCount="indefinite" />
            </polygon>
            <polygon points="50,4 90.6,27 90.6,73 50,96 9.4,73 9.4,27" fill="none" stroke={rankColor} strokeWidth="1" strokeDasharray="5 3" opacity=".25">
              <animateTransform attributeName="transform" type="rotate" values="360 50 50;0 50 50" dur="12s" repeatCount="indefinite" />
            </polygon>
            <polygon points={hexOuter} fill="none" stroke={rankColor} strokeWidth="1.5" opacity=".5" />
            <polygon points={hexMid} fill="none" stroke={rankColor} strokeWidth="3.5" />
            <polygon points={hexInner} fill={S1} />
            <path d="M86.4,29Q98,22 102,32Q96,38 90,36" fill="none" stroke={rankColor} strokeWidth="2" strokeLinecap="round" opacity=".7" />
            <path d="M102,32Q104,40 100,44" fill="none" stroke={rankColor} strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
            <path d="M13.6,29Q2,22 -2,32Q4,38 10,36" fill="none" stroke={rankColor} strokeWidth="2" strokeLinecap="round" opacity=".7" />
            <path d="M-2,32Q-4,40 0,44" fill="none" stroke={rankColor} strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
            <line x1="50" y1="12" x2="50" y2="-6" stroke={rankColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M46,0L50,-8L54,0" fill={rankColor} opacity=".8" />
            <line x1="44" y1="4" x2="56" y2="4" stroke={rankColor} strokeWidth="2" strokeLinecap="round" opacity=".6" />
            <g>
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="6s" repeatCount="indefinite" />
              <circle cx="96" cy="50" r="2.5" fill={rankColor}>
                <animate attributeName="opacity" values=".5;1;.5" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="4" cy="50" r="2" fill={rankColor}>
                <animate attributeName="opacity" values=".5;1;.5" dur="1s" begin=".3s" repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="96" r="2" fill={rankColor}>
                <animate attributeName="opacity" values=".5;1;.5" dur="1s" begin=".6s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
        )}

        {/* Rank ornament overlays */}
        {player.ornament === "bronze" && (
          <g>
            {[0,60,120,180,240,300].map(function(a,i) {
              var rad = a * Math.PI / 180;
              var cx = 50 + 46 * Math.sin(rad);
              var cy = 50 - 46 * Math.cos(rad);
              return <circle key={i} cx={cx} cy={cy} r="2.5" fill="#cd7f32" opacity=".5"><animate attributeName="opacity" values=".3;.7;.3" dur="2.5s" begin={i * 0.4 + "s"} repeatCount="indefinite" /></circle>;
            })}
          </g>
        )}

        {player.ornament === "silver" && (
          <g>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#c0c0c0" strokeWidth="0.8" opacity=".25" strokeDasharray="3 6">
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="30s" repeatCount="indefinite" />
            </circle>
            {[0,120,240].map(function(a,i) {
              var rad = a * Math.PI / 180;
              var cx = 50 + 48 * Math.sin(rad);
              var cy = 50 - 48 * Math.cos(rad);
              return <circle key={i} cx={cx} cy={cy} r="2" fill="#c0c0c0" opacity=".4"><animate attributeName="opacity" values=".2;.6;.2" dur="2s" begin={i * 0.6 + "s"} repeatCount="indefinite" /></circle>;
            })}
          </g>
        )}

        {player.ornament === "gold" && (
          <g>
            <circle cx="50" cy="50" r="50" fill="none" stroke="#ffd700" strokeWidth="0.8" opacity=".2" strokeDasharray="4 4">
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="25s" repeatCount="indefinite" />
            </circle>
            {[0,72,144,216,288].map(function(a,i) {
              var rad = a * Math.PI / 180;
              var cx = 50 + 50 * Math.sin(rad);
              var cy = 50 - 50 * Math.cos(rad);
              return <polygon key={i} points={(cx-2)+","+cy+" "+cx+","+(cy-3)+" "+(cx+2)+","+cy+" "+cx+","+(cy+3)} fill="#ffd700" opacity=".5"><animate attributeName="opacity" values=".3;.7;.3" dur="2s" begin={i * 0.3 + "s"} repeatCount="indefinite" /></polygon>;
            })}
          </g>
        )}

        {player.ornament === "plat" && (
          <g>
            <circle cx="50" cy="50" r="50" fill="none" stroke="#00f0ff" strokeWidth="0.6" opacity=".2" strokeDasharray="2 5">
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="18s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="54" fill="none" stroke="#00f0ff" strokeWidth="0.4" opacity=".15" strokeDasharray="5 3">
              <animateTransform attributeName="transform" type="rotate" values="360 50 50;0 50 50" dur="22s" repeatCount="indefinite" />
            </circle>
            {[0,90,180,270].map(function(a,i) {
              var rad = a * Math.PI / 180;
              var cx = 50 + 52 * Math.sin(rad);
              var cy = 50 - 52 * Math.cos(rad);
              return <circle key={i} cx={cx} cy={cy} r="1.8" fill="#00f0ff" opacity=".5"><animate attributeName="opacity" values=".2;.8;.2" dur="1.5s" begin={i * 0.35 + "s"} repeatCount="indefinite" /></circle>;
            })}
          </g>
        )}

        {player.ornament === "diamond" && (
          <g>
            <circle cx="50" cy="50" r="52" fill="none" stroke="#a855f7" strokeWidth="0.6" opacity=".2" strokeDasharray="3 4">
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="15s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="56" fill="none" stroke="#c084fc" strokeWidth="0.4" opacity=".12" strokeDasharray="6 2">
              <animateTransform attributeName="transform" type="rotate" values="360 50 50;0 50 50" dur="20s" repeatCount="indefinite" />
            </circle>
            {[0,60,120,180,240,300].map(function(a,i) {
              var rad = a * Math.PI / 180;
              var cx = 50 + 54 * Math.sin(rad);
              var cy = 50 - 54 * Math.cos(rad);
              return <polygon key={i} points={(cx-2)+","+cy+" "+cx+","+(cy-3)+" "+(cx+2)+","+cy+" "+cx+","+(cy+3)} fill="#a855f7" opacity=".5"><animate attributeName="opacity" values=".2;.7;.2" dur="1.8s" begin={i * 0.25 + "s"} repeatCount="indefinite" /></polygon>;
            })}
          </g>
        )}

        {player.ornament === "master" && (
          <g>
            <circle cx="50" cy="50" r="54" fill="none" stroke="#f43f5e" strokeWidth="0.7" opacity=".2" strokeDasharray="4 3">
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="12s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="58" fill="none" stroke="#fb7185" strokeWidth="0.4" opacity=".1" strokeDasharray="2 6">
              <animateTransform attributeName="transform" type="rotate" values="360 50 50;0 50 50" dur="16s" repeatCount="indefinite" />
            </circle>
            {[0,45,90,135,180,225,270,315].map(function(a,i) {
              var rad = a * Math.PI / 180;
              var cx = 50 + 56 * Math.sin(rad);
              var cy = 50 - 56 * Math.cos(rad);
              return <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? "2" : "1.2"} fill="#f43f5e" opacity=".5"><animate attributeName="opacity" values=".2;.8;.2" dur="1.2s" begin={i * 0.15 + "s"} repeatCount="indefinite" /></circle>;
            })}
          </g>
        )}

        {player.ornament === "chall" && (
          <g>
            <circle cx="50" cy="50" r="54" fill="none" stroke="#ff6b35" strokeWidth="0.8" opacity=".25" strokeDasharray="3 3">
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="10s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="58" fill="none" stroke="#ff6b35" strokeWidth="0.5" opacity=".15" strokeDasharray="5 2">
              <animateTransform attributeName="transform" type="rotate" values="360 50 50;0 50 50" dur="14s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="62" fill="none" stroke="#f97316" strokeWidth="0.3" opacity=".1" strokeDasharray="2 5">
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="8s" repeatCount="indefinite" />
            </circle>
            {[0,36,72,108,144,180,216,252,288,324].map(function(a,i) {
              var rad = a * Math.PI / 180;
              var cx = 50 + 58 * Math.sin(rad);
              var cy = 50 - 58 * Math.cos(rad);
              return <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? "2.5" : "1.5"} fill="#ff6b35"><animate attributeName="opacity" values=".3;1;.3" dur="1s" begin={i * 0.1 + "s"} repeatCount="indefinite" /></circle>;
            })}
          </g>
        )}

        {/* Special ornament overlays */}
        {player.ornament === "flame" && (
          <g>
            <g><animate attributeName="opacity" values=".5;.9;.5" dur="1.5s" repeatCount="indefinite" /><path d="M50,8Q46,-4 50,-10Q54,-4 50,8" fill="#ff6b35" opacity=".7" /></g>
            <g><animate attributeName="opacity" values=".4;.8;.4" dur="1.5s" begin=".3s" repeatCount="indefinite" /><path d="M86.4,29Q92,20 94,28Q90,32 86.4,29" fill="#f97316" opacity=".5" /></g>
            <g><animate attributeName="opacity" values=".4;.8;.4" dur="1.5s" begin=".6s" repeatCount="indefinite" /><path d="M86.4,71Q92,80 94,72Q90,68 86.4,71" fill="#ff6b35" opacity=".5" /></g>
            <g><animate attributeName="opacity" values=".5;.9;.5" dur="1.5s" begin=".9s" repeatCount="indefinite" /><path d="M50,92Q46,104 50,110Q54,104 50,92" fill="#f97316" opacity=".7" /></g>
            <g><animate attributeName="opacity" values=".4;.8;.4" dur="1.5s" begin="1.2s" repeatCount="indefinite" /><path d="M13.6,71Q8,80 6,72Q10,68 13.6,71" fill="#ff6b35" opacity=".5" /></g>
            <g><animate attributeName="opacity" values=".4;.8;.4" dur="1.5s" begin=".15s" repeatCount="indefinite" /><path d="M13.6,29Q8,20 6,28Q10,32 13.6,29" fill="#f97316" opacity=".5" /></g>
          </g>
        )}

        {player.ornament === "cosmic" && (
          <g>
            <ellipse cx="50" cy="50" rx="56" ry="22" fill="none" stroke="#a855f7" strokeWidth="0.8" opacity=".3" transform="rotate(-25, 50, 50)">
              <animateTransform attributeName="transform" type="rotate" values="-25 50 50;335 50 50" dur="18s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="50" cy="50" rx="54" ry="20" fill="none" stroke="#7c3aed" strokeWidth="0.8" opacity=".25" transform="rotate(35, 50, 50)">
              <animateTransform attributeName="transform" type="rotate" values="35 50 50;-325 50 50" dur="22s" repeatCount="indefinite" />
            </ellipse>
            <circle cx="10" cy="24" r="1.5" fill="#c084fc"><animate attributeName="opacity" values=".3;.8;.3" dur="3s" repeatCount="indefinite" /></circle>
            <circle cx="90" cy="76" r="1.5" fill="#a855f7"><animate attributeName="opacity" values=".3;.8;.3" dur="3s" begin="1s" repeatCount="indefinite" /></circle>
            <circle cx="85" cy="20" r="1" fill="#c084fc"><animate attributeName="opacity" values=".3;.8;.3" dur="3s" begin="2s" repeatCount="indefinite" /></circle>
          </g>
        )}

        {player.ornament === "hextech" && (
          <g>
            <path d="M68,16L72,10L70,16L76,14" fill="none" stroke="#00f0ff" strokeWidth="1.8" strokeLinecap="round" opacity=".7">
              <animate attributeName="opacity" values=".4;.9;.4" dur=".8s" repeatCount="indefinite" />
            </path>
            <path d="M32,16L28,10L30,16L24,14" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" opacity=".7">
              <animate attributeName="opacity" values=".4;.9;.4" dur=".8s" begin=".4s" repeatCount="indefinite" />
            </path>
            <path d="M92,50L98,48L94,52L100,52" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" opacity=".6">
              <animate attributeName="opacity" values=".3;.8;.3" dur="1s" begin=".2s" repeatCount="indefinite" />
            </path>
            <path d="M8,50L2,48L6,52L0,52" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" opacity=".6">
              <animate attributeName="opacity" values=".3;.8;.3" dur="1s" begin=".6s" repeatCount="indefinite" />
            </path>
            <path d="M68,84L72,90L70,84L76,86" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" opacity=".5">
              <animate attributeName="opacity" values=".3;.7;.3" dur="1s" begin=".3s" repeatCount="indefinite" />
            </path>
            <path d="M32,84L28,90L30,84L24,86" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" opacity=".5">
              <animate attributeName="opacity" values=".3;.7;.3" dur="1s" begin=".7s" repeatCount="indefinite" />
            </path>
          </g>
        )}

        {player.ornament === "glacial" && (
          <g>
            <g><animate attributeName="opacity" values=".3;.7;.3" dur="3s" repeatCount="indefinite" /><polygon points="50,6 47,0 50,-6 53,0" fill="#67e8f9" opacity=".5" /></g>
            <g><animate attributeName="opacity" values=".3;.7;.3" dur="3s" begin=".5s" repeatCount="indefinite" /><polygon points="88,28 94,26 96,32 90,30" fill="#67e8f9" opacity=".4" /></g>
            <g><animate attributeName="opacity" values=".3;.7;.3" dur="3s" begin="1s" repeatCount="indefinite" /><polygon points="88,72 94,74 96,68 90,70" fill="#a5f3fc" opacity=".4" /></g>
            <g><animate attributeName="opacity" values=".3;.7;.3" dur="3s" begin="1.5s" repeatCount="indefinite" /><polygon points="50,94 47,100 50,106 53,100" fill="#67e8f9" opacity=".5" /></g>
            <g><animate attributeName="opacity" values=".3;.7;.3" dur="3s" begin="2s" repeatCount="indefinite" /><polygon points="12,72 6,74 4,68 10,70" fill="#a5f3fc" opacity=".4" /></g>
            <g><animate attributeName="opacity" values=".3;.7;.3" dur="3s" begin="2.5s" repeatCount="indefinite" /><polygon points="12,28 6,26 4,32 10,30" fill="#67e8f9" opacity=".4" /></g>
          </g>
        )}

        {player.ornament === "abyssal" && (
          <g>
            <g><animate attributeName="opacity" values=".3;.6;.3" dur="3s" repeatCount="indefinite" /><path d="M50,8Q44,0 48,-6Q52,-2 50,8" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity=".5" /></g>
            <g><animate attributeName="opacity" values=".3;.6;.3" dur="3s" begin=".5s" repeatCount="indefinite" /><path d="M88,30Q94,24 96,30Q92,34 88,30" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" opacity=".4" /></g>
            <g><animate attributeName="opacity" values=".3;.6;.3" dur="3s" begin="1s" repeatCount="indefinite" /><path d="M88,70Q94,76 96,70Q92,66 88,70" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity=".4" /></g>
            <g><animate attributeName="opacity" values=".3;.6;.3" dur="3s" begin="1.5s" repeatCount="indefinite" /><path d="M50,92Q44,100 48,106Q52,102 50,92" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" opacity=".5" /></g>
            <g><animate attributeName="opacity" values=".3;.6;.3" dur="3s" begin="2s" repeatCount="indefinite" /><path d="M12,70Q6,76 4,70Q8,66 12,70" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity=".4" /></g>
            <g><animate attributeName="opacity" values=".3;.6;.3" dur="3s" begin="2.5s" repeatCount="indefinite" /><path d="M12,30Q6,24 4,30Q8,34 12,30" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" opacity=".4" /></g>
          </g>
        )}

        {player.ornament === "infernal" && (
          <g>
            <g><animate attributeName="opacity" values=".5;1;.5" dur="1.2s" repeatCount="indefinite" /><path d="M50,8Q46,-6 50,-14Q54,-6 50,8" fill="#dc2626" opacity=".7" /><path d="M48,8Q48,-2 50,-8Q52,-2 52,8" fill="#ef4444" opacity=".5" /></g>
            <g><animate attributeName="opacity" values=".4;.9;.4" dur="1.2s" begin=".2s" repeatCount="indefinite" /><path d="M87,29Q94,20 96,28Q90,32 87,29" fill="#dc2626" opacity=".6" /></g>
            <g><animate attributeName="opacity" values=".4;.9;.4" dur="1.2s" begin=".4s" repeatCount="indefinite" /><path d="M87,71Q94,80 96,72Q90,68 87,71" fill="#ef4444" opacity=".5" /></g>
            <g><animate attributeName="opacity" values=".5;1;.5" dur="1.2s" begin=".6s" repeatCount="indefinite" /><path d="M50,92Q46,106 50,114Q54,106 50,92" fill="#dc2626" opacity=".7" /><path d="M48,92Q48,102 50,108Q52,102 52,92" fill="#ef4444" opacity=".5" /></g>
            <g><animate attributeName="opacity" values=".4;.9;.4" dur="1.2s" begin=".8s" repeatCount="indefinite" /><path d="M13,71Q6,80 4,72Q10,68 13,71" fill="#dc2626" opacity=".6" /></g>
            <g><animate attributeName="opacity" values=".4;.9;.4" dur="1.2s" begin="1s" repeatCount="indefinite" /><path d="M13,29Q6,20 4,28Q10,32 13,29" fill="#ef4444" opacity=".5" /></g>
          </g>
        )}

        {/* SVG exclusive avatars */}
        {player.emoji === "svg_dragon" && (
          <g transform="translate(50,50)">
            <path d="M-8,-12L-12,-20L-6,-16" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8,-12L12,-20L6,-16" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M-10,-4Q-14,-12 -8,-16Q-4,-10 0,-12Q4,-10 8,-16Q14,-12 10,-4Q8,4 6,10Q4,16 0,18Q-4,16 -6,10Q-8,4 -10,-4Z" fill="#a855f7" opacity=".15" stroke="#a855f7" strokeWidth="1.5" />
            <circle cx="-5" cy="-4" r="3" fill="#c084fc" opacity=".8" />
            <circle cx="5" cy="-4" r="3" fill="#c084fc" opacity=".8" />
            <circle cx="-5" cy="-4" r="1.5" fill={S1} />
            <circle cx="5" cy="-4" r="1.5" fill={S1} />
            <path d="M-3,6Q0,10 3,6" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}
        {player.emoji === "svg_swords" && (
          <g transform="translate(50,50)">
            <line x1="-12" y1="14" x2="12" y2="-14" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M10,-16L16,-12L12,-14L14,-18Z" fill="#f43f5e" />
            <line x1="12" y1="14" x2="-12" y2="-14" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M-10,-16L-16,-12L-12,-14L-14,-18Z" fill="#fb7185" />
            <circle cx="0" cy="0" r="2" fill="#fb7185" />
          </g>
        )}
        {player.emoji === "svg_crown" && (
          <g transform="translate(50,50)">
            <path d="M-14,6L-18,-6L-8,-8L0,-16L8,-8L18,-6L14,6Z" fill="#ffd700" opacity=".2" stroke="#ffd700" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="-18" cy="-6" r="3" fill="#ffd700" opacity=".7" />
            <circle cx="0" cy="-16" r="3" fill="#fbbf24" opacity=".8" />
            <circle cx="18" cy="-6" r="3" fill="#ffd700" opacity=".7" />
            <rect x="-14" y="6" width="28" height="5" rx="2" fill="#ffd700" opacity=".5" />
          </g>
        )}
        {player.emoji === "svg_eye" && (
          <g transform="translate(50,50)">
            <path d="M-20,0Q-10,-16 0,-16Q10,-16 20,0Q10,16 0,16Q-10,16 -20,0Z" fill="#00f0ff" opacity=".1" stroke="#00f0ff" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="8" fill="#00f0ff" opacity=".15" stroke="#00f0ff" strokeWidth="1" />
            <circle cx="0" cy="0" r="5" fill="#00f0ff" opacity=".3" />
            <circle cx="0" cy="0" r="2.5" fill={S1} />
            <circle cx="1" cy="-1" r="1" fill="#22d3ee" />
          </g>
        )}
        {player.emoji === "svg_mask" && (
          <g transform="translate(50,50)">
            <path d="M-14,-8Q-16,-16 -8,-18Q0,-20 8,-18Q16,-16 14,-8L12,6Q8,14 0,16Q-8,14 -12,6Z" fill="#f97316" opacity=".15" stroke="#f97316" strokeWidth="1.5" />
            <path d="M-8,-8L-4,-12L-2,-6Z" fill="#f97316" opacity=".5" />
            <path d="M2,-6Q6,-14 10,-8Q8,-4 2,-6Z" fill="#f97316" opacity=".5" />
            <path d="M-6,4Q0,10 6,4" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="-10" cy="-18" r="2.5" fill="#fbbf24" opacity=".5" />
            <circle cx="10" cy="-18" r="2.5" fill="#fbbf24" opacity=".5" />
          </g>
        )}
        {player.emoji === "svg_shield" && (
          <g transform="translate(50,50)">
            <path d="M0,-16L14,-8L14,6Q14,16 0,20Q-14,16 -14,6L-14,-8Z" fill="#3b82f6" opacity=".15" stroke="#3b82f6" strokeWidth="1.8" />
            <line x1="0" y1="-4" x2="0" y2="8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
            <line x1="-5" y1="2" x2="5" y2="2" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
        {player.emoji === "svg_potion" && (
          <g transform="translate(50,50)">
            <rect x="-3" y="-16" width="6" height="6" rx="1" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <path d="M-3,-10L-10,4Q-12,10 -10,14Q-6,18 0,20Q6,18 10,14Q12,10 10,4L3,-10Z" fill="#10b981" opacity=".15" stroke="#10b981" strokeWidth="1.5" />
            <path d="M-8,6Q-4,2 0,4Q4,2 8,6Q10,12 8,14Q4,18 0,20Q-4,18 -8,14Q-10,12 -8,6Z" fill="#10b981" opacity=".2" />
            <circle cx="-3" cy="10" r="2" fill="#34d399" opacity=".5">
              <animate attributeName="cy" values="10;6;10" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        )}
        {player.emoji === "svg_stars" && (
          <g transform="translate(50,50)">
            <circle cx="0" cy="-12" r="2.5" fill="#fbbf24" opacity=".8" />
            <circle cx="12" cy="-2" r="2" fill="#fbbf24" opacity=".7" />
            <circle cx="8" cy="10" r="2" fill="#fbbf24" opacity=".6" />
            <circle cx="-6" cy="12" r="2.5" fill="#fbbf24" opacity=".7" />
            <circle cx="-12" cy="0" r="2" fill="#fbbf24" opacity=".6" />
            <line x1="0" y1="-12" x2="12" y2="-2" stroke="#fbbf24" strokeWidth="0.8" opacity=".4" />
            <line x1="12" y1="-2" x2="8" y2="10" stroke="#fbbf24" strokeWidth="0.8" opacity=".4" />
            <line x1="8" y1="10" x2="-6" y2="12" stroke="#fbbf24" strokeWidth="0.8" opacity=".4" />
            <line x1="-6" y1="12" x2="-12" y2="0" stroke="#fbbf24" strokeWidth="0.8" opacity=".4" />
            <line x1="-12" y1="0" x2="0" y2="-12" stroke="#fbbf24" strokeWidth="0.8" opacity=".4" />
            <circle cx="0" cy="0" r="1.5" fill="#fbbf24" opacity=".5" />
          </g>
        )}
        {player.emoji === "svg_serpent" && (
          <g transform="translate(50,50)">
            <path d="M-4,-14Q-14,-10 -16,0Q-14,10 -4,14Q6,16 12,10Q18,2 14,-6Q10,-12 2,-14" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" opacity=".6" />
            <circle cx="-4" cy="-14" r="4" fill="#7c3aed" opacity=".3" />
            <circle cx="-6" cy="-16" r="1.2" fill="#c084fc" />
            <circle cx="-2" cy="-16" r="1.2" fill="#c084fc" />
          </g>
        )}
        {player.emoji === "svg_phoenix" && (
          <g transform="translate(50,50)">
            <path d="M0,-4Q-8,-14 -18,-12Q-22,-6 -18,2Q-12,6 -6,4" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" opacity=".7" />
            <path d="M0,-4Q8,-14 18,-12Q22,-6 18,2Q12,6 6,4" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" opacity=".7" />
            <ellipse cx="0" cy="2" rx="6" ry="10" fill="#f59e0b" opacity=".12" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="0" cy="-6" r="3.5" fill="#f59e0b" opacity=".2" />
            <circle cx="-1.5" cy="-7" r="1" fill="#fbbf24" />
            <circle cx="1.5" cy="-7" r="1" fill="#fbbf24" />
            <path d="M0,12Q-3,18 -1,22" fill="none" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" opacity=".4" />
            <path d="M0,12Q3,18 1,22" fill="none" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" opacity=".4" />
          </g>
        )}
        {/* Default emoji for non-SVG avatars */}
        {player.emoji.indexOf("svg_") !== 0 && (
          <text x="50" y="52" textAnchor="middle" dominantBaseline="central" fontSize={sz > 40 ? "32" : sz > 28 ? "20" : "14"} fill={TP}>
            {player.emoji}
          </text>
        )}
      </svg>
    </div>
  );
}

/* Build gradient from player color + effect type */
function buildNameGrad(color, effect) {
  if (!effect || effect === "none") return null;
  /* Parse hex to lighten/shift */
  var r = parseInt(color.slice(1,3), 16);
  var g = parseInt(color.slice(3,5), 16);
  var b = parseInt(color.slice(5,7), 16);
  var lighter = "rgb(" + Math.min(r+80,255) + "," + Math.min(g+80,255) + "," + Math.min(b+80,255) + ")";
  var whiter = "rgb(" + Math.min(r+140,255) + "," + Math.min(g+140,255) + "," + Math.min(b+140,255) + ")";

  if (effect === "neon") return "linear-gradient(90deg, " + color + ", " + whiter + ", " + color + ")";
  if (effect === "fire") return "linear-gradient(90deg, " + color + ", " + lighter + ", #ff6b00, " + color + ")";
  if (effect === "gold") return "linear-gradient(90deg, #fbbf24, " + color + ", #fbbf24, " + color + ", #fbbf24)";
  if (effect === "rainbow") return "linear-gradient(90deg, #f43f5e, #f97316, #eab308, #10b981, #3b82f6, #a855f7)";
  if (effect === "void") return "linear-gradient(90deg, " + color + ", #a855f7, #ec4899, #a855f7, " + color + ")";
  return null;
}

/* Player name with color style */
function PlayerName(props) {
  var player = props.player;
  var sz = props.size || 13;
  var cs = CSTYLES.find(function(c) { return c.id === player.cstyle; }) || CSTYLES[0];
  var grad = buildNameGrad(player.color, cs.effect);
  if (!grad) {
    return <span style={{ fontFamily: FD, fontWeight: 700, fontSize: sz, color: player.color }}>{player.name}</span>;
  }
  return (
    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: sz, background: grad, backgroundSize: "200% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
      {player.name}
    </span>
  );
}

/* ═══ LOGIN ═══ */
function LoginScreen(props) {
  var players = props.players;
  var onLogin = props.onLogin;
  var st = useState(null); var sel = st[0]; var setSel = st[1];
  var pt = useState(""); var pin = pt[0]; var setPin = pt[1];
  var er = useState(false); var err = er[0]; var setErr = er[1];

  function handleKey(n) {
    if (n === "del") { setPin(pin.slice(0, -1)); setErr(false); return; }
    if (pin.length >= 4) return;
    var next = pin + String(n);
    setPin(next);
    if (next.length === 4) {
      setTimeout(function() {
        if (players[sel].pin === next) onLogin(players[sel].name);
        else { setErr(true); setTimeout(function() { setErr(false); setPin(""); }, 1000); }
      }, 200);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: FB, color: TP, position: "relative", overflow: "hidden" }}>
      <style>{CSS_ANIM}</style>
      <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ position: "absolute", top: -200, left: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, " + N1 + "08, transparent 70%)", pointerEvents: "none" }} />
      <h1 style={{ fontFamily: FD, fontSize: 36, fontWeight: 800, margin: "0 0 4px", letterSpacing: 4, color: N1, textShadow: "0 0 30px " + N1 + "40" }}>LEC PRONOS</h1>
      <p style={{ fontSize: 11, color: TD, margin: "0 0 40px", letterSpacing: 3 }}>SPRING 2026</p>
      <div style={{ fontSize: 11, fontWeight: 600, color: N2, letterSpacing: 3, marginBottom: 16 }}>CHOISIR SON PROFIL</div>
      <div style={{ display: "flex", gap: 12, marginBottom: 30, flexWrap: "wrap", justifyContent: "center" }}>
        {players.map(function(pl, i) {
          var active = sel === i;
          return (
            <button key={pl.name} onClick={function() { setSel(i); setPin(""); setErr(false); }}
              style={{ width: 85, padding: "16px 8px", borderRadius: 16, border: active ? "2px solid " + pl.color : "1px solid " + BD, background: active ? pl.color + "12" : S1, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, boxShadow: active ? "0 0 20px " + pl.color + "30" : "none" }}>
              {pl.emoji.indexOf("svg_") === 0 ? (
                <PlayerAvatar player={pl} size={40} rankInfo={null} />
              ) : (
                <div style={{ fontSize: 32 }}>{pl.emoji}</div>
              )}
              <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, color: pl.color }}>{pl.name}</div>
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, animation: "slideUp 0.3s ease" }}>
          <div style={{ fontSize: 11, color: TD, fontWeight: 600 }}>Code PIN</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[0,1,2,3].map(function(idx) {
              return <div key={idx} style={{ width: 42, height: 50, borderRadius: 12, border: "2px solid " + (err ? N3 : pin.length > idx ? players[sel].color : BD), background: S2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: TP }}>{pin[idx] ? "•" : ""}</div>;
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 6 }}>
            {[1,2,3,4,5,6,7,8,9,-1,0,"del"].map(function(n, idx) {
              if (n === -1) return <div key={idx} />;
              return <button key={idx} onClick={function() { handleKey(n); }} style={{ width: 54, height: 46, borderRadius: 12, border: "1px solid " + BD, background: S1, color: TP, fontSize: n === "del" ? 14 : 18, fontWeight: 600, cursor: "pointer", fontFamily: FD }}>{n === "del" ? "←" : n}</button>;
            })}
          </div>
          {err && <div style={{ fontSize: 11, color: N3, fontWeight: 600 }}>Code incorrect</div>}
        </div>
      )}
      <button onClick={function() { onLogin("__admin"); }} style={{ marginTop: 36, background: "none", border: "none", color: TD, fontSize: 10, cursor: "pointer", fontFamily: FD, opacity: 0.4 }}>Admin</button>
    </div>
  );
}

/* ═══ MATCH CARD ═══ */
function MatchCard(props) {
  var m = props.match; var players = props.players; var onUpdate = props.onUpdate;
  var user = props.currentUser; var isAdmin = props.isAdmin; var spoil = props.spoil;
  var ex = useState(false); var expanded = ex[0]; var setEx = ex[1];
  var hasResult = !!m.winner;
  var revealed = m.revealed !== false; /* default to true if not set */
  var played = hasResult && revealed;
  var locked = m.locked || false;
  var pendingResult = hasResult && !revealed; /* has result but not yet revealed */
  var scores = m.bo === 5 ? SC5 : SC3;
  var myPred = m.preds[user] || {};

  return (
    <div style={{ background: S1, borderRadius: 14, overflow: "hidden", border: played ? "1px solid " + BD : pendingResult ? "1px solid " + N2 + "30" : "1px solid " + N1 + "30", boxShadow: !played && !pendingResult ? "0 0 15px " + N1 + "08" : "none" }}>
      {!played && !pendingResult && (
        <div style={{ background: "linear-gradient(90deg, " + N1 + "12, transparent)", padding: "5px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: NG, display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: N1, letterSpacing: 1 }}>{m.day}</span>
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {players.map(function(p) {
              var done = !!(m.preds[p.name] && m.preds[p.name].winner);
              return <div key={p.name} style={{ width: 16, height: 16, borderRadius: "50%", background: done ? p.color + "25" : S2, border: "1.5px solid " + (done ? p.color : BD), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: done ? p.color : TD }}>{done ? "✓" : "?"}</div>;
            })}
          </div>
        </div>
      )}
      {pendingResult && (
        <div style={{ background: "linear-gradient(90deg, " + N2 + "12, transparent)", padding: "5px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10 }}>⏳</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: N2, letterSpacing: 1 }}>EN ATTENTE</span>
          </div>
          <span style={{ fontSize: 9, color: TD }}>{m.day}</span>
        </div>
      )}
      {played && <div style={{ padding: "3px 14px", background: S2 }}><span style={{ fontSize: 9, color: TD, letterSpacing: 1 }}>{spoil ? m.day : "TERMINE - " + m.day}</span></div>}
      <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={function() { if (!locked || isAdmin) setEx(!expanded); }}>
        <TeamLogo team={m.team1} size={32} />
        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, flex: 1, textAlign: "right", color: !spoil && played && m.winner === m.team1 ? NG : TP }}>{m.team1}</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 72 }}>
          <div style={{ display: "flex", gap: 5, fontSize: 10 }}>
            <span style={{ color: N3, fontWeight: 600 }}>{m.cote1}</span>
            <span style={{ color: TD }}>|</span>
            <span style={{ color: N2, fontWeight: 600 }}>{m.cote2}</span>
          </div>
          {played && !spoil && <div style={{ fontFamily: FD, fontSize: 20, fontWeight: 800, color: NG, letterSpacing: 2 }}>{m.score}</div>}
          {played && spoil && <div style={{ fontSize: 14, marginTop: 2 }}>🔒</div>}
          {pendingResult && <div style={{ fontSize: 14, marginTop: 2 }}>⏳</div>}
          {!played && !pendingResult && <div style={{ fontSize: 13, fontWeight: 800, color: N1, marginTop: 2 }}>VS</div>}
        </div>
        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, flex: 1, color: !spoil && played && m.winner === m.team2 ? NG : TP }}>{m.team2}</span>
        <TeamLogo team={m.team2} size={32} />
        {(!locked || isAdmin) && <span style={{ fontSize: 10, color: TD, transform: expanded ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▼</span>}
      </div>
      {!played && !pendingResult && !expanded && (
        <div style={{ padding: "0 14px 10px" }}>
          {locked ? (
            <div style={{ padding: "6px 10px", borderRadius: 8, background: TD + "10", border: "1px solid " + TD + "25", fontSize: 11, color: TD, fontWeight: 600 }}>🔒 Prono verrouille{myPred.winner ? " : " + myPred.winner + " - " + myPred.score : ""}</div>
          ) : myPred.winner ? (
            <div style={{ padding: "6px 10px", borderRadius: 8, background: NG + "10", border: "1px solid " + NG + "25", fontSize: 11, color: NG, fontWeight: 600 }}>Ton prono : {myPred.winner} - {myPred.score}</div>
          ) : (
            <div style={{ padding: "6px 10px", borderRadius: 8, background: N2 + "10", border: "1px solid " + N2 + "25", fontSize: 11, color: N2, fontWeight: 600 }}>Clique pour pronostiquer</div>
          )}
        </div>
      )}
      {pendingResult && (
        <div style={{ padding: "0 14px 10px" }}>
          <div style={{ padding: "6px 10px", borderRadius: 8, background: N2 + "08", border: "1px solid " + N2 + "20", fontSize: 11, color: N2, fontWeight: 600 }}>⏳ Resultat devoile au prochain match day{myPred.winner ? " | Ton prono : " + myPred.winner + " " + myPred.score : ""}</div>
        </div>
      )}
      {played && !spoil && (
        <div style={{ padding: "0 14px 10px", display: "flex", gap: 4 }}>
          {players.map(function(p) {
            var pr = m.preds[p.name] || {};
            var pt = calcPts(m, pr); var ok = pt > 0; var pf = pr.score === m.score && ok;
            return (
              <div key={p.name} style={{ flex: 1, borderRadius: 10, padding: "6px 2px", textAlign: "center", background: pf ? "#FFD70008" : ok ? NG + "08" : N3 + "06", border: "1px solid " + (pf ? "#FFD70025" : ok ? NG + "18" : N3 + "15") }}>
                <div style={{ fontSize: 12, marginBottom: 1 }}><MiniAvatar player={p} size={14} /></div>
                <div style={{ fontSize: 9, fontWeight: 600, color: p.color }}>{p.name}</div>
                <div style={{ fontSize: 9, color: TD }}>{pr.winner || "-"}</div>
                <div style={{ fontSize: 9, color: TD }}>{pr.score || ""}</div>
                <div style={{ fontSize: 12, fontWeight: 800, marginTop: 2, color: pf ? "#FFD700" : ok ? NG : N3 }}>{!pr.winner ? "-" : pf ? "+" + pt + " ★" : ok ? "+" + pt : "0"}</div>
              </div>
            );
          })}
        </div>
      )}
      {played && spoil && !expanded && (
        <div style={{ padding: "0 14px 10px", textAlign: "center" }}><div style={{ padding: 8, borderRadius: 8, border: "1px dashed " + N1 + "40", background: N1 + "06", fontSize: 10, color: N1, fontWeight: 600 }}>🔒 Masque</div></div>
      )}
      {!played && expanded && (
        <div style={{ borderTop: "1px solid " + BD, padding: "10px 14px" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: N1, letterSpacing: 2, marginBottom: 8 }}>TON PRONOSTIC</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: TD, marginBottom: 2 }}>VAINQUEUR</div>
              <select value={myPred.winner || ""} onChange={function(e) { onUpdate(m.id, user, "winner", e.target.value || null); }} style={{ background: S2, color: TP, border: "1px solid " + BD, borderRadius: 8, padding: "6px 8px", fontSize: 11, width: "100%", outline: "none" }}>
                <option value="">Choisis...</option>
                <option value={m.team1}>{m.team1}</option>
                <option value={m.team2}>{m.team2}</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: TD, marginBottom: 2 }}>SCORE</div>
              <select value={myPred.score || ""} onChange={function(e) { onUpdate(m.id, user, "score", e.target.value || null); }} style={{ background: S2, color: TP, border: "1px solid " + BD, borderRadius: 8, padding: "6px 8px", fontSize: 11, width: "100%", outline: "none" }}>
                <option value="">Score...</option>
                {scores.map(function(sc) { return <option key={sc} value={sc}>{sc}</option>; })}
              </select>
            </div>
          </div>
          {isAdmin && (
            <div style={{ borderTop: "1px solid " + BD, paddingTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: N1 }}>RESULTAT :</span>
              <select value={m.score || ""} onChange={function(e) { var sc = e.target.value || null; onUpdate(m.id, "__result", "score", sc); onUpdate(m.id, "__result", "winner", sc ? winOf(m.team1, m.team2, sc) : null); }} style={{ background: S2, color: TP, border: "1px solid " + BD, borderRadius: 8, padding: "5px 8px", fontSize: 11, outline: "none" }}>
                <option value="">Score final...</option>
                {scores.map(function(sc) { return <option key={sc} value={sc}>{sc}</option>; })}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══ DASHBOARD ═══ */
function Dashboard(props) {
  var matches = props.matches; var players = props.players; var user = props.currentUser; var onNav = props.onNav; var spoil = props.spoil; var seasonName = props.seasonName || "LEC Spring";
  var revealedMatches = matches.filter(function(m) { return m.revealed !== false; });
  var stats = players.map(function(p) { var s = getStats(revealedMatches, p.name); var xp = getTotalXP(s); var r = getRank(xp); return Object.assign({}, p, s, { xp: xp, ri: r }); }).sort(function(a, b) { return b.total - a.total; });
  var me = stats.find(function(s) { return s.name === user; });
  var myRank = stats.findIndex(function(s) { return s.name === user; }) + 1;
  var myPending = matches.filter(function(m) { return !m.winner && !m.locked && (!m.preds[user] || !m.preds[user].winner); });
  var upcoming = matches.filter(function(m) { return !m.winner && !m.locked; }).slice(0, 3);
  var maxPts = stats.length > 0 ? stats[0].total : 1;

  /* Countdown to next match */
  var nextMatch = matches.find(function(m) { return !m.winner && m.start_time && new Date(m.start_time) > new Date(); });
  var ct = useState(null); var countdown = ct[0]; var setCountdown = ct[1];
  useEffect(function() {
    if (!nextMatch || !nextMatch.start_time) return;
    function tick() {
      var now = new Date();
      var target = new Date(nextMatch.start_time);
      var diff = target - now;
      if (diff <= 0) { setCountdown(null); return; }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var mn = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      setCountdown({ d: d, h: h, m: mn, s: s });
    }
    tick();
    var iv = setInterval(tick, 1000);
    return function() { clearInterval(iv); };
  }, [nextMatch ? nextMatch.id : null]);

  /* Current streak per player */
  function getStreak(pname) {
    var played = revealedMatches.filter(function(m) { return m.winner && m.preds[pname] && m.preds[pname].winner; });
    var streak = 0;
    for (var i = played.length - 1; i >= 0; i--) {
      if (played[i].preds[pname].winner === played[i].winner) streak++;
      else break;
    }
    return streak;
  }

  /* Weekly summary */
  var completedWeeks = [];
  revealedMatches.forEach(function(m) { if (m.winner && m.week && completedWeeks.indexOf(m.week) === -1) completedWeeks.push(m.week); });
  completedWeeks.sort(function(a, b) { return b - a; });
  var latestWeek = completedWeeks[0] || null;
  var weeklyBest = null;
  if (latestWeek) {
    var weekMatches = revealedMatches.filter(function(m) { return m.week === latestWeek && m.winner; });
    weeklyBest = players.map(function(p) {
      var pts = 0; var wins = 0; var perfects = 0;
      weekMatches.forEach(function(m) {
        var pr = m.preds[p.name]; if (!pr || !pr.winner) return;
        var pt = calcPts(m, pr); if (pt > 0) { pts = pts + pt; wins++; }
        if (pr.score === m.score && pt > 0) perfects++;
      });
      return { name: p.name, color: p.color, emoji: p.emoji, pts: Math.round(pts * 10) / 10, wins: wins, perfects: perfects, total: weekMatches.length };
    }).sort(function(a, b) { return b.pts - a.pts; });
  }

  /* Activity feed */
  var feed = [];
  revealedMatches.forEach(function(m) {
    if (!m.winner) return;
    players.forEach(function(p) {
      var pr = m.preds[p.name]; if (!pr || !pr.winner) return;
      var pt = calcPts(m, pr); var pf = pr.score === m.score && pt > 0;
      var upset = pt > 0 && ((m.winner === m.team1 && m.cote1 > m.cote2) || (m.winner === m.team2 && m.cote2 > m.cote1));
      feed.push({ p: p, pts: pt, pf: pf, upset: upset, emoji: pf ? "★" : upset ? "🎲" : pt > 0 ? "✓" : "✗", mt: m.team1 + " vs " + m.team2, week: m.week });
    });
  });
  feed.reverse(); feed = feed.slice(0, 8);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <NeonCard glow={me ? me.color : N1}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {me && <PlayerAvatar player={me} size={52} rankInfo={me.ri} />}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {me ? <PlayerName player={me} size={16} /> : <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: TP }}>{user}</span>}
            </div>
            {me && me.title && <TitleTag titleId={me.title} />}
            {me && <div style={{ marginTop: 4 }}><RankBadge rank={me.ri.rank} /></div>}
            {me && me.ri.next && (
              <div style={{ marginTop: 6 }}>
                <div style={{ height: 4, borderRadius: 2, background: BD, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, " + me.ri.rank.color + ", " + me.ri.next.color + ")", width: (me.ri.progress * 100) + "%" }} />
                </div>
                <div style={{ fontSize: 8, color: TD, marginTop: 2 }}>{me.xp} / {me.ri.next.xp} XP</div>
              </div>
            )}
          </div>
          {!spoil && me && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 24, color: TP }}>{me.total}<span style={{ fontSize: 10, color: TD }}> pts</span></div>
              <div style={{ fontSize: 11, color: myRank === 1 ? "#FFD700" : myRank === 2 ? "#C0C0C0" : TD, fontWeight: 700 }}>#{myRank}</div>
            </div>
          )}
        </div>
      </NeonCard>

      {nextMatch && countdown && (
        <div style={{ background: "linear-gradient(135deg, " + N1 + "08, " + N2 + "08)", border: "1px solid " + N1 + "20", borderRadius: 14, padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: TD, letterSpacing: 3, marginBottom: 8 }}>PROCHAIN MATCH</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
            <TeamLogo team={nextMatch.team1} size={28} />
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, color: TP }}>{nextMatch.team1}</span>
            <span style={{ fontSize: 11, color: N1, fontWeight: 800 }}>VS</span>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, color: TP }}>{nextMatch.team2}</span>
            <TeamLogo team={nextMatch.team2} size={28} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
            {countdown.d > 0 && <div style={{ background: S1, border: "1px solid " + BD, borderRadius: 8, padding: "6px 10px", minWidth: 40, textAlign: "center" }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: N1 }}>{countdown.d}</div><div style={{ fontSize: 7, color: TD, letterSpacing: 1 }}>JOURS</div></div>}
            <div style={{ background: S1, border: "1px solid " + BD, borderRadius: 8, padding: "6px 10px", minWidth: 40, textAlign: "center" }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: N1 }}>{countdown.h}</div><div style={{ fontSize: 7, color: TD, letterSpacing: 1 }}>HEURES</div></div>
            <div style={{ background: S1, border: "1px solid " + BD, borderRadius: 8, padding: "6px 10px", minWidth: 40, textAlign: "center" }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: N1 }}>{countdown.m}</div><div style={{ fontSize: 7, color: TD, letterSpacing: 1 }}>MIN</div></div>
            <div style={{ background: S1, border: "1px solid " + BD, borderRadius: 8, padding: "6px 10px", minWidth: 40, textAlign: "center" }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: N1 }}>{countdown.s}</div><div style={{ fontSize: 7, color: TD, letterSpacing: 1 }}>SEC</div></div>
          </div>
          <div style={{ fontSize: 9, color: TD, marginTop: 6 }}>{nextMatch.day}</div>
        </div>
      )}

      {myPending.length > 0 && (
        <button onClick={function() { onNav("matches"); }} style={{ background: N2 + "10", border: "1px solid " + N2 + "30", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", width: "100%", textAlign: "left" }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, color: N2 }}>{myPending.length} prono(s) manquant(s)</div></div>
          <span style={{ fontSize: 12, color: N2, fontFamily: FD }}>Parier →</span>
        </button>
      )}

      {!spoil && (
        <NeonCard glow={N1}>
          <div style={{ fontSize: 10, fontWeight: 700, color: N1, letterSpacing: 3, marginBottom: 12 }}>CLASSEMENT - {seasonName.toUpperCase()}</div>
          {stats.map(function(s, i) {
            var pct = maxPts > 0 ? (s.total / maxPts * 100) : 0;
            var streak = getStreak(s.name);
            return (
              <div key={s.name} style={{ marginBottom: i < stats.length - 1 ? 10 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: FD, fontWeight: 900, fontSize: 16, width: 22, textAlign: "center" }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : (i + 1)}</span>
                  <PlayerAvatar player={s} size={34} rankInfo={s.ri} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <PlayerName player={s} size={12} />
                      <RankBadge rank={s.ri.rank} />
                      {streak >= 3 && <span style={{ fontSize: 8, padding: "1px 4px", borderRadius: 4, background: NG + "15", color: NG, fontWeight: 700 }}>🔥{streak}</span>}
                    </div>
                    {s.title && <TitleTag titleId={s.title} />}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: TP }}>{s.total}</div>
                    <div style={{ fontSize: 8, color: TD }}>WR {s.wr}%</div>
                  </div>
                </div>
                <div style={{ marginLeft: 64, height: 6, borderRadius: 3, background: BD, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg, " + s.color + "80, " + s.color + ")", width: pct + "%", transition: "width 0.5s" }} />
                </div>
                <div style={{ marginLeft: 64, display: "flex", gap: 8, marginTop: 2 }}>
                  <span style={{ fontSize: 8, color: TD }}>{s.wins}W</span>
                  <span style={{ fontSize: 8, color: TD }}>{s.perfects}★</span>
                  <span style={{ fontSize: 8, color: TD }}>{s.games} matchs</span>
                </div>
              </div>
            );
          })}
        </NeonCard>
      )}

      {!spoil && weeklyBest && latestWeek && (
        <NeonCard glow={"#FFD700"}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#FFD700", letterSpacing: 3, marginBottom: 10 }}>RECAP SEMAINE {latestWeek}</div>
          {weeklyBest.map(function(ws, i) {
            return (
              <div key={ws.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < weeklyBest.length - 1 ? "1px solid " + BD : "none" }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 13, width: 18, color: i === 0 ? "#FFD700" : TD }}>{i + 1}</span>
                <span style={{ fontSize: 14 }}><MiniAvatar player={ws} size={16} /></span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, color: ws.color }}>{ws.name}</span>
                  <span style={{ fontSize: 9, color: TD, marginLeft: 6 }}>{ws.wins}/{ws.total} wins{ws.perfects > 0 ? " - " + ws.perfects + "★" : ""}</span>
                </div>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: i === 0 ? "#FFD700" : TP }}>+{ws.pts}</span>
              </div>
            );
          })}
        </NeonCard>
      )}

      {!spoil && (
        <div style={{ display: "flex", gap: 6 }}>
          {stats.map(function(s) {
            var streak = getStreak(s.name);
            return (
              <div key={s.name} style={{ flex: 1, background: S1, border: "1px solid " + BD, borderRadius: 10, padding: "8px 4px", textAlign: "center" }}>
                <span style={{ fontSize: 14 }}><MiniAvatar player={s} size={16} /></span>
                <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 10, color: s.color, marginTop: 2 }}>{s.name}</div>
                <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: streak >= 3 ? NG : TP, marginTop: 2 }}>{streak}</div>
                <div style={{ fontSize: 7, color: TD, letterSpacing: 1 }}>SERIE</div>
              </div>
            );
          })}
        </div>
      )}

      {spoil && <NeonCard glow={N3}><div style={{ textAlign: "center", padding: 20 }}><div style={{ fontSize: 24 }}>🔒</div><div style={{ fontSize: 10, fontWeight: 700, color: N3, marginTop: 8 }}>ANTI-SPOIL ACTIF</div></div></NeonCard>}

      {upcoming.length > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: N1, letterSpacing: 3 }}>PROCHAINS MATCHS</span>
            <button onClick={function() { onNav("matches"); }} style={{ background: "none", border: "none", color: N1, fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: FD }}>Tout →</button>
          </div>
          {upcoming.map(function(um) {
            var done = !!(um.preds[user] && um.preds[user].winner);
            return (
              <div key={um.id} style={{ background: S1, border: "1px solid " + BD, borderRadius: 10, padding: "10px 12px", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                <TeamLogo team={um.team1} size={22} />
                <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, flex: 1, textAlign: "right" }}>{um.team1}</span>
                <div style={{ textAlign: "center", minWidth: 50 }}>
                  <div style={{ display: "flex", gap: 4, justifyContent: "center", fontSize: 9 }}><span style={{ color: N3, fontWeight: 600 }}>{um.cote1}</span><span style={{ color: TD }}>-</span><span style={{ color: N2, fontWeight: 600 }}>{um.cote2}</span></div>
                  <div style={{ fontSize: 8, color: TD }}>{um.day}</div>
                </div>
                <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, flex: 1 }}>{um.team2}</span>
                <TeamLogo team={um.team2} size={22} />
                <div style={{ background: done ? NG + "18" : N2 + "18", color: done ? NG : N2, fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 6 }}>{done ? "✓" : "..."}</div>
              </div>
            );
          })}
        </div>
      )}

      {!spoil && feed.length > 0 && (
        <NeonCard glow={N2}>
          <div style={{ fontSize: 10, fontWeight: 700, color: N2, letterSpacing: 3, marginBottom: 10 }}>DERNIERS RESULTATS</div>
          {feed.map(function(f, i) {
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: i < feed.length - 1 ? "1px solid " + BD : "none" }}>
                <span style={{ fontSize: 12, width: 18, textAlign: "center" }}>{f.emoji}</span>
                <span style={{ fontSize: 12 }}><MiniAvatar player={f.p} size={14} /></span>
                <div style={{ flex: 1, fontSize: 10 }}>
                  <span style={{ fontWeight: 700, color: f.p.color }}>{f.p.name}</span>
                  <span style={{ color: TD }}> {f.mt}</span>
                  {f.upset && <span style={{ fontSize: 8, color: N2, marginLeft: 4 }}>UPSET</span>}
                </div>
                <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, color: f.pts > 0 ? (f.pf ? "#FFD700" : NG) : N3 }}>{f.pts > 0 ? "+" + rd(f.pts) : "0"}</span>
              </div>
            );
          })}
        </NeonCard>
      )}
    </div>
  );
}

/* ═══ MATCHES PAGE ═══ */

/* Collapsible section header */
function CollapseHeader(props) {
  var open = props.open; var onToggle = props.onToggle; var color = props.color || N1;
  var count = props.count; var label = props.label; var icon = props.icon || "";
  var bg = props.bg || color + "10"; var border = props.border || color;
  return (
    <button onClick={onToggle} style={{ width: "100%", padding: "8px 14px", borderRadius: 10, background: bg, borderLeft: "3px solid " + border, marginBottom: open ? 10 : 0, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", border: "none", borderLeftStyle: "solid", borderLeftWidth: 3, borderLeftColor: border }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: color, letterSpacing: 2, fontFamily: FD }}>{icon}{label} ({count})</span>
      <span style={{ fontSize: 12, color: color, transform: open ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▼</span>
    </button>
  );
}

/* Helper: render a list of matches grouped by week then day, with collapsible weeks */
function MatchListGrouped(props) {
  var list = props.matches; var players = props.players; var onUpdate = props.onUpdate;
  var user = props.currentUser; var isAdmin = props.isAdmin; var spoil = props.spoil;
  var defaultOpen = props.defaultOpenWeek;
  if (list.length === 0) return null;

  /* Group by week */
  var weekGroups = [];
  var weekMap = {};
  list.forEach(function(m) {
    var w = m.week || 0;
    if (!weekMap[w]) { weekMap[w] = []; weekGroups.push(w); }
    weekMap[w].push(m);
  });
  weekGroups.sort(function(a, b) { return a - b; });

  /* State for open weeks - default: only the specified week is open */
  var ow = useState(function() {
    var init = {};
    weekGroups.forEach(function(w) { init[w] = (w === defaultOpen); });
    return init;
  });
  var openWeeks = ow[0]; var setOpenWeeks = ow[1];

  function toggleWeek(w) {
    setOpenWeeks(function(prev) {
      var n = Object.assign({}, prev);
      n[w] = !n[w];
      return n;
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {weekGroups.map(function(w) {
        var weekMatches = weekMap[w];
        var isOpen = openWeeks[w];

        /* Group by day within week */
        var dayGroups = [];
        var dayMap = {};
        weekMatches.forEach(function(m) {
          var d = m.day || "?";
          if (!dayMap[d]) { dayMap[d] = []; dayGroups.push(d); }
          dayMap[d].push(m);
        });

        /* Count pronos done for this week */
        var predsDone = weekMatches.filter(function(m) { return m.preds[user] && m.preds[user].winner; }).length;

        return (
          <div key={w} style={{ marginBottom: 4 }}>
            {/* Collapsible week header */}
            <button onClick={function() { toggleWeek(w); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "6px 0", cursor: "pointer", background: "transparent", border: "none" }}>
              <div style={{ height: 1, flex: 0.3, background: N1 + "20" }} />
              <span style={{ fontSize: 10, fontWeight: 800, color: N1, letterSpacing: 3, fontFamily: FD, whiteSpace: "nowrap" }}>SEMAINE {w}</span>
              <span style={{ fontSize: 9, color: TD }}>({weekMatches.length} matchs{predsDone > 0 ? " - " + predsDone + " pronos" : ""})</span>
              <div style={{ height: 1, flex: 1, background: N1 + "20" }} />
              <span style={{ fontSize: 10, color: N1, transform: isOpen ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▼</span>
            </button>
            {isOpen && dayGroups.map(function(d) {
              var dayMatches = dayMap[d];
              return (
                <div key={d} style={{ marginBottom: 6 }}>
                  <div style={{ padding: "4px 10px", marginBottom: 6 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: TD, letterSpacing: 2, fontFamily: FD }}>{d}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {dayMatches.map(function(m) {
                      return <MatchCard key={m.id} match={m} players={players} onUpdate={onUpdate} currentUser={user} isAdmin={isAdmin} spoil={spoil} />;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function MatchesPage(props) {
  var matches = props.matches; var players = props.players; var onUpdate = props.onUpdate; var user = props.currentUser; var isAdmin = props.isAdmin; var spoil = props.spoil;
  var wf = useState("all"); var weekFilter = wf[0]; var setWf = wf[1];
  var weeks = []; matches.forEach(function(m) { if (weeks.indexOf(m.week) === -1) weeks.push(m.week); }); weeks.sort();
  var fil = weekFilter === "all" ? matches : matches.filter(function(m) { return m.week === Number(weekFilter); });
  var up = fil.filter(function(m) { return !m.winner && !m.locked; });
  var pending = fil.filter(function(m) { return (m.winner && !m.revealed) || (m.locked && !m.winner); });
  var done = fil.filter(function(m) { return m.winner && m.revealed !== false; });

  /* Find current week (latest week with upcoming matches, or latest with pending) */
  var currentWeek = null;
  if (up.length > 0) { currentWeek = up[0].week; }
  else if (pending.length > 0) { currentWeek = pending[0].week; }
  else if (done.length > 0) { currentWeek = done[done.length - 1].week; }

  /* Section collapse state */
  var su = useState(true); var showUp = su[0]; var setShowUp = su[1];
  var sp2 = useState(true); var showPend = sp2[0]; var setShowPend = sp2[1];
  var sd = useState(false); var showDone = sd[0]; var setShowDone = sd[1];

  return (
    <div>
      <div style={{ display: "flex", gap: 5, marginBottom: 16, flexWrap: "wrap" }}>
        <button onClick={function() { setWf("all"); }} style={{ border: "1px solid " + BD, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: FD, background: weekFilter === "all" ? N1 : S2, color: weekFilter === "all" ? BG : TD }}>Toutes</button>
        {weeks.map(function(w) { return <button key={w} onClick={function() { setWf(w); }} style={{ border: "1px solid " + BD, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: FD, background: weekFilter === w ? N1 : S2, color: weekFilter === w ? BG : TD }}>W{w}</button>; })}
      </div>
      {up.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <CollapseHeader open={showUp} onToggle={function() { setShowUp(!showUp); }} color={N1} label="A VENIR" count={up.length} bg={"linear-gradient(90deg, " + N1 + "10, transparent)"} border={N1} />
          {showUp && <MatchListGrouped matches={up} players={players} onUpdate={onUpdate} currentUser={user} isAdmin={isAdmin} spoil={false} defaultOpenWeek={currentWeek} />}
        </div>
      )}
      {pending.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <CollapseHeader open={showPend} onToggle={function() { setShowPend(!showPend); }} color={N2} label="EN ATTENTE" icon="⏳ " count={pending.length} bg={"linear-gradient(90deg, " + N2 + "10, transparent)"} border={N2} />
          {showPend && <MatchListGrouped matches={pending} players={players} onUpdate={onUpdate} currentUser={user} isAdmin={isAdmin} spoil={false} defaultOpenWeek={currentWeek} />}
        </div>
      )}
      {(up.length > 0 || pending.length > 0) && done.length > 0 && <div style={{ height: 1, background: "linear-gradient(90deg, transparent, " + BD + ", transparent)", margin: "0 0 12px" }} />}
      {done.length > 0 && (
        <div>
          <CollapseHeader open={showDone} onToggle={function() { setShowDone(!showDone); }} color={TD} label="TERMINES" count={done.length} bg={S2} border={TD} />
          {showDone && <MatchListGrouped matches={done} players={players} onUpdate={onUpdate} currentUser={user} isAdmin={isAdmin} spoil={spoil} defaultOpenWeek={done[done.length - 1] ? done[done.length - 1].week : null} />}
        </div>
      )}
    </div>
  );
}

/* ═══ STATS PAGE ═══ */
function StatsPage(props) {
  var matches = props.matches; var players = props.players; var spoil = props.spoil;
  var revealed = matches.filter(function(m) { return m.revealed !== false; });
  var stv = useState("chart"); var statsView = stv[0]; var setStatsView = stv[1];
  var sp = useState(null); var selPlayer = sp[0]; var setSelPlayer = sp[1];
  var cp = useState(null); var compPlayer = cp[0]; var setCompPlayer = cp[1];

  if (spoil) return <div style={{ textAlign: "center", padding: "60px 20px" }}><div style={{ fontSize: 48 }}>🔒</div><div style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: N1, marginTop: 8 }}>Anti-spoil actif</div></div>;

  /* Build cumulative points per week per player */
  var weeks = [];
  revealed.forEach(function(m) { if (m.winner && m.week && weeks.indexOf(m.week) === -1) weeks.push(m.week); });
  weeks.sort(function(a, b) { return a - b; });

  var curves = players.map(function(p) {
    var cum = 0;
    var pts = [{ w: 0, v: 0 }];
    weeks.forEach(function(wk) {
      var wm = revealed.filter(function(m) { return m.week === wk && m.winner; });
      wm.forEach(function(m) {
        var pr = m.preds[p.name];
        if (pr && pr.winner) cum = cum + calcPts(m, pr);
      });
      pts.push({ w: wk, v: rd(cum) });
    });
    return { name: p.name, color: p.color, pts: pts };
  });

  var maxVal = 1;
  curves.forEach(function(c) { c.pts.forEach(function(p) { if (p.v > maxVal) maxVal = p.v; }); });

  /* Weekly stats per player */
  function getWeeklyStats(pname) {
    return weeks.map(function(wk) {
      var wm = revealed.filter(function(m) { return m.week === wk && m.winner; });
      var pts = 0; var wins = 0; var perfects = 0; var total = 0;
      wm.forEach(function(m) {
        var pr = m.preds[pname]; if (!pr || !pr.winner) return;
        total++;
        var pt = calcPts(m, pr);
        if (pt > 0) { pts += pt; wins++; }
        if (pt > 0 && pr.score === m.score) perfects++;
      });
      return { week: wk, pts: rd(pts), wins: wins, perfects: perfects, total: total };
    });
  }

  /* Team winrate for a player */
  function getTeamWR(pname) {
    var teams = {};
    revealed.forEach(function(m) {
      if (!m.winner || !m.preds[pname] || !m.preds[pname].winner) return;
      [m.team1, m.team2].forEach(function(t) {
        if (!teams[t]) teams[t] = { w: 0, l: 0 };
      });
      var pr = m.preds[pname];
      var won = pr.winner === m.winner;
      /* Which team was predicted to win */
      if (won) {
        teams[m.winner].w++;
      } else {
        teams[pr.winner].l++;
      }
    });
    var arr = Object.keys(teams).map(function(t) {
      var d = teams[t]; var total = d.w + d.l;
      return { team: t, wins: d.w, total: total, wr: total > 0 ? Math.round(d.w / total * 100) : 0 };
    }).filter(function(t) { return t.total > 0; });
    arr.sort(function(a, b) { return b.wr - a.wr; });
    return arr;
  }

  /* Head to head comparison */
  function getH2H(p1, p2) {
    var p1better = 0; var p2better = 0; var ties = 0;
    revealed.forEach(function(m) {
      if (!m.winner) return;
      var pr1 = m.preds[p1]; var pr2 = m.preds[p2];
      if (!pr1 || !pr1.winner || !pr2 || !pr2.winner) return;
      var pt1 = calcPts(m, pr1); var pt2 = calcPts(m, pr2);
      if (pt1 > pt2) p1better++;
      else if (pt2 > pt1) p2better++;
      else ties++;
    });
    return { p1: p1better, p2: p2better, ties: ties };
  }

  /* Nav tabs */
  var tabs = [
    { id: "chart", label: "Evolution" },
    { id: "players", label: "Joueurs" },
    { id: "h2h", label: "Duel" },
  ];

  /* SVG Chart dimensions */
  var cW = 340; var cH = 180; var pad = 30;
  var gW = cW - pad * 2; var gH = cH - pad * 2;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid " + BD }}>
        {tabs.map(function(t) {
          return <button key={t.id} onClick={function() { setStatsView(t.id); }}
            style={{ background: "transparent", border: "none", borderBottom: statsView === t.id ? "2px solid " + N1 : "2px solid transparent", color: statsView === t.id ? N1 : TD, padding: "8px 14px", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: FD, letterSpacing: 1 }}>{t.label}</button>;
        })}
      </div>

      {/* ── EVOLUTION CHART ── */}
      {statsView === "chart" && (
        <div>
          <NeonCard glow={N1}>
            <div style={{ fontSize: 10, fontWeight: 700, color: N1, letterSpacing: 3, marginBottom: 10 }}>EVOLUTION DES POINTS</div>
            <svg viewBox={"0 0 " + cW + " " + cH} style={{ width: "100%", height: "auto" }}>
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map(function(f, i) {
                var y = pad + gH - gH * f;
                return <g key={i}>
                  <line x1={pad} y1={y} x2={pad + gW} y2={y} stroke={BD} strokeWidth="0.5" />
                  <text x={pad - 4} y={y + 3} fill={TD} fontSize="7" textAnchor="end" fontFamily="DM Sans">{Math.round(maxVal * f)}</text>
                </g>;
              })}
              {/* Week labels */}
              {weeks.map(function(wk, i) {
                var x = pad + (i + 1) / weeks.length * gW;
                return <text key={wk} x={x} y={cH - 5} fill={TD} fontSize="7" textAnchor="middle" fontFamily="DM Sans">W{wk}</text>;
              })}
              {/* Player curves */}
              {curves.map(function(c) {
                var points = c.pts.map(function(p, i) {
                  var x = pad + i / (c.pts.length - 1) * gW;
                  var y = pad + gH - (p.v / maxVal) * gH;
                  return x + "," + y;
                }).join(" ");
                return <g key={c.name}>
                  <polyline points={points} fill="none" stroke={c.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" opacity="0.8" />
                  {c.pts.map(function(p, i) {
                    if (i === 0) return null;
                    var x = pad + i / (c.pts.length - 1) * gW;
                    var y = pad + gH - (p.v / maxVal) * gH;
                    return <circle key={i} cx={x} cy={y} r="3" fill={c.color} stroke={S1} strokeWidth="1" />;
                  })}
                </g>;
              })}
            </svg>
            {/* Legend */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 6 }}>
              {curves.map(function(c) {
                var last = c.pts[c.pts.length - 1];
                return (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: c.color, fontFamily: FD }}>{c.name}</span>
                    <span style={{ fontSize: 8, color: TD }}>{last.v}</span>
                  </div>
                );
              })}
            </div>
          </NeonCard>

          {/* Weekly breakdown */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: TD, letterSpacing: 3, marginBottom: 8 }}>SEMAINE PAR SEMAINE</div>
            {weeks.slice().reverse().map(function(wk) {
              var weekPlayers = players.map(function(p) {
                var wm = revealed.filter(function(m) { return m.week === wk && m.winner; });
                var pts = 0; var wins = 0; var pf = 0;
                wm.forEach(function(m) {
                  var pr = m.preds[p.name]; if (!pr || !pr.winner) return;
                  var pt = calcPts(m, pr);
                  if (pt > 0) { pts += pt; wins++; }
                  if (pt > 0 && pr.score === m.score) pf++;
                });
                return { name: p.name, color: p.color, pts: rd(pts), wins: wins, pf: pf };
              }).sort(function(a, b) { return b.pts - a.pts; });
              return (
                <div key={wk} style={{ background: S1, border: "1px solid " + BD, borderRadius: 10, padding: "8px 12px", marginBottom: 6 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: N1, letterSpacing: 2, marginBottom: 6 }}>SEMAINE {wk}</div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {weekPlayers.map(function(wp, i) {
                      return (
                        <div key={wp.name} style={{ flex: 1, textAlign: "center", padding: "4px 0", borderRadius: 6, background: i === 0 ? "#FFD700" + "10" : "transparent" }}>
                          <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: wp.color }}>{wp.pts}</div>
                          <div style={{ fontSize: 8, fontWeight: 700, color: wp.color }}>{wp.name}</div>
                          <div style={{ fontSize: 7, color: TD }}>{wp.wins}W {wp.pf > 0 ? wp.pf + "★" : ""}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── PLAYER DETAIL ── */}
      {statsView === "players" && (
        <div>
          {/* Player selector */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {players.map(function(p) {
              var active = selPlayer === p.name;
              return (
                <button key={p.name} onClick={function() { setSelPlayer(active ? null : p.name); }}
                  style={{ flex: 1, padding: "8px 4px", borderRadius: 10, border: active ? "2px solid " + p.color : "1px solid " + BD, background: active ? p.color + "12" : S1, cursor: "pointer", textAlign: "center" }}>
                  <MiniAvatar player={p} size={20} />
                  <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 9, color: active ? p.color : TD, marginTop: 2 }}>{p.name}</div>
                </button>
              );
            })}
          </div>

          {!selPlayer && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {players.map(function(p) {
                var s = getStats(revealed, p.name); var xp = getTotalXP(s); var r2 = getRank(xp); var ul = getUnlocked(s);
                return (
                  <NeonCard key={p.name} glow={p.color} pad="12px">
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
                      <MiniAvatar player={p} size={18} />
                      <div><div style={{ fontFamily: FD, fontWeight: 700, color: p.color, fontSize: 13 }}>{p.name}</div><RankBadge rank={r2.rank} /></div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 10 }}>
                      <div><span style={{ color: TD }}>Winrate</span><br /><span style={{ fontWeight: 700 }}>{s.wr}%</span></div>
                      <div><span style={{ color: TD }}>Moy</span><br /><span style={{ fontWeight: 700 }}>{s.played > 0 ? (s.total / s.played).toFixed(1) : "0"}</span></div>
                      <div><span style={{ color: TD }}>Parfaits</span><br /><span style={{ fontWeight: 700, color: "#FFD700" }}>{s.perfects}</span></div>
                      <div><span style={{ color: TD }}>Total</span><br /><span style={{ fontWeight: 700, color: NG }}>{s.total}</span></div>
                    </div>
                    <div style={{ fontSize: 9, color: TD, marginTop: 4 }}>{ul.length}/{ACHS.length} succes</div>
                  </NeonCard>
                );
              })}
            </div>
          )}

          {selPlayer && (
            <div>
              {/* Detailed player stats */}
              {(function() {
                var p = players.find(function(pl) { return pl.name === selPlayer; });
                var s = getStats(revealed, selPlayer);
                var xp = getTotalXP(s); var r2 = getRank(xp);
                var twr = getTeamWR(selPlayer);
                var wkStats = getWeeklyStats(selPlayer);
                var bestW = wkStats.slice().sort(function(a, b) { return b.pts - a.pts; })[0];
                var worstW = wkStats.slice().sort(function(a, b) { return a.pts - b.pts; })[0];

                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {/* Header */}
                    <NeonCard glow={p.color}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <PlayerAvatar player={p} size={50} rankInfo={r2} />
                        <div style={{ flex: 1 }}>
                          <PlayerName player={p} size={16} />
                          <div style={{ marginTop: 2 }}><RankBadge rank={r2.rank} /></div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: TP }}>{s.total}</div>
                          <div style={{ fontSize: 9, color: TD }}>WR {s.wr}% | {s.perfects}★</div>
                        </div>
                      </div>
                    </NeonCard>

                    {/* Key stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                      {[
                        { l: "Matchs", v: s.played, c: TP },
                        { l: "Victoires", v: s.wins, c: NG },
                        { l: "Parfaits", v: s.perfects, c: "#FFD700" },
                        { l: "Upsets", v: s.upsets, c: N2 },
                        { l: "Max serie", v: s.maxStreak, c: N1 },
                        { l: "Moy/match", v: s.played > 0 ? (s.total / s.played).toFixed(1) : "0", c: TP },
                      ].map(function(st) {
                        return (
                          <div key={st.l} style={{ background: S1, border: "1px solid " + BD, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                            <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: st.c }}>{st.v}</div>
                            <div style={{ fontSize: 7, color: TD, letterSpacing: 1 }}>{st.l.toUpperCase()}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Best/Worst week */}
                    {bestW && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <div style={{ flex: 1, background: S1, border: "1px solid " + NG + "20", borderRadius: 8, padding: "8px 10px" }}>
                          <div style={{ fontSize: 8, color: NG, fontWeight: 700, letterSpacing: 1 }}>MEILLEURE SEMAINE</div>
                          <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: TP }}>W{bestW.week} - {bestW.pts} pts</div>
                          <div style={{ fontSize: 8, color: TD }}>{bestW.wins}/{bestW.total} wins</div>
                        </div>
                        <div style={{ flex: 1, background: S1, border: "1px solid " + N3 + "20", borderRadius: 8, padding: "8px 10px" }}>
                          <div style={{ fontSize: 8, color: N3, fontWeight: 700, letterSpacing: 1 }}>PIRE SEMAINE</div>
                          <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: TP }}>W{worstW.week} - {worstW.pts} pts</div>
                          <div style={{ fontSize: 8, color: TD }}>{worstW.wins}/{worstW.total} wins</div>
                        </div>
                      </div>
                    )}

                    {/* Team winrate */}
                    <NeonCard glow={p.color} pad="12px">
                      <div style={{ fontSize: 9, fontWeight: 700, color: p.color, letterSpacing: 2, marginBottom: 8 }}>WINRATE PAR EQUIPE</div>
                      {twr.slice(0, 6).map(function(tw) {
                        return (
                          <div key={tw.team} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <TeamLogo team={tw.team} size={18} />
                            <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, flex: 1 }}>{tw.team}</span>
                            <div style={{ width: 60, height: 5, borderRadius: 3, background: BD, overflow: "hidden" }}>
                              <div style={{ height: "100%", borderRadius: 3, background: tw.wr >= 70 ? NG : tw.wr >= 50 ? N1 : N3, width: tw.wr + "%" }} />
                            </div>
                            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 10, color: tw.wr >= 70 ? NG : tw.wr >= 50 ? TP : N3, width: 32, textAlign: "right" }}>{tw.wr}%</span>
                            <span style={{ fontSize: 8, color: TD }}>{tw.wins}/{tw.total}</span>
                          </div>
                        );
                      })}
                    </NeonCard>

                    {/* Match history */}
                    <NeonCard glow={TD} pad="12px">
                      <div style={{ fontSize: 9, fontWeight: 700, color: TD, letterSpacing: 2, marginBottom: 8 }}>HISTORIQUE</div>
                      {revealed.slice().reverse().filter(function(m) { return m.winner && m.preds[selPlayer] && m.preds[selPlayer].winner; }).slice(0, 12).map(function(m) {
                        var pr = m.preds[selPlayer];
                        var pt = calcPts(m, pr);
                        var pf = pt > 0 && pr.score === m.score;
                        var won = pt > 0;
                        return (
                          <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0", borderBottom: "1px solid " + BD }}>
                            <span style={{ fontSize: 10, width: 14, textAlign: "center" }}>{pf ? "★" : won ? "✓" : "✗"}</span>
                            <TeamLogo team={m.team1} size={14} />
                            <span style={{ fontSize: 9, flex: 1 }}>{m.team1} vs {m.team2}</span>
                            <span style={{ fontSize: 8, color: TD }}>W{m.week}</span>
                            <span style={{ fontSize: 8, color: TD }}>{pr.winner} {pr.score}</span>
                            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 10, color: won ? (pf ? "#FFD700" : NG) : N3, width: 28, textAlign: "right" }}>{pt > 0 ? "+" + rd(pt) : "0"}</span>
                          </div>
                        );
                      })}
                    </NeonCard>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* ── HEAD TO HEAD ── */}
      {statsView === "h2h" && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: N1, letterSpacing: 3, marginBottom: 10 }}>CHOISIR 2 JOUEURS</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {players.map(function(p) {
              var is1 = compPlayer === p.name;
              var is2 = cp[0] && cp[0] !== p.name && selPlayer === p.name;
              return (
                <button key={p.name} onClick={function() {
                  if (!compPlayer) { setCompPlayer(p.name); }
                  else if (compPlayer === p.name) { setCompPlayer(null); }
                  else { setSelPlayer(p.name); }
                }}
                  style={{ flex: 1, padding: "10px 4px", borderRadius: 10, border: (compPlayer === p.name || selPlayer === p.name) ? "2px solid " + p.color : "1px solid " + BD, background: (compPlayer === p.name || selPlayer === p.name) ? p.color + "12" : S1, cursor: "pointer", textAlign: "center" }}>
                  <MiniAvatar player={p} size={22} />
                  <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 9, color: (compPlayer === p.name || selPlayer === p.name) ? p.color : TD, marginTop: 2 }}>{p.name}</div>
                </button>
              );
            })}
          </div>

          {compPlayer && selPlayer && compPlayer !== selPlayer && (function() {
            var p1 = players.find(function(p) { return p.name === compPlayer; });
            var p2 = players.find(function(p) { return p.name === selPlayer; });
            var s1p = getStats(revealed, compPlayer);
            var s2p = getStats(revealed, selPlayer);
            var h2h = getH2H(compPlayer, selPlayer);

            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Score bar */}
                <NeonCard glow={N1}>
                  <div style={{ textAlign: "center", marginBottom: 10 }}>
                    <div style={{ fontSize: 9, color: TD, letterSpacing: 2, fontWeight: 700 }}>CONFRONTATION DIRECTE</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <MiniAvatar player={p1} size={28} />
                      <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, color: p1.color, marginTop: 4 }}>{p1.name}</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 28, color: TP }}>{h2h.p1} - {h2h.p2}</div>
                      <div style={{ fontSize: 8, color: TD }}>{h2h.ties} egalite(s)</div>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <MiniAvatar player={p2} size={28} />
                      <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, color: p2.color, marginTop: 4 }}>{p2.name}</div>
                    </div>
                  </div>
                  {/* H2H bar */}
                  <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginTop: 10 }}>
                    <div style={{ width: (h2h.p1 + h2h.p2 > 0 ? h2h.p1 / (h2h.p1 + h2h.p2) * 100 : 50) + "%", background: p1.color, transition: "width 0.3s" }} />
                    <div style={{ flex: 1, background: p2.color }} />
                  </div>
                </NeonCard>

                {/* Stat comparison */}
                <NeonCard glow={TD} pad="12px">
                  {[
                    { l: "Points", v1: s1p.total, v2: s2p.total },
                    { l: "Winrate", v1: s1p.wr + "%", v2: s2p.wr + "%" },
                    { l: "Victoires", v1: s1p.wins, v2: s2p.wins },
                    { l: "Parfaits", v1: s1p.perfects, v2: s2p.perfects },
                    { l: "Upsets", v1: s1p.upsets, v2: s2p.upsets },
                    { l: "Max serie", v1: s1p.maxStreak, v2: s2p.maxStreak },
                  ].map(function(row) {
                    var n1 = parseFloat(row.v1); var n2 = parseFloat(row.v2);
                    return (
                      <div key={row.l} style={{ display: "flex", alignItems: "center", padding: "6px 0", borderBottom: "1px solid " + BD }}>
                        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, color: n1 > n2 ? p1.color : n1 === n2 ? TP : TD, flex: 1, textAlign: "center" }}>{row.v1}</span>
                        <span style={{ fontSize: 9, color: TD, fontWeight: 600, width: 70, textAlign: "center" }}>{row.l}</span>
                        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, color: n2 > n1 ? p2.color : n2 === n1 ? TP : TD, flex: 1, textAlign: "center" }}>{row.v2}</span>
                      </div>
                    );
                  })}
                </NeonCard>
              </div>
            );
          })()}

          {(!compPlayer || !selPlayer || compPlayer === selPlayer) && (
            <div style={{ textAlign: "center", padding: 30, color: TD, fontSize: 10 }}>Selectionne 2 joueurs differents pour comparer</div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══ PROFILE PAGE ═══ */
function ProfilePage(props) {
  var matches = props.matches; var players = props.players; var user = props.currentUser; var onUp = props.onUpdatePlayer; var onToggle = props.onTogglePreview; var previewOn = props.previewMode;
  var me = players.find(function(p) { return p.name === user; });
  var pi = players.findIndex(function(p) { return p.name === user; });
  if (!me) return null;
  var s = getStats(matches, user);
  var xp = getTotalXP(s); var r = getRank(xp);
  var ul = getUnlocked(s);
  var ulIds = ul.map(function(a) { return a.id; });
  var allIds = getAllIds(s);
  var locked = ACHS.filter(function(a) { return ulIds.indexOf(a.id) === -1 && !a.hidden; });
  var hiddenN = ACHS.filter(function(a) { return ulIds.indexOf(a.id) === -1 && a.hidden; }).length;
  var availT = getAvailTitles(s);
  var availAv = getAvailAvatars(allIds, previewOn);
  var availOrn = getAvailOrnaments(allIds);
  var availCS = getAvailCStyles(allIds);
  var sec = useState("succes"); var activeSec = sec[0]; var setSec = sec[1];
  var cf = useState("all"); var catF = cf[0]; var setCatF = cf[1];

  var filtAll = catF === "all" ? ACHS : ACHS.filter(function(a) { return a.cat === catF; });
  var filtUl = filtAll.filter(function(a) { return ulIds.indexOf(a.id) !== -1; });
  var filtLo = filtAll.filter(function(a) { return ulIds.indexOf(a.id) === -1 && !a.hidden; });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <NeonCard glow={me.color}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <PlayerAvatar player={me} size={80} rankInfo={r} />
          </div>
          <PlayerName player={me} size={22} />
          {me.title && <TitleTag titleId={me.title} />}
          <div style={{ marginTop: 6 }}><RankBadge rank={r.rank} /></div>
          {r.next && (
            <div style={{ maxWidth: 220, margin: "8px auto 0" }}>
              <div style={{ height: 6, borderRadius: 3, background: BD, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg, " + r.rank.color + ", " + r.next.color + ")", width: (r.progress * 100) + "%" }} />
              </div>
              <div style={{ fontSize: 9, color: TD, marginTop: 3 }}>{xp} / {r.next.xp} XP - {r.next.label}</div>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 14 }}>
            <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: TP }}>{s.total}</div><div style={{ fontSize: 9, color: TD }}>POINTS</div></div>
            <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: TP }}>{s.wr}%</div><div style={{ fontSize: 9, color: TD }}>WINRATE</div></div>
            <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: "#FFD700" }}>{s.perfects}</div><div style={{ fontSize: 9, color: TD }}>PARFAITS</div></div>
            <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: NG }}>{ul.length}</div><div style={{ fontSize: 9, color: TD }}>SUCCES</div></div>
          </div>
        </div>
      </NeonCard>

      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid " + BD }}>
        {[{ id: "succes", l: "Succes" }, { id: "custom", l: "Personnalisation" }].map(function(t) {
          return <button key={t.id} onClick={function() { setSec(t.id); }} style={{ background: "transparent", border: "none", borderBottom: activeSec === t.id ? "2px solid " + N2 : "2px solid transparent", color: activeSec === t.id ? N2 : TD, padding: "8px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: FD }}>{t.l}</button>;
        })}
      </div>

      {activeSec === "succes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <button onClick={function() { setCatF("all"); }} style={{ border: "1px solid " + BD, borderRadius: 8, padding: "4px 10px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: FD, background: catF === "all" ? N1 : S2, color: catF === "all" ? BG : TD }}>Tous</button>
            {ACH_CATS.map(function(c) { return <button key={c.id} onClick={function() { setCatF(c.id); }} style={{ border: "1px solid " + (catF === c.id ? c.color : BD), borderRadius: 8, padding: "4px 10px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: FD, background: catF === c.id ? c.color + "20" : S2, color: catF === c.id ? c.color : TD }}>{c.name}</button>; })}
          </div>
          <div style={{ fontSize: 10, color: TD }}>{ul.length}/{ACHS.length} debloques - {xp} XP total</div>
          <div style={{ height: 6, borderRadius: 3, background: BD, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg, " + N1 + ", " + N2 + ")", width: (ul.length / ACHS.length * 100) + "%" }} />
          </div>
          {filtUl.length > 0 && (
            <NeonCard glow={NG}>
              <div style={{ fontSize: 10, fontWeight: 700, color: NG, letterSpacing: 2, marginBottom: 8 }}>DEBLOQUES ({filtUl.length})</div>
              {filtUl.map(function(a) {
                var ci = ACH_CATS.find(function(c) { return c.id === a.cat; });
                var tName = a.title ? TITLES.find(function(t) { return t.id === a.title; }) : null;
                return (
                  <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10, background: NG + "06", border: "1px solid " + NG + "15", marginBottom: 4 }}>
                    <span style={{ fontSize: 20 }}>{a.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, color: TP }}>{a.name}</span>
                        {ci && <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 3, background: ci.color + "18", color: ci.color, fontWeight: 600 }}>{ci.name}</span>}
                      </div>
                      <div style={{ fontSize: 9, color: TD }}>{a.desc}</div>
                      {tName && <div style={{ fontSize: 9, color: N2, marginTop: 1 }}>🏷️ Titre : {tName.name}</div>}
                    </div>
                    <span style={{ fontSize: 9, color: N1, fontWeight: 700 }}>+{a.xp}</span>
                  </div>
                );
              })}
            </NeonCard>
          )}
          {filtLo.length > 0 && (
            <NeonCard glow={TD}>
              <div style={{ fontSize: 10, fontWeight: 700, color: TD, letterSpacing: 2, marginBottom: 8 }}>VERROUILLES ({filtLo.length})</div>
              {filtLo.map(function(a) {
                var ci = ACH_CATS.find(function(c) { return c.id === a.cat; });
                var tName = a.title ? TITLES.find(function(t) { return t.id === a.title; }) : null;
                return (
                  <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10, background: S2, border: "1px solid " + BD, marginBottom: 4, opacity: 0.5 }}>
                    <span style={{ fontSize: 20, filter: "grayscale(1)" }}>{a.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, color: TD }}>{a.name}</span>
                        {ci && <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 3, background: ci.color + "10", color: ci.color + "88", fontWeight: 600 }}>{ci.name}</span>}
                      </div>
                      <div style={{ fontSize: 9, color: TD }}>{a.desc}</div>
                      {tName && <div style={{ fontSize: 9, color: TD, marginTop: 1 }}>🏷️ Titre : {tName.name}</div>}
                    </div>
                    <span style={{ fontSize: 9, color: TD }}>+{a.xp} 🔒</span>
                  </div>
                );
              })}
            </NeonCard>
          )}
          {hiddenN > 0 && <div style={{ textAlign: "center", padding: 12, fontSize: 10, color: TD, fontStyle: "italic" }}>❓ {hiddenN} succes secrets a decouvrir...</div>}
        </div>
      )}

      {activeSec === "custom" && (
        <ProfileCustomCollapsible me={me} pi={pi} r={r} onUp={onUp} onToggle={onToggle} previewOn={previewOn} availAv={availAv} availOrn={availOrn} availCS={availCS} availT={availT} allIds={allIds} />
      )}
    </div>
  );
}

/* ═══ PROFILE CUSTOMIZATION with collapsible sections ═══ */
function ProfileCustomCollapsible(props) {
  var me = props.me; var pi = props.pi; var r = props.r; var onUp = props.onUp;
  var onToggle = props.onToggle; var previewOn = props.previewOn;
  var availAv = props.availAv; var availOrn = props.availOrn; var availCS = props.availCS;
  var availT = props.availT; var allIds = props.allIds;

  var s1 = useState(""); var openSec = s1[0]; var setOpenSec = s1[1];
  function toggleSec(id) { setOpenSec(openSec === id ? "" : id); }

  /* Local preview overrides - purely visual, never saved */
  var pvo = useState(null); var pvOver = pvo[0]; var setPvOver = pvo[1];

  /* Display player = real + preview overrides on top */
  var dp = previewOn && pvOver ? Object.assign({}, me, pvOver) : me;

  /* Toggle preview: when turning off, clear overrides */
  function doToggle() {
    if (previewOn) setPvOver(null);
    onToggle();
  }

  /* Smart update: locked items go to local preview only, unlocked save to Supabase */
  function su(field, value, isLocked) {
    if (isLocked && previewOn) {
      var ov = Object.assign({}, pvOver || {});
      ov[field] = value;
      setPvOver(ov);
    } else if (!isLocked) {
      var up = Object.assign({}, me);
      up[field] = value;
      onUp(pi, up);
      if (pvOver) {
        var cl = Object.assign({}, pvOver);
        delete cl[field];
        setPvOver(Object.keys(cl).length > 0 ? cl : null);
      }
    }
  }

  var AC = N1;

  function Sec(p2) {
    var open = openSec === p2.id;
    return (
      <div style={{ marginBottom: 2 }}>
        <button onClick={function() { toggleSec(p2.id); }}
          style={{ width: "100%", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", background: open ? AC + "06" : "transparent", border: "none", borderRadius: open ? "10px 10px 0 0" : 10, transition: "all 0.15s" }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: AC + "10", border: "1px solid " + AC + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{p2.icon}</div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: TP, letterSpacing: 1.5, fontFamily: FD }}>{p2.label}</div>
            <div style={{ fontSize: 8, color: TD, marginTop: 1 }}>{p2.sub}</div>
          </div>
          <span style={{ fontSize: 8, color: AC, transform: open ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▼</span>
        </button>
        {open && (
          <div style={{ padding: "6px 14px 14px", background: AC + "03", borderRadius: "0 0 10px 10px", borderTop: "1px solid " + AC + "10" }}>
            {p2.children}
          </div>
        )}
      </div>
    );
  }

  function GridItem(p2) {
    var active = p2.active; var locked = p2.locked; var preview = p2.preview;
    var canUse = !locked || preview;
    return (
      <button disabled={!canUse} onClick={function() { if (canUse && p2.onClick) p2.onClick(); }}
        style={{ width: p2.w || 40, height: p2.h || 40, borderRadius: 8, border: active ? "2px solid " + AC : preview ? "1px dashed " + N2 + "40" : "1px solid " + BD, background: active ? AC + "12" : S2, cursor: canUse ? "pointer" : "not-allowed", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, opacity: canUse ? 1 : 0.3, transition: "all 0.12s", position: "relative", overflow: "hidden" }}>
        {p2.children}
        {active && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: AC }} />}
      </button>
    );
  }

  function ListItem(p2) {
    var active = p2.active; var locked = p2.locked; var preview = p2.preview;
    var canUse = !locked || preview;
    return (
      <button disabled={!canUse} onClick={function() { if (canUse && p2.onClick) p2.onClick(); }}
        style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: active ? "1px solid " + AC + "50" : "1px solid " + BD, background: active ? AC + "08" : "transparent", cursor: canUse ? "pointer" : "not-allowed", textAlign: "left", display: "flex", alignItems: "center", gap: 10, opacity: canUse ? 1 : 0.3, transition: "all 0.12s" }}>
        {p2.children}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: AC, boxShadow: "0 0 6px " + AC }} />}
          {locked && !preview && <span style={{ fontSize: 8, color: TD }}>🔒</span>}
          {preview && <span style={{ fontSize: 7, padding: "1px 4px", borderRadius: 3, background: N2 + "12", color: N2, fontWeight: 600 }}>PREV</span>}
        </div>
      </button>
    );
  }

  function SL(p2) {
    return <div style={{ fontSize: 8, fontWeight: 700, color: TD, letterSpacing: 2, marginBottom: 5, marginTop: p2.mt ? 12 : 0 }}>{p2.children}</div>;
  }

  var curTitle = dp.title ? (TITLES.find(function(t) { return t.id === dp.title; }) || {}).name || "" : "Aucun";
  var curOrn = ORNAMENTS.find(function(o) { return o.id === dp.ornament; });
  var curOrnName = curOrn ? curOrn.name : "Aucun";
  var curCS = CSTYLES.find(function(c) { return c.id === dp.cstyle; });
  var curCSName = curCS ? curCS.name : "Classique";

  return (
    <div>
      {/* ── LIVE PREVIEW ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0 14px", gap: 6 }}>
        <div style={{ position: "relative" }}>
          <PlayerAvatar player={dp} size={88} rankInfo={r} />
          {previewOn && <div style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, borderRadius: "50%", background: N2, border: "2px solid " + S1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7 }}>👁</div>}
        </div>
        <PlayerName player={dp} size={15} />
        {dp.title && <TitleTag titleId={dp.title} />}
        <RankBadge rank={r.rank} />
        <button onClick={function() { doToggle(); }}
          style={{ marginTop: 4, padding: "4px 14px", borderRadius: 20, border: "1px solid " + (previewOn ? N2 + "50" : BD), background: previewOn ? N2 + "10" : "transparent", fontSize: 8, fontWeight: 700, color: previewOn ? N2 : TD, cursor: "pointer", fontFamily: FD, letterSpacing: 1, transition: "all 0.15s" }}>
          {previewOn ? "✓ PREVIEW ACTIF" : "PREVISUALISER TOUT"}
        </button>
        {previewOn && pvOver && Object.keys(pvOver).length > 0 && (
          <div style={{ fontSize: 8, color: N2, fontStyle: "italic" }}>Modifications non sauvegardees (preview uniquement)</div>
        )}
      </div>

      {/* ── SECTIONS ── */}
      <div style={{ background: S1, borderRadius: 14, border: "1px solid " + AC + "10", overflow: "hidden" }}>

        {/* AVATAR */}
        <Sec id="avatar" icon="🎭" label="AVATAR" sub={dp.emoji.indexOf("svg_") === 0 ? "Avatar exclusif" : "Emoji"}>
          <SL>EMOJIS</SL>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {AVATARS.map(function(em) {
              return (
                <GridItem key={em} active={dp.emoji === em} onClick={function() { su("emoji", em, false); }}>
                  <span style={{ fontSize: 17 }}>{em}</span>
                </GridItem>
              );
            })}
          </div>
          <SL mt={true}>EXCLUSIFS</SL>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {EX_AVATARS.map(function(ea) {
              var unlocked = allIds.indexOf(ea.req) !== -1;
              var isPrev = previewOn && !unlocked;
              return (
                <GridItem key={ea.id} w={54} h={54} active={dp.emoji === ea.id} locked={!unlocked} preview={isPrev}
                  onClick={function() { su("emoji", ea.id, !unlocked); }}>
                  <div style={{ width: 30, height: 30 }}><PlayerAvatar player={Object.assign({}, dp, { emoji: ea.id, ornament: "none" })} size={30} rankInfo={null} /></div>
                  <span style={{ fontSize: 6, fontWeight: 700, color: dp.emoji === ea.id ? AC : TD, fontFamily: FD }}>{ea.name}</span>
                </GridItem>
              );
            })}
          </div>
        </Sec>

        <div style={{ height: 1, background: BD }} />

        {/* APPARENCE */}
        <Sec id="look" icon="🎨" label="APPARENCE" sub={curCSName}>
          <SL>COULEUR</SL>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {PCOLORS.map(function(co) {
              var active = dp.color === co;
              return (
                <GridItem key={co} w={34} h={34} active={active} onClick={function() { su("color", co, false); }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: co, boxShadow: active ? "0 0 8px " + co : "none" }} />
                </GridItem>
              );
            })}
          </div>
          <SL mt={true}>STYLE DU NOM</SL>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {CSTYLES.map(function(cs) {
              var avail = availCS.indexOf(cs) !== -1;
              var active = dp.cstyle === cs.id;
              var isPrev = previewOn && !avail;
              var styleGrad = buildNameGrad(dp.color, cs.effect);
              return (
                <ListItem key={cs.id} active={active} locked={!avail} preview={isPrev} onClick={function() { su("cstyle", cs.id, !avail); }}>
                  <div style={{ width: 32, height: 10, borderRadius: 3, background: styleGrad || dp.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, color: TP }}>{cs.name}</span>
                </ListItem>
              );
            })}
          </div>
        </Sec>

        <div style={{ height: 1, background: BD }} />

        {/* ORNEMENT */}
        <Sec id="orn" icon="💠" label="ORNEMENT" sub={curOrnName}>
          <SL>RANG</SL>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {ORNAMENTS.filter(function(o) { return o.style !== "special"; }).map(function(o) {
              var avail = availOrn.indexOf(o) !== -1;
              var active = dp.ornament === o.id;
              var isPrev = previewOn && !avail;
              return (
                <ListItem key={o.id} active={active} locked={!avail} preview={isPrev} onClick={function() { su("ornament", o.id, !avail); }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid " + (o.color || BD), background: (o.color || "transparent") + "15", flexShrink: 0 }} />
                  <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, color: TP }}>{o.name}</span>
                </ListItem>
              );
            })}
          </div>
          <SL mt={true}>SPECIAUX</SL>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {ORNAMENTS.filter(function(o) { return o.style === "special"; }).map(function(o) {
              var avail = availOrn.indexOf(o) !== -1;
              var active = dp.ornament === o.id;
              var isPrev = previewOn && !avail;
              return (
                <ListItem key={o.id} active={active} locked={!avail} preview={isPrev} onClick={function() { su("ornament", o.id, !avail); }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, border: "2px solid " + (o.color || BD), background: (o.color || "transparent") + "15", boxShadow: "0 0 6px " + (o.color || BD) + "30", flexShrink: 0 }} />
                  <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, color: TP }}>{o.name}</span>
                </ListItem>
              );
            })}
          </div>
        </Sec>

        <div style={{ height: 1, background: BD }} />

        {/* TITRE */}
        <Sec id="title" icon="🏆" label="TITRE" sub={curTitle}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {availT.map(function(t) {
              var active = dp.title === t.id;
              return (
                <ListItem key={t.id || "none"} active={active} onClick={function() { su("title", t.id, false); }}>
                  <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, color: TP }}>{t.name}</span>
                </ListItem>
              );
            })}
          </div>
          {TITLES.filter(function(t) { return t.req && availT.indexOf(t) === -1; }).length > 0 && (
            <div style={{ fontSize: 8, color: TD, marginTop: 8, fontStyle: "italic", textAlign: "center" }}>🔒 {TITLES.filter(function(t) { return t.req && availT.indexOf(t) === -1; }).length} titres a debloquer</div>
          )}
        </Sec>
      </div>
    </div>
  );
}

/* ═══ MAIN APP ═══ */
export default function App() {
  var ms = useState([]); var matches = ms[0]; var setMatches = ms[1];
  var am = useState([]); var allMatches = am[0]; var setAllMatches = am[1];
  var ps = useState([]); var players = ps[0]; var setPlayers = ps[1];
  var ss = useState([]); var seasons = ss[0]; var setSeasons = ss[1];
  var as2 = useState(null); var activeSeason = as2[0]; var setActiveSeason = as2[1];
  var li = useState(null); var loggedIn = li[0]; var setLoggedIn = li[1];
  var tb = useState("home"); var tab = tb[0]; var setTab = tb[1];
  var sp = useState(false); var spoil = sp[0]; var setSpoil = sp[1];
  var ld = useState(true); var loading = ld[0]; var setLoading = ld[1];
  var pv = useState(false); var previewMode = pv[0]; var setPreviewMode = pv[1];
  var isAdmin = loggedIn === "__admin";
  var currentUser = isAdmin ? "Ulysse" : loggedIn;

  /* Load data from Supabase on mount */
  useEffect(function() {
    loadData();
    /* Subscribe to realtime changes */
    var channel = supabase.channel("realtime-all")
      .on("postgres_changes", { event: "*", schema: "public", table: "matches" }, function() { loadData(); })
      .on("postgres_changes", { event: "*", schema: "public", table: "preds" }, function() { loadData(); })
      .on("postgres_changes", { event: "*", schema: "public", table: "players" }, function() { loadData(); })
      .on("postgres_changes", { event: "*", schema: "public", table: "seasons" }, function() { loadData(); })
      .subscribe();
    return function() { supabase.removeChannel(channel); };
  }, []);

  function loadData() {
    Promise.all([
      supabase.from("players").select("*").order("id"),
      supabase.from("matches").select("*").order("id"),
      supabase.from("preds").select("*"),
      supabase.from("seasons").select("*").order("id"),
    ]).then(function(results) {
      var pData = results[0].data || [];
      var mData = results[1].data || [];
      var prData = results[2].data || [];
      var sData = results[3].data || [];

      /* Build players array */
      var builtPlayers = pData.map(function(p) {
        return {
          name: p.name, color: p.color || "#e8364f", emoji: p.emoji || "🦁",
          pin: p.pin || "1111", title: p.title || null,
          ornament: p.ornament || "none", cstyle: p.cstyle || "solid",
        };
      });

      setPlayers(builtPlayers);

      /* Build matches with preds nested */
      var builtMatches = mData.map(function(m) {
        var preds = {};
        prData.forEach(function(pr) {
          if (pr.match_id === m.id) {
            preds[pr.player_name] = { winner: pr.winner, score: pr.score };
          }
        });
        return {
          id: m.id, week: m.week, day: m.day, team1: m.team1, team2: m.team2,
          bo: m.bo, cote1: m.cote1, cote2: m.cote2,
          winner: m.winner, score: m.score, preds: preds,
          season_id: m.season_id, start_time: m.start_time,
        };
      });

      /* Store all matches for global XP calculation */
      setAllMatches(builtMatches);

      /* Build seasons list */
      var builtSeasons = sData.length > 0 ? sData : [{ id: 1, name: "LEC Spring 2026", short_name: "LEC Spring", status: "active" }];
      setSeasons(builtSeasons);

      /* Set active season to first active or first one if not set yet */
      setActiveSeason(function(prev) {
        if (prev !== null) return prev;
        var act = builtSeasons.find(function(s) { return s.status === "active"; });
        return act ? act.id : builtSeasons[0].id;
      });

      /* Filter matches for active season */
      setMatches(builtMatches);
      setLoading(false);
    });
  }

  /* Get matches filtered by active season */
  var seasonMatches = matches.filter(function(m) {
    if (!activeSeason) return true;
    return m.season_id === activeSeason || (!m.season_id && activeSeason === 1);
  });

  /* Calculate reveal status for each match */
  /* A week's results are revealed when the first match of the NEXT week has started */
  var now = new Date();
  seasonMatches = seasonMatches.map(function(m) {
    if (!m.winner) {
      /* Match not played yet - check if prono is still open (match hasn't started) */
      var matchStart = m.start_time ? new Date(m.start_time) : null;
      var locked = matchStart ? now >= matchStart : false;
      return Object.assign({}, m, { revealed: false, locked: locked });
    }
    /* Match has a result - check if next week's first match has started */
    var nextWeek = m.week + 1;
    var nextWeekMatches = seasonMatches.filter(function(nm) { return nm.week === nextWeek && nm.start_time; });
    if (nextWeekMatches.length === 0) {
      /* No next week exists yet - reveal results immediately (last week of season) */
      /* Or if no start_time data, fall back to revealed */
      return Object.assign({}, m, { revealed: true, locked: true });
    }
    /* Find the earliest start_time of the next week */
    var earliest = nextWeekMatches.reduce(function(min, nm) {
      var t = new Date(nm.start_time);
      return t < min ? t : min;
    }, new Date(nextWeekMatches[0].start_time));
    var isRevealed = now >= earliest;
    return Object.assign({}, m, { revealed: isRevealed, locked: true });
  });

  /* Get current season info */
  var curSeason = seasons.find(function(s) { return s.id === activeSeason; }) || { name: "LEC Spring 2026", short_name: "LEC Spring" };

  function handleUpdate(mid, player, field, value) {
    if (player === "__result") {
      /* Admin updating match result */
      var updateObj = {};
      updateObj[field] = value;
      supabase.from("matches").update(updateObj).eq("id", mid).then(function() { loadData(); });
    } else {
      /* Player updating their prediction */
      /* First check if pred exists */
      supabase.from("preds").select("*").eq("match_id", mid).eq("player_name", player).then(function(res) {
        var existing = res.data && res.data.length > 0;
        if (existing) {
          var upd = {};
          upd[field] = value;
          supabase.from("preds").update(upd).eq("match_id", mid).eq("player_name", player).then(function() { loadData(); });
        } else {
          var ins = { match_id: mid, player_name: player, winner: null, score: null };
          ins[field] = value;
          supabase.from("preds").insert(ins).then(function() { loadData(); });
        }
      });
    }
    /* Optimistic local update */
    setMatches(function(prev) { return prev.map(function(m) {
      if (m.id !== mid) return m;
      if (player === "__result") { var c = Object.assign({}, m); c[field] = value; return c; }
      var np = Object.assign({}, m.preds);
      np[player] = Object.assign({}, np[player] || {});
      np[player][field] = value;
      return Object.assign({}, m, { preds: np });
    }); });
  }

  function handleUpdatePlayer(i, p) {
    /* Save to Supabase (only persisted fields) */
    supabase.from("players").update({
      color: p.color, emoji: p.emoji, title: p.title,
      ornament: p.ornament, cstyle: p.cstyle,
    }).eq("name", p.name).then(function() {});
    /* Optimistic local update */
    setPlayers(function(prev) { var n = prev.slice(); n[i] = p; return n; });
  }

  function handleTogglePreview() {
    setPreviewMode(function(v) { return !v; });
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: FB, color: TP }}>
        <style>{CSS_ANIM}</style>
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <h1 style={{ fontFamily: FD, fontSize: 28, fontWeight: 800, color: N1, letterSpacing: 3, marginBottom: 12 }}>LEC PRONOS</h1>
        <div style={{ fontSize: 12, color: TD }}>Chargement...</div>
      </div>
    );
  }

  if (!loggedIn) return <LoginScreen players={players} onLogin={setLoggedIn} />;

  var navItems = [
    { id: "home", label: "Accueil", icon: "🏠" },
    { id: "matches", label: "Matchs", icon: "⚔️" },
    { id: "stats", label: "Stats", icon: "📊" },
    { id: "profile", label: "Profil", icon: "👤" },
  ];

  return (
    <div style={{ background: BG, color: TP, fontFamily: FB, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <style>{CSS_ANIM}</style>
      <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ position: "fixed", top: -300, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, " + N1 + "04, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -300, left: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, " + N2 + "04, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ padding: "14px 16px 0", maxWidth: 660, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ cursor: "pointer" }} onClick={function() { setTab("home"); }}>
            <h1 style={{ fontFamily: FD, fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: 3, color: N1, textShadow: "0 0 20px " + N1 + "30" }}>LEC PRONOS</h1>
          </div>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <button onClick={function() { setSpoil(!spoil); }} style={{ background: spoil ? N3 + "18" : S2, border: "1px solid " + (spoil ? N3 + "40" : BD), borderRadius: 8, padding: "5px 8px", fontSize: 10, fontWeight: 600, color: spoil ? N3 : TD, cursor: "pointer" }}>{spoil ? "🔒" : "👁️"}</button>
            {isAdmin && <span style={{ fontSize: 9, padding: "3px 6px", borderRadius: 4, background: N1, color: BG, fontWeight: 700 }}>ADMIN</span>}
            <button onClick={function() { setLoggedIn(null); }} style={{ background: S2, border: "1px solid " + BD, borderRadius: 8, padding: "5px 8px", fontSize: 9, fontWeight: 600, color: TD, cursor: "pointer" }}>Quitter</button>
          </div>
        </div>
        {/* Season selector */}
        {seasons.length > 1 && (
          <div style={{ margin: "8px 0 0" }}>
            <select value={activeSeason || ""} onChange={function(e) { setActiveSeason(Number(e.target.value)); }}
              style={{ background: S1, color: N1, border: "1px solid " + N1 + "30", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, fontFamily: FD, letterSpacing: 1, width: "100%", outline: "none", cursor: "pointer", appearance: "none", WebkitAppearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300f0ff' d='M2 4l4 4 4-4'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
              {seasons.map(function(s) {
                var label = s.short_name || s.name;
                if (s.status === "active") label = "🟢 " + label;
                else if (s.status === "upcoming") label = "🔜 " + label;
                else if (s.status === "finished") label = "✅ " + label;
                return <option key={s.id} value={s.id}>{label}</option>;
              })}
            </select>
          </div>
        )}
        {spoil && (
          <div style={{ margin: "8px 0 0", padding: "5px 12px", borderRadius: 8, background: N3 + "10", border: "1px solid " + N3 + "25", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, color: N3, fontWeight: 600 }}>🔒 Anti-spoil actif</span>
            <button onClick={function() { setSpoil(false); }} style={{ background: N3, color: "#fff", border: "none", borderRadius: 5, padding: "2px 8px", fontSize: 9, fontWeight: 600, cursor: "pointer" }}>Off</button>
          </div>
        )}
        <div style={{ display: "flex", gap: 0, marginTop: 10, borderBottom: "1px solid " + BD }}>
          {navItems.map(function(n) {
            return <button key={n.id} onClick={function() { setTab(n.id); }} style={{ background: "transparent", border: "none", borderBottom: tab === n.id ? "2px solid " + N1 : "2px solid transparent", color: tab === n.id ? N1 : TD, padding: "8px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: FD, letterSpacing: 1 }}>{n.icon} {n.label}</button>;
          })}
        </div>
      </div>

      <div style={{ padding: "14px 16px 70px", maxWidth: 660, margin: "0 auto" }}>
        {tab === "home" && <Dashboard matches={seasonMatches} players={players} currentUser={currentUser} onNav={setTab} spoil={spoil} seasonName={curSeason.short_name || curSeason.name} />}
        {tab === "matches" && <MatchesPage matches={seasonMatches} players={players} onUpdate={handleUpdate} currentUser={currentUser} isAdmin={isAdmin} spoil={spoil} />}
        {tab === "stats" && <StatsPage matches={seasonMatches} players={players} spoil={spoil} />}
        {tab === "profile" && <ProfilePage matches={allMatches} players={players} currentUser={currentUser} onUpdatePlayer={handleUpdatePlayer} onTogglePreview={handleTogglePreview} previewMode={previewMode} />}
      </div>
    </div>
  );
}
