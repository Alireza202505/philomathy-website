import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, PenTool, LineChart, Atom, DollarSign, BarChart3, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "https://media.base44.com/images/public/user_69b81abd9f61734e7a6c0288/554ba424c_watermarked_img_12781243251778528366.jpg";

const CALCULATOR_TOOLS = [
  { label: "Euclid", path: "/calculator/euclid", icon: PenTool, desc: "Solve math & physics problems by drawing." },
  { label: "Philomathy", path: "/calculator/philomathy", icon: LineChart, desc: "Graph functions and explore math visually." },
  { label: "Periodic Table", path: "/calculator/periodic-table", icon: Atom, desc: "Interactive table of elements with full details." },
  { label: "Financial Calculator", path: "/calculator/financial", icon: DollarSign, desc: "TVM, loans, compound interest, NPV/IRR." },
  { label: "Statistical Calculator", path: "/calculator/statistical", icon: BarChart3, desc: "1-var stats, regression, and distributions." },
  { label: "3D Graphing", path: "/calculator/3d", icon: Box, desc: "Visualize surfaces, curves, and solids in 3D." },
];

const navLinksBefore = [
{ label: "Subjects", path: "/subjects" },
{ label: "Pricing", path: "/pricing" },
{ label: "About", path: "/about" },
{ label: "Testimonials", path: "/testimonials" }];
const navLinksAfter = [
{ label: "Contact", path: "/contact" }];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const isCalcActive = location.pathname.startsWith("/calculator");

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ?
      "bg-[#071A2E]/96 backdrop-blur-xl shadow-xl shadow-black/25 py-3" :
      "bg-transparent py-5"}`
      }>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Philomathy Learning Center — Home">
          <img src="https://media.base44.com/images/public/6a331feb505e847f52c30cf2/e1e7f1a88_finallogo.jpg"

          alt="Philomathy logo"
          className="h-9 w-9 rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-[#D4AF37]/40 transition-all duration-300" />
          
          <div className="hidden sm:block leading-none">
            <span className="font-bold text-[1.35rem] tracking-tight block text-[hsl(var(--sidebar-ring))] [font-family:'Libre_Baskerville',_serif]">Philomathy

            </span>
            <span className="text-[#D4AF37] tracking-[0.22em] uppercase font-body font-semibold block -mt-0.5 text-sm">LEARNING CENTER

            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7" role="list">

          {navLinksBefore.map((link) =>
          <Link
          key={link.path}
          to={link.path}
          role="listitem"
          className={`text-[0.82rem] font-body font-medium tracking-wide transition-colors duration-200 relative group text-[hsl(var(--sidebar-ring))] ${
          location.pathname === link.path ?
          "text-[#D4AF37]" :
          "hover:text-white"}`
          }>
              {link.label}
              <span
              className={`absolute -bottom-0.5 left-0 right-0 h-px bg-[#D4AF37] transition-transform duration-300 origin-left ${
              location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`
              } />
            </Link>
          )}

          {/* Calculator mega-menu */}
          <div
            className="relative"
            onMouseEnter={() => setCalcDropdownOpen(true)}
            onMouseLeave={() => setCalcDropdownOpen(false)}
          >
            <button
              className={`text-[0.82rem] font-body font-medium tracking-wide transition-colors duration-200 relative flex items-center gap-1 ${
                isCalcActive ? "text-[#D4AF37]" : "text-[hsl(var(--sidebar-ring))] hover:text-white"
              }`}
              aria-expanded={calcDropdownOpen}
            >
              Calculator
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${calcDropdownOpen ? "rotate-180" : ""}`} />
              <span
                className={`absolute -bottom-0.5 left-0 right-0 h-px bg-[#D4AF37] transition-transform duration-300 origin-left ${
                  isCalcActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </button>

            <AnimatePresence>
              {calcDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-2 w-[400px] max-h-[90vh] overflow-y-auto bg-[#071A2E]/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50"
                >
                  <div className="p-3">
                    {CALCULATOR_TOOLS.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200 group/item"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover/item:bg-[#D4AF37]/20 transition-colors">
                            <Icon className="w-5 h-5 text-[#D4AF37]" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-body font-semibold text-sm text-white group-hover/item:text-[#D4AF37] transition-colors">
                              {tool.label}
                            </p>
                            <p className="font-body text-xs text-white/50 leading-relaxed mt-0.5">
                              {tool.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinksAfter.map((link) =>
          <Link
          key={link.path}
          to={link.path}
          role="listitem"
          className={`text-[0.82rem] font-body font-medium tracking-wide transition-colors duration-200 relative group text-[hsl(var(--sidebar-ring))] ${
          location.pathname === link.path ?
          "text-[#D4AF37]" :
          "hover:text-white"}`
          }>
              {link.label}
              <span
              className={`absolute -bottom-0.5 left-0 right-0 h-px bg-[#D4AF37] transition-transform duration-300 origin-left ${
              location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`
              } />
            </Link>
          )}
          <Link to="/booking">
            <Button className="bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold text-[0.82rem] px-5 h-9 rounded-full shadow-md shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all duration-300">
              Book Free Assessment
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}>
          
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden bg-[#071A2E] border-t border-white/8">
          
            <nav aria-label="Mobile navigation" className="px-5 py-6 space-y-1">
              {/* Calculator section */}
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#D4AF37] font-body font-semibold px-3 pt-2 pb-1">
                Calculator
              </p>
              {CALCULATOR_TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-[0.95rem] font-body font-medium transition-all duration-200 ${
                    location.pathname === tool.path ?
                    "text-[#D4AF37] bg-[#D4AF37]/8" :
                    "text-white/80 hover:text-white hover:bg-white/5"}`
                    }>
                    <Icon className="w-4 h-4 shrink-0" />
                    {tool.label}
                  </Link>
                );
              })}

              <div className="border-t border-white/8 my-3" />

              {[...navLinksBefore, ...navLinksAfter].map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center py-2.5 px-3 rounded-lg text-[0.95rem] font-body font-medium transition-all duration-200 ${
              location.pathname === link.path ?
              "text-[#D4AF37] bg-[#D4AF37]/8" :
              "text-white/80 hover:text-white hover:bg-white/5"}`
              }>

                  {link.label}
                </Link>
            )}
              <div className="pt-4">
                <Link to="/booking" className="block">
                  <Button className="w-full bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full h-11 text-[0.95rem]">
                    Book Free Assessment
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}