import { useState } from "react";

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
  "G2 Esports": { s: "G2", c: "#aaa", logo: "https://am-a.akamaihd.net/image?resize=400:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FG2-FullonDark.png" },
  "SK Gaming": { s: "SK", c: "#0088cc", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdKjXicEX8L3YkfFpXZuIiAdNMpDjxwU22Mw&s" },
  "Heretics": { s: "TH", c: "#ff4655", logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/6/69/Team_Heretics.png/960px-Team_Heretics.png" },
  "NaVi": { s: "NAVI", c: "#ffd700", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRpbImGrO5A3aACm3w56cembiByHoklvHzhQ&s" },
  "GIANTX": { s: "GX", c: "#00c8ff", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/GiantX_logo.svg/330px-GiantX_logo.svg.png" },
  "Fnatic": { s: "FNC", c: "#ff5900", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Esports_organization_Fnatic_logo.svg/300px-Esports_organization_Fnatic_logo.svg.png" },
  "Shifters": { s: "SHFT", c: "#6c5ce7", logo: "https://am-a.akamaihd.net/image?resize=400:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1765897071435_600px-Shifters_allmode.png" },
  "Vitality": { s: "VIT", c: "#fee800", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Team_Vitality_%28esports%29_logo.svg/250px-Team_Vitality_%28esports%29_logo.svg.png" },
  "KCorp": { s: "KC", c: "#4a90d9", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Karmine_Corp_logo.svg/250px-Karmine_Corp_logo.svg.png" },
  "KOI": { s: "KOI", c: "#00a6ff", logo: "https://am-a.akamaihd.net/image?resize=400:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1734012609283_MKOI_FullColor_Blue.png" },
  "Los Ratones": { s: "LR", c: "#c87533", logo: "https://upload.wikimedia.org/wikipedia/en/4/41/Los_Ratones_logo.png" },
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
  { id: "solid", name: "Classique", req: null },
  { id: "neon", name: "Neon", req: "rank_gold1", grad: "linear-gradient(90deg, #00f0ff, #a855f7)" },
  { id: "fire", name: "Flamme", req: "rank_plat1", grad: "linear-gradient(90deg, #f97316, #ef4444, #dc2626)" },
  { id: "gold", name: "Or", req: "rank_master1", grad: "linear-gradient(90deg, #fbbf24, #f59e0b, #eab308)" },
  { id: "rainbow", name: "Arc-en-ciel", req: "upsets_25", grad: "linear-gradient(90deg, #f43f5e, #f97316, #eab308, #10b981, #3b82f6, #a855f7)" },
  { id: "void", name: "Void", req: "rank_chall1", grad: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #a855f7, #6366f1)" },
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
  {id:15,week:3,day:"SAM 11/04",team1:"Heretics",team2:"NaVi",bo:3,cote1:2.8,cote2:1.4,winner:null,score:null,preds:{Ulysse:{winner:"NaVi",score:"1-2"},"César":{winner:null,score:null},Emilien:{winner:"NaVi",score:"0-2"},Arthur:{winner:null,score:null}}},
  {id:16,week:3,day:"SAM 11/04",team1:"G2 Esports",team2:"Vitality",bo:3,cote1:1.3,cote2:3.5,winner:null,score:null,preds:{Ulysse:{winner:"G2 Esports",score:"2-1"},"César":{winner:null,score:null},Emilien:{winner:"G2 Esports",score:"2-1"},Arthur:{winner:null,score:null}}},
  {id:17,week:3,day:"SAM 11/04",team1:"KOI",team2:"SK Gaming",bo:3,cote1:1.2,cote2:4.5,winner:null,score:null,preds:{Ulysse:{winner:"KOI",score:"2-0"},"César":{winner:null,score:null},Emilien:{winner:"KOI",score:"2-1"},Arthur:{winner:null,score:null}}},
  {id:18,week:3,day:"DIM 12/04",team1:"Vitality",team2:"Shifters",bo:3,cote1:1.2,cote2:4.5,winner:null,score:null,preds:{Ulysse:{winner:"Vitality",score:"2-0"},"César":{winner:null,score:null},Emilien:{winner:"Vitality",score:"2-1"},Arthur:{winner:null,score:null}}},
  {id:19,week:3,day:"DIM 12/04",team1:"Heretics",team2:"KCorp",bo:3,cote1:4.7,cote2:1.2,winner:null,score:null,preds:{Ulysse:{winner:"KCorp",score:"0-2"},"César":{winner:null,score:null},Emilien:{winner:"KCorp",score:"0-2"},Arthur:{winner:null,score:null}}},
  {id:20,week:3,day:"LUN 13/04",team1:"Fnatic",team2:"SK Gaming",bo:3,cote1:1.3,cote2:3.4,winner:null,score:null,preds:{}},
  {id:21,week:3,day:"LUN 13/04",team1:"GIANTX",team2:"Shifters",bo:3,cote1:1.1,cote2:6,winner:null,score:null,preds:{}},
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
  var rankColor = ri ? ri.rank.color : player.color;
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

/* Player name with color style */
function PlayerName(props) {
  var player = props.player;
  var sz = props.size || 13;
  var cs = CSTYLES.find(function(c) { return c.id === player.cstyle; }) || CSTYLES[0];
  if (!cs.grad) {
    return <span style={{ fontFamily: FD, fontWeight: 700, fontSize: sz, color: player.color }}>{player.name}</span>;
  }
  return (
    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: sz, background: cs.grad, backgroundSize: "200% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
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
              <div style={{ fontSize: 32 }}>{pl.emoji}</div>
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
  var played = !!m.winner;
  var scores = m.bo === 5 ? SC5 : SC3;
  var myPred = m.preds[user] || {};

  return (
    <div style={{ background: S1, borderRadius: 14, overflow: "hidden", border: played ? "1px solid " + BD : "1px solid " + N1 + "30", boxShadow: !played ? "0 0 15px " + N1 + "08" : "none" }}>
      {!played && (
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
      {played && <div style={{ padding: "3px 14px", background: S2 }}><span style={{ fontSize: 9, color: TD, letterSpacing: 1 }}>{spoil ? m.day : "TERMINE - " + m.day}</span></div>}
      <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={function() { setEx(!expanded); }}>
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
          {!played && <div style={{ fontSize: 13, fontWeight: 800, color: N1, marginTop: 2 }}>VS</div>}
        </div>
        <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, flex: 1, color: !spoil && played && m.winner === m.team2 ? NG : TP }}>{m.team2}</span>
        <TeamLogo team={m.team2} size={32} />
        <span style={{ fontSize: 10, color: TD, transform: expanded ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▼</span>
      </div>
      {!played && !expanded && (
        <div style={{ padding: "0 14px 10px" }}>
          {myPred.winner ? (
            <div style={{ padding: "6px 10px", borderRadius: 8, background: NG + "10", border: "1px solid " + NG + "25", fontSize: 11, color: NG, fontWeight: 600 }}>Ton prono : {myPred.winner} - {myPred.score}</div>
          ) : (
            <div style={{ padding: "6px 10px", borderRadius: 8, background: N2 + "10", border: "1px solid " + N2 + "25", fontSize: 11, color: N2, fontWeight: 600 }}>Clique pour pronostiquer</div>
          )}
        </div>
      )}
      {played && !spoil && (
        <div style={{ padding: "0 14px 10px", display: "flex", gap: 4 }}>
          {players.map(function(p) {
            var pr = m.preds[p.name] || {};
            var pt = calcPts(m, pr); var ok = pt > 0; var pf = pr.score === m.score && ok;
            return (
              <div key={p.name} style={{ flex: 1, borderRadius: 10, padding: "6px 2px", textAlign: "center", background: pf ? "#FFD70008" : ok ? NG + "08" : N3 + "06", border: "1px solid " + (pf ? "#FFD70025" : ok ? NG + "18" : N3 + "15") }}>
                <div style={{ fontSize: 12, marginBottom: 1 }}>{p.emoji}</div>
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
  var matches = props.matches; var players = props.players; var user = props.currentUser; var onNav = props.onNav; var spoil = props.spoil;
  var stats = players.map(function(p) { var s = getStats(matches, p.name); var xp = getTotalXP(s); var r = getRank(xp); return Object.assign({}, p, s, { xp: xp, ri: r }); }).sort(function(a, b) { return b.total - a.total; });
  var me = stats.find(function(s) { return s.name === user; });
  var myRank = stats.findIndex(function(s) { return s.name === user; }) + 1;
  var myPending = matches.filter(function(m) { return !m.winner && (!m.preds[user] || !m.preds[user].winner); });
  var upcoming = matches.filter(function(m) { return !m.winner; }).slice(0, 3);

  var feed = [];
  matches.forEach(function(m) { if (!m.winner) return; players.forEach(function(p) { var pr = m.preds[p.name]; if (!pr || !pr.winner) return; var pt = calcPts(m, pr); if (pt > 0) { feed.push({ p: p, txt: (pr.score === m.score ? "Parfait +" : "+") + rd(pt) + " pts", mt: m.team1 + " vs " + m.team2, pf: pr.score === m.score }); } }); });
  feed.reverse(); feed = feed.slice(0, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <NeonCard glow={me ? me.color : N1}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {me && <PlayerAvatar player={me} size={52} rankInfo={me.ri} />}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {me ? <PlayerName player={me} size={16} /> : <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: TP }}>{user}</span>}
              <span style={{ fontSize: 11, color: TD }}>Salut !</span>
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
              <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: TP }}>{me.total}<span style={{ fontSize: 10, color: TD }}> pts</span></div>
              <div style={{ fontSize: 10, color: TD }}>{myRank}{myRank === 1 ? "er" : "e"}</div>
            </div>
          )}
        </div>
      </NeonCard>

      {myPending.length > 0 && (
        <button onClick={function() { onNav("matches"); }} style={{ background: N2 + "10", border: "1px solid " + N2 + "30", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", width: "100%", textAlign: "left" }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, color: N2 }}>{myPending.length} prono(s) manquant(s)</div></div>
          <span style={{ fontSize: 12, color: N2, fontFamily: FD }}>Parier →</span>
        </button>
      )}

      {!spoil && (
        <div style={{ display: "flex", gap: 8 }}>
          {[{ l: "TOP SCORE", k: "total", u: " pts", c: N1 }, { l: "MEILLEUR WR", k: "wr", u: "%", c: N2 }, { l: "PARFAITS", k: "perfects", u: " ★", c: "#FFD700" }].map(function(aw) {
            var best = stats.slice().sort(function(a, b) { return b[aw.k] - a[aw.k]; })[0];
            return (
              <div key={aw.l} style={{ flex: 1, background: S1, border: "1px solid " + BD, borderRadius: 12, padding: "10px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: TD, letterSpacing: 2, marginBottom: 4 }}>{aw.l}</div>
                <div style={{ fontSize: 18 }}>{best.emoji}</div>
                <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, color: best.color }}>{best.name}</div>
                <div style={{ fontSize: 10, color: aw.c, fontWeight: 700 }}>{best[aw.k]}{aw.u}</div>
              </div>
            );
          })}
        </div>
      )}

      {!spoil && (
        <NeonCard glow={N1}>
          <div style={{ fontSize: 10, fontWeight: 700, color: N1, letterSpacing: 3, marginBottom: 10 }}>CLASSEMENT</div>
          {stats.map(function(s, i) {
            return (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: i < stats.length - 1 ? "1px solid " + BD : "none" }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, width: 20, textAlign: "center", color: i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : i === 2 ? "#CD7F32" : TD }}>{i + 1}</span>
                <PlayerAvatar player={s} size={32} rankInfo={s.ri} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <PlayerName player={s} size={12} />
                    <RankBadge rank={s.ri.rank} />
                  </div>
                  {s.title && <TitleTag titleId={s.title} />}
                  <div style={{ fontSize: 9, color: TD }}>WR {s.wr}% - {s.perfects} parfait(s)</div>
                </div>
                <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: TP }}>{s.total}</span>
              </div>
            );
          })}
        </NeonCard>
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
                <div style={{ background: done ? NG + "18" : N2 + "18", color: done ? NG : N2, fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 6 }}>{done ? "OK" : "..."}</div>
              </div>
            );
          })}
        </div>
      )}

      {!spoil && feed.length > 0 && (
        <NeonCard glow={N2}>
          <div style={{ fontSize: 10, fontWeight: 700, color: N2, letterSpacing: 3, marginBottom: 10 }}>ACTIVITE RECENTE</div>
          {feed.map(function(f, i) {
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: i < feed.length - 1 ? "1px solid " + BD : "none" }}>
                <span style={{ fontSize: 14 }}>{f.p.emoji}</span>
                <div style={{ flex: 1, fontSize: 10 }}><span style={{ fontWeight: 600, color: f.p.color }}>{f.p.name} </span><span style={{ color: TD }}>{f.txt} - {f.mt}</span></div>
                {f.pf && <span style={{ color: "#FFD700" }}>★</span>}
              </div>
            );
          })}
        </NeonCard>
      )}
    </div>
  );
}

/* ═══ MATCHES PAGE ═══ */
function MatchesPage(props) {
  var matches = props.matches; var players = props.players; var onUpdate = props.onUpdate; var user = props.currentUser; var isAdmin = props.isAdmin; var spoil = props.spoil;
  var wf = useState("all"); var weekFilter = wf[0]; var setWf = wf[1];
  var weeks = []; matches.forEach(function(m) { if (weeks.indexOf(m.week) === -1) weeks.push(m.week); }); weeks.sort();
  var fil = weekFilter === "all" ? matches : matches.filter(function(m) { return m.week === Number(weekFilter); });
  var up = fil.filter(function(m) { return !m.winner; });
  var done = fil.filter(function(m) { return !!m.winner; });

  return (
    <div>
      <div style={{ display: "flex", gap: 5, marginBottom: 16, flexWrap: "wrap" }}>
        <button onClick={function() { setWf("all"); }} style={{ border: "1px solid " + BD, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: FD, background: weekFilter === "all" ? N1 : S2, color: weekFilter === "all" ? BG : TD }}>Toutes</button>
        {weeks.map(function(w) { return <button key={w} onClick={function() { setWf(w); }} style={{ border: "1px solid " + BD, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: FD, background: weekFilter === w ? N1 : S2, color: weekFilter === w ? BG : TD }}>W{w}</button>; })}
      </div>
      {up.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ padding: "8px 14px", borderRadius: 10, background: "linear-gradient(90deg, " + N1 + "10, transparent)", borderLeft: "3px solid " + N1, marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: N1, letterSpacing: 2, fontFamily: FD }}>A VENIR ({up.length})</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{up.map(function(m) { return <MatchCard key={m.id} match={m} players={players} onUpdate={onUpdate} currentUser={user} isAdmin={isAdmin} spoil={false} />; })}</div>
        </div>
      )}
      {up.length > 0 && done.length > 0 && <div style={{ height: 1, background: "linear-gradient(90deg, transparent, " + BD + ", transparent)", margin: "0 0 20px" }} />}
      {done.length > 0 && (
        <div>
          <div style={{ padding: "8px 14px", borderRadius: 10, background: S2, borderLeft: "3px solid " + TD, marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: TD, letterSpacing: 2, fontFamily: FD }}>TERMINES ({done.length})</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{done.map(function(m) { return <MatchCard key={m.id} match={m} players={players} onUpdate={onUpdate} currentUser={user} isAdmin={isAdmin} spoil={spoil} />; })}</div>
        </div>
      )}
    </div>
  );
}

/* ═══ STATS PAGE ═══ */
function StatsPage(props) {
  var matches = props.matches; var players = props.players; var spoil = props.spoil;
  if (spoil) return <div style={{ textAlign: "center", padding: "60px 20px" }}><div style={{ fontSize: 48 }}>🔒</div><div style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: N1, marginTop: 8 }}>Anti-spoil actif</div></div>;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {players.map(function(p) {
        var s = getStats(matches, p.name); var xp = getTotalXP(s); var r = getRank(xp); var ul = getUnlocked(s);
        return (
          <NeonCard key={p.name} glow={p.color} pad="12px">
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{p.emoji}</span>
              <div><div style={{ fontFamily: FD, fontWeight: 700, color: p.color, fontSize: 13 }}>{p.name}</div><RankBadge rank={r.rank} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 10 }}>
              <div><span style={{ color: TD }}>Winrate</span><br /><span style={{ fontWeight: 700 }}>{s.wr}%</span></div>
              <div><span style={{ color: TD }}>Moy</span><br /><span style={{ fontWeight: 700 }}>{s.played > 0 ? (s.total / s.played).toFixed(1) : "0"}</span></div>
              <div><span style={{ color: TD }}>Parfaits</span><br /><span style={{ fontWeight: 700, color: "#FFD700" }}>{s.perfects}</span></div>
              <div><span style={{ color: TD }}>Total</span><br /><span style={{ fontWeight: 700, color: NG }}>{s.total}</span></div>
            </div>
            <div style={{ fontSize: 9, color: TD, marginTop: 4 }}>{ul.length}/{ACHS.length} succes - {xp} XP</div>
          </NeonCard>
        );
      })}
    </div>
  );
}

/* ═══ PROFILE PAGE ═══ */
function ProfilePage(props) {
  var matches = props.matches; var players = props.players; var user = props.currentUser; var onUp = props.onUpdatePlayer;
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
  var availAv = getAvailAvatars(allIds, me.previewMode);
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
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <NeonCard glow={N2}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: N2, letterSpacing: 2 }}>AVATAR</div>
            </div>
            {/* Avatar preview */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <PlayerAvatar player={me} size={60} rankInfo={r} />
            </div>
            <div style={{ fontSize: 9, color: TD, marginBottom: 6 }}>EMOJIS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
              {AVATARS.map(function(em) {
                return (
                  <button key={em} onClick={function() { onUp(pi, Object.assign({}, me, { emoji: em })); }}
                    style={{ width: 36, height: 36, borderRadius: 8, border: me.emoji === em ? "2px solid " + N1 : "1px solid " + BD, background: me.emoji === em ? N1 + "15" : S2, fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {em}
                  </button>
                );
              })}
            </div>
            <div style={{ fontSize: 9, color: N2, marginBottom: 6, fontWeight: 600 }}>EXCLUSIFS SVG</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {EX_AVATARS.map(function(ea) {
                var isAvail = allIds.indexOf(ea.req) !== -1 || me.previewMode;
                var isActive = me.emoji === ea.id;
                var isPrev = me.previewMode && allIds.indexOf(ea.req) === -1;
                return (
                  <button key={ea.id} disabled={!isAvail}
                    onClick={function() { if (isAvail) onUp(pi, Object.assign({}, me, { emoji: ea.id })); }}
                    style={{ width: 50, padding: "4px 2px", borderRadius: 8, border: isActive ? "2px solid " + ea.color : isPrev ? "1px dashed " + ea.color + "60" : isAvail ? "1px solid " + ea.color + "40" : "1px solid " + BD, background: isActive ? ea.color + "15" : isPrev ? ea.color + "06" : isAvail ? S2 : S2, cursor: isAvail ? "pointer" : "not-allowed", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, opacity: isAvail ? 1 : 0.35 }}>
                    <div style={{ width: 30, height: 30 }}>
                      <PlayerAvatar player={Object.assign({}, me, { emoji: ea.id, ornament: "none" })} size={30} rankInfo={null} />
                    </div>
                    <span style={{ fontSize: 7, fontWeight: 600, color: ea.color, fontFamily: FD }}>{ea.name}</span>
                  </button>
                );
              })}
            </div>
            {!me.previewMode && EX_AVATARS.filter(function(ea) { return allIds.indexOf(ea.req) === -1; }).length > 0 && (
              <div style={{ fontSize: 9, color: TD, marginTop: 8, fontStyle: "italic" }}>🔒 {EX_AVATARS.filter(function(ea) { return allIds.indexOf(ea.req) === -1; }).length} avatars exclusifs a debloquer</div>
            )}
          </NeonCard>

          <NeonCard glow={N1}>
            <div style={{ fontSize: 10, fontWeight: 700, color: N1, letterSpacing: 2, marginBottom: 10 }}>COULEUR DE BASE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
              {PCOLORS.map(function(co) {
                return <button key={co} onClick={function() { onUp(pi, Object.assign({}, me, { color: co })); }}
                  style={{ width: 30, height: 30, borderRadius: "50%", border: me.color === co ? "3px solid #fff" : "2px solid transparent", background: co, cursor: "pointer" }} />;
              })}
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: N1, letterSpacing: 2, marginBottom: 10 }}>STYLE DU NOM</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {CSTYLES.map(function(cs) {
                var avail = availCS.indexOf(cs) !== -1;
                var active = me.cstyle === cs.id;
                return (
                  <button key={cs.id} disabled={!avail}
                    onClick={function() { if (avail) onUp(pi, Object.assign({}, me, { cstyle: cs.id })); }}
                    style={{ padding: "8px 12px", borderRadius: 8, border: active ? "2px solid " + N1 : "1px solid " + BD, background: active ? N1 + "10" : S2, cursor: avail ? "pointer" : "not-allowed", textAlign: "left", display: "flex", alignItems: "center", gap: 10, opacity: avail ? 1 : 0.4 }}>
                    <div style={{ width: 40, height: 18, borderRadius: 4, background: cs.grad || me.color }} />
                    <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, color: active ? N1 : TP }}>{cs.name}</span>
                    {!avail && <span style={{ marginLeft: "auto", fontSize: 9, color: TD }}>🔒</span>}
                    {active && <span style={{ marginLeft: "auto", fontSize: 9, color: N1 }}>actif</span>}
                  </button>
                );
              })}
            </div>
          </NeonCard>

          <NeonCard glow={"#cd7f32"}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#cd7f32", letterSpacing: 2 }}>ORNEMENT (CADRE AVATAR)</div>
              <button onClick={function() { onUp(pi, Object.assign({}, me, { previewMode: !me.previewMode })); }}
                style={{ padding: "3px 8px", borderRadius: 6, border: "1px solid " + (me.previewMode ? N2 : BD), background: me.previewMode ? N2 + "20" : S2, fontSize: 9, fontWeight: 600, color: me.previewMode ? N2 : TD, cursor: "pointer", fontFamily: FD }}>
                {me.previewMode ? "Mode normal" : "Preview tout"}
              </button>
            </div>
            {/* Avatar preview */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <PlayerAvatar player={me} size={70} rankInfo={r} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {ORNAMENTS.map(function(o) {
                var avail = availOrn.indexOf(o) !== -1;
                var canUse = avail || me.previewMode;
                var active = me.ornament === o.id;
                var isPreview = !avail && me.previewMode;
                return (
                  <button key={o.id} disabled={!canUse}
                    onClick={function() { if (canUse) onUp(pi, Object.assign({}, me, { ornament: o.id })); }}
                    style={{ padding: "8px 12px", borderRadius: 8, border: active ? "2px solid " + (o.color || N1) : isPreview ? "1px dashed " + (o.color || BD) : "1px solid " + BD, background: active ? (o.color || N1) + "10" : isPreview ? (o.color || N1) + "06" : S2, cursor: canUse ? "pointer" : "not-allowed", textAlign: "left", display: "flex", alignItems: "center", gap: 10, opacity: canUse ? 1 : 0.4 }}>
                    {o.color && <div style={{ width: 22, height: 22, borderRadius: o.style === "special" ? 4 : "50%", border: "2px solid " + o.color, background: o.color + "15", boxShadow: (o.style === "glow" || o.style === "special") ? "0 0 8px " + o.color + "50" : "none" }} />}
                    {!o.color && <div style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid " + BD, background: S2 }} />}
                    <div style={{ flex: 1 }}>
                      <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, color: active ? (o.color || N1) : TP }}>{o.name}</span>
                      {o.style === "special" && <span style={{ fontSize: 8, color: o.color, marginLeft: 6, fontWeight: 700 }}>SPECIAL</span>}
                    </div>
                    {!avail && !me.previewMode && <span style={{ fontSize: 9, color: TD }}>🔒</span>}
                    {isPreview && <span style={{ fontSize: 8, color: N2, fontStyle: "italic" }}>preview</span>}
                    {active && avail && <span style={{ fontSize: 9, color: o.color || N1 }}>actif</span>}
                    {active && isPreview && <span style={{ fontSize: 8, color: N2, fontStyle: "italic" }}>preview</span>}
                  </button>
                );
              })}
            </div>
          </NeonCard>

          <NeonCard glow={"#FFD700"}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#FFD700", letterSpacing: 2, marginBottom: 10 }}>TITRE</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {availT.map(function(t) {
                var isActive = me.title === t.id;
                return (
                  <button key={t.id || "none"} onClick={function() { onUp(pi, Object.assign({}, me, { title: t.id })); }}
                    style={{ padding: "6px 12px", borderRadius: 8, border: isActive ? "2px solid " + N1 : "1px solid " + BD, background: isActive ? N1 + "10" : S2, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, color: isActive ? N1 : TP }}>{t.name}</span>
                    {isActive && <span style={{ marginLeft: "auto", fontSize: 9, color: N1 }}>actif</span>}
                  </button>
                );
              })}
              {TITLES.filter(function(t) { return t.req && availT.indexOf(t) === -1; }).length > 0 && (
                <div style={{ fontSize: 9, color: TD, marginTop: 4, fontStyle: "italic" }}>🔒 {TITLES.filter(function(t) { return t.req && availT.indexOf(t) === -1; }).length} titres a debloquer via les succes</div>
              )}
            </div>
          </NeonCard>
        </div>
      )}
    </div>
  );
}

/* ═══ MAIN APP ═══ */
export default function App() {
  var ms = useState(INIT_M); var matches = ms[0]; var setMatches = ms[1];
  var ps = useState(INIT_P); var players = ps[0]; var setPlayers = ps[1];
  var li = useState(null); var loggedIn = li[0]; var setLoggedIn = li[1];
  var tb = useState("home"); var tab = tb[0]; var setTab = tb[1];
  var sp = useState(false); var spoil = sp[0]; var setSpoil = sp[1];
  var isAdmin = loggedIn === "__admin";
  var currentUser = isAdmin ? "Ulysse" : loggedIn;

  function handleUpdate(mid, player, field, value) {
    setMatches(function(prev) { return prev.map(function(m) {
      if (m.id !== mid) return m;
      if (player === "__result") { var c = Object.assign({}, m); c[field] = value; return c; }
      var np = Object.assign({}, m.preds);
      np[player] = Object.assign({}, np[player] || {});
      np[player][field] = value;
      return Object.assign({}, m, { preds: np });
    }); });
  }

  function handleUpdatePlayer(i, p) { setPlayers(function(prev) { var n = prev.slice(); n[i] = p; return n; }); }

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
        {tab === "home" && <Dashboard matches={matches} players={players} currentUser={currentUser} onNav={setTab} spoil={spoil} />}
        {tab === "matches" && <MatchesPage matches={matches} players={players} onUpdate={handleUpdate} currentUser={currentUser} isAdmin={isAdmin} spoil={spoil} />}
        {tab === "stats" && <StatsPage matches={matches} players={players} spoil={spoil} />}
        {tab === "profile" && <ProfilePage matches={matches} players={players} currentUser={currentUser} onUpdatePlayer={handleUpdatePlayer} />}
      </div>
    </div>
  );
}
