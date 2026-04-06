"use client";

import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";

export const Button = ({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}: { 
  children: React.ReactNode; 
  variant?: "primary" | "secondary"; 
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-300";
  const variants = {
    primary: "bg-teal-600 text-white shadow-[0_4px_14px_0_rgba(20,184,166,0.39)] hover:bg-teal-700 active:scale-[0.98]",
    secondary: "bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
    className={`bg-white p-8 rounded-2xl border border-slate-200 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

export const Section = ({ id, children, className = "", title, subtitle }: { id?: string; children: React.ReactNode; className?: string; title?: string; subtitle?: string }) => (
  <section id={id} className={`py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {(title || subtitle) && (
      <div className="max-w-3xl mb-16">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>}
        {subtitle && <p className="text-lg text-slate-600 leading-relaxed">{subtitle}</p>}
      </div>
    )}
    {children}
  </section>
);
