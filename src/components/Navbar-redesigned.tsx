"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Globe2, Mail, Phone, Sparkles, Zap, Shield, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleScroll();
    checkMobile();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Sparkles },
    { name: "Services", href: "/services", icon: Zap, dropdown: ["Web Development", "Cloud Solutions", "AI/ML", "DevOps"] },
    { name: "About", href: "/about", icon: Shield },
    { name: "Projects", href: "/projects", icon: Globe2 },
    { name: "Blog", href: "/blog", icon: Globe2 },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(13, 148, 136, 0.3); }
          50% { box-shadow: 0 0 30px rgba(13, 148, 136, 0.6); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes wave {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-5px) translateY(-3px); }
          50% { transform: translateX(5px) translateY(-2px); }
          75% { transform: translateX(-3px) translateY(2px); }
          100% { transform: translateX(0) translateY(0); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        .navbar {
          position: fixed !important;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideDown 0.5s ease-out;
          position: relative;
          padding: 0;
        }

        .navbar::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(13, 148, 136, 0.03), transparent);
          animation: navbarShimmer 8s ease-in-out infinite;
        }

        .navbar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(13, 148, 136, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(5, 150, 105, 0.03) 0%, transparent 50%);
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes navbarShimmer {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: -100%; }
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(13, 148, 136, 0.1);
          box-shadow: 0 4px 30px rgba(13, 148, 136, 0.1);
        }

        .navbar-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          background: linear-gradient(135deg, #0D9488 0%, #059669 50%, #10b981 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite, float 4s ease-in-out infinite;
          transition: all 0.3s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
        }

        .navbar-brand-logo {
          width: 150px;
          height: 150px;
          object-fit: contain;
          margin-right: 0.75rem;
          transition: all 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(13, 148, 136, 0.2));
        }

        .navbar-brand:hover .navbar-brand-logo {
          transform: scale(1.1) rotate(5deg);
          filter: drop-shadow(0 4px 8px rgba(13, 148, 136, 0.3));
        }

        .navbar-brand::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%);
          animation: pulse 2s ease-in-out infinite;
          z-index: -1;
        }

        .navbar-brand:hover {
          transform: scale(1.05);
          animation-play-state: paused;
        }

        .nav-link {
          position: relative;
          padding: 0.5rem 1rem;
          color: #000000;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(13, 148, 136, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .nav-link:hover::before {
          left: 100%;
        }

        .nav-link:hover {
          color: #0D9488;
          background: rgba(13, 148, 136, 0.05);
          transform: translateY(-2px);
        }

        .nav-link.active {
          color: #0D9488;
          background: rgba(13, 148, 136, 0.1);
        }

        .nav-link-icon {
          display: inline-block;
          margin-right: 0.5rem;
          transition: all 0.3s ease;
        }

        .nav-link:hover .nav-link-icon {
          transform: rotate(360deg) scale(1.2);
        }

        .get-started-btn {
          background: linear-gradient(135deg, #0D9488 0%, #059669 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(13, 148, 136, 0.3);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .get-started-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .get-started-btn:hover::before {
          left: 100%;
        }

        .get-started-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(13, 148, 136, 0.4);
          animation: glow 2s ease-in-out infinite;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 80%;
          max-width: 400px;
          height: 100vh;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
          box-shadow: -4px 0 30px rgba(13, 148, 136, 0.1);
        }

        .mobile-menu.open {
          right: 0;
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 99;
        }

        .mobile-menu-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          color: #000000;
          font-weight: 500;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
          text-decoration: none;
        }

        .mobile-nav-link:hover {
          background: rgba(13, 148, 136, 0.05);
          border-left-color: #0D9488;
          color: #0D9488;
          transform: translateX(5px);
        }

        .mobile-nav-link.active {
          background: rgba(13, 148, 136, 0.1);
          border-left-color: #0D9488;
          color: #0D9488;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(13, 148, 136, 0.15);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 200px;
          z-index: 1000;
          border: 1px solid rgba(13, 148, 136, 0.1);
        }

        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: block;
          padding: 0.75rem 1rem;
          color: #000000;
          font-weight: 500;
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(13, 148, 136, 0.05);
          text-decoration: none;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background: rgba(13, 148, 136, 0.05);
          color: #0D9488;
          transform: translateX(5px);
        }

        .hamburger-line {
          width: 24px;
          height: 2px;
          background: #000000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hamburger-line:nth-child(1) {
          transform-origin: top left;
        }

        .hamburger-line:nth-child(3) {
          transform-origin: bottom left;
        }

        .hamburger.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg);
          background: #0D9488;
        }

        .hamburger.open .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg);
          background: #0D9488;
        }

        @media (max-width: 768px) {
          .navbar-brand {
            font-size: 1.1rem;
          }
          
          .navbar-brand-logo {
            width: 100px;
            height: 100px;
            margin-right: 0.5rem;
          }
          
          .nav-link {
            padding: 0.75rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .navbar-brand {
            font-size: 1rem;
          }
          
          .navbar-brand-logo {
            width: 70px;
            height: 70px;
            margin-right: 0.5rem;
          }
        }
      `}</style>

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
            {/* Logo */}
            <Link href="/" className="navbar-brand">
              <img 
                src="/gemini-cut-1767695702892.png" 
                alt="Entercom Solutions" 
                className="navbar-brand-logo"
              />
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {navLinks.map((link) => (
                  <div key={link.name} style={{ position: 'relative' }}>
                    <Link
                      href={link.href}
                      className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                      onMouseEnter={() => link.dropdown && setIsDropdownOpen(link.name)}
                      onMouseLeave={() => link.dropdown && setIsDropdownOpen(null)}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      {link.icon && <link.icon className="nav-link-icon" size={16} />}
                      {link.name}
                      {link.dropdown && <ChevronDown size={14} style={{ marginLeft: '0.25rem' }} />}
                    </Link>
                    
                    {/* Dropdown */}
                    {link.dropdown && (
                      <div className={`dropdown-menu ${isDropdownOpen === link.name ? 'open' : ''}`}>
                        {link.dropdown.map((item) => (
                          <Link key={item} href="#" className="dropdown-item">
                            {item}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <Link href="/contact" className="get-started-btn">
                  Get Started <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  padding: '8px'
                }}
              >
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <>
          <div 
            className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div style={{ padding: '2rem 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img 
                    src="/gemini-cut-1767695702892.png" 
                    alt="Entercom Solutions" 
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 2px 4px rgba(13, 148, 136, 0.2))'
                    }}
                  />
                  <h3 style={{ fontFamily: 'Syne', fontSize: '1.5rem', fontWeight: 800, color: '#0D9488' }}>
                    Menu
                  </h3>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(13, 148, 136, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                  <X size={24} color="#000000" />
                </button>
              </div>
              
              <nav>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon && <link.icon size={18} style={{ marginRight: '1rem' }} />}
                    <div>
                      <div>{link.name}</div>
                      {link.dropdown && (
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                          {link.dropdown.join(', ')}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </nav>
              
              <div style={{ marginTop: '2rem' }}>
                <Link 
                  href="/contact" 
                  className="get-started-btn"
                  style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                </Link>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', padding: '1rem', borderTop: '1px solid rgba(13, 148, 136, 0.1)' }}>
                  <a href="mailto:info@entercomsolutions.com" style={{ color: '#0D9488', transition: 'all 0.2s ease' }}>
                    <Mail size={20} />
                  </a>
                  <a href="tel:+1234567890" style={{ color: '#0D9488', transition: 'all 0.2s ease' }}>
                    <Phone size={20} />
                  </a>
                  <a href="#" style={{ color: '#0D9488', transition: 'all 0.2s ease' }}>
                    <Globe2 size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
