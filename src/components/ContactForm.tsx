"use client";

import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui";

export const ContactForm = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl"
    >
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-50/50" 
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-50/50" 
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Subject</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-50/50" 
            placeholder="How can we help?"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Message</label>
          <textarea 
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-50/50 resize-none" 
            placeholder="Tell us about your project..."
          ></textarea>
        </div>
        <Button className="w-full gap-2">
          Send Message <Send className="w-4 h-4" />
        </Button>
      </form>
    </motion.div>
  );
};
