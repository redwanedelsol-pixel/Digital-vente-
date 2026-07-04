// Construit un éditeur HTML autonome (polices embarquées) pour modifier les 9 stories.
const fs = require("fs");
const path = require("path");
const os = require("os");

const FONTS = {
  "Archivo Black": path.join(os.homedir(), ".fonts/ArchivoBlack.ttf"),
  Anton: path.join(os.homedir(), ".fonts/Anton.ttf"),
  "Dancing Script": path.join(os.homedir(), ".fonts/gf_dfa625.ttf"),
  "Archivo": path.join(os.homedir(), ".fonts/gf_9beaab.ttf"), // Regular
  "Archivo SB": path.join(os.homedir(), ".fonts/gf_d6eabd.ttf"), // SemiBold
};

function b64(p) { return fs.readFileSync(p).toString("base64"); }
function face(family, file, weight) {
  return `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;`
    + `src:url(data:font/ttf;base64,${b64(file)}) format('truetype')}`;
}
const FONT_CSS =
  face("Archivo Black", FONTS["Archivo Black"], 400) +
  face("Anton", FONTS["Anton"], 400) +
  face("Dancing Script", FONTS["Dancing Script"], 600) +
  face("Archivo", FONTS["Archivo"], 400) +
  face("Archivo", FONTS["Archivo SB"], 600);

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

// --- CSS des stories (identique au rendu PNG, mais couleur via var(--amber)) ---
const STORY_CSS = `
.stage{position:relative;width:1080px;height:1920px;overflow:hidden;color:#fff;
  font-family:"Archivo",sans-serif;isolation:isolate;--amber:#e0913f}
.stage::before{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;
  mix-blend-mode:soft-light;opacity:.5;background-image:url("${GRAIN}")}
.stage::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;
  background:radial-gradient(135% 100% at 50% 42%, transparent 50%, rgba(0,0,0,.7) 100%)}
.stage > *{position:absolute;z-index:3}
.pad{left:80px;right:80px}
.big{font-family:"Archivo Black",sans-serif;text-transform:uppercase;line-height:.86;letter-spacing:-.02em}
.tall{font-family:"Anton",sans-serif;text-transform:uppercase;line-height:.82;letter-spacing:.005em}
.script{font-family:"Dancing Script",cursive;font-weight:600;text-transform:none;letter-spacing:0}
.amber{color:var(--amber)}
.dot{color:var(--amber)}
.brand{top:70px;left:80px;font-size:24px;letter-spacing:.34em;text-transform:uppercase;color:rgba(255,255,255,.5);font-weight:600}
.time{font-size:34px;letter-spacing:.24em;font-variant-numeric:tabular-nums;color:rgba(255,255,255,.92)}
.kicker{font-size:27px;letter-spacing:.34em;text-transform:uppercase;color:rgba(255,255,255,.62);font-weight:600}
.kicker b{color:var(--amber);font-weight:800;margin-right:14px}
.sub{font-size:30px;letter-spacing:.02em;color:rgba(255,255,255,.82);font-weight:600}
.def{font-size:26px;line-height:1.55;color:rgba(255,255,255,.62);text-align:justify;font-weight:400}
.cap{font-size:30px;line-height:1.5;color:rgba(255,255,255,.72);font-weight:400}
.tag{font-size:23px;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.5);font-weight:600}
.stars{font-size:40px;letter-spacing:12px;color:var(--amber)}
.hdr{top:96px;left:80px;right:80px;display:flex;align-items:center;gap:26px;font-size:23px;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.72);font-weight:600}
.hdr .ln{flex:1;height:1px;background:rgba(255,255,255,.45)}
.hdr .mid{font-family:"Archivo Black",sans-serif;letter-spacing:.04em;font-size:30px;color:#fff;text-align:center}
.hdr .mid small{display:block;font-family:"Archivo",sans-serif;font-weight:600;font-size:19px;letter-spacing:.3em;color:var(--amber);margin-top:2px}
.brk{position:absolute;width:120px;height:120px;border:3px solid rgba(255,255,255,.55);z-index:3}
.brk.tl{border-right:0;border-bottom:0}.brk.tr{border-left:0;border-bottom:0}
.brk.bl{border-right:0;border-top:0}.brk.br{border-left:0;border-top:0}
.strip{display:flex;gap:34px;align-items:center;justify-content:center;font-family:"Archivo Black",sans-serif;font-size:58px}
.strip .d{color:rgba(255,255,255,.85)}.strip .d.off{color:rgba(255,255,255,.28)}
.strip .d.on{position:relative;color:#fff;display:flex;align-items:center;justify-content:center;width:96px;height:96px}
.strip .d.on::before{content:"";position:absolute;inset:0;border-radius:50%;background:var(--amber);z-index:-1}
.mlabel{font-size:26px;letter-spacing:.32em;text-transform:uppercase;color:var(--amber);font-weight:700}
.poll{display:flex;gap:30px;align-items:center;width:100%}
.opt{flex:1;border:2px solid rgba(255,255,255,.3);border-radius:22px;padding:40px 20px;text-align:center;font-family:"Archivo Black",sans-serif;font-size:52px;text-transform:uppercase;line-height:1}
.vs{font-size:30px;letter-spacing:.2em;color:rgba(255,255,255,.6);font-weight:700}
.badge{display:inline-flex;align-items:center;gap:14px;font-size:24px;letter-spacing:.28em;text-transform:uppercase;color:var(--amber);border:2px solid color-mix(in srgb,var(--amber) 60%,transparent);border-radius:999px;padding:14px 30px;font-weight:700}
.badge i{width:14px;height:14px;border-radius:50%;background:var(--amber);display:block}
[contenteditable]{outline:none}
[contenteditable]:focus{box-shadow:0 0 0 2px color-mix(in srgb,var(--amber) 70%,transparent);border-radius:6px}
`;

const bg = (t, g, gx, gy) =>
  `radial-gradient(120% 82% at ${gx} ${gy}, rgba(${g},.30), transparent 56%),radial-gradient(150% 120% at 50% 124%, rgba(0,0,0,.72), transparent 60%),linear-gradient(180deg, rgb(${t}), #060607 88%)`;

// Modèle des 9 stories : scene + champs par défaut.
const STORIES = [
  { id:"01-bienvenue", label:"01 · Bienvenue", scene:bg("22,17,13","224,150,80","50%","80%"),
    f:{ time:"9:42:07 PM", title:"BIENVENUE",
        def:"Coaching — accompagnement qui aide une personne à clarifier ses objectifs, lever ses blocages et passer à l'action. Ici, on parle business, mindset & croissance. Reste, ça va te servir.",
        tagL:"le rendez-vous du lundi", statusV:"active" } },
  { id:"02-mindset", label:"02 · Money Mindset", scene:bg("14,15,18","176,192,212","50%","12%"),
    f:{ kick:"mardi motivation", sub:"discipline > motivation.", w1:"MONEY", w2:"MINDSET", time:"04:37 PM" } },
  { id:"03-plan-semaine", label:"03 · Plan de la semaine", scene:bg("18,16,14","210,180,150","50%","26%"),
    f:{ month:"juillet 2026", d1:"06", d2:"07", d3:"08", d4:"09", d5:"10", day:"mercredi",
        title:"LE PLAN", script:"de ta semaine", cap:"Note tes 3 priorités. Fais-en une chose aujourd'hui. Le reste suivra." } },
  { id:"04-deep-work", label:"04 · Deep Work", scene:bg("12,13,16","150,176,202","58%","44%"),
    f:{ pre:"prends ton café ·", w1:"DEEP", w2:"WORK.", cap:"Une tâche. Zéro notification. 90 minutes. C'est comme ça qu'on avance vraiment.",
        tagL:"focus mode", time:"11:11 AM" } },
  { id:"05-dimanche", label:"05 · Dimanche", scene:bg("13,14,17","170,182,200","30%","30%"),
    f:{ loc1:"Paris", dnum:"04", dmon:"juillet", loc2:"Studio", title:"DIMANCHE",
        sub:"le jour où l'on prépare la semaine", script:"en train de", word:"CONSTRUIRE." } },
  { id:"06-temoignage", label:"06 · Témoignage", scene:bg("18,16,15","212,182,150","24%","36%"),
    f:{ kick:"témoignage", quote:"« J'AI ENFIN OSÉ ME LANCER. »",
        cap:"Camille D. — accompagnement 8 semaines. Passée de « un jour peut-être » à première cliente signée.",
        tagL:"preuve sociale", statusV:"réel" } },
  { id:"07-offre", label:"07 · C'est dispo", scene:bg("20,15,11","232,160,92","50%","46%"),
    f:{ badge:"nouveau", w1:"C'EST", w2:"DISPO.", cap:"Mon nouvel accompagnement est ouvert. Lien en bio — places limitées.",
        tagL:"inscriptions ouvertes", time:"06:15 PM" } },
  { id:"08-sondage", label:"08 · This or that", scene:bg("15,15,17","200,202,208","50%","18%"),
    f:{ kick:"ton avis ?", t1:"THIS OR", t2:"THAT", optA:"Équipe\\nmatin", optB:"Équipe\\nsoir",
        cap:"Tape sur ton choix 👆 — je lis toutes les réponses." } },
  { id:"09-merci", label:"09 · Merci", scene:bg("20,16,12","225,172,112","50%","72%"),
    f:{ hL:"Merci", sym:"∞", sub2:"à bientôt", hR:"Vous", time:"10:48 PM", title:"MERCI",
        script:"pour votre", cap:"confiance, vos messages, votre présence.<br>On se retrouve très vite." } },
];

const editorHTML = `<title>Éditeur — Pack Stories Coach (Édition Nocturne)</title>
<style>
${FONT_CSS}
${STORY_CSS}
:root{--bg:#0c0c0e;--panel:#16161a;--line:rgba(255,255,255,.1);--ink:#f2f0ec;--mut:#9a958c;--acc:#e0913f}
*{box-sizing:border-box}
.app{background:var(--bg);color:var(--ink);font-family:"Archivo",system-ui,sans-serif;min-height:100vh;padding:22px}
.bar{display:flex;flex-wrap:wrap;gap:16px 22px;align-items:center;max-width:980px;margin:0 auto 18px;
  background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:16px 20px}
.bar h1{font-family:"Archivo Black",sans-serif;font-size:19px;letter-spacing:-.01em;margin:0;text-transform:uppercase}
.bar .grp{display:flex;align-items:center;gap:9px;font-size:13px;color:var(--mut)}
.bar input[type=text]{background:#0c0c0e;border:1px solid var(--line);color:var(--ink);border-radius:9px;padding:9px 12px;font:inherit;font-size:14px;width:180px}
.bar input[type=color]{width:38px;height:38px;border:1px solid var(--line);border-radius:9px;background:none;padding:2px;cursor:pointer}
.nav{display:flex;gap:8px;align-items:center;margin-left:auto}
.nav select{background:#0c0c0e;border:1px solid var(--line);color:var(--ink);border-radius:9px;padding:9px 12px;font:inherit;font-size:14px}
.btn{background:var(--acc);color:#160d02;border:0;border-radius:10px;padding:11px 16px;font:inherit;font-weight:700;font-size:14px;cursor:pointer}
.btn.ghost{background:transparent;color:var(--ink);border:1px solid var(--line)}
.btn:active{transform:translateY(1px)}
.stagewrap{max-width:980px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:14px}
.frame{position:relative;overflow:hidden;border-radius:16px;box-shadow:0 24px 60px -28px #000;background:#000}
.frame .stage{transform-origin:top left}
.hint{color:var(--mut);font-size:13px;text-align:center;max-width:520px;line-height:1.5}
.hint b{color:var(--ink)}
.dlrow{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.82);display:none;align-items:center;justify-content:center;flex-direction:column;gap:14px;z-index:99;padding:22px}
.modal.on{display:flex}
.modal img{max-width:min(90vw,380px);max-height:74vh;border-radius:10px;box-shadow:0 20px 50px -20px #000}
.modal p{color:#fff;font-family:"Archivo",sans-serif;font-size:14px;text-align:center;max-width:420px;line-height:1.5}
.modal .x{position:absolute;top:16px;right:20px;color:#fff;font-size:30px;cursor:pointer;background:none;border:0}
</style>

<div class="app">
  <div class="bar">
    <h1>Éditeur · Stories</h1>
    <div class="grp">@compte
      <input id="handle" type="text" value="@votre.compte" />
    </div>
    <div class="grp">Couleur
      <input id="accent" type="color" value="#e0913f" />
    </div>
    <div class="nav">
      <button class="btn ghost" id="prev">◀</button>
      <select id="pick"></select>
      <button class="btn ghost" id="next">▶</button>
    </div>
  </div>

  <div class="stagewrap">
    <div class="frame" id="frame"><div class="stage" id="stage"></div></div>
    <div class="dlrow">
      <button class="btn" id="dl">⬇ Télécharger ce PNG</button>
      <button class="btn ghost" id="dlall">⬇ Télécharger les 9</button>
    </div>
    <p class="hint">Clique sur <b>n'importe quel texte</b> pour le modifier. Change ton <b>@compte</b> et la <b>couleur</b> en haut. Les modifs sont gardées quand tu changes de story. <b>1080×1920</b>, prêt pour Insta / TikTok.</p>
  </div>
</div>

<div class="modal" id="modal">
  <button class="x" id="mx">×</button>
  <img id="mimg" alt="story exportée" />
  <p>Si le téléchargement automatique ne se lance pas : <b>clic droit sur l'image → « Enregistrer l'image sous »</b>.</p>
</div>

<script>
const FONT_CSS = ${JSON.stringify(FONT_CSS)};
const STORY_CSS = ${JSON.stringify(STORY_CSS)};
const STORIES = ${JSON.stringify(STORIES)};
let handle = "@votre.compte";
let accent = "#e0913f";
let idx = 0;

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
// champ éditable ; data-k = clé ; nl -> retours à la ligne
function ce(st, k, cls, extra){
  let v = st.f[k] ?? "";
  extra = extra || "";
  return '<div class="'+cls+'" '+extra+' contenteditable="true" data-k="'+k+'">'+ v.replace(/\\\\n/g,'<br>') +'</div>';
}

function render(st){
  const H = '<span class="js-handle">'+esc(handle)+'</span>';
  switch(st.id){
    case "01-bienvenue": return \`
      <div class="brand">archive · \${H}</div>
      <div style="top:760px;left:0;right:0;text-align:center">
        \${ce(st,'time','time')}
        \${ce(st,'title','big',' style=\"font-size:145px;margin-top:20px\"')}
      </div>
      \${ce(st,'def','pad def',' style=\"top:1060px\"')}
      <div class="pad" style="top:1300px;display:flex;justify-content:space-between;align-items:flex-end">
        \${ce(st,'tagL','tag')}
        <div class="tag">status : \${ce(st,'statusV','amber',' style=\"display:inline;font-weight:700\"')}</div>
      </div>\`;
    case "02-mindset": return \`
      \${ce(st,'kick','pad kicker',' style=\"top:430px\"')}
      \${ce(st,'sub','pad sub',' style=\"top:474px\"')}
      <div class="tall amber" style="top:560px;left:70px;font-size:280px"><span contenteditable="true" data-k="w1">\${esc(st.f.w1)}</span> <span style="color:#fff">★</span></div>
      \${ce(st,'w2','tall',' style=\"top:1180px;left:70px;font-size:280px\"')}
      \${ce(st,'time','time',' style=\"top:1560px;left:0;right:0;text-align:center\"')}\`;
    case "03-plan-semaine": return \`
      <div class="brand">archive · \${H}</div>
      <div style="top:520px;left:0;right:0;text-align:center">
        \${ce(st,'month','mlabel')}
        <div class="strip" style="margin-top:26px">
          \${ce(st,'d1','d off',' style=\"\"')}\${ce(st,'d2','d off')}
          \${ce(st,'d3','d on')}\${ce(st,'d4','d')}\${ce(st,'d5','d off')}
        </div>
        \${ce(st,'day','mlabel',' style=\"margin-top:22px;color:rgba(255,255,255,.55)\"')}
      </div>
      <div style="top:1140px;left:0;right:0;text-align:center">
        \${ce(st,'title','big',' style=\"font-size:150px\"')}
        \${ce(st,'script','script amber',' style=\"font-size:110px;margin-top:-6px\"')}
      </div>
      \${ce(st,'cap','pad cap',' style=\"top:1500px;text-align:center\"')}\`;
    case "04-deep-work": return \`
      \${ce(st,'pre','pad cap',' style=\"top:800px;font-size:34px;color:rgba(255,255,255,.7)\"')}
      \${ce(st,'w1','big pad',' style=\"top:844px;font-size:210px\"')}
      \${ce(st,'w2','big amber pad',' style=\"top:1044px;font-size:210px\"')}
      \${ce(st,'cap','pad cap',' style=\"top:1320px\"')}
      <div class="pad" style="top:1560px;display:flex;justify-content:space-between;align-items:flex-end">
        \${ce(st,'tagL','tag')}\${ce(st,'time','time')}
      </div>\`;
    case "05-dimanche": return \`
      <div class="hdr"><span class="ln"></span><span contenteditable="true" data-k="loc1">\${esc(st.f.loc1)}</span>
        <span class="mid"><span contenteditable="true" data-k="dnum">\${esc(st.f.dnum)}</span><small contenteditable="true" data-k="dmon">\${esc(st.f.dmon)}</small></span>
        <span contenteditable="true" data-k="loc2">\${esc(st.f.loc2)}</span><span class="ln"></span></div>
      <div class="brk tl" style="top:560px;left:150px"></div><div class="brk tr" style="top:560px;right:150px"></div>
      <div class="brk bl" style="top:1160px;left:150px"></div><div class="brk br" style="top:1160px;right:150px"></div>
      <div style="top:720px;left:0;right:0;text-align:center">
        <div class="big" style="font-size:150px"><span contenteditable="true" data-k="title">\${esc(st.f.title)}</span><span class="dot">.</span></div>
        \${ce(st,'sub','cap',' style=\"margin-top:20px;font-size:30px;color:rgba(255,255,255,.6)\"')}
      </div>
      <div style="top:1480px;left:0;right:0;text-align:center">
        \${ce(st,'script','script amber',' style=\"font-size:96px\"')}
        \${ce(st,'word','big',' style=\"font-size:120px;margin-top:-8px\"')}
      </div>\`;
    case "06-temoignage": return \`
      \${ce(st,'kick','pad kicker',' style=\"top:520px\"')}
      \${ce(st,'quote','pad big',' style=\"top:600px;font-size:118px;line-height:1.02\"')}
      <div class="pad stars" style="top:1000px">★★★★★</div>
      \${ce(st,'cap','pad cap',' style=\"top:1080px\"')}
      <div class="pad" style="top:1560px;display:flex;justify-content:space-between;align-items:flex-end">
        \${ce(st,'tagL','tag')}
        <div class="tag">résultat : \${ce(st,'statusV','amber',' style=\"display:inline;font-weight:700\"')}</div>
      </div>\`;
    case "07-offre": return \`
      <div style="top:740px;left:80px"><span class="badge"><i></i><span contenteditable="true" data-k="badge">\${esc(st.f.badge)}</span></span></div>
      \${ce(st,'w1','big pad',' style=\"top:820px;font-size:230px\"')}
      \${ce(st,'w2','big amber pad',' style=\"top:1050px;font-size:230px\"')}
      \${ce(st,'cap','pad cap',' style=\"top:1340px\"')}
      <div class="pad" style="top:1560px;display:flex;justify-content:space-between;align-items:flex-end">
        \${ce(st,'tagL','tag')}\${ce(st,'time','time')}
      </div>\`;
    case "08-sondage": return \`
      \${ce(st,'kick','pad kicker',' style=\"top:520px\"')}
      <div class="tall pad" style="top:600px;font-size:200px;line-height:.82"><span contenteditable="true" data-k="t1">\${esc(st.f.t1)}</span><br><span contenteditable="true" data-k="t2">\${esc(st.f.t2)}</span></div>
      <div class="pad poll" style="top:1150px">
        <div class="opt" contenteditable="true" data-k="optA">\${st.f.optA.replace(/\\\\n/g,'<br>')}</div>
        <div class="vs">VS</div>
        <div class="opt" contenteditable="true" data-k="optB">\${st.f.optB.replace(/\\\\n/g,'<br>')}</div>
      </div>
      \${ce(st,'cap','pad cap',' style=\"top:1440px;text-align:center\"')}
      <div style="top:1600px;left:0;right:0;text-align:center" class="tag">engagement</div>\`;
    case "09-merci": return \`
      <div class="hdr"><span class="ln"></span><span contenteditable="true" data-k="hL">\${esc(st.f.hL)}</span>
        <span class="mid"><span contenteditable="true" data-k="sym">\${esc(st.f.sym)}</span><small contenteditable="true" data-k="sub2">\${esc(st.f.sub2)}</small></span>
        <span contenteditable="true" data-k="hR">\${esc(st.f.hR)}</span><span class="ln"></span></div>
      <div style="top:820px;left:0;right:0;text-align:center">
        \${ce(st,'time','time')}
        <div class="big" style="font-size:250px;margin-top:14px"><span contenteditable="true" data-k="title">\${esc(st.f.title)}</span><span class="dot">.</span></div>
      </div>
      <div style="top:1240px;left:0;right:0;text-align:center">
        \${ce(st,'script','script amber',' style=\"font-size:92px\"')}
        \${ce(st,'cap','cap',' style=\"font-size:32px;margin-top:6px;color:rgba(255,255,255,.7)\"')}
      </div>\`;
  }
  return "";
}

const stage = document.getElementById('stage');
const frame = document.getElementById('frame');
const pick = document.getElementById('pick');
STORIES.forEach((s,i)=>{ const o=document.createElement('option'); o.value=i; o.textContent=s.label; pick.appendChild(o); });

function paint(){
  const st = STORIES[idx];
  stage.style.background = st.scene;
  stage.style.setProperty('--amber', accent);
  stage.innerHTML = render(st);
  pick.value = idx;
  // sauvegarde des modifs dans le modèle
  stage.querySelectorAll('[data-k]').forEach(el=>{
    el.addEventListener('input', ()=>{
      let html = el.innerHTML.replace(/<br\\s*\\/?>/gi,'\\\\n').replace(/<[^>]+>/g,'');
      st.f[el.dataset.k] = html;
    });
  });
  fit();
}
function fit(){
  const w = Math.min(frame.parentElement.clientWidth, 460);
  const s = w/1080;
  frame.style.width = w+'px';
  frame.style.height = (1920*s)+'px';
  stage.style.transform = 'scale('+s+')';
}
window.addEventListener('resize', fit);

document.getElementById('handle').addEventListener('input', e=>{ handle=e.target.value||"@"; paint(); });
document.getElementById('accent').addEventListener('input', e=>{ accent=e.target.value; document.documentElement.style.setProperty('--acc',accent); stage.style.setProperty('--amber',accent); });
document.getElementById('prev').onclick=()=>{ idx=(idx+STORIES.length-1)%STORIES.length; paint(); };
document.getElementById('next').onclick=()=>{ idx=(idx+1)%STORIES.length; paint(); };
pick.onchange=e=>{ idx=+e.target.value; paint(); };

// ---- Export PNG (SVG foreignObject + polices embarquées) ----
function toPNG(st){
  return new Promise((res,rej)=>{
    const off = document.createElement('div');
    off.innerHTML = '<div class="stage" xmlns="http://www.w3.org/1999/xhtml"></div>';
    const st2 = off.firstChild;
    st2.style.background = st.scene; st2.style.setProperty('--amber', accent);
    st2.style.width='1080px'; st2.style.height='1920px'; st2.style.transform='none';
    st2.innerHTML = render(st);
    const xml = new XMLSerializer().serializeToString(st2);
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">'
      + '<foreignObject x="0" y="0" width="1080" height="1920">'
      + '<style>'+FONT_CSS+STORY_CSS+'</style>'+xml+'</foreignObject></svg>';
    const url = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
    const img = new Image();
    img.onload = ()=>{ const c=document.createElement('canvas'); c.width=1080; c.height=1920;
      const x=c.getContext('2d'); x.drawImage(img,0,0); c.toBlob(b=>res(b),'image/png'); };
    img.onerror = rej; img.src = url;
  });
}
function saveBlob(b, name){
  const u=URL.createObjectURL(b); const a=document.createElement('a'); a.href=u; a.download=name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(u),4000);
}
const modal=document.getElementById('modal'), mimg=document.getElementById('mimg');
document.getElementById('mx').onclick=()=>modal.classList.remove('on');
document.getElementById('dl').onclick=async ()=>{
  const st=STORIES[idx]; const b=await toPNG(st); saveBlob(b, st.id+'.png');
  mimg.src=URL.createObjectURL(b); modal.classList.add('on');
};
document.getElementById('dlall').onclick=async ()=>{
  for(const st of STORIES){ const b=await toPNG(st); saveBlob(b, st.id+'.png'); await new Promise(r=>setTimeout(r,350)); }
};

paint();
</script>`;

const OUT = path.join(__dirname, "..", "exports", "editor.html");
fs.writeFileSync(OUT, editorHTML);
console.log("editor written -> " + OUT + " (" + (editorHTML.length/1024|0) + " KB)");
