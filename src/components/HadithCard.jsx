import React, { useState } from "react";
import { useTheme } from "../data/theme";

const COLL_LABEL = {
  bukhari: { en: "Ṣaḥīḥ al-Bukhārī", tr: "Sahîh-i Buhârî", icon: "📖" },
  muslim:  { en: "Ṣaḥīḥ Muslim",      tr: "Sahîh-i Müslim", icon: "📖" },
  suyuti:  { en: "al-Itqān (Suyūṭī)",  tr: "el-İtkân (Süyûtî)", icon: "📜" },
};

export const HadithCard = ({ hadithArr, lang }) => {
  const t = useTheme();
  const [expanded, setExpanded] = useState(false);
  if (!hadithArr || hadithArr.length === 0) return null;

  const show = expanded ? hadithArr : hadithArr.slice(0, 1);

  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{
        fontSize: 11, fontWeight: 700, color: t.gold,
        fontFamily: "system-ui", letterSpacing: ".1em",
        textTransform: "uppercase", marginBottom: 10
      }}>
        📖 {lang === "en" ? "Related Hadith" : "İlgili Hadisler"}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {show.map((h, i) => {
          const coll = COLL_LABEL[h.collection] || { en: h.collection, tr: h.collection, icon: "📖" };
          return (
            <div key={i} style={{
              padding: "16px 18px",
              borderRadius: 12,
              background: t.verseBg,
              border: `1px solid ${t.verseBorder}`,
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Decorative corner */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 40, height: 40,
                background: `linear-gradient(135deg, ${t.gold}08 0%, transparent 60%)`,
                borderBottomLeftRadius: 20
              }} />

              {/* Arabic text */}
              <div style={{
                direction: "rtl", textAlign: "right",
                fontFamily: "'Amiri','Traditional Arabic',serif",
                fontSize: "clamp(17px,3.5vw,21px)",
                lineHeight: 2.0,
                color: t.gold,
                marginBottom: 12,
                paddingBottom: 12,
                borderBottom: `1px solid ${t.goldBorder}`
              }}>
                {h.ar}
              </div>

              {/* Translation */}
              <p style={{
                fontSize: 13, lineHeight: 1.7,
                color: t.inkSoft,
                fontFamily: "'Crimson Pro',serif",
                fontStyle: "italic",
                marginBottom: 10
              }}>
                {lang === "en" ? h.en : h.tr}
              </p>

              {/* Source reference */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px",
                borderRadius: 12,
                background: `${t.gold}10`,
                border: `1px solid ${t.goldBorder}`,
                fontSize: 10,
                fontWeight: 600,
                color: t.gold,
                fontFamily: "system-ui"
              }}>
                {coll.icon} {coll[lang]} #{h.number}
              </div>
            </div>
          );
        })}
      </div>

      {hadithArr.length > 1 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            marginTop: 8,
            background: "none",
            border: `1px solid ${t.goldBorder}`,
            borderRadius: 20,
            padding: "5px 14px",
            color: t.inkSoft,
            cursor: "pointer",
            fontSize: 10,
            fontFamily: "system-ui",
            fontWeight: 600,
            transition: "all .2s"
          }}
        >
          {expanded
            ? (lang === "en" ? "▲ Show less" : "▲ Daha az")
            : (lang === "en" ? `▾ Show all ${hadithArr.length} hadith` : `▾ Tüm ${hadithArr.length} hadisi göster`)}
        </button>
      )}
    </div>
  );
};
