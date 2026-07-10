import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Banknote, ArrowRight, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AcademicBackground from "@/components/shared/AcademicBackground";
import { base44 } from "@/api/base44Client";

const TIER_META = {
  "Tier 1": { label: "Tier 1 — Foundational", rate: 67, color: "#0B4F57" },
  "Tier 2": { label: "Tier 2 — Advanced / AP/IB", rate: 78, color: "#D4AF37" },
  "Tier 3": { label: "Tier 3 — University-Level", rate: 90, color: "#071A2E" },
  "Univ Prep": { label: "University Preparation", rate: 95, color: "#3B6E8F" },
};

const TIER_ORDER = ["Tier 1", "Tier 2", "Tier 3", "Univ Prep"];

const FALLBACK_SUBJECTS = [
  { name: "Math Foundation", category: "Mathematics", tier: "Tier 1", pricePerHour: 67, gradeLevel: "Grades 7–9" },
  { name: "Pre-Calculus 10", category: "Mathematics", tier: "Tier 1", pricePerHour: 67, gradeLevel: "Grade 10" },
  { name: "Pre-Calculus 11", category: "Mathematics", tier: "Tier 1", pricePerHour: 67, gradeLevel: "Grade 11" },
  { name: "Pre-Calculus 12", category: "Mathematics", tier: "Tier 1", pricePerHour: 67, gradeLevel: "Grade 12" },
  { name: "IB Math (HL/SL)", category: "Mathematics", tier: "Tier 1", pricePerHour: 67, gradeLevel: "IB Diploma" },
  { name: "Algebra", category: "Mathematics", tier: "Tier 1", pricePerHour: 67, gradeLevel: "Grades 8–12" },
  { name: "Geometry", category: "Mathematics", tier: "Tier 1", pricePerHour: 67, gradeLevel: "Grades 8–12" },
  { name: "Trigonometry", category: "Mathematics", tier: "Tier 1", pricePerHour: 67, gradeLevel: "Grades 10–12" },
  { name: "General Chemistry", category: "Chemistry", tier: "Tier 1", pricePerHour: 67, gradeLevel: "Grades 8–12" },
  { name: "High School Chemistry", category: "Chemistry", tier: "Tier 1", pricePerHour: 67, gradeLevel: "Grades 8–12" },
  { name: "French (all levels)", category: "French", tier: "Tier 1", pricePerHour: 67, gradeLevel: "All Levels" },
  { name: "Calculus", category: "Mathematics", tier: "Tier 2", pricePerHour: 78, gradeLevel: "AP/IB" },
  { name: "Advanced Mathematics", category: "Mathematics", tier: "Tier 2", pricePerHour: 78, gradeLevel: "AP/IB" },
  { name: "Probability", category: "Mathematics", tier: "Tier 2", pricePerHour: 78, gradeLevel: "AP/IB" },
  { name: "Statistics", category: "Mathematics", tier: "Tier 2", pricePerHour: 78, gradeLevel: "AP/IB" },
  { name: "Mechanics", category: "Physics", tier: "Tier 2", pricePerHour: 78, gradeLevel: "Grades 11–12 / AP" },
  { name: "Electricity", category: "Physics", tier: "Tier 2", pricePerHour: 78, gradeLevel: "Grades 11–12 / AP" },
  { name: "Magnetism", category: "Physics", tier: "Tier 2", pricePerHour: 78, gradeLevel: "Grades 11–12 / AP" },
  { name: "Modern Physics", category: "Physics", tier: "Tier 2", pricePerHour: 78, gradeLevel: "Grades 11–12 / AP" },
  { name: "Linear Algebra", category: "Mathematics", tier: "Tier 3", pricePerHour: 90, gradeLevel: "University" },
  { name: "Complex Analysis", category: "Mathematics", tier: "Tier 3", pricePerHour: 90, gradeLevel: "University" },
  { name: "Topology", category: "Mathematics", tier: "Tier 3", pricePerHour: 90, gradeLevel: "University" },
  { name: "Partial Differential Equations", category: "Mathematics", tier: "Tier 3", pricePerHour: 90, gradeLevel: "University" },
  { name: "Differential Equations", category: "Mathematics", tier: "Tier 3", pricePerHour: 90, gradeLevel: "University" },
  { name: "Real Analysis", category: "Mathematics", tier: "Tier 3", pricePerHour: 90, gradeLevel: "University" },
  { name: "Abstract Algebra", category: "Mathematics", tier: "Tier 3", pricePerHour: 90, gradeLevel: "University" },
  { name: "Organic Chemistry", category: "Chemistry", tier: "Tier 3", pricePerHour: 90, gradeLevel: "University" },
  { name: "University Preparation", category: "University Prep", tier: "Univ Prep", pricePerHour: 95, gradeLevel: "University" },
];

const PLANS = [
  { planName: "Pay-As-You-Go", sessionCount: 1, discountPercent: 0, validityDays: 0, bestFor: "Trying a subject, irregular scheduling" },
  { planName: "4-Session Package", sessionCount: 4, discountPercent: 10, validityDays: 60, bestFor: "Steady weekly support" },
  { planName: "8-Session Package", sessionCount: 8, discountPercent: 15, validityDays: 90, bestFor: "Exam-term or full-semester commitment" },
  { planName: "Small Group (2–4 students)", sessionCount: 1, discountPercent: 0, validityDays: 0, bestFor: "Friends/classmates studying the same subject" },
];

const PAYMENT_METHODS = [
  { icon: Banknote, label: "E-Transfer", desc: "Interac e-Transfer (Canada)" },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path fill="#635BFF" d="M13.479 9.883c-.148.953-.87 1.612-1.879 1.612h-.292l.372-2.36h.395c1.016 0 1.5.42 1.404 1.748zM19.864 4.5h-2.74c-.469 0-.871.341-.944.804l-.066.428.248-.157c.604-.385 1.405-.566 2.47-.566l.404.01c1.793.04 2.864.84 3.06 2.27.146 1.065-.26 2.087-.857 2.74.052.122.08.265.08.43 0 .62-.24 1.063-.69 1.45.058.13.087.29.087.48 0 .69-.39 1.17-1.024 1.17h-2.03c-.93 0-1.42-.45-1.31-1.13.07-.44.39-.71.85-.71.27 0 .46.09.55.27.09.18.04.41-.12.62.16.06.4.04.6-.06.32-.16.5-.5.55-.95.05-.43-.06-.78-.32-1.04.49-.4.78-1 .78-1.7 0-.06 0-.12-.01-.18.31-.46.43-1.05.34-1.74-.21-1.5-1.43-2.46-3.18-2.46h-2.49c-.47 0-.87.34-.94.81l-1.07 6.79c-.05.34.21.65.55.65h2.05c1.95 0 3.34-1.16 3.6-3.06.18-1.27-.39-2.13-1.5-2.34z"/>
      </svg>
    ),
    label: "Stripe",
    desc: "Visa, Mastercard, Amex, Apple Pay, Google Pay",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
      </svg>
    ),
    label: "PayPal",
    desc: "PayPal account or guest",
  },
];

const FAQS = [
  {
    q: "What is the cancellation and rescheduling policy?",
    a: "We require at least 24 hours' notice for cancellations or rescheduling. Cancellations with less than 24 hours' notice may be subject to a cancellation fee equivalent to the session cost. Package sessions rescheduled with adequate notice are not forfeited.",
  },
  {
    q: "How long do package sessions remain valid?",
    a: "4-Session Packages are valid for 60 days from the date of purchase. 8-Session Packages are valid for 90 days. This ensures consistent progress within a meaningful academic timeframe.",
  },
  {
    q: "What is the refund policy?",
    a: "Unused sessions in a package are refundable on a pro-rated basis, minus a small administrative fee. Individual Pay-As-You-Go sessions are non-refundable once completed. Refunds are processed within 5–10 business days.",
  },
  {
    q: "Do online and in-person sessions cost the same?",
    a: "No — in-person sessions may cost more than online sessions due to travel time and distance. The additional travel fee depends on your location and will be discussed and agreed upon before booking is confirmed.",
  },
];

function RateTierRow({ tier, subjects, isLast }) {
  const meta = TIER_META[tier];
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-6 ${isLast ? "" : "border-b border-border"}`}>
      <div className="md:col-span-4">
        <h3 className="font-heading text-lg font-bold text-foreground">{meta.label}</h3>
        <p className="font-mono text-2xl font-bold mt-1" style={{ color: meta.color }}>${meta.rate}<span className="text-sm text-muted-foreground font-body font-normal">/hr</span></p>
      </div>
      <div className="md:col-span-8">
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => (
            <Link
              key={s.name}
              to={`/booking?subject=${encodeURIComponent(s.name)}`}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-muted hover:bg-[#D4AF37]/10 border border-border hover:border-[#D4AF37]/30 text-sm font-body text-foreground/80 hover:text-foreground transition-all duration-200"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlanRow({ plan, isLast }) {
  const discountText = plan.discountPercent > 0 ? `${plan.discountPercent}% off` : "—";
  const validityText = plan.validityDays > 0 ? `${plan.validityDays} days` : "—";

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-5 ${isLast ? "" : "border-b border-border"}`}>
      <div className="md:col-span-3">
        <h4 className="font-body font-semibold text-foreground text-sm">{plan.planName}</h4>
      </div>
      <div className="md:col-span-2">
        <span className="md:hidden text-xs text-muted-foreground uppercase tracking-wide mr-2">Sessions:</span>
        <span className="font-mono text-sm text-foreground">{plan.sessionCount}</span>
      </div>
      <div className="md:col-span-2">
        <span className="md:hidden text-xs text-muted-foreground uppercase tracking-wide mr-2">Discount:</span>
        <span className="font-body text-sm text-foreground">{discountText}</span>
      </div>
      <div className="md:col-span-2">
        <span className="md:hidden text-xs text-muted-foreground uppercase tracking-wide mr-2">Validity:</span>
        <span className="font-body text-sm text-foreground">{validityText}</span>
      </div>
      <div className="md:col-span-3">
        <span className="md:hidden text-xs text-muted-foreground uppercase tracking-wide mr-2">Best for:</span>
        <span className="font-body text-sm text-muted-foreground">{plan.bestFor}</span>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [subjects, setSubjects] = useState(FALLBACK_SUBJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Subject.list("sortOrder", 100)
      .then((data) => { if (data && data.length > 0) setSubjects(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const subjectsByTier = TIER_ORDER.map((tier) => ({
    tier,
    subjects: subjects.filter((s) => s.tier === tier),
  })).filter((g) => g.subjects.length > 0);

  return (
    <div className="bg-background">
      {/* Hero */}
      <div className="relative bg-[#071A2E] pt-32 md:pt-40 pb-20 md:pb-28 px-5 sm:px-8 overflow-hidden">
        <AcademicBackground variant="dark" density={12} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-5">
            Transparent Pricing
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-[1.05]">
            Pricing &amp; Plans
          </h1>
          <p className="text-white/55 font-body max-w-lg mx-auto text-base sm:text-lg leading-relaxed">
            Rates are structured by subject difficulty — not by marketing tiers. Every figure is in CAD.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 md:py-24">
        {/* Free Assessment callout */}
        <div className="bg-[#D4AF37]/8 border border-[#D4AF37]/25 rounded-2xl px-6 py-5 mb-14 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Free Assessment — $0</h3>
            <p className="text-sm text-muted-foreground font-body mt-0.5">Every journey starts here. No plan required, no commitment.</p>
          </div>
          <Link to="/booking">
            <Button className="bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full px-6 h-10">
              Book Free Assessment
            </Button>
          </Link>
        </div>

        {/* Rate Tiers */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Rate Tiers</h2>
          <p className="text-sm text-muted-foreground font-body mb-8">Rates are determined by subject difficulty. Click any subject to start booking.</p>

          {loading ? (
            <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
              <span className="font-body text-sm">Loading rates…</span>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl px-6 md:px-8">
              {/* Desktop header */}
              <div className="hidden md:grid grid-cols-12 gap-6 py-4 border-b border-border">
                <div className="col-span-4 text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground">Tier</div>
                <div className="col-span-8 text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground">Subjects Included</div>
              </div>
              {subjectsByTier.map((group, i) => (
                <RateTierRow
                  key={group.tier}
                  tier={group.tier}
                  subjects={group.subjects}
                  isLast={i === subjectsByTier.length - 1}
                />
              ))}
            </div>
          )}
        </section>

        {/* Session Plans */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Session Plans</h2>
          <p className="text-sm text-muted-foreground font-body mb-8">Plans apply on top of any tier rate. The total (tier rate × plan, with discount) is shown at checkout before you confirm.</p>

          <div className="bg-card border border-border rounded-2xl px-6 md:px-8">
            {/* Desktop header */}
            <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-b border-border">
              <div className="col-span-3 text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground">Plan</div>
              <div className="col-span-2 text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground">Sessions</div>
              <div className="col-span-2 text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground">Discount</div>
              <div className="col-span-2 text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground">Validity</div>
              <div className="col-span-3 text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground">Best For</div>
            </div>
            {PLANS.map((plan, i) => (
              <PlanRow key={plan.planName} plan={plan} isLast={i === PLANS.length - 1} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="bg-card border border-border rounded-2xl px-6">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className={i === FAQS.length - 1 ? "border-0" : ""}>
                <AccordionTrigger className="font-body text-sm font-semibold text-foreground text-left hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Payment Methods */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-3">
              Accepted Payments
            </p>
            <h2 className="font-heading text-xl font-bold text-foreground">Flexible Payment Options</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {PAYMENT_METHODS.map((pm) => {
              const Icon = pm.icon;
              return (
                <div
                  key={pm.label}
                  className="flex items-center gap-3 bg-card border border-border rounded-2xl px-6 py-4 min-w-[170px]"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Icon />
                  </div>
                  <div className="text-left">
                    <p className="font-body font-semibold text-foreground text-sm">{pm.label}</p>
                    <p className="font-body text-xs text-muted-foreground">{pm.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground font-body">
            <Shield className="w-3.5 h-3.5" />
            All card payments processed through secure, tokenized fields — your card data never touches our servers.
          </div>
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#071A2E] rounded-3xl p-10 md:p-14 text-center"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to begin?
          </h3>
          <p className="font-body text-white/55 mb-7 max-w-lg mx-auto leading-relaxed">
            Book your free assessment today. We'll evaluate your level and build a personalized plan.
          </p>
          <Link to="/booking">
            <Button className="bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full px-10 h-11 shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all duration-300 group">
              Book Your Free Assessment
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}