import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Cycles between sine and cosine wave animations individually —
// each curve draws on, holds briefly, then cross-fades to the next.

const GOLD = "#D4AF37";
const TEAL = "#0d9488";
const W = 180;
const H = 90;
const MID = H / 2;

function buildWavePath(fn, steps = 100) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = 10 + t * (W - 20);
    const y = MID - fn(t * Math.PI * 4) * H * 0.35;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const WAVES = [
  { path: buildWavePath(Math.sin), label: "sin(x)", color: GOLD },
  { path: buildWavePath(Math.cos), label: "cos(x)", color: TEAL },
];
const DURATION = 5000;

function WaveView({ path, label, color }) {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" fill="none" aria-hidden="true">
        <line x1="5" y1={MID} x2={W - 5} y2={MID} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <line x1="10" y1="5" x2="10" y2={H - 5} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <motion.path
          d={path}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </svg>
      <span className="font-mono text-xs" style={{ color }}>{label}</span>
    </div>
  );
}

export default function SineCosineSlot() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % WAVES.length);
    }, DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 110 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <WaveView {...WAVES[index]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}