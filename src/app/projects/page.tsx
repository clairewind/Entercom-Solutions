"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar-redesigned";
import { Button } from "@/components/ui";
import Footer from "@/components/Footer";
import { ArrowRight, ExternalLink, CheckCircle, Building2, Stethoscope, ShoppingCart, Battery, Truck, Radio, Code, Server, Package, Activity, Target, Users, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

/* Global Styles Component */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

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

    .pc { border-radius:18px; overflow:hidden; border:1px solid #e2e8f0; transition:transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s; cursor:pointer; }
    .pc:hover { transform:translateY(-8px) scale(1.015); box-shadow:0 32px 72px rgba(13,148,136,.14); }

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

export default function ProjectsPage() {
  useScrollReveal();
  const [dotSize, setDotSize] = useState(4);
  const [gridSize, setGridSize] = useState(30);
  
  useEffect(() => {
    const updateDotSize = () => {
      if (window.innerWidth < 480) {
        setDotSize(2);
        setGridSize(20);
      } else if (window.innerWidth < 768) {
        setDotSize(3);
        setGridSize(25);
      } else {
        setDotSize(4);
        setGridSize(30);
      }
    };
    
    updateDotSize();
    window.addEventListener('resize', updateDotSize);
    return () => window.removeEventListener('resize', updateDotSize);
  }, []);
  
  const projects = [
    {
      title: "Adams Silver: Luxury E-commerce",
      category: "E-commerce",
      challenge: "Translating premium craftsmanship into digital experience",
      solution: "Bespoke e-commerce engine with 3D product previews and multi-currency checkout",
      impact: "40% conversion increase",
      tech: ["Next.js", "3D Rendering", "Payment Gateway", "Cloud Infrastructure"],
      icon: ShoppingCart
    },
    {
      title: "Delivery Ipoo: Logistics Platform",
      category: "Logistics SaaS",
      challenge: "Real-time tracking for thousands of drivers",
      solution: "Mobile ecosystem with AI-driven route optimization",
      impact: "15% lower fuel costs",
      tech: ["React Native", "GPS APIs", "AI/ML", "Real-time Analytics"],
      icon: Truck
    },
    {
      title: "Ayusareera: Health-Tech Platform",
      category: "Health-Tech",
      challenge: "Secure health data management",
      solution: "HIPAA-compliant platform with video consultations",
      impact: "Secure patient management",
      tech: ["WebRTC", "Encryption", "HIPAA Compliance", "React"],
      icon: Stethoscope
    },
    {
      title: "Capelevate: Enterprise Portal",
      category: "Enterprise",
      challenge: "Legacy B2B brand digital transformation",
      solution: "Full-scale digital overhaul with CRM integration",
      impact: "3x qualified leads",
      tech: ["Enterprise CMS", "CRM Integration", "Lead Generation", "Analytics"],
      icon: Building2
    },
    {
      title: "FinFlow: Banking Dashboard",
      category: "FinTech",
      challenge: "Complex financial data visualization",
      solution: "Real-time dashboard with advanced analytics",
      impact: "50% faster reporting",
      tech: ["D3.js", "Real-time Data", "Security", "Node.js"],
      icon: Activity
    },
    {
      title: "GridSmart: Energy Management",
      category: "Energy Tech",
      challenge: "Smart grid optimization and monitoring",
      solution: "IoT platform with predictive analytics",
      impact: "25% energy efficiency",
      tech: ["IoT", "Machine Learning", "Real-time Monitoring", "Cloud"],
      icon: Battery
    }
  ];

  const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "40+", label: "Countries Served" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Years Experience" }
  ];

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:80, background:'linear-gradient(160deg,#f8fafc 0%,#fff 55%,#f0fdf4 100%)', position:'relative', overflow:'hidden' }}>
          {/* Dots Pattern */}
          <div style={{ position:'absolute', inset:0, opacity:0.08, pointerEvents:'none' }}>
            <div style={{ display:'grid', gridTemplateColumns:`repeat(${gridSize}, 1fr)`, gridTemplateRows:`repeat(${gridSize}, 1fr)`, width:'100%', height:'100%' }}>
              {Array.from({length:gridSize * gridSize}).map((_, i) => (
                <div 
                  key={i} 
                  style={{ 
                    background: '#0D9488',
                    width:`${dotSize}px`, 
                    height:`${dotSize}px`,
                    borderRadius:'50%',
                    margin:'auto'
                  }} 
                />
              ))}
            </div>
          </div>
          <div style={{ position:'absolute', top:'-10%', right:'-5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(13,148,136,.06) 0%,transparent 70%)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:'-5%', left:'-8%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(5,150,105,.05) 0%,transparent 70%)', pointerEvents:'none' }}/>
          
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'4rem 1.5rem', position:'relative', zIndex:1, width:'100%' }}>
            <div className="reveal" style={{ textAlign:'center', maxWidth:900, margin:'0 auto' }}>
              <div className="sl" style={{ justifyContent:'center', marginBottom:'1.5rem' }}>◆ Portfolio</div>
              <h1 style={{ fontSize:'4rem', fontWeight:800, lineHeight:1.08, letterSpacing:'-.03em', color:'#0A0A0A', marginBottom:'1.5rem' }}>
                Transforming Ideas Into<br/>Digital <span className="gradient-text">Success Stories</span>
              </h1>
              <p style={{ fontSize:'1.2rem', color:'#475569', lineHeight:1.75, maxWidth:600, margin:'0 auto 2.5rem' }}>
                Explore our portfolio of innovative projects that showcase our expertise in delivering exceptional digital experiences.
              </p>
              <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
                <Link href="/contact" className="bp" style={{ fontSize:'.95rem', padding:'.85rem 2rem' }}>Start Your Project →</Link>
                <Link href="/services" className="bo" style={{ fontSize:'.95rem', padding:'.82rem 2rem' }}>Our Services</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ padding:'6rem 0', background:'#fff' }}>
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
            <div className="grid4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
              {stats.map((stat, i) => (
                <div key={stat.label} className="reveal" style={{ transitionDelay:`${i * .1}s`, textAlign:'center', padding:'1.5rem', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:16 }}>
                  <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:'2rem', color:'#0D9488', lineHeight:1, wordBreak:'break-word' }}>{stat.value}{stat.label}</div>
                  <div style={{ fontWeight:600, fontSize:'.85rem', color:'#334155', marginTop:'.4rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section style={{ padding:'6rem 0', background:'#f8fafc' }}>
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
            <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
              <div className="sl" style={{ justifyContent:'center' }}>◆ Featured Projects</div>
              <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
                Recent <span className="gradient-text">Success Stories</span>
              </h2>
              <p style={{ color:'#64748b', fontSize:'1rem', maxWidth:600, margin:'0 auto', lineHeight:1.7 }}>
                A selection of our recent projects that demonstrate our capabilities and commitment to excellence.
              </p>
            </div>
            <div className="grid3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
              {projects.map((project, i) => (
                <div key={project.title} className="reveal" style={{ transitionDelay:`${i * .1}s` }}>
                  <div className="pc">
                    <div style={{ height:140, background:'linear-gradient(135deg,#0D9488,#059669)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
                      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 30% 50%,rgba(255,255,255,.1) 0%,transparent 60%)' }}/>
                      <project.icon className="w-16 h-16 text-white" />
                      <span style={{ position:'absolute', top:12, left:14, background:'rgba(255,255,255,.18)', backdropFilter:'blur(8px)', borderRadius:999, padding:'.2rem .7rem', fontSize:'.7rem', fontWeight:600, color:'#fff', letterSpacing:'.06em', textTransform:'uppercase' }}>
                        {project.category}
                      </span>
                    </div>
                    <div style={{ padding:'1.5rem', background:'#fff' }}>
                      <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1rem', color:'#0A0A0A', marginBottom:'.6rem', lineHeight:1.3 }}>{project.title}</h3>
                      <div style={{ marginBottom:'1rem' }}>
                        <div style={{ fontSize:'.8rem', fontWeight:600, color:'#64748b', marginBottom:'.3rem' }}>Challenge</div>
                        <p style={{ fontSize:'.85rem', color:'#475569', lineHeight:1.6 }}>{project.challenge}</p>
                      </div>
                      <div style={{ marginBottom:'1rem' }}>
                        <div style={{ fontSize:'.8rem', fontWeight:600, color:'#64748b', marginBottom:'.3rem' }}>Solution</div>
                        <p style={{ fontSize:'.85rem', color:'#475569', lineHeight:1.6 }}>{project.solution}</p>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                        <div>
                          <div style={{ fontSize:'.8rem', fontWeight:600, color:'#64748b', marginBottom:'.2rem' }}>Impact</div>
                          <div style={{ fontSize:'.9rem', fontWeight:700, color:'#0D9488' }}>{project.impact}</div>
                        </div>
                        <Link href="#" style={{ color:'#0D9488', textDecoration:'none', display:'flex', alignItems:'center', gap:'.3rem', fontSize:'.85rem', fontWeight:600 }}>
                          View Case Study <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                      <div style={{ display:'flex', gap:'.4rem', flexWrap:'wrap' }}>
                        {project.tech.map(tech => (
                          <span key={tech} style={{ padding:'.2rem .6rem', background:'#f1f5f9', border:'1px solid #e2e8f0', borderRadius:6, fontSize:'.7rem', color:'#475569' }}>
                            {tech}
                          </span>
                        ))}
                      </div>
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
              Ready to Create Your<br/>Success Story?
            </h2>
            <p style={{ color:'rgba(255,255,255,.82)', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2.5rem', maxWidth:540, margin:'0 auto 2.5rem' }}>
              Let's discuss how we can help you achieve your digital transformation goals and create remarkable results.
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
