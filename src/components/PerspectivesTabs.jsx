import React, { useState, useMemo } from "react";
import { useTheme } from "../data/theme";
import { SPEAKERS } from "../data/speakers";
import { useTX } from "../data/TranscriptContext";

/* ── Highlight helper ──────────────────────────────────── */
function HighlightText({text, query, highlightColor}) {
  if(!query || !query.trim() || !text) return <>{text}</>;
  const q = query.trim();
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  const parts = text.split(regex);
  return <>{parts.map((part,i)=>
    regex.test(part)
      ? <mark key={i} style={{background:highlightColor||'#C9980020',color:'inherit',borderRadius:2,padding:'0 1px',borderBottom:`1.5px solid ${highlightColor||'#C99800'}50`}}>{part}</mark>
      : part
  )}</>;
}

// ══════════════════════════════════════════════════════════════
// ── PerspectivesTabs — v12 with keyword highlighting ─────────
// ══════════════════════════════════════════════════════════════
export const PerspectivesTabs = ({topic,lang,searchQuery=""}) => {
  const t = useTheme();
  const TX = useTX();
  const sids = topic.perspectives || [];
  const [tab, setTab] = useState(sids[0] || "elmasry");
  const sp = SPEAKERS[tab];
  const tx = TX?.[topic.id]?.[tab];
  const text = tx?.[lang] || tx?.en || "";

  const blocks = useMemo(()=>{
    if(!text) return [];
    return text.match(/[^.!?'"]+(?:[.!?'"]+|$)/g)?.reduce((acc,s,i) => {
      const idx=Math.floor(i/3);
      acc[idx]=(acc[idx]||"")+s;
      return acc;
    },[])||[text];
  },[text]);

  if(!sids.length) return null;

  return <div style={{marginBottom:28}}>
    <h2 style={{fontSize:11,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10}}>
      {lang==="en"?"Perspectives":"Perspektifler"} ({sids.length})</h2>
    <div className="tabs-row" style={{display:"flex",gap:0,borderRadius:12,overflow:"hidden",border:`1px solid ${t.goldBorder}`,marginBottom:16,overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
      {sids.map(sid => { const s=SPEAKERS[sid]; if(!s)return null; const on=tab===sid;
        return <button key={sid} onClick={()=>setTab(sid)} style={{flex:"1 0 auto",minWidth:60,padding:"10px 6px",border:"none",cursor:"pointer",background:on?s.color:t.parchmentDeep,color:on?"#fff":t.inkMuted,fontFamily:"'Cormorant Garamond',serif",fontSize:11,fontWeight:600,transition:"all .25s",borderRight:`1px solid ${t.goldBorder}`}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:1,opacity:on?1:.4}}>{s.portrait}</div>
          <div style={{fontSize:9,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.name.split(" ").pop()}</div>
          <span style={{fontSize:7,opacity:.6}}>{s.type==="video"?"📹":"🎧"}</span>
        </button>; })}
    </div>
    {sp && <div style={{animation:"fadeIn .3s ease",padding:"16px 18px",borderRadius:12,background:`${sp.color}05`,border:`1px solid ${sp.color}15`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{width:40,height:40,borderRadius:"50%",background:`${sp.color}15`,border:`2px solid ${sp.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:sp.color,fontFamily:"system-ui",flexShrink:0}}>{sp.portrait}</div>
        <div><div style={{fontSize:14,fontWeight:600,color:t.ink,fontFamily:"'Cormorant Garamond',serif"}}>{sp.name}</div><div style={{fontSize:10,color:t.inkMuted}}>{sp.title[lang]}</div></div>
      </div>
      {blocks.length>0 ? blocks.map((p,i) => <p key={i} style={{fontSize:15,lineHeight:1.85,color:t.ink,fontFamily:"'Crimson Pro',serif",textAlign:"justify",margin:"0 0 14px",textIndent:i>0?"1.2em":0}}>
        <HighlightText text={p.trim()} query={searchQuery} highlightColor={sp.color}/>
      </p>)
        : <p style={{fontSize:13,color:t.inkMuted,fontStyle:"italic"}}>{lang==="en"?"Transcript coming soon…":"Transkript yakında…"}</p>}
      {sp.channel && <div style={{marginTop:8,textAlign:"right"}}><a href={sp.channel} target="_blank" rel="noopener noreferrer" style={{fontSize:9,color:t.inkMuted,textDecoration:"none",fontFamily:"system-ui",opacity:.5}}>{sp.type==="video"?"📹":"🎧"} {lang==="en"?"Source":"Kaynak"} →</a></div>}
    </div>}
  </div>;
};
