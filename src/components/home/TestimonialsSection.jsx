import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quote, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote: "Ali is an amazing math tutor who makes learning fun. His grasp on even the most complicated math is impressive and he can explain hard math in a way that's easy to understand. What's great about Ali is how he uses humor in his lessons, which makes them enjoyable and less stressful. He draws many accurate diagrams and uses neat handwriting to make it easier for a visual learner.",
    name: "Flora",
    role: "Parent",
    context: "High School Mathematics",
    achievement: "Visual Learning",
    subject: "Mathematics",
  },
  {
    quote: "Alireza is a phenomenal tutor who I would highly recommend to anyone studying math. He is both fun to learn from and effective in his craft.",
    name: "Luke",
    role: "Student",
    context: "University Mathematics",
    achievement: "Highly Recommended",
    subject: "Mathematics",
  },
  {
    quote: "Rapidly and accurately identified my starting point based on current and prior experience, oriented toward my goals. All around better than I had anticipated or could have imagined from my first experience with tutoring. Highly recommended.",
    name: "B.",
    role: "Student",
    context: "Personalized Learning",
    achievement: "Exceeded Expectations",
    subject: "Mathematics",
  },
  {
    quote: "We highly recommend Ali's class. Robin is working on Calculus and Linear Algebra with Ali. He is very meticulous and the preparation before class is thorough, with many materials prepared. The explanations during class are very clear and Robin really enjoys it.",
    name: "Jianmei",
    role: "Parent",
    context: "Calculus & Linear Algebra",
    achievement: "Thorough Preparation",
    subject: "Calculus",
  },
  {
    quote: "Alireza is one of the best instructors my son has ever had. He is very knowledgeable and explains the topics in the most efficient way. Currently working on Pre-Calculus 11 & 12 and Physics with my son. Highly recommend.",
    name: "Maryam",
    role: "Parent",
    context: "Pre-Calculus & Physics",
    achievement: "Best Instructor",
    subject: "Pre-Calculus",
  },
  {
    quote: "Honestly, he's an amazing tutor! Super knowledgeable and incredibly professional, but what really stands out is how well he teaches. He breaks everything down so it's easy to understand.",
    name: "Nadia",
    role: "Student",
    context: "Mathematics",
    achievement: "Outstanding Teaching",
    subject: "Mathematics",
  },
  {
    quote: "Alireza is a wonderful teacher! He takes time to solve all questions and is always happy to reexplain any concept until it clicks.",
    name: "Hafssa",
    role: "Student",
    context: "Calculus",
    achievement: "Concept Clarity",
    subject: "Calculus",
  },
  {
    quote: "Excellent professor! Alireza is knowledgeable, passionate and also patient to explain the concepts properly.",
    name: "Moses",
    role: "Student",
    context: "University Mathematics",
    achievement: "Passionate Educator",
    subject: "Mathematics",
  },
  {
    quote: "Goes through problems step by step and offers detailed explanations! Great tutor.",
    name: "Olivia",
    role: "Student",
    context: "High School Math",
    achievement: "Step-by-Step Mastery",
    subject: "Mathematics",
  },
  {
    quote: "Ali is very knowledgeable, flexible and patient. Overall he's a great tutor for my daughter and I highly recommend him.",
    name: "Pauline",
    role: "Parent",
    context: "High School Mathematics",
    achievement: "Highly Recommended",
    subject: "Mathematics",
  },
  {
    quote: "I enjoy my sessions with Alireza and find it very helpful. He is knowledgeable and has a great demeanor; very easy to work with. He replied promptly, requested all relevant information for my specific needs and adapted his teachings to my personal needs.",
    name: "Curtis",
    role: "Student",
    context: "Personalized Instruction",
    achievement: "Adapted to My Needs",
    subject: "Mathematics",
  },
  {
    quote: "Ali is a competent teacher, my son loves his sessions with Ali a lot. Thank you.",
    name: "Nam",
    role: "Parent",
    context: "School Mathematics",
    achievement: "Student Loves It",
    subject: "Mathematics",
  },
];

const miniQuotes = [
  { quote: "Very knowledgeable and patient.", name: "Ren", role: "Student" },
  { quote: "The knowledge and expertise of this tutor was extremely helpful and informative. Strongly recommended.", name: "Brandi", role: "Student" },
  { quote: "He really helped me understand my assignment in the very confusing subject of Analysis.", name: "Justin", role: "Student" },
  { quote: "Very helpful! Great tutor overall.", name: "Zoika", role: "Student" },
  { quote: "Very thorough in the subject of Linear Algebra.", name: "Balaji", role: "Student" },
  { quote: "Our grade 12 son said the trial class was 'very helpful' and he enjoyed it. Thanks Alireza!", name: "Elle", role: "Parent" },
];

const stats = [
  { value: "89", label: "5-Star Reviews", sub: "on Superprof" },
  { value: "25+", label: "Years Experience", sub: "K–12 through university" },
  { value: "522+", label: "Sessions Delivered", sub: "live tutoring" },
  { value: "PhD", label: "Qualified Leadership", sub: "doctorate in Mathematics" },
];

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-label="5 star rating">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  const prev = () => { setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1)); setPaused(true); };
  const next = () => { setCurrent((c) => (c + 1) % testimonials.length); setPaused(true); };

  const t = testimonials[current];

  return (
    <section className="relative bg-[#F8F7F3] py-24 md:py-32 px-5 sm:px-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: "radial-gradient(circle, #071A2E 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent"
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#D4AF37] font-body font-bold mb-5">
            What Students & Families Say
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#071A2E] leading-tight max-w-2xl mx-auto">
            Trusted by Parents.<br />
            <span className="text-[#D4AF37]">Loved by Students.</span>
          </h2>
          <p className="font-body text-gray-500 text-base mt-5 max-w-lg mx-auto leading-relaxed">
            89 verified 5-star reviews from real students and families.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 px-5 py-6 text-center shadow-sm"
            >
              <p className="font-heading text-3xl font-bold text-[#071A2E] leading-none mb-1">{s.value}</p>
              <p className="font-body text-xs font-semibold text-[#071A2E] mt-2 mb-1">{s.label}</p>
              <p className="font-body text-[0.7rem] text-gray-400">{s.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 sm:p-12 relative overflow-hidden"
            >


              <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
                <div>
                  <Quote className="w-8 h-8 text-[#D4AF37]/25 mb-5" aria-hidden="true" />
                  <blockquote className="font-heading text-xl sm:text-2xl text-[#071A2E] italic leading-[1.5] mb-7">
                    "{t.quote}"
                  </blockquote>
                  <footer className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#071A2E] flex items-center justify-center shrink-0">
                      <span className="font-heading font-bold text-[#D4AF37] text-base leading-none">
                        {t.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-body font-semibold text-[#071A2E] text-sm">{t.name}</p>
                      <p className="font-body text-xs text-gray-400 mt-0.5">{t.role} · {t.context}</p>
                      <StarRow />
                    </div>
                  </footer>
                </div>

                <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                  <div className="bg-[#071A2E] rounded-2xl px-6 py-5 text-center min-w-[140px]">
                    <StarRow />
                    <p className="font-body text-xs text-white/50 mt-2">Verified Review</p>
                    <p className="font-body text-xs text-white/40">{t.subject}</p>
                  </div>
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl px-4 py-2.5 text-center min-w-[140px]">
                    <p className="font-body text-xs font-bold text-[#071A2E]">🎓 {t.achievement}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setPaused(true); }}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                    i === current ? "bg-[#D4AF37] w-6 h-2" : "bg-gray-200 hover:bg-[#D4AF37]/40 w-2 h-2"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mini quote grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {miniQuotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
            >
              <StarRow />
              <p className="font-body text-sm text-gray-600 italic leading-relaxed mt-3 mb-4">"{q.quote}"</p>
              <p className="font-body text-xs font-semibold text-[#071A2E]">{q.name}</p>
              <p className="font-body text-xs text-gray-400">{q.role}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link to="/testimonials">
            <Button className="bg-[#071A2E] text-white hover:bg-[#0d2a47] font-body font-semibold px-10 h-11 rounded-full transition-all duration-300 group">
              Read All Success Stories
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}