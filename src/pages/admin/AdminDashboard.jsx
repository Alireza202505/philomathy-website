import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, LogIn, LayoutDashboard, CreditCard, Ticket, BookOpen, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import RevenueOverview from "@/components/admin/RevenueOverview";
import PaymentsTable from "@/components/admin/PaymentsTable";
import CouponsManager from "@/components/admin/CouponsManager";
import ServicesList from "@/components/admin/ServicesList";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "coupons", label: "Coupons", icon: Ticket },
  { id: "services", label: "Services", icon: BookOpen },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [needLogin, setNeedLogin] = useState(false);
  const [data, setData] = useState({ enrollments: [], services: [], coupons: [] });
  const [tab, setTab] = useState("overview");

  const load = async () => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke("getAdminData", {});
      const d = res.data;
      if (d && d.enrollments) {
        setData({ enrollments: d.enrollments, services: d.services || [], coupons: d.coupons || [] });
        setForbidden(false);
        setNeedLogin(false);
      } else if (d && d.error) {
        setNeedLogin(true);
      }
    } catch (err) {
      const status = err?.response?.status;
      if (status === 403) {
        setForbidden(true);
      } else {
        setNeedLogin(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="pt-28 pb-24 min-h-screen flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (needLogin) {
    return (
      <div className="pt-28 pb-24 min-h-screen flex items-center justify-center px-5">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <LogIn className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-3">Admin Access Required</h1>
          <p className="text-muted-foreground font-body mb-6">Please sign in with an administrator account to view the dashboard.</p>
          <Button onClick={() => base44.auth.redirectToLogin("/admin")} className="bg-[#071A2E] text-white hover:bg-[#0d2a47] font-body font-semibold rounded-full px-8 h-11">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="pt-28 pb-24 min-h-screen flex items-center justify-center px-5">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-3">Access Denied</h1>
          <p className="text-muted-foreground font-body">Your account does not have administrator permissions for this dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between flex-wrap gap-4 mb-8"
        >
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-2">
              Philomathy Admin
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Payments &amp; Enrollment</h1>
          </div>
          <Button variant="outline" onClick={load} className="font-body rounded-full h-9">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 -mb-px border-b-2 font-body text-sm font-medium transition-colors ${
                  active
                    ? "border-[#D4AF37] text-[#071A2E]"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {tab === "overview" && <RevenueOverview enrollments={data.enrollments} />}
          {tab === "payments" && <PaymentsTable enrollments={data.enrollments} />}
          {tab === "coupons" && <CouponsManager coupons={data.coupons} onCreated={load} />}
          {tab === "services" && <ServicesList services={data.services} />}
        </motion.div>
      </div>
    </div>
  );
}