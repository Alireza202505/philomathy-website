import React, { useEffect, useRef } from "react";

export default function DesmosDemo({ expressions, label, color = "#D4AF37" }) {
  const containerRef = useRef(null);
  const calculatorRef = useRef(null);

  useEffect(() => {
    if (!window.Desmos || !containerRef.current) return;
    calculatorRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
      keypad: false,
      expressions: false,
      settingsMenu: false,
      zoomButtons: false,
      lockViewport: true,
    });
    expressions.forEach((expr, i) => {
      calculatorRef.current.setExpression({ id: `expr${i}`, latex: expr, color });
    });
    return () => {
      if (calculatorRef.current) calculatorRef.current.destroy();
    };
  }, []);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div
        ref={containerRef}
        style={{ height: "220px" }}
        className="w-full"
      />
      <div className="px-4 py-3 border-t border-border">
        <p className="font-body text-sm font-semibold text-foreground">{label}</p>
      </div>
    </div>
  );
}