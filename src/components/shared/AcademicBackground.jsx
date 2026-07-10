import React, { useMemo, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FORMULAS = [
  "e^{iπ} + 1 = 0",
  "∫₀^∞ f(x) dx",
  "F = ma",
  "E = mc²",
  "∇ · E = ρ/ε₀",
  "P(A|B) = P(B|A)·P(A)/P(B)",
  "∂u/∂t = α∇²u",
  "PV = nRT",
  "∑ aₙxⁿ",
  "φ = (1+√5)/2",
  "Fₙ = Fₙ₋₁ + Fₙ₋₂",
  "det(A − λI) = 0",
  "lim_{x→0} sin(x)/x = 1",
  "d/dx[eˣ] = eˣ",
  "σ = √(Σ(x−μ)²/N)",
  "λ = h/p",
  "∮ B · dl = μ₀I",
  "Δx · Δp ≥ ℏ/2",
  "∇²ψ + k²ψ = 0",
  "Σ 1/n² = π²/6",
];

// Seeded pseudo-random for stable SSR — avoids hydration mismatch
function seededRand(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function AcademicBackground({ variant = "dark", density = 14, parallax = false }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, parallax ? -60 : 0]);

  const items = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => ({
      id: i,
      text: FORMULAS[i % FORMULAS.length],
      left: seededRand(i * 3) * 96,
      top: seededRand(i * 7) * 96,
      size: 12 + seededRand(i * 11) * 20,
      duration: 16 + seededRand(i * 5) * 14,
      delay: seededRand(i * 13) * 10,
      drift: 18 + seededRand(i * 17) * 28,
      rotate: (seededRand(i * 19) - 0.5) * 12,
    }));
  }, [density]);

  const textColor = variant === "dark" ? "rgba(255,255,255," : "rgba(7,26,46,";
  const baseAlpha = variant === "dark" ? 0.055 : 0.042;

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
        {items.map((item) => (
          <motion.span
            key={item.id}
            className="absolute font-mono whitespace-nowrap"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              fontSize: `${item.size}px`,
              color: `${textColor}${baseAlpha})`,
            }}
            animate={{
              y: [0, -item.drift, 0],
              rotate: [0, item.rotate, 0],
              opacity: [baseAlpha * 0.6, baseAlpha * 18, baseAlpha * 0.6],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            {item.text}
          </motion.span>
        ))}
      </motion.div>

    </div>
  );
}