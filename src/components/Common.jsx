import React, { useState } from "react";
import { useTheme } from "../data/theme";
import { CATS } from "../data/categories";

export const ImgWithFallback = ({src,alt,style}) => { const [f,setF]=useState(false); if(f)return null; return <img src={src} alt={alt} style={style} loading="lazy" onError={()=>setF(true)} referrerPolicy="no-referrer"/>; };

const ImageGallery = ({topicId,lang}) => {
  const t = useTheme();
  const imgs = EP_IMAGES[topicId];
  if(!imgs?.length) return null;
  return <div style={{marginBottom:24}}>
    <h2 style={{fontSize:11,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10}}>🔍 {lang==="en"?"Visual Evidence":"Görsel Kanıtlar"}</h2>
    {imgs.map((img,i)=>(
      <div key={i} style={{marginBottom:12}}>
        {img.type==="svg" ? <div style={{padding:"12px",background:t.parchmentDeep,borderRadius:10,border:`1px solid ${t.goldBorder}`}}><SvgDiagram id={img.id} lang={lang}/></div>
        : img.type==="img" ? <div style={{borderRadius:10,overflow:"hidden",border:`1px solid ${t.goldBorder}`}}>
            <ImgWithFallback src={img.url} alt={img.caption?.[lang]||""} style={{width:"100%",maxHeight:300,objectFit:"cover",display:"block"}}/>
            {img.caption&&<div style={{padding:"8px 12px",background:t.parchmentDeep,fontSize:11,lineHeight:1.5,color:t.inkSoft,fontFamily:"'Crimson Pro',serif"}}>{img.caption[lang]}{img.credit&&<span style={{fontSize:9,color:t.inkMuted,marginLeft:6}}>📷 {img.credit}</span>}</div>}
          </div> : null}
      </div>
    ))}
  </div>;
};

// ── Utility Components ────────────────────────────────────────
export const GrainOverlay = () => (<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9998,opacity:.3,mixBlendMode:"multiply"}}><svg width="100%" height="100%"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#grain)"/></svg></div>);

export const Orn = ({w=60}) => { const t=useTheme(); return <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,margin:"8px 0",opacity:.25}}><div style={{width:w,height:1,background:`linear-gradient(90deg,transparent,${t.gold},transparent)`}}/><span style={{fontSize:8,color:t.gold}}>✦</span><div style={{width:w,height:1,background:`linear-gradient(90deg,transparent,${t.gold},transparent)`}}/></div>; };

export const Badge = ({cat,lang,big}) => { const c=CATS[cat]; if(!c)return null; return <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:big?"4px 10px":"3px 8px",borderRadius:10,fontSize:big?11:9,fontWeight:600,fontFamily:"system-ui",background:`${c.c}10`,color:c.c,border:`1px solid ${c.c}20`}}>{c.icon} {c[lang]}</span>; };

export const VerifyBadge = ({type,lang}) => { if(!type)return null; const m={checked:{en:"Verified",tr:"Doğrulanmış",c:"#0F6E56",i:"✅"},nuance:{en:"Nuance",tr:"Nüans",c:"#854F0B",i:"⚠️"}}; const b=m[type]||m.checked; return <span style={{display:"inline-flex",alignItems:"center",gap:2,padding:"2px 7px",borderRadius:8,fontSize:9,fontFamily:"system-ui",color:b.c,background:`${b.c}08`,border:`1px solid ${b.c}15`}}>{b.i} {b[lang]}</span>; };

export const ThemeToggle = ({theme,setTheme}) => { const t=useTheme(); return <button onClick={()=>setTheme(theme==="light"?"dark":"light")} style={{background:t.parchmentDeep,border:`1px solid ${t.goldBorder}`,borderRadius:16,padding:"5px 12px",cursor:"pointer",fontSize:13,color:t.gold,fontFamily:"system-ui",display:"flex",alignItems:"center",gap:4,transition:"all .2s"}}>{theme==="light"?"☽":"☀"}</button>; };

// ── Audio Player ──────────────────────────────────────────────

