"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`navbar navbar-expand-lg fixed-top z-50 transition-all duration-500 ${
      isScrolled ? "navbar-blur py-2 shadow-lg" : "py-4 bg-transparent"
    }`}>
      <div className="container-fluid px-4 px-md-6">
        <Link href="/" className="navbar-brand d-flex align-items-center group h-14 overflow-hidden">
          <motion.img 
            src="/entercom_logo_cleaned_original.png" 
            alt="Entercom Logo" 
            className="h-100 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        <button 
          className="navbar-toggler d-lg-none border-0 p-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg"
          type="button" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-teal-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </motion.div>
        </button>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2 gap-lg-4">
            {navLinks.map((link) => (
              <motion.li className="nav-item" key={link.name} whileHover={{ scale: 1.05 }}>
                <Link
                  href={link.href}
                  className={`nav-link text-fluid-sm font-semibold transition-all duration-300 position-relative group px-3 py-2 rounded-xl ${
                    pathname === link.href 
                      ? "text-teal-600 bg-teal-50" 
                      : "text-slate-600 hover:text-teal-600 hover:bg-teal-50/50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <span className={`position-absolute bottom-0 start-1/2 translate-middle-x h-0.5 bg-gradient-to-r from-teal-600 to-emerald-600 transition-all duration-300 ${
                    pathname === link.href ? "w-8" : "w-0 group-hover:w-8"
                  }`} />
                </Link>
              </motion.li>
            ))}
            <motion.li className="nav-item ms-lg-3" whileHover={{ scale: 1.05 }}>
              <Link
                href="/contact"
                className="btn-premium d-none d-lg-inline-block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Project
              </Link>
            </motion.li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
