import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AcademicBackground from "@/components/shared/AcademicBackground";
import { Link } from "react-router-dom";

const testimonials = [
  {
    quote: "Ali is an amazing math tutor who makes learning fun. His grasp on even the most complicated math is impressive and he can explain hard math in a way that's easy to understand. What's great about Ali is how he uses humor in his lessons, which makes them enjoyable and less stressful. He draws many accurate diagrams and uses neat handwriting to make it easier for a visual learner.",
    name: "Flora",
    role: "Parent · High School Mathematics",
  },
  {
    quote: "Alireza is a phenomenal tutor who I would highly recommend to anyone studying math. He is both fun to learn from and effective in his craft.",
    name: "Luke",
    role: "Student · University Mathematics",
  },
  {
    quote: "Rapidly and accurately identified my starting point based on current and prior experience, oriented toward my goals. All around better than I had anticipated or could have imagined. Highly recommended.",
    name: "B.",
    role: "Student · Personalized Learning",
  },
  {
    quote: "We highly recommend Ali's class. Robin is working on Calculus and Linear Algebra with Ali. He is very meticulous and the preparation before class is thorough, with many materials prepared. The explanations during class are very clear and Robin really enjoys it.",
    name: "Jianmei",
    role: "Parent · Calculus & Linear Algebra",
  },
  {
    quote: "Alireza is one of the best instructors my son has ever had. He is very knowledgeable and explains the topics in the most efficient way. Currently working on Pre-Calculus 11 & 12 and Physics with my son. Highly recommend.",
    name: "Maryam",
    role: "Parent · Pre-Calculus & Physics",
  },
  {
    quote: "Honestly, he's an amazing tutor! Super knowledgeable and incredibly professional, but what really stands out is how well he teaches. He breaks everything down so it's easy to understand.",
    name: "Nadia",
    role: "Student · Mathematics",
  },
  {
    quote: "Alireza is a wonderful teacher! He takes time to solve all questions and is always happy to reexplain any concept until it clicks.",
    name: "Hafssa",
    role: "Student · Calculus",
  },
  {
    quote: "Excellent professor! Alireza is knowledgeable, passionate and also patient to explain the concepts properly.",
    name: "Moses",
    role: "Student · University Mathematics",
  },
  {
    quote: "Goes through problems step by step and offers detailed explanations! Great tutor.",
    name: "Olivia",
    role: "Student · High School Math",
  },
  {
    quote: "Ali is very knowledgeable, flexible and patient. Overall he's a great tutor for my daughter and I highly recommend him.",
    name: "Pauline",
    role: "Parent · High School Mathematics",
  },
  {
    quote: "I enjoy my sessions with Alireza and find it very helpful. He is knowledgeable and has a great demeanor; very easy to work with. He replied promptly and adapted his teachings to my personal needs.",
    name: "Curtis",
    role: "Student · Personalized Instruction",
  },
  {
    quote: "Ali is a competent teacher, my son loves his sessions with Ali a lot. Thank you.",
    name: "Nam",
    role: "Parent · School Mathematics",
  },
  {
    quote: "Very knowledgeable and patient.",
    name: "Ren",
    role: "Student · Mathematics",
  },
  {
    quote: "The knowledge and expertise of this tutor was extremely helpful and informative. Strongly recommended.",
    name: "Brandi",
    role: "Student · Mathematics",
  },
  {
    quote: "He really helped me to understand my assignment in the very confusing subject of Analysis.",
    name: "Justin",
    role: "Student · Real Analysis",
  },
  {
    quote: "Very helpful!",
    name: "Zoika",
    role: "Student · Mathematics",
  },
  {
    quote: "Very thorough in the subject of Linear Algebra.",
    name: "Balaji",
    role: "Student · Linear Algebra",
  },
  {
    quote: "Our grade 12 son said the trial class with Alireza was 'very helpful' and he enjoyed it. Thanks Alireza!",
    name: "Elle",
    role: "Parent · Grade 12 Mathematics",
  },
];

const results = [
  { subject: "Mathematics", before: 68, after: 94 },
  { subject: "Physics", before: 72, after: 91 },
  { subject: "Calculus", before: 75, after: 96 },
  { subject: "Chemistry", before: 65, after: 88 },
];

const stats = [
  { value: "89", label: "5-Star Reviews" },
  { value: "522+", label: "Sessions Delivered" },
  { value: "25+", label: "Years Experience" },
];

function ResultBar({ subject, before, after, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-[#D4AF37]/25 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-heading text-lg font-bold text-foreground">{subject}</h3>
        <div className="flex items-center gap-1.5 text-[#D4AF37]" aria-label={`Improvement: +${after - before} percent`}>
          <TrendingUp className="w-4 h-4" aria-hidden="true" />
          <span className="font-body font-bold text-sm">+{after - before}%</span>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="font-body text-xs text-muted-foreground">Before</span>
            <span className="font-body text-xs font-semibold text-muted-foreground">{before}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={before} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-red-300/55 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${before}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="font-body text-xs text-muted-foreground">After</span>
            <span className="font-body text-xs font-semibold text-[#D4AF37]">{after}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={after} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-[#D4AF37] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${after}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 + 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <div className="bg-background">

      {/* ── Hero ── */}
      <div className="relative bg-[#071A2E] pt-32 md:pt-40 pb-20 md:pb-28 px-5 sm:px-8 overflow-hidden">
        <AcademicBackground variant="dark" density={12} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-5">
            Success Stories
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-[1.05]">
            Real Students.<br />Real Results.
          </h1>
          <p className="text-white/55 font-body max-w-lg mx-auto text-base sm:text-lg leading-relaxed">
            Measurable academic improvement — in grades, confidence, and understanding.
          </p>
        </motion.div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="bg-[#D4AF37] py-10 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 sm:gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#071A2E] leading-none">{s.value}</p>
              <p className="font-body text-xs sm:text-sm text-[#071A2E]/65 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 md:py-20">

        {/* ── Carousel ── */}
        <div className="text-center mb-10">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">What Our Students Say</h2>
        </div>

        <div className="relative bg-card border border-border rounded-3xl p-8 sm:p-12 mb-20">
          <Quote className="w-9 h-9 text-[#D4AF37]/20 mb-6" aria-hidden="true" />
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <blockquote className="font-heading text-xl md:text-2xl text-foreground leading-relaxed italic mb-8">
              "{testimonials[current].quote}"
            </blockquote>
            <footer>
              <p className="font-body font-semibold text-foreground text-sm">{testimonials[current].name}</p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">{testimonials[current].role}</p>
            </footer>
          </motion.div>

          <div className="flex items-center justify-between mt-10">
            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                    i === current ? "bg-[#D4AF37] w-6" : "bg-border w-2 hover:bg-[#D4AF37]/40"
                  }`}
                />
              ))}
            </div>
            {/* Prev / Next */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                aria-label="Previous testimonial"
                className="rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                aria-label="Next testimonial"
                className="rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* ── Before / After ── */}
        <div className="text-center mb-10">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-3">
            Academic Results
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Before &amp; After Philomathy
          </h2>
          <p className="text-muted-foreground font-body mt-3 max-w-md mx-auto text-sm leading-relaxed">
            Average grade improvements across core subjects within one semester.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
          {results.map((r, i) => (
            <ResultBar key={r.subject} {...r} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="text-center">
          <Link to="/booking">
            <Button className="bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full px-10 h-12 text-base shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all duration-300">
              Start Your Success Story
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}