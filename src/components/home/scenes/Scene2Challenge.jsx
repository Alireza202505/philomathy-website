import React, { useState } from "react";
import { motion } from "framer-motion";

function ChallengeCard({ challenge: c, index: i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl p-8 cursor-default transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? "0 14px 36px rgba(0,0,0,0.4)" : "0 0 0 rgba(0,0,0,0)",
        willChange: "transform, box-shadow",
        transform: hovered ? "translateY(-4px)" : "translateY(0)"
      }}
    >
      <span
        aria-hidden="true"
        className="block text-4xl mb-6 select-none transition-colors duration-300"
        style={{ color: hovered ? c.color : `${c.color}AA` }}
      >
        {c.icon}
      </span>
      <h3 className="font-heading text-xl font-bold text-white mb-3">{c.label}</h3>
      <p className="font-body text-sm text-white/45 leading-relaxed">{c.desc}</p>
    </motion.div>
  );
}

const challenges = [
  {
    label: "Procedural Fluency Without Understanding",
    desc: "A student can execute an algorithm correctly yet cannot explain why each step works — leaving the procedure fragile under unfamiliar conditions.",
    icon: "◈",
    color: "#E45C3A"
  },
  {
    label: "Compounding Conceptual Gaps",
    desc: "When a foundational concept is only partially grasped, each subsequent topic built upon it becomes incrementally harder to master.",
    icon: "◉",
    color: "#8B5CF6"
  },
  {
    label: "Fragmented Knowledge",
    desc: "Topics learned in isolation resist transfer. Students struggle to connect algebra, geometry, and analysis into a coherent mathematical framework.",
    icon: "◍",
    color: "#3B6E8F"
  }
];

export default function Scene2Challenge() {
  return (
    <section className="relative bg-[#040E1A] py-28 md:py-36 px-5 sm:px-8 overflow-hidden">
      {/* Subtle noise texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)"
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
          className="text-center mb-20"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#D4AF37]/70 font-body font-bold mb-5">
            The Challenge
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl mx-auto">
            The Gap Between<br />
            <span className="text-white/35">Memorizing and Understanding.</span>
          </h2>
          <p className="text-white/40 font-body text-base mt-6 max-w-xl mx-auto leading-relaxed">
            Many students can carry out a procedure correctly without understanding why it works. This gap between procedural fluency and conceptual understanding compounds over time — and it is where most tutoring stops short.
          </p>
        </motion.div>

        {/* Challenge cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((c, i) => (
            <ChallengeCard key={c.label} challenge={c} index={i} />
          ))}
        </div>

        {/* Divider transition */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent origin-left"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center font-heading italic text-lg mt-8 text-white/55"
        >
          "There is no such thing as a student who cannot learn mathematics — only one who has not yet been shown how."
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center text-[#D4AF37]/50 font-body text-xs mt-2"
        >
          — Alireza Khatoonabadi, PhD
        </motion.p>
      </div>
    </section>
  );
}