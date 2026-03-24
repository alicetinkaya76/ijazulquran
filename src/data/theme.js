import { createContext, useContext } from "react";

export const ThemeCtx = createContext();
export const useTheme = () => useContext(ThemeCtx);
export const THEMES = {
  light:{parchment:"#faf7f0",parchmentDeep:"#f0e9d8",parchmentCard:"#f6f1e5",
    ink:"#1a1714",inkSoft:"#5a5045",inkMuted:"#8a8070",
    gold:"#85744e",goldLight:"#c4b48a",goldGlow:"rgba(180,160,110,.10)",goldBorder:"#d4c49440",
    cardBg:"#faf7f0",cardHover:"#f0e9d8",cardBorder:"#d4c49430",
    headerBg:"linear-gradient(180deg,#f6f1e5 0%,#faf7f0 100%)",
    verseBg:"linear-gradient(135deg,#f0e9d8,#f6f1e5)",verseBorder:"#c4b48a50",
    sourceBg:"#f6f1e5",sourceBorder:"#c4b48a40",noteBg:"#f0e9d8",shadow:"rgba(120,100,60,.08)"},
  dark:{parchment:"#12100c",parchmentDeep:"#1a1610",parchmentCard:"#1e1a12",
    ink:"#e8e0cc",inkSoft:"#a09880",inkMuted:"#706850",
    gold:"#c4b48a",goldLight:"#85744e",goldGlow:"rgba(196,180,138,.06)",goldBorder:"#85744e30",
    cardBg:"#1a1610",cardHover:"#22201a",cardBorder:"#85744e20",
    headerBg:"linear-gradient(180deg,#1a1610 0%,#12100c 100%)",
    verseBg:"linear-gradient(135deg,rgba(200,170,100,.04),rgba(200,170,100,.02))",verseBorder:"#85744e30",
    sourceBg:"#1e1a12",sourceBorder:"#85744e25",noteBg:"#1e1a12",shadow:"rgba(0,0,0,.3)"}
};


