import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, User, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import SubjectCalendars from "@/components/booking/SubjectCalendars";
import TravelFeeCalculator from "@/components/booking/TravelFeeCalculator";

const subjects = [
  "Math Foundation", "Pre-Calculus 10", "Pre-Calculus 11", "Pre-Calculus 12",
  "Algebra", "Geometry", "Trigonometry", "Calculus", "Advanced Mathematics",
  "Probability", "Statistics",   "Linear Algebra", "Differential Equations", "Complex Analysis", "Topology", "Partial Differential Equations",
  "Real Analysis", "Abstract Algebra", "Mechanics", "Electricity", "Magnetism",
  "Modern Physics", "General Chemistry", "High School Chemistry", "Organic Chemistry",
  "French (all levels)", "General English", "Academic Writing", "Reading Comprehension",
  "IB Math (HL/SL)",
  "IELTS Preparation", "CELPIP Preparation", "University Preparation",
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

const STEPS = [
  { label: "Your Info", icon: User },
  { label: "Session", icon: BookOpen },
  { label: "Schedule", icon: Calendar },
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    subject: "", date: "", time: "", mode: "online",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [travelFee, setTravelFee] = useState(0);
  const [searchParams] = useSearchParams();

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  useEffect(() => {
    const subjectParam = searchParams.get("subject");
    if (subjectParam && subjects.includes(subjectParam)) {
      update("subject", subjectParam);
      setStep(2);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await fetch('/api/notify-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        preferredDate: form.date,
        message: `${form.message}\n\nTime: ${form.time}\nMode: ${form.mode}`,
      }),
    });
  } catch (err) {
    console.error('Failed to send booking notification email:', err);
  }

  setSubmitted(true);
  toast.success("Request submitted! We'll confirm your booking shortly.");
};
  };

  if (submitted) {
    return (
      <div className="pt-28 pb-24 bg-background min-h-screen flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="w-20 h-20 mx-auto mb-7 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" aria-hidden="true" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Request Received!</h2>
          <p className="text-muted-foreground font-body mb-2 leading-relaxed">
            Thank you, <strong>{form.name}</strong>. We'll review your request and send a confirmation to{" "}
            <strong>{form.email}</strong>.
          </p>
          <p className="text-sm text-muted-foreground font-body mt-4 bg-muted px-5 py-3 rounded-xl inline-block">
            {form.subject} &middot; {form.date} &middot; {form.time} &middot; {form.mode === "online" ? "Online" : "In-Person"}
          </p>
          {form.mode === "in-person" && travelFee > 0 && (
            <p className="text-sm text-[#071A2E] font-body mt-2 font-medium">
              +${travelFee} estimated travel fee (based on distance &amp; travel time)
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-24 bg-background">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">

        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-center mb-8">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-3">
              Live Schedule
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Sessions by Subject
            </h2>
            <p className="text-muted-foreground font-body text-sm mt-2 max-w-sm mx-auto">
              Select a subject to browse upcoming sessions from our live calendar.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <SubjectCalendars />
          </div>
        </motion.div>

        <hr className="border-border mb-14" />

      </div>
      <div className="max-w-xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-4">
            Get Started
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Book Your Free Assessment
          </h1>
          <p className="text-muted-foreground font-body max-w-md mx-auto leading-relaxed text-sm sm:text-base">
            Schedule a complimentary session to evaluate your current level and discuss a personalized learning plan.
          </p>
        </div>

        {/* Progress stepper */}
        <nav aria-label="Booking progress" className="mb-10">
          <ol className="flex items-center justify-center gap-0">
            {STEPS.map((s, i) => {
              const num = i + 1;
              const isActive = step === num;
              const isDone = step > num;
              return (
                <React.Fragment key={s.label}>
                  <li className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-body font-bold transition-all duration-300 ${
                        isDone
                          ? "bg-[#D4AF37] text-[#071A2E]"
                          : isActive
                          ? "bg-[#071A2E] text-white ring-2 ring-[#D4AF37]/40"
                          : "bg-muted text-muted-foreground"
                      }`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : num}
                    </div>
                    <span className={`text-[0.65rem] font-body font-medium uppercase tracking-wider ${isActive ? "text-[#D4AF37]" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                  </li>
                  {i < STEPS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className={`h-px flex-1 mx-3 mb-4 transition-colors duration-300 ${step > num ? "bg-[#D4AF37]" : "bg-border"}`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </ol>
        </nav>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl p-7 sm:p-9"
          >
            {/* Step 1 — Personal Info */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="flex items-center gap-2.5 mb-7">
                  <User className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
                  <h2 className="font-heading text-xl font-semibold text-foreground">Your Information</h2>
                </div>
                <div>
                  <Label htmlFor="name" className="font-body text-sm">Full Name <span aria-hidden="true" className="text-red-400">*</span></Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your full name"
                    className="mt-1.5"
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-body text-sm">Email Address <span aria-hidden="true" className="text-red-400">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@email.com"
                    className="mt-1.5"
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-body text-sm">Phone Number <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(604) 555-0000"
                    className="mt-1.5"
                    autoComplete="tel"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => { if (form.name && form.email) setStep(2); }}
                  className="w-full bg-[#071A2E] text-white hover:bg-[#0d2a47] font-body font-semibold rounded-full h-11 mt-2 group"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Button>
              </div>
            )}

            {/* Step 2 — Session Details */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="flex items-center gap-2.5 mb-7">
                  <BookOpen className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
                  <h2 className="font-heading text-xl font-semibold text-foreground">Session Details</h2>
                </div>
                <div>
                  <Label htmlFor="subject" className="font-body text-sm">Subject <span aria-hidden="true" className="text-red-400">*</span></Label>
                  <Select value={form.subject} onValueChange={(v) => update("subject", v)}>
                    <SelectTrigger id="subject" className="mt-1.5">
                      <SelectValue placeholder="Choose a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-body text-sm">Session Mode</Label>
                  <RadioGroup value={form.mode} onValueChange={(v) => update("mode", v)} className="flex gap-5 mt-2.5">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="font-body text-sm cursor-pointer">Online</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="in-person" id="in-person" />
                      <Label htmlFor="in-person" className="font-body text-sm cursor-pointer">In-Person</Label>
                    </div>
                  </RadioGroup>
                </div>
                {form.mode === "in-person" && (
                  <div className="bg-[#071A2E]/5 border border-[#071A2E]/10 rounded-xl p-5">
                    <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#D4AF37] font-body font-semibold mb-3">
                      Travel Fee Calculator
                    </p>
                    <TravelFeeCalculator onResult={(data) => setTravelFee(data.travelFee || 0)} />
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 font-body rounded-full h-11">
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => { if (form.subject) setStep(3); }}
                    className="flex-1 bg-[#071A2E] text-white hover:bg-[#0d2a47] font-body font-semibold rounded-full h-11 group"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3 — Schedule */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="flex items-center gap-2.5 mb-7">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
                  <h2 className="font-heading text-xl font-semibold text-foreground">Preferred Schedule</h2>
                </div>
                <div>
                  <Label htmlFor="date" className="font-body text-sm">Preferred Date <span aria-hidden="true" className="text-red-400">*</span></Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="mt-1.5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="font-body text-sm">Preferred Time</Label>
                  <Select value={form.time} onValueChange={(v) => update("time", v)}>
                    <SelectTrigger id="time" className="mt-1.5">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message" className="font-body text-sm">Additional Notes <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Any specific topics, concerns, or questions..."
                    className="mt-1.5"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 font-body rounded-full h-11">
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full h-11"
                  >
                    Submit Request
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </form>
      </div>
    </div>
  );
}
