import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import UnitCircleAnimation from "@/components/home/scenes/UnitCircleAnimation";

const FOUNDER_URL = "https://media.base44.com/images/public/6a331feb505e847f52c30cf2/b2e7715e9_finalpicture.jpg";
const LOGO_URL = "https://media.base44.com/images/public/6a331feb505e847f52c30cf2/e1e7f1a88_finallogo.jpg";

export default function Scene1Curiosity() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#040E1A]">
      {/* Faded logo watermark */}
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={LOGO_URL}
          alt=""
          className="w-[420px] sm:w-[560px] lg:w-[680px] max-w-none opacity-[0.10] object-contain"
        />
      </div>
      {/* Dark gradient overlay for legibility — semi-transparent so watermark shows through */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#040E1A]/92 via-[#040E1A]/80 to-[#061327]/95" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: content */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* Eyebrow */}
            <motion.p
              className="font-body font-semibold tracking-[0.3em] uppercase text-[#D4AF37] mb-6 text-xs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Philomathy Learning Center
            </motion.p>

            {/* Headline — single fade-up */}
            <motion.h1
              className="font-heading font-bold text-white leading-[1.06] tracking-tight mb-7 text-4xl sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Mathematics Begins With <span className="text-[#D4AF37]">Curiosity</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg leading-relaxed max-w-lg mb-5 text-white/55 font-body"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              Discover the beauty of mathematical thinking and scientific understanding — guided by a PhD mathematician.
            </motion.p>

            {/* Founder chip */}
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.6 }}
            >
              <img
                src={FOUNDER_URL}
                alt="Alireza Khatoonabadi, PhD"
                className="w-11 h-11 rounded-full object-cover border border-white/15 shrink-0"
              />
              <div className="border-l border-white/10 pl-4">
                <p className="font-heading text-white font-semibold text-sm">Alireza Khatoonabadi</p>
                <p className="text-[#D4AF37] text-xs font-body mt-0.5">PhD in Mathematics · Founder &amp; Lead Instructor</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.75 }}
            >
              <Link to="/booking">
                <Button className="bg-[#D4AF37] text-[#040E1A] hover:bg-[#e0bc45] font-body font-semibold text-sm sm:text-base px-8 h-12 rounded-full transition-all duration-300 w-full sm:w-auto">
                  Begin Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/subjects">
                <Button
                  variant="outline"
                  className="border-white/15 text-white bg-transparent hover:bg-white/5 hover:border-white/25 font-body text-sm sm:text-base h-12 px-8 rounded-full transition-all duration-300 w-full sm:w-auto"
                >
                  Explore Subjects
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right: animated unit-circle-to-wave diagram */}
          <motion.div
            className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full max-w-[400px] opacity-90">
              <UnitCircleAnimation />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <span className="text-[0.6rem] text-white/20 tracking-[0.22em] uppercase font-body">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 text-white/20" />
      </motion.div>
    </section>
  );
}