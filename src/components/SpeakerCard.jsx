import React from "react";
import { useTheme } from "../data/theme";
import { CATS } from "../data/categories";
import { TOPICS } from "../data/topics";

export const SpeakerCard = ({speaker,lang,onClick}) => {
  const t = useTheme();
  const tc = TOPICS.filter(tp=>tp.perspectives?.includes(speaker.id)).length;
  return <div onClick={onClick} style={{padding:"14px 16px",borderRadius:12,cursor:"pointer",background:t.cardBg,border:`1px solid ${speaker.color}20`,transition:"all .3s",minWidth:185,flex:"0 0 auto"}}
    onMouseEnter={e=>{e.currentTarget.style.borderColor=`${speaker.color}50`;e.currentTarget.style.boxShadow=`0 4px 20px ${t.shadow}`;}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor=`${speaker.color}20`;e.currentTarget.style.boxShadow="none";}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
      <div style={{width:44,height:44,borderRadius:"50%",background:`${speaker.color}12`,border:`2px solid ${speaker.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:speaker.color,fontFamily:"system-ui"}}>{speaker.portrait}</div>
      <div><div style={{fontSize:13,fontWeight:600,color:t.ink,fontFamily:"'Cormorant Garamond',serif"}}>{speaker.name}</div><div style={{fontSize:9,color:t.inkMuted,fontFamily:"system-ui"}}>{speaker.title[lang]}</div>
      {speaker.location&&<div style={{fontSize:8,color:t.inkMuted,fontFamily:"system-ui",opacity:.6}}>📍 {speaker.location[lang]}</div>}</div>
    </div>
    <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:6}}>
      {speaker.expertise.slice(0,3).map(e=>CATS[e]?<span key={e} style={{fontSize:7,padding:"2px 5px",borderRadius:6,background:`${CATS[e].c}10`,color:CATS[e].c,fontFamily:"system-ui"}}>{CATS[e].icon} {CATS[e][lang]}</span>:null)}
    </div>
    <div style={{display:"flex",gap:8,fontSize:9,color:t.inkMuted,fontFamily:"system-ui"}}>
      <span>📊 {tc} {lang==="en"?"topics":"konu"}</span>
      {speaker.works&&<span>📚 {speaker.works.length}</span>}
    </div>
  </div>;
};

// ── Speaker Page ──────────────────────────────────────────────

