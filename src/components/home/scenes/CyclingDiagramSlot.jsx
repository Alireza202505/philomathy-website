import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UnitCircleAnimation from "./UnitCircleAnimation";
import AreaOfCircleAnimation from "./AreaOfCircleAnimation";
import AlgebraTileAnimation from "./AlgebraTileAnimation";

// Cycles through the three animated math diagrams, one at a time,
// cross-fading between them. Each plays for ~8 seconds before transitioning.

const DIAGRAMS = [UnitCircleAnimation, AreaOfCircleAnimation, AlgebraTileAnimation];
const DURATION = 8000;

export default function CyclingDiagramSlot() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % DIAGRAMS.length);
    }, DURATION);
    return () => clearInterval(interval);
  }, []);

  const Current = DIAGRAMS[index];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 110 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center [&>svg]:max-h-full [&>svg]:w-auto"
        >
          <Current />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}