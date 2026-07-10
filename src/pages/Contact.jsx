import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";

const contactInfo = [
{ icon: Phone, label: "Phone", value: "(778) 926-1382" },
{ icon: Mail, label: "Email", value: "info@philomathy.ca" },
{ icon: MapPin, label: "Location", value: "Vancouver, BC, Canada" },
{ icon: Clock, label: "Hours", value: "Every Day\xA0 8AM - 10PM\xA0" }];


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await base44.entities.ContactSubmission.create({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setSubmitted(true);
      toast.success("Message sent — we'll reply within one business day.");
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-body font-semibold mb-4">
            Get in Touch
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Have questions? We'd love to hear from you. Reach out and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, i) =>
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
              
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">{item.label}</p>
                  <p className="font-body text-sm font-medium text-foreground mt-0.5">{item.value}</p>
                </div>
              </motion.div>
            )}

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden border border-border h-48">
              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83327.75!2d-123.18!3d49.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673f143a94fb3%3A0xbb9196ea9b81f38b!2sVancouver%2C+BC!5e0!3m2!1sen!2sca!4v1600000000000"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy" />
              
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3">
            
            {submitted ?
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground font-body">
                  Message sent — we'll reply within one business day.
                </p>
              </div> :

            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="font-body text-sm">Name</Label>
                    <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-1.5"
                    required />
                  
                  </div>
                  <div>
                    <Label className="font-body text-sm">Email</Label>
                    <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className="mt-1.5"
                    required />
                  
                  </div>
                </div>
                <div>
                  <Label className="font-body text-sm">Subject</Label>
                  <Input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="mt-1.5"
                  required />
                
                </div>
                <div>
                  <Label className="font-body text-sm">Message</Label>
                  <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us more..."
                  className="mt-1.5"
                  rows={5}
                  required />
                
                </div>
                <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#D4AF37] text-[#071A2E] hover:bg-[#c9a030] font-body font-semibold rounded-full py-5 group">
                
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            }
          </motion.div>
        </div>
      </div>
    </div>);

}