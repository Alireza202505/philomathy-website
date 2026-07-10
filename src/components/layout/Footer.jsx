import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import AcademicBackground from "@/components/shared/AcademicBackground";

const LOGO_URL = "https://media.base44.com/images/public/user_69b81abd9f61734e7a6c0288/554ba424c_watermarked_img_12781243251778528366.jpg";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Programs", path: "/programs" },
  { label: "Subjects", path: "/subjects" },
  { label: "About", path: "/about" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Resources", path: "/resources" },
  { label: "Pricing", path: "/pricing" },
  { label: "Calculator", path: "/calculator" },
  { label: "Book Assessment", path: "/booking" },
  { label: "Admin Dashboard", path: "/admin" },
];

const subjects = ["Mathematics", "Physics", "Chemistry", "French", "English", "University Prep"];

export default function Footer() {
  return (
    <footer className="bg-[#071A2E] text-white/75 relative overflow-hidden" role="contentinfo">
      <AcademicBackground variant="dark" density={9} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <motion.img
                src={LOGO_URL}
                alt="Philomathy Learning Center"
                className="h-10 w-10 rounded-lg object-cover"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(212,175,55,0)",
                    "0 0 16px rgba(212,175,55,0.35)",
                    "0 0 0px rgba(212,175,55,0)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="leading-none">
                <span className="font-heading text-lg font-bold text-white block">Philomathy</span>
                <span className="text-[0.6rem] text-[#D4AF37] tracking-[0.22em] uppercase font-body font-semibold block mt-0.5">
                  Learning Center
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Excellence in Mathematics Education. Results for a Lifetime.
            </p>
            <p className="text-xs text-white/35 mt-4 font-body">
              Led by Alireza Khatoonabadi, PhD
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-white font-semibold text-sm mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/55 hover:text-[#D4AF37] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-heading text-white font-semibold text-sm mb-5 uppercase tracking-wider">Subjects</h4>
            <ul className="space-y-2.5">
              {subjects.map((s) => (
                <li key={s}>
                  <Link
                    to="/subjects"
                    className="text-sm text-white/55 hover:text-[#D4AF37] transition-colors duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-white font-semibold text-sm mb-5 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+17789261382"
                  className="flex items-start gap-3 text-sm text-white/55 hover:text-[#D4AF37] transition-colors duration-200 group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                  (778) 926-1382
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@philomathy.ca"
                  className="flex items-start gap-3 text-sm text-white/55 hover:text-[#D4AF37] transition-colors duration-200 group"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                  info@philomathy.ca
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/55">
                <MapPin className="w-4 h-4 mt-0.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                Vancouver, BC, Canada
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35 font-body">
            © {new Date().getFullYear()} Philomathy Learning Center. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-xs text-white/35 hover:text-[#D4AF37] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-xs text-white/35 hover:text-[#D4AF37] transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}