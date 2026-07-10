import React from "react";
import { Link } from "react-router-dom";
import { CalendarPlus } from "lucide-react";

export default function MobileStickyCTA() {
  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-[#071A2E] via-[#071A2E]/95 to-transparent"
      aria-hidden="false"
    >
      <Link
        to="/booking"
        className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-[#D4AF37] text-[#071A2E] font-body font-semibold text-sm shadow-lg shadow-[#D4AF37]/30 active:scale-[0.98] transition-transform"
      >
        <CalendarPlus className="w-4 h-4" />
        Book Free Assessment
      </Link>
    </div>
  );
}