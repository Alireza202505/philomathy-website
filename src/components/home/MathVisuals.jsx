import React from "react";
import { motion } from "framer-motion";
import AnimatedMathCanvas from "@/components/shared/AnimatedMathCanvas";

const graphs = [
  { type: "sine", label: "Trigonometry", color: "#D4AF37" },
  { type: "parabola", label: "Calculus", color: "#0B4F57" },
  { type: "exponential", label: "Growth Functions", color: "#3B6E8F" },
  { type: "circle", label: "Geometry", color: "#8B5CF6" },
];

export default function MathVisuals() {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* subtle grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#071A2E 1px, transparent 1px), linear-gradient(90deg, #071A2E 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-body font-semibold mb-3">
            Visual Mathematics
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Where Equations Come to Life
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {graphs.map((g, i) => (
            <motion.div
              key={g.type}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: `0 8px 32px ${g.color}20` }}
              className="bg-card border border-border rounded-2xl p-5 cursor-default"
              style={{ willChange: "transform" }}
            >
              <AnimatedMathCanvas type={g.type} color={g.color} width={260} height={100} />
              <p className="font-body text-sm font-medium text-foreground mt-3 text-center">{g.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}