// Éditeur HTML autonome — 30 stories modifiables, polices embarquées,
// upload de photo de fond + export PNG 1080x1920.
const fs = require("fs");
const path = require("path");
const os = require("os");

const F = {
  black: path.join(os.homedir(), ".fonts/ArchivoBlack.ttf"),
  anton: path.join(os.homedir(), ".fonts/Anton.ttf"),
  script: path.join(os.homedir(), ".fonts/gf_dfa625.ttf"),
  reg: path.join(os.homedir(), ".fonts/gf_9beaab.ttf"),
  sb: path.join(os.homedir(), ".fonts/gf_d6eabd.ttf"),
};
const b64 = (p) => fs.readFileSync(p).toString("base64");
const face = (fam, file, w) =>
  `@font-face{font-family:'${fam}';font-weight:${w};font-style:normal;src:url(data:font/ttf;base64,${b64(file)}) format('truetype')}`;
const FONT_CSS =
  face("Archivo Black", F.black, 400) + face("Anton", F.anton, 400) +
  face("Dancing Script", F.script, 600) + face("Archivo", F.reg, 400) +
  face("Archivo", F.sb, 600);

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const STORY_CSS = `
.stage{position:relative;width:1080px;height:1920px;overflow:hidden;color:#fff;font-family:"Archivo",sans-serif;isolation:isolate;--amber:#e0913f}
.photo{position:absolute;inset:0;z-index:0;background-size:cover;background-position:center}
.stage::before{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;mix-blend-mode:soft-light;opacity:.5;background-image:url("${GRAIN}")}
.stage::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(135% 100% at 50% 42%, transparent 50%, rgba(0,0,0,.7) 100%)}
.stage > *{position:absolute;z-index:3}
.stage > .photo{z-index:0}
.pad{left:80px;right:80px}
.big{font-family:"Archivo Black",sans-serif;text-transform:uppercase;line-height:.86;letter-spacing:-.02em}
.tall{font-family:"Anton",sans-serif;text-transform:uppercase;line-height:.82;letter-spacing:.005em}
.script{font-family:"Dancing Script",cursive;font-weight:600;text-transform:none;letter-spacing:0}
.amber{color:var(--amber)}.dot{color:var(--amber)}
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
.brk.tl{border-right:0;border-bottom:0}.brk.tr{border-left:0;border-bottom:0}.brk.bl{border-right:0;border-top:0}.brk.br{border-left:0;border-top:0}
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
.list{display:flex;flex-direction:column;gap:26px;width:100%}
.list .row{display:flex;gap:26px;align-items:baseline}
.list .ix{font-family:"Archivo Black",sans-serif;font-size:38px;color:var(--amber);flex:none}
.list .tx{font-size:38px;line-height:1.32;color:rgba(255,255,255,.85);font-weight:400}
.qopt .ix{width:66px;height:66px;border-radius:50%;border:2px solid var(--amber);display:inline-flex;align-items:center;justify-content:center;font-size:32px}
[contenteditable]{outline:none}
[contenteditable]:focus{box-shadow:0 0 0 2px color-mix(in srgb,var(--amber) 70%,transparent);border-radius:6px}
.stage.nograin::before{display:none}
.ex-el{outline:none}
`;

const bg = (t, g, gx, gy) =>
  `radial-gradient(120% 82% at ${gx} ${gy}, rgba(${g},.30), transparent 56%),radial-gradient(150% 120% at 50% 124%, rgba(0,0,0,.72), transparent 60%),linear-gradient(180deg, rgb(${t}), #060607 88%)`;
const L = (rows) => { const o = { rn: rows.length }; rows.forEach((r, i) => { o["r" + i + "a"] = r[0]; o["r" + i + "b"] = r[1]; }); return o; };
const Q = (opts) => { const o = { on: opts.length }; opts.forEach((r, i) => { o["q" + i + "a"] = r[0]; o["q" + i + "b"] = r[1]; }); return o; };

const S = [
  // ---------- 1-9 (existants) ----------
  { id:"01-bienvenue", label:"01 · Bienvenue", cat:"Branding", type:"hero", scene:bg("22,17,13","224,150,80","50%","80%"),
    f:{ useHandle:true, time:"9:42:07 PM", title:"BIENVENUE",
      def:"Coaching — accompagnement qui aide une personne à clarifier ses objectifs, lever ses blocages et passer à l'action. Ici, on parle business, mindset & croissance. Reste, ça va te servir.",
      footL:"le rendez-vous du lundi", footRlab:"status", footRval:"active" } },
  { id:"02-mindset", label:"02 · Money mindset", cat:"Mindset", type:"stack", scene:bg("14,15,18","176,192,212","50%","12%"),
    f:{ kick:"mardi motivation", sub:"discipline > motivation.", w1:"MONEY", star:true, w2:"MINDSET", time:"04:37 PM", wSize:280 } },
  { id:"03-plan-semaine", label:"03 · Plan de la semaine", cat:"Conseil", type:"date", scene:bg("18,16,14","210,180,150","50%","26%"),
    f:{ useHandle:true, month:"juillet 2026", d1:"06", d2:"07", d3:"08", d4:"09", d5:"10", day:"mercredi",
      title:"LE PLAN", script:"de ta semaine", cap:"Note tes 3 priorités. Fais-en une chose aujourd'hui. Le reste suivra." } },
  { id:"04-deep-work", label:"04 · Deep work", cat:"Coulisses", type:"accent", scene:bg("12,13,16","150,176,202","58%","44%"),
    f:{ pre:"prends ton café ·", w1:"DEEP", w2:"WORK.", wSize:210,
      cap:"Une tâche. Zéro notification. 90 minutes. C'est comme ça qu'on avance vraiment.", footL:"focus mode", time:"11:11 AM" } },
  { id:"05-dimanche", label:"05 · Dimanche", cat:"Coulisses", type:"frame", scene:bg("13,14,17","170,182,200","30%","30%"),
    f:{ loc1:"Paris", dnum:"04", dmon:"juillet", loc2:"Studio", brackets:true, title:"DIMANCHE", titleSize:150, dot:true,
      sub:"le jour où l'on prépare la semaine", script:"en train de", word:"CONSTRUIRE.", wordSize:120 } },
  { id:"06-temoignage", label:"06 · Témoignage", cat:"Preuve", type:"quote", scene:bg("18,16,15","212,182,150","24%","36%"),
    f:{ kick:"témoignage", quote:"« J'AI ENFIN OSÉ ME LANCER. »", qSize:118, stars:true,
      cap:"Camille D. — accompagnement 8 semaines. Passée de « un jour peut-être » à première cliente signée.",
      footL:"preuve sociale", footRlab:"résultat", footRval:"réel" } },
  { id:"07-offre", label:"07 · C'est dispo", cat:"Offre", type:"accent", scene:bg("20,15,11","232,160,92","50%","46%"),
    f:{ badge:"nouveau", w1:"C'EST", w2:"DISPO.", wSize:230,
      cap:"Mon nouvel accompagnement est ouvert. Lien en bio — places limitées.", footL:"inscriptions ouvertes", time:"06:15 PM" } },
  { id:"08-sondage", label:"08 · This or that", cat:"Engagement", type:"poll", scene:bg("15,15,17","200,202,208","50%","18%"),
    f:{ kick:"ton avis ?", t1:"THIS OR", t2:"THAT", optA:"Équipe\\nmatin", optB:"Équipe\\nsoir", cap:"Tape sur ton choix — je lis toutes les réponses." } },
  { id:"09-merci", label:"09 · Merci", cat:"Clôture", type:"frame", scene:bg("20,16,12","225,172,112","50%","72%"),
    f:{ hL:"Merci", dnum:"∞", dmon:"à bientôt", hR:"Vous", time:"10:48 PM", title:"MERCI", titleSize:250, dot:true,
      script:"pour votre", cap:"confiance, vos messages, votre présence.\\nOn se retrouve très vite." } },

  // ---------- 10-30 (nouvelles) ----------
  { id:"10-qui-suis-je", label:"10 · Qui suis-je", cat:"Branding", type:"hero", scene:bg("19,16,14","214,158,96","50%","78%"),
    f:{ useHandle:true, time:"", title:"QUI SUIS-JE ?", titleSize:94,
      def:"Coach business & mindset. J'aide les solopreneurs à lancer leur activité sans attendre d'être « prêts ». Ici : des méthodes simples, zéro blabla, du concret que tu peux appliquer dès aujourd'hui.",
      footL:"à propos", footRlab:"depuis", footRval:"2024" } },
  { id:"11-ma-mission", label:"11 · Ma mission", cat:"Branding", type:"frame", scene:bg("13,14,17","168,180,198","70%","24%"),
    f:{ loc1:"Moi", dnum:"✦", dmon:"coach", loc2:"2026", brackets:false, title:"MISSION", titleSize:150, dot:true,
      sub:"pourquoi je fais ça", script:"t'aider à", word:"PASSER À L'ACTION", wordSize:80 } },
  { id:"12-citation-focus", label:"12 · Citation focus", cat:"Mindset", type:"quote", scene:bg("14,15,18","178,194,214","50%","14%"),
    f:{ kick:"mindset", quote:"TU N'AS PAS BESOIN DE PLUS DE TEMPS. JUSTE DE PLUS DE FOCUS.", qSize:92, stars:false,
      cap:"— rappelle-toi ça aujourd'hui.", footL:"citation", footRlab:"jour", footRval:"03" } },
  { id:"13-commence-petit", label:"13 · Commence petit", cat:"Mindset", type:"stack", scene:bg("16,14,13","206,150,92","50%","16%"),
    f:{ kick:"rappel", sub:"pas besoin d'être prêt.", w1:"COMMENCE", star:false, w2:"PETIT.", time:"07:00 AM", wSize:240 } },
  { id:"14-avance-imparfait", label:"14 · Avance imparfait", cat:"Mindset", type:"frame", scene:bg("13,15,16","160,186,190","28%","74%"),
    f:{ loc1:"Note", dnum:"01", dmon:"règle", loc2:"Coach", brackets:false, title:"AVANCE", titleSize:170, dot:true,
      sub:"la perfection tue l'action", script:"même si c'est", word:"IMPARFAIT", wordSize:120 } },
  { id:"15-3-erreurs", label:"15 · 3 erreurs", cat:"Conseil", type:"list", scene:bg("12,13,16","150,176,202","50%","40%"),
    f:{ kick:"conseil du jour", title:"3 ERREURS", titleSize:120, cap:"quand tu démarres ton activité :", time:"04:37 PM",
      ...L([["01","Attendre d'être « prêt » pour te lancer."],["02","Vouloir copier tout le monde."],["03","Baisser tes prix par peur du silence."]]) } },
  { id:"16-astuce-1h", label:"16 · Astuce +1h", cat:"Conseil", type:"list", scene:bg("18,16,13","220,168,104","50%","30%"),
    f:{ kick:"astuce", title:"GAGNE 1H", titleSize:150, cap:"par jour, dès demain :", time:"",
      ...L([["→","Batch ton contenu le dimanche."],["→","Coupe les notifs le matin."],["→","Une seule priorité par jour."]]) } },
  { id:"17-le-saviez-vous", label:"17 · Le saviez-vous", cat:"Conseil", type:"hero", scene:bg("13,14,18","172,186,210","50%","22%"),
    f:{ useHandle:false, time:"", title:"LE SAVIEZ-VOUS ?", titleSize:76,
      def:"92 % des gens qui écrivent leurs objectifs ne les atteignent jamais… faute d'un plan d'action. Le secret n'est pas l'objectif — c'est le système qui t'y mène.",
      footL:"le saviez-vous", footRlab:"", footRval:"" } },
  { id:"18-comment-faire", label:"18 · Comment faire", cat:"Conseil", type:"list", scene:bg("12,13,15","150,170,196","54%","44%"),
    f:{ kick:"comment faire", title:"POSTER SANS Y PENSER", titleSize:74, cap:"en 3 étapes :", time:"",
      ...L([["1","Choisis 3 thèmes qui te ressemblent."],["2","Prépare 10 stories d'avance."],["3","Programme-les. Terminé."]]) } },
  { id:"19-mon-outil", label:"19 · Mon outil", cat:"Conseil", type:"accent", scene:bg("14,16,15","160,190,170","44%","40%"),
    f:{ pre:"mon outil préféré ·", w1:"NOTION", w2:"& CANVA.", wSize:180,
      cap:"Gratuits, simples, et je te partage mes templates. Lien en bio.", footL:"boîte à outils", time:"" } },
  { id:"20-resultat-client", label:"20 · Résultat client", cat:"Preuve", type:"quote", scene:bg("18,15,12","228,166,104","26%","34%"),
    f:{ kick:"résultat", quote:"+3 CLIENTES EN 30 JOURS.", qSize:112, stars:true,
      cap:"Léa — sans publicité, juste avec ses stories.", footL:"preuve sociale", footRlab:"délai", footRval:"30 j" } },
  { id:"21-avis-client", label:"21 · Avis client", cat:"Preuve", type:"quote", scene:bg("17,16,15","206,184,158","22%","40%"),
    f:{ kick:"avis", quote:"« ENFIN QUELQU'UN QUI REND ÇA SIMPLE. »", qSize:86, stars:true,
      cap:"Sonia — programme 6 semaines.", footL:"avis client", footRlab:"note", footRval:"5/5" } },
  { id:"22-countdown", label:"22 · Compte à rebours", cat:"Offre", type:"accent", scene:bg("20,14,11","234,150,80","50%","44%"),
    f:{ badge:"j - 3", w1:"PLUS QUE", w2:"3 JOURS.", wSize:190,
      cap:"Avant la fermeture des inscriptions. Lien en bio.", footL:"compte à rebours", time:"20:00" } },
  { id:"23-derniere-chance", label:"23 · Dernière chance", cat:"Offre", type:"accent", scene:bg("22,13,11","240,140,74","50%","48%"),
    f:{ badge:"dernière chance", w1:"ÇA FERME", w2:"CE SOIR.", wSize:200,
      cap:"Dernières places pour l'accompagnement. On se lance ?", footL:"clôture", time:"23:59" } },
  { id:"24-ce-que-tu-recois", label:"24 · Ce que tu reçois", cat:"Offre", type:"list", scene:bg("18,15,12","224,164,100","50%","28%"),
    f:{ kick:"inclus dans le pack", title:"CE QUE TU REÇOIS", titleSize:72, cap:"", time:"", ixWide:false,
      ...L([["✓","6 semaines d'accompagnement"],["✓","Templates Notion & Canva"],["✓","Accès au groupe privé"],["✓","Bonus : audit de ton compte"]]) } },
  { id:"25-pose-ta-question", label:"25 · Pose ta question", cat:"Engagement", type:"hero", scene:bg("14,15,17","190,200,214","50%","30%"),
    f:{ useHandle:false, time:"", title:"TA QUESTION ?", titleSize:112,
      sub:"tape ici — je réponds à tout, en story.", def:"", footL:"engagement", footRlab:"boîte", footRval:"ouverte" } },
  { id:"26-quiz", label:"26 · Quiz", cat:"Engagement", type:"quiz", scene:bg("13,14,17","170,184,206","50%","20%"),
    f:{ kick:"quiz", question:"C'EST QUOI, LE PLUS DUR QUAND ON SE LANCE ?", qSize:80,
      ...Q([["A","Trouver des clients"],["B","Oser se montrer"],["C","Rester régulier"]]) } },
  { id:"27-ton-mood", label:"27 · Check-in", cat:"Engagement", type:"quiz", scene:bg("15,15,18","198,200,208","50%","18%"),
    f:{ kick:"check-in", question:"COMMENT TU TE SENS AUJOURD'HUI ?", qSize:82,
      ...Q([["1","À plat, besoin d'un boost"],["2","Ça avance tranquille"],["3","Au top, prêt(e) à tout"]]) } },
  { id:"28-coulisses", label:"28 · Coulisses", cat:"Coulisses", type:"frame", scene:bg("16,14,12","220,142,72","82%","20%"),
    f:{ loc1:"Studio", dnum:"02", dmon:"AM", loc2:"Réel", brackets:true, title:"COULISSES", titleSize:140, dot:true,
      sub:"ce que tu ne vois pas", script:"on construit", word:"EN SILENCE", wordSize:120 } },
  { id:"29-mon-parcours", label:"29 · Mon parcours", cat:"Coulisses", type:"hero", scene:bg("17,15,14","208,170,130","50%","76%"),
    f:{ useHandle:false, time:"", title:"MON PARCOURS", titleSize:96,
      def:"Il y a 2 ans : un job que je détestais et zéro confiance. Aujourd'hui : j'aide d'autres à oser se lancer. Si j'ai pu le faire, tu peux aussi. Vraiment.",
      footL:"mon histoire", footRlab:"depuis", footRval:"2024" } },
  { id:"30-une-journee", label:"30 · Une journée", cat:"Coulisses", type:"list", scene:bg("13,14,16","166,180,200","30%","76%"),
    f:{ kick:"dans ma vie", title:"UNE JOURNÉE", titleSize:120, cap:"de coach indépendante :", time:"", ixWide:true,
      ...L([["06:00","Réveil & sport"],["08:30","Deep work, zéro notif"],["13:00","Appels clients"],["19:00","Contenu du lendemain"]]) } },
];

const editorHTML = `<title>Éditeur — Pack 30 Stories Coach (Édition Nocturne)</title>
<style>
${FONT_CSS}
${STORY_CSS}
:root{--bg:#eef0f4;--card:#fff;--soft:#f6f7f9;--line:#e6e7ec;--ink:#1c1d24;--mut:#8b8d98;--acc:#5b5bf0;--accsoft:#eeeefe}
*{box-sizing:border-box}
.app{background:var(--bg);color:var(--ink);font-family:"Archivo",system-ui,sans-serif;min-height:100vh;padding:16px}
.top{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:11px 15px;box-shadow:0 1px 3px rgba(20,20,40,.05);margin-bottom:16px}
.top .brand{font-family:"Archivo Black",sans-serif;font-size:16px;letter-spacing:-.01em}
.top label{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--mut)}
.top input[type=text]{border:1px solid var(--line);border-radius:9px;padding:8px 10px;font:inherit;font-size:14px;width:150px;background:var(--soft);color:var(--ink)}
.top input[type=color]{width:34px;height:34px;border:1px solid var(--line);border-radius:9px;background:none;padding:2px;cursor:pointer}
.tnav{display:flex;align-items:center;gap:8px}
.tnav select{border:1px solid var(--line);border-radius:9px;padding:8px 10px;font:inherit;font-size:14px;max-width:210px;background:#fff;color:var(--ink)}
#counter{font-size:12px;color:var(--mut);min-width:44px}
.tgrp{display:flex;align-items:center;gap:8px}
.tgrp.right{margin-left:auto}
.btn{background:var(--acc);color:#fff;border:0;border-radius:10px;padding:10px 14px;font:inherit;font-weight:600;font-size:14px;cursor:pointer}
.btn.ghost{background:#fff;color:var(--ink);border:1px solid var(--line)}
.btn:active{transform:translateY(1px)}
.btn:disabled{opacity:.4;cursor:default;transform:none}
.editor{display:flex;gap:16px;align-items:flex-start;justify-content:center;flex-wrap:wrap}
.rail{display:flex;flex-direction:column;gap:8px;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:8px;box-shadow:0 1px 3px rgba(20,20,40,.05)}
.rail .tool{width:46px;height:46px;border:1px solid transparent;border-radius:12px;background:#fff;color:#4a4a55;font-size:18px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center}
.rail .tool:hover{background:var(--soft)}
.rail .tool.on{background:var(--accsoft);border-color:var(--acc);color:var(--acc)}
.canvas{position:relative}
.frame{position:relative;overflow:hidden;border-radius:18px;box-shadow:0 24px 60px -30px rgba(20,20,50,.5);background:#000}
.frame .stage{transform-origin:top left}
.stage [data-move]{cursor:default}
.stage.editing [contenteditable]{cursor:text}
.props{width:288px;flex:none;display:flex;flex-direction:column;gap:12px}
.pcard{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px;box-shadow:0 1px 3px rgba(20,20,40,.05)}
.pcard.off{display:none}
.ptitle{font-size:11px;text-transform:uppercase;letter-spacing:.13em;color:var(--mut);margin:2px 0 11px;font-weight:700}
.ptitle.mt{margin-top:17px}
.prow{display:flex;align-items:center;gap:8px;margin-bottom:9px}
.prow:last-child{margin-bottom:0}
.prow.two label{flex:1}
.prow .fld{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--mut);background:var(--soft);border:1px solid var(--line);border-radius:10px;padding:7px 10px;flex:1}
.prow .fld input{border:0;background:none;font:inherit;font-size:14px;color:var(--ink);width:100%;outline:none;min-width:0}
.prow.swatch>span{font-size:13px;color:var(--ink);flex:1}
.prow input[type=color]{width:36px;height:32px;border:1px solid var(--line);border-radius:9px;background:none;padding:2px;cursor:pointer}
.hex{width:96px;border:1px solid var(--line);border-radius:9px;padding:7px 9px;font:inherit;font-size:13px;background:var(--soft);text-transform:uppercase;color:var(--ink)}
.prow input[type=range]{flex:1;accent-color:var(--acc)}
.prow>.lbl{font-size:13px;color:var(--mut);min-width:76px}
.pseg{display:flex;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff}
.pseg.wide{flex:1}
.pseg button{border:0;background:#fff;color:#5a5a66;height:34px;flex:1;min-width:38px;font:inherit;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.pseg button+button{border-left:1px solid var(--line)}
.pseg button.on{background:var(--acc);color:#fff}
select.wide,.prow select{border:1px solid var(--line);border-radius:10px;padding:9px 10px;font:inherit;font-size:14px;background:#fff;color:var(--ink)}
select.wide{width:100%}
.prow.acts{gap:6px;flex-wrap:wrap}
.prow.acts button{flex:1;background:#fff;border:1px solid var(--line);border-radius:10px;height:36px;font:inherit;font-size:13px;cursor:pointer;color:var(--ink);min-width:64px}
.prow.acts button:hover{background:var(--soft)}
.prow.acts button.on{background:var(--accsoft);border-color:var(--acc);color:var(--acc)}
.phint{font-size:12px;color:var(--mut);line-height:1.55;padding:0 4px}
.phint b{color:var(--ink)}
#pTextFields{display:flex;flex-direction:column;gap:8px;margin-bottom:4px}
.ptext{width:100%;border:1px solid var(--line);border-radius:10px;padding:9px 11px;font:inherit;font-size:14px;background:var(--soft);color:var(--ink);resize:vertical;line-height:1.35;min-height:40px}
.ptext:focus{outline:none;border-color:var(--acc);background:#fff}
#selbox{position:fixed;z-index:55;border:1.5px solid var(--acc);pointer-events:none;display:none;transform-origin:center center}
#selbox.on{display:block}
#selbox .hd{position:absolute;width:14px;height:14px;background:#fff;border:2px solid var(--acc);border-radius:4px;pointer-events:auto;transform:translate(-50%,-50%);box-shadow:0 1px 4px rgba(20,20,50,.3)}
#selbox .hd.nw{left:0;top:0;cursor:nwse-resize}
#selbox .hd.ne{left:100%;top:0;cursor:nesw-resize}
#selbox .hd.sw{left:0;top:100%;cursor:nesw-resize}
#selbox .hd.se{left:100%;top:100%;cursor:nwse-resize}
#selbox .hd.rot{left:50%;top:-30px;border-radius:50%;background:var(--acc);cursor:grab}
#selbox .hd.rot::after{content:"";position:absolute;left:50%;top:11px;width:2px;height:18px;background:var(--acc);transform:translateX(-50%)}
.modal{position:fixed;inset:0;background:rgba(15,15,25,.7);display:none;align-items:center;justify-content:center;flex-direction:column;gap:14px;z-index:99;padding:22px}
.modal.on{display:flex}
.modal img{max-width:min(90vw,380px);max-height:72vh;border-radius:12px;box-shadow:0 20px 50px -20px #000}
.modal p{color:#fff;font-size:14px;text-align:center;max-width:420px;line-height:1.5}
.modal .x{position:absolute;top:14px;right:18px;color:#fff;font-size:30px;cursor:pointer;background:none;border:0}
@media(max-width:920px){.editor{flex-direction:column;align-items:center}.rail{flex-direction:row;flex-wrap:wrap;justify-content:center}.props{width:min(94vw,430px)}}
</style>

<div class="app">
  <header class="top">
    <div class="brand">Studio · Stories</div>
    <div class="tnav">
      <button class="btn ghost" id="prev">◀</button>
      <select id="pick"></select>
      <button class="btn ghost" id="next">▶</button>
      <span id="counter"></span>
    </div>
    <div class="tgrp">
      <button class="btn ghost" id="undoBtn" title="Annuler (Ctrl+Z)">↶</button>
      <button class="btn ghost" id="redoBtn" title="Rétablir (Ctrl+Maj+Z)">↷</button>
    </div>
    <label>@ <input id="handle" type="text" value="@votre.compte" /></label>
    <label>Accent <input id="accent" type="color" value="#e0913f" /></label>
    <div class="tgrp right">
      <button class="btn" id="dl">⬇ Télécharger</button>
      <button class="btn ghost" id="dlall">Les 30</button>
      <button class="btn ghost" id="wipe" title="Effacer toutes les modifications">↺</button>
    </div>
  </header>

  <div class="editor">
    <div class="rail">
      <button class="tool on" data-tool="select" title="Sélectionner / déplacer">⌖</button>
      <button class="tool" id="addText" title="Ajouter du texte">T</button>
      <button class="tool" id="addRect" title="Ajouter une bande / forme">▢</button>
      <button class="tool" id="addLine" title="Ajouter un trait">▁</button>
      <button class="tool" id="addImg" title="Importer une image (logo, photo, sticker)">🖼</button>
      <button class="tool" id="railPhoto" title="Photo en fond de la story">▦</button>
      <input id="imgfile" type="file" accept="image/*" hidden />
      <input id="imgel" type="file" accept="image/*" hidden />
    </div>

    <div class="canvas"><div class="frame" id="frame"><div class="stage" id="stage"></div></div></div>

    <aside class="props">
      <div class="pcard off" id="pcardSel">
        <div class="ptitle" id="pContTitle">Contenu</div>
        <div id="pTextFields"></div>
        <div class="ptitle mt">Position &amp; taille</div>
        <div class="prow"><div class="pseg wide" id="segBlock"><button data-a="left" title="Aligner à gauche">⇤</button><button data-a="center" title="Centrer horizontalement">⋮</button><button data-a="right" title="Aligner à droite">⇥</button><button data-a="mid" title="Centrer verticalement">⋯</button></div></div>
        <div class="prow two"><div class="fld">X<input id="pX" type="number" /></div><div class="fld">Y<input id="pY" type="number" /></div></div>
        <div class="prow two"><div class="fld">Taille %<input id="pSizeN" type="number" /></div><div class="fld">Rotation °<input id="pRotN" type="number" /></div></div>
        <div class="ptitle mt">Texte</div>
        <div class="prow"><select id="pFont" class="wide"><option value="">Police d'origine</option><option value="'Archivo Black',sans-serif">Gras (Archivo Black)</option><option value="'Anton',sans-serif">Condensé (Anton)</option><option value="'Dancing Script',cursive">Script (Dancing)</option><option value="'Archivo',sans-serif">Simple (Archivo)</option></select></div>
        <div class="prow"><select id="pWeight"><option value="">Graisse</option><option value="400">Normal</option><option value="900">Gras</option></select>
          <div class="pseg" style="flex:1"><button id="pItal" title="Italique"><i>I</i></button><button id="pUpper" title="Majuscules">AA</button></div></div>
        <div class="prow"><div class="pseg wide" id="segText"><button data-ta="left">⇤</button><button data-ta="center">≡</button><button data-ta="right">⇥</button></div></div>
        <div class="ptitle mt">Couleur</div>
        <div class="prow swatch"><span>Texte</span><input id="pColor" type="color" /><input id="pColorHex" class="hex" type="text" /></div>
        <div class="prow swatch"><span>Surlignage</span><input id="pBg" type="color" /><input id="pBgHex" class="hex" type="text" /><button class="pseg" id="pBgOff" style="min-width:34px;height:32px;border-radius:9px;cursor:pointer" title="Retirer">✕</button></div>
        <div class="ptitle mt">Effets</div>
        <div class="prow"><span class="lbl">Opacité</span><input id="pOp" type="range" min="0" max="1" step="0.05" /></div>
        <div class="prow"><span class="lbl">Interlettre</span><input id="pLs" type="range" min="-0.05" max="0.4" step="0.01" /></div>
        <div class="prow"><span class="lbl">Interligne</span><input id="pLh" type="range" min="0.8" max="2" step="0.05" /></div>
        <div class="prow acts"><button id="pDup">⎘ Dupliquer</button><button id="pDel">🗑 Supprimer</button><button id="pReset">⟲ Reset</button></div>
      </div>

      <div class="pcard" id="pcardBg">
        <div class="ptitle">Fond de la story</div>
        <div class="prow swatch"><span>Couleur</span><input id="bgcol" type="color" value="#101014" /><button class="pseg" id="bgoff" style="min-width:34px;height:32px;border-radius:9px;cursor:pointer" title="Fond d'origine">✕</button></div>
        <div class="prow" id="darkgrp" style="display:none"><span class="lbl">Assombrir</span><input id="dark" type="range" min="0.25" max="0.9" step="0.05" value="0.65" /></div>
        <div class="prow acts"><button id="grainbtn" class="on">Grain</button><button id="imgdel" style="display:none">Retirer photo</button><button id="resetall">⟲ positions</button></div>
      </div>

      <div class="phint">Clique un élément pour le <b>sélectionner</b> · glisse-le pour le <b>déplacer</b> · <b>double-clic</b> pour écrire · poignées pour <b>redimensionner / tourner</b>. Tout est sauvegardé dans ton navigateur.</div>
    </aside>
  </div>
</div>

<div id="selbox">
  <span class="hd rot" data-h="rot" title="Tourner"></span>
  <span class="hd nw" data-h="nw"></span><span class="hd ne" data-h="ne"></span>
  <span class="hd sw" data-h="sw"></span><span class="hd se" data-h="se"></span>
</div>

<div class="modal" id="modal">
  <button class="x" id="mx">×</button>
  <img id="mimg" alt="story exportée" />
  <p>Si le téléchargement ne se lance pas tout seul : <b>clic droit sur l'image → « Enregistrer sous »</b>.</p>
</div>

<script>
const FONT_CSS = ${JSON.stringify(FONT_CSS)};
const STORY_CSS = ${JSON.stringify(STORY_CSS)};
const STORIES = ${JSON.stringify(S)};
let handle = "@votre.compte", accent = "#e0913f", idx = 0;

const esc = s => String(s??"").replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const nl = s => esc(s).replace(/\\\\n/g,'<br>');
const H = () => '<span class="js-handle">'+esc(handle)+'</span>';
function ce(st,k,cls,extra){ return '<div class="'+cls+'" '+(extra||'')+' contenteditable="true" data-k="'+k+'">'+nl(st.f[k])+'</div>'; }
function ceI(st,k,cls){ return '<span class="'+cls+'" style="display:inline;font-weight:700" contenteditable="true" data-k="'+k+'">'+esc(st.f[k])+'</span>'; }
function spn(st,k,extra){ return '<span '+(extra||'')+' contenteditable="true" data-k="'+k+'">'+esc(st.f[k])+'</span>'; }

// ---------- archétypes ----------
function heroA(st){ const f=st.f;
  const brand = f.useHandle ? '<div class="brand">archive · '+H()+'</div>' : '';
  const time = f.time ? ce(st,'time','time') : '';
  const title = '<div class="big" style="font-size:'+(f.titleSize||145)+'px;margin-top:20px" contenteditable="true" data-k="title">'+esc(f.title)+'</div>';
  const sub = f.sub ? ce(st,'sub','cap',' style="margin-top:18px;font-size:30px;color:rgba(255,255,255,.62)"') : '';
  const center = '<div style="top:760px;left:0;right:0;text-align:center">'+time+title+sub+'</div>';
  const body = f.def ? ce(st,'def','pad def',' style="top:1080px"') : '';
  let foot='';
  if(f.footL!=null){ const R = f.footRlab ? '<div class="tag">'+esc(f.footRlab)+' : '+ceI(st,'footRval','amber')+'</div>' : '';
    foot='<div class="pad" style="top:1320px;display:flex;justify-content:space-between;align-items:flex-end">'+ce(st,'footL','tag')+R+'</div>'; }
  return brand+center+body+foot;
}
function quoteA(st){ const f=st.f;
  const stars = f.stars ? '<div class="pad stars" style="top:1000px">★★★★★</div>' : '';
  const R = f.footRlab ? '<div class="tag">'+esc(f.footRlab)+' : '+ceI(st,'footRval','amber')+'</div>' : '';
  return ce(st,'kick','pad kicker',' style="top:520px"')
    + ce(st,'quote','pad big',' style="top:600px;font-size:'+(f.qSize||110)+'px;line-height:1.04"')
    + stars + ce(st,'cap','pad cap',' style="top:1080px"')
    + '<div class="pad" style="top:1560px;display:flex;justify-content:space-between;align-items:flex-end">'+ce(st,'footL','tag')+R+'</div>';
}
function stackA(st){ const f=st.f; const cls=f.tall===false?'big':'tall'; const sz=f.wSize||280;
  const star = f.star ? ' <span style="color:#fff">★</span>' : '';
  const sub = f.sub ? ce(st,'sub','pad sub',' style="top:474px"') : '';
  return ce(st,'kick','pad kicker',' style="top:430px"') + sub
    + '<div class="'+cls+' amber" style="top:560px;left:70px;font-size:'+sz+'px">'+spn(st,'w1')+star+'</div>'
    + '<div class="'+cls+'" style="top:1180px;left:70px;font-size:'+sz+'px">'+spn(st,'w2')+'</div>'
    + ce(st,'time','time',' style="top:1560px;left:0;right:0;text-align:center"');
}
function dateA(st){ const f=st.f;
  return '<div class="brand">archive · '+H()+'</div>'
    + '<div style="top:520px;left:0;right:0;text-align:center">'+ce(st,'month','mlabel')
    + '<div class="strip" style="margin-top:26px">'+ce(st,'d1','d off')+ce(st,'d2','d off')+ce(st,'d3','d on')+ce(st,'d4','d')+ce(st,'d5','d off')+'</div>'
    + ce(st,'day','mlabel',' style="margin-top:22px;color:rgba(255,255,255,.55)"')+'</div>'
    + '<div style="top:1140px;left:0;right:0;text-align:center">'+ce(st,'title','big',' style="font-size:150px"')+ce(st,'script','script amber',' style="font-size:110px;margin-top:-6px"')+'</div>'
    + ce(st,'cap','pad cap',' style="top:1500px;text-align:center"');
}
function accentA(st){ const f=st.f; const sz=f.wSize||210; const badge=!!f.badge;
  const top = badge
    ? '<div style="top:740px;left:80px"><span class="badge"><i></i>'+spn(st,'badge')+'</span></div>'
    : ce(st,'pre','pad cap',' style="top:800px;font-size:34px;color:rgba(255,255,255,.7)"');
  const w1Y=badge?820:844, w2Y=badge?1050:1044, capY=badge?1340:1320;
  return top
    + ce(st,'w1','big pad',' style="top:'+w1Y+'px;font-size:'+sz+'px"')
    + ce(st,'w2','big amber pad',' style="top:'+w2Y+'px;font-size:'+sz+'px"')
    + ce(st,'cap','pad cap',' style="top:'+capY+'px"')
    + '<div class="pad" style="top:1560px;display:flex;justify-content:space-between;align-items:flex-end">'+ce(st,'footL','tag')+(f.time!=null?ce(st,'time','time'):'')+'</div>';
}
function frameA(st){ const f=st.f;
  const header='<div class="hdr"><span class="ln"></span>'+spn(st,'loc1')
    +'<span class="mid">'+spn(st,'dnum')+'<small>'+spn(st,'dmon')+'</small></span>'+spn(st,'loc2')+'<span class="ln"></span></div>';
  const brk = f.brackets ? '<div class="brk tl" style="top:560px;left:150px"></div><div class="brk tr" style="top:560px;right:150px"></div><div class="brk bl" style="top:1160px;left:150px"></div><div class="brk br" style="top:1160px;right:150px"></div>' : '';
  const dot = f.dot ? '<span class="dot">.</span>' : '';
  let main, bottomY;
  if(f.time!=null && f.time!==""){
    main='<div style="top:820px;left:0;right:0;text-align:center">'+ce(st,'time','time')+'<div class="big" style="font-size:'+(f.titleSize||250)+'px;margin-top:14px">'+spn(st,'title')+dot+'</div></div>';
    bottomY=1240;
  } else {
    const sub=f.sub?ce(st,'sub','cap',' style="margin-top:20px;font-size:30px;color:rgba(255,255,255,.6)"'):'';
    main='<div style="top:720px;left:0;right:0;text-align:center"><div class="big" style="font-size:'+(f.titleSize||150)+'px">'+spn(st,'title')+dot+'</div>'+sub+'</div>';
    bottomY=1480;
  }
  const bottom = f.word
    ? '<div style="top:'+bottomY+'px;left:0;right:0;text-align:center">'+ce(st,'script','script amber',' style="font-size:96px"')+ce(st,'word','big',' style="font-size:'+(f.wordSize||120)+'px;margin-top:-8px"')+'</div>'
    : '<div style="top:'+bottomY+'px;left:0;right:0;text-align:center">'+ce(st,'script','script amber',' style="font-size:92px"')+ce(st,'cap','cap',' style="font-size:32px;margin-top:6px;color:rgba(255,255,255,.7)"')+'</div>';
  return header+brk+main+bottom;
}
function pollA(st){ const f=st.f;
  return ce(st,'kick','pad kicker',' style="top:520px"')
    + '<div class="tall pad" style="top:600px;font-size:200px;line-height:.82">'+spn(st,'t1')+'<br>'+spn(st,'t2')+'</div>'
    + '<div class="pad poll" style="top:1150px"><div class="opt" contenteditable="true" data-k="optA">'+nl(f.optA)+'</div><div class="vs">VS</div><div class="opt" contenteditable="true" data-k="optB">'+nl(f.optB)+'</div></div>'
    + ce(st,'cap','pad cap',' style="top:1440px;text-align:center"')
    + '<div style="top:1600px;left:0;right:0;text-align:center" class="tag">engagement</div>';
}
function quizA(st){ const f=st.f;
  let rows=''; for(let i=0;i<f.on;i++){ rows+='<div class="row qopt"><span class="ix">'+spn(st,'q'+i+'a')+'</span><span class="tx">'+spn(st,'q'+i+'b')+'</span></div>'; }
  return ce(st,'kick','pad kicker',' style="top:460px"')
    + '<div class="pad big" style="top:560px;font-size:'+(f.qSize||82)+'px;line-height:1.05">'+spn(st,'question')+'</div>'
    + '<div class="pad list" style="top:1060px">'+rows+'</div>';
}
function listA(st){ const f=st.f; const ts=f.titleSize||118; const capY=600+ts+24; const rowsY=capY+(f.cap?90:40);
  let rows=''; for(let i=0;i<f.rn;i++){ rows+='<div class="row"><span class="ix" '+(f.ixWide?'style="min-width:150px"':'')+' contenteditable="true" data-k="r'+i+'a">'+esc(f['r'+i+'a'])+'</span><span class="tx" contenteditable="true" data-k="r'+i+'b">'+esc(f['r'+i+'b'])+'</span></div>'; }
  const cap = f.cap ? ce(st,'cap','pad cap',' style="top:'+capY+'px"') : '';
  const time = f.time ? ce(st,'time','time',' style="top:1580px;left:0;right:0;text-align:center"') : '';
  return ce(st,'kick','pad kicker',' style="top:500px"')
    + '<div class="pad big" style="top:600px;font-size:'+ts+'px;line-height:.9">'+spn(st,'title')+'</div>'
    + cap + '<div class="pad list" style="top:'+rowsY+'px">'+rows+'</div>' + time;
}
const RENDER = { hero:heroA, quote:quoteA, stack:stackA, date:dateA, accent:accentA, frame:frameA, poll:pollA, quiz:quizA, list:listA };
function renderExtras(st){ return (st.f._extra||[]).map((ex,i)=>{
  if(ex.hidden) return '';
  const pos='top:'+ex.y+'px;left:'+ex.x+'px';
  if(ex.kind==='text') return '<div class="ex-el" data-ex="'+i+'" contenteditable="false" data-k="_extra.'+i+'.text" style="'+pos+';width:'+ex.w+'px;font-family:'+(ex.font||"\\'Archivo Black\\',sans-serif")+';font-size:'+ex.size+'px;color:#fff;text-transform:uppercase;line-height:.9;letter-spacing:-.02em">'+nl(ex.text)+'</div>';
  if(ex.kind==='rect') return '<div class="ex-el" data-ex="'+i+'" style="'+pos+';width:'+ex.w+'px;height:'+ex.h+'px;background:'+ex.color+';border-radius:'+(ex.r||0)+'px"></div>';
  if(ex.kind==='line') return '<div class="ex-el" data-ex="'+i+'" style="'+pos+';width:'+ex.w+'px;height:'+ex.h+'px;background:'+ex.color+'"></div>';
  if(ex.kind==='img') return '<img class="ex-el" data-ex="'+i+'" src="'+ex.src+'" style="'+pos+';width:'+ex.w+'px;height:auto;display:block" />';
  if(ex.kind==='html') return '<div class="ex-el" data-ex="'+i+'" style="top:0;left:0;transform:translate(40px,40px)">'+ex.html+'</div>';
  return ''; }).join(''); }
function render(st){
  const photo = st.f._img ? '<div class="photo" style="background-image:url('+st.f._img+')"></div>' : '';
  return photo + RENDER[st.type](st) + renderExtras(st);
}
function applyBg(el, st){
  el.style.setProperty('--amber', accent);
  if(st.f._img){ const d = st.f._dark ?? 0.65;
    el.style.background = 'radial-gradient(120% 90% at 50% 20%, rgba(0,0,0,'+(d*0.55)+'), transparent 60%), linear-gradient(180deg, rgba(6,6,7,'+(d*0.72)+'), rgba(6,6,7,'+d+'))';
  } else if(st.f._bgcol){ el.style.background = 'linear-gradient(180deg, '+st.f._bgcol+', #060607)'; }
  else { el.style.background = st.scene; }
}

const stage=document.getElementById('stage'), frame=document.getElementById('frame'), pick=document.getElementById('pick');
const counter=document.getElementById('counter');
STORIES.forEach((s,i)=>{ const o=document.createElement('option'); o.value=i; o.textContent=s.label; pick.appendChild(o); });

function paint(){
  const st=STORIES[idx];
  applyBg(stage, st);
  stage.innerHTML = render(st);
  pick.value=idx;
  counter.textContent = (idx+1)+' / '+STORIES.length;
  stage.querySelectorAll('[data-k]').forEach(el=>{
    el.addEventListener('input', ()=>{ const v=el.innerHTML.replace(/<br\\s*\\/?>/gi,'\\\\n').replace(/<[^>]+>/g,''); const k=el.dataset.k;
      if(k.indexOf('_extra.')===0){ const i=+k.split('.')[1]; if(st.f._extra&&st.f._extra[i]) st.f._extra[i].text=v; } else st.f[k]=v; save(); });
  });
  stage.querySelectorAll('[contenteditable]').forEach(e=>e.contentEditable='false');
  refreshImg();
  applyAdj(stage, st);
  stage.classList.toggle('nograin', !grainOn); stage.classList.remove('editing'); editing=null;
  document.getElementById('bgcol').value = st.f._bgcol || '#101014';
  document.getElementById('grainbtn').classList.toggle('on', grainOn);
  clearSel();
  fit();
}
function fit(){ const w=Math.min(frame.parentElement.clientWidth,460); const s=w/1080;
  frame.style.width=w+'px'; frame.style.height=(1920*s)+'px'; stage.style.transform='scale('+s+')'; }
window.addEventListener('resize', fit);

document.getElementById('handle').addEventListener('input',e=>{ handle=e.target.value||"@"; paint(); save(); });
document.getElementById('accent').addEventListener('input',e=>{ accent=e.target.value; document.documentElement.style.setProperty('--acc',accent); stage.style.setProperty('--amber',accent); save(); });
document.getElementById('prev').onclick=()=>{ idx=(idx+STORIES.length-1)%STORIES.length; paint(); };
document.getElementById('next').onclick=()=>{ idx=(idx+1)%STORIES.length; paint(); };
pick.onchange=e=>{ idx=+e.target.value; paint(); };

// ---- image ----
const imgfile=document.getElementById('imgfile'), imgdel=document.getElementById('imgdel'), darkgrp=document.getElementById('darkgrp'), darkr=document.getElementById('dark');
imgfile.onchange=e=>{ const file=e.target.files[0]; if(!file) return; const fr=new FileReader();
  fr.onload=()=>resize(fr.result, url=>{ STORIES[idx].f._img=url; if(STORIES[idx].f._dark==null) STORIES[idx].f._dark=0.65; paint(); }); fr.readAsDataURL(file); e.target.value=''; };
imgdel.onclick=()=>{ delete STORIES[idx].f._img; paint(); };
darkr.oninput=e=>{ STORIES[idx].f._dark=+e.target.value; applyBg(stage,STORIES[idx]); save(); };
function refreshImg(){ const has=!!STORIES[idx].f._img; imgdel.style.display=has?'':'none'; darkgrp.style.display=has?'':'none';
  if(has) darkr.value=STORIES[idx].f._dark??0.65; }
function resize(dataURL, cb, mime){ const im=new Image(); im.onload=()=>{ const M=1280; let w=im.width,h=im.height;
  const r=Math.min(1, M/Math.max(w,h)); w=Math.round(w*r); h=Math.round(h*r);
  const c=document.createElement('canvas'); c.width=w; c.height=h; c.getContext('2d').drawImage(im,0,0,w,h);
  cb(mime==='png'? c.toDataURL('image/png') : c.toDataURL('image/jpeg',0.85), {w:im.width,h:im.height}); }; im.src=dataURL; }

// ---- export PNG ----
function toPNG(st){ return new Promise((res,rej)=>{
  const off=document.createElement('div'); off.innerHTML='<div class="stage" xmlns="http://www.w3.org/1999/xhtml"></div>';
  const st2=off.firstChild; applyBg(st2,st); st2.style.width='1080px'; st2.style.height='1920px'; st2.style.transform='none';
  if(!grainOn) st2.classList.add('nograin');
  st2.innerHTML=render(st);
  applyAdj(st2, st);
  const xml=new XMLSerializer().serializeToString(st2);
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><foreignObject x="0" y="0" width="1080" height="1920"><style>'+FONT_CSS+STORY_CSS+'</style>'+xml+'</foreignObject></svg>';
  const img=new Image(); img.onload=()=>{ const c=document.createElement('canvas'); c.width=1080; c.height=1920; c.getContext('2d').drawImage(img,0,0); c.toBlob(b=>res(b),'image/png'); };
  img.onerror=rej; img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}); }
function saveBlob(b,name){ const u=URL.createObjectURL(b); const a=document.createElement('a'); a.href=u; a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(u),4000); }
const modal=document.getElementById('modal'), mimg=document.getElementById('mimg');
document.getElementById('mx').onclick=()=>modal.classList.remove('on');
document.getElementById('dl').onclick=async()=>{ const st=STORIES[idx]; const b=await toPNG(st); saveBlob(b,st.id+'.png'); mimg.src=URL.createObjectURL(b); modal.classList.add('on'); };
document.getElementById('dlall').onclick=async()=>{ for(const st of STORIES){ const b=await toPNG(st); saveBlob(b,st.id+'.png'); await new Promise(r=>setTimeout(r,300)); } };

// ---- studio d'édition (style éditeur clair) ----
let selEl=null, selKey=null, grainOn=true, editing=null;
const selbox=document.getElementById('selbox'), pcardSel=document.getElementById('pcardSel');
function id(x){ return document.getElementById(x); }
function movables(el){ return [...el.children].filter(c=>!c.classList.contains('photo') && !c.classList.contains('brk')); }
function setAll(el,prop,val){ el.style[prop]=val; el.querySelectorAll('*').forEach(n=>n.style[prop]=val); }
function applyOne(el,a){
  el.style.transform='translate('+(a.dx||0)+'px,'+(a.dy||0)+'px)'+(a.rot?' rotate('+a.rot+'deg)':'')+' scale('+(a.sc||1)+')';
  el.style.transformOrigin='center center';
  el.style.display=a.hidden?'none':''; el.style.opacity=(a.op!=null?a.op:'');
  if(a.align) el.style.textAlign=a.align;
  if(a.ls!=null) setAll(el,'letterSpacing',a.ls+'em');
  if(a.lh!=null) setAll(el,'lineHeight',a.lh);
  if(a.upper) setAll(el,'textTransform','uppercase');
  if(a.weight) setAll(el,'fontWeight',a.weight);
  if(a.italic) setAll(el,'fontStyle','italic');
  if(a.color) setAll(el,'color',a.color);
  if(a.font) setAll(el,'fontFamily',a.font);
  if(a.bg){ el.style.background=a.bg; el.style.padding='.12em .4em'; el.style.borderRadius='12px'; }
}
function applyAdj(el,st){ const adj=st.f._adj||{}; movables(el).forEach((c,i)=>{ c.dataset.move='m'+i; const a=adj['m'+i]; if(a) applyOne(c,a); }); }
function getAdj(key){ const f=STORIES[idx].f; f._adj=f._adj||{}; return f._adj[key]=f._adj[key]||{dx:0,dy:0,sc:1}; }
function scaleNow(){ return (frame.clientWidth||460)/1080; }

function clearSel(){ if(selEl) selEl.classList.remove('mv-sel'); selEl=null; selKey=null; selbox.classList.remove('on'); pcardSel.classList.add('off'); }
function reselect(key){ const el=[...stage.children].find(c=>c.dataset.move===key); if(el) select(el); }
function select(el){ if(selEl) selEl.classList.remove('mv-sel'); selEl=el; selKey=el.dataset.move; el.classList.add('mv-sel'); pcardSel.classList.remove('off'); syncProps(); buildTextFields(); drawSel(); }
function buildTextFields(){ const cont=id('pTextFields'); cont.innerHTML='';
  const nodes = selEl.matches('[data-k]') ? [selEl] : [...selEl.querySelectorAll('[data-k]')];
  id('pContTitle').style.display = nodes.length? '' : 'none'; cont.style.display = nodes.length? '' : 'none';
  nodes.forEach(n=>{ const ta=document.createElement('textarea'); ta.className='ptext'; ta.rows=nodes.length>1?1:2;
    ta.value = n.innerHTML.replace(/<br\\s*\\/?>/gi,'\\n').replace(/<[^>]+>/g,'');
    ta.oninput=()=>{ n.innerHTML=esc(ta.value).replace(/\\n/g,'<br>'); n.dispatchEvent(new Event('input')); drawSel(); };
    cont.appendChild(ta); }); }
function drawSel(){ if(!selEl){ selbox.classList.remove('on'); return; }
  const a=(STORIES[idx].f._adj||{})[selKey]||{}; const s=scaleNow();
  const rect=selEl.getBoundingClientRect(); const cx=rect.left+rect.width/2, cy=rect.top+rect.height/2;
  const w=selEl.offsetWidth*s*(a.sc||1), h=selEl.offsetHeight*s*(a.sc||1);
  selbox.style.left=(cx-w/2)+'px'; selbox.style.top=(cy-h/2)+'px'; selbox.style.width=w+'px'; selbox.style.height=h+'px';
  selbox.style.transform='rotate('+(a.rot||0)+'deg)'; selbox.classList.add('on'); }
function segSet(sid,attr,val){ id(sid).querySelectorAll('button').forEach(b=>b.classList.toggle('on', b.dataset[attr]===val)); }
function syncProps(){ if(!selEl) return; const a=(STORIES[idx].f._adj||{})[selKey]||{};
  id('pX').value=Math.round(selEl.offsetLeft+(a.dx||0)); id('pY').value=Math.round(selEl.offsetTop+(a.dy||0));
  id('pSizeN').value=Math.round((a.sc||1)*100); id('pRotN').value=Math.round(a.rot||0);
  id('pFont').value=a.font||''; id('pWeight').value=a.weight?String(a.weight):'';
  id('pItal').classList.toggle('on',!!a.italic); id('pUpper').classList.toggle('on',!!a.upper);
  segSet('segText','ta',a.align||'');
  id('pColor').value=a.color||'#ffffff'; id('pColorHex').value=(a.color||'#FFFFFF').toUpperCase();
  id('pBg').value=a.bg||'#e0913f'; id('pBgHex').value=(a.bg||'').toUpperCase();
  id('pOp').value=a.op!=null?a.op:1; id('pLs').value=a.ls!=null?a.ls:0; id('pLh').value=a.lh!=null?a.lh:1.1; }

// position & taille
id('pX').onchange=e=>{ if(!selEl)return; const a=getAdj(selKey); a.dx=(+e.target.value||0)-selEl.offsetLeft; applyOne(selEl,a); drawSel(); save(); };
id('pY').onchange=e=>{ if(!selEl)return; const a=getAdj(selKey); a.dy=(+e.target.value||0)-selEl.offsetTop; applyOne(selEl,a); drawSel(); save(); };
id('pSizeN').onchange=e=>{ if(!selEl)return; const a=getAdj(selKey); a.sc=Math.max(.1,(+e.target.value||100)/100); applyOne(selEl,a); drawSel(); save(); };
id('pRotN').onchange=e=>{ if(!selEl)return; const a=getAdj(selKey); a.rot=(+e.target.value||0); applyOne(selEl,a); drawSel(); save(); };
id('segBlock').querySelectorAll('button').forEach(b=>b.onclick=()=>{ if(!selEl)return; const a=getAdj(selKey); const w=selEl.offsetWidth,h=selEl.offsetHeight,d=b.dataset.a;
  if(d==='left') a.dx=-selEl.offsetLeft; else if(d==='right') a.dx=(1080-w)-selEl.offsetLeft;
  else if(d==='center') a.dx=((1080-w)/2)-selEl.offsetLeft; else if(d==='mid') a.dy=((1920-h)/2)-selEl.offsetTop;
  applyOne(selEl,a); drawSel(); syncProps(); save(); });
// texte
id('pFont').onchange=e=>{ if(!selEl)return; const k=selKey,a=getAdj(k); if(e.target.value){a.font=e.target.value; setAll(selEl,'fontFamily',a.font);} else {delete a.font; paint(); reselect(k);} save(); };
id('pWeight').onchange=e=>{ if(!selEl)return; const k=selKey,a=getAdj(k); if(e.target.value)a.weight=+e.target.value; else delete a.weight; paint(); reselect(k); save(); };
id('pItal').onclick=()=>{ if(!selEl)return; const k=selKey,a=getAdj(k); if(a.italic)delete a.italic; else a.italic=true; paint(); reselect(k); save(); };
id('pUpper').onclick=()=>{ if(!selEl)return; const k=selKey,a=getAdj(k); if(a.upper)delete a.upper; else a.upper=true; paint(); reselect(k); save(); };
id('segText').querySelectorAll('button').forEach(b=>b.onclick=()=>{ if(!selEl)return; const a=getAdj(selKey); a.align=b.dataset.ta; applyOne(selEl,a); segSet('segText','ta',a.align); save(); });
// couleur
id('pColor').oninput=e=>{ if(!selEl)return; const a=getAdj(selKey); a.color=e.target.value; setAll(selEl,'color',a.color); id('pColorHex').value=a.color.toUpperCase(); save(); };
id('pColorHex').onchange=e=>{ if(!selEl)return; let v=e.target.value.trim(); if(v&&v[0]!=='#')v='#'+v; if(/^#[0-9a-fA-F]{6}$/.test(v)){ const a=getAdj(selKey); a.color=v; setAll(selEl,'color',v); id('pColor').value=v; save(); } };
function setBg(v){ const a=getAdj(selKey); a.bg=v; selEl.style.background=v; selEl.style.padding='.12em .4em'; selEl.style.borderRadius='12px'; save(); }
id('pBg').oninput=e=>{ if(!selEl)return; setBg(e.target.value); id('pBgHex').value=e.target.value.toUpperCase(); };
id('pBgHex').onchange=e=>{ if(!selEl)return; let v=e.target.value.trim(); if(v&&v[0]!=='#')v='#'+v; if(/^#[0-9a-fA-F]{6}$/.test(v)){ setBg(v); id('pBg').value=v; } };
id('pBgOff').onclick=()=>{ if(!selEl)return; const a=getAdj(selKey); delete a.bg; selEl.style.background=''; selEl.style.padding=''; id('pBgHex').value=''; save(); };
// effets
id('pOp').oninput=e=>{ if(!selEl)return; const a=getAdj(selKey); a.op=+e.target.value; applyOne(selEl,a); save(); };
id('pLs').oninput=e=>{ if(!selEl)return; const a=getAdj(selKey); a.ls=+e.target.value; applyOne(selEl,a); drawSel(); save(); };
id('pLh').oninput=e=>{ if(!selEl)return; const a=getAdj(selKey); a.lh=+e.target.value; applyOne(selEl,a); drawSel(); save(); };
// actions
id('pDup').onclick=()=>{ if(!selEl)return; const c=selEl.cloneNode(true); c.removeAttribute('data-move'); c.classList.remove('mv-sel');
  c.removeAttribute('data-k'); c.removeAttribute('contenteditable');
  c.querySelectorAll('[data-k],[contenteditable]').forEach(n=>{ n.removeAttribute('data-k'); n.removeAttribute('contenteditable'); });
  const st=STORIES[idx]; st.f._extra=st.f._extra||[]; st.f._extra.push({kind:'html',x:0,y:0,html:c.outerHTML}); save(); paint(); };
id('pDel').onclick=()=>{ if(!selEl)return; const a=getAdj(selKey); a.hidden=true; applyOne(selEl,a); clearSel(); save(); };
id('pReset').onclick=()=>{ if(!selEl)return; const k=selKey; if(STORIES[idx].f._adj) delete STORIES[idx].f._adj[k]; paint(); reselect(k); save(); };

// rail : ajout d'éléments + photo
function addExtra(o){ const st=STORIES[idx]; st.f._extra=st.f._extra||[]; st.f._extra.push(o); save(); paint(); reselect('m'+(movables(stage).length-1)); }
id('addText').onclick=()=>addExtra({kind:'text',x:120,y:820,w:840,size:96,text:'TON TEXTE'});
id('addRect').onclick=()=>addExtra({kind:'rect',x:140,y:900,w:800,h:180,color:'rgba(224,145,63,.92)',r:0});
id('addLine').onclick=()=>addExtra({kind:'line',x:140,y:960,w:520,h:6,color:'#ffffff'});
id('addImg').onclick=()=>id('imgel').click();
id('imgel').onchange=e=>{ const file=e.target.files[0]; if(!file) return; const isPng=/png/i.test(file.type); const fr=new FileReader();
  fr.onload=()=>resize(fr.result, (url,dim)=>{ const w=Math.min(700, dim.w||600); addExtra({kind:'img',x:Math.round((1080-w)/2),y:780,w:w,src:url}); }, isPng?'png':undefined); fr.readAsDataURL(file); e.target.value=''; };
id('railPhoto').onclick=()=>imgfile.click();
// fond & grain
id('bgcol').oninput=e=>{ STORIES[idx].f._bgcol=e.target.value; applyBg(stage,STORIES[idx]); save(); };
id('bgoff').onclick=()=>{ delete STORIES[idx].f._bgcol; applyBg(stage,STORIES[idx]); save(); };
id('grainbtn').onclick=()=>{ grainOn=!grainOn; id('grainbtn').classList.toggle('on',grainOn); stage.classList.toggle('nograin',!grainOn); save(); };
id('resetall').onclick=()=>{ delete STORIES[idx].f._adj; STORIES[idx].f._extra=[]; save(); paint(); };

// double-clic = éditer le texte
stage.addEventListener('dblclick', e=>{ const t=e.target.closest('[data-k]'); if(!t) return;
  if(editing && editing!==t) editing.contentEditable='false'; editing=t; t.contentEditable='true'; stage.classList.add('editing'); clearSel(); t.focus(); });
stage.addEventListener('focusout', ()=>{ if(editing){ editing.contentEditable='false'; editing=null; stage.classList.remove('editing'); } });

// clic = sélectionner, glisser = déplacer
stage.addEventListener('pointerdown', e=>{
  if(e.target.isContentEditable) return;
  const el=e.target.closest('[data-move]');
  if(!el || !stage.contains(el)){ clearSel(); return; }
  select(el);
  const a=getAdj(el.dataset.move), sx=e.clientX, sy=e.clientY, bx=a.dx||0, by=a.dy||0, sc=scaleNow(); let moved=false;
  try{ el.setPointerCapture(e.pointerId); }catch(_){}
  function mv(ev){ moved=true; a.dx=bx+(ev.clientX-sx)/sc; a.dy=by+(ev.clientY-sy)/sc; applyOne(el,a); drawSel(); }
  function up(){ stage.removeEventListener('pointermove',mv); window.removeEventListener('pointerup',up); if(moved){ syncProps(); save(); } }
  stage.addEventListener('pointermove',mv); window.addEventListener('pointerup',up);
  e.preventDefault();
});
// poignées : redimensionner (coins) + tourner (bouton)
selbox.querySelectorAll('.hd').forEach(hd=>{
  hd.addEventListener('pointerdown', e=>{
    if(!selEl) return; e.stopPropagation(); e.preventDefault();
    const a=getAdj(selKey); const rect=selEl.getBoundingClientRect(); const cx=rect.left+rect.width/2, cy=rect.top+rect.height/2;
    try{ hd.setPointerCapture(e.pointerId); }catch(_){}
    let mv;
    if(hd.dataset.h==='rot'){ const a0=Math.atan2(e.clientY-cy,e.clientX-cx), r0=a.rot||0;
      mv=ev=>{ let d=r0+(Math.atan2(ev.clientY-cy,ev.clientX-cx)-a0)*180/Math.PI; d=Math.round(d); if(Math.abs(d%90)<4)d=Math.round(d/90)*90; a.rot=d; applyOne(selEl,a); drawSel(); syncProps(); }; }
    else { const d0=Math.hypot(e.clientX-cx,e.clientY-cy)||1, s0=a.sc||1;
      mv=ev=>{ a.sc=Math.max(0.2,Math.min(5, s0*(Math.hypot(ev.clientX-cx,ev.clientY-cy)/d0))); applyOne(selEl,a); drawSel(); syncProps(); }; }
    function up(){ window.removeEventListener('pointermove',mv); window.removeEventListener('pointerup',up); save(); }
    window.addEventListener('pointermove',mv); window.addEventListener('pointerup',up);
  });
});
// flèches clavier + suppr
window.addEventListener('keydown', e=>{ if(!selEl||editing) return; const tg=e.target.tagName; if(tg==='INPUT'||tg==='SELECT'||e.target.isContentEditable) return;
  const s=e.shiftKey?20:2; const a=getAdj(selKey);
  if(e.key==='ArrowLeft')a.dx=(a.dx||0)-s; else if(e.key==='ArrowRight')a.dx=(a.dx||0)+s;
  else if(e.key==='ArrowUp')a.dy=(a.dy||0)-s; else if(e.key==='ArrowDown')a.dy=(a.dy||0)+s;
  else if(e.key==='Delete'||e.key==='Backspace'){ a.hidden=true; applyOne(selEl,a); clearSel(); save(); e.preventDefault(); return; } else return;
  applyOne(selEl,a); drawSel(); syncProps(); save(); e.preventDefault(); });
window.addEventListener('resize', ()=>{ if(selEl) drawSel(); });
window.addEventListener('scroll', ()=>{ if(selEl) drawSel(); }, true);

// ---- sauvegarde navigateur ----
const LS='pack-stories-v1'; let saveT;
function saveLS(){ try{ const data={handle,accent,grainOn,stories:{}};
  STORIES.forEach(s=>{ const f={}; for(const k in s.f){ if(k!=='_img') f[k]=s.f[k]; } data.stories[s.id]=f; });
  localStorage.setItem(LS, JSON.stringify(data)); }catch(_){} }
function save(){ clearTimeout(saveT); saveT=setTimeout(()=>{ saveLS(); record(); }, 400); }
function load(){ try{ const d=JSON.parse(localStorage.getItem(LS)||'null'); if(!d) return;
  if(d.handle){ handle=d.handle; id('handle').value=handle; }
  if(d.accent){ accent=d.accent; id('accent').value=accent; document.documentElement.style.setProperty('--acc',accent); }
  if(d.grainOn===false) grainOn=false;
  if(d.stories) STORIES.forEach(s=>{ const sv=d.stories[s.id]; if(sv){ const img=s.f._img; s.f=Object.assign({},s.f,sv); if(img)s.f._img=img; } });
}catch(_){} }
id('wipe').onclick=()=>{ if(confirm('Effacer toutes tes modifications et revenir au pack d\\'origine ?')){ localStorage.removeItem(LS); location.reload(); } };

// ---- annuler / rétablir ----
const undoStack=[], redoStack=[]; let lastSnap='';
function snapshot(){ return JSON.stringify({handle,accent,grainOn,st:STORIES.map(s=>s.f)}); }
function record(){ const cur=snapshot(); if(cur===lastSnap) return; undoStack.push(lastSnap); if(undoStack.length>50)undoStack.shift(); redoStack.length=0; lastSnap=cur; updateUndo(); }
function restore(json){ const d=JSON.parse(json); handle=d.handle; accent=d.accent; grainOn=d.grainOn;
  id('handle').value=handle; id('accent').value=accent; document.documentElement.style.setProperty('--acc',accent);
  d.st.forEach((f,i)=>{ if(STORIES[i]) STORIES[i].f=f; });
  lastSnap=snapshot(); clearSel(); paint(); saveLS(); updateUndo(); }
function undo(){ clearTimeout(saveT); record(); if(!undoStack.length) return; redoStack.push(lastSnap); restore(undoStack.pop()); }
function redo(){ if(!redoStack.length) return; undoStack.push(lastSnap); restore(redoStack.pop()); }
function updateUndo(){ id('undoBtn').disabled=!undoStack.length; id('redoBtn').disabled=!redoStack.length; }
id('undoBtn').onclick=undo; id('redoBtn').onclick=redo;
window.addEventListener('keydown', e=>{ if(!(e.ctrlKey||e.metaKey)) return; const k=e.key.toLowerCase();
  const tg=e.target.tagName; const inField=(tg==='INPUT'||tg==='TEXTAREA'||e.target.isContentEditable);
  if(k==='z'){ if(inField) return; e.preventDefault(); e.shiftKey?redo():undo(); }
  else if(k==='y'){ if(inField) return; e.preventDefault(); redo(); } });

load();
paint();
lastSnap=snapshot(); updateUndo();
</script>`;

const OUT = path.join(__dirname, "..", "exports", "editor.html");
fs.writeFileSync(OUT, editorHTML);
console.log("editor -> " + OUT + " (" + (editorHTML.length / 1024 | 0) + " KB), " + S.length + " stories");
