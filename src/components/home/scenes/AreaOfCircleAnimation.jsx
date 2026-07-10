import React, { useRef, useEffect } from "react";

// Animated visual proof: circle → sectored → unrolled rectangle (A = πr²).
// A circle is divided into thin pie-slice sectors; the sectors rearrange into
// a row of alternating up/down triangles that straighten into a rectangle
// (base ≈ πr, height = r). Pure SVG + requestAnimationFrame, thin lines,
// no glow/blur/particles. Loops continuously.

const TEAL = "#0d9488";
const GOLD = "#D4AF37";

const N = 12; // sectors
const R = 28; // radius == rectangle height
const VB_W = 200;
const VB_H = 100;
const CX = 100;
const CY = 38;
const B = (2 * Math.PI * R) / N; // sector base width
const RECT_W = (N / 2) * B; // = πR
const RECT_LEFT = CX - RECT_W / 2;
const RECT_TOP = CY - R / 2;
const RECT_BOTTOM = CY + R / 2;

function circleVerts(i) {
  const t1 = (i / N) * Math.PI * 2 - Math.PI / 2;
  const t2 = ((i + 1) / N) * Math.PI * 2 - Math.PI / 2;
  return {
    apex: [CX, CY],
    v1: [CX + R * Math.cos(t1), CY + R * Math.sin(t1)],
    v2: [CX + R * Math.cos(t2), CY + R * Math.sin(t2)],
  };
}

function rectVerts(i) {
  const pairIdx = Math.floor(i / 2);
  const xLeft = RECT_LEFT + pairIdx * B;
  const xMid = xLeft + B / 2;
  if (i % 2 === 0) {
    return {
      apex: [xMid, RECT_TOP],
      v1: [xLeft, RECT_BOTTOM],
      v2: [xLeft + B, RECT_BOTTOM],
    };
  }
  return {
    apex: [xMid, RECT_BOTTOM],
    v1: [xLeft, RECT_TOP],
    v2: [xLeft + B, RECT_TOP],
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpVerts(c, r, t) {
  return {
    apex: [lerp(c.apex[0], r.apex[0], t), lerp(c.apex[1], r.apex[1], t)],
    v1: [lerp(c.v1[0], r.v1[0], t), lerp(c.v1[1], r.v1[1], t)],
    v2: [lerp(c.v2[0], r.v2[0], t), lerp(c.v2[1], r.v2[1], t)],
  };
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function AreaOfCircleAnimation() {
  const pathsRef = useRef([]);
  const radiusRef = useRef(null);
  const formulaRef = useRef(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const CYCLE = 8000;

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % CYCLE;
      const phase = elapsed / CYCLE;

      let t = 0;
      let formulaOpacity = 0;
      let radiusOpacity = 1;

      if (phase < 0.15) {
        // hold circle
        t = 0;
      } else if (phase < 0.4) {
        // transition to rectangle
        t = easeInOut((phase - 0.15) / 0.25);
        radiusOpacity = 1 - t;
      } else if (phase < 0.75) {
        // hold rectangle, fade in formula
        t = 1;
        formulaOpacity = Math.min(1, (phase - 0.45) / 0.1);
        radiusOpacity = 0;
      } else if (phase < 0.95) {
        // transition back to circle
        t = 1 - easeInOut((phase - 0.75) / 0.2);
        formulaOpacity = Math.max(0, 1 - (phase - 0.75) / 0.05);
        radiusOpacity = 1 - t;
      } else {
        t = 0;
      }

      for (let i = 0; i < N; i++) {
        const path = pathsRef.current[i];
        if (!path) continue;
        const c = circleVerts(i);
        const r = rectVerts(i);
        const v = lerpVerts(c, r, t);
        const d = `M ${v.apex[0].toFixed(1)} ${v.apex[1].toFixed(1)} L ${v.v1[0].toFixed(1)} ${v.v1[1].toFixed(1)} L ${v.v2[0].toFixed(1)} ${v.v2[1].toFixed(1)} Z`;
        path.setAttribute("d", d);
      }

      if (radiusRef.current) {
        radiusRef.current.setAttribute("opacity", radiusOpacity.toFixed(2));
      }
      if (formulaRef.current) {
        formulaRef.current.setAttribute("opacity", formulaOpacity.toFixed(2));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const initialSectors = Array.from({ length: N }, (_, i) => {
    const v = circleVerts(i);
    return `M ${v.apex[0]} ${v.apex[1]} L ${v.v1[0]} ${v.v1[1]} L ${v.v2[0]} ${v.v2[1]} Z`;
  });

  const c0 = circleVerts(0);

  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full" fill="none" aria-hidden="true">
      {initialSectors.map((d, i) => (
        <path
          key={i}
          ref={(el) => { pathsRef.current[i] = el; }}
          d={d}
          fill={i % 2 === 0 ? `${TEAL}1A` : "transparent"}
          stroke={TEAL}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      ))}
      <line
        ref={radiusRef}
        x1={CX}
        y1={CY}
        x2={c0.v1[0]}
        y2={c0.v1[1]}
        stroke={GOLD}
        strokeWidth="1.2"
        opacity="1"
      />
      <text
        ref={formulaRef}
        x={CX}
        y={92}
        textAnchor="middle"
        fill={GOLD}
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        opacity="0"
      >
        A = πr²
      </text>
    </svg>
  );
}