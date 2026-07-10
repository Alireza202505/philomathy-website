import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function seeded(s) { const x = Math.sin(s + 1) * 10000; return x - Math.floor(x); }

const FORMULAS = [
  "e^{iπ}+1=0","∫f(x)dx","∇²ψ=k²ψ","E=mc²",
  "∑1/n²=π²/6","φ=(1+√5)/2","F=ma","lim sin(x)/x=1",
];

const drifters = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  text: FORMULAS[i % FORMULAS.length],
  left: seeded(i * 3) * 92,
  top: seeded(i * 7) * 85,
  size: 10 + seeded(i * 11) * 16,
  dur: 20 + seeded(i * 5) * 12,
  delay: seeded(i * 13) * 10,
  drift: 24 + seeded(i * 17) * 28,
  rotate: (seeded(i * 19) - 0.5) * 10,
}));

export default function Scene8FinalCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#040E1A] py-28 px-5 sm:px-8"
    >
      {/* Animated particle background */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale }}
        aria-hidden="true"
      >
        {/* Deep radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.08) 0%, rgba(7,26,46,0.5) 50%, #040E1A 100%)",
          }}
        />
        {/* Drifting formulas */}
        {drifters.map((d) => (
          <motion.span
            key={d.id}
            className="absolute font-mono whitespace-nowrap select-none pointer-events-none"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              fontSize: d.size,
              color: "rgba(212,175,55,0.05)",
            }}
            animate={{ y: [0, -d.drift, 0], rotate: [0, d.rotate, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
          >
            {d.text}
          </motion.span>
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative text-center max-w-2xl mx-auto">
        <motion.p
          className="text-[0.65rem] uppercase tracking-[0.38em] text-[#D4AF37]/65 font-body font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Begin Here
        </motion.p>

        <motion.h2
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Begin Your<br />
          <span className="text-[#D4AF37]">Learning Journey.</span>
        </motion.h2>

        <motion.p
          className="text-white/45 font-body text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Your complimentary assessment is the first step. No pressure — just a conversation about your student's potential.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <Link to="/booking">
            <Button className="bg-[#D4AF37] text-[#040E1A] hover:bg-[#c9a22f] font-body font-bold text-base px-10 h-13 rounded-full transition-all duration-300 group w-full sm:w-auto">
              Book an Assessment — Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </Link>
          <Link to="/about">
            <Button
              variant="outline"
              className="border-white/15 text-white bg-white/5 hover:bg-white/10 hover:border-[#D4AF37]/30 backdrop-blur-sm font-body text-base h-13 px-8 rounded-full transition-all duration-300 w-full sm:w-auto"
            >
              Meet the Founder
            </Button>
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {["PhD in Mathematics", "20+ Years Experience", "1,000+ Students", "Free First Assessment"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#D4AF37]/50" aria-hidden="true" />
              <span className="font-body text-xs text-white/35 tracking-wide">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}