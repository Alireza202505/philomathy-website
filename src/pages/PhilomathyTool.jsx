import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import AcademicBackground from "@/components/shared/AcademicBackground";
import DesmosCalculator from "@/components/desmos/DesmosCalculator";

export default function PhilomathyTool() {
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
            Philomathy Graphing Tool
          </h1>
          <p className="text-white/60 font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Graph functions and explore math visually. Plot equations, experiment with sliders, and discover mathematical concepts in real time.
          </p>
        </motion.div>
      </div>

      {/* Embed */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        <DesmosCalculator />
        <div className="text-center mt-6">
          <a
            href="https://www.desmos.com/calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-body font-semibold text-[#D4AF37] hover:text-[#c9a030] transition-colors"
          >
            Open in full screen
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}