import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Wraps a home-page scene with a smooth, scroll-linked cinematic reveal.
 * As the scene settles into view it gently fades up and scales into place,
 * creating a paced, professional dissolve between narrative scenes.
 * Respects the user's reduced-motion preference.
 */
export default function CinematicScene({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "start 0.45"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);

  if (reduce) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}