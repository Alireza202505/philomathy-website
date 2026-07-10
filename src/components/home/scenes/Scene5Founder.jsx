import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FOUNDER_URL = "https://media.base44.com/images/public/6a331feb505e847f52c30cf2/b2e7715e9_finalpicture.jpg";

export default function Scene5Founder() {
  return (
    <section className="relative bg-[#040E1A] py-28 md:py-32 px-5 sm:px-8 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Portrait — static, framed */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              <img
                src={FOUNDER_URL}
                alt="Alireza Khatoonabadi, PhD — Founder of Philomathy"
                className="relative w-full aspect-[4/5] object-cover rounded-2xl ring-1 ring-white/10 shadow-xl shadow-black/40"
              />
              {/* Credential badge */}
              <div className="absolute -bottom-4 -right-3 sm:right-4 bg-[#D4AF37] text-[#040E1A] px-5 py-3 rounded-xl shadow-lg">
                <p className="font-heading font-bold text-sm leading-none">PhD in Mathematics</p>
                <p className="font-body text-xs mt-0.5 opacity-70">Founder &amp; Lead Instructor</p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75 }}
            >
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#D4AF37]/70 font-body font-bold mb-5">
                Meet the Founder
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Guided by Experience.<br />
                <span className="text-[#D4AF37]">Inspired by Discovery.</span>
              </h2>
              <p className="font-body text-white/45 text-base leading-relaxed mb-10 max-w-md">
                Alireza Khatoonabadi holds a PhD in Mathematics and brings over 25 years of teaching experience — from secondary school through university — to every student he mentors at Philomathy.
              </p>

              <Link to="/about">
                <Button
                  className="bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full px-8 h-11 group"
                >
                  About Alireza
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}