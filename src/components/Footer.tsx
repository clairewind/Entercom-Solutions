"use client";

import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe2, 
  Github, 
  Twitter, 
  Linkedin, 
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  ChevronUp,
  Heart,
  Sparkles,
  Zap,
  Shield,
  Award,
  Users,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed:", email);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .footer {
          background: linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #0D9488, transparent);
          animation: shimmer 3s ease-in-out infinite;
        }

        .footer-bg-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: 
            radial-gradient(circle at 20% 50%, #0D9488 1px, transparent 1px),
            radial-gradient(circle at 80% 50%, #059669 1px, transparent 1px);
          background-size: 60px 60px;
          animation: float 20s ease-in-out infinite;
        }

        .footer-section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: #0D9488;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0;
        }

        .footer-link:hover {
          color: #0D9488;
          transform: translateX(5px);
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(13, 148, 136, 0.1);
          border: 1px solid rgba(13, 148, 136, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0D9488;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: #0D9488;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(13, 148, 136, 0.3);
        }

        .newsletter-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(13, 148, 136, 0.2);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          width: 100%;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #0D9488;
          background: rgba(255, 255, 255, 0.08);
        }

        .newsletter-input::placeholder {
          color: #64748b;
        }

        .newsletter-button {
          background: linear-gradient(135deg, #0D9488 0%, #059669 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .newsletter-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(13, 148, 136, 0.3);
        }

        .back-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0D9488 0%, #059669 100%);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(13, 148, 136, 0.3);
        }

        .back-to-top:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(13, 148, 136, 0.4);
        }

        .footer-stat {
          text-align: center;
          padding: 1rem;
        }

        .footer-stat-number {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #0D9488;
          display: block;
        }

        .footer-stat-label {
          font-size: 0.875rem;
          color: #64748b;
        }
      `}</style>

      <footer className="footer">
        <div className="footer-bg-pattern" />
        
        {/* Main Footer Content */}
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '4rem 1.5rem 2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="footer-section-title">
                <Sparkles size={20} />
                Company
              </div>
              <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Transforming businesses through innovative technology solutions. We build the future, today.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="social-icon">
                  <Twitter size={18} />
                </div>
                <div className="social-icon">
                  <Linkedin size={18} />
                </div>
                <div className="social-icon">
                  <Github size={18} />
                </div>
                <div className="social-icon">
                  <Instagram size={18} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                <MapPin size={16} />
                Global Tech Hub, Worldwide
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="footer-section-title">
                <Zap size={20} />
                Quick Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link href="/" className="footer-link">
                  Home <ArrowRight size={14} />
                </Link>
                <Link href="/about" className="footer-link">
                  About Us <ArrowRight size={14} />
                </Link>
                <Link href="/services" className="footer-link">
                  Services <ArrowRight size={14} />
                </Link>
                <Link href="/projects" className="footer-link">
                  Projects <ArrowRight size={14} />
                </Link>
                <Link href="/blog" className="footer-link">
                  Blog <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="footer-link">
                  Contact <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="footer-section-title">
                <Shield size={20} />
                Services
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link href="/services" className="footer-link">
                  Cloud Architecture <ArrowRight size={14} />
                </Link>
                <Link href="/services" className="footer-link">
                  AI & ML Engineering <ArrowRight size={14} />
                </Link>
                <Link href="/services" className="footer-link">
                  Cybersecurity <ArrowRight size={14} />
                </Link>
                <Link href="/services" className="footer-link">
                  Data & Analytics <ArrowRight size={14} />
                </Link>
                <Link href="/services" className="footer-link">
                  DevSecOps <ArrowRight size={14} />
                </Link>
                <Link href="/services" className="footer-link">
                  Product Engineering <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="footer-section-title">
                <Mail size={20} />
                Stay Updated
              </div>
              <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  Subscribe <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '2rem',
              padding: '2rem 0',
              borderTop: '1px solid rgba(13, 148, 136, 0.1)',
              borderBottom: '1px solid rgba(13, 148, 136, 0.1)',
              marginBottom: '2rem'
            }}
          >
            <div className="footer-stat">
              <span className="footer-stat-number">350+</span>
              <span className="footer-stat-label">Enterprise Clients</span>
            </div>
            <div className="footer-stat">
              <span className="footer-stat-number">1200+</span>
              <span className="footer-stat-label">Projects Delivered</span>
            </div>
            <div className="footer-stat">
              <span className="footer-stat-number">99.97%</span>
              <span className="footer-stat-label">Platform Uptime</span>
            </div>
            <div className="footer-stat">
              <span className="footer-stat-number">4.9/5</span>
              <span className="footer-stat-label">Client Satisfaction</span>
            </div>
          </motion.div>

          {/* Bottom Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
              © {currentYear} Entercom Solutions. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <Link href="#" className="footer-link" style={{ fontSize: '0.875rem' }}>
                Privacy Policy
              </Link>
              <Link href="#" className="footer-link" style={{ fontSize: '0.875rem' }}>
                Terms of Service
              </Link>
              <Link href="#" className="footer-link" style={{ fontSize: '0.875rem' }}>
                Cookie Policy
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </button>
      </footer>
    </>
  );
};

export default Footer;
