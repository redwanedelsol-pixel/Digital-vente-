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
:root{--bg:#0c0c0e;--panel:#16161a;--line:rgba(255,255,255,.1);--ink:#f2f0ec;--mut:#9a958c;--acc:#e0913f}
*{box-sizing:border-box}
.app{background:var(--bg);color:var(--ink);font-family:"Archivo",system-ui,sans-serif;min-height:100vh;padding:20px 20px 160px}
.bar{display:flex;flex-wrap:wrap;gap:14px 20px;align-items:center;max-width:1000px;margin:0 auto 14px;background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:15px 18px}
.bar h1{font-family:"Archivo Black",sans-serif;font-size:18px;letter-spacing:-.01em;margin:0;text-transform:uppercase}
.bar .grp{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--mut)}
.bar input[type=text]{background:#0c0c0e;border:1px solid var(--line);color:var(--ink);border-radius:9px;padding:9px 12px;font:inherit;font-size:14px;width:160px}
.bar input[type=color]{width:38px;height:38px;border:1px solid var(--line);border-radius:9px;background:none;padding:2px;cursor:pointer}
.bar input[type=range]{accent-color:var(--acc)}
.nav{display:flex;gap:8px;align-items:center;margin-left:auto}
.nav select{background:#0c0c0e;border:1px solid var(--line);color:var(--ink);border-radius:9px;padding:9px 12px;font:inherit;font-size:14px;max-width:230px}
.btn{background:var(--acc);color:#160d02;border:0;border-radius:10px;padding:11px 15px;font:inherit;font-weight:700;font-size:14px;cursor:pointer}
.btn.ghost{background:transparent;color:var(--ink);border:1px solid var(--line)}
.btn:active{transform:translateY(1px)}
.stagewrap{max-width:1000px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:13px}
.frame{position:relative;overflow:hidden;border-radius:16px;box-shadow:0 24px 60px -28px #000;background:#000}
.frame .stage{transform-origin:top left}
.hint{color:var(--mut);font-size:13px;text-align:center;max-width:560px;line-height:1.5}
.hint b{color:var(--ink)}
.dlrow{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center}
.count{font-size:12px;color:var(--mut);letter-spacing:.14em;text-transform:uppercase}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.82);display:none;align-items:center;justify-content:center;flex-direction:column;gap:14px;z-index:99;padding:22px}
.modal.on{display:flex}
.modal img{max-width:min(90vw,380px);max-height:72vh;border-radius:10px;box-shadow:0 20px 50px -20px #000}
.modal p{color:#fff;font-size:14px;text-align:center;max-width:420px;line-height:1.5}
.modal .x{position:absolute;top:14px;right:18px;color:#fff;font-size:30px;cursor:pointer;background:none;border:0}
.seg{display:flex;border:1px solid var(--line);border-radius:9px;overflow:hidden}
.seg button{background:transparent;color:var(--mut);border:0;padding:9px 12px;font:inherit;font-size:13px;cursor:pointer}
.seg button.on{background:var(--acc);color:#160d02;font-weight:700}
.stage.moving [data-move]{cursor:grab}
.stage.moving [data-move]:active{cursor:grabbing}
.mv-sel{outline:2px solid var(--acc)!important;outline-offset:3px}
#addbar{display:none;max-width:1000px;margin:0 auto 12px;flex-wrap:wrap;gap:8px 10px;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:11px 15px}
#addbar .lbl{font-size:11px;color:var(--mut);text-transform:uppercase;letter-spacing:.16em}
#addbar .sep{width:1px;height:24px;background:var(--line)}
#addbar input[type=color]{width:36px;height:34px;border:1px solid var(--line);border-radius:7px;background:none;padding:2px;cursor:pointer}
#addbar .btn.on{background:var(--acc);color:#160d02}
#panel{position:fixed;left:0;right:0;bottom:0;z-index:70;display:none;gap:16px;align-items:flex-end;overflow-x:auto;background:rgba(18,18,22,.97);backdrop-filter:blur(8px);border-top:1px solid var(--line);padding:12px 16px 14px}
#panel.on{display:flex}
#panel .pg{display:flex;flex-direction:column;gap:5px;font-size:10px;color:var(--mut);flex:none;text-transform:uppercase;letter-spacing:.12em;white-space:nowrap}
#panel .pg.btns{flex-direction:row;align-items:center;gap:6px}
#panel input[type=range]{width:120px;accent-color:var(--acc)}
#panel input[type=color]{width:46px;height:32px;border:1px solid var(--line);border-radius:7px;background:none;padding:2px;cursor:pointer}
#panel select{background:#0c0c0e;color:var(--ink);border:1px solid var(--line);border-radius:7px;height:34px;font:inherit;font-size:13px;padding:0 6px;cursor:pointer}
#panel .mini{background:#0c0c0e;color:var(--ink);border:1px solid var(--line);border-radius:7px;min-width:40px;height:34px;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
#panel .mini.on{background:var(--acc);color:#160d02;border-color:var(--acc)}
#panel .mini:active{transform:translateY(1px)}
</style>

<div class="app">
  <div class="bar">
    <h1>Éditeur · 30 stories</h1>
    <div class="grp">@compte <input id="handle" type="text" value="@votre.compte" /></div>
    <div class="grp">Couleur <input id="accent" type="color" value="#e0913f" /></div>
    <div class="grp">
      <button class="btn ghost" id="imgbtn">Ajouter une photo</button>
      <input id="imgfile" type="file" accept="image/*" hidden />
      <button class="btn ghost" id="imgdel" style="display:none">✕</button>
    </div>
    <div class="grp" id="darkgrp" style="display:none">Assombrir <input id="dark" type="range" min="0.25" max="0.9" step="0.05" value="0.65" /></div>
    <div class="grp">
      <div class="seg" id="modeseg"><button data-m="text" class="on">✎ Texte</button><button data-m="move">✥ Déplacer</button></div>
      <button class="btn ghost" id="resetall" title="Réinitialiser les positions de cette story">⟲ positions</button>
    </div>
    <button class="btn ghost" id="wipe" title="Effacer toutes les modifications enregistrées">↺ tout</button>
    <div class="nav">
      <button class="btn ghost" id="prev">◀</button>
      <select id="pick"></select>
      <button class="btn ghost" id="next">▶</button>
    </div>
  </div>

  <div id="addbar">
    <span class="lbl">Ajouter</span>
    <button class="btn ghost" id="addText">＋ Texte</button>
    <button class="btn ghost" id="addRect">＋ Bande</button>
    <button class="btn ghost" id="addLine">＋ Trait</button>
    <span class="sep"></span>
    <span class="lbl">Fond</span>
    <input id="bgcol" type="color" value="#101014" title="Couleur de fond (sans photo)" />
    <button class="btn ghost" id="bgoff" title="Fond d'origine">✕</button>
    <button class="btn ghost on" id="grainbtn" title="Grain / texture">Grain</button>
  </div>

  <div class="stagewrap">
    <div class="frame" id="frame"><div class="stage" id="stage"></div></div>
    <div class="dlrow">
      <button class="btn" id="dl">⬇ Télécharger ce PNG</button>
      <button class="btn ghost" id="dlall">⬇ Télécharger les 30</button>
      <span class="count" id="counter"></span>
    </div>
    <p class="hint"><b>✎ Texte</b> : clique pour écrire. <b>✥ Déplacer</b> : glisse un bloc (flèches clavier pour ajuster), sélectionne-le et le <b>panneau en bas</b> donne taille, rotation, opacité, couleur, surlignage, police, gras/italique/majuscules, alignement, dupliquer/supprimer. <b>Ajoute</b> texte, bande, trait. Règle <b>fond</b> &amp; <b>grain</b>. Tout est <b>sauvegardé</b> dans ton navigateur. Export <b>1080×1920</b>.</p>
  </div>
</div>

<div id="panel">
  <div class="pg"><span>Taille</span><input id="pSize" type="range" min="0.3" max="3" step="0.02" /></div>
  <div class="pg"><span>Rotation</span><input id="pRot" type="range" min="-45" max="45" step="1" /></div>
  <div class="pg"><span>Opacité</span><input id="pOp" type="range" min="0" max="1" step="0.05" /></div>
  <div class="pg"><span>Interlettre</span><input id="pLs" type="range" min="-0.05" max="0.4" step="0.01" /></div>
  <div class="pg"><span>Interligne</span><input id="pLh" type="range" min="0.8" max="2" step="0.05" /></div>
  <div class="pg"><span>Couleur</span><input id="pColor" type="color" /></div>
  <div class="pg"><span>Surlignage</span><span style="display:flex;gap:4px"><input id="pBg" type="color" /><button class="mini" id="pBgOff" title="Retirer">✕</button></span></div>
  <div class="pg"><span>Police</span><select id="pFont"><option value="">—</option><option value="'Archivo Black',sans-serif">Gras</option><option value="'Anton',sans-serif">Condensé</option><option value="'Dancing Script',cursive">Script</option><option value="'Archivo',sans-serif">Simple</option></select></div>
  <div class="pg btns"><button class="mini" id="pBold" title="Gras">B</button><button class="mini" id="pItal" title="Italique"><i>I</i></button><button class="mini" id="pUpper" title="Majuscules">AA</button><button class="mini" id="pAl_left" title="Gauche">⇤</button><button class="mini" id="pAl_center" title="Centrer">≡</button><button class="mini" id="pAl_right" title="Droite">⇥</button></div>
  <div class="pg btns"><button class="mini" id="pDup" title="Dupliquer">⎘</button><button class="mini" id="pDel" title="Supprimer">🗑</button><button class="mini" id="pReset" title="Réinitialiser ce bloc">⟲</button></div>
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
  if(ex.kind==='text') return '<div class="ex-el" data-ex="'+i+'" contenteditable="'+(!moveMode)+'" data-k="_extra.'+i+'.text" style="'+pos+';width:'+ex.w+'px;font-family:'+(ex.font||"\\'Archivo Black\\',sans-serif")+';font-size:'+ex.size+'px;color:#fff;text-transform:uppercase;line-height:.9;letter-spacing:-.02em">'+nl(ex.text)+'</div>';
  if(ex.kind==='rect') return '<div class="ex-el" data-ex="'+i+'" style="'+pos+';width:'+ex.w+'px;height:'+ex.h+'px;background:'+ex.color+';border-radius:'+(ex.r||0)+'px"></div>';
  if(ex.kind==='line') return '<div class="ex-el" data-ex="'+i+'" style="'+pos+';width:'+ex.w+'px;height:'+ex.h+'px;background:'+ex.color+'"></div>';
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
  refreshImg();
  applyAdj(stage, st);
  stage.classList.toggle('nograin', !grainOn);
  document.getElementById('bgcol').value = st.f._bgcol || '#101014';
  document.getElementById('grainbtn').classList.toggle('on', grainOn);
  clearSel(); applyMode();
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
document.getElementById('imgbtn').onclick=()=>imgfile.click();
imgfile.onchange=e=>{ const file=e.target.files[0]; if(!file) return; const fr=new FileReader();
  fr.onload=()=>resize(fr.result, url=>{ STORIES[idx].f._img=url; if(STORIES[idx].f._dark==null) STORIES[idx].f._dark=0.65; paint(); }); fr.readAsDataURL(file); e.target.value=''; };
imgdel.onclick=()=>{ delete STORIES[idx].f._img; paint(); };
darkr.oninput=e=>{ STORIES[idx].f._dark=+e.target.value; applyBg(stage,STORIES[idx]); save(); };
function refreshImg(){ const has=!!STORIES[idx].f._img; imgdel.style.display=has?'':'none'; darkgrp.style.display=has?'':'none';
  document.getElementById('imgbtn').textContent = has?'Changer la photo':'Ajouter une photo'; if(has) darkr.value=STORIES[idx].f._dark??0.65; }
function resize(dataURL, cb){ const im=new Image(); im.onload=()=>{ const M=1280; let w=im.width,h=im.height;
  const r=Math.min(1, M/Math.max(w,h)); w=Math.round(w*r); h=Math.round(h*r);
  const c=document.createElement('canvas'); c.width=w; c.height=h; c.getContext('2d').drawImage(im,0,0,w,h); cb(c.toDataURL('image/jpeg',0.85)); }; im.src=dataURL; }

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

// ---- studio d'édition ----
let moveMode=false, selEl=null, selKey=null, grainOn=true;
const panel=document.getElementById('panel'), addbar=document.getElementById('addbar');
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
function applyMode(){ stage.classList.toggle('moving',moveMode); stage.querySelectorAll('[contenteditable]').forEach(e=>e.contentEditable=(!moveMode).toString());
  addbar.style.display=moveMode?'flex':'none'; if(!moveMode) clearSel(); }
function setMode(m){ moveMode=(m==='move'); document.querySelectorAll('#modeseg button').forEach(b=>b.classList.toggle('on',b.dataset.m===m)); applyMode(); }
document.querySelectorAll('#modeseg button').forEach(b=>b.onclick=()=>setMode(b.dataset.m));
id('resetall').onclick=()=>{ delete STORIES[idx].f._adj; STORIES[idx].f._extra=[]; save(); paint(); };

function clearSel(){ if(selEl) selEl.classList.remove('mv-sel'); selEl=null; selKey=null; panel.classList.remove('on'); }
function reselect(key){ const el=[...stage.children].find(c=>c.dataset.move===key); if(el) select(el); }
function select(el){ if(selEl) selEl.classList.remove('mv-sel'); selEl=el; selKey=el.dataset.move; el.classList.add('mv-sel'); syncPanel(); panel.classList.add('on'); }
const P={ size:id('pSize'),rot:id('pRot'),op:id('pOp'),ls:id('pLs'),lh:id('pLh'),color:id('pColor'),bg:id('pBg'),font:id('pFont'),bold:id('pBold'),ital:id('pItal'),upper:id('pUpper') };
function syncPanel(){ const a=(STORIES[idx].f._adj||{})[selKey]||{};
  P.size.value=a.sc||1; P.rot.value=a.rot||0; P.op.value=a.op!=null?a.op:1; P.ls.value=a.ls!=null?a.ls:0; P.lh.value=a.lh!=null?a.lh:1.1;
  P.color.value=a.color||'#ffffff'; P.bg.value=a.bg||'#e0913f'; P.font.value=a.font||'';
  P.bold.classList.toggle('on',a.weight==900); P.ital.classList.toggle('on',!!a.italic); P.upper.classList.toggle('on',!!a.upper); }

P.size.oninput=e=>{ if(!selEl)return; const a=getAdj(selKey); a.sc=+e.target.value; applyOne(selEl,a); save(); };
P.rot.oninput=e=>{ if(!selEl)return; const a=getAdj(selKey); a.rot=+e.target.value; applyOne(selEl,a); save(); };
P.op.oninput=e=>{ if(!selEl)return; const a=getAdj(selKey); a.op=+e.target.value; applyOne(selEl,a); save(); };
P.ls.oninput=e=>{ if(!selEl)return; const a=getAdj(selKey); a.ls=+e.target.value; applyOne(selEl,a); save(); };
P.lh.oninput=e=>{ if(!selEl)return; const a=getAdj(selKey); a.lh=+e.target.value; applyOne(selEl,a); save(); };
P.color.oninput=e=>{ if(!selEl)return; const a=getAdj(selKey); a.color=e.target.value; setAll(selEl,'color',a.color); save(); };
P.bg.oninput=e=>{ if(!selEl)return; const a=getAdj(selKey); a.bg=e.target.value; selEl.style.background=a.bg; selEl.style.padding='.12em .4em'; selEl.style.borderRadius='12px'; save(); };
id('pBgOff').onclick=()=>{ if(!selEl)return; const a=getAdj(selKey); delete a.bg; selEl.style.background=''; selEl.style.padding=''; save(); };
P.font.onchange=e=>{ if(!selEl)return; const k=selKey,a=getAdj(k); if(e.target.value){ a.font=e.target.value; setAll(selEl,'fontFamily',a.font);} else { delete a.font; paint(); reselect(k);} save(); };
P.bold.onclick=()=>{ if(!selEl)return; const k=selKey,a=getAdj(k); if(a.weight==900) delete a.weight; else a.weight=900; paint(); reselect(k); save(); };
P.ital.onclick=()=>{ if(!selEl)return; const k=selKey,a=getAdj(k); if(a.italic) delete a.italic; else a.italic=true; paint(); reselect(k); save(); };
P.upper.onclick=()=>{ if(!selEl)return; const k=selKey,a=getAdj(k); if(a.upper) delete a.upper; else a.upper=true; paint(); reselect(k); save(); };
['left','center','right'].forEach(al=> id('pAl_'+al).onclick=()=>{ if(!selEl)return; const a=getAdj(selKey); a.align=al; applyOne(selEl,a); save(); });
id('pDup').onclick=()=>{ if(!selEl)return; const c=selEl.cloneNode(true); c.removeAttribute('data-move'); c.classList.remove('mv-sel');
  c.removeAttribute('data-k'); c.removeAttribute('contenteditable');
  c.querySelectorAll('[data-k],[contenteditable]').forEach(n=>{ n.removeAttribute('data-k'); n.removeAttribute('contenteditable'); });
  const st=STORIES[idx]; st.f._extra=st.f._extra||[]; st.f._extra.push({kind:'html',x:0,y:0,html:c.outerHTML}); save(); paint(); };
id('pDel').onclick=()=>{ if(!selEl)return; const a=getAdj(selKey); a.hidden=true; applyOne(selEl,a); clearSel(); save(); };
id('pReset').onclick=()=>{ if(!selEl)return; const k=selKey; if(STORIES[idx].f._adj) delete STORIES[idx].f._adj[k]; paint(); reselect(k); save(); };

// ajout d'éléments
id('addText').onclick=()=>{ const st=STORIES[idx]; st.f._extra=st.f._extra||[]; st.f._extra.push({kind:'text',x:120,y:820,w:840,size:96,text:'TON TEXTE'}); save(); paint(); };
id('addRect').onclick=()=>{ const st=STORIES[idx]; st.f._extra=st.f._extra||[]; st.f._extra.push({kind:'rect',x:140,y:900,w:800,h:180,color:'rgba(224,145,63,.92)',r:0}); save(); paint(); };
id('addLine').onclick=()=>{ const st=STORIES[idx]; st.f._extra=st.f._extra||[]; st.f._extra.push({kind:'line',x:140,y:960,w:520,h:6,color:'#ffffff'}); save(); paint(); };
// fond & grain
id('bgcol').oninput=e=>{ STORIES[idx].f._bgcol=e.target.value; applyBg(stage,STORIES[idx]); save(); };
id('bgoff').onclick=()=>{ delete STORIES[idx].f._bgcol; applyBg(stage,STORIES[idx]); save(); };
id('grainbtn').onclick=()=>{ grainOn=!grainOn; id('grainbtn').classList.toggle('on',grainOn); stage.classList.toggle('nograin',!grainOn); save(); };

// glisser
stage.addEventListener('pointerdown', e=>{
  if(!moveMode) return;
  const el=e.target.closest('[data-move]');
  if(!el || !stage.contains(el)){ clearSel(); return; }
  select(el);
  const a=getAdj(el.dataset.move), sx=e.clientX, sy=e.clientY, bx=a.dx||0, by=a.dy||0, sc=scaleNow();
  try{ el.setPointerCapture(e.pointerId); }catch(_){}
  function mv(ev){ a.dx=bx+(ev.clientX-sx)/sc; a.dy=by+(ev.clientY-sy)/sc; applyOne(el,a); }
  function up(){ stage.removeEventListener('pointermove',mv); window.removeEventListener('pointerup',up); save(); }
  stage.addEventListener('pointermove',mv); window.addEventListener('pointerup',up);
  e.preventDefault();
});
// flèches clavier
window.addEventListener('keydown', e=>{ if(!moveMode||!selEl) return; if(e.target.isContentEditable) return; const s=e.shiftKey?20:2; const a=getAdj(selKey);
  if(e.key==='ArrowLeft')a.dx=(a.dx||0)-s; else if(e.key==='ArrowRight')a.dx=(a.dx||0)+s;
  else if(e.key==='ArrowUp')a.dy=(a.dy||0)-s; else if(e.key==='ArrowDown')a.dy=(a.dy||0)+s; else return;
  applyOne(selEl,a); save(); e.preventDefault(); });

// ---- sauvegarde navigateur ----
const LS='pack-stories-v1'; let saveT;
function save(){ clearTimeout(saveT); saveT=setTimeout(()=>{ try{
  const data={handle,accent,grainOn,stories:{}};
  STORIES.forEach(s=>{ const f={}; for(const k in s.f){ if(k!=='_img') f[k]=s.f[k]; } data.stories[s.id]=f; });
  localStorage.setItem(LS, JSON.stringify(data)); }catch(_){} }, 400); }
function load(){ try{ const d=JSON.parse(localStorage.getItem(LS)||'null'); if(!d) return;
  if(d.handle){ handle=d.handle; id('handle').value=handle; }
  if(d.accent){ accent=d.accent; id('accent').value=accent; document.documentElement.style.setProperty('--acc',accent); }
  if(d.grainOn===false) grainOn=false;
  if(d.stories) STORIES.forEach(s=>{ const sv=d.stories[s.id]; if(sv){ const img=s.f._img; s.f=Object.assign({},s.f,sv); if(img)s.f._img=img; } });
}catch(_){} }
id('wipe').onclick=()=>{ if(confirm('Effacer toutes tes modifications et revenir au pack d\\'origine ?')){ localStorage.removeItem(LS); location.reload(); } };

load();
paint();
</script>`;

const OUT = path.join(__dirname, "..", "exports", "editor.html");
fs.writeFileSync(OUT, editorHTML);
console.log("editor -> " + OUT + " (" + (editorHTML.length / 1024 | 0) + " KB), " + S.length + " stories");
