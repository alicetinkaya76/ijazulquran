import React, { useState } from "react";
import { useTheme } from "../data/theme";

export const SvgDiagram = ({id,lang}) => {
  const t = useTheme();
  const diagrams = {
  "pharaoh-timeline": (
    <svg viewBox="0 0 420 160" style={{width:"100%",maxWidth:440}}>
      <text x="210" y="14" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700" letterSpacing="1">{lang==="en"?"TIMELINE: PHARAOH'S BODY":"KRONOLOJİ: FİRAVUN'UN BEDENİ"}</text>
      <line x1="30" y1="55" x2="390" y2="55" stroke={t.goldLight} strokeWidth="1.5"/>
      {[{x:50,year:"~1200 BCE",label:{en:"Pharaoh drowns",tr:"Firavun boğuldu"},icon:"🌊",hl:false},{x:150,year:"610 CE",label:{en:"Quran revealed:\n'Save you in body'",tr:"Kur'an indi:\n'Bedeninle kurtaracağız'"},icon:"📖",hl:true},{x:260,year:"1881",label:{en:"Mummy found\nDeir el-Bahari",tr:"Mumya bulundu\nDeir el-Bahari"},icon:"🏛️",hl:false},{x:370,year:"1975",label:{en:"Bucaille examines\nin Paris",tr:"Bucaille Paris'te\ninceledi"},icon:"🔬",hl:false}].map((p,i) => (<g key={i}><circle cx={p.x} cy={55} r={p.hl?10:7} fill={p.hl?`${t.gold}25`:t.parchmentDeep} stroke={p.hl?t.gold:t.goldLight} strokeWidth={p.hl?2:1}/><text x={p.x} y={59} textAnchor="middle" fontSize="11">{p.icon}</text><text x={p.x} y={35} textAnchor="middle" fill={p.hl?t.gold:t.inkMuted} fontSize="9" fontFamily="system-ui" fontWeight={p.hl?700:400}>{p.year}</text>{p.label[lang].split('\\n').map((l,li)=>(<text key={li} x={p.x} y={78+li*12} textAnchor="middle" fill={t.inkSoft} fontSize="8" fontFamily="'Crimson Pro',serif">{l}</text>))}</g>))}
      <text x="210" y="150" textAnchor="middle" fill={t.inkMuted} fontSize="8" fontStyle="italic">{lang==="en"?"~2,800 years between event and confirmation":"Olay ile doğrulama arasında ~2.800 yıl"}</text>
    </svg>),
  "baqarah-middle": (
    <svg viewBox="0 0 420 130" style={{width:"100%",maxWidth:440}}>
      <text x="210" y="14" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700" letterSpacing="1">{lang==="en"?"SURAH AL-BAQARAH: 286 VERSES":"BAKARA SÛRESİ: 286 AYET"}</text>
      {Array.from({length:28}).map((_,i)=>{const x=15+i*14;const mid=i===14;return(<g key={i}><rect x={x} y={30} width={12} height={mid?50:35} rx={2} fill={mid?t.gold:`${t.gold}15`} stroke={mid?t.gold:t.goldBorder} strokeWidth={mid?2:.5}/>{mid&&<><text x={x+6} y={95} textAnchor="middle" fill={t.gold} fontSize="10" fontFamily="system-ui" fontWeight="700">143</text><text x={x+6} y={108} textAnchor="middle" fill={t.gold} fontSize="8" fontFamily="'Amiri',serif">وَسَطًا</text></>}</g>);})}
      <text x="15" y={78} fill={t.inkMuted} fontSize="8" fontFamily="system-ui">1</text>
      <text x="393" y={78} fill={t.inkMuted} fontSize="8" fontFamily="system-ui" textAnchor="end">286</text>
    </svg>),
  "mountain-roots": (
    <svg viewBox="0 0 400 250" style={{width:"100%",maxWidth:420}}>
      <text x="200" y="14" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700" letterSpacing="1">{lang==="en"?"MOUNTAINS AS PEGS — ISOSTASY":"DAĞLAR KAZIK GİBİ — İZOSTAZİ"}</text>
      <rect width="400" height="100" y="20" fill={t.parchmentDeep} rx="4"/>
      <rect x="0" y="120" width="400" height="130" fill={`${t.gold}08`} stroke={t.goldLight} strokeWidth=".5" rx="4"/>
      <line x1="0" y1="120" x2="400" y2="120" stroke={t.goldLight} strokeWidth="1.5" strokeDasharray="6,3"/>
      <polygon points="140,120 200,40 260,120" fill={`${t.gold}25`} stroke={t.gold} strokeWidth="1.5"/>
      <polygon points="110,120 200,240 290,120" fill={`${t.gold}10`} stroke={t.gold} strokeWidth="1" strokeDasharray="5,3"/>
      <text x="200" y="85" textAnchor="middle" fill={t.gold} fontSize="11" fontFamily="system-ui" fontWeight="600">~4 km ▲</text>
      <text x="200" y="195" textAnchor="middle" fill={t.gold} fontSize="11" fontFamily="system-ui" fontWeight="600">~250 km ▼</text>
      <text x="355" y="116" textAnchor="middle" fill={t.inkMuted} fontSize="8">── {lang==="en"?"surface":"yüzey"} ──</text>
    </svg>),
  "name-counts": (
    <svg viewBox="0 0 420 155" style={{width:"100%",maxWidth:440}}>
      <text x="210" y="14" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700" letterSpacing="1">{lang==="en"?"PROPHET NAME FREQUENCY":"PEYGAMBER İSİM SIKLIĞI"}</text>
      {[{name:{en:"Moses (Mūsā)",tr:"Mûsâ"},count:136,c:"#0F6E56"},{name:{en:"Abraham",tr:"İbrâhîm"},count:69,c:"#854F0B"},{name:{en:"Noah (Nūḥ)",tr:"Nûh"},count:43,c:"#534AB7"},{name:{en:"Jesus (ʿĪsā)",tr:"Îsâ"},count:25,c:"#993556"},{name:{en:"Muhammad ﷺ",tr:"Muhammed ﷺ"},count:4,c:"#993C1D"}].map((p,i)=>{const w=Math.max(p.count/136*240,6);return(<g key={i}><text x="98" y={38+i*26} textAnchor="end" fill={t.inkSoft} fontSize="11" fontFamily="'Crimson Pro',serif">{p.name[lang]}</text><rect x="105" y={25+i*26} width={w} height="18" rx="4" fill={p.c+"18"} stroke={p.c+"35"} strokeWidth="1"/><text x={112+w} y={38+i*26} fill={p.c} fontSize="11" fontFamily="system-ui" fontWeight="700">{p.count}×</text></g>);})}
      <text x="210" y="150" textAnchor="middle" fill={t.inkMuted} fontSize="8" fontStyle="italic">{lang==="en"?"Source: ʿAbd al-Bāqī (1945)":"Kaynak: Abdülbâkî (1945)"}</text>
    </svg>),
  "sun-moon": (
    <svg viewBox="0 0 420 160" style={{width:"100%",maxWidth:440}}>
      <text x="210" y="14" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700" letterSpacing="1">{lang==="en"?"SUN = SOURCE (ḍiyāʾ) · MOON = REFLECTION (nūr)":"GÜNEŞ = KAYNAK (ziyâ) · AY = YANSIMA (nûr)"}</text>
      <circle cx="85" cy="80" r="38" fill="#854F0B10" stroke="#854F0B" strokeWidth="1.5"/>
      {[0,45,90,135,180,225,270,315].map(a=>{const r=45;const rad=a*Math.PI/180;return <line key={a} x1={85+38*Math.cos(rad)} y1={80+38*Math.sin(rad)} x2={85+r*Math.cos(rad)} y2={80+r*Math.sin(rad)} stroke="#854F0B40" strokeWidth="1"/>;})}
      <text x="85" y="73" textAnchor="middle" fill="#854F0B" fontSize="14" fontFamily="'Amiri',serif" fontWeight="700">ضِيَاء</text>
      <text x="85" y="90" textAnchor="middle" fill="#854F0B" fontSize="8" fontFamily="system-ui">{lang==="en"?"Self-luminous":"Kendi ışığı"}</text>
      <text x="85" y="135" textAnchor="middle" fill={t.inkMuted} fontSize="9">☀️ {lang==="en"?"Sun":"Güneş"}</text>
      <circle cx="290" cy="80" r="32" fill={`${t.gold}06`} stroke={t.goldLight} strokeWidth="1.5"/>
      <path d={`M290,48 A32,32 0 0,1 290,112`} fill={`${t.gold}15`}/>
      <text x="290" y="73" textAnchor="middle" fill={t.gold} fontSize="14" fontFamily="'Amiri',serif" fontWeight="700">نُور</text>
      <text x="290" y="90" textAnchor="middle" fill={t.gold} fontSize="8" fontFamily="system-ui">{lang==="en"?"Reflected light":"Yansıyan ışık"}</text>
      <text x="290" y="135" textAnchor="middle" fill={t.inkMuted} fontSize="9">🌙 {lang==="en"?"Moon":"Ay"}</text>
    </svg>),
  "land-sea": (
    <svg viewBox="0 0 420 155" style={{width:"100%",maxWidth:440}}>
      <text x="210" y="14" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700" letterSpacing="1">{lang==="en"?"LAND-SEA RATIO: QURAN vs GEOGRAPHY":"KARA-DENİZ: KUR'AN vs COĞRAFYA"}</text>
      <circle cx="95" cy="85" r="52" fill="#4A7B9D12" stroke="#4A7B9D40" strokeWidth="1"/>
      <path d={`M95,33 A52,52 0 0,1 ${95+52*Math.sin(2*Math.PI*0.29)},${85-52*Math.cos(2*Math.PI*0.29)} L95,85 Z`} fill="#854F0B18" stroke="#854F0B40" strokeWidth="1"/>
      <text x="68" y="100" fill="#4A7B9D" fontSize="14" fontFamily="system-ui" fontWeight="700">71%</text>
      <text x="68" y="112" fill="#4A7B9D" fontSize="8">{lang==="en"?"Sea":"Deniz"}</text>
      <text x="125" y="60" fill="#854F0B" fontSize="14" fontFamily="system-ui" fontWeight="700">29%</text>
      <text x="125" y="72" fill="#854F0B" fontSize="8">{lang==="en"?"Land":"Kara"}</text>
      <rect x="190" y="30" width="210" height="105" rx="8" fill={t.parchmentDeep} stroke={t.goldBorder} strokeWidth="1"/>
      <text x="295" y="50" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700">QUR'AN WORD COUNT</text>
      <text x="295" y="72" textAnchor="middle" fill="#4A7B9D" fontSize="13" fontFamily="'Amiri',serif" fontWeight="700">بَحْر ({lang==="en"?"sea":"deniz"}) × 32</text>
      <text x="295" y="90" textAnchor="middle" fill="#854F0B" fontSize="13" fontFamily="'Amiri',serif" fontWeight="700">بَرّ ({lang==="en"?"land":"kara"}) × 13</text>
      <line x1="210" y1="98" x2="380" y2="98" stroke={t.goldBorder} strokeWidth=".5"/>
      <text x="295" y="113" textAnchor="middle" fill={t.inkSoft} fontSize="10" fontFamily="system-ui">32/45 = 71.1% · 13/45 = 28.9%</text>
    </svg>),
  "embryo-stages": (
    <svg viewBox="0 0 420 130" style={{width:"100%",maxWidth:440}}>
      <text x="210" y="14" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700" letterSpacing="1">{lang==="en"?"EMBRYONIC STAGES IN THE QURAN":"KUR'AN'DA EMBRİYONİK AŞAMALAR"}</text>
      {[{x:70,ar:"نُطْفَة",en:"Nuṭfah",tr:"Nutfe",desc:{en:"Drop / Zygote",tr:"Damla / Zigot"},c:"#534AB7"},{x:170,ar:"عَلَقَة",en:"ʿAlaqah",tr:"Alaka",desc:{en:"Clinging / Leech-like",tr:"Yapışan / Sülük-benzeri"},c:"#993556"},{x:270,ar:"مُضْغَة",en:"Muḍghah",tr:"Mudğa",desc:{en:"Chewed lump",tr:"Çiğnenmiş parça"},c:"#854F0B"},{x:370,ar:"عِظَام + لَحْم",en:"ʿIẓām + Laḥm",tr:"Kemik + Et",desc:{en:"Bones + Flesh",tr:"Kemik + Et"},c:"#0F6E56"}].map((s,i)=>(<g key={i}><circle cx={s.x} cy={55} r={22} fill={s.c+"10"} stroke={s.c+"35"} strokeWidth="1.5"/><text x={s.x} y={50} textAnchor="middle" fill={s.c} fontSize="11" fontFamily="'Amiri',serif" fontWeight="700">{s.ar}</text><text x={s.x} y={63} textAnchor="middle" fill={s.c} fontSize="7" fontFamily="system-ui">{s.en}</text><text x={s.x} y={90} textAnchor="middle" fill={t.inkSoft} fontSize="8" fontFamily="'Crimson Pro',serif">{s.desc[lang]}</text>{i<3&&<line x1={s.x+25} y1={55} x2={s.x+50} y2={55} stroke={t.goldLight} strokeWidth="1" strokeDasharray="4,3"/>}</g>))}
      <text x="210" y="120" textAnchor="middle" fill={t.inkMuted} fontSize="8" fontStyle="italic">{lang==="en"?"Confirmed by Prof. Keith Moore (1980)":"Prof. Keith Moore tarafından teyit edildi (1980)"}</text>
    </svg>),
  "iron-journey": (
    <svg viewBox="0 0 420 110" style={{width:"100%",maxWidth:440}}>
      <text x="210" y="12" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700" letterSpacing="1">{lang==="en"?"THE COSMIC JOURNEY OF IRON":"DEMİRİN KOZMİK YOLCULUĞU"}</text>
      {[{x:50,icon:"★",label:{en:"Massive Star",tr:"Büyük Yıldız"},bg:"#854F0B"},{x:160,icon:"💥",label:{en:"Supernova",tr:"Süpernova"},bg:"#993C1D"},{x:270,icon:"☄️",label:{en:"Meteorites",tr:"Göktaşları"},bg:"#534AB7"},{x:380,icon:"🌍",label:{en:"Earth (57:25)",tr:"Dünya (57:25)"},bg:"#0F6E56"}].map((s,i)=>(<g key={i}><circle cx={s.x} cy={50} r={22} fill={s.bg+"10"} stroke={s.bg+"40"} strokeWidth="1.5"/><text x={s.x} y={55} textAnchor="middle" fontSize="16">{s.icon}</text><text x={s.x} y={85} textAnchor="middle" fill={t.inkSoft} fontSize="9" fontFamily="'Crimson Pro',serif" fontWeight="600">{s.label[lang]}</text>{i<3&&<line x1={s.x+25} y1={50} x2={s.x+60} y2={50} stroke={t.goldLight} strokeWidth="1" strokeDasharray="4,3"/>}</g>))}
    </svg>),
  "solar-flare": (
    <svg viewBox="0 0 420 140" style={{width:"100%",maxWidth:440}}>
      <text x="210" y="14" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700" letterSpacing="1">{lang==="en"?"SOLAR FLARES — QURAN vs REALITY":"GÜNEŞ PATLAMALARI — KUR'AN vs GERÇEKLİK"}</text>
      <circle cx="100" cy="75" r="35" fill="#854F0B10" stroke="#854F0B50" strokeWidth="2"/><text x="100" y="79" textAnchor="middle" fill="#854F0B" fontSize="20">☀</text>
      <rect x="200" y="25" width="200" height="100" rx="8" fill={t.parchmentDeep} stroke={t.goldBorder} strokeWidth="1"/>
      <text x="300" y="45" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700">QUR'AN 77:32-33</text>
      <text x="300" y="67" textAnchor="middle" fill={t.ink} fontSize="14" fontFamily="'Amiri',serif" direction="rtl">تَرْمِي بِشَرَرٍ كَالْقَصْرِ</text>
      <text x="300" y="82" textAnchor="middle" fill={t.inkSoft} fontSize="9" fontStyle="italic">{lang==="en"?'"Sparks like a palace"':'"Saray gibi kıvılcımlar"'}</text>
      <text x="300" y="100" textAnchor="middle" fill={t.ink} fontSize="14" fontFamily="'Amiri',serif" direction="rtl">كَأَنَّهُ جِمَالَتٌ صُفْرٌ</text>
      <text x="300" y="115" textAnchor="middle" fill={t.inkSoft} fontSize="9" fontStyle="italic">{lang==="en"?'"As if yellow camels"':'"Sanki sarı develer"'}</text>
    </svg>),
  "bible-quran-compare": (
    <svg viewBox="0 0 420 100" style={{width:"100%",maxWidth:440}}>
      <text x="210" y="14" textAnchor="middle" fill={t.gold} fontSize="9" fontFamily="system-ui" fontWeight="700" letterSpacing="1">{lang==="en"?"BIBLE vs QURAN":"TEVRAT vs KUR'AN"}</text>
      <rect x="10" y="25" width="190" height="40" rx="6" fill="#993C1D08" stroke="#993C1D30"/><text x="105" y="40" textAnchor="middle" fill="#993C1D" fontSize="9" fontFamily="system-ui" fontWeight="600">📕 {lang==="en"?"Bible":"Tevrat"}</text><text x="105" y="55" textAnchor="middle" fill={t.inkSoft} fontSize="8">❌ {lang==="en"?"Solomon: idolater":"Süleyman: putperest"}</text>
      <text x="210" y="48" textAnchor="middle" fill={t.gold} fontSize="14">⇄</text>
      <rect x="220" y="25" width="190" height="40" rx="6" fill="#0F6E5608" stroke="#0F6E5630"/><text x="315" y="40" textAnchor="middle" fill="#0F6E56" fontSize="9" fontFamily="system-ui" fontWeight="600">📗 {lang==="en"?"Quran 2:102":"Kur'an 2:102"}</text><text x="315" y="55" textAnchor="middle" fill={t.inkSoft} fontSize="8">✅ {lang==="en"?"Solomon: innocent":"Süleyman: masum"}</text>
      <rect x="10" y="70" width="190" height="25" rx="6" fill="#993C1D08" stroke="#993C1D30"/><text x="105" y="87" textAnchor="middle" fill={t.inkSoft} fontSize="8">❌ {lang==="en"?"Joseph's ruler: 'Pharaoh'":"Yûsuf'un yöneticisi: 'Firavun'"}</text>
      <rect x="220" y="70" width="190" height="25" rx="6" fill="#0F6E5608" stroke="#0F6E5630"/><text x="315" y="87" textAnchor="middle" fill={t.inkSoft} fontSize="8">✅ {lang==="en"?"Joseph's ruler: 'al-Malik'":"Yûsuf'un yöneticisi: 'el-Melik'"}</text>
    </svg>),
  };
  return diagrams[id] || null;
};


