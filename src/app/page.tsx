"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar-redesigned";
import { Button } from "@/components/ui";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  CheckCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  Calendar, 
  ExternalLink,
  Cloud,
  Cpu,
  Shield,
  BarChart3,
  Zap,
  Globe2,
  Lock,
  Database,
  GitBranch,
  Settings,
  Rocket,
  Building2,
  Stethoscope,
  ShoppingCart,
  Battery,
  Truck,
  Radio,
  Code,
  Server,
  Package,
  Activity,
  Target,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  Star,
  Heart,
  Layers,
  Box,
  Lightbulb,
  MousePointer,
  ArrowUpRight,
  ChevronDown,
  Infinity
} from "lucide-react";
import Link from "next/link";

/* Magic UI Components */
const AnimatedGridBackground = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(13, 148, 136, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(13, 148, 136, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    animation: 'gridFloat 20s ease-in-out infinite',
    pointerEvents: 'none'
  }} />
);

const FloatingParticles = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  }}>
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          width: Math.random() * 4 + 2 + 'px',
          height: Math.random() * 4 + 2 + 'px',
          background: `rgba(13, 148, 136, ${Math.random() * 0.3 + 0.1})`,
          borderRadius: '50%',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
          animationDelay: Math.random() * 5 + 's'
        }}
      />
    ))}
  </div>
);

const GradientOrbs = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  }}>
    <div style={{
      position: 'absolute',
      width: '600px',
      height: '600px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%)',
      top: '-200px',
      right: '-200px',
      animation: 'float 8s ease-in-out infinite'
    }} />
    <div style={{
      position: 'absolute',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, transparent 70%)',
      bottom: '-150px',
      left: '-150px',
      animation: 'float 12s ease-in-out infinite reverse'
    }} />
    <div style={{
      position: 'absolute',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animation: 'pulse 4s ease-in-out infinite'
    }} />
  </div>
);

const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    style={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(13, 148, 136, 0.1)',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 10px 40px rgba(13, 148, 136, 0.1)',
      position: 'relative',
      isolation: 'isolate'
    }}
  >
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #0D9488, #059669, #10b981)',
      animation: 'shimmer 3s ease-in-out infinite'
    }} />
    <div style={{ 
      maxWidth: '100%',
      overflow: 'hidden',
      wordWrap: 'break-word',
      hyphens: 'auto'
    }}>
      {children}
    </div>
  </motion.div>
);

const GradientButton = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #0D9488 0%, #059669 50%, #10b981 100%)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '12px',
        fontWeight: 600,
        fontSize: '1rem',
        boxShadow: '0 4px 20px rgba(13, 148, 136, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <span style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
        animation: 'buttonShimmer 2s ease-in-out infinite'
      }} />
      {children}
    </Link>
  </motion.div>
);

const StatsCounter = ({ target, suffix, label }: { target: number; suffix: string; label: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target]);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center' }}
    >
      <div style={{
        fontSize: '2.5rem',
        fontWeight: 800,
        background: 'linear-gradient(135deg, #0D9488, #059669)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1
      }}>
        {count}{suffix}
      </div>
      <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>
        {label}
      </div>
    </motion.div>
  );
};

const InteractiveCard = ({ icon, title, description, index }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ 
      scale: 1.02,
      boxShadow: '0 20px 60px rgba(13, 148, 136, 0.15)'
    }}
    style={{
      background: 'white',
      border: '1px solid rgba(13, 148, 136, 0.1)',
      borderRadius: '20px',
      padding: '2rem',
      cursor: 'pointer',
      position: 'relative',
      isolation: 'isolate'
    }}
  >
    <motion.div
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
      style={{ marginBottom: '1.5rem' }}
    >
      {icon}
    </motion.div>
    <h3 style={{ 
      fontSize: '1.25rem', 
      fontWeight: 700, 
      color: '#0A0A0A', 
      marginBottom: '1rem',
      fontFamily: 'Syne',
      wordWrap: 'break-word',
      hyphens: 'auto'
    }}>
      {title}
    </h3>
    <p style={{ 
      color: '#64748b', 
      lineHeight: 1.6,
      wordWrap: 'break-word',
      hyphens: 'auto',
      maxWidth: '100%'
    }}>
      {description}
    </p>
    <motion.div
      initial={{ x: -10 }}
      whileHover={{ x: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#0D9488',
        fontWeight: 600,
        marginTop: '1rem'
      }}
    >
      Learn more <ArrowUpRight size={16} />
    </motion.div>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role, rating }: {
  quote: string;
  author: string;
  role: string;
  rating: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5 }}
    style={{
      background: 'white',
      border: '1px solid rgba(13, 148, 136, 0.1)',
      borderRadius: '16px',
      padding: '2rem',
      position: 'relative',
      isolation: 'isolate'
    }}
  >
    <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          color={i < rating ? '#0D9488' : '#e2e8f0'}
          fill={i < rating ? '#0D9488' : 'none'}
        />
      ))}
    </div>
    <p style={{ 
      color: '#475569', 
      lineHeight: 1.6, 
      marginBottom: '1.5rem', 
      fontStyle: 'italic',
      wordWrap: 'break-word',
      hyphens: 'auto',
      maxWidth: '100%'
    }}>
      "{quote}"
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #0D9488, #059669)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700,
        fontSize: '1.2rem'
      }}>
        {author.charAt(0)}
      </div>
      <div>
        <div style={{ 
          fontWeight: 700, 
          color: '#0A0A0A',
          wordWrap: 'break-word'
        }}>{author}</div>
        <div style={{ 
          color: '#64748b', 
          fontSize: '0.9rem',
          wordWrap: 'break-word'
        }}>{role}</div>
      </div>
    </div>
  </motion.div>
);

/* Global Styles Component */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* Aggressive scrollbar removal */
    html, body, * {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    
    *::-webkit-scrollbar,
    *::-webkit-scrollbar-track,
    *::-webkit-scrollbar-thumb,
    *::-webkit-scrollbar-corner,
    *::-webkit-scrollbar-button,
    *::-webkit-scrollbar-piece,
    *::-webkit-scrollbar-resizer {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
      background: transparent !important;
    }

    /* Target motion.div specifically */
    div[style*="motion"],
    div[class*="motion"],
    [data-motion-id] {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    
    div[style*="motion"]::-webkit-scrollbar,
    div[class*="motion"]::-webkit-scrollbar,
    [data-motion-id]::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }

    /* Target all card containers */
    div[style*="overflow"],
    div[style*="backdrop-filter"],
    div[style*="rgba"] {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
      overflow: -moz-scrollbars-none !important;
    }
    
    div[style*="overflow"]::-webkit-scrollbar,
    div[style*="backdrop-filter"]::-webkit-scrollbar,
    div[style*="rgba"]::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }

    /* Hide scrollbars on all elements with inline styles */
    [style] {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    
    [style]::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }

    :root {
      --teal: #0D9488; --teal-d: #0B7A70; --emerald: #059669;
      --ink: #0A0A0A; --white: #FFFFFF;
      --s1: #F8FAFC; --s2: #F1F5F9; --s3: #CBD5E1; --s4: #64748B; --s5: #334155;
    }

    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: #fff; color: #0A0A0A; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
    h1,h2,h3,h4 { font-family: 'Syne', sans-serif; }

    .gradient-text {
      background: linear-gradient(135deg, #0D9488 0%, #059669 35%, #0891B2 70%, #0D9488 100%);
      background-size: 300% 300%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gshift 5s ease infinite;
    }
    @keyframes gshift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    
    @keyframes gridFloat {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(-10px, -10px); }
      50% { transform: translate(10px, -5px); }
      75% { transform: translate(-5px, 10px); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    
    @keyframes buttonShimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-10px) translateX(5px); }
      50% { transform: translateY(5px) translateX(-5px); }
      75% { transform: translateY(-5px) translateX(10px); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }

    .reveal { opacity:0; transform:translateY(32px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .reveal.visible { opacity:1; transform:translateY(0); }
    .rl { opacity:0; transform:translateX(-40px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .rl.visible { opacity:1; transform:translateX(0); }
    .rr { opacity:0; transform:translateX(40px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .rr.visible { opacity:1; transform:translateX(0); }

    @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .mq { animation: marquee 28s linear infinite; }
    .mq:hover { animation-play-state: paused; }

    .nb { backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); background:rgba(255,255,255,0.9); border-bottom:1px solid rgba(13,148,136,0.1); }

    .bp {
      background: var(--teal); color:#fff;
      font-family:'DM Sans',sans-serif; font-weight:600; font-size:.9rem;
      padding:.75rem 1.75rem; border-radius:10px; border:none; cursor:pointer;
      transition: background .25s, box-shadow .25s, transform .2s;
      text-decoration:none; display:inline-flex; align-items:center; gap:.4rem;
    }
    .bp:hover { background:var(--teal-d); box-shadow:0 0 0 4px rgba(13,148,136,.18), 0 8px 24px rgba(13,148,136,.22); transform:translateY(-1px); }

    .bo {
      background:transparent; color:var(--teal);
      font-family:'DM Sans',sans-serif; font-weight:600; font-size:.9rem;
      padding:.72rem 1.75rem; border-radius:10px; border:1.5px solid var(--teal); cursor:pointer;
      transition: background .22s, box-shadow .22s, transform .22s;
      text-decoration:none; display:inline-flex; align-items:center; gap:.4rem;
    }
    .bo:hover { background:rgba(13,148,136,.07); box-shadow:0 0 0 3px rgba(13,148,136,.12); transform:translateY(-1px); }

    .gc { background:rgba(255,255,255,.75); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border:1px solid rgba(13,148,136,.14); border-radius:18px; transition:transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s; }
    .gc:hover { transform:translateY(-6px); box-shadow:0 24px 64px rgba(13,148,136,.12), 0 4px 20px rgba(0,0,0,.06); }

    .cc { border:1px solid #e2e8f0; border-radius:16px; padding:2rem; background:#fff; transition:transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s, border-color .22s; position:relative; overflow:hidden; }
    .cc:hover { transform:translateY(-5px); box-shadow:0 20px 50px rgba(13,148,136,.1); border-color:rgba(13,148,136,.35); }

    .pc { border-radius:18px; overflow:hidden; border:1px solid #e2e8f0; transition:transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s; cursor:pointer; }
    .pc:hover { transform:translateY(-8px) scale(1.015); box-shadow:0 32px 72px rgba(13,148,136,.14); }

    .sl { display:inline-flex; align-items:center; gap:.5rem; font-family:'DM Sans',sans-serif; font-size:.75rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--teal); background:rgba(13,148,136,.08); padding:.35rem 1rem; border-radius:999px; margin-bottom:1rem; }

    .chk { width:22px; height:22px; border-radius:50%; background:linear-gradient(135deg,#0D9488,#059669); display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }

    .tb { display:inline-flex; align-items:center; gap:.5rem; padding:.55rem 1.1rem; border:1px solid #e2e8f0; border-radius:10px; font-size:.85rem; font-weight:500; color:#334155; background:#fff; transition:border-color .22s, box-shadow .22s, transform .22s; cursor:default; }
    .tb:hover { border-color:var(--teal); box-shadow:0 4px 16px rgba(13,148,136,.1); transform:translateY(-2px); }

    .ip { padding:.55rem 1.25rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:999px; font-size:.85rem; font-weight:500; color:#334155; transition:background .22s, color .22s, border-color .22s, transform .22s; cursor:default; }
    .ip:hover { background:rgba(13,148,136,.08); color:var(--teal); border-color:rgba(13,148,136,.3); transform:translateY(-2px); }

    .sn { font-family:'Syne',sans-serif; font-size:2.6rem; font-weight:800; color:var(--teal); line-height:1; }

    .pn { width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg,#0D9488,#059669); color:#fff; font-family:'Syne',sans-serif; font-weight:700; font-size:1.1rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 4px 16px rgba(13,148,136,.3); }

    .fl { font-size:.85rem; color:#94a3b8; text-decoration:none; transition:color .2s; }
    .fl:hover { color:var(--teal); }

    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

    @media(max-width:900px) {
      .dg { display:none !important; }
      .split2 { grid-template-columns:1fr !important; }
      .grid3 { grid-template-columns:1fr 1fr !important; }
      .grid4 { grid-template-columns:1fr 1fr !important; }
      .ht { font-size:2.6rem !important; }
    }
    @media(max-width:600px) {
      .grid3, .grid4 { grid-template-columns:1fr !important; }
      .grid2 { grid-template-columns:1fr !important; }
    }
    @media(max-width:480px) {
      .grid4 { grid-template-columns:1fr !important; }
      .ht { font-size:2.2rem !important; }
    }
    @media(max-width:400px) {
      .ht { font-size:1.8rem !important; }
    }
    @media(max-width:600px) {
      section { padding: 3rem 0 !important; }
    }
    @media(max-width:480px) {
      section { padding: 2rem 0 !important; }
    }
    
    /* Container fixes */
    .grid4, .grid3, .grid2, .split2 {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    
    .grid4 > *, .grid3 > *, .grid2 > *, .split2 > * {
      min-width: 0;
      box-sizing: border-box;
    }
  `}</style>
);

/* Hooks */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.rl,.rr');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounter(target: number, dur = 1800): [number, React.RefObject<HTMLSpanElement | null>] {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setCount(target % 1 === 0 ? Math.floor(ease * target) : Math.round(ease * target * 10) / 10);
          if (p < 1) requestAnimationFrame(tick); else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: .5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, dur]);
  return [count, ref];
}

/* Counter Component */
function Ctr({ target, suffix = '', isFloat }: { target: number; suffix?: string; isFloat?: boolean }) {
  const [c, ref] = useCounter(target);
  const display = isFloat ? Number(c).toFixed(2) : Math.floor(c).toLocaleString();
  return <span ref={ref}>{display}{suffix}</span>;
}

/* Hero Section */
function Hero() {
  return (
    <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:80, background:'linear-gradient(160deg,#f8fafc 0%,#fff 55%,#f0fdf4 100%)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-10%', right:'-5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(13,148,136,.06) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'-5%', left:'-8%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(5,150,105,.05) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(13,148,136,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(13,148,136,.04) 1px,transparent 1px)', backgroundSize:'48px 48px', pointerEvents:'none' }}/>

      <div style={{ maxWidth:1240, margin:'0 auto', padding:'4rem 1.5rem', position:'relative', zIndex:1, width:'100%' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'3rem', alignItems:'center' }}>
          <div style={{ maxWidth:780 }}>
            {/* Badge */}
            <div className="reveal" style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', background:'rgba(13,148,136,.07)', border:'1px solid rgba(13,148,136,.18)', borderRadius:999, padding:'.35rem 1rem .35rem .5rem', marginBottom:'1.75rem' }}>
              <span style={{ background:'#0D9488', borderRadius:999, padding:'.2rem .6rem', fontSize:'.7rem', fontWeight:700, color:'#fff', letterSpacing:'.06em', textTransform:'uppercase' }}>New</span>
              <span style={{ fontSize:'.82rem', fontWeight:500, color:'#334155' }}>Enterprise Platform v3.0 — Now Generally Available</span>
              <span style={{ color:'#0D9488', fontSize:'.82rem' }}>→</span>
            </div>
            {/* Headline */}
            <h1 className="reveal ht" style={{ fontSize:'4rem', fontWeight:800, lineHeight:1.08, letterSpacing:'-.03em', color:'#0A0A0A', marginBottom:'1.5rem', transitionDelay:'.08s' }}>
              We Architect Digital<br/>Infrastructure That<br/><span className="gradient-text">Scales With Ambition.</span>
            </h1>
            <p className="reveal" style={{ fontSize:'1.1rem', color:'#475569', lineHeight:1.75, maxWidth:560, marginBottom:'2.5rem', transitionDelay:'.16s' }}>
              Entercom Solutions builds enterprise-grade technology ecosystems — cloud platforms, AI-powered automation, and scalable software architecture — for organizations that refuse to be outpaced.
            </p>
            <div className="reveal" style={{ display:'flex', gap:'1rem', flexWrap:'wrap', transitionDelay:'.22s' }}>
              <Link href="/contact" className="bp" style={{ fontSize:'.95rem', padding:'.85rem 2rem' }}>Start Your Project →</Link>
              <Link href="/services" className="bo" style={{ fontSize:'.95rem', padding:'.82rem 2rem' }}>Explore Services</Link>
            </div>
            {/* Mini stats */}
            <div className="reveal" style={{ display:'flex', gap:'2.5rem', marginTop:'3rem', paddingTop:'2rem', borderTop:'1px solid #e2e8f0', flexWrap:'wrap', transitionDelay:'.3s' }}>
              {[
                ['350+','Enterprise Clients'],
                ['12 yrs','Industry Experience'],
                ['99.97%','Platform Uptime']
              ].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:'1.4rem', color:'#0D9488', lineHeight:1, wordBreak:'break-word' }}>{n}</div>
                  <div style={{ fontSize:'.8rem', color:'#64748b', marginTop:'.3rem', fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating cards */}
          <div className="rr dg" style={{ display:'flex', flexDirection:'column', gap:'1rem', width:360, transitionDelay:'.2s' }}>
            {[
              { icon:Zap, label:'Infrastructure Deployed', val:'2.4 TB', note:'Provisioned today' },
              { icon:Activity, label:'CI/CD Pipeline Status', val:'All Systems Green', note:'48 services running' },
              { icon:Shield, label:'Security Score', val:'98 / 100', note:'Zero active threats' },
              { icon:BarChart3, label:'Client NPS Score', val:'72 pts', note:'Industry avg: 34' },
            ].map(({ icon: Icon, label, val, note }) => (
              <div key={label} style={{ background:'rgba(255,255,255,.93)', border:'1px solid rgba(13,148,136,.12)', borderRadius:16, padding:'1rem 1.25rem', backdropFilter:'blur(12px)', display:'flex', alignItems:'center', gap:'1rem', boxShadow:'0 4px 24px rgba(0,0,0,.04)' }}>
                <div style={{ fontSize:'1.4rem', width:42, height:42, background:'rgba(13,148,136,.08)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'.72rem', color:'#64748b', fontWeight:500 }}>{label}</div>
                  <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:'.95rem', color:'#0A0A0A', marginTop:'.1rem' }}>{val}</div>
                  <div style={{ fontSize:'.7rem', color:'#10b981', marginTop:'.1rem', fontWeight:500 }}>↑ {note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Trusted By Section */
function TrustedBy() {
  const logos = ['Accenture','Deloitte Digital','IBM Cloud','Microsoft Azure','Oracle Enterprise','Salesforce','SAP Global','Infosys','Wipro','TCS','HCL Tech','Cognizant'];
  const dbl = [...logos, ...logos];
  return (
    <section style={{ padding:'4rem 0', borderTop:'1px solid #f1f5f9', borderBottom:'1px solid #f1f5f9', background:'#fafafa', overflow:'hidden', position:'relative' }}>
      <AnimatedGridBackground />
      <FloatingParticles />
      <GradientOrbs />
      <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem', textAlign:'center', marginBottom:'1.75rem', position:'relative', zIndex:1 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize:'.78rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'#94a3b8' }}
        >
          Trusted by industry leaders across 40+ countries
        </motion.p>
      </div>
      <div style={{ overflow:'hidden', maskImage:'linear-gradient(to right,transparent,black 10%,black 90%,transparent)', position:'relative', zIndex:1 }}>
        <div className="mq" style={{ display:'flex', gap:'1.5rem', whiteSpace:'nowrap', alignItems:'center' }}>
          {dbl.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(13, 148, 136, 0.05)' }}
              style={{ display:'flex', alignItems:'center', gap:'.5rem', padding:'.6rem 1.4rem', background:'#fff', border:'1px solid #e2e8f0', borderRadius:10, flexShrink:0, cursor: 'pointer' }}
            >
              <div style={{ width:7, height:7, borderRadius:'50%', background:'linear-gradient(135deg,#0D9488,#059669)' }}/>
              <span style={{ fontFamily:'Syne', fontWeight:600, fontSize:'.82rem', color:'#475569' }}>{l}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth:960, margin:'3rem auto 0', padding:'0 1.5rem', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', width:'100%', overflowX:'hidden', boxSizing:'border-box', position:'relative', zIndex:1 }} className="grid4">
        {[
          { t:350, s:'+', label:'Enterprise Clients', sub:'Across 40+ countries' },
          { t:1200, s:'+', label:'Projects Delivered', sub:'On time, every time' },
          { t:99.97, s:'%', label:'Platform Uptime', sub:'SLA guaranteed', isFloat:true },
          { t:4.9, s:'/5', label:'Client Satisfaction', sub:'Average CSAT score', isFloat:true },
        ].map((stat, index) => (
          <FloatingCard key={stat.label} delay={index * 0.1}>
            <StatsCounter target={stat.t} suffix={stat.s} label={stat.label} />
            <div style={{ fontSize:'.75rem', color:'#94a3b8', marginTop:'.2rem' }}>{stat.sub}</div>
          </FloatingCard>
        ))}
      </div>
    </section>
  );
}

/* Capabilities Section */
function Capabilities() {
  const caps = [
    { icon:Cloud, title:'Cloud Architecture', desc:'Design and deploy resilient, auto-scaling infrastructure across AWS, Azure, and GCP with infrastructure-as-code-first principles and FinOps rigor.' },
    { icon:Cpu, title:'AI & ML Engineering', desc:'Productionize ML pipelines, LLM integrations, RAG architectures, and intelligent automation at enterprise scale with full observability.' },
    { icon:Shield, title:'Cybersecurity', desc:'Zero-trust frameworks, SOC 2 Type II compliance, penetration testing programs, and continuous threat intelligence monitoring at every layer.' },
    { icon:BarChart3, title:'Data & Analytics', desc:'Real-time data lakehouses, semantic layers, BI dashboards, and streaming architectures that transform raw data into competitive intelligence.' },
    { icon:GitBranch, title:'DevSecOps', desc:'CI/CD pipelines, GitOps workflows, internal developer platforms, and shift-left security practices that accelerate delivery velocity.' },
    { icon:Package, title:'Product Engineering', desc:'Full-stack SaaS platforms, B2B products, mobile apps, and APIs engineered for performance, accessibility, and enterprise-grade reliability.' },
  ];
  return (
    <section style={{ padding:'6rem 0', background:'#f8fafc', position:'relative' }}>
      <AnimatedGridBackground />
      <FloatingParticles />
      <GradientOrbs />
      <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem', position:'relative', zIndex:1 }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign:'center', marginBottom:'3.5rem' }}
        >
          <div className="sl" style={{ justifyContent:'center' }}>◆ Core Capabilities</div>
          <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
            The Full-Stack of<br/><span className="gradient-text">Enterprise Technology</span>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color:'#64748b', fontSize:'1rem', maxWidth:520, margin:'0 auto', lineHeight:1.7 }}
          >
            Six integrated practice areas, one cohesive delivery model — built to solve complexity at every layer of the stack.
          </motion.p>
        </motion.div>
        <div className="grid3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }}>
          {caps.map(({ icon: Icon, title, desc }, i) => (
            <InteractiveCard
              key={title}
              index={i}
              icon={
                <div style={{ 
                  fontSize:'1.75rem', 
                  width:50, 
                  height:50, 
                  background:'linear-gradient(135deg, rgba(13,148,136,.08), rgba(5,150,105,.12))', 
                  borderRadius:14, 
                  display:'flex', 
                  alignItems:'center', 
                  justifyContent:'center',
                  border: '1px solid rgba(13, 148, 136, 0.1)'
                }}>
                  <Icon size={24} color="#0D9488" />
                </div>
              }
              title={title}
              description={desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Testimonials Section */
function Testimonials() {
  const testimonials = [
    {
      quote: "Entercom transformed our cloud infrastructure, reducing costs by 40% while improving performance. Their expertise in FinOps and architecture is unmatched.",
      author: "Sarah Chen",
      role: "CTO, Fortune 500 Company",
      rating: 5
    },
    {
      quote: "The AI pipeline they built for us processes millions of transactions daily with 99.99% accuracy. Truly enterprise-grade solutions.",
      author: "Michael Rodriguez",
      role: "VP Engineering, Tech Startup",
      rating: 5
    },
    {
      quote: "Their DevSecOps approach helped us achieve SOC 2 compliance in record time. Security is now built into everything we do.",
      author: "Emily Watson",
      role: "CISO, Financial Services",
      rating: 5
    }
  ];

  return (
    <section style={{ padding:'6rem 0', background:'#f8fafc', position:'relative' }}>
      <AnimatedGridBackground />
      <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem', position:'relative', zIndex:1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign:'center', marginBottom:'4rem' }}
        >
          <div className="sl" style={{ justifyContent:'center' }}>◆ Client Success Stories</div>
          <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
            What Our <span className="gradient-text">Partners Say</span>
          </h2>
          <p style={{ color:'#64748b', fontSize:'1rem', maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>
            Don't just take our word for it. Hear from the leaders we've helped transform.
          </p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'2rem' }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* CTA Section */
function CTABanner() {
  return (
    <section style={{ padding:'5.5rem 1.5rem', background:'linear-gradient(135deg,#0D9488 0%,#059669 50%,#0891b2 100%)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 20% 50%,rgba(255,255,255,.08) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(255,255,255,.06) 0%,transparent 50%)' }}/>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)', backgroundSize:'40px 40px' }}/>
      <div className="reveal" style={{ maxWidth:760, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.25)', borderRadius:999, padding:'.35rem 1rem', marginBottom:'1.75rem', backdropFilter:'blur(8px)' }}>
          <span style={{ fontSize:'.8rem', fontWeight:600, color:'rgba(255,255,255,.9)', letterSpacing:'.06em', textTransform:'uppercase' }}>📅 Limited Intake — Q3 2026</span>
        </div>
        <h2 style={{ fontFamily:'Syne', fontSize:'2.8rem', fontWeight:800, color:'#fff', letterSpacing:'-.02em', lineHeight:1.15, marginBottom:'1.25rem' }}>
          Ready to Build Something<br/>That Outlasts the Hype?
        </h2>
        <p style={{ color:'rgba(255,255,255,.82)', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2.5rem', maxWidth:540, margin:'0 auto 2.5rem' }}>
          We have capacity for 4 new enterprise engagements in Q3 2026. Reserve your discovery call before the quarter fills. No pitch. No fluff. Just clarity.
        </p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <GradientButton href="/contact">
            Schedule a Discovery Call <ArrowRight size={16} />
          </GradientButton>
          <Link 
            href="/projects" 
            style={{ 
              background:'transparent', 
              color:'#fff', 
              fontFamily:'DM Sans', 
              fontWeight:600, 
              fontSize:'.95rem', 
              padding:'.82rem 2.2rem', 
              borderRadius:10, 
              border:'1.5px solid rgba(255,255,255,.4)', 
              textDecoration:'none', 
              transition:'all .2s',
              display: 'inline-flex',
              alignItems: 'center'
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.1)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Who We Are Section */
function WhoWeAre() {
  return (
    <section style={{ padding:'6rem 0', background:'#fff' }}>
      <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
        <div className="split2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>
          <div className="rl">
            <div className="sl">◆ Who We Are</div>
            <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, lineHeight:1.15, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1.5rem' }}>
              Built for the Era of<br/><span className="gradient-text">Intelligent Enterprise</span>
            </h2>
            <p style={{ color:'#475569', lineHeight:1.75, fontSize:'1rem', marginBottom:'1.25rem' }}>
              Entercom Solutions is a next-generation technology consultancy that architects, builds, and scales the digital infrastructure modern enterprises depend on. We bridge the gap between strategic ambition and technical execution.
            </p>
            <p style={{ color:'#475569', lineHeight:1.75, fontSize:'1rem', marginBottom:'2rem' }}>
              Founded on the belief that technology should be an accelerant — not a bottleneck — we operate at the intersection of cloud engineering, AI/ML, and product design to deliver systems that are as elegant as they are powerful.
            </p>
            <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
              {['Cloud-Native','AI-Powered','Security-First','Outcome-Driven'].map(t => (
                <span key={t} style={{ padding:'.4rem 1rem', background:'rgba(13,148,136,.07)', border:'1px solid rgba(13,148,136,.18)', borderRadius:999, fontSize:'.8rem', fontWeight:600, color:'#0D9488' }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="rr">
            <div style={{ position:'relative', height:420 }}>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#0D9488 0%,#059669 60%,#0891b2 100%)', borderRadius:24, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 32px 80px rgba(13,148,136,.25)' }}>
                <div style={{ textAlign:'center', color:'#fff' }}>
                  <div style={{ fontSize:'3.5rem', marginBottom:'.5rem' }}>
                    <Building2 className="w-16 h-16" />
                  </div>
                  <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:'1.3rem', marginBottom:'.25rem' }}>Digital Infrastructure</div>
                  <div style={{ fontSize:'.85rem', opacity:.8 }}>Architected for Scale</div>
                  <div style={{ display:'flex', gap:'1rem', justifyContent:'center', marginTop:'1.5rem' }}>
                    {['AWS','Azure','GCP'].map(c => (
                      <span key={c} style={{ background:'rgba(255,255,255,.15)', backdropFilter:'blur(8px)', borderRadius:8, padding:'.3rem .8rem', fontSize:'.75rem', fontWeight:600, color:'#fff' }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              {[
                { top:'6%', left:'-12%', text:'Cloud Architecture', icon:Cloud },
                { top:'72%', right:'-10%', text:'AI Automation', icon:Cpu },
                { top:'43%', left:'-14%', text:'DevSecOps', icon:Shield },
              ].map(({ top, left, right, text, icon: Icon }) => (
                <div key={text} style={{ position:'absolute', top, left, right, background:'rgba(255,255,255,.97)', backdropFilter:'blur(12px)', border:'1px solid rgba(13,148,136,.15)', borderRadius:12, padding:'.6rem 1rem', display:'flex', alignItems:'center', gap:'.5rem', boxShadow:'0 8px 24px rgba(0,0,0,.08)', whiteSpace:'nowrap' }}>
                  <Icon className="w-4 h-4 text-teal-600" />
                  <span style={{ fontWeight:600, fontSize:'.82rem', color:'#334155' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Services Section */
function Services() {
  const svcs = [
    { icon:Cloud, title:'Cloud Migration & Modernization', price:'From $18k', desc:'End-to-end lift-and-shift or re-architecture of legacy systems to cloud-native platforms. Includes assessment, planning, execution, and hypercare.', features:['Cloud Readiness Assessment','Microservices Decomposition','Multi-cloud Strategy','Post-migration Optimization'] },
    { icon:Cpu, title:'AI Platform Engineering', price:'From $24k', desc:'Custom LLM fine-tuning, RAG pipelines, AI agent frameworks, and MLOps infrastructure. From proof-of-concept to production in weeks, not quarters.', features:['LLM Integration & Fine-tuning','RAG Architecture Design','ML Observability Stack','Model Governance Framework'] },
    { icon:Shield, title:'Security & Compliance', price:'From $12k', desc:'Comprehensive cybersecurity programs covering threat modeling, penetration testing, SIEM implementation, and regulatory compliance advisory.', features:['Penetration Testing','SOC 2 Type II Readiness','Zero-Trust Architecture','Incident Response Playbooks'] },
    { icon:BarChart3, title:'Data Platform & Analytics', price:'From $15k', desc:'Modern data stacks on Snowflake, Databricks, or BigQuery. Semantic layers, BI tooling, and real-time streaming that turn data into decisions.', features:['Data Lakehouse Design','Real-time Streaming Pipelines','BI Dashboard Development','Data Governance & Cataloging'] },
    { icon:Settings, title:'Platform Engineering', price:'From $20k', desc:'Internal developer platforms, golden paths, self-service infrastructure, and developer experience tooling that multiplies engineering velocity 3×.', features:['IDP Design & Build','Golden Path Templates','Developer Portal Implementation','SRE & Reliability Practices'] },
    { icon:Rocket, title:'Product & SaaS Engineering', price:'From $22k', desc:'Full product development from discovery to launch. SaaS platforms, B2B products, mobile apps, and APIs engineered for scale and sustained growth.', features:['Product Discovery Sprints','Full-stack SaaS Development','Performance Engineering','Iterative Feature Delivery'] },
  ];
  return (
    <section style={{ padding:'6rem 0', background:'#fff' }}>
      <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <div className="sl" style={{ justifyContent:'center' }}>◆ Services</div>
          <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
            Outcome-Driven<br/><span className="gradient-text">Delivery Programs</span>
          </h2>
          <p style={{ color:'#64748b', fontSize:'1rem', maxWidth:500, margin:'0 auto', lineHeight:1.7 }}>Fixed-scope engagements with clear milestones, transparent pricing, and measurable results — guaranteed.</p>
        </div>
        <div className="grid3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }}>
          {svcs.map(({ icon: Icon, title, price, desc, features }, i) => (
            <div key={title} className="gc reveal" style={{ padding:'1.75rem', transitionDelay:`${i * .07}s` }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.25rem' }}>
                <div style={{ fontSize:'1.75rem', width:48, height:48, background:'linear-gradient(135deg,rgba(13,148,136,.1),rgba(5,150,105,.08))', borderRadius:13, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <span style={{ background:'rgba(13,148,136,.08)', color:'#0D9488', fontSize:'.78rem', fontWeight:700, padding:'.28rem .8rem', borderRadius:999, border:'1px solid rgba(13,148,136,.2)' }}>{price}</span>
              </div>
              <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1rem', color:'#0A0A0A', marginBottom:'.65rem', lineHeight:1.3 }}>{title}</h3>
              <p style={{ color:'#64748b', fontSize:'.85rem', lineHeight:1.65, marginBottom:'1.25rem' }}>{desc}</p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'.4rem' }}>
                {features.map(f => (
                  <li key={f} style={{ display:'flex', alignItems:'center', gap:'.5rem', fontSize:'.82rem', color:'#475569' }}>
                    <span style={{ color:'#0D9488', fontWeight:700, fontSize:'.9rem' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop:'1.5rem', paddingTop:'1.25rem', borderTop:'1px solid rgba(13,148,136,.1)' }}>
                <Link href="/contact" className="bp" style={{ width:'100%', justifyContent:'center', fontSize:'.85rem', padding:'.7rem' }}>Enquire Now →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Portfolio Section */
function Portfolio() {
  const projects = [
    { icon:Building2, cat:'FinTech', title:'NexaBank Digital Platform', desc:'Core banking modernization — moved from mainframe to cloud-native microservices, reducing ops cost by 62% and enabling 10M+ concurrent users.', tags:['AWS','Kubernetes','Kafka'] },
    { icon:Stethoscope, cat:'HealthTech', title:'MediFlow AI Diagnostics', desc:'AI-powered radiology platform with 94% diagnostic accuracy, integrated with 300+ hospital PACS systems across 12 countries.', tags:['GCP','PyTorch','FHIR'] },
    { icon:ShoppingCart, cat:'Retail', title:'OmniCart Commerce Engine', desc:'Unified commerce platform handling 2M+ daily transactions with real-time inventory, ML personalization, and same-day fulfillment routing.', tags:['Azure','Snowflake','Next.js'] },
    { icon:Battery, cat:'Energy', title:'GridSense IoT Platform', desc:'Smart grid management system processing 800M+ sensor events/day using edge computing and federated ML for predictive maintenance.', tags:['Edge AI','Flink','Terraform'] },
    { icon:Truck, cat:'Logistics', title:'FleetIQ Route Intelligence', desc:'Real-time fleet optimization engine cutting fuel consumption by 28%, with dynamic rerouting, driver analytics, and ETA prediction.', tags:['Python','Redis','Grafana'] },
    { icon:Radio, cat:'Telecom', title:'Axeon 5G OSS Platform', desc:'Operations support system for a top-5 global carrier, automating 85% of network provisioning and reducing MTTR from hours to minutes.', tags:['Golang','TimescaleDB','Ansible'] },
  ];
  return (
    <section style={{ padding:'6rem 0', background:'#f8fafc' }}>
      <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <div className="sl" style={{ justifyContent:'center' }}>◆ Portfolio</div>
          <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
            Work That Speaks<br/><span className="gradient-text">For Itself</span>
          </h2>
          <p style={{ color:'#64748b', fontSize:'1rem', maxWidth:460, margin:'0 auto' }}>A selection of transformative engagements spanning industries, technologies, and continents.</p>
        </div>
        <div className="grid3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }}>
          {projects.map(({ icon: Icon, cat, title, desc, tags }, i) => (
            <Link key={title} href="/projects" style={{ textDecoration:'none' }}>
              <div className="pc reveal" style={{ transitionDelay:`${i * .07}s` }}>
                <div style={{ height:130, background:'linear-gradient(135deg,#0D9488,#059669)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'3rem', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 30% 50%,rgba(255,255,255,.1) 0%,transparent 60%)' }}/>
                  <Icon className="w-12 h-12 text-white" />
                  <span style={{ position:'absolute', top:12, left:14, background:'rgba(255,255,255,.18)', backdropFilter:'blur(8px)', borderRadius:999, padding:'.2rem .7rem', fontSize:'.7rem', fontWeight:600, color:'#fff', letterSpacing:'.06em', textTransform:'uppercase' }}>{cat}</span>
                </div>
                <div style={{ padding:'1.4rem', background:'#fff' }}>
                  <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1rem', color:'#0A0A0A', marginBottom:'.6rem', lineHeight:1.3 }}>{title}</h3>
                  <p style={{ color:'#64748b', fontSize:'.83rem', lineHeight:1.65, marginBottom:'1rem' }}>{desc}</p>
                  <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap' }}>
                    {tags.map(t => <span key={t} style={{ padding:'.22rem .65rem', background:'rgba(13,148,136,.07)', border:'1px solid rgba(13,148,136,.15)', borderRadius:6, fontSize:'.72rem', fontWeight:600, color:'#0D9488' }}>{t}</span>)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Tech Stack Section */
function TechStack() {
  const t = [
    {n:'React', icon:Code}, {n:'Next.js', icon:Rocket}, {n:'TypeScript', icon:Code}, {n:'Node.js', icon:Server},
    {n:'Python', icon:Code}, {n:'Go', icon:Code}, {n:'Rust', icon:Code}, {n:'AWS', icon:Cloud},
    {n:'Azure', icon:Cloud}, {n:'GCP', icon:Cloud}, {n:'Kubernetes', icon:Server}, {n:'Terraform', icon:Package},
    {n:'Docker', icon:Package}, {n:'Kafka', icon:Database}, {n:'PostgreSQL', icon:Database}, {n:'Redis', icon:Database},
    {n:'Elasticsearch', icon:Database}, {n:'Snowflake', icon:Database}, {n:'dbt', icon:Database}, {n:'Grafana', icon:BarChart3},
    {n:'Prometheus', icon:Activity}, {n:'Istio', icon:Server}, {n:'ArgoCD', icon:GitBranch}, {n:'Datadog', icon:Activity},
  ];
  return (
    <section style={{ padding:'6rem 0', background:'#fff' }}>
      <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:'3rem' }}>
          <div className="sl" style={{ justifyContent:'center' }}>◆ Tech Stack</div>
          <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
            Best-in-Class Tools,<br/><span className="gradient-text">Expertly Applied</span>
          </h2>
          <p style={{ color:'#64748b', fontSize:'1rem', maxWidth:420, margin:'0 auto' }}>We are technology-agnostic advisors and opinionated builders — we choose the right tool, not the familiar one.</p>
        </div>
        <div className="reveal" style={{ display:'flex', flexWrap:'wrap', gap:'.75rem', justifyContent:'center' }}>
          {t.map(({ n, icon: Icon }) => (
            <div key={n} className="tb">
              <Icon className="w-4 h-4 mr-2" />
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Why Us Section */
function WhyUs() {
  const reasons = [
    { t:'No Black-Box Delivery', d:"Full transparency on progress, blockers, and decisions. You get live access to our project management tools, code repos, and weekly executive summaries." },
    { t:'Outcome-Based Engagements', d:"We define measurable success criteria before signing. If we miss agreed milestones, you don't pay the full invoice — contractually guaranteed." },
    { t:'Senior-Only Delivery Teams', d:"No juniors billable as seniors. Every engagement is led by engineers and architects with 8+ years of direct hands-on production experience." },
    { t:'Security Built In, Not Bolted On', d:"Threat modeling begins at the design phase. Every PR is scanned. Every dependency is tracked. Security is cultural, not a compliance checkbox." },
    { t:'Continuous Knowledge Transfer', d:"We document as we build, conduct structured handovers, and run internal enablement sessions so your team owns everything we deliver." },
    { t:'90-Day Post-Launch Guarantee', d:"Hypercare period included with every project. One year of SLA-backed support available on all platform engineering engagements." },
  ];
  return (
    <section style={{ padding:'6rem 0', background:'#f8fafc' }}>
      <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
        <div className="split2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>
          <div className="rl">
            <div className="sl">◆ Why Choose Us</div>
            <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
              The Standard Others<br/><span className="gradient-text">Benchmark Against</span>
            </h2>
            <p style={{ color:'#64748b', lineHeight:1.75, fontSize:'.98rem', marginBottom:'2rem' }}>In a market crowded with generalist agencies and over-promise consultancies, Entercom is built differently — exceptional outcomes, every time.</p>
            <div className="grid2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              {[
                ['350+','Clients'],['12yrs','Experience'],['40+','Countries'],['98%','Retention']
              ].map(([n,l])=>(
                <div key={l} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, padding:'1.25rem' }}>
                  <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:'1.5rem', color:'#0D9488', lineHeight:1, wordBreak:'break-word' }}>{n}</div>
                  <div style={{ fontSize:'.8rem', color:'#64748b', fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rr">
            <div style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
              {reasons.map(({ t, d }) => (
                <div key={t} style={{ display:'flex', gap:'1rem', padding:'1.2rem', background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, transition:'border-color .22s,box-shadow .22s' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(13,148,136,.3)';e.currentTarget.style.boxShadow='0 4px 20px rgba(13,148,136,.07)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='#e2e8f0';e.currentTarget.style.boxShadow='none'}}>
                  <div className="chk">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:'.92rem', color:'#0A0A0A', marginBottom:'.3rem' }}>{t}</div>
                    <div style={{ fontSize:'.83rem', color:'#64748b', lineHeight:1.6 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Industries Section */
function Industries() {
  const pills = ['Financial Services','Healthcare & Life Sciences','Retail & E-commerce','Manufacturing & Industry 4.0','Logistics & Supply Chain','Energy & Utilities','Media & Entertainment','Education Technology','Government & Public Sector','Telecommunications','Real Estate & PropTech','Insurance & Insurtech','Legal & Compliance','Automotive','Aerospace & Defense'];
  return (
    <section style={{ padding:'6rem 0', background:'#fff' }}>
      <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:'3rem' }}>
          <div className="sl" style={{ justifyContent:'center' }}>◆ Industries</div>
          <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
            Domain Expertise<br/><span className="gradient-text">Across Every Vertical</span>
          </h2>
          <p style={{ color:'#64748b', fontSize:'1rem', maxWidth:480, margin:'0 auto' }}>Fifteen years of vertical specialization means we arrive fluent in your industry's constraints, regulations, and opportunities.</p>
        </div>
        <div className="reveal" style={{ display:'flex', flexWrap:'wrap', gap:'.75rem', justifyContent:'center' }}>
          {pills.map(p => <span key={p} className="ip">{p}</span>)}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  useScrollReveal();
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <WhoWeAre />
        <Capabilities />
        <Services />
        <Portfolio />
        <TechStack />
        <WhyUs />
        <Industries />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
