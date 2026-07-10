import React from "react";
import { motion } from "framer-motion";

const cases = [
  {
    subject: "Calculus",
    quote: "I had failed two tests and genuinely believed I wasn't smart enough for university math.",
    name: "David L.",
    role: "Grade 12 Student",
    outcome: "Improved from a C average to an A over two semesters. Accepted into Engineering at the University of British Columbia.",
  },
  {
    subject: "Physics",
    quote: "Every formula felt like a wall. I was memorizing without understanding anything.",
    name: "Priya R.",
    role: "Grade 11 Student",
    outcome: "Rose from a mid-C to an A- over one academic year. Placed top of her class in the Physical Sciences stream.",
  },
  {
    subject: "Mathematics",
    quote: "My son dreaded math homework. It was affecting his confidence in every subject.",
    name: "Sarah M.",
    role: "Parent, Grade 10",
    outcome: "Improved from a C to an A over two semesters. Received the School Math Award as top performer in his graduating class.",
  },
];

function CaseCard({ caseStudy, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl border border-gray-100 p-7 flex flex-col"
    >
      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-[#D4AF37] font-body font-bold mb-5">
        {caseStudy.subject}
      </p>
      <blockquote className="font-heading text-base text-gray-700 italic leading-relaxed mb-6 flex-1">
        "{caseStudy.quote}"
      </blockquote>
      <div className="border-t border-gray-100 pt-5">
        <p className="font-body font-semibold text-[#071A2E] text-sm">{caseStudy.name}</p>
        <p className="font-body text-xs text-gray-400 mb-3">{caseStudy.role}</p>
        <p className="font-body text-sm text-gray-600 leading-relaxed">{caseStudy.outcome}</p>
      </div>
    </motion.div>
  );
}

export default function Scene7StudentStory() {
  return (
    <section className="relative bg-[#F8F7F3] py-28 md:py-36 px-5 sm:px-8 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
          className="text-center mb-16"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#D4AF37] font-body font-bold mb-5">
            Outcomes
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#071A2E] leading-tight">
            Where Students<br />
            <span className="text-[#D4AF37]">Have Landed.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <CaseCard key={c.name} caseStudy={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}