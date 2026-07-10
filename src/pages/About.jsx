import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Clock, BookOpen, GraduationCap, Users, Quote } from "lucide-react";
import AcademicBackground from "@/components/shared/AcademicBackground";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FOUNDER_URL = "https://media.base44.com/images/public/6a331feb505e847f52c30cf2/b2e7715e9_finalpicture.jpg";

const timelineItems = [
  { year: "Early Career", label: "Academic Journey", desc: "A lifelong passion for mathematics beginning with competitive problem solving and academic distinction." },
  { year: "Graduate Studies", label: "Graduate Studies", desc: "Rigorous postgraduate training at the intersection of pure and applied mathematics." },
  { year: "PhD", label: "PhD in Mathematics", desc: "Earned a doctorate in Mathematics, specializing in advanced mathematical analysis." },
  { year: "25+ Years", label: "Teaching Excellence", desc: "Over 25 years of dedicated instruction spanning K–12 through university, shaping hundreds of mathematical thinkers across all levels." },
  { year: "2015+", label: "Philomathy Learning Center", desc: "Founded Philomathy to bring PhD-level rigor and mentorship to students at every stage." },
];

const stats = [
  { value: 25, suffix: "+", label: "Years Experience" },
  { value: 522, suffix: "+", label: "Live Sessions" },
  { value: 190, suffix: "+", label: "Courses Taught" },
];

const credentials = [
  { icon: Award, label: "PhD in Mathematics" },
  { icon: Clock, label: "25+ Years Experience" },
  { icon: BookOpen, label: "K–12 Specialist" },
  { icon: GraduationCap, label: "University Instructor" },
  { icon: Users, label: "Academic Mentor" },
];

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * target));
      if (t < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-[#D4AF37]">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <div className="bg-background">

      {/* ── Hero ── */}
      <div className="relative bg-[#071A2E] pt-32 md:pt-40 pb-20 md:pb-28 px-5 sm:px-8 overflow-hidden">
        <AcademicBackground variant="dark" density={14} />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-5">
                About the Founder
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-[1.05]">
                Meet Alireza<br />Khatoonabadi
              </h1>
              <p className="text-[#D4AF37] font-body font-medium text-sm mb-6">
                PhD in Mathematics · Founder &amp; Lead Instructor
              </p>
              <p className="text-white/60 font-body leading-relaxed text-base max-w-lg">
                With a doctorate in Mathematics and over 25 years of teaching experience, Alireza Khatoonabadi has dedicated his career to transforming the way students understand and engage with mathematics — from beginner to advanced, adapting his methods to every unique learning style.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.15 }}
              className="relative"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-[#D4AF37]/12 via-transparent to-[#0B4F57]/12 blur-2xl"
              />
              <img
                src={FOUNDER_URL}
                alt="Alireza Khatoonabadi, PhD — Founder of Philomathy Learning Center"
                className="relative w-full max-h-[520px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bio ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-5 text-foreground/75 font-body leading-[1.85] text-[1.05rem]">
            <p>
              Alireza Khatoonabadi holds a PhD in Mathematics and has over 25 years of teaching experience across K–12 and university levels. His expertise spans Pre-calculus, Calculus AP (AB/BC), Linear Algebra, Differential Equations, Discrete Mathematics, Probability & Statistics, and Geometry.
            </p>
            <p>
              His teaching philosophy is rooted in a deep conviction: mathematics is not about memorizing formulas — it is about learning how to think. He presents concepts clearly and concisely, breaking them into smaller understandable parts, using visual aids like diagrams and graphs, and gradually increasing difficulty with targeted practice.
            </p>
            <p>
              Alireza recognizes that each student has unique strengths and weaknesses. He tailors instruction to individual needs, identifies where students struggle, encourages critical thinking, and provides timely feedback on assignments — creating an environment where questions are celebrated and curiosity is rewarded.
            </p>

            {/* Philomathy Principles */}
            <div className="mt-6 p-6 bg-card border border-border rounded-2xl">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Our Motto</h3>
              <ol className="space-y-1.5 font-body text-sm text-muted-foreground list-decimal list-inside">
                <li>Better Through Education.</li>
                <li>Better in Concepts.</li>
                <li>Better in Academic Standards.</li>
              </ol>
            </div>

            <div className="mt-4 p-6 bg-card border border-border rounded-2xl">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Philomathy Principles</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-body text-sm text-muted-foreground">
                {["Adaptability, Energy, Openness, Humility", "Relate math skills to everyday life", "Remind students they are capable", "Encourage questions freely", "Address math anxiety directly", "Provide consistent positive feedback", "Individualized skill development"].map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-0.5">·</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-[#D4AF37]/30 transition-colors duration-200"
              >
                <cred.icon className="w-5 h-5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                <span className="text-sm font-body font-medium text-foreground">{cred.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Philosophy Quote ── */}
      <div className="bg-[#071A2E] py-20 md:py-24 px-5 sm:px-8 relative overflow-hidden">
        <AcademicBackground variant="dark" density={8} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <Quote className="w-10 h-10 text-[#D4AF37]/30 mx-auto mb-7" aria-hidden="true" />
          <blockquote className="font-heading text-2xl sm:text-3xl md:text-4xl text-white leading-snug italic mb-6">
            "Mathematics is not about memorizing formulas.<br className="hidden sm:block" />
            It is about learning how to think."
          </blockquote>
          <p className="font-body text-[#D4AF37] font-medium text-sm">— Alireza Khatoonabadi, PhD</p>
        </motion.div>
      </div>

      {/* ── Timeline ── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="text-center mb-14">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-4">
            Academic Journey
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            A Path Defined by Dedication
          </h2>
        </div>

        <ol className="relative" aria-label="Alireza's academic timeline">
          <div
            aria-hidden="true"
            className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/55 via-[#0B4F57]/35 to-[#D4AF37]/25"
          />
          <div className="space-y-9">
            {timelineItems.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-6 items-start"
              >
                <div
                  className="relative z-10 shrink-0 w-16 h-16 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/35 flex items-center justify-center"
                  aria-label={item.year}
                >
                  <span className="font-mono text-[0.6rem] font-bold text-[#D4AF37] text-center leading-tight px-1">
                    {item.year}
                  </span>
                </div>
                <div className="pt-3">
                  <h3 className="font-heading text-base font-bold text-foreground mb-1.5">{item.label}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </div>
        </ol>
      </div>

      {/* ── Stats ── */}
      <div className="bg-gradient-to-r from-[#071A2E] to-[#0B4F57] py-20 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <CountUp target={s.value} suffix={s.suffix} />
                <p className="font-body text-white/60 mt-2 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="py-20 md:py-24 px-5 sm:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          Begin Your Journey with Philomathy
        </h2>
        <p className="font-body text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
          Your first assessment is complimentary. No commitment — just a conversation about your goals.
        </p>
        <Link to="/booking">
          <Button className="bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full px-10 h-11 text-sm shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all duration-300">
            Book Free Assessment
          </Button>
        </Link>
      </div>
    </div>
  );
}