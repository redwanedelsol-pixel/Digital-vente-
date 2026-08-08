/* Générateur du pack "Immobilier" — 30 visuels (15 stories 1080x1920 + 15 posts 1080x1080)
   Charte unique : ivoire + vert pin profond + laiton doré · Playfair Display + Inter.
   Rendu local HTML -> PNG (chromium). Marque démo remplaçable : "AGENCE MÉRIDIEN". */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FONTS = ROOT + '/fonts';
const OUT = ROOT + '/html';
fs.mkdirSync(OUT, { recursive: true });

/* ---------- FONTS ---------- */
const ff = (fam, file, w, style='normal') =>
  `@font-face{font-family:'${fam}';src:url('file://${FONTS}/${file}') format('woff2');font-weight:${w};font-style:${style};font-display:block}`;
const FONTFACE = [
  ...[400,500,600,700,800,900].flatMap(w => [
    ff('Playfair Display', `playfair-latin-${w}.woff2`, w),
    ff('Playfair Display', `playfair-latin-ext-${w}.woff2`, w),
  ]),
  ff('Playfair Display','playfair-latin-400-italic.woff2',400,'italic'),
  ff('Playfair Display','playfair-latin-600-italic.woff2',600,'italic'),
  ...[400,500,600,700].flatMap(w => [
    ff('Inter', `inter-latin-${w}.woff2`, w),
    ff('Inter', `inter-latin-ext-${w}.woff2`, w),
  ]),
].join('\n');

/* ---------- TOKENS ---------- */
const C = {
  paper:'#F2ECE2', paper2:'#E8DFD1', ink:'#211F1A', green:'#2B3B31', green2:'#374F41',
  gold:'#B4874A', goldL:'#CBA36A', muted:'#7B7365', line:'rgba(33,31,26,.16)',
  lineOnDark:'rgba(242,236,226,.18)', mutedOnDark:'rgba(242,236,226,.62)'
};

const BASE = `
*{margin:0;padding:0;box-sizing:border-box}
html,body{margin:0;padding:0}
.stage{position:relative;overflow:hidden;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;
  text-rendering:geometricPrecision}
.serif{font-family:'Playfair Display',serif}
.eyebrow{font-family:'Inter';font-weight:600;text-transform:uppercase;letter-spacing:.32em;font-size:19px}
.grain{position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;opacity:.05;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.rule{height:1px;background:${C.gold};border:0}
`;

/* ---------- HELPERS ---------- */
// Photo placeholder zone — elegant, clearly replaceable
function photo(opts={}){
  const {radius=0, h='auto', flex=false, dark=false, label='Remplacez par votre photo'} = opts;
  const g = dark
    ? 'linear-gradient(150deg,#33463A,#243027)'
    : 'linear-gradient(150deg,#D8CCB6,#C3B092)';
  const icon = dark ? 'rgba(242,236,226,.5)' : 'rgba(33,31,26,.32)';
  const lab = dark ? 'rgba(242,236,226,.62)' : 'rgba(33,31,26,.5)';
  return `<div class="photo" style="position:relative;${flex?'flex:1;':''}${h!=='auto'?`height:${h};`:''}
      border-radius:${radius}px;overflow:hidden;background:${g};display:flex;flex-direction:column;
      align-items:center;justify-content:center;gap:22px">
    <svg width="92" height="92" viewBox="0 0 24 24" fill="none" stroke="${icon}" stroke-width="1.1"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>
    <div style="font-family:'Inter';font-weight:600;letter-spacing:.26em;text-transform:uppercase;
      font-size:15px;color:${lab}">${label}</div>
  </div>`;
}
function specs(items, dark=false){
  const col = dark ? C.paper : C.ink;
  const lab = dark ? C.mutedOnDark : C.muted;
  const div = dark ? C.lineOnDark : C.line;
  return `<div style="display:flex;align-items:stretch">${items.map((it,i)=>`
    <div style="flex:1;text-align:center;padding:0 8px;${i? `border-left:1px solid ${div}`:''}">
      <div class="serif" style="font-size:52px;font-weight:700;color:${col};line-height:1">${it.v}</div>
      <div style="font-family:'Inter';font-weight:600;letter-spacing:.18em;text-transform:uppercase;
        font-size:15px;color:${lab};margin-top:12px">${it.l}</div>
    </div>`).join('')}</div>`;
}
function agent(dark=false, opts={}){
  const {name='Camille Laurent', role='Conseillère · Agence Méridien', phone='06 12 34 56 78'} = opts;
  const col = dark ? C.paper : C.ink;
  const lab = dark ? C.mutedOnDark : C.muted;
  const av = dark ? 'linear-gradient(135deg,#42574A,#2B3B31)' : 'linear-gradient(135deg,#C9B78F,#B4874A)';
  const initials = name.split(' ').map(w=>w[0]).slice(0,2).join('');
  return `<div style="display:flex;align-items:center;gap:20px">
    <div style="width:78px;height:78px;border-radius:50%;background:${av};display:flex;align-items:center;
      justify-content:center;font-family:'Playfair Display';font-weight:700;font-size:30px;color:${dark?C.green:'#fff'};flex:none">${initials}</div>
    <div style="line-height:1.35">
      <div style="font-family:'Inter';font-weight:700;font-size:24px;color:${col}">${name}</div>
      <div style="font-family:'Inter';font-weight:500;font-size:18px;color:${lab}">${role}</div>
      <div style="font-family:'Inter';font-weight:600;font-size:18px;color:${dark?C.goldL:C.gold};margin-top:2px">${phone}</div>
    </div></div>`;
}
const brandTag = (dark=false)=>`<div style="font-family:'Inter';font-weight:600;letter-spacing:.34em;
  text-transform:uppercase;font-size:15px;color:${dark?C.mutedOnDark:C.muted}">Agence Méridien · Immobilier</div>`;

const price = (val, dark=false, sub='')=>`<div>
  <div class="serif" style="font-size:96px;font-weight:800;line-height:.9;color:${dark?C.paper:C.ink}">${val}</div>
  ${sub?`<div style="font-family:'Inter';font-weight:500;font-size:20px;color:${dark?C.mutedOnDark:C.muted};margin-top:8px">${sub}</div>`:''}</div>`;

/* corner mark */
const corners = (dark=false)=>{
  const c = dark ? C.goldL : C.gold;
  const s = (pos)=>`<span style="position:absolute;${pos};width:46px;height:46px;border:2px solid ${c};"></span>`;
  return `<div style="position:absolute;inset:52px;pointer-events:none">
    ${s('top:0;left:0;border-right:0;border-bottom:0')}
    ${s('top:0;right:0;border-left:0;border-bottom:0')}
    ${s('bottom:0;left:0;border-right:0;border-top:0')}
    ${s('bottom:0;right:0;border-left:0;border-top:0')}</div>`;
};

/* ---------- ARCHETYPES ----------
   Each returns inner HTML of the stage. cfg carries content.  */

// A · Listing hero (photo top, badge, price, specs, address, agent)  [story]
function listingHero(cfg){
  const dark = cfg.dark;
  const sm = cfg.h <= 1400; // square post
  const pageBg = dark ? C.green : C.paper;
  const ink = dark ? C.paper : C.ink;
  const photoH = sm ? 486 : 1044;
  const tSize = sm ? 52 : 72;
  const pOverride = sm ? `<div class="serif" style="font-size:64px;font-weight:800;line-height:.9;color:${ink}">${cfg.price}</div>`
                       : price(cfg.price, dark, cfg.priceSub||'');
  return `
  <div style="position:absolute;inset:0;background:${pageBg}"></div>
  <div style="position:absolute;top:0;left:0;right:0;height:${photoH}px;padding:0">${photo({dark, h:'100%', label:cfg.photoLabel||'Remplacez par votre photo'})}</div>
  <div style="position:absolute;top:${sm?48:64}px;left:${sm?48:64}px;background:${dark?C.paper:C.green};color:${dark?C.green:C.paper};
    font-family:'Inter';font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:${sm?16:20}px;
    padding:${sm?'12px 20px':'16px 26px'}">${cfg.badge||'À vendre'}</div>
  <div style="position:absolute;top:${photoH}px;left:0;right:0;bottom:0;background:${pageBg};
    padding:${sm?'44px 56px 44px':'58px 72px 56px'};display:flex;flex-direction:column">
    <div class="eyebrow" style="color:${dark?C.goldL:C.gold};font-size:${sm?15:19}px">${cfg.eyebrow||'Nouveau sur le marché'}</div>
    <h1 class="serif" style="font-size:${tSize}px;font-weight:800;line-height:1.02;color:${ink};margin:${sm?'14px 0 20px':'18px 0 26px'}">${cfg.title}</h1>
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:${sm?24:34}px">
      ${pOverride}
      <div style="text-align:right;font-family:'Inter';font-weight:500;font-size:${sm?18:22}px;color:${dark?C.mutedOnDark:C.muted};line-height:1.4;max-width:360px">${cfg.address}</div>
    </div>
    <hr class="rule" style="background:${dark?C.lineOnDark:C.line};margin-bottom:${sm?24:34}px">
    ${specs(cfg.specs, dark)}
    ${sm?'':`<div style="margin-top:auto;padding-top:38px;display:flex;align-items:center;justify-content:space-between">
      ${agent(dark, cfg.agent||{})}</div>`}
  </div>`;
}

// B · Announcement (big serif word over photo)  [story/post]
function announce(cfg){
  const dark = cfg.dark!==false;
  return `
  <div style="position:absolute;inset:0">${photo({dark:true, h:'100%', label:cfg.photoLabel||'Remplacez par votre photo'})}</div>
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,26,22,.35),rgba(20,26,22,.82))"></div>
  ${corners(true)}
  <div style="position:absolute;left:0;right:0;top:${cfg.h>1400?'34%':'30%'};transform:translateY(-50%);text-align:center;padding:0 70px">
    <div class="eyebrow" style="color:${C.goldL}">${cfg.eyebrow||''}</div>
    <div class="serif" style="font-size:${cfg.wordSize||(cfg.word?190:120)}px;font-weight:900;color:${C.paper};line-height:.94;margin:26px 0 0;letter-spacing:-.01em">${cfg.word||cfg.title}</div>
    ${cfg.sub?`<div style="font-family:'Inter';font-weight:500;font-size:26px;color:rgba(242,236,226,.82);margin-top:26px;line-height:1.5">${cfg.sub}</div>`:''}
  </div>
  <div style="position:absolute;left:0;right:0;bottom:78px;text-align:center;padding:0 70px">
    ${cfg.stat?`<div class="serif" style="font-size:44px;font-weight:700;color:${C.goldL};margin-bottom:30px">${cfg.stat}</div>`:''}
    <div style="display:inline-flex;flex-direction:column;align-items:center;gap:16px">
      ${brandTag(true)}
    </div>
  </div>`;
}

// C · Event / date card  [story/post]
function eventCard(cfg){
  const dark=true;
  return `
  <div style="position:absolute;inset:0;background:${C.green}"></div>
  ${corners(true)}
  <div style="position:absolute;inset:52px;padding:66px 60px;display:flex;flex-direction:column;text-align:center;align-items:center">
    <div class="eyebrow" style="color:${C.goldL}">${cfg.eyebrow||'Événement'}</div>
    <div class="serif" style="font-size:96px;font-weight:800;color:${C.paper};line-height:1;margin:26px 0 8px">${cfg.title}</div>
    ${cfg.sub?`<div style="font-family:'Inter';font-weight:500;font-size:24px;color:${C.mutedOnDark};max-width:640px;line-height:1.5">${cfg.sub}</div>`:''}
    <div style="flex:1;width:100%;margin:54px 0;">${photo({dark:true,radius:0,h:'100%'})}</div>
    <div style="display:flex;gap:0;width:100%;border:1px solid ${C.lineOnDark}">
      ${(cfg.rows||[]).map((r,i)=>`<div style="flex:1;padding:30px 16px;${i?`border-left:1px solid ${C.lineOnDark}`:''}">
        <div style="font-family:'Inter';font-weight:600;letter-spacing:.2em;text-transform:uppercase;font-size:14px;color:${C.goldL}">${r.l}</div>
        <div class="serif" style="font-size:34px;font-weight:700;color:${C.paper};margin-top:10px">${r.v}</div></div>`).join('')}
    </div>
    <div style="margin-top:40px">${brandTag(true)}</div>
  </div>`;
}

// D · Price drop  [story]
function priceDrop(cfg){
  const dark=false;
  return `
  <div style="position:absolute;inset:0;background:${C.paper}"></div>
  <div style="position:absolute;top:0;left:0;right:0;height:900px">${photo({h:'100%', label:cfg.photoLabel})}</div>
  <div style="position:absolute;top:64px;right:64px;background:${C.gold};color:#fff;font-family:'Inter';font-weight:700;
    letter-spacing:.16em;text-transform:uppercase;font-size:20px;padding:16px 26px">Baisse de prix</div>
  <div style="position:absolute;top:900px;left:0;right:0;bottom:0;padding:70px 72px;display:flex;flex-direction:column">
    <div class="eyebrow" style="color:${C.gold}">${cfg.eyebrow||'Opportunité'}</div>
    <h1 class="serif" style="font-size:72px;font-weight:800;color:${C.ink};margin:20px 0 40px;line-height:1.03">${cfg.title}</h1>
    <div style="display:flex;align-items:center;gap:40px;margin-bottom:44px">
      <div>
        <div style="font-family:'Inter';font-weight:600;letter-spacing:.18em;text-transform:uppercase;font-size:15px;color:${C.muted}">Ancien prix</div>
        <div class="serif" style="font-size:52px;font-weight:600;color:${C.muted};text-decoration:line-through;text-decoration-color:${C.gold};margin-top:8px">${cfg.oldPrice}</div>
      </div>
      <svg width="60" height="40" viewBox="0 0 60 40" fill="none" stroke="${C.gold}" stroke-width="2.4"><path d="M4 20h48M38 8l14 12-14 12"/></svg>
      <div>
        <div style="font-family:'Inter';font-weight:600;letter-spacing:.18em;text-transform:uppercase;font-size:15px;color:${C.gold}">Nouveau prix</div>
        <div class="serif" style="font-size:84px;font-weight:800;color:${C.ink};line-height:.9;margin-top:6px">${cfg.newPrice}</div>
      </div>
    </div>
    <hr class="rule" style="background:${C.line};margin-bottom:36px">
    ${specs(cfg.specs)}
    <div style="margin-top:auto;padding-top:48px">${agent(false,cfg.agent||{})}</div>
  </div>`;
}

// E · CTA / swipe (offer)  [story/post]
function ctaCard(cfg){
  const dark=cfg.dark!==false;
  const bg = dark?C.green:C.paper; const ink=dark?C.paper:C.ink;
  return `
  <div style="position:absolute;inset:0;background:${bg}"></div>
  ${corners(dark)}
  <div style="position:absolute;inset:52px;padding:76px 62px;display:flex;flex-direction:column;text-align:center;align-items:center;justify-content:center">
    <div class="eyebrow" style="color:${dark?C.goldL:C.gold}">${cfg.eyebrow||'Offert'}</div>
    <div class="serif" style="font-size:104px;font-weight:800;color:${ink};line-height:1.0;margin:28px 0 26px">${cfg.title}</div>
    <div style="font-family:'Inter';font-weight:500;font-size:26px;color:${dark?C.mutedOnDark:C.muted};max-width:660px;line-height:1.6">${cfg.body}</div>
    <div style="margin-top:56px;display:inline-flex;align-items:center;gap:16px;background:${dark?C.paper:C.green};
      color:${dark?C.green:C.paper};font-family:'Inter';font-weight:700;font-size:26px;letter-spacing:.02em;padding:24px 44px;border-radius:999px">
      ${cfg.cta||'Contactez-moi'}
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </div>
    ${cfg.swipe?`<div style="margin-top:38px;font-family:'Inter';font-weight:600;letter-spacing:.2em;text-transform:uppercase;font-size:16px;color:${dark?C.mutedOnDark:C.muted}">↑ ${cfg.swipe} ↑</div>`:''}
  </div>
  <div style="position:absolute;left:0;right:0;bottom:74px;text-align:center">${brandTag(dark)}</div>`;
}

// F · Testimonial / quote  [story/post]
function quoteCard(cfg){
  const dark=cfg.dark===true;
  const bg=dark?C.green:C.paper2; const ink=dark?C.paper:C.ink;
  return `
  <div style="position:absolute;inset:0;background:${bg}"></div>
  ${corners(dark)}
  <div style="position:absolute;inset:52px;padding:${cfg.h>1400?'96px 70px':'80px 72px'};display:flex;flex-direction:column;justify-content:center">
    <div class="serif" style="font-size:160px;font-weight:900;color:${dark?C.goldL:C.gold};line-height:.6;height:70px">“</div>
    <div class="serif" style="font-size:${cfg.h>1400?'62px':'50px'};font-weight:600;font-style:italic;color:${ink};line-height:1.28;margin:24px 0 46px">${cfg.quote}</div>
    <div style="display:flex;align-items:center;gap:18px">
      <div style="width:56px;height:2px;background:${dark?C.goldL:C.gold}"></div>
      <div>
        <div style="font-family:'Inter';font-weight:700;font-size:24px;color:${ink}">${cfg.who}</div>
        <div style="font-family:'Inter';font-weight:500;font-size:19px;color:${dark?C.mutedOnDark:C.muted}">${cfg.role||'Client vendeur'}</div>
      </div>
    </div>
    <div style="margin-top:56px">${'★★★★★'.split('').map(()=>`<span style="color:${dark?C.goldL:C.gold};font-size:30px">★</span>`).join(' ')}</div>
  </div>
  <div style="position:absolute;left:0;right:0;bottom:70px;text-align:center">${brandTag(dark)}</div>`;
}

// G · Tips / list  [story/post]
function tipsCard(cfg){
  const dark=cfg.dark===true; const bg=dark?C.green:C.paper; const ink=dark?C.paper:C.ink;
  const big=cfg.h>1400; const many=cfg.items.length>4;
  const ip = big ? 32 : (many?15:24);         // per-item vertical padding
  const tSize = big?80:(many?46:58);          // title size
  const itSize = big?30:(many?26:28);         // item title size
  return `
  <div style="position:absolute;inset:0;background:${bg}"></div>
  <div style="position:absolute;inset:52px;padding:${big?'90px 66px':'58px 62px'};display:flex;flex-direction:column">
    <div class="eyebrow" style="color:${dark?C.goldL:C.gold};font-size:${big?19:16}px">${cfg.eyebrow||'Le conseil'}</div>
    <h1 class="serif" style="font-size:${tSize}px;font-weight:800;color:${ink};line-height:1.04;margin:${big?'22px 0 8px':'16px 0 6px'}">${cfg.title}</h1>
    <hr class="rule" style="background:${dark?C.lineOnDark:C.line};margin:${big?'40px':'28px'} 0 0">
    <div style="display:flex;flex-direction:column">
      ${cfg.items.map((it,i)=>`<div style="display:flex;gap:${big?28:22}px;padding:${ip}px 0;${i?`border-top:1px solid ${dark?C.lineOnDark:C.line}`:''};align-items:baseline">
        <div class="serif" style="font-size:${big?44:36}px;font-weight:700;color:${dark?C.goldL:C.gold};flex:none;width:${big?64:52}px">${String(i+1).padStart(2,'0')}</div>
        <div><div style="font-family:'Inter';font-weight:700;font-size:${itSize}px;color:${ink};line-height:1.3">${it.t}</div>
        ${it.d?`<div style="font-family:'Inter';font-weight:500;font-size:${big?22:20}px;color:${dark?C.mutedOnDark:C.muted};margin-top:8px;line-height:1.5">${it.d}</div>`:''}</div></div>`).join('')}
    </div>
    <div style="margin-top:auto;padding-top:${big?44:26}px">${brandTag(dark)}</div>
  </div>`;
}

// H · Before / after  [story/post]
function beforeAfter(cfg){
  const dark=false;
  return `
  <div style="position:absolute;inset:0;background:${C.paper}"></div>
  <div style="position:absolute;inset:52px;padding:66px 60px;display:flex;flex-direction:column">
    <div class="eyebrow" style="color:${C.gold};text-align:center">${cfg.eyebrow||'Home staging'}</div>
    <h1 class="serif" style="font-size:${cfg.h>1400?'74px':'58px'};font-weight:800;color:${C.ink};text-align:center;margin:20px 0 40px;line-height:1.03">${cfg.title}</h1>
    <div style="flex:1;display:flex;flex-direction:${cfg.h>1400?'column':'row'};gap:24px">
      ${['Avant','Après'].map((lb,i)=>`<div style="flex:1;display:flex;flex-direction:column;gap:16px">
        <div style="position:relative;flex:1">${photo({h:'100%',label:lb==='Avant'?'Photo avant':'Photo après'})}
          <div style="position:absolute;top:20px;left:20px;background:${i?C.green:'rgba(33,31,26,.72)'};color:${C.paper};
            font-family:'Inter';font-weight:700;letter-spacing:.18em;text-transform:uppercase;font-size:16px;padding:12px 20px">${lb}</div></div>
      </div>`).join('')}
    </div>
    <div style="margin-top:40px;text-align:center">${cfg.note?`<div style="font-family:'Inter';font-weight:500;font-size:22px;color:${C.muted};margin-bottom:26px">${cfg.note}</div>`:''}${brandTag(false)}</div>
  </div>`;
}

// I · Agent card / contact  [story/post]
function agentCard(cfg){
  const dark=true;
  return `
  <div style="position:absolute;inset:0;background:${C.green}"></div>
  ${corners(true)}
  <div style="position:absolute;inset:52px;padding:70px 62px;display:flex;flex-direction:column;align-items:center;text-align:center">
    <div style="width:${cfg.h>1400?'420px':'300px'};height:${cfg.h>1400?'420px':'300px'};border-radius:50%;overflow:hidden;border:2px solid ${C.goldL}">
      ${photo({dark:true,radius:0,h:'100%',label:'Votre portrait'})}</div>
    <div class="eyebrow" style="color:${C.goldL};margin-top:52px">${cfg.eyebrow||'Votre conseillère'}</div>
    <div class="serif" style="font-size:${cfg.h>1400?'92px':'70px'};font-weight:800;color:${C.paper};line-height:1.02;margin:18px 0 14px">${cfg.name||'Camille Laurent'}</div>
    <div style="font-family:'Inter';font-weight:500;font-size:24px;color:${C.mutedOnDark};max-width:640px;line-height:1.55">${cfg.bio}</div>
    <div style="flex:1"></div>
    <div style="width:100%;border-top:1px solid ${C.lineOnDark};padding-top:40px;display:flex;justify-content:center;gap:${cfg.h>1400?'60px':'40px'};flex-wrap:wrap">
      ${(cfg.contacts||[]).map(c=>`<div><div style="font-family:'Inter';font-weight:600;letter-spacing:.18em;text-transform:uppercase;font-size:13px;color:${C.goldL}">${c.l}</div>
        <div style="font-family:'Inter';font-weight:600;font-size:${cfg.h>1400?'24px':'20px'};color:${C.paper};margin-top:8px">${c.v}</div></div>`).join('')}
    </div>
  </div>`;
}

// J · Market stats  [post]
function statsCard(cfg){
  const dark=false;
  return `
  <div style="position:absolute;inset:0;background:${C.paper}"></div>
  <div style="position:absolute;inset:52px;padding:74px 66px;display:flex;flex-direction:column">
    <div class="eyebrow" style="color:${C.gold}">${cfg.eyebrow||'Le marché'}</div>
    <h1 class="serif" style="font-size:62px;font-weight:800;color:${C.ink};line-height:1.04;margin:20px 0 4px">${cfg.title}</h1>
    <div style="font-family:'Inter';font-weight:500;font-size:22px;color:${C.muted}">${cfg.sub||''}</div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:0;margin-top:20px">
      ${cfg.stats.map((s,i)=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:38px 0;${i?`border-top:1px solid ${C.line}`:''}">
        <div style="font-family:'Inter';font-weight:600;font-size:26px;color:${C.ink};max-width:520px">${s.l}</div>
        <div class="serif" style="font-size:76px;font-weight:800;color:${C.gold};line-height:.9">${s.v}</div></div>`).join('')}
    </div>
    <div style="margin-top:auto;padding-top:30px;display:flex;justify-content:space-between;align-items:center">
      ${brandTag(false)}<div style="font-family:'Inter';font-weight:500;font-size:16px;color:${C.muted}">${cfg.source||'Source : à personnaliser'}</div></div>
  </div>`;
}

// K · FAQ / single question  [post]
function faqCard(cfg){
  const dark=cfg.dark===true; const bg=dark?C.green:C.paper2; const ink=dark?C.paper:C.ink;
  return `
  <div style="position:absolute;inset:0;background:${bg}"></div>
  ${corners(dark)}
  <div style="position:absolute;inset:52px;padding:80px 68px;display:flex;flex-direction:column;justify-content:center">
    <div class="eyebrow" style="color:${dark?C.goldL:C.gold}">${cfg.eyebrow||'Bon à savoir'}</div>
    <div class="serif" style="font-size:56px;font-weight:800;color:${ink};line-height:1.1;margin:24px 0 30px">${cfg.q}</div>
    <hr class="rule" style="background:${dark?C.lineOnDark:C.line};margin-bottom:30px">
    <div style="font-family:'Inter';font-weight:500;font-size:27px;color:${dark?C.mutedOnDark:C.muted};line-height:1.6">${cfg.a}</div>
    <div style="margin-top:52px">${brandTag(dark)}</div>
  </div>`;
}

// L · Neighborhood guide  [post/story]
function hoodCard(cfg){
  const dark=false;
  return `
  <div style="position:absolute;inset:0;background:${C.paper}"></div>
  <div style="position:absolute;top:0;left:0;right:0;height:${cfg.h>1400?'980px':'520px'}">${photo({h:'100%',label:'Photo du quartier'})}</div>
  <div style="position:absolute;top:${cfg.h>1400?'980px':'520px'};left:0;right:0;bottom:0;padding:${cfg.h>1400?'70px 72px':'56px 64px'};display:flex;flex-direction:column">
    <div class="eyebrow" style="color:${C.gold}">${cfg.eyebrow||'Le quartier'}</div>
    <h1 class="serif" style="font-size:${cfg.h>1400?'80px':'60px'};font-weight:800;color:${C.ink};line-height:1.02;margin:18px 0 30px">${cfg.title}</h1>
    <div style="display:flex;flex-direction:column;gap:0">
      ${cfg.points.map((p,i)=>`<div style="display:flex;align-items:center;gap:22px;padding:${cfg.h>1400?'26px 0':'20px 0'};${i?`border-top:1px solid ${C.line}`:''}">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${C.gold}" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
        <div style="font-family:'Inter';font-weight:500;font-size:${cfg.h>1400?'27px':'23px'};color:${C.ink}">${p}</div></div>`).join('')}
    </div>
    <div style="margin-top:auto;padding-top:34px">${brandTag(false)}</div>
  </div>`;
}

/* ---------- TEMPLATES (30) ---------- */
const S=[1080,1920], P=[1080,1080];
const T = [
  // ---- 15 STORIES ----
  {id:'01-story-a-vendre', size:S, fn:listingHero, cfg:{dark:false, badge:'À vendre', eyebrow:'Nouveau sur le marché',
    title:'Maison de charme<br>avec jardin', price:'395 000 €', address:'Rue des Tilleuls<br>Bordeaux — 33000',
    specs:[{v:'4',l:'Chambres'},{v:'2',l:'Salles de bain'},{v:'145 m²',l:'Surface'}]}},
  {id:'02-story-vendu', size:S, fn:announce, cfg:{dark:true, eyebrow:'Encore une réussite', word:'VENDU',
    sub:'Vendu en 3 semaines, au prix affiché.', stat:'Envie de vendre aussi vite ? Parlons-en.'}},
  {id:'03-story-portes-ouvertes', size:S, fn:eventCard, cfg:{eyebrow:'Portes ouvertes', title:'Visitez sans<br>rendez-vous',
    sub:'Venez découvrir ce bien d’exception ce week-end.',
    rows:[{l:'Date',v:'Sam. 14'},{l:'Horaire',v:'10h–13h'},{l:'Lieu',v:'12 rue Pey'}]}},
  {id:'04-story-baisse-prix', size:S, fn:priceDrop, cfg:{eyebrow:'Opportunité à saisir', title:'Le prix vient<br>de baisser',
    oldPrice:'429 000 €', newPrice:'389 000 €', specs:[{v:'3',l:'Chambres'},{v:'1',l:'Garage'},{v:'112 m²',l:'Surface'}]}},
  {id:'05-story-coup-de-coeur', size:S, fn:listingHero, cfg:{dark:true, badge:'Coup de cœur', eyebrow:'Sélection de la semaine',
    title:'Appartement<br>lumineux, dernier étage', price:'268 000 €', address:'Quartier des Chartrons<br>Bordeaux',
    specs:[{v:'2',l:'Chambres'},{v:'1',l:'Balcon'},{v:'68 m²',l:'Surface'}]}},
  {id:'06-story-nouveau-bien', size:S, fn:announce, cfg:{dark:true, eyebrow:'Tout juste disponible', word:'NOUVEAU',
    sub:'Un nouveau bien vient d’arriver dans votre secteur.', stat:'Soyez les premiers à le visiter.'}},
  {id:'07-story-estimation', size:S, fn:ctaCard, cfg:{dark:true, eyebrow:'Offert · sans engagement', title:'Estimation<br>gratuite',
    body:'Connaissez la vraie valeur de votre bien en 48h, réalisée par un expert de votre secteur.',
    cta:'Demander mon estimation', swipe:'Balayez vers le haut'}},
  {id:'08-story-sous-compromis', size:S, fn:announce, cfg:{dark:true, eyebrow:'Mise à jour', word:'SOUS<br>COMPROMIS', wordSize:128,
    sub:'Ce bien a trouvé preneur. D’autres arrivent bientôt.'}},
  {id:'09-story-temoignage', size:S, fn:quoteCard, cfg:{dark:true, quote:'Camille a vendu notre maison en un temps record, avec un vrai professionnalisme. On recommande à 100%.',
    who:'Julie & Marc', role:'Vendeurs à Bordeaux'}},
  {id:'10-story-visite-privee', size:S, fn:ctaCard, cfg:{dark:false, eyebrow:'Sur rendez-vous', title:'Réservez<br>votre visite',
    body:'Une visite privée, à votre rythme, pour vous projeter en toute sérénité.', cta:'Prendre rendez-vous', swipe:'Écrivez-moi en DM'}},
  {id:'11-story-quartier', size:S, fn:hoodCard, cfg:{eyebrow:'Vivre ici', title:'Le quartier<br>en un coup d’œil',
    points:['Écoles et crèches à moins de 5 min','Commerces et marché de plein air','Tramway direct vers le centre','Parc et pistes cyclables à proximité']}},
  {id:'12-story-conseils', size:S, fn:tipsCard, cfg:{dark:true, eyebrow:'Le conseil du jour', title:'3 gestes avant<br>de mettre en vente',
    items:[{t:'Désencombrez chaque pièce',d:'Un intérieur épuré paraît plus grand et plus lumineux.'},
      {t:'Réparez les petits défauts',d:'Poignées, joints, peinture : les détails rassurent l’acheteur.'},
      {t:'Soignez la première photo',d:'80% des acheteurs commencent leur recherche en ligne.'}]}},
  {id:'13-story-avant-apres', size:S, fn:beforeAfter, cfg:{eyebrow:'Home staging', title:'La même pièce,<br>transformée',
    note:'Un home staging soigné accélère la vente et valorise le bien.'}},
  {id:'14-story-bientot', size:S, fn:announce, cfg:{dark:true, eyebrow:'À ne pas manquer', word:'BIENTÔT<br>DISPO', sub:'Un bien rare arrive dans ce secteur très recherché.', stat:'Inscrivez-vous à la liste d’attente.'}},
  {id:'15-story-contact', size:S, fn:agentCard, cfg:{eyebrow:'Votre conseillère', name:'Camille Laurent',
    bio:'15 ans d’expérience au service des vendeurs et acheteurs de la région bordelaise.',
    contacts:[{l:'Téléphone',v:'06 12 34 56 78'},{l:'Email',v:'camille@meridien.fr'},{l:'Instagram',v:'@agence.meridien'}]}},

  // ---- 15 POSTS ----
  {id:'16-post-a-vendre', size:P, fn:listingHero, cfg:{h:1080, dark:false, badge:'À vendre', eyebrow:'Nouveau sur le marché',
    title:'Villa contemporaine', price:'520 000 €', address:'Le Bouscat — 33110',
    specs:[{v:'5',l:'Pièces'},{v:'3',l:'Chambres'},{v:'180 m²',l:'Surface'}]}},
  {id:'17-post-vendu', size:P, fn:announce, cfg:{h:1080, dark:true, eyebrow:'Mission accomplie', word:'VENDU', sub:'Au prix, en moins de 30 jours.'}},
  {id:'18-post-stats-marche', size:P, fn:statsCard, cfg:{eyebrow:'Le marché local', title:'L’immobilier près de chez vous',
    sub:'Chiffres clés du trimestre — à personnaliser', stats:[{l:'Prix moyen au m²',v:'3 450 €'},{l:'Délai de vente moyen',v:'62 j'},{l:'Biens vendus ce trimestre',v:'+18%'}], source:'Source : à personnaliser'}},
  {id:'19-post-temoignage', size:P, fn:quoteCard, cfg:{dark:false, quote:'Un accompagnement du début à la fin, toujours disponible. Exactement l’agent qu’il nous fallait.',
    who:'Famille Doucet', role:'Acheteurs'}},
  {id:'20-post-agent', size:P, fn:agentCard, cfg:{h:1080, eyebrow:'Enchantée !', name:'Camille Laurent',
    bio:'Conseillère immobilière à Bordeaux. Mon métier : vendre vite, au juste prix, sans stress.',
    contacts:[{l:'Tél',v:'06 12 34 56 78'},{l:'Email',v:'camille@meridien.fr'}]}},
  {id:'21-post-checklist', size:P, fn:tipsCard, cfg:{dark:true, eyebrow:'Le guide', title:'Acheter en 6 étapes',
    items:[{t:'Définir son budget et sa capacité d’emprunt'},{t:'Obtenir un accord de principe bancaire'},{t:'Cibler ses visites'},{t:'Faire une offre au juste prix'},{t:'Signer le compromis'},{t:'Finaliser chez le notaire'}]}},
  {id:'22-post-erreurs', size:P, fn:tipsCard, cfg:{dark:false, eyebrow:'À éviter', title:'3 erreurs qui font fuir les acheteurs',
    items:[{t:'Surévaluer son bien',d:'Un prix trop haut fait perdre les meilleures semaines.'},{t:'Des photos sombres',d:'La lumière vend. Photographiez de jour, rangé.'},{t:'Être trop peu disponible',d:'Chaque visite manquée est un acheteur perdu.'}]}},
  {id:'23-post-quartier', size:P, fn:hoodCard, cfg:{h:1080, eyebrow:'Zoom quartier', title:'Pourquoi on aime ce secteur',
    points:['Marché et commerces à pied','Bonnes écoles réputées','Transports en 5 minutes','Cadre calme et verdoyant']}},
  {id:'24-post-estimation', size:P, fn:ctaCard, cfg:{dark:true, eyebrow:'Offert', title:'Combien vaut votre bien ?',
    body:'Recevez une estimation précise et gratuite, réalisée par un expert local.', cta:'Je veux mon estimation'}},
  {id:'25-post-coup-de-coeur', size:P, fn:listingHero, cfg:{h:1080, dark:true, badge:'Coup de cœur', eyebrow:'Sélection',
    title:'Loft atypique', price:'312 000 €', address:'Bordeaux — Bastide',
    specs:[{v:'3',l:'Pièces'},{v:'1',l:'Terrasse'},{v:'95 m²',l:'Surface'}]}},
  {id:'26-post-portes-ouvertes', size:P, fn:eventCard, cfg:{h:1080, eyebrow:'Portes ouvertes', title:'On vous attend',
    sub:'Visite libre ce samedi.', rows:[{l:'Date',v:'Sam. 14'},{l:'Horaire',v:'10h–13h'},{l:'Adresse',v:'12 rue Pey'}]}},
  {id:'27-post-avant-apres', size:P, fn:beforeAfter, cfg:{h:1080, eyebrow:'Home staging', title:'Avant / Après'}},
  {id:'28-post-faq', size:P, fn:faqCard, cfg:{dark:false, eyebrow:'Vous vous demandez', q:'Faut-il vendre avant d’acheter ?',
    a:'Tout dépend de votre situation et du marché. On étudie ensemble le bon timing pour éviter de payer deux crédits — ou de vous retrouver sans logement.'}},
  {id:'29-post-financement', size:P, fn:faqCard, cfg:{dark:true, eyebrow:'Le bon réflexe', q:'Négociez votre taux, pas que le prix',
    a:'Sur un prêt de 250 000 €, 0,3% de taux en moins, c’est près de 12 000 € économisés. Faites jouer la concurrence entre les banques.'}},
  {id:'30-post-contact', size:P, fn:ctaCard, cfg:{dark:false, eyebrow:'Un projet ?', title:'Parlons-en',
    body:'Achat, vente, estimation : le premier échange est toujours gratuit et sans engagement.', cta:'Contactez-moi'}},
];

/* ---------- BUILD ---------- */
const manifest=[];
for(const t of T){
  const [w,h]=t.size;
  const cfg={...t.cfg, w, h}; if(cfg.h===undefined) cfg.h=h;
  const inner=t.fn(cfg);
  const html=`<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
${FONTFACE}
${BASE}
html,body{width:${w}px;height:${h}px}
.stage{width:${w}px;height:${h}px}
</style></head><body><div class="stage">${inner}<div class="grain"></div></div></body></html>`;
  const file=`${t.id}.html`;
  fs.writeFileSync(path.join(OUT,file), html);
  manifest.push({file, png:`${t.id}.png`, w, h});
}
fs.writeFileSync(path.join(ROOT,'manifest.json'), JSON.stringify(manifest,null,2));
console.log('Generated '+T.length+' templates -> '+OUT);
console.log('Manifest -> '+ROOT+'/manifest.json');
