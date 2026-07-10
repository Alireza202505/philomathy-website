import React, { useRef, useEffect } from "react";

// Animated wireframe torus for the 3D Geometry card.
// Uses parametric equations with a basic isometric projection.
// A cross-sectional circle sweeps around the main loop continuously,
// leaving a faint trail that gradually reveals the torus shape.

const ACCENT = "#C2410C";
const STATIC = "rgba(255,255,255,0.16)";
const AXIS = "rgba(255,255,255,0.12)";
const TRAIL = "rgba(194,65,12,0.5)";

const W = 320;
const H = 140;

// Torus parameters
const A = 1.0;   // major radius
const D = 0.42;  // minor radius
const SCALE = 38;

export default function TorusAnimation() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let running = false;

    // Simple isometric-ish projection
    function project(x, y, z) {
      const angle = Math.PI / 6; // 30 degrees
      const px = W / 2 + (x - z * Math.cos(angle)) * SCALE;
      const py = H / 2 + (-y * 0.7 + z * Math.sin(angle)) * SCALE;
      return [px, py];
    }

    function drawAxes() {
      ctx.save();
      ctx.strokeStyle = AXIS;
      ctx.lineWidth = 1;
      const cx = 28;
      const cy = H - 28;
      const len = 18;
      // x-axis
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + len, cy);
      ctx.stroke();
      // y-axis (up)
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, cy - len);
      ctx.stroke();
      // z-axis (diagonal for depth)
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx - len * 0.5, cy + len * 0.5);
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.font = "7px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("x", cx + len + 5, cy);
      ctx.fillText("y", cx, cy - len - 4);
      ctx.fillText("z", cx - len * 0.5 - 4, cy + len * 0.5 + 4);
      ctx.restore();
    }

    // Draw the static torus outline (inner & outer boundary ellipses + faint tube circles)
    function drawStaticOutline() {
      ctx.save();
      ctx.strokeStyle = STATIC;
      ctx.lineWidth = 1;

      // Outer boundary circle (radius A+D)
      const outerSteps = 64;
      ctx.beginPath();
      for (let i = 0; i <= outerSteps; i++) {
        const u = (i / outerSteps) * Math.PI * 2;
        const x = (A + D) * Math.cos(u);
        const y = (A + D) * Math.sin(u);
        const [px, py] = project(x, y, 0);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Inner boundary circle (radius A-D)
      ctx.beginPath();
      for (let i = 0; i <= outerSteps; i++) {
        const u = (i / outerSteps) * Math.PI * 2;
        const x = (A - D) * Math.cos(u);
        const y = (A - D) * Math.sin(u);
        const [px, py] = project(x, y, 0);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Faint tube cross-section circles at intervals
      const tubeCount = 12;
      for (let j = 0; j < tubeCount; j++) {
        const u = (j / tubeCount) * Math.PI * 2;
        ctx.beginPath();
        const steps = 24;
        for (let i = 0; i <= steps; i++) {
          const v = (i / steps) * Math.PI * 2;
          const r = A + D * Math.cos(v);
          const x = r * Math.cos(u);
          const y = r * Math.sin(u);
          const z = D * Math.sin(v);
          const [px, py] = project(x, y, z);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    // Draw the active swept circle at angle u with the accent color
    function drawSweptCircle(u) {
      ctx.save();
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      const steps = 36;
      for (let i = 0; i <= steps; i++) {
        const v = (i / steps) * Math.PI * 2;
        const r = A + D * Math.cos(v);
        const x = r * Math.cos(u);
        const y = r * Math.sin(u);
        const z = D * Math.sin(v);
        const [px, py] = project(x, y, z);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Draw faint trail circles (recently swept positions)
    function drawTrail(trailAngles) {
      ctx.save();
      ctx.lineWidth = 1;
      trailAngles.forEach((u, idx) => {
        const alpha = (idx / trailAngles.length) * 0.35;
        ctx.strokeStyle = `rgba(194,65,12,${alpha})`;
        ctx.beginPath();
        const steps = 24;
        for (let i = 0; i <= steps; i++) {
          const v = (i / steps) * Math.PI * 2;
          const r = A + D * Math.cos(v);
          const x = r * Math.cos(u);
          const y = r * Math.sin(u);
          const z = D * Math.sin(v);
          const [px, py] = project(x, y, z);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });
      ctx.restore();
    }

    const TRAIL_COUNT = 10;
    let trail = [];

    function render(currentU) {
      ctx.clearRect(0, 0, W, H);
      drawAxes();
      drawStaticOutline();
      drawTrail(trail);
      drawSweptCircle(currentU);
    }

    function loop(ts) {
      if (!running) return;
      const speed = 0.0008;
      const u = (ts * speed) % (Math.PI * 2);

      // Update trail
      trail.push(u);
      if (trail.length > TRAIL_COUNT) trail.shift();

      render(u);
      raf = requestAnimationFrame(loop);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!running) {
            running = true;
            raf = requestAnimationFrame(loop);
          }
        } else {
          running = false;
          if (raf) cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.2 }
    );
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => { observer.disconnect(); running = false; if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="rounded-xl p-2"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full rounded-lg"
        style={{ height: H }}
        aria-hidden="true"
      />
    </div>
  );
}