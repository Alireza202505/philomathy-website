import React, { useState } from "react";
import { motion } from "framer-motion";

function StepCard({ step, index: i, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-lg rounded-2xl p-7 md:p-8 border-l-4 cursor-default transition-all duration-300 ${i % 2 === 0 ? "self-start" : "self-end"}`}
        style={{
          borderColor: step.color,
          background: "#ffffff",
          boxShadow: hovered ? "0 14px 36px rgba(0,0,0,0.12)" : "0 4px 16px rgba(0,0,0,0.07)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-start gap-5">
          <span
            className="font-heading text-4xl font-bold leading-none shrink-0 mt-1"
            style={{
              color: step.color,
              opacity: 0.35,
            }}
          >
            {step.num}
          </span>
          <div>
            <h3 className="font-heading text-xl font-bold mb-2" style={{ color: step.color }}>
              {step.title}
            </h3>
            <p className="font-body text-sm text-gray-500 leading-relaxed">{step.desc}</p>
          </div>
        </div>
      </motion.div>
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 + 0.4 }}
          className="flex flex-col items-center my-3"
          aria-hidden="true"
        >
          <div className="w-px h-8 bg-gradient-to-b from-gray-200 to-transparent" />
          <ArrowDown className="w-4 h-4 text-gray-300 -mt-1" />
        </motion.div>
      )}
    </React.Fragment>
  );
}
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Assessment",
    desc: "A complimentary session to understand your student's exact starting point — no judgment, only insight.",
    color: "#D4AF37",
  },
  {
    num: "02",
    title: "Personalized Learning",
    desc: "A custom curriculum built around their unique strengths, gaps, and aspirations.",
    color: "#0B8F9F",
  },
  {
    num: "03",
    title: "Mastery",
    desc: "Progressive sessions where concepts click, confidence rises, and understanding deepens.",
    color: "#8B5CF6",
  },
  {
    num: "04",
    title: "Achievement",
    desc: "Measurable results — higher grades, stronger foundations, and lifelong intellectual curiosity.",
    color: "#059669",
  },
];

export default function Scene4Transformation() {
  return (
    <section className="relative bg-white py-28 md:py-36 px-5 sm:px-8 overflow-hidden">
      {/* Faint diagonal lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #071A2E 0, #071A2E 1px, transparent 0, transparent 50%)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="text-center mb-18"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#D4AF37] font-body font-bold mb-5">
            The Journey
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#071A2E] leading-tight">
            A Structured Path to<br />
            <span className="text-[#D4AF37]">Transformation.</span>
          </h2>
        </motion.div>

        {/* Steps — vertical flow */}
        <div className="flex flex-col items-center gap-0">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/booking">
            <Button className="bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold px-10 h-12 rounded-full shadow-lg shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/45 transition-all duration-300 group">
              Start Your Journey — Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}