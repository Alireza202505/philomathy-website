import React, { useRef, useEffect } from "react";

// Animated "unit circle → wave" diagram.
// A point rotates steadily around a unit circle; its sine (teal) and cosine (gold)
// values trace two scrolling waves to the right. Pure SVG + requestAnimationFrame,
// thin lines, no glow/blur/particles. Loops continuously.

const SINE_COLOR = "#0d9488"; // teal
const COS_COLOR = "#D4AF37"; // gold
const AXIS_COLOR = "rgba(255,255,255,0.16)";
const LABEL_COLOR = "rgba(255,255,255,0.34)";

const VB_W = 420;
const VB_H = 200;
const CX = 70;
const CY = 100;
const R = 48; // circle radius == wave amplitude so projections line up exactly
const WAVE_START = 150;
const WAVE_END = 410;
const WAVE_LEN = WAVE_END - WAVE_START; // one full period visible
const AMP = R;
const SAMPLES = 90;

const xs = Array.from(
  { length: SAMPLES + 1 },
  (_, i) => WAVE_START + (WAVE_LEN / SAMPLES) * i
);

function buildWave(fn, theta) {
  return xs
    .map((x) => {
      const phase = theta - ((WAVE_END - x) / WAVE_LEN) * Math.PI * 2;
      const y = CY - AMP * fn(phase);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function UnitCircleAnimation() {
  const sineRef = useRef(null);
  const cosRef = useRef(null);
  const radiusRef = useRef(null);
  const pointRef = useRef(null);
  const tracerRef = useRef(null);
  const thetaRef = useRef(0);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const speed = (Math.PI * 2) / 8000; // one full rotation per 8s

    const tick = (t) => {
      if (!lastRef.current) lastRef.current = t;
      const dt = t - lastRef.current;
      lastRef.current = t;
      thetaRef.current += speed * dt;

      const theta = thetaRef.current;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);

      const px = CX + R * cosT;
      const py = CY - R * sinT;

      if (sineRef.current)
        sineRef.current.setAttribute("points", buildWave(Math.sin, theta));
      if (cosRef.current)
        cosRef.current.setAttribute("points", buildWave(Math.cos, theta));

      if (radiusRef.current) {
        radiusRef.current.setAttribute("x2", px.toFixed(1));
        radiusRef.current.setAttribute("y2", py.toFixed(1));
      }

      if (pointRef.current) {
        pointRef.current.setAttribute("cx", px.toFixed(1));
        pointRef.current.setAttribute("cy", py.toFixed(1));
      }

      // horizontal tracer: circle point → sine wave leading edge
      const sineEdgeY = CY - AMP * sinT;
      if (tracerRef.current) {
        tracerRef.current.setAttribute("x1", px.toFixed(1));
        tracerRef.current.setAttribute("y1", py.toFixed(1));
        tracerRef.current.setAttribute("x2", WAVE_END.toFixed(1));
        tracerRef.current.setAttribute("y2", sineEdgeY.toFixed(1));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="w-full max-w-[420px]"
      fill="none"
      aria-hidden="true"
    >
      {/* ---- Unit circle axes ---- */}
      <line x1={CX - R - 10} y1={CY} x2={CX + R + 10} y2={CY} stroke={AXIS_COLOR} strokeWidth="1" />
      <line x1={CX} y1={CY - R - 10} x2={CX} y2={CY + R + 10} stroke={AXIS_COLOR} strokeWidth="1" />

      {/* Unit circle */}
      <circle cx={CX} cy={CY} r={R} stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" />

      {/* ---- Wave axis (horizontal) ---- */}
      <line x1={WAVE_START - 6} y1={CY} x2={WAVE_END + 8} y2={CY} stroke={AXIS_COLOR} strokeWidth="1" />
      {/* leading vertical reference */}
      <line
        x1={WAVE_END}
        y1={CY - AMP - 8}
        x2={WAVE_END}
        y2={CY + AMP + 8}
        stroke={AXIS_COLOR}
        strokeWidth="1"
        strokeDasharray="2 3"
      />

      {/* Axis labels */}
      <text x={CX + R + 14} y={CY + 4} fill={LABEL_COLOR} fontSize="9" fontFamily="ui-monospace, monospace">x</text>
      <text x={CX - 3} y={CY - R - 14} fill={LABEL_COLOR} fontSize="9" fontFamily="ui-monospace, monospace">y</text>
      <text x={WAVE_END + 10} y={CY + 4} fill={LABEL_COLOR} fontSize="9" fontFamily="ui-monospace, monospace">θ</text>
      <text x={WAVE_START - 18} y={CY - AMP - 4} fill={SINE_COLOR} fontSize="8.5" fontFamily="ui-monospace, monospace" opacity="0.8">sin θ</text>
      <text x={WAVE_START - 18} y={CY + AMP + 10} fill={COS_COLOR} fontSize="8.5" fontFamily="ui-monospace, monospace" opacity="0.8">cos θ</text>

      {/* Tracer (teal, subtle) */}
      <line
        ref={tracerRef}
        x1={CX}
        y1={CY}
        x2={WAVE_END}
        y2={CY}
        stroke={SINE_COLOR}
        strokeWidth="1"
        strokeDasharray="2 3"
        opacity="0.45"
      />

      {/* Cosine wave (gold) */}
      <polyline
        ref={cosRef}
        points=""
        stroke={COS_COLOR}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* Sine wave (teal) */}
      <polyline
        ref={sineRef}
        points=""
        stroke={SINE_COLOR}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rotating radius */}
      <line
        ref={radiusRef}
        x1={CX}
        y1={CY}
        x2={CX + R}
        y2={CY}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.2"
      />

      {/* Rotating point */}
      <circle ref={pointRef} cx={CX + R} cy={CY} r="3.5" fill={SINE_COLOR} />
    </svg>
  );
}