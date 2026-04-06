"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  Award,
  Target,
  Users,
  TrendingUp,
  Building2,
  Globe2,
  Heart,
  Star,
  Zap,
  Shield,
  Sparkles,
  Lightbulb,
  Rocket,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

/* Magic UI Components */
const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
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
      padding: '2rem',
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
      height: '3px',
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

const TimelineItem = ({ year, title, description, index }: { 
  year: string; 
  title: string; 
  description: string; 
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="reveal"
    style={{
      display: 'flex',
      gap: '2rem',
      alignItems: 'flex-start',
      marginBottom: '3rem'
    }}
  >
    <div style={{
      minWidth: '80px',
      padding: '0.5rem 1rem',
      background: 'linear-gradient(135deg, #0D9488, #059669)',
      color: 'white',
      borderRadius: '8px',
      fontWeight: 700,
      textAlign: 'center',
      fontSize: '0.9rem'
    }}>
      {year}
    </div>
    <div style={{ flex: 1 }}>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 700, 
        color: '#0A0A0A', 
        marginBottom: '0.75rem',
        fontFamily: 'Syne'
      }}>
        {title}
      </h3>
      <p style={{ color: '#64748b', lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  </motion.div>
);

const TeamMemberCard = ({ name, role, bio, index }: {
  name: string;
  role: string;
  bio: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ 
      scale: 1.05,
      boxShadow: '0 20px 60px rgba(13, 148, 136, 0.15)'
    }}
    style={{
      background: 'white',
      border: '1px solid rgba(13, 148, 136, 0.1)',
      borderRadius: '20px',
      padding: '2rem',
      textAlign: 'center',
      cursor: 'pointer',
      position: 'relative',
      isolation: 'isolate'
    }}
  >
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #0D9488, #059669)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      color: 'white',
      fontWeight: 800,
      fontSize: '2rem'
    }}>
      {name.charAt(0)}
    </div>
    <h3 style={{ 
      fontSize: '1.25rem', 
      fontWeight: 700, 
      color: '#0A0A0A', 
      marginBottom: '0.5rem',
      fontFamily: 'Syne',
      wordWrap: 'break-word'
    }}>
      {name}
    </h3>
    <div style={{ 
      color: '#0D9488', 
      fontWeight: 600, 
      marginBottom: '1rem',
      fontSize: '0.9rem',
      wordWrap: 'break-word'
    }}>
      {role}
    </div>
    <p style={{ 
      color: '#64748b', 
      lineHeight: 1.6, 
      fontSize: '0.9rem',
      wordWrap: 'break-word',
      hyphens: 'auto',
      maxWidth: '100%'
    }}>
      {bio}
    </p>
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
    body { font-family: 'DM Sans', sans-serif; background: #fff; color: #0A0A0A; -webkit-font-smoothing: antialiased; overflow-x: hidden; width: 100%; }
    h1,h2,h3,h4 { font-family: 'Syne', sans-serif; }
    
    * { box-sizing: border-box; }
    *::before, *::after { box-sizing: border-box; }

    .gradient-text {
      background: linear-gradient(135deg, #0D9488 0%, #059669 35%, #0891B2 70%, #0D9488 100%);
      background-size: 300% 300%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gshift 5s ease infinite;
    }
    @keyframes gshift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    .reveal { opacity:0; transform:translateY(32px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .reveal.visible { opacity:1; transform:translateY(0); }
    .rl { opacity:0; transform:translateX(-40px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .rl.visible { opacity:1; transform:translateX(0); }
    .rr { opacity:0; transform:translateX(40px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .rr.visible { opacity:1; transform:translateX(0); }

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

    .cc { border:1px solid #e2e8f0; border-radius:16px; padding:2rem; background:#fff; transition:transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s, border-color .22s; position:relative; overflow:hidden; }
    .cc:hover { transform:translateY(-5px); box-shadow:0 20px 50px rgba(13,148,136,.1); border-color:rgba(13,148,136,.35); }

    .sl { display:inline-flex; align-items:center; gap:.5rem; font-family:'DM Sans',sans-serif; font-size:.75rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--teal); background:rgba(13,148,136,.08); padding:.35rem 1rem; border-radius:999px; margin-bottom:1rem; }

    .chk { width:22px; height:22px; border-radius:50%; background:linear-gradient(135deg,#0D9488,#059669); display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }

    @media(max-width:900px) {
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
    .container-fix {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    
    /* Grid fixes */
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

export default function AboutPage() {
  useScrollReveal();
  const [gridSize, setGridSize] = useState(24);
  
  useEffect(() => {
    const updateGridSize = () => {
      if (window.innerWidth < 480) setGridSize(12);
      else if (window.innerWidth < 768) setGridSize(16);
      else setGridSize(24);
    };
    
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    return () => window.removeEventListener('resize', updateGridSize);
  }, []);
  
  const timeline = [
    {
      year: "2025",
      title: "Founded",
      desc: "Entercom Solutions was established with a vision to bridge complex technology with business growth."
    },
    {
      year: "2025-2026",
      title: "Rapid Growth", 
      desc: "Delivered 500+ projects across 15+ countries, establishing ourselves as a trusted digital partner."
    },
    {
      year: "Today",
      title: "Industry Leader",
      desc: "50+ team members providing cutting-edge solutions with 99% client satisfaction rate."
    }
  ];

  const values = [
    {
      title: "Technical Excellence",
      desc: "We never compromise on code quality. Every solution is built with industry best practices and rigorous testing.",
      icon: Shield
    },
    {
      title: "Client Partnership",
      desc: "We treat clients as partners, providing transparent communication and collaborative decision-making throughout the project.",
      icon: Users
    },
    {
      title: "Innovation First",
      desc: "We stay ahead of technology trends, ensuring our solutions are future-proof and scalable for tomorrow's challenges.",
      icon: Lightbulb
    }
  ];

  const team = [
    {
      role: "Full-Stack Developers",
      count: "20+",
      expertise: "React, Next.js, Node.js, Python"
    },
    {
      role: "Cloud Architects",
      count: "8+",
      expertise: "AWS, Azure, GCP, Kubernetes"
    },
    {
      role: "AI/ML Engineers",
      count: "6+",
      expertise: "TensorFlow, PyTorch, LLMs, Computer Vision"
    },
    {
      role: "DevOps Engineers",
      count: "5+",
      expertise: "CI/CD, Docker, Terraform, Monitoring"
    }
  ];

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:80, background:'linear-gradient(160deg,#f8fafc 0%,#fff 55%,#f0fdf4 100%)', position:'relative', overflow:'hidden' }}>
          {/* Checkerboard Pattern */}
          <div style={{ position:'absolute', inset:0, opacity:0.03, pointerEvents:'none' }}>
            <div style={{ display:'grid', gridTemplateColumns:`repeat(${gridSize}, 1fr)`, gridTemplateRows:`repeat(${gridSize}, 1fr)`, width:'100%', height:'100%' }}>
              {Array.from({length:gridSize * gridSize}).map((_, i) => (
                <div 
                  key={i} 
                  style={{ 
                    background: (Math.floor(i/gridSize) + i) % 2 === 0 ? '#0D9488' : 'transparent',
                    width:'100%', 
                    height:'100%' 
                  }} 
                />
              ))}
            </div>
          </div>
          <div style={{ position:'absolute', top:'-10%', right:'-5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(13,148,136,.06) 0%,transparent 70%)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:'-5%', left:'-8%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(5,150,105,.05) 0%,transparent 70%)', pointerEvents:'none' }}/>
          
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'4rem 1.5rem', position:'relative', zIndex:1, width:'100%' }}>
            <div className="reveal" style={{ textAlign:'center', maxWidth:900, margin:'0 auto' }}>
              <div className="sl" style={{ justifyContent:'center', marginBottom:'1.5rem' }}>◆ About Us</div>
              <h1 style={{ fontSize:'4rem', fontWeight:800, lineHeight:1.08, letterSpacing:'-.03em', color:'#0A0A0A', marginBottom:'1.5rem' }}>
                Building Digital<br/>Excellence Since<br/><span className="gradient-text">2025</span>
              </h1>
              <p style={{ fontSize:'1.2rem', color:'#475569', lineHeight:1.75, maxWidth:600, margin:'0 auto 2.5rem' }}>
                We are a team of passionate technologists dedicated to transforming businesses through innovative digital solutions and exceptional service.
              </p>
              <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
                <Link href="/contact" className="bp" style={{ fontSize:'.95rem', padding:'.85rem 2rem' }}>Get In Touch →</Link>
                <Link href="/projects" className="bo" style={{ fontSize:'.95rem', padding:'.82rem 2rem' }}>View Our Work</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ padding:'6rem 0', background:'#fff', overflowX:'hidden' }}>
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem', width:'100%', boxSizing:'border-box' }}>
            <div className="reveal" style={{ textAlign:'center', marginBottom:'3rem' }}>
              <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
                Our <span className="gradient-text">Impact</span>
              </h2>
            </div>
            <div className="grid4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', width:'100%', maxWidth:'100%', overflowX:'hidden' }}>
              {[
                { t:500, s:'+', label:'Projects Delivered', sub:'Across 15+ countries' },
                { t:50, s:'+', label:'Team Members', sub:'Expert professionals' },
                { t:99, s:'%', label:'Client Satisfaction', sub:'Industry leading' },
                { t:15, s:'+', label:'Countries', sub:'Global presence' },
              ].map(({ t, s, label, sub }) => (
                <div key={label} className="reveal" style={{ textAlign:'center', padding:'1.5rem', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:16, width:'100%', boxSizing:'border-box', minWidth:0 }}>
                  <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:'2rem', color:'#0D9488', lineHeight:1, wordBreak:'break-word' }}><Ctr target={t} suffix={s} /></div>
                  <div style={{ fontWeight:600, fontSize:'.85rem', color:'#334155', marginTop:'.4rem' }}>{label}</div>
                  <div style={{ fontSize:'.75rem', color:'#94a3b8', marginTop:'.2rem' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section style={{ padding:'6rem 0', background:'#f8fafc' }}>
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
            <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
              <div className="sl" style={{ justifyContent:'center' }}>◆ Our Journey</div>
              <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
                From Startup to <span className="gradient-text">Industry Leader</span>
              </h2>
            </div>
            <div className="split2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem' }}>
              {timeline.map((item, i) => (
                <div key={item.year} className="reveal" style={{ transitionDelay:`${i * .1}s` }}>
                  <div className="cc" style={{ padding:'2rem' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
                      <div style={{ width:48, height:48, background:'linear-gradient(135deg,#0D9488,#059669)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'Syne', fontWeight:700, fontSize:'1.1rem' }}>
                        {item.year}
                      </div>
                      <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1.2rem', color:'#0A0A0A' }}>{item.title}</h3>
                    </div>
                    <p style={{ color:'#64748b', lineHeight:1.65, fontSize:'.95rem' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section style={{ padding:'6rem 0', background:'#fff' }}>
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
            <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
              <div className="sl" style={{ justifyContent:'center' }}>◆ Core Values</div>
              <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
                What <span className="gradient-text">Drives Us</span>
              </h2>
            </div>
            <div className="grid3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
              {values.map((value, i) => (
                <div key={value.title} className="reveal" style={{ transitionDelay:`${i * .1}s` }}>
                  <div className="cc" style={{ textAlign:'center', padding:'2.5rem 2rem' }}>
                    <div style={{ width:64, height:64, background:'rgba(13,148,136,.08)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.5rem' }}>
                      <value.icon className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1.1rem', color:'#0A0A0A', marginBottom:'1rem' }}>{value.title}</h3>
                    <p style={{ color:'#64748b', lineHeight:1.65, fontSize:'.9rem' }}>{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section style={{ padding:'6rem 0', background:'#f8fafc' }}>
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
            <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
              <div className="sl" style={{ justifyContent:'center' }}>◆ Our Team</div>
              <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
                Expertise Across <span className="gradient-text">Every Stack</span>
              </h2>
            </div>
            <div className="grid2" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.5rem' }}>
              {team.map((member, i) => (
                <div key={member.role} className="reveal" style={{ transitionDelay:`${i * .1}s` }}>
                  <div className="cc" style={{ padding:'2rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                      <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1.1rem', color:'#0A0A0A' }}>{member.role}</h3>
                      <span style={{ background:'rgba(13,148,136,.08)', color:'#0D9488', fontSize:'.8rem', fontWeight:700, padding:'.3rem .8rem', borderRadius:999 }}>{member.count}</span>
                    </div>
                    <p style={{ color:'#64748b', fontSize:'.9rem', marginBottom:'1rem' }}>{member.expertise}</p>
                    <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap' }}>
                      {member.expertise.split(', ').map(skill => (
                        <span key={skill} style={{ padding:'.2rem .6rem', background:'#f1f5f9', border:'1px solid #e2e8f0', borderRadius:6, fontSize:'.75rem', color:'#475569' }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding:'5.5rem 1.5rem', background:'linear-gradient(135deg,#0D9488 0%,#059669 50%,#0891b2 100%)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 20% 50%,rgba(255,255,255,.08) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(255,255,255,.06) 0%,transparent 50%)' }}/>
          <div className="reveal" style={{ maxWidth:760, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
            <h2 style={{ fontFamily:'Syne', fontSize:'2.8rem', fontWeight:800, color:'#fff', letterSpacing:'-.02em', lineHeight:1.15, marginBottom:'1.25rem' }}>
              Ready to Build Something<br/>Amazing Together?
            </h2>
            <p style={{ color:'rgba(255,255,255,.82)', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2.5rem', maxWidth:540, margin:'0 auto 2.5rem' }}>
              Let's discuss how we can help you achieve your goals with our expertise and innovative solutions.
            </p>
            <Link href="/contact" style={{ background:'#fff', color:'#0D9488', fontFamily:'DM Sans', fontWeight:700, fontSize:'.95rem', padding:'.85rem 2.2rem', borderRadius:10, textDecoration:'none', transition:'transform .2s,box-shadow .2s', display:'inline-flex', alignItems:'center', gap:'.4rem' }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 12px 36px rgba(0,0,0,.18)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}>
              Start Your Project →
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
