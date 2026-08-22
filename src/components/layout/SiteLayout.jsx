import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AppAnnouncementBar, { isAppBannerDismissed } from "./AppAnnouncementBar";
import PageTransition from "@/components/shared/PageTransition";
import MobileStickyCTA from "@/components/shared/MobileStickyCTA";

export default function SiteLayout() {
  const location = useLocation();
  // read once before paint so a dismissed banner never flashes
  const [bannerOpen, setBannerOpen] = useState(() => !isAppBannerDismissed());

  return (
    <div className="min-h-screen bg-background">
      <AppAnnouncementBar open={bannerOpen} onDismiss={() => setBannerOpen(false)} />
      <Navbar bannerOpen={bannerOpen} />
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
