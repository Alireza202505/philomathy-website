import React, { useRef, useEffect } from "react";

// Animated electromagnetic wave for the Physics card.
// Shows perpendicular E (vertical) and B (skewed/horizontal) fields
// propagating along a single axis. Continuous loop, pauses off-screen.

const E_COLOR = "#E45C3A";
const B_COLOR = "#D4AF37";
const AXIS_COLOR = "rgba(255,255,255,0.22)";
const TICK_COLOR = "rgba(255,255,255,0.10)";

const W = 320;
const H = 110;

export default function EMWaveAnimation() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let running = false;

    const AXIS_Y = H / 2;
    const X_START = 30;
    const X_END = W - 20;
    const AXIS_LEN = X_END - X_START;
    const AMP = 30;
    const WAVELENGTH = 70;

    function drawAxis() {
      ctx.save();
      ctx.strokeStyle = AXIS_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(X_START, AXIS_Y);
      ctx.lineTo(X_END, AXIS_Y);
      ctx.stroke();

      // tick marks
      ctx.strokeStyle = TICK_COLOR;
      const ticks = 8;
      for (let i = 0; i <= ticks; i++) {
        const x = X_START + (AXIS_LEN / ticks) * i;
        ctx.beginPath();
        ctx.moveTo(x, AXIS_Y - 10);
        ctx.lineTo(x, AXIS_Y + 10);
        ctx.stroke();
      }

      // labels
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "7px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("→", X_END + 4, AXIS_Y - 3);
      ctx.restore();
    }

    // Electric field — vertical sine wave (2D)
    function drawEField(phase) {
      ctx.save();
      ctx.strokeStyle = E_COLOR;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      const steps = 120;
      for (let i = 0; i <= steps; i++) {
        const x = X_START + (AXIS_LEN * i) / steps;
        const y = AXIS_Y - Math.sin((x - X_START) / WAVELENGTH * Math.PI * 2 - phase) * AMP;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // a few perpendicular field lines from axis to wave
      const lines = 6;
      for (let i = 0; i <= lines; i++) {
        const x = X_START + (AXIS_LEN / lines) * i;
        const y = AXIS_Y - Math.sin((x - X_START) / WAVELENGTH * Math.PI * 2 - phase) * AMP;
        ctx.strokeStyle = `${E_COLOR}33`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(x, AXIS_Y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Magnetic field — perpendicular plane (skewed projection)
    // We project B onto a diagonal axis to suggest depth
    function drawBField(phase) {
      ctx.save();
      const skewX = 0.35;
      const skewY = 0.5;
      ctx.strokeStyle = B_COLOR;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      const steps = 120;
      for (let i = 0; i <= steps; i++) {
        const x = X_START + (AXIS_LEN * i) / steps;
        const bVal = Math.sin((x - X_START) / WAVELENGTH * Math.PI * 2 - phase) * AMP;
        // project perpendicular field into skewed direction
        const px = x + bVal * skewX;
        const py = AXIS_Y - bVal * skewY;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // perpendicular field lines for B (skewed)
      const lines = 6;
      for (let i = 0; i <= lines; i++) {
        const x = X_START + (AXIS_LEN / lines) * i;
        const bVal = Math.sin((x - X_START) / WAVELENGTH * Math.PI * 2 - phase) * AMP;
        const px = x + bVal * skewX;
        const py = AXIS_Y - bVal * skewY;
        ctx.strokeStyle = `${B_COLOR}33`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(x, AXIS_Y);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
      ctx.restore();
    }

    function render(phase) {
      ctx.clearRect(0, 0, W, H);
      drawAxis();
      drawBField(phase);
      drawEField(phase);
    }

    function loop(ts) {
      if (!running) return;
      const speed = 0.002;
      const phase = (ts * speed) % (Math.PI * 2);
      render(phase);
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