import React, { createContext, useContext, useState, useEffect } from "react";

const TxCtx = createContext(null);

export const useTX = () => useContext(TxCtx);

export const TranscriptProvider = ({ children }) => {
  const [tx, setTx] = useState(null);

  useEffect(() => {
    // Dynamic import — Vite will code-split this into a separate chunk
    import("./transcripts.js").then(mod => {
      setTx(mod.TX);
    });
  }, []);

  return <TxCtx.Provider value={tx}>{children}</TxCtx.Provider>;
};
