import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "@/components/shared/PageTransition";
import MobileStickyCTA from "@/components/shared/MobileStickyCTA";

export default function SiteLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-20 lg:pb-0">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}