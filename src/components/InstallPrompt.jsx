import React, { useState, useEffect } from "react";
import { useTheme } from "../data/theme";

export const InstallPrompt = ({ lang }) => {
  const t = useTheme();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem("pwa-dismissed")) return;

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show after 30s delay so user engages with content first
      setTimeout(() => setShow(true), 30000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
    if (outcome === "accepted") {
      sessionStorage.setItem("pwa-dismissed", "1");
    }
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("pwa-dismissed", "1");
  };

  if (!show || dismissed) return null;

  return (
    <div style={{
      position: "fixed", bottom: 68, left: 12, right: 12, zIndex: 200,
      maxWidth: 400, margin: "0 auto",
      background: t.parchment, border: `1px solid ${t.goldBorder}`,
      borderRadius: 14, padding: "14px 16px",
      boxShadow: `0 8px 32px ${t.shadow}`,
      animation: "su .4s ease both",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: `${t.gold}15`, border: `1px solid ${t.gold}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
        }}>📱</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: t.ink,
            fontFamily: "'Cormorant Garamond',serif", marginBottom: 2,
          }}>
            {lang === "en" ? "Install App" : "Uygulamayı Yükle"}
          </div>
          <div style={{
            fontSize: 10, color: t.inkMuted, fontFamily: "system-ui", lineHeight: 1.4,
          }}>
            {lang === "en"
              ? "Access offline & get a faster experience"
              : "Çevrimdışı erişim ve daha hızlı deneyim"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <button onClick={handleDismiss} style={{
            background: "transparent", border: `1px solid ${t.goldBorder}`,
            borderRadius: 8, padding: "6px 10px", color: t.inkMuted,
            cursor: "pointer", fontSize: 10, fontFamily: "system-ui",
          }}>
            {lang === "en" ? "Later" : "Sonra"}
          </button>
          <button onClick={handleInstall} style={{
            background: t.gold, border: "none", borderRadius: 8,
            padding: "6px 12px", color: t.parchment, cursor: "pointer",
            fontSize: 10, fontWeight: 700, fontFamily: "system-ui",
          }}>
            {lang === "en" ? "Install" : "Yükle"}
          </button>
        </div>
      </div>
    </div>
  );
};
