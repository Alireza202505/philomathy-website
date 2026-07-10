import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Draws a self-animating math graph on a canvas.
 * type: "sine" | "parabola" | "exponential" | "circle"
 */
export default function AnimatedMathCanvas({ type = "sine", color = "#D4AF37", width = 300, height = 120 }) {
  const canvasRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const progressRef = useRef(0);
  const animRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    let start = null;
    const duration = 1600;

    function draw(progress) {
      ctx.clearRect(0, 0, W, H);

      // Axis lines
      ctx.strokeStyle = `${color}22`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(W * 0.08, 0);
      ctx.lineTo(W * 0.08, H);
      ctx.stroke();

      // Curve
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.beginPath();

      const points = Math.floor(W * progress);
      for (let px = 0; px < points; px++) {
        const t = px / W;
        let y;
        if (type === "sine") {
          y = H / 2 - Math.sin(t * Math.PI * 4) * (H * 0.35);
        } else if (type === "parabola") {
          const x = (t - 0.5) * 4;
          y = H / 2 - (x * x * -1 + 1) * (H * 0.38);
        } else if (type === "exponential") {
          y = H * 0.85 - Math.exp(t * 2.8) * (H * 0.065);
        } else if (type === "circle") {
          const angle = t * Math.PI * 2;
          const cx = W * 0.5 + Math.cos(angle) * W * 0.3;
          const cy = H * 0.5 + Math.sin(angle) * H * 0.38;
          if (px === 0) { ctx.moveTo(cx, cy); return; }
          ctx.lineTo(cx, cy);
          return;
        }
        if (px === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    function step(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      draw(eased);
      if (progress < 1) animRef.current = requestAnimationFrame(step);
    }

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [inView, type, color]);

  return (
    <div ref={ref}>
      <canvas ref={canvasRef} width={width} height={height} className="w-full" style={{ height }} />
    </div>
  );
}