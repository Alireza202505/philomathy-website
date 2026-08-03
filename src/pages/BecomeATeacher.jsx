import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  GraduationCap,
  Upload,
  FileText,
  X,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const MAX_FILE_MB = 8;
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function BecomeATeacher() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subjects: "",
    experience: "",
    education: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const validateAndSetFile = (file) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Please upload a PDF or Word document.");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`File is too large. Max size is ${MAX_FILE_MB}MB.`);
      return;
    }
    setResumeFile(file);
  };

  const handleFileInput = (e) => {
    validateAndSetFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error("Please attach your resume before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      const base64 = await fileToBase64(resumeFile);
      const response = await fetch("/api/notify-teacher-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          resume: {
            filename: resumeFile.name,
            contentType: resumeFile.type,
            data: base64,
          },
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      setSubmitted(true);
      toast.success("Application submitted — we'll be in touch soon.");
    } catch (err) {
      console.error("Failed to submit teacher application:", err);
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
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
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Application Received!
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Thank you, <strong>{form.name}</strong>. We've received your application and resume.
            Our team will review it and reach out to <strong>{form.email}</strong> if there's a fit.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-background">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-[#D4AF37]" aria-hidden="true" />
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-4">
            Join Our Team
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Become a Teacher
          </h1>
          <p className="text-muted-foreground font-body max-w-md mx-auto leading-relaxed text-sm sm:text-base">
            Passionate about teaching? Tell us about yourself and share your resume —
            we'd love to hear from you.
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          noValidate
          className="bg-card border border-border rounded-2xl p-7 sm:p-9 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name" className="font-body text-sm">
                Full Name <span aria-hidden="true" className="text-red-400">*</span>
              </Label>
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
              <Label htmlFor="email" className="font-body text-sm">
                Email Address <span aria-hidden="true" className="text-red-400">*</span>
              </Label>
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
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="phone" className="font-body text-sm">
                Phone Number <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
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
            <div>
              <Label htmlFor="experience" className="font-body text-sm">
                Years of Experience
              </Label>
              <Input
                id="experience"
                value={form.experience}
                onChange={(e) => update("experience", e.target.value)}
                placeholder="e.g. 5 years"
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="subjects" className="font-body text-sm">
              Subjects You Can Teach <span aria-hidden="true" className="text-red-400">*</span>
            </Label>
            <Input
              id="subjects"
              value={form.subjects}
              onChange={(e) => update("subjects", e.target.value)}
              placeholder="e.g. Calculus, Physics, French"
              className="mt-1.5"
              required
            />
          </div>

          <div>
            <Label htmlFor="education" className="font-body text-sm">
              Education / Qualifications
            </Label>
            <Input
              id="education"
              value={form.education}
              onChange={(e) => update("education", e.target.value)}
              placeholder="e.g. MSc Mathematics, UBC"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="message" className="font-body text-sm">
              Tell Us About Yourself
            </Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Your teaching philosophy, experience, and why you'd like to join Philomathy..."
              className="mt-1.5"
              rows={5}
            />
          </div>

          {/* Resume upload */}
          <div>
            <Label className="font-body text-sm">
              Resume <span aria-hidden="true" className="text-red-400">*</span>
            </Label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              className="hidden"
            />
            {!resumeFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                }}
                className={`mt-1.5 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                  dragActive
                    ? "border-[#D4AF37] bg-[#D4AF37]/5"
                    : "border-border hover:border-[#D4AF37]/50 hover:bg-muted/50"
                }`}
              >
                <Upload className="w-6 h-6 text-[#D4AF37]" aria-hidden="true" />
                <p className="font-body text-sm text-foreground font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  PDF or Word document, up to {MAX_FILE_MB}MB
                </p>
              </div>
            ) : (
              <div className="mt-1.5 flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/50 p-4">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-5 h-5 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-body text-sm text-foreground font-medium truncate">
                      {resumeFile.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setResumeFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="flex-shrink-0 p-1.5 rounded-full hover:bg-muted transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#D4AF37] text-[#071A2E] hover:bg-[#c9a030] font-body font-semibold rounded-full py-5 group"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                Submit Application
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
