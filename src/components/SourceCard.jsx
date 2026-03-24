import React, { useState } from "react";
import { useTheme } from "../data/theme";
import { SRC } from "../data/sources";

export const SourceCard = ({srcId,lang}) => {
  const t=useTheme(); const s=SRC[srcId]; if(!s)return null; const [open,setOpen]=useState(false);
  return <div style={{padding:"14px 16px",borderRadius:12,background:t.sourceBg,border:`1px solid ${t.sourceBorder}`,cursor:"pointer",transition:"all .3s"}} onClick={()=>setOpen(!open)}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:40,height:40,borderRadius:"50%",background:`${s.color}12`,border:`2px solid ${s.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:s.color,fontFamily:"system-ui",flexShrink:0}}>{s.portrait}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:14,fontWeight:600,color:t.ink,fontFamily:"'Cormorant Garamond',serif"}}>{s.name}</div>
        <div style={{fontSize:10,color:t.inkMuted}}>{s.title[lang]} · {s.dates}</div>
        {s.location&&<div style={{fontSize:9,color:t.inkMuted,opacity:.6}}>📍 {s.location[lang]}</div>}
      </div>
      <span style={{fontSize:12,color:t.inkMuted,transition:"transform .3s",transform:open?"rotate(180deg)":"rotate(0)"}}>▾</span>
    </div>
    {open&&<div style={{marginTop:12}}>
      <p style={{fontSize:13,lineHeight:1.75,color:t.inkSoft,fontFamily:"'Crimson Pro',serif",marginBottom:12}}>{s.bio[lang]}</p>
      {s.works?.length>0&&<div style={{marginBottom:10}}>
        <div style={{fontSize:9,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>📚 {lang==="en"?"Key Works":"Önemli Eserler"}</div>
        {s.works.map((w,i)=><div key={i} style={{padding:"6px 10px",marginBottom:4,borderRadius:6,background:`${s.color}05`,borderLeft:`2px solid ${s.color}25`}}>
          <div style={{fontSize:12,fontWeight:600,color:t.ink,fontFamily:"'Crimson Pro',serif"}}>{w.title} <span style={{fontSize:9,color:t.inkMuted,fontWeight:400}}>({w.year})</span></div>
          <div style={{fontSize:11,color:t.inkSoft,lineHeight:1.5,fontFamily:"'Crimson Pro',serif"}}>{w.desc[lang]}</div>
          {w.link&&<a href={w.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:9,color:t.gold,textDecoration:"none",fontFamily:"system-ui",display:"inline-flex",alignItems:"center",gap:3,marginTop:3,opacity:.7}}>🔗 {w.link.includes("doi.org")?"DOI":w.link.includes("archive.org")?"Archive.org":"WorldCat"} →</a>}
        </div>)}
      </div>}
      {s.timeline?.length>0&&<div style={{marginBottom:10}}>
        <div style={{fontSize:9,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>📅 {lang==="en"?"Timeline":"Kronoloji"}</div>
        <div style={{display:"flex",flexDirection:"column",gap:2,paddingLeft:8,borderLeft:`1.5px solid ${t.goldBorder}`}}>
          {s.timeline.map((e,i)=><div key={i} style={{display:"flex",gap:8,alignItems:"baseline"}}>
            <span style={{fontSize:10,fontWeight:700,color:s.color,fontFamily:"system-ui",minWidth:36}}>{e.year}</span>
            <span style={{fontSize:11,color:t.inkSoft,fontFamily:"'Crimson Pro',serif"}}>{e.label[lang]}</span>
          </div>)}
        </div>
      </div>}
      {s.caveat&&<div style={{padding:"8px 10px",borderRadius:6,background:t.noteBg,borderLeft:`2px solid #854F0B40`,fontSize:11,lineHeight:1.6,color:t.inkSoft,fontFamily:"'Crimson Pro',serif"}}>{s.caveat[lang]}</div>}
    </div>}
  </div>;
};


