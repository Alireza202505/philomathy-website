import React from "react";
import { motion } from "framer-motion";
import { PenTool, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import AcademicBackground from "@/components/shared/AcademicBackground";

export default function EuclidTool() {
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
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">
            <PenTool className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-4">
            Interactive Tool
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Euclid
          </h1>
          <p className="text-white/60 font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Solve math &amp; physics problems by drawing. Sketch diagrams, construct geometric figures, and let the tool analyze your work step by step.
          </p>
        </motion.div>
      </div>

      {/* Embed / Launch */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.geogebra.org/geometry?embed"
            title="Euclid — Draw to Solve Math & Physics"
            className="w-full"
            style={{ height: "640px", border: "none" }}
            allowFullScreen
          />
        </div>
        <div className="text-center mt-6">
          <p className="text-muted-foreground font-body text-sm mb-4">
            Prefer a standalone window? Launch the drawing tool directly:
          </p>
          <a href="https://www.geogebra.org/geometry" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full px-8 h-11">
              Launch Euclid
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}