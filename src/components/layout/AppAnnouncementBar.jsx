import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X } from "lucide-react";

const STORAGE_KEY = "philomathy-app-banner";
const APP_URL = "https://app.philomathy.ca";

// sessionStorage throws in some privacy modes — a banner must never break the page
export function isAppBannerDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "dismissed";
  } catch {
    return false;
  }
}

export default function AppAnnouncementBar({ open, onDismiss }) {
  const handleClose = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // ignore — dismissal just won't persist
    }
    onDismiss();
  };

  return (
    // initial={false} — no entry animation on load, only the collapse on dismiss
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 48 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          // z-50 matches the navbar; Radix dialogs are also z-50 but portal later
          // in the DOM, so they still paint above this
          className="fixed top-0 inset-x-0 z-50 overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#E8C55A] to-[#D4AF37] shadow-md shadow-black/20"
          role="region"
          aria-label="Announcement"
        >
          <div className="relative flex items-center justify-center h-12 px-12">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[#071A2E]"
            >
              <Sparkles className="w-[18px] h-[18px] shrink-0" />
              <span className="font-body font-semibold tracking-wide text-[0.85rem] sm:text-[0.95rem]">
                <span className="hidden sm:inline">Our new app is live — </span>
                <span className="sm:hidden">New app · </span>
                <span className="underline underline-offset-2 decoration-[#071A2E]/40 group-hover:decoration-[#071A2E] transition-colors">
                  app.philomathy.ca
                </span>
              </span>
              <ArrowRight className="w-[18px] h-[18px] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              onClick={handleClose}
              aria-label="Dismiss announcement"
              className="absolute right-2 sm:right-4 p-1.5 rounded-full text-[#071A2E]/70 hover:text-[#071A2E] hover:bg-[#071A2E]/10 transition-colors"
            >
              <X className="w-[18px] h-[18px]" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
