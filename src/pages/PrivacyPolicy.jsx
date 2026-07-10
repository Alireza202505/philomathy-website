import React from "react";
import { Shield } from "lucide-react";
import AcademicBackground from "@/components/shared/AcademicBackground";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Introduction",
      body: "Philomathy Learning Center (\"we,\" \"us,\" or \"our\") is committed to protecting the privacy of students, parents, and visitors to our website. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website or services."
    },
    {
      title: "2. Information We Collect",
      body: "We collect information you provide directly to us, including your name, email address, phone number, and any details you share in booking requests or contact form submissions. We also collect limited technical data (such as browser type and pages visited) to improve site performance."
    },
    {
      title: "3. How We Use Your Information",
      body: "Your information is used to respond to inquiries, schedule and manage tutoring sessions, send booking confirmations and reminders, and improve our educational services. We do not sell, rent, or share your personal information with third parties for marketing purposes."
    },
    {
      title: "4. Data Security",
      body: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or disclosure. Payment information is processed through secure, tokenized payment provider fields — card data never touches our servers or database."
    },
    {
      title: "5. Cookies",
      body: "Our website may use essential cookies to ensure proper functionality. We do not use tracking cookies for advertising purposes. You can control cookies through your browser settings."
    },
    {
      title: "6. Third-Party Services",
      body: "We use trusted third-party services for scheduling (Google Calendar), payment processing, and email delivery. These providers have their own privacy policies governing the use of data processed on their platforms."
    },
    {
      title: "7. Your Rights",
      body: "You may request access to, correction of, or deletion of your personal information at any time. To exercise these rights, contact us at info@philomathy.ca."
    },
    {
      title: "8. Changes to This Policy",
      body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date."
    },
    {
      title: "9. Contact Us",
      body: "If you have questions about this Privacy Policy, please contact us at info@philomathy.ca or (778) 926-1382."
    },
  ];

  return (
    <div className="bg-background">
      <div className="relative bg-[#071A2E] pt-36 pb-20 px-6 overflow-hidden">
        <AcademicBackground variant="dark" density={10} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <Shield className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-body font-semibold mb-4">Legal</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/50 font-body">Last updated: June 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">{section.title}</h2>
              <p className="font-body text-foreground/70 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}