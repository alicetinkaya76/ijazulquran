import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../data/theme";
import { RECITERS, ayahUrl } from "../data/reciters";

export const AudioPlayer = ({verses,lang}) => {
  const t=useTheme(); const [rec,setRec]=useState("alafasy"); const [playing,setPlaying]=useState(null); const audioRef=useRef(null);
  const play = (s,a) => { const url=ayahUrl(rec,s,a); if(audioRef.current)audioRef.current.pause(); const au=new Audio(url); audioRef.current=au; setPlaying(`${s}:${a}`); au.play().catch(()=>{}); au.onended=()=>setPlaying(null); };
  useEffect(()=>()=>{if(audioRef.current)audioRef.current.pause();},[]);
  if(!verses?.length) return null;
  return <div style={{marginTop:8}}>
    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:6}}>
      <span style={{fontSize:9,color:t.inkMuted,fontFamily:"system-ui"}}>{lang==="en"?"Reciter":"Kâri"}:</span>
      {Object.entries(RECITERS).map(([k,v])=><button key={k} onClick={()=>setRec(k)} style={{padding:"2px 8px",borderRadius:10,fontSize:9,fontFamily:"system-ui",border:`1px solid ${rec===k?t.gold:t.goldBorder}`,cursor:"pointer",background:rec===k?t.gold:"transparent",color:rec===k?t.parchment:t.inkMuted,transition:"all .2s"}}>{v.name[lang]}</button>)}
    </div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
      {verses.map(({s,a})=>{const key=`${s}:${a}`; return <button key={key} onClick={()=>play(s,a)} style={{padding:"4px 10px",borderRadius:8,border:`1px solid ${t.goldBorder}`,background:playing===key?t.gold:"transparent",color:playing===key?t.parchment:t.inkSoft,cursor:"pointer",fontSize:10,fontFamily:"system-ui",transition:"all .2s"}}>{playing===key?"⏸":"▶"} {s}:{a}</button>;})}
    </div>
  </div>;
};

// ── Verse Card ────────────────────────────────────────────────

