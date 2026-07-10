import React, { useRef, useEffect } from "react";

// Animated cylindrical shell method diagram for the Calculus card.
// Draws a curve y = √x, sweeps a strip, rotates it into a shell, builds
// nested shells, then fades in the volume formula. Pure canvas + rAF,
// flat thin lines — no glow/shadowBlur.

const TEAL = "#0B8F9F";
const GOLD = "#D4AF37";
const AXIS = "rgba(255,255,255,0.22)";
const LABEL = "rgba(255,255,255,0.4)";

const W = 320;
const H = 150;

// Plot area
const PAD_L = 32;
const PAD_R = 20;
const PAD_T = 18;
const PAD_B = 38;
const PW = W - PAD_L - PAD_R;
const PH = H - PAD_T - PAD_B;

// Curve: y = sqrt(x) on [0, 4], mapped to plot area
const X_MIN = 0;
const X_MAX = 4;
const Y_MAX = 2.1;

const xToPx = (x) => PAD_L + ((x - X_MIN) / (X_MAX - X_MIN)) * PW;
const yToPx = (y) => PAD_T + PH - (y / Y_MAX) * PH;
const f = (x) => Math.sqrt(x);

// Rotation axis (x-axis) is at bottom of plot
const AXIS_Y = PAD_T + PH;

export default function ShellMethodAnimation() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let started = false;

    const NUM_SHELLS = 6;
    const SHELL_BOUNDS = [];
    for (let i = 0; i < NUM_SHELLS; i++) {
      const x0 = X_MIN + ((X_MAX - X_MIN) / NUM_SHELLS) * i;
      const x1 = X_MIN + ((X_MAX - X_MIN) / NUM_SHELLS) * (i + 1);
      SHELL_BOUNDS.push({ x0, x1, yMid: f((x0 + x1) / 2) });
    }

    function drawAxes() {
      ctx.save();
      ctx.strokeStyle = AXIS;
      ctx.lineWidth = 1;
      // x-axis
      ctx.beginPath();
      ctx.moveTo(PAD_L, AXIS_Y);
      ctx.lineTo(W - PAD_R, AXIS_Y);
      ctx.stroke();
      // y-axis
      ctx.beginPath();
      ctx.moveTo(PAD_L, PAD_T);
      ctx.lineTo(PAD_L, AXIS_Y);
      ctx.stroke();

      // labels
      ctx.fillStyle = LABEL;
      ctx.font = "8px ui-monospace, monospace";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText("y", PAD_L - 4, PAD_T + 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("x", W - PAD_R, AXIS_Y + 4);
      ctx.restore();
    }

    function drawCurve(toX) {
      ctx.save();
      ctx.strokeStyle = TEAL;
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
        const x = X_MIN + (toX - X_MIN) * (i / steps);
        const px = xToPx(x);
        const py = yToPx(f(x));
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // shaded region under curve up to toX
      ctx.fillStyle = `${TEAL}14`;
      ctx.beginPath();
      ctx.moveTo(xToPx(X_MIN), AXIS_Y);
      for (let i = 0; i <= steps; i++) {
        const x = X_MIN + (toX - X_MIN) * (i / steps);
        ctx.lineTo(xToPx(x), yToPx(f(x)));
      }
      ctx.lineTo(xToPx(toX), AXIS_Y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawStrip(x0, x1) {
      ctx.save();
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 1.2;
      ctx.fillStyle = `${GOLD}20`;
      ctx.beginPath();
      ctx.rect(xToPx(x0), yToPx(f(x1)), xToPx(x1) - xToPx(x0), AXIS_Y - yToPx(f(x1)));
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // Draw a pseudo-3D cylindrical shell as line-based ellipse tube
    // cx = center x in plot coords, radius in y-units, width in px
    function drawShell(cxPx, yVal, alpha) {
      if (alpha <= 0) return;
      const rPx = (yVal / Y_MAX) * PH;
      if (rPx < 2) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = TEAL;
      ctx.lineWidth = 1.2;

      // Shell is drawn around the x-axis (AXIS_Y) as horizontal tube
      // ellipse: rx = half-width, ry = radius
      const halfW = (PW / NUM_SHELLS) * 0.42;

      // front half ellipse (bottom)
      ctx.beginPath();
      ctx.ellipse(cxPx, AXIS_Y, halfW, rPx, 0, 0, Math.PI);
      ctx.stroke();

      // back half ellipse (top, dashed)
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.ellipse(cxPx, AXIS_Y, halfW, rPx, 0, Math.PI, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // top and bottom edges
      ctx.beginPath();
      ctx.moveTo(cxPx - halfW, AXIS_Y - rPx);
      ctx.lineTo(cxPx + halfW, AXIS_Y - rPx);
      ctx.moveTo(cxPx - halfW, AXIS_Y + rPx);
      ctx.lineTo(cxPx + halfW, AXIS_Y + rPx);
      ctx.stroke();
      ctx.restore();
    }

    function drawFormula(alpha) {
      if (alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = GOLD;
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("V = 2π ∫ y·f(y) dy", W / 2, H - 10);
      ctx.restore();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          let start = null;
          const TOTAL = 10000;

          function step(ts) {
            if (!start) start = ts;
            const elapsed = ts - start;
            const p = (elapsed % TOTAL) / TOTAL;

            // Global fade-out at the end of each loop for a smooth restart
            let fade = 1;
            if (p > 0.92) fade = 1 - (p - 0.92) / 0.08;

            ctx.clearRect(0, 0, W, H);
            ctx.save();
            ctx.globalAlpha = fade;

            drawAxes();

            // Phase 1: draw curve (0 - 0.18)
            const curveProg = Math.min(p / 0.18, 1);
            drawCurve(X_MIN + (X_MAX - X_MIN) * curveProg);

            // Phase 2: sweep strip left to right (0.18 - 0.38)
            if (p >= 0.18 && p < 0.4) {
              const sp = Math.min((p - 0.18) / 0.2, 1);
              const sweepX = X_MIN + (X_MAX - X_MIN) * sp;
              drawStrip(sweepX - 0.15, sweepX);
            }

            // Phase 3: single shell rotating in (0.4 - 0.55)
            if (p >= 0.4 && p < 0.55) {
              const sp = (p - 0.4) / 0.15;
              const shellIdx = 2;
              const sb = SHELL_BOUNDS[shellIdx];
              const cxPx = xToPx((sb.x0 + sb.x1) / 2);
              drawStrip(sb.x0, sb.x1);
              drawShell(cxPx, sb.yMid * sp, 1);
            }

            // Phase 4: build all shells in sequence (0.55 - 0.82)
            if (p >= 0.55) {
              const bp = Math.min((p - 0.55) / 0.27, 1);
              const shellsToShow = bp * NUM_SHELLS;
              for (let i = 0; i < NUM_SHELLS; i++) {
                const individual = Math.min(Math.max(shellsToShow - i, 0), 1);
                if (individual > 0) {
                  const sb = SHELL_BOUNDS[i];
                  const cxPx = xToPx((sb.x0 + sb.x1) / 2);
                  drawShell(cxPx, sb.yMid, individual);
                }
              }
            }

            // Phase 5: fade in formula (0.82 - 0.92), hold, then global fade-out loops
            if (p >= 0.82) {
              const fp = Math.min((p - 0.82) / 0.1, 1);
              drawFormula(fp);
            }

            ctx.restore();
            raf = requestAnimationFrame(step);
          }
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
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