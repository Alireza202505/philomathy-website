import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sigma, Atom, FlaskConical, Languages, BookOpen, GraduationCap } from "lucide-react";

const subjects = [
  {
    id: "math",
    name: "Mathematics",
    desc: "Algebra, calculus, linear algebra, and discrete math.",
    icon: Sigma,
    color: "#D4AF37",
  },
  {
    id: "adv",
    name: "Advanced Mathematics",
    desc: "Differential equations, real analysis, complex variables.",
    icon: Sigma,
    color: "#F59E0B",
  },
  {
    id: "physics",
    name: "Physics",
    desc: "Mechanics, electromagnetism, quantum, and relativity.",
    icon: Atom,
    color: "#3B82F6",
  },
  {
    id: "chem",
    name: "Chemistry",
    desc: "Organic, inorganic, physical, and analytical.",
    icon: FlaskConical,
    color: "#10B981",
  },
  {
    id: "french",
    name: "French",
    desc: "Grammar, comprehension, writing, and oral practice.",
    icon: Languages,
    color: "#8B5CF6",
  },
  {
    id: "english",
    name: "English",
    desc: "General, academic writing, IELTS, and CELPIP.",
    icon: BookOpen,
    color: "#0B8F9F",
  },
  {
    id: "prep",
    name: "Exam Prep",
    desc: "SAT, ACT, IB, and university entrance preparation.",
    icon: GraduationCap,
    color: "#E45C3A",
  },
];

function SubjectCard({ subject, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = subject.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 cursor-default transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? "0 14px 36px rgba(0,0,0,0.35)" : "0 0 0 rgba(0,0,0,0)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
        style={{
          background: `${subject.color}14`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: subject.color }} aria-hidden="true" />
      </div>
      <h3 className="font-heading text-base font-bold text-white mb-1.5">{subject.name}</h3>
      <p className="font-body text-xs text-white/45 leading-relaxed">{subject.desc}</p>
    </motion.div>
  );
}

export default function Scene6SubjectsUniverse() {
  return (
    <section className="relative bg-[#05111E] py-28 md:py-36 px-5 sm:px-8 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
          className="text-center mb-16"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#D4AF37]/70 font-body font-bold mb-5">
            Subjects
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Every Subject Connected.<br />
            <span className="text-[#D4AF37]">Every Level Reached.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((subject, i) => (
            <SubjectCard key={subject.id} subject={subject} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/subjects">
            <Button
              variant="outline"
              className="border-[#D4AF37]/28 text-[#D4AF37] hover:bg-[#D4AF37]/8 hover:border-[#D4AF37]/55 font-body font-semibold rounded-full px-8 h-11 transition-all duration-300 group"
            >
              View All Programs
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}