import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DesmosCalculator from "@/components/desmos/DesmosCalculator";
import DesmosDemo from "@/components/desmos/DesmosDemo";
import GeoGebraEmbed from "@/components/desmos/GeoGebraEmbed";

const DEMOS = [
  {
    label: "Sine & Cosine Waves",
    expressions: ["\\sin(x)", "\\cos(x)"],
    color: "#D4AF37",
  },
  {
    label: "Quadratic Parabola",
    expressions: ["x^2 - 4x + 3"],
    color: "#0B4F57",
  },
  {
    label: "Exponential Growth",
    expressions: ["e^x"],
    color: "#3B6E8F",
  },
  {
    label: "Circle & Ellipse",
    expressions: ["x^2 + y^2 = 16", "\\frac{x^2}{9} + \\frac{y^2}{4} = 1"],
    color: "#8B5CF6",
  },
  {
    label: "Linear Systems",
    expressions: ["2x + y = 4", "-x + 3y = 9"],
    color: "#E45C3A",
  },
  {
    label: "Derivative Visualization",
    expressions: ["x^3 - 3x", "3x^2 - 3"],
    color: "#059669",
  },
];

export default function Calculator() {
  const [desmosReady, setDesmosReady] = useState(!!window.Desmos);

  useEffect(() => {
    if (window.Desmos) return;
    const script = document.createElement("script");
    script.src = "https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
    script.async = true;
    script.onload = () => setDesmosReady(true);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-[#071A2E] py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-[#D4AF37] font-body font-semibold mb-4">
            Interactive Tools
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Desmos Graphing Calculator
          </h1>
          <p className="text-white/60 font-body text-lg max-w-xl mx-auto">
            Explore mathematics visually. Graph functions, analyze equations, and discover concepts in real time.
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* Live Calculator */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Live Calculator
          </h2>
          {desmosReady ? (
            <DesmosCalculator />
          ) : (
            <div className="w-full rounded-2xl border border-border bg-card flex items-center justify-center" style={{ height: "520px" }}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
                <p className="text-muted-foreground font-body text-sm">Loading calculator…</p>
              </div>
            </div>
          )}
        </motion.section>

        {/* Demos */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Concept Demos
          </h2>
          <p className="text-muted-foreground font-body mb-8">
            Pre-built graphs illustrating key mathematical concepts covered in our programs.
          </p>
          {desmosReady ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEMOS.map((demo, i) => (
                <motion.div
                  key={demo.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <DesmosDemo
                    expressions={demo.expressions}
                    label={demo.label}
                    color={demo.color}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="w-full rounded-2xl border border-border bg-card flex items-center justify-center h-48">
              <div className="w-8 h-8 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
            </div>
          )}
        </motion.section>

        {/* GeoGebra */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-heading text-2xl font-bold text-foreground">GeoGebra</h2>
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded-full">Classic · Geometry · 3D</span>
          </div>
          <p className="text-muted-foreground font-body mb-6">
            Advanced interactive mathematics — algebra, geometry, calculus, and 3D visualization in one tool.
          </p>
          <GeoGebraEmbed />
        </motion.section>

      </div>
    </div>
  );
}