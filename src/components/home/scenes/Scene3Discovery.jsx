import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import UnitCircleAnimation from "@/components/home/scenes/UnitCircleAnimation";
import AreaOfCircleAnimation from "@/components/home/scenes/AreaOfCircleAnimation";
import AlgebraTileAnimation from "@/components/home/scenes/AlgebraTileAnimation";
import ShellMethodAnimation from "@/components/home/scenes/ShellMethodAnimation";
import TorusAnimation from "@/components/home/scenes/TorusAnimation";
import EMWaveAnimation from "@/components/home/scenes/EMWaveAnimation";

function DiscoveryCard({ visual: v, index: i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-2xl p-5 overflow-hidden cursor-default transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered ? "0 14px 36px rgba(0,0,0,0.4)" : "0 0 0 rgba(0,0,0,0)",
        background: "rgba(255,255,255,0.03)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        willChange: "transform, box-shadow",
      }}
    >
      <div className="mb-1">
        {v.type === "emwave" ? (
          <EMWaveAnimation />
        ) : v.type === "trig" ? (
          <div
            className="rounded-xl p-2 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <UnitCircleAnimation />
          </div>
        ) : v.type === "area" ? (
          <div
            className="rounded-xl p-2 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <AreaOfCircleAnimation />
          </div>
        ) : v.type === "algebra" ? (
          <div
            className="rounded-xl p-2 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <AlgebraTileAnimation />
          </div>
        ) : v.type === "shell" ? (
          <ShellMethodAnimation />
        ) : v.type === "torus" ? (
          <TorusAnimation />
        ) : (
          <DrawingCanvas type={v.type} color={v.color} width={320} height={110} />
        )}
      </div>
      <div className="pt-3 border-t border-white/6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-heading text-base font-bold text-white">{v.label}</h3>
          <code
            className="font-mono text-xs px-2 py-0.5 rounded transition-colors duration-300"
            style={{
              color: v.color,
              background: `${v.color}14`,
            }}
          >
            {v.formula}
          </code>
        </div>
        <p className="font-body text-xs text-white/38 mt-1">{v.desc}</p>
      </div>
    </motion.div>
  );
}

// Animated canvas — draws a gradient glow wave as it comes into view
const GOLD = "#E6C15A";

function DrawingCanvas({ type, color, width = 320, height = 140 }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    let raf;
    let started = false;

    // Returns [x, y] for a given pixel step along the curve
    function pointAt(px) {
      const t2 = px / W;
      if (type === "spiral") {
        const angle = t2 * Math.PI * 6;
        const r = t2 * Math.min(W, H) * 0.38;
        return [W * 0.5 + Math.cos(angle) * r, H * 0.5 + Math.sin(angle) * r];
      }
      if (type === "polar") {
        const angle = t2 * Math.PI * 8;
        const r = Math.abs(Math.cos(angle * 2)) * Math.min(W, H) * 0.38;
        return [W * 0.5 + Math.cos(angle) * r, H * 0.5 + Math.sin(angle) * r];
      }
      let y;
      if (type === "sine") y = H / 2 - Math.sin(t2 * Math.PI * 4) * H * 0.36;
      else if (type === "parabola") { const x = (t2 - 0.5) * 4; y = H / 2 - (-(x * x) + 1) * H * 0.36; }
      else if (type === "exp") y = H * 0.88 - Math.exp(t2 * 2.6) * H * 0.06;
      else if (type === "wave") y = H / 2 - Math.sin(t2 * Math.PI * 5) * Math.exp(-t2 * 1.5) * H * 0.4;
      else y = H / 2 - Math.sin(t2 * Math.PI * 3) * H * 0.3;
      return [px, y];
    }

    function drawGrid() {
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 6]);
      const cols = 7;
      const rows = 4;
      for (let c = 1; c < cols; c++) {
        const x = (W / cols) * c;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let r = 1; r < rows; r++) {
        const y = (H / rows) * r;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.restore();
    }

    function dot(x, y, c) {
      ctx.save();
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          let start = null;
          const dur = 2000;

          function step(ts) {
            if (!start) start = ts;
            const t = Math.min((ts - start) / dur, 1);
            const prog = 1 - Math.pow(1 - t, 3);
            ctx.clearRect(0, 0, W, H);

            drawGrid();

            const pts = Math.max(1, Math.floor(W * prog));
            const coords = [];
            for (let px = 0; px <= pts; px++) coords.push(pointAt(px));

            // Horizontal gradient: accent -> gold
            const grad = ctx.createLinearGradient(0, 0, W, 0);
            grad.addColorStop(0, color);
            grad.addColorStop(1, GOLD);

            // Translucent area fill beneath the curve
            const fill = ctx.createLinearGradient(0, 0, 0, H);
            fill.addColorStop(0, `${color}1F`);
            fill.addColorStop(1, "rgba(255,255,255,0)");
            ctx.beginPath();
            ctx.moveTo(coords[0][0], H);
            coords.forEach(([x, y]) => ctx.lineTo(x, y));
            ctx.lineTo(coords[coords.length - 1][0], H);
            ctx.closePath();
            ctx.fillStyle = fill;
            ctx.fill();

            // Glowing gradient stroke
            ctx.beginPath();
            coords.forEach(([x, y], idx) => (idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2.5;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();

            // Endpoint dots
            dot(coords[0][0], coords[0][1], color);
            if (t >= 1) {
              const last = coords[coords.length - 1];
              dot(last[0], last[1], GOLD);
            }

            if (t < 1) raf = requestAnimationFrame(step);
          }
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, [type, color]);

  return (
    <div
      ref={wrapRef}
      className="rounded-xl p-2"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <canvas ref={canvasRef} width={width} height={height} className="w-full rounded-lg" style={{ height }} aria-hidden="true" />
    </div>
  );
}

const visuals = [
  { type: "emwave", label: "Physics", formula: "∇×E = −∂B/∂t", color: "#E45C3A", desc: "Electric and magnetic fields in motion" },
  { type: "trig", label: "Trigonometry", formula: "sin θ · cos θ", color: "#D4AF37", desc: "Waves, cycles, and oscillation" },
  { type: "shell", label: "Calculus", formula: "V = 2π∫y·f(y)dy", color: "#0B8F9F", desc: "Rates of change and optimization" },
  { type: "area", label: "Geometry", formula: "A = πr²", color: "#0d9488", desc: "Structure, form, and symmetry" },
  { type: "algebra", label: "Algebra", formula: "(a−b)²", color: "#D4AF37", desc: "Identities and visual proofs" },
  { type: "torus", label: "Advanced Math", formula: "(a+d·cosv)cosu", color: "#059669", desc: "Patterns hidden in polar form" },
];

export default function Scene3Discovery() {
  return (
    <section className="relative bg-[#05111E] py-28 md:py-36 px-5 sm:px-8 overflow-hidden">
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
          className="text-center mb-18"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#D4AF37]/70 font-body font-bold mb-5">
            Discovery
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl mx-auto">
            Every Concept Unlocks<br />
            <span className="text-[#D4AF37]">New Possibilities.</span>
          </h2>
          <p className="text-white/40 font-body text-base mt-5 max-w-lg mx-auto leading-relaxed">
            Mathematics is not a collection of facts. It is a language for understanding reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visuals.map((v, i) => (
            <DiscoveryCard key={v.type} visual={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}