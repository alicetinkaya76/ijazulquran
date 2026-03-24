import React from "react";
import { useTheme } from "../data/theme";
import { SPEAKERS } from "../data/speakers";
import { TOPICS } from "../data/topics";
import { CATS } from "../data/categories";
import { GrainOverlay, Orn, Badge, VerifyBadge, ThemeToggle } from "./Common";

export const SpeakerPage = ({speakerId,lang,onBack,onTopic,theme,setTheme}) => {
  const t=useTheme(); const sp=SPEAKERS[speakerId]; if(!sp)return null;
  const topics=TOPICS.filter(tp=>tp.perspectives?.includes(speakerId));
  const cc={}; topics.forEach(tp=>{cc[tp.cat]=(cc[tp.cat]||0)+1;});
  const maxCatCount = Math.max(...Object.values(cc), 1);
  const totalTopics = TOPICS.length;
  const coverage = Math.round((topics.length / totalTopics) * 100);
  const allSpeakerCounts = Object.keys(SPEAKERS).map(sid => TOPICS.filter(tp=>tp.perspectives?.includes(sid)).length);
  const rank = allSpeakerCounts.filter(c => c > topics.length).length + 1;

  return <div style={{minHeight:"100vh",background:t.parchment,position:"relative"}}>
    <GrainOverlay/>
    <div style={{maxWidth:700,margin:"0 auto",padding:"0 20px 60px",position:"relative",zIndex:1}}>
      <div style={{padding:"16px 0",position:"sticky",top:0,zIndex:10,background:`linear-gradient(180deg,${t.parchment} 85%,transparent)`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <button onClick={onBack} style={{background:t.parchmentDeep,border:`1px solid ${t.goldBorder}`,borderRadius:20,padding:"6px 16px",color:t.gold,cursor:"pointer",fontSize:12,fontFamily:"'Crimson Pro',serif"}}>← {lang==="en"?"Back":"Geri"}</button>
          <ThemeToggle theme={theme} setTheme={setTheme}/>
        </div>
      </div>
      {/* Profile Header */}
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{width:84,height:84,borderRadius:"50%",margin:"0 auto 14px",background:`${sp.color}12`,border:`3px solid ${sp.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:700,color:sp.color,fontFamily:"system-ui"}}>{sp.portrait}</div>
        <h1 style={{fontSize:26,fontWeight:600,color:t.ink,fontFamily:"'Cormorant Garamond',serif",margin:"0 0 4px"}}>{sp.name}</h1>
        <p style={{fontSize:12,color:t.inkMuted}}>{sp.title[lang]}</p>
        {sp.location&&<p style={{fontSize:10,color:t.inkMuted,marginTop:2}}>📍 {sp.location[lang]}</p>}
        <div style={{display:"flex",justifyContent:"center",gap:5,marginTop:10,flexWrap:"wrap"}}>{sp.expertise.map(e=>CATS[e]?<Badge key={e} cat={e} lang={lang}/>:null)}</div>
      </div>

      {/* ── Stats Dashboard ──────────────────────────────── */}
      <div className="speaker-stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>
        <div style={{padding:"12px 10px",borderRadius:10,background:`${sp.color}06`,border:`1px solid ${sp.color}15`,textAlign:"center"}}>
          <div style={{fontSize:22,fontWeight:700,color:sp.color,fontFamily:"'Cormorant Garamond',serif"}}>{topics.length}</div>
          <div style={{fontSize:8,color:t.inkMuted,fontFamily:"system-ui",textTransform:"uppercase",letterSpacing:".06em"}}>{lang==="en"?"Topics":"Konu"}</div>
        </div>
        <div style={{padding:"12px 10px",borderRadius:10,background:`${sp.color}06`,border:`1px solid ${sp.color}15`,textAlign:"center"}}>
          <div style={{fontSize:22,fontWeight:700,color:sp.color,fontFamily:"'Cormorant Garamond',serif"}}>{coverage}%</div>
          <div style={{fontSize:8,color:t.inkMuted,fontFamily:"system-ui",textTransform:"uppercase",letterSpacing:".06em"}}>{lang==="en"?"Coverage":"Kapsam"}</div>
        </div>
        <div style={{padding:"12px 10px",borderRadius:10,background:`${sp.color}06`,border:`1px solid ${sp.color}15`,textAlign:"center"}}>
          <div style={{fontSize:22,fontWeight:700,color:sp.color,fontFamily:"'Cormorant Garamond',serif"}}>#{rank}</div>
          <div style={{fontSize:8,color:t.inkMuted,fontFamily:"system-ui",textTransform:"uppercase",letterSpacing:".06em"}}>{lang==="en"?"Rank":"Sıra"}</div>
        </div>
      </div>

      {/* ── Category Breakdown with Bars ─────────────────── */}
      <div style={{marginBottom:20,padding:"14px 16px",borderRadius:12,background:t.parchmentDeep,border:`1px solid ${t.goldBorder}`}}>
        <div style={{fontSize:9,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>📊 {lang==="en"?"Category Breakdown":"Kategori Dağılımı"}</div>
        {Object.entries(cc).sort((a,b)=>b[1]-a[1]).map(([cat,n])=>CATS[cat]?<div key={cat} style={{marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
            <span style={{fontSize:10,color:t.inkSoft,fontFamily:"system-ui"}}>{CATS[cat].icon} {CATS[cat][lang]}</span>
            <span style={{fontSize:10,fontWeight:700,color:CATS[cat].c,fontFamily:"system-ui"}}>{n}</span>
          </div>
          <div style={{height:6,borderRadius:3,background:`${CATS[cat].c}10`,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:3,background:CATS[cat].c,width:`${(n/maxCatCount)*100}%`,transition:"width .6s cubic-bezier(.4,0,.2,1)",opacity:.7}}/>
          </div>
        </div>:null)}
      </div>

      {/* Bio */}
      <p style={{fontSize:15,lineHeight:1.85,color:t.inkSoft,textAlign:"justify",fontFamily:"'Crimson Pro',serif",marginBottom:16}}>{sp.bio[lang]}</p>

      {/* Education */}
      {sp.education&&<div style={{marginBottom:16,padding:"10px 14px",borderRadius:10,background:t.parchmentDeep,border:`1px solid ${t.goldBorder}`}}>
        <div style={{fontSize:9,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".08em",textTransform:"uppercase",marginBottom:4}}>🎓 {lang==="en"?"Education & Background":"Eğitim ve Geçmiş"}</div>
        <p style={{fontSize:12.5,lineHeight:1.7,color:t.inkSoft,fontFamily:"'Crimson Pro',serif",margin:0}}>{sp.education[lang]}</p>
      </div>}

      {/* Works */}
      {sp.works?.length>0&&<div style={{marginBottom:16}}>
        <div style={{fontSize:9,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>📚 {lang==="en"?"Key Works & Series":"Önemli Eserler ve Seriler"}</div>
        {sp.works.map((w,i)=><div key={i} style={{padding:"10px 14px",marginBottom:6,borderRadius:8,background:`${sp.color}04`,borderLeft:`3px solid ${sp.color}25`,transition:"all .2s"}}>
          <div style={{fontSize:13,fontWeight:600,color:t.ink,fontFamily:"'Crimson Pro',serif"}}>{w.title} <span style={{fontSize:10,color:t.inkMuted,fontWeight:400}}>({w.year})</span></div>
          <div style={{fontSize:11.5,color:t.inkSoft,lineHeight:1.6,fontFamily:"'Crimson Pro',serif",marginTop:2}}>{w.desc[lang]}</div>
          {w.link&&<a href={w.link} target="_blank" rel="noopener noreferrer" style={{fontSize:9,color:sp.color,textDecoration:"none",fontFamily:"system-ui",display:"inline-flex",alignItems:"center",gap:3,marginTop:4,opacity:.7}}>🔗 {w.link.includes("doi.org")?"DOI":w.link.includes("archive.org")?"Archive.org":w.link.includes("worldcat")?"WorldCat":w.link.includes("yaqeen")?"Yaqeen":w.link.includes("bayyinah")?"Bayyinah":w.link.includes("sapience")?"Sapiens":"Link"} →</a>}
        </div>)}
      </div>}

      {/* Timeline */}
      {sp.timeline?.length>0&&<div style={{marginBottom:16}}>
        <div style={{fontSize:9,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>📅 {lang==="en"?"Timeline":"Kronoloji"}</div>
        <div style={{paddingLeft:12,borderLeft:`2px solid ${sp.color}20`}}>
          {sp.timeline.map((e,i)=><div key={i} style={{display:"flex",gap:10,alignItems:"baseline",marginBottom:6,position:"relative"}}>
            <div style={{position:"absolute",left:-17,top:5,width:8,height:8,borderRadius:"50%",background:i===sp.timeline.length-1?sp.color:`${sp.color}40`,border:`1.5px solid ${sp.color}`}}/>
            <span style={{fontSize:11,fontWeight:700,color:sp.color,fontFamily:"system-ui",minWidth:38}}>{e.year}</span>
            <span style={{fontSize:12,color:t.inkSoft,fontFamily:"'Crimson Pro',serif",lineHeight:1.5}}>{e.label[lang]}</span>
          </div>)}
        </div>
      </div>}

      {/* Channel Link */}
      {sp.channel&&<div style={{marginBottom:20,textAlign:"center"}}>
        <a href={sp.channel} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 20px",borderRadius:20,background:`${sp.color}10`,border:`1px solid ${sp.color}25`,color:sp.color,textDecoration:"none",fontSize:12,fontFamily:"system-ui",fontWeight:600,transition:"all .2s"}}>{sp.type==="video"?"📹 YouTube":"🎧 Audio"} · {lang==="en"?"Visit Channel":"Kanal"} →</a>
      </div>}

      <Orn/>

      {/* Topics List */}
      <h2 style={{fontSize:11,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10}}>{topics.length} {lang==="en"?"Topics":"Konu"}</h2>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {topics.map((tp,i)=><div key={tp.id} className="ecard" onClick={()=>onTopic(tp)} style={{animation:`su .4s ease ${i*.04}s both`}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{minWidth:36,height:36,borderRadius:"50%",border:`1.5px solid ${CATS[tp.cat].c}35`,background:`${CATS[tp.cat].c}06`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:CATS[tp.cat].c,fontFamily:"'Cormorant Garamond',serif"}}>{tp.id}</div>
            <div style={{flex:1}}><h3 style={{fontSize:14,fontWeight:600,color:t.ink,fontFamily:"'Cormorant Garamond',serif",margin:0}}>{tp.title[lang]}</h3><div style={{display:"flex",gap:4,marginTop:4}}><Badge cat={tp.cat} lang={lang}/><VerifyBadge type={tp.verify} lang={lang}/></div></div>
          </div>
        </div>)}
      </div>
    </div>
  </div>;
};

// ── Topic Detail Page ─────────────────────────────────────────

