import React from "react";
import { motion } from "framer-motion";
import AcademicBackground from "@/components/shared/AcademicBackground";
import PeriodicTable from "@/components/tools/PeriodicTable";

export default function PeriodicTablePage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <div className="relative bg-[#071A2E] pt-32 md:pt-36 pb-16 px-5 sm:px-8 overflow-hidden">
        <AcademicBackground variant="dark" density={10} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-4">
            Interactive Tool
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Periodic Table of Elements
          </h1>
          <p className="text-white/60 font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Click any element to view its atomic number, mass, electron configuration, category, state, and electronegativity.
          </p>
        </motion.div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <PeriodicTable />
      </div>
    </div>
  );
}