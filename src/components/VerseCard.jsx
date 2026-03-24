import React from "react";
import { useTheme } from "../data/theme";
import { Orn } from "./Common";
import { AudioPlayer } from "./AudioPlayer";

export const VerseCard = ({ayah,lang}) => { const t=useTheme(); if(!ayah)return null; return <div style={{marginBottom:24,padding:"20px 22px",borderRadius:12,background:t.verseBg,border:`1px solid ${t.verseBorder}`,textAlign:"center"}}><p style={{fontSize:"clamp(20px,4vw,26px)",lineHeight:2,color:t.gold,fontFamily:"'Amiri','Traditional Arabic',serif",direction:"rtl",marginBottom:8}}>{ayah.ar}</p><Orn w={30}/><p style={{fontSize:13,lineHeight:1.7,color:t.inkSoft,fontStyle:"italic",fontFamily:"'Crimson Pro',serif",margin:"8px 0 4px"}}>{ayah.meal?.[lang]}</p><p style={{fontSize:10,color:t.inkMuted,fontFamily:"system-ui"}}>{ayah.ref}</p><AudioPlayer verses={ayah.verses} lang={lang}/></div>; };

// ── Source Card ───────────────────────────────────────────────

