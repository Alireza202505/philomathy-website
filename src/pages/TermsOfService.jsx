import React from "react";
import { FileText } from "lucide-react";
import AcademicBackground from "@/components/shared/AcademicBackground";

export default function TermsOfService() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      body: "By accessing and using the Philomathy Learning Center website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of our website and services."
    },
    {
      title: "2. Services",
      body: "Philomathy Learning Center provides personalized tutoring in mathematics, physics, chemistry, French, English, and university preparation. Services are offered both online and in-person. Specific session details, scheduling, and pricing are agreed upon at the time of booking."
    },
    {
      title: "3. Bookings and Cancellations",
      body: "Session bookings are confirmed via email. We require at least 24 hours' notice for cancellations or rescheduling. Cancellations with less than 24 hours' notice may be subject to a cancellation fee equivalent to the session cost."
    },
    {
      title: "4. Payment",
      body: "Fees for tutoring services are due as agreed at the time of booking. We accept PayPal, credit card, and e-transfer payments. All credit card transactions are processed through secure, tokenized payment fields."
    },
    {
      title: "5. Intellectual Property",
      body: "All content on this website, including text, graphics, logos, and educational materials, is the property of Philomathy Learning Center and may not be reproduced or distributed without written permission."
    },
    {
      title: "6. Limitation of Liability",
      body: "Philomathy Learning Center is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the tutoring session in question."
    },
    {
      title: "7. Code of Conduct",
      body: "Students and parents are expected to maintain a respectful and cooperative environment. Disruptive behavior may result in termination of services without refund."
    },
    {
      title: "8. Changes to Terms",
      body: "We reserve the right to update these Terms of Service at any time. Continued use of our services after changes constitutes acceptance of the revised terms."
    },
    {
      title: "9. Contact",
      body: "For questions regarding these Terms of Service, please contact us at philomathy.info@gmail.com or (778) 926-1382."
    },
  ];

  return (
    <div className="bg-background">
      <div className="relative bg-[#071A2E] pt-36 pb-20 px-6 overflow-hidden">
        <AcademicBackground variant="dark" density={10} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <FileText className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-body font-semibold mb-4">Legal</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
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
