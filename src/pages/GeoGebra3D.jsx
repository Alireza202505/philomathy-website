import React from "react";
import { motion } from "framer-motion";
import { Box, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import AcademicBackground from "@/components/shared/AcademicBackground";

export default function GeoGebra3D() {
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
            <Box className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-4">
            Interactive Tool
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            3D Graphing Calculator
          </h1>
          <p className="text-white/60 font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Visualize surfaces, curves, and solids in three dimensions. Powered by GeoGebra 3D.
          </p>
        </motion.div>
      </div>

      {/* Embed */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.geogebra.org/3d?embed"
            title="GeoGebra 3D Calculator"
            className="w-full"
            style={{ height: "640px", border: "none" }}
            allowFullScreen
          />
        </div>
        <div className="text-center mt-6">
          <a
            href="https://www.geogebra.org/3d"
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