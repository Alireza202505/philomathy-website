import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calculator, Sigma, Atom, FlaskConical, Languages, GraduationCap, BookOpen, Trophy, ArrowRight } from "lucide-react";
import AcademicBackground from "@/components/shared/AcademicBackground";
import { base44 } from "@/api/base44Client";

const CATEGORY_META = {
  Mathematics: { icon: Calculator, color: "#D4AF37", blurb: "Core mathematics from foundations through pre-university." },
  "Advanced Mathematics": { icon: Sigma, color: "#0B4F57", blurb: "University-level rigor for serious mathematical study." },
  Physics: { icon: Atom, color: "#3B6E8F", blurb: "From classical mechanics to the modern frontier." },
  Chemistry: { icon: FlaskConical, color: "#4A7C59", blurb: "Structured understanding of matter and reactions." },
  French: { icon: Languages, color: "#8B5CF6", blurb: "Comprehensive language development across all skills." },
  English: { icon: BookOpen, color: "#0B8F9F", blurb: "General, academic, and test-prep English for all proficiency levels." },
  "University Prep": { icon: GraduationCap, color: "#071A2E", blurb: "Strategic preparation for high-stakes academic milestones." },
  "Math Contests": { icon: Trophy, color: "#B45309", blurb: "Competition preparation for AMC, Waterloo CEMC, and beyond." },
};

const FALLBACK_SUBJECTS = [
  { name: "Algebra", category: "Mathematics", tier: "Tier 1", pricePerHour: 65, description: "Equations, inequalities, and functions.", gradeLevel: "Grades 8–12" },
  { name: "Geometry", category: "Mathematics", tier: "Tier 1", pricePerHour: 65, description: "Shapes, proofs, and spatial reasoning.", gradeLevel: "Grades 8–12" },
  { name: "Trigonometry", category: "Mathematics", tier: "Tier 1", pricePerHour: 65, description: "Angles, identities, and wave functions.", gradeLevel: "Grades 10–12" },
  { name: "Calculus", category: "Mathematics", tier: "Tier 2", pricePerHour: 78, description: "Limits, derivatives, integrals, and applications.", gradeLevel: "AP/IB" },
  { name: "Advanced Mathematics", category: "Mathematics", tier: "Tier 2", pricePerHour: 78, description: "Functions, vectors, and advanced algebra.", gradeLevel: "AP/IB" },
  { name: "Probability", category: "Mathematics", tier: "Tier 2", pricePerHour: 78, description: "Combinatorics, distributions, and inference.", gradeLevel: "AP/IB" },
  { name: "Statistics", category: "Mathematics", tier: "Tier 2", pricePerHour: 78, description: "Descriptive and inferential statistics.", gradeLevel: "AP/IB" },
  { name: "Linear Algebra", category: "Mathematics", tier: "Tier 3", pricePerHour: 90, description: "Vector spaces, matrices, and linear transformations.", gradeLevel: "University" },
  { name: "Differential Equations", category: "Mathematics", tier: "Tier 3", pricePerHour: 90, description: "ODEs, PDEs, and boundary value problems.", gradeLevel: "University" },
  { name: "Real Analysis", category: "Mathematics", tier: "Tier 3", pricePerHour: 90, description: "Limits, continuity, convergence, and measure.", gradeLevel: "University" },
  { name: "Abstract Algebra", category: "Mathematics", tier: "Tier 3", pricePerHour: 90, description: "Groups, rings, fields, and Galois theory.", gradeLevel: "University" },
  { name: "Mechanics", category: "Physics", tier: "Tier 2", pricePerHour: 78, description: "Kinematics, dynamics, and energy.", gradeLevel: "Grades 11–12 / AP" },
  { name: "Electricity", category: "Physics", tier: "Tier 2", pricePerHour: 78, description: "Circuits, fields, and electromagnetic theory.", gradeLevel: "Grades 11–12 / AP" },
  { name: "Magnetism", category: "Physics", tier: "Tier 2", pricePerHour: 78, description: "Magnetic fields and electromagnetic induction.", gradeLevel: "Grades 11–12 / AP" },
  { name: "Modern Physics", category: "Physics", tier: "Tier 2", pricePerHour: 78, description: "Relativity, quantum mechanics, and nuclear physics.", gradeLevel: "Grades 11–12 / AP" },
  { name: "General Chemistry", category: "Chemistry", tier: "Tier 1", pricePerHour: 65, description: "Atomic structure, bonding, and reactions.", gradeLevel: "Grades 8–12" },
  { name: "High School Chemistry", category: "Chemistry", tier: "Tier 1", pricePerHour: 65, description: "Curriculum-aligned chemistry fundamentals.", gradeLevel: "Grades 8–12" },
  { name: "Organic Chemistry", category: "Chemistry", tier: "Tier 3", pricePerHour: 90, description: "Reaction mechanisms, synthesis, and spectroscopy.", gradeLevel: "University" },
  { name: "French (all levels)", category: "French", tier: "Tier 1", pricePerHour: 65, description: "Grammar, conversation, reading, and writing.", gradeLevel: "All Levels" },
  { name: "General English", category: "English", tier: "Tier 1", pricePerHour: 65, description: "Everyday communication, grammar, and fluency building.", gradeLevel: "All Levels" },
  { name: "Academic Writing", category: "English", tier: "Tier 2", pricePerHour: 78, description: "Essays, research papers, and critical analysis.", gradeLevel: "Grades 10–12 / AP" },
  { name: "Reading Comprehension", category: "English", tier: "Tier 2", pricePerHour: 78, description: "Strategies for understanding and analyzing complex texts.", gradeLevel: "Grades 10–12 / AP" },
  { name: "IELTS Preparation", category: "English", tier: "Tier 2", pricePerHour: 78, description: "Test strategies for all four IELTS modules.", gradeLevel: "All Levels" },
  { name: "CELPIP Preparation", category: "English", tier: "Tier 2", pricePerHour: 78, description: "Targeted prep for the CELPIP exam.", gradeLevel: "All Levels" },
  { name: "University Preparation", category: "University Prep", tier: "Univ Prep", pricePerHour: 95, description: "Midterm/final exam prep, scholarship applications, university entrance.", gradeLevel: "University" },
  { name: "Math Contests", category: "Math Contests", tier: "Tier 2", pricePerHour: 78, description: "Competition prep for AMC and Waterloo CEMC contests (Pascal, Cayley, Fermat, Euclid).", gradeLevel: "Grades 8–12" },
];

const TIER_LABELS = {
  "Tier 1": "Tier 1",
  "Tier 2": "Tier 2",
  "Tier 3": "Tier 3",
  "Univ Prep": "Univ Prep",
};

function SubjectCard({ category, subjects, index }) {
  const [open, setOpen] = useState(false);
  const meta = CATEGORY_META[category.name] || CATEGORY_META["Mathematics"];
  const Icon = meta.icon;
  const minPrice = Math.min(...subjects.map((s) => s.pricePerHour));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="bg-card border border-border rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 flex items-center justify-between text-left group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${meta.color}15` }}
          >
            <Icon className="w-6 h-6" style={{ color: meta.color }} />
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-foreground">{category.name}</h3>
            <p className="text-sm text-muted-foreground font-body mt-0.5">{meta.blurb}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="font-mono text-sm font-bold text-foreground">From ${minPrice}/hr</p>
            <Link
              to="/pricing"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-[#D4AF37] hover:underline font-body"
            >
              View details
            </Link>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-border pt-4">
              <div className="space-y-2">
                {subjects.map((subject, si) => (
                  <motion.div
                    key={subject.name}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: si * 0.04, duration: 0.28 }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
                      <div className="min-w-0">
                        <span className="font-body text-sm text-foreground block">{subject.name}</span>
                        {subject.description && (
                          <span className="font-body text-xs text-muted-foreground block truncate">{subject.description}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {subject.gradeLevel && (
                        <span className="text-xs font-body text-muted-foreground bg-muted px-2 py-0.5 rounded hidden sm:inline">
                          {subject.gradeLevel}
                        </span>
                      )}
                      <span className="font-mono text-xs font-semibold text-foreground">${subject.pricePerHour}/hr</span>
                      <Link
                        to={`/booking?subject=${encodeURIComponent(subject.name)}`}
                        className="flex items-center gap-1 text-xs font-body font-semibold text-[#D4AF37] hover:gap-1.5 transition-all whitespace-nowrap"
                      >
                        Book
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Subjects() {
  const [subjects, setSubjects] = useState(FALLBACK_SUBJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Subject.list("sortOrder", 100)
      .then((data) => { if (data && data.length > 0) setSubjects(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Group by category, preserving first-seen order
  const categories = [];
  subjects.forEach((s) => {
    if (!categories.find((c) => c.name === s.category)) {
      categories.push({ name: s.category, subjects: [] });
    }
    categories.find((c) => c.name === s.category).subjects.push(s);
  });

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="relative bg-[#071A2E] pt-36 pb-24 px-6 overflow-hidden">
        <AcademicBackground variant="dark" density={14} />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-body font-semibold mb-4">
            Our Programs
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Subjects We Teach
          </h1>
          <p className="text-white/60 font-body max-w-xl mx-auto text-lg leading-relaxed">
            From foundational mathematics to advanced university-level study, our programs span the
            disciplines that build rigorous, confident thinkers.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-4">
          {categories.map((cat, i) => (
            <SubjectCard key={cat.name} category={cat} subjects={cat.subjects} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}