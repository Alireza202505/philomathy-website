import React, { useRef, useEffect } from "react";

// Animated visual proof: (a − b)² = a² − 2ab + b²
// A square of side a is divided into four tiles: (a−b)², two b(a−b), and b².
// Tiles appear, pull apart, get labeled, and the equation builds term by term.

const TEAL = "#0d9488";
const GOLD = "#D4AF37";
const MUTED = "rgba(255,255,255,0.06)";
const MUTED_STROKE = "rgba(255,255,255,0.22)";
const LABEL_COL = "rgba(255,255,255,0.55)";

const VB_W = 200;
const VB_H = 115;

const A = 60;
const B = 15;
const AB = A - B;
const SX = 30;
const SY = 6;
const SEP = 5;

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (v) => Math.max(0, Math.min(1, v));

const TILES = [
  { x: SX, y: SY + B, w: AB, h: AB, fill: `${TEAL}22`, stroke: TEAL, lx: SX + AB / 2, ly: SY + B + AB / 2, label: "(a−b)²", lc: TEAL, rotate: false, sep: [-1, 1] },
  { x: SX + AB, y: SY + B, w: B, h: AB, fill: MUTED, stroke: MUTED_STROKE, lx: SX + AB + B / 2, ly: SY + B + AB / 2, label: "b(a−b)", lc: LABEL_COL, rotate: true, sep: [1, 1] },
  { x: SX, y: SY, w: AB, h: B, fill: MUTED, stroke: MUTED_STROKE, lx: SX + AB / 2, ly: SY + B / 2, label: "b(a−b)", lc: LABEL_COL, rotate: false, sep: [-1, -1] },
  { x: SX + AB, y: SY, w: B, h: B, fill: `${GOLD}22`, stroke: GOLD, lx: SX + AB + B / 2, ly: SY + B / 2, label: "b²", lc: GOLD, rotate: false, sep: [1, -1] },
];

const EQ_Y = 100;
const EQ_TERMS = [
  { x: 42, text: "(a−b)²", color: TEAL },
  { x: 82, text: "= a²", color: LABEL_COL },
  { x: 107, text: "− 2ab", color: LABEL_COL },
  { x: 137, text: "+ b²", color: GOLD },
];

export default function AlgebraTileAnimation() {
  const tileRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const labelRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const eqRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const CYCLE = 8000;

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = ((ts - startRef.current) % CYCLE) / CYCLE;

      const tileOp = clamp01(p / 0.15);
      let sepT = 0;
      if (p >= 0.25 && p < 0.4) sepT = ease((p - 0.25) / 0.15);
      else if (p >= 0.4) sepT = 1;
      const sep = SEP * sepT;

      tileRefs.forEach((ref, i) => {
        if (!ref.current) return;
        ref.current.setAttribute("opacity", tileOp.toFixed(2));
        ref.current.setAttribute(
          "transform",
          `translate(${(TILES[i].sep[0] * sep).toFixed(1)} ${(TILES[i].sep[1] * sep).toFixed(1)})`
        );
      });

      const labelOp = clamp01((p - 0.45) / 0.1);
      labelRefs.forEach((ref) => {
        if (ref.current) ref.current.setAttribute("opacity", labelOp.toFixed(2));
      });

      const eqStart = 0.57;
      const eqStep = 0.07;
      eqRefs.forEach((ref, i) => {
        const op = clamp01((p - eqStart - i * eqStep) / 0.08);
        if (ref.current) ref.current.setAttribute("opacity", op.toFixed(2));
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full" fill="none" aria-hidden="true">
      {TILES.map((tile, i) => (
        <g key={i} ref={tileRefs[i]} opacity="0">
          <rect
            x={tile.x}
            y={tile.y}
            width={tile.w}
            height={tile.h}
            fill={tile.fill}
            stroke={tile.stroke}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <text
            ref={labelRefs[i]}
            x={tile.lx}
            y={tile.ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={tile.lc}
            fontSize={tile.rotate ? "6" : "7"}
            fontFamily="ui-monospace, monospace"
            opacity="0"
            transform={tile.rotate ? `rotate(-90 ${tile.lx} ${tile.ly})` : undefined}
          >
            {tile.label}
          </text>
        </g>
      ))}
      {EQ_TERMS.map((term, i) => (
        <text
          key={i}
          ref={eqRefs[i]}
          x={term.x}
          y={EQ_Y}
          fill={term.color}
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          opacity="0"
        >
          {term.text}
        </text>
      ))}
    </svg>
  );
}