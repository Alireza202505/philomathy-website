import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calculator, Sigma, Atom, FlaskConical, Languages, GraduationCap, BookOpen, Trophy, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AcademicBackground from "@/components/shared/AcademicBackground";

const programs = [
  {
    icon: Calculator,
    title: "K–12 Mathematics",
    color: "#D4AF37",
    summary: "Foundational to advanced mathematics for every grade level.",
    description:
      "From elementary arithmetic to pre-calculus, our K–12 program builds a rigorous foundation. Students develop number sense, algebraic thinking, geometric reasoning, and problem-solving strategies that transfer across all STEM disciplines.",
    topics: ["Algebra I & II", "Geometry", "Trigonometry", "Pre-Calculus", "Statistics & Data"],
    ideal: "Grades 6–12",
  },
  {
    icon: Sigma,
    title: "University Mathematics",
    color: "#0B4F57",
    summary: "Rigorous support for undergraduate and advanced coursework.",
    description:
      "Designed for university students navigating high-stakes mathematics courses. We offer expert instruction in real analysis, abstract algebra, linear algebra, differential equations, and probability theory — the courses that define mathematical maturity.",
    topics: ["Real Analysis", "Linear Algebra", "Abstract Algebra", "Differential Equations", "Probability Theory"],
    ideal: "Undergraduate & Advanced",
  },
  {
    icon: Atom,
    title: "Physics",
    color: "#3B6E8F",
    summary: "Classical and modern physics, built on mathematical depth.",
    description:
      "Physics instruction grounded in mathematical reasoning. Students gain a conceptual and computational understanding of mechanics, electromagnetism, optics, and modern physics, preparing them for competitive science programs.",
    topics: ["Mechanics", "Electricity & Magnetism", "Optics", "Modern Physics", "Wave Equations"],
    ideal: "Grades 10–University",
  },
  {
    icon: FlaskConical,
    title: "Chemistry",
    color: "#4A7C59",
    summary: "From high school fundamentals to university organic chemistry.",
    description:
      "A structured progression from foundational chemistry through organic reactions and university-level coursework. Emphasis on conceptual clarity, lab reasoning, and exam performance.",
    topics: ["General Chemistry", "Organic Chemistry", "University Chemistry", "Reaction Mechanisms", "Stoichiometry"],
    ideal: "Grades 9–University",
  },
  {
    icon: Languages,
    title: "French",
    color: "#8B5CF6",
    summary: "Comprehensive French instruction across all language skills.",
    description:
      "Our French program develops confident communicators through structured instruction in reading, writing, speaking, and grammar. Suitable for core French, immersion, and university-level language courses.",
    topics: ["Reading Comprehension", "Written Expression", "Oral Communication", "Grammar & Syntax", "Literature"],
    ideal: "All Levels",
  },
  {
    icon: BookOpen,
    title: "English",
    color: "#0B8F9F",
    summary: "General, academic, and test-prep English for all proficiency levels.",
    description:
      "Our English program covers general communication skills, academic writing, and standardized test preparation (IELTS & CELPIP). Whether building everyday fluency or targeting band scores, students receive structured, personalized instruction aligned with their goals.",
    topics: ["General English", "Academic Writing", "Reading Comprehension", "IELTS Preparation", "CELPIP Preparation"],
    ideal: "All Levels",
  },
  {
    icon: GraduationCap,
    title: "Academic Coaching",
    color: "#071A2E",
    summary: "Strategic preparation for exams, university entrance, and scholarships.",
    description:
      "A holistic coaching program for students navigating the pressures of high-stakes academic milestones. We combine subject mastery with exam strategy, time management, and university application support.",
    topics: ["Midterm & Final Preparation", "University Entrance Exams", "Scholarship Applications", "Study Skills", "Academic Planning"],
    ideal: "Grades 11–University",
  },
  {
    icon: Trophy,
    title: "Math Contests",
    color: "#B45309",
    summary: "Competition preparation for AMC, Waterloo CEMC, and beyond.",
    description:
      "A dedicated program for students targeting competitive mathematics contests. We build the problem-solving fluency, combinatorial reasoning, and number-theory intuition that contests reward — spanning the American Mathematics Competitions (AMC) and the University of Waterloo's CEMC contests (Pascal, Cayley, Fermat, Euclid, and more).",
    topics: ["AMC 8 / 10 / 12", "Waterloo Pascal, Cayley & Fermat", "Euclid Contest", "Combinatorics & Number Theory", "Competition Problem-Solving"],
    ideal: "Grades 8–12",
    links: [
      { label: "AMC (MAA)", url: "https://www.maa.org/math-competitions" },
      { label: "Waterloo CEMC Contests", url: "https://cemc.uwaterloo.ca/contests.html" },
    ],
  },
];

function ProgramCard({ program, index }) {
  const [open, setOpen] = useState(false);
  const Icon = program.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#D4AF37]/5 hover:border-[#D4AF37]/25 transition-all duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-7 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${program.color}18` }}
          >
            <Icon className="w-7 h-7" style={{ color: program.color }} />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">{program.title}</h3>
            <p className="font-body text-sm text-muted-foreground mt-1">{program.summary}</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-4 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7 border-t border-border pt-5">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-body text-sm text-foreground/75 leading-relaxed mb-4">{program.description}</p>
                  <p className="text-xs font-body text-[#D4AF37] font-semibold uppercase tracking-widest">
                    Ideal for: {program.ideal}
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Topics Covered</p>
                  <div className="space-y-2">
                    {program.topics.map((t) => (
                      <div key={t} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span className="font-body text-sm text-foreground">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
                <Link to="/booking">
                  <Button className="bg-[#D4AF37] text-[#071A2E] hover:bg-[#c9a030] font-body font-semibold rounded-full px-7 h-10 text-sm">
                    Book Free Assessment
                  </Button>
                </Link>
                {program.links && (
                  <div className="flex items-center gap-4">
                    {program.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-body font-semibold text-[#0B4F57] hover:text-[#D4AF37] transition-colors"
                      >
                        {l.label}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Programs() {
  return (
    <div className="bg-background">
      <div className="relative bg-[#071A2E] pt-36 pb-24 px-6 overflow-hidden">
        <AcademicBackground variant="dark" density={14} />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-body font-semibold mb-4">Our Programs</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Programs Designed for<br />Academic Excellence
          </h1>
          <p className="text-white/60 font-body max-w-xl mx-auto text-lg leading-relaxed">
            Every program is crafted by a PhD mathematician with two decades of teaching experience.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-4">
        {programs.map((p, i) => (
          <ProgramCard key={p.title} program={p} index={i} />
        ))}
      </div>
    </div>
  );
}