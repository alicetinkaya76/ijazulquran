import React, { useState, useMemo, useCallback } from "react";
import { useTheme } from "../data/theme";
import { CATS } from "../data/categories";
import { SPEAKERS } from "../data/speakers";
import { TOPICS } from "../data/topics";
import { GrainOverlay, Orn, Badge, VerifyBadge, ThemeToggle } from "./Common";
import { VerseCard } from "./VerseCard";
import { PerspectivesTabs } from "./PerspectivesTabs";
import { ImageGallery } from "./ImageGallery";
import { SourceCard } from "./SourceCard";
import { HadithCard } from "./HadithCard";

export const TopicPage = ({topic,lang,onBack,theme,setTheme,searchQuery=""}) => {
  const t = useTheme();
  const [copied,setCopied] = useState(false);

  /* ── Share / Copy Link ──────────────────────────────── */
  const shareUrl = useMemo(()=>{
    const base = window.location.origin + window.location.pathname;
    return `${base}#topic/${topic.id}`;
  },[topic.id]);

  const handleShare = useCallback(async()=>{
    try {
      if(navigator.share){
        await navigator.share({title:topic.title[lang],url:shareUrl});
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(()=>setCopied(false),2000);
      }
    } catch(e){ /* user cancelled share */ }
  },[shareUrl,topic.title,lang]);

  /* ── Related Topics ─────────────────────────────────── */
  const related = useMemo(()=>{
    const persp = new Set(topic.perspectives||[]);
    return TOPICS.filter(tp=>
      tp.id!==topic.id && (
        tp.cat===topic.cat ||
        (tp.perspectives||[]).some(sid=>persp.has(sid))
      )
    ).map(tp=>{
      const score = (tp.cat===topic.cat?2:0) +
        (tp.perspectives||[]).filter(sid=>persp.has(sid)).length;
      return {...tp, _score:score};
    }).sort((a,b)=>b._score-a._score).slice(0,4);
  },[topic]);

  return <div style={{minHeight:"100vh",background:t.parchment,position:"relative"}}>
    <GrainOverlay/>
    <div style={{maxWidth:700,margin:"0 auto",padding:"0 20px 60px",position:"relative",zIndex:1}}>
      <div className="sticky-header" style={{padding:"16px 0",position:"sticky",top:0,zIndex:10,background:`linear-gradient(180deg,${t.parchment} 85%,transparent)`,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <button onClick={()=>onBack()} style={{background:t.parchmentDeep,border:`1px solid ${t.goldBorder}`,borderRadius:20,padding:"6px 16px",color:t.gold,cursor:"pointer",fontSize:12,fontFamily:"'Crimson Pro',serif"}}>← {lang==="en"?"All Topics":"Tüm Konular"}</button>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <button onClick={handleShare} style={{background:t.parchmentDeep,border:`1px solid ${t.goldBorder}`,borderRadius:20,padding:"6px 12px",color:copied?t.gold:t.inkMuted,cursor:"pointer",fontSize:11,fontFamily:"system-ui",fontWeight:600,transition:"all .2s"}} title={lang==="en"?"Copy link":"Bağlantıyı kopyala"}>
              {copied?(lang==="en"?"✓ Copied":"✓ Kopyalandı"):"🔗"}
            </button>
            <ThemeToggle theme={theme} setTheme={setTheme}/>
          </div>
        </div>
      </div>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:56,height:56,borderRadius:"50%",border:`2px solid ${CATS[topic.cat].c}30`,background:`${CATS[topic.cat].c}08`,fontSize:22,fontWeight:700,color:CATS[topic.cat].c,fontFamily:"'Cormorant Garamond',serif",marginBottom:10}}>{topic.id}</div>
        <div style={{marginBottom:6,display:"flex",justifyContent:"center",gap:6}}><Badge cat={topic.cat} lang={lang} big/><VerifyBadge type={topic.verify} lang={lang}/></div>
        <h1 style={{fontSize:"clamp(22px,4vw,30px)",fontWeight:600,color:t.ink,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.3}}>{topic.title[lang]}</h1>
        {topic.perspectives?.length>1&&<p style={{fontSize:10,color:t.inkMuted,marginTop:4,fontFamily:"system-ui"}}>{topic.perspectives.length} {lang==="en"?"speakers":"konuşmacı"}</p>}
      </div>
      <VerseCard ayah={topic.ayah} lang={lang}/>
      <PerspectivesTabs topic={topic} lang={lang} searchQuery={searchQuery}/>
      <ImageGallery topicId={topic.id} lang={lang}/>
      {topic.hadith?.length>0&&<HadithCard hadithArr={topic.hadith} lang={lang}/>}
      {topic.verifyNote&&<div style={{marginBottom:24,padding:"14px 16px",borderRadius:10,background:t.noteBg,borderLeft:`3px solid ${topic.verify==="nuance"?"#854F0B40":"#0F6E5640"}`,fontSize:13,lineHeight:1.65,color:t.inkSoft,fontFamily:"'Crimson Pro',serif"}}><strong style={{fontSize:10,fontFamily:"system-ui",letterSpacing:".06em",display:"block",marginBottom:4}}>{lang==="en"?"VERIFICATION NOTE":"DOĞRULAMA NOTU"}</strong>{topic.verifyNote[lang]}</div>}
      {topic.sources?.length>0&&<div style={{marginBottom:24}}><h2 style={{fontSize:11,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10}}>📚 {lang==="en"?"Sources":"Kaynaklar"}</h2><div style={{display:"flex",flexDirection:"column",gap:8}}>{topic.sources.map(sid=><SourceCard key={sid} srcId={sid} lang={lang}/>)}</div></div>}
      {topic.keywords&&<div style={{marginBottom:24,display:"flex",flexWrap:"wrap",gap:5}}>{topic.keywords.map((k,i)=><span key={i} style={{padding:"3px 10px",borderRadius:12,fontSize:10,background:t.goldGlow,color:t.inkSoft,border:`1px solid ${t.goldBorder}`,fontFamily:"system-ui"}}>{k}</span>)}</div>}

      {/* ── Related Topics ─────────────────────────────── */}
      {related.length>0 && <div style={{marginBottom:28}}>
        <h2 style={{fontSize:11,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10}}>🔗 {lang==="en"?"Related Topics":"İlişkili Konular"}</h2>
        <div className="related-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8}}>
          {related.map(rtp=><div key={rtp.id} onClick={()=>onBack("nav",rtp)} style={{padding:"10px 12px",borderRadius:8,background:t.cardBg,border:`1px solid ${t.cardBorder}`,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=`${CATS[rtp.cat].c}40`;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.cardBorder;}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
              <span style={{fontSize:10,color:CATS[rtp.cat].c}}>{CATS[rtp.cat].icon}</span>
              <span style={{fontSize:9,fontFamily:"system-ui",color:t.inkMuted}}>#{rtp.id}</span>
            </div>
            <div style={{fontSize:12,fontWeight:600,color:t.ink,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.3}}>{rtp.title[lang]}</div>
            {rtp.perspectives&&<div style={{display:"flex",gap:2,marginTop:4}}>
              {rtp.perspectives.slice(0,3).map(sid=>{const sp=SPEAKERS[sid];return sp?<div key={sid} style={{width:14,height:14,borderRadius:"50%",background:`${sp.color}20`,fontSize:5,display:"flex",alignItems:"center",justifyContent:"center",color:sp.color,fontWeight:800}}>{sp.portrait}</div>:null;})}
              {rtp.perspectives.length>3&&<span style={{fontSize:7,color:t.inkMuted,alignSelf:"center"}}>+{rtp.perspectives.length-3}</span>}
            </div>}
          </div>)}
        </div>
      </div>}

      <Orn/>
      <div className="nav-buttons" style={{display:"flex",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
        {topic.id>1&&<button onClick={()=>onBack("nav",TOPICS[topic.id-2])} style={{flex:1,minWidth:130,padding:"10px 14px",background:t.parchmentDeep,border:`1px solid ${t.goldBorder}`,borderRadius:8,cursor:"pointer",textAlign:"left",fontFamily:"'Crimson Pro',serif"}}><div style={{fontSize:9,color:t.gold,marginBottom:2,fontFamily:"system-ui"}}>← {lang==="en"?"PREV":"ÖNCEKİ"}</div><div style={{fontWeight:600,color:t.ink,fontSize:13}}>{TOPICS[topic.id-2]?.title[lang]}</div></button>}
        {topic.id<TOPICS.length&&<button onClick={()=>onBack("nav",TOPICS[topic.id])} style={{flex:1,minWidth:130,padding:"10px 14px",background:t.parchmentDeep,border:`1px solid ${t.goldBorder}`,borderRadius:8,cursor:"pointer",textAlign:"right",fontFamily:"'Crimson Pro',serif"}}><div style={{fontSize:9,color:t.gold,marginBottom:2,fontFamily:"system-ui"}}>{lang==="en"?"NEXT":"SONRAKİ"} →</div><div style={{fontWeight:600,color:t.ink,fontSize:13}}>{TOPICS[topic.id]?.title[lang]}</div></button>}
      </div>
    </div>
  </div>;
};
