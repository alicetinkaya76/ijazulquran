import React, { useState, useMemo, useEffect, useCallback, useRef, Suspense, lazy } from "react";
import "./styles/global.css";
import { ThemeCtx, THEMES } from "./data/theme";
import { CATS } from "./data/categories";
import { SPEAKERS } from "./data/speakers";
import { TOPICS } from "./data/topics";
import { TranscriptProvider, useTX } from "./data/TranscriptContext";
import { GrainOverlay, Orn, Badge, VerifyBadge, ThemeToggle } from "./components/Common";
import { SpeakerCard } from "./components/SpeakerCard";
import { BottomNav } from "./components/BottomNav";
import { InstallPrompt } from "./components/InstallPrompt";

const SpeakerPage = lazy(() => import("./components/SpeakerPage").then(m => ({ default: m.SpeakerPage })));
const TopicPage = lazy(() => import("./components/TopicPage").then(m => ({ default: m.TopicPage })));

/* ── URL Hash Routing ────────────────────────────────── */
function parseHash() {
  const h = window.location.hash.replace("#","");
  if (!h) return { view:"home" };
  const parts = h.split("/");
  if (parts[0]==="topic" && parts[1]) {
    const tid = parseInt(parts[1],10);
    const tp = TOPICS.find(t=>t.id===tid);
    if (tp) return { view:"topic", topic:tp };
  }
  if (parts[0]==="speaker" && parts[1]) {
    if (SPEAKERS[parts[1]]) return { view:"speaker", speaker:parts[1] };
  }
  return { view:"home" };
}

export default function IjazulQuranV13() {
  return <TranscriptProvider><IjazulQuranInner/></TranscriptProvider>;
}

function IjazulQuranInner() {
  const TX = useTX(); // null until lazy chunk loads
  const [lang,setLang]=useState("en"); const [theme,setTheme]=useState("light");
  const [view,setView]=useState("home"); const [activeTopic,setActiveTopic]=useState(null);
  const [activeSpeaker,setActiveSpeaker]=useState(null);
  const [filter,setFilter]=useState("all"); const [search,setSearch]=useState("");
  const [speakerFilters,setSpeakerFilters]=useState(new Set());
  const t = THEMES[theme];
  const searchRef = useRef(null);
  const speakersRef = useRef(null);

  const handleBottomNav = useCallback((tabId) => {
    if (tabId === "home") {
      history.pushState(null,"",window.location.pathname);
      setView("home"); setActiveTopic(null); setActiveSpeaker(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    else if (tabId === "search") { searchRef.current?.focus(); searchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }
    else if (tabId === "speakers") { speakersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  }, []);

  /* ── Hash routing ───────────────────────────────────── */
  const applyHash = useCallback(()=>{
    const r = parseHash();
    setView(r.view);
    setActiveTopic(r.topic||null);
    setActiveSpeaker(r.speaker||null);
    if(r.view!=="home") window.scrollTo(0,0);
  },[]);

  useEffect(()=>{
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return ()=>window.removeEventListener("hashchange", applyHash);
  },[applyHash]);

  /* ── Memoized speaker topic counts ──────────────────── */
  const speakerTopicCounts = useMemo(()=>{
    const c = {};
    Object.keys(SPEAKERS).forEach(sid=>{
      c[sid] = TOPICS.filter(tp=>(tp.perspectives||[]).includes(sid)).length;
    });
    return c;
  },[]);

  /* ── Full-text search ───────────────────────────────── */
  const filtered = useMemo(() => {
    let tps=TOPICS;
    if(filter!=="all") tps=tps.filter(tp=>tp.cat===filter);
    if(speakerFilters.size>0) tps=tps.filter(tp=>{
      const persp = tp.perspectives||[];
      return [...speakerFilters].every(sf=>persp.includes(sf));
    });
    if(search.trim()){
      const q=search.toLowerCase();
      tps=tps.filter(tp=>{
        if(tp.title[lang].toLowerCase().includes(q)) return true;
        if((tp.ayah?.ref||"").toLowerCase().includes(q)) return true;
        if((tp.keywords||[]).some(k=>k.toLowerCase().includes(q))) return true;
        if((tp.perspectives||[]).some(sid=>SPEAKERS[sid]?.name.toLowerCase().includes(q))) return true;
        if(TX){
          const txMap = TX[tp.id];
          if(txMap){
            for(const sid of Object.keys(txMap)){
              const entry = txMap[sid];
              if(entry.en?.toLowerCase().includes(q) || entry.tr?.toLowerCase().includes(q)) return true;
            }
          }
        }
        return false;
      });
    }
    return tps;
  },[filter,search,lang,speakerFilters,TX]);

  const counts=useMemo(()=>{const c={};Object.keys(CATS).filter(k=>k!=="all").forEach(k=>{c[k]=TOPICS.filter(tp=>tp.cat===k).length;});return c;},[]);
  const totalP=useMemo(()=>TOPICS.reduce((s,tp)=>s+(tp.perspectives?.length||0),0),[]);

  const openTopic=(tp)=>{window.location.hash=`topic/${tp.id}`;};
  const openSpeaker=(sid)=>{window.location.hash=`speaker/${sid}`;};
  const goHome=()=>{history.pushState(null,"",window.location.pathname);setView("home");setActiveTopic(null);setActiveSpeaker(null);};
  const handleNav=(action,tp)=>{if(action==="nav"&&tp){window.location.hash=`topic/${tp.id}`;}else goHome();};

  const toggleSpeakerFilter=(sid)=>{
    setSpeakerFilters(prev=>{
      const next = new Set(prev);
      if(next.has(sid)) next.delete(sid); else next.add(sid);
      return next;
    });
  };
  const clearAllFilters=()=>{setFilter("all");setSpeakerFilters(new Set());setSearch("");};
  const hasActiveFilters = filter!=="all" || speakerFilters.size>0 || search.trim();

  const css = `@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}body{background:${t.parchment};transition:background .4s ease}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${t.goldLight};border-radius:3px}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes su{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.ecard{cursor:pointer;background:${t.cardBg};border:1px solid ${t.cardBorder};border-radius:10px;padding:16px 18px;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden}
.ecard::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:${t.gold};transform:scaleY(0);transition:transform .3s;border-radius:0 2px 2px 0}
.ecard:hover{background:${t.cardHover};border-color:${t.goldLight}40;box-shadow:0 4px 20px ${t.shadow}}.ecard:hover::before{transform:scaleY(1)}
.fb{background:none;border:1px solid ${t.goldBorder};border-radius:20px;padding:4px 10px;color:${t.inkSoft};cursor:pointer;font-size:10px;font-family:system-ui;font-weight:600;transition:all .2s;white-space:nowrap}.fb:hover{border-color:${t.gold};color:${t.gold}}.fb.on{background:${t.gold};color:${t.parchment};border-color:${t.gold}}
.srow{display:flex;gap:12px;overflow-x:auto;padding:4px 0 12px;scrollbar-width:thin;-webkit-overflow-scrolling:touch}.srow::-webkit-scrollbar{height:3px}.srow::-webkit-scrollbar-thumb{background:${t.goldLight};border-radius:2px}
.speaker-chip{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:14px;border:1px solid ${t.goldBorder};background:transparent;color:${t.inkSoft};cursor:pointer;font-size:9px;font-family:system-ui;font-weight:600;transition:all .2s;white-space:nowrap}.speaker-chip:hover{border-color:${t.gold};color:${t.gold}}.speaker-chip.active{border-color:transparent}
.chip-row{display:flex;gap:4px;overflow-x:auto;padding:2px 0 14px;scrollbar-width:thin;-webkit-overflow-scrolling:touch}.chip-row::-webkit-scrollbar{height:2px}.chip-row::-webkit-scrollbar-thumb{background:${t.goldLight};border-radius:2px}
.active-filters{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;animation:fadeIn .3s ease}
.filter-tag{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:10px;font-size:8px;font-family:system-ui;font-weight:600;cursor:pointer;transition:all .2s}`;

  const LoadingFallback = () => <div style={{minHeight:"100vh",background:t.parchment,display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div style={{textAlign:"center",animation:"su .4s ease both"}}>
      <p style={{fontSize:24,color:t.gold,fontFamily:"'Amiri',serif",opacity:.5}}>إعجاز القرآن</p>
      <p style={{fontSize:10,color:t.inkMuted,marginTop:8,fontFamily:"system-ui"}}>Loading…</p>
    </div>
  </div>;

  if(view==="speaker"&&activeSpeaker) return <ThemeCtx.Provider value={t}><style>{css}</style><Suspense fallback={<LoadingFallback/>}><SpeakerPage speakerId={activeSpeaker} lang={lang} onBack={goHome} onTopic={openTopic} theme={theme} setTheme={setTheme}/></Suspense></ThemeCtx.Provider>;
  if(view==="topic"&&activeTopic) return <ThemeCtx.Provider value={t}><style>{css}</style><Suspense fallback={<LoadingFallback/>}><TopicPage topic={activeTopic} lang={lang} onBack={handleNav} theme={theme} setTheme={setTheme} searchQuery={search}/></Suspense></ThemeCtx.Provider>;

  return (
    <ThemeCtx.Provider value={t}><style>{css}</style><GrainOverlay/>
    <div style={{minHeight:"100vh",background:t.parchment,color:t.ink,fontFamily:"'Crimson Pro',serif",position:"relative",zIndex:1}}>
      <header className="sticky-header" style={{padding:"36px 20px 24px",textAlign:"center",background:t.headerBg,borderBottom:`1px solid ${t.goldBorder}`,maxWidth:720,margin:"0 auto",position:"relative"}}>
        <div style={{position:"absolute",top:14,right:14}}><ThemeToggle theme={theme} setTheme={setTheme}/></div>
        <p className="header-arabic" style={{fontSize:28,color:t.gold,fontFamily:"'Amiri',serif",marginBottom:0,lineHeight:1.5,opacity:.5}}>إعجاز القرآن</p>
        <p className="header-latin" style={{fontSize:9,fontFamily:"'Cormorant Garamond',serif",fontWeight:600,letterSpacing:".35em",textTransform:"uppercase",color:t.gold,marginBottom:12,opacity:.4}}>İ'CÂZÜ'L-KUR'ÂN</p>
        <Orn w={25}/>
        <h1 style={{fontSize:"clamp(20px,4.5vw,28px)",fontWeight:600,color:t.ink,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.3,margin:"8px 0 4px"}}>{lang==="en"?"The Inimitability of the Qur'an":"Kur'ân'ın Taklit Edilemezliği"}</h1>
        <p style={{fontSize:12,color:t.inkMuted,fontStyle:"italic",marginBottom:14}}>{TOPICS.length} {lang==="en"?"Topics":"Konu"} · {Object.keys(SPEAKERS).length} {lang==="en"?"Speakers":"Konuşmacı"} · {totalP} {lang==="en"?"Perspectives":"Perspektif"}</p>
        <div style={{display:"inline-flex",border:`1px solid ${t.goldBorder}`,borderRadius:20,overflow:"hidden"}}>
          {["en","tr"].map(l=><button key={l} onClick={()=>setLang(l)} style={{padding:"5px 18px",border:"none",background:lang===l?t.gold:"transparent",color:lang===l?t.parchment:t.inkSoft,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'Cormorant Garamond',serif",transition:"all .2s"}}>{l==="en"?"English":"Türkçe"}</button>)}
        </div>
      </header>
      <div className="main-content" style={{maxWidth:720,margin:"0 auto",padding:"18px 16px 50px"}}>
        {/* Speakers Row */}
        <div ref={speakersRef} style={{marginBottom:20}}>
          <h2 style={{fontSize:10,fontWeight:700,color:t.gold,fontFamily:"system-ui",letterSpacing:".12em",textTransform:"uppercase",marginBottom:8}}>{lang==="en"?"Speakers":"Konuşmacılar"}</h2>
          <div className="srow">{Object.values(SPEAKERS).map(sp=><SpeakerCard key={sp.id} speaker={sp} lang={lang} onClick={()=>openSpeaker(sp.id)}/>)}</div>
        </div>
        {/* Category Grid */}
        <div className="cat-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(80px,1fr))",gap:5,margin:"0 0 16px"}}>
          {Object.entries(CATS).filter(([k])=>k!=="all").map(([k,v])=><div key={k} style={{padding:"8px 6px",borderRadius:8,background:`${v.c}06`,border:`1px solid ${v.c}12`,textAlign:"center",cursor:"pointer",transition:"all .2s",...(filter===k?{background:`${v.c}15`,borderColor:`${v.c}35`}:{})}} onClick={()=>setFilter(filter===k?"all":k)}><div style={{fontSize:15}}>{v.icon}</div><div style={{fontSize:17,fontWeight:700,color:v.c,fontFamily:"'Cormorant Garamond',serif"}}>{counts[k]}</div><div style={{fontSize:8,color:t.inkMuted,fontFamily:"system-ui"}}>{v[lang]}</div></div>)}
        </div>
        {/* Filter Bar */}
        <div className="filter-bar" style={{display:"flex",gap:5,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}>
          <button className={`fb ${!hasActiveFilters?"on":""}`} onClick={clearAllFilters}>☪ {lang==="en"?"All":"Tümü"} ({TOPICS.length})</button>
          <div style={{flex:1}}/>
          <input ref={searchRef} className="search-input" type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder={lang==="en"?"Search topics, transcripts…":"Konu, transcript ara…"} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${t.goldBorder}`,background:t.parchment,color:t.ink,fontSize:11,fontFamily:"'Crimson Pro',serif",outline:"none",width:"min(220px,100%)"}} onFocus={e=>e.target.style.borderColor=t.gold} onBlur={e=>e.target.style.borderColor=t.goldBorder}/>
        </div>
        {/* Speaker Filter Chips — horizontal scroll on mobile */}
        <div className="chip-row">
          {Object.values(SPEAKERS).map(sp=>{
            const isActive = speakerFilters.has(sp.id);
            const count = speakerTopicCounts[sp.id]||0;
            return <button key={sp.id} className={`speaker-chip${isActive?" active":""}`}
              style={isActive?{background:`${sp.color}18`,borderColor:`${sp.color}50`,color:sp.color}:{}}
              onClick={()=>toggleSpeakerFilter(sp.id)}>
              <span style={{width:14,height:14,borderRadius:"50%",background:`${sp.color}20`,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:6,fontWeight:800,color:sp.color,flexShrink:0}}>{sp.portrait}</span>
              {sp.name.split(" ").pop()} <span style={{opacity:.5}}>({count})</span>
            </button>;
          })}
        </div>
        {/* Active Filter Breadcrumbs */}
        {hasActiveFilters && <div className="active-filters">
          {filter!=="all" && <span className="filter-tag" onClick={()=>setFilter("all")} style={{background:`${CATS[filter].c}12`,color:CATS[filter].c,border:`1px solid ${CATS[filter].c}25`}}>{CATS[filter].icon} {CATS[filter][lang]} ✕</span>}
          {[...speakerFilters].map(sid=>{const sp=SPEAKERS[sid]; return sp?<span key={sid} className="filter-tag" onClick={()=>toggleSpeakerFilter(sid)} style={{background:`${sp.color}12`,color:sp.color,border:`1px solid ${sp.color}25`}}>{sp.portrait} {sp.name.split(" ").pop()} ✕</span>:null;})}
          {search.trim() && <span className="filter-tag" onClick={()=>setSearch("")} style={{background:`${t.gold}12`,color:t.gold,border:`1px solid ${t.gold}25`}}>🔍 "{search}" ✕</span>}
          <span style={{fontSize:9,color:t.inkMuted,fontFamily:"system-ui",alignSelf:"center",marginLeft:4}}>{filtered.length} {lang==="en"?"results":"sonuç"}</span>
        </div>}
        {/* Topic Cards */}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.length===0?<div style={{padding:36,textAlign:"center",color:t.inkMuted,fontStyle:"italic"}}>{lang==="en"?"No topics found":"Konu bulunamadı"}</div>
          :filtered.map((tp,i)=><div key={tp.id} className="ecard" onClick={()=>openTopic(tp)} style={{animation:`su .4s ease ${i*.025}s both`}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
              <div style={{minWidth:38,height:38,borderRadius:"50%",border:`1.5px solid ${CATS[tp.cat].c}35`,background:`${CATS[tp.cat].c}06`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:CATS[tp.cat].c,fontFamily:"'Cormorant Garamond',serif",flexShrink:0}}>{tp.id}</div>
              <div style={{flex:1,minWidth:0}}>
                <h3 style={{margin:0,fontSize:14,fontWeight:600,lineHeight:1.3,color:t.ink,fontFamily:"'Cormorant Garamond',serif"}}>{tp.title[lang]}</h3>
                <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginTop:5}}>
                  <Badge cat={tp.cat} lang={lang}/><VerifyBadge type={tp.verify} lang={lang}/>
                  {tp.perspectives?.length>1&&<div style={{display:"flex",marginLeft:4}}>{tp.perspectives.slice(0,4).map((sid,j)=>{const s=SPEAKERS[sid];return s?<div key={sid} style={{width:20,height:20,borderRadius:"50%",background:`${s.color}20`,border:`1.5px solid ${s.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:700,color:s.color,marginLeft:j>0?-6:0,zIndex:4-j,fontFamily:"system-ui"}}>{s.portrait}</div>:null;})}<span style={{fontSize:8,color:t.inkMuted,marginLeft:4,fontFamily:"system-ui",alignSelf:"center"}}>{tp.perspectives.length}</span></div>}
                </div>
              </div>
            </div>
            {tp.ayah&&<div style={{marginTop:8,padding:"6px 12px",background:t.parchmentDeep,borderRadius:6,borderRight:`2px solid ${t.goldLight}40`,textAlign:"right",direction:"rtl"}}><span style={{fontSize:15,color:t.gold,fontFamily:"'Amiri','Traditional Arabic',serif",lineHeight:1.8,opacity:.5}}>{tp.ayah.ar.length>70?tp.ayah.ar.substring(0,70)+"…":tp.ayah.ar}</span></div>}
          </div>)}
        </div>
      </div>
      <footer style={{borderTop:`1px solid ${t.goldBorder}`,padding:"28px 20px",textAlign:"center",maxWidth:720,margin:"0 auto"}}>
        <p style={{fontSize:18,color:t.gold,fontFamily:"'Amiri',serif",marginBottom:6,opacity:.3}}>وَمَا يَنطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ</p>
        <p style={{fontSize:10,color:t.inkMuted,fontStyle:"italic",opacity:.3,marginBottom:12}}>an-Najm 53:3-4</p>
        <Orn w={20}/>
        <p style={{fontSize:9,color:t.inkMuted,marginTop:12,opacity:.2}}>İ'câzü'l-Kur'ân v14 · Multi-Source Platform · © 2026</p>
      </footer>
      <InstallPrompt lang={lang}/>
      <BottomNav activeTab={view==="home"?"home":"home"} onTab={handleBottomNav} lang={lang}/>
    </div>
    </ThemeCtx.Provider>
  );
}
