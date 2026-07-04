// Génère 9 stories 1080x1920 (HTML) — style "dark aesthetic archive"
// inspiré des références (barre d'en-tête, cadres d'angle, bandeau de dates,
// mot en couleur accent, mix script+gras, texte "définition").
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "exports");
const HTML = path.join(OUT, "html");
fs.mkdirSync(HTML, { recursive: true });

const AMBER = "#e0913f";

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

function bg(tint, glow, gx, gy) {
  return `radial-gradient(120% 82% at ${gx} ${gy}, rgba(${glow},.30), transparent 56%),
          radial-gradient(150% 120% at 50% 124%, rgba(0,0,0,.72), transparent 60%),
          linear-gradient(180deg, rgb(${tint}), #060607 88%)`;
}

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden}
.stage{position:relative;width:1080px;height:1920px;overflow:hidden;color:#fff;
  font-family:"Archivo",sans-serif;isolation:isolate}
.stage::before{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;
  mix-blend-mode:soft-light;opacity:.5;background-image:url("${GRAIN}")}
.stage::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;
  background:radial-gradient(135% 100% at 50% 42%, transparent 50%, rgba(0,0,0,.7) 100%)}
.stage > *{position:absolute;z-index:3}

.pad{left:80px;right:80px}
.big{font-family:"Archivo Black",sans-serif;text-transform:uppercase;line-height:.86;
  letter-spacing:-.02em}
.tall{font-family:"Anton",sans-serif;text-transform:uppercase;line-height:.82;
  letter-spacing:.005em}
.script{font-family:"Dancing Script",cursive;font-weight:600;text-transform:none;letter-spacing:0}
.amber{color:${AMBER}}
.dot{color:${AMBER}}

.brand{top:70px;left:80px;font-size:24px;letter-spacing:.34em;text-transform:uppercase;
  color:rgba(255,255,255,.5);font-weight:600}
.time{font-size:34px;letter-spacing:.24em;font-variant-numeric:tabular-nums;color:rgba(255,255,255,.92)}
.kicker{font-size:27px;letter-spacing:.34em;text-transform:uppercase;color:rgba(255,255,255,.62);font-weight:600}
.kicker b{color:${AMBER};font-weight:800;margin-right:14px}
.def{font-size:26px;line-height:1.55;color:rgba(255,255,255,.62);text-align:justify;font-weight:400}
.cap{font-size:30px;line-height:1.5;color:rgba(255,255,255,.72);font-weight:400}
.tag{font-size:23px;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.5);font-weight:600}
.status b{color:${AMBER}}
.stars{font-size:40px;letter-spacing:12px;color:${AMBER}}

/* header bar with hairlines */
.hdr{top:96px;left:80px;right:80px;display:flex;align-items:center;gap:26px;
  font-size:23px;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.72);font-weight:600}
.hdr .ln{flex:1;height:1px;background:rgba(255,255,255,.45)}
.hdr .mid{font-family:"Archivo Black",sans-serif;letter-spacing:.04em;font-size:30px;color:#fff}
.hdr .mid small{display:block;font-family:"Archivo",sans-serif;font-weight:600;font-size:19px;
  letter-spacing:.3em;color:${AMBER};text-align:center;margin-top:2px}

/* corner brackets */
.brk{position:absolute;width:120px;height:120px;border:3px solid rgba(255,255,255,.55);z-index:3}
.brk.tl{border-right:0;border-bottom:0}
.brk.tr{border-left:0;border-bottom:0}
.brk.bl{border-right:0;border-top:0}
.brk.br{border-left:0;border-top:0}

/* date strip */
.strip{display:flex;gap:34px;align-items:center;font-family:"Archivo Black",sans-serif;font-size:58px}
.strip .d{color:rgba(255,255,255,.85)}
.strip .d.off{color:rgba(255,255,255,.28)}
.strip .d.on{position:relative;color:#fff;display:flex;align-items:center;justify-content:center;
  width:96px;height:96px}
.strip .d.on::before{content:"";position:absolute;inset:0;border-radius:50%;background:${AMBER};z-index:-1}
.mlabel{font-size:26px;letter-spacing:.32em;text-transform:uppercase;color:${AMBER};font-weight:700}

/* this-or-that */
.poll{display:flex;gap:30px;align-items:center;width:100%}
.opt{flex:1;border:2px solid rgba(255,255,255,.3);border-radius:22px;padding:40px 20px;text-align:center;
  font-family:"Archivo Black",sans-serif;font-size:52px;text-transform:uppercase;line-height:1}
.vs{font-size:30px;letter-spacing:.2em;color:rgba(255,255,255,.6);font-weight:700}

/* badge */
.badge{display:inline-flex;align-items:center;gap:14px;font-size:24px;letter-spacing:.28em;
  text-transform:uppercase;color:${AMBER};border:2px solid rgba(224,145,63,.6);border-radius:999px;
  padding:14px 30px;font-weight:700}
.badge i{width:14px;height:14px;border-radius:50%;background:${AMBER};display:block}
`;

function page(scene, inner) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head>
<body><div class="stage" style="background:${scene}">${inner}</div></body></html>`;
}

// ---- 9 stories ----
const stories = [];

// 01 — BIENVENUE (archétype "MONDAY" : timestamp + gros mot + texte définition + status)
stories.push({
  name: "01-bienvenue",
  scene: bg("22,17,13", "224,150,80", "50%", "80%"),
  inner: `
    <div class="brand">archive · @votre.compte</div>
    <div style="top:760px;left:0;right:0;text-align:center">
      <div class="time">9:42:07 PM</div>
      <div class="big" style="font-size:145px;margin-top:20px">BIENVENUE</div>
    </div>
    <div class="pad def" style="top:1060px">Coaching&nbsp;— accompagnement qui aide une personne à clarifier ses objectifs, lever ses blocages et passer à l'action. Ici, on parle business, mindset &amp; croissance. Reste, ça va te servir.</div>
    <div class="pad" style="top:1300px;display:flex;justify-content:space-between;align-items:flex-end">
      <div class="tag">le rendez-vous du lundi</div>
      <div class="tag status">status : <b>active</b></div>
    </div>`,
});

// 02 — MINDSET (archétype "GYM TIME" : // label + 2 gros mots empilés condensés + étoile)
stories.push({
  name: "02-mindset",
  scene: bg("14,15,18", "176,192,212", "50%", "12%"),
  inner: `
    <div class="pad kicker" style="top:430px"><b>//</b> mardi motivation</div>
    <div class="pad kicker" style="top:474px;color:rgba(255,255,255,.82);font-size:30px;letter-spacing:.02em;text-transform:none;font-weight:600">discipline &gt; motivation.</div>
    <div class="tall amber" style="top:560px;left:70px;font-size:280px">MONEY <span style="color:#fff">★</span></div>
    <div class="tall" style="top:1180px;left:70px;font-size:280px">MINDSET</div>
    <div style="top:1560px;left:0;right:0;text-align:center" class="time">04:37 PM</div>`,
});

// 03 — PLAN DE LA SEMAINE (archétype "minimalist Grams" : bandeau de dates + script)
stories.push({
  name: "03-plan-semaine",
  scene: bg("18,16,14", "210,180,150", "50%", "26%"),
  inner: `
    <div class="brand">archive · @votre.compte</div>
    <div style="top:520px;left:0;right:0;text-align:center">
      <div class="mlabel">juillet 2026</div>
      <div class="strip" style="justify-content:center;margin-top:26px">
        <span class="d off">06</span><span class="d off">07</span>
        <span class="d on">08</span>
        <span class="d">09</span><span class="d off">10</span>
      </div>
      <div class="mlabel" style="margin-top:22px;color:rgba(255,255,255,.55)">mercredi</div>
    </div>
    <div style="top:1140px;left:0;right:0;text-align:center">
      <div class="big" style="font-size:150px">LE PLAN</div>
      <div class="script amber" style="font-size:110px;margin-top:-6px">de ta semaine</div>
    </div>
    <div class="pad cap" style="top:1500px;text-align:center">Note tes 3 priorités. Fais-en une chose aujourd'hui. Le reste suivra.</div>`,
});

// 04 — DEEP WORK (archétype "WORK TIME" : petit texte + gros mot avec accent couleur)
stories.push({
  name: "04-deep-work",
  scene: bg("12,13,16", "150,176,202", "58%", "44%"),
  inner: `
    <div class="pad cap" style="top:800px;font-size:34px;color:rgba(255,255,255,.7)">prends ton café ·</div>
    <div class="big pad" style="top:844px;font-size:210px">DEEP</div>
    <div class="big amber pad" style="top:1044px;font-size:210px">WORK.</div>
    <div class="pad cap" style="top:1320px">Une tâche. Zéro notification. 90 minutes. C'est comme ça qu'on avance vraiment.</div>
    <div class="pad" style="top:1560px;display:flex;justify-content:space-between;align-items:flex-end">
      <div class="tag">focus mode</div><div class="time">11:11 AM</div>
    </div>`,
});

// 05 — DIMANCHE (archétype "Sunday." : en-tête lieu/date + cadres d'angle + script+gras)
stories.push({
  name: "05-dimanche",
  scene: bg("13,14,17", "170,182,200", "30%", "30%"),
  inner: `
    <div class="hdr"><span class="ln"></span><span>Paris</span>
      <span class="mid">04<small>juillet</small></span>
      <span>Studio</span><span class="ln"></span></div>
    <div class="brk tl" style="top:560px;left:150px"></div>
    <div class="brk tr" style="top:560px;right:150px"></div>
    <div class="brk bl" style="top:1160px;left:150px"></div>
    <div class="brk br" style="top:1160px;right:150px"></div>
    <div style="top:720px;left:0;right:0;text-align:center">
      <div class="big" style="font-size:150px">DIMANCHE<span class="dot">.</span></div>
      <div class="cap" style="margin-top:20px;font-size:30px;color:rgba(255,255,255,.6)">le jour où l'on prépare la semaine</div>
    </div>
    <div style="top:1480px;left:0;right:0;text-align:center">
      <div class="script amber" style="font-size:96px">en train de</div>
      <div class="big" style="font-size:120px;margin-top:-8px">CONSTRUIRE.</div>
    </div>`,
});

// 06 — TÉMOIGNAGE (archétype "MONDAY" adapté : citation + étoiles + status)
stories.push({
  name: "06-temoignage",
  scene: bg("18,16,15", "212,182,150", "24%", "36%"),
  inner: `
    <div class="pad kicker" style="top:520px"><b>//</b> témoignage</div>
    <div class="pad big" style="top:600px;font-size:118px;line-height:1.02">«&nbsp;J'AI ENFIN OSÉ ME LANCER.&nbsp;»</div>
    <div class="pad stars" style="top:1000px">★★★★★</div>
    <div class="pad cap" style="top:1080px">Camille D. — accompagnement 8 semaines. Passée de « un jour peut-être » à première cliente signée.</div>
    <div class="pad" style="top:1560px;display:flex;justify-content:space-between;align-items:flex-end">
      <div class="tag">preuve sociale</div><div class="tag status">résultat : <b>réel</b></div>
    </div>`,
});

// 07 — OFFRE (archétype "WORK TIME" adapté : badge + gros mot accent + CTA)
stories.push({
  name: "07-offre",
  scene: bg("20,15,11", "232,160,92", "50%", "46%"),
  inner: `
    <div style="top:740px;left:80px"><span class="badge"><i></i> nouveau</span></div>
    <div class="big pad" style="top:820px;font-size:230px">C'EST</div>
    <div class="big amber pad" style="top:1050px;font-size:230px">DISPO.</div>
    <div class="pad cap" style="top:1340px">Mon nouvel accompagnement est ouvert. <span class="amber">Lien en bio</span> — places limitées.</div>
    <div class="pad" style="top:1560px;display:flex;justify-content:space-between;align-items:flex-end">
      <div class="tag">inscriptions ouvertes</div><div class="time">06:15 PM</div>
    </div>`,
});

// 08 — SONDAGE (archétype "GYM TIME" adapté : this or that)
stories.push({
  name: "08-sondage",
  scene: bg("15,15,17", "200,202,208", "50%", "18%"),
  inner: `
    <div class="pad kicker" style="top:520px"><b>//</b> ton avis ?</div>
    <div class="tall pad" style="top:600px;font-size:200px">THIS OR<br>THAT</div>
    <div class="pad poll" style="top:1150px">
      <div class="opt">Équipe<br>matin</div><div class="vs">VS</div><div class="opt">Équipe<br>soir</div>
    </div>
    <div class="pad cap" style="top:1440px;text-align:center">Tape sur ton choix 👆 — je lis toutes les réponses.</div>
    <div style="top:1600px;left:0;right:0;text-align:center" class="tag">engagement</div>`,
});

// 09 — MERCI (archétype "Sunday." adapté : en-tête + gros mot + script)
stories.push({
  name: "09-merci",
  scene: bg("20,16,12", "225,172,112", "50%", "72%"),
  inner: `
    <div class="hdr"><span class="ln"></span><span>Merci</span>
      <span class="mid">∞<small>à bientôt</small></span>
      <span>Vous</span><span class="ln"></span></div>
    <div style="top:820px;left:0;right:0;text-align:center">
      <div class="time">10:48 PM</div>
      <div class="big" style="font-size:250px;margin-top:14px">MERCI<span class="dot">.</span></div>
    </div>
    <div style="top:1240px;left:0;right:0;text-align:center">
      <div class="script amber" style="font-size:92px">pour votre</div>
      <div class="cap" style="font-size:32px;margin-top:6px;color:rgba(255,255,255,.7)">confiance, vos messages, votre présence.<br>On se retrouve très vite.</div>
    </div>`,
});

for (const s of stories) {
  fs.writeFileSync(path.join(HTML, s.name + ".html"), page(s.scene, s.inner));
}
console.log("written " + stories.length + " html files to " + HTML);
console.log(stories.map((s) => s.name).join("\n"));
