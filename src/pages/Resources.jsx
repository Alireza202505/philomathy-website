import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, BookOpen, Calculator, Atom, FlaskConical, Target, GraduationCap, TrendingUp, Shapes } from "lucide-react";
import AcademicBackground from "@/components/shared/AcademicBackground";
import DesmosCalculator from "@/components/desmos/DesmosCalculator";
import GeoGebraEmbed from "@/components/desmos/GeoGebraEmbed";

const categories = [
  {
    icon: Calculator,
    label: "Mathematics Notes",
    color: "#D4AF37",
    resources: [
      { title: "Algebra Fundamentals", type: "PDF", pages: "24 pages" },
      { title: "Calculus Study Guide", type: "PDF", pages: "38 pages" },
      { title: "Trigonometry Reference Sheet", type: "PDF", pages: "8 pages" },
    ],
  },
  {
    icon: Atom,
    label: "Physics Notes",
    color: "#3B6E8F",
    resources: [
      { title: "Mechanics Overview", type: "PDF", pages: "30 pages" },
      { title: "Electricity & Magnetism Guide", type: "PDF", pages: "26 pages" },
      { title: "Physics Formula Sheet", type: "PDF", pages: "6 pages" },
    ],
  },
  {
    icon: FlaskConical,
    label: "Chemistry Notes",
    color: "#4A7C59",
    resources: [
      { title: "General Chemistry Review", type: "PDF", pages: "22 pages" },
      { title: "Organic Chemistry Primer", type: "PDF", pages: "28 pages" },
      { title: "Periodic Table Reference", type: "PDF", pages: "4 pages" },
    ],
  },
  {
    icon: BookOpen,
    label: "Study Guides",
    color: "#0B4F57",
    resources: [
      { title: "Effective Study Strategies", type: "PDF", pages: "16 pages" },
      { title: "Exam Preparation Checklist", type: "PDF", pages: "10 pages" },
      { title: "Time Management for Students", type: "PDF", pages: "12 pages" },
    ],
  },
  {
    icon: Target,
    label: "Exam Tips",
    color: "#D4AF37",
    resources: [
      { title: "Multiple Choice Strategies", type: "PDF", pages: "14 pages" },
      { title: "Problem-Solving Framework", type: "PDF", pages: "18 pages" },
      { title: "Common Exam Mistakes", type: "PDF", pages: "10 pages" },
    ],
  },
  {
    icon: GraduationCap,
    label: "University Prep",
    color: "#071A2E",
    resources: [
      { title: "University Math Readiness", type: "PDF", pages: "32 pages" },
      { title: "Scholarship Application Guide", type: "PDF", pages: "20 pages" },
      { title: "Program Selection Framework", type: "PDF", pages: "14 pages" },
    ],
  },
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="bg-background">
      <div className="relative bg-[#071A2E] pt-36 pb-24 px-6 overflow-hidden">
        <AcademicBackground variant="dark" density={14} />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-body font-semibold mb-4">Free Learning Resources</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Resources to Accelerate<br />Your Learning
          </h1>
          <p className="text-white/60 font-body max-w-xl mx-auto text-lg leading-relaxed">
            Curated study materials, reference guides, and practice resources — free for all students.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-200 border ${
                  activeCategory === i
                    ? "bg-[#071A2E] text-white border-[#071A2E] shadow-md"
                    : "bg-card border-border text-foreground hover:border-[#D4AF37]/40"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Resource cards */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {categories[activeCategory].resources.map((res, i) => (
            <motion.div
              key={res.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{res.title}</h3>
              <p className="font-body text-sm text-muted-foreground mb-5">{res.pages} · {res.type}</p>
              <button className="flex items-center gap-2 text-sm font-body font-semibold text-[#D4AF37] hover:text-[#c9a030] transition-colors group-hover:gap-3">
                <Download className="w-4 h-4" />
                Download Free
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Math Tools */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-body font-semibold mb-4">Interactive Tools</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Explore Math Visually
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto leading-relaxed">
              Graph functions, visualize geometry, and experiment with 3D surfaces — right in your browser.
            </p>
          </div>

          {/* Desmos */}
          <div className="mb-10">
            <div className="flex items-center gap-2.5 mb-4">
              <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-heading text-xl font-bold text-foreground">Desmos Graphing Calculator</h3>
            </div>
            <p className="text-muted-foreground font-body text-sm mb-4 max-w-2xl">
              A powerful, intuitive graphing tool — plot functions, sliders, tables, and more. Perfect for visualizing algebra, calculus, and trigonometry.
            </p>
            <DesmosCalculator />
          </div>

          {/* GeoGebra */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Shapes className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-heading text-xl font-bold text-foreground">GeoGebra Suite</h3>
            </div>
            <p className="text-muted-foreground font-body text-sm mb-4 max-w-2xl">
              Switch between graphing, geometry, and 3D visualization — ideal for interactive constructions and spatial reasoning.
            </p>
            <GeoGebraEmbed />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#071A2E] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
        >
          <AcademicBackground variant="dark" density={8} />
          <div className="relative">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Want a Personalized Learning Plan?
            </h2>
            <p className="text-white/60 font-body mb-8 max-w-lg mx-auto">
              Resources are a start — but nothing replaces expert instruction tailored to you.
            </p>
            <a href="/booking">
              <button className="bg-[#D4AF37] text-[#071A2E] hover:bg-[#c9a030] font-body font-semibold text-base px-10 h-12 rounded-full shadow-lg transition-all duration-300">
                Book Free Assessment
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}