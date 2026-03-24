import React from "react";
import { useTheme } from "../data/theme";

const tabs = [
  { id: "home", icon: "🏠", en: "Home", tr: "Ana Sayfa" },
  { id: "search", icon: "🔍", en: "Search", tr: "Ara" },
  { id: "speakers", icon: "👥", en: "Speakers", tr: "Konuşmacılar" },
];

export const BottomNav = ({ activeTab, onTab, lang }) => {
  const t = useTheme();
  return (
    <nav className="bottom-nav" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: t.parchment, borderTop: `1px solid ${t.goldBorder}`,
      display: "flex", justifyContent: "space-around", alignItems: "center",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
    }}>
      {tabs.map(tab => {
        const active = activeTab === tab.id;
        return (
          <button key={tab.id} onClick={() => onTab(tab.id)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
            gap: 2, padding: "8px 0 6px", border: "none", background: "transparent",
            cursor: "pointer", transition: "all .2s",
            color: active ? t.gold : t.inkMuted, minHeight: 44, minWidth: 44,
          }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>{tab.icon}</span>
            <span style={{
              fontSize: 9, fontFamily: "system-ui", fontWeight: active ? 700 : 500,
              letterSpacing: ".02em", opacity: active ? 1 : .6,
            }}>{tab[lang]}</span>
          </button>
        );
      })}
    </nav>
  );
};
