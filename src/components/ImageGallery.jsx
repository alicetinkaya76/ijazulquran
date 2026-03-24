import React from "react";
import { useTheme } from "../data/theme";
import { EP_IMAGES } from "../data/images";
import { SvgDiagram } from "./SvgDiagram";
import { ImgWithFallback } from "./Common";

export const ImageGallery = ({topicId,lang}) => {
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

