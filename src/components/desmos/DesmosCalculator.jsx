import React, { useEffect, useRef } from "react";

export default function DesmosCalculator() {
  const containerRef = useRef(null);
  const calculatorRef = useRef(null);

  useEffect(() => {
    if (!window.Desmos || !containerRef.current) return;
    calculatorRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
      keypad: true,
      expressions: true,
      settingsMenu: true,
      zoomButtons: true,
    });
    return () => {
      if (calculatorRef.current) calculatorRef.current.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden border border-border shadow-lg"
      style={{ height: "520px" }}
    />
  );
}