"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar-redesigned";
import { Button } from "@/components/ui";
import Footer from "@/components/Footer";
import { 
  Code, 
  Rocket, 
  Cpu, 
  Zap, 
  Shield, 
  ArrowRight,
  Database,
  Cloud,
  Lock,
  LineChart,
  BrainCircuit,
  Smartphone,
  CheckCircle,
  Server,
  Package,
  Settings,
  BarChart3,
  GitBranch,
  Search
} from "lucide-react";
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

    .gc { background:rgba(255,255,255,.75); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border:1px solid rgba(13,148,136,.14); border-radius:18px; transition:transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s; }
    .gc:hover { transform:translateY(-6px); box-shadow:0 24px 64px rgba(13,148,136,.12), 0 4px 20px rgba(0,0,0,.06); }

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

export default function ServicesPage() {
  useScrollReveal();
  const [stripeWidth, setStripeWidth] = useState(20);
  
  useEffect(() => {
    const updateStripeWidth = () => {
      if (window.innerWidth < 480) setStripeWidth(8);
      else if (window.innerWidth < 768) setStripeWidth(15);
      else setStripeWidth(20);
    };
    
    updateStripeWidth();
    window.addEventListener('resize', updateStripeWidth);
    return () => window.removeEventListener('resize', updateStripeWidth);
  }, []);
  
  const services = [
    {
      title: "Web Development",
      desc: "Custom web applications built with modern frameworks and best practices for optimal performance and user experience.",
      icon: Code,
      features: ["React/Next.js", "TypeScript", "Responsive Design", "SEO Optimization"],
      category: "Development",
      price: "From $15k"
    },
    {
      title: "Mobile Development",
      desc: "Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.",
      icon: Smartphone,
      features: ["iOS & Android", "React Native", "Flutter", "App Store Deployment"],
      category: "Development",
      price: "From $20k"
    },
    {
      title: "Cloud Solutions",
      desc: "Scalable cloud infrastructure designed for growth, reliability, and optimal performance.",
      icon: Cloud,
      features: ["AWS/Azure", "Microservices", "DevOps", "Serverless"],
      category: "Infrastructure",
      price: "From $18k"
    },
    {
      title: "Data Analytics",
      desc: "Transform your data into actionable insights with advanced analytics and machine learning solutions.",
      icon: Database,
      features: ["Machine Learning", "Data Visualization", "Real-time Analytics", "Big Data"],
      category: "Analytics",
      price: "From $22k"
    },
    {
      title: "AI & Machine Learning",
      desc: "Cutting-edge AI solutions that automate processes and unlock new possibilities for your business.",
      icon: BrainCircuit,
      features: ["Deep Learning", "NLP", "Computer Vision", "Predictive Models"],
      category: "AI/ML",
      price: "From $25k"
    },
    {
      title: "Cybersecurity",
      desc: "Comprehensive security solutions to protect your digital assets and ensure compliance.",
      icon: Shield,
      features: ["Security Audits", "Penetration Testing", "Compliance", "24/7 Monitoring"],
      category: "Security",
      price: "From $12k"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Strategy",
      desc: "We analyze your requirements, identify opportunities, and create a comprehensive roadmap for success.",
      icon: Search
    },
    {
      step: "02", 
      title: "Design & Planning",
      desc: "Our team creates detailed designs, architecture plans, and technical specifications.",
      icon: Settings
    },
    {
      step: "03",
      title: "Development & Testing",
      desc: "Agile development with continuous testing to ensure quality and performance.",
      icon: Code
    },
    {
      step: "04",
      title: "Deployment & Support",
      desc: "Seamless deployment with ongoing support and optimization.",
      icon: Rocket
    }
  ];

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:80, background:'linear-gradient(160deg,#f8fafc 0%,#fff 55%,#f0fdf4 100%)', position:'relative', overflow:'hidden' }}>
          {/* Diagonal Stripes Pattern */}
          <div style={{ position:'absolute', inset:0, opacity:0.025, pointerEvents:'none' }}>
            <div style={{ width:'200%', height:'200%', background:`repeating-linear-gradient(45deg, #0D9488 0px, #0D9488 ${stripeWidth}px, transparent ${stripeWidth}px, transparent ${stripeWidth * 2}px)` }}/>
          </div>
          <div style={{ position:'absolute', top:'-10%', right:'-5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(13,148,136,.06) 0%,transparent 70%)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:'-5%', left:'-8%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(5,150,105,.05) 0%,transparent 70%)', pointerEvents:'none' }}/>
          
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'4rem 1.5rem', position:'relative', zIndex:1, width:'100%' }}>
            <div className="reveal" style={{ textAlign:'center', maxWidth:900, margin:'0 auto' }}>
              <div className="sl" style={{ justifyContent:'center', marginBottom:'1.5rem' }}>◆ Services</div>
              <h1 style={{ fontSize:'4rem', fontWeight:800, lineHeight:1.08, letterSpacing:'-.03em', color:'#0A0A0A', marginBottom:'1.5rem' }}>
                Comprehensive Digital<br/>Solutions for <span className="gradient-text">Modern Business</span>
              </h1>
              <p style={{ fontSize:'1.2rem', color:'#475569', lineHeight:1.75, maxWidth:600, margin:'0 auto 2.5rem' }}>
                From concept to deployment, we provide end-to-end services that transform your ideas into powerful digital experiences.
              </p>
              <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
                <Link href="/contact" className="bp" style={{ fontSize:'.95rem', padding:'.85rem 2rem' }}>Get Started →</Link>
                <Link href="/projects" className="bo" style={{ fontSize:'.95rem', padding:'.82rem 2rem' }}>View Our Work</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section style={{ padding:'6rem 0', background:'#fff' }}>
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
            <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
              <div className="sl" style={{ justifyContent:'center' }}>◆ Our Services</div>
              <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
                Everything You Need to <span className="gradient-text">Scale Your Business</span>
              </h2>
              <p style={{ color:'#64748b', fontSize:'1rem', maxWidth:600, margin:'0 auto', lineHeight:1.7 }}>
                Comprehensive solutions tailored to your specific needs, delivered with excellence and precision.
              </p>
            </div>
            <div className="grid3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
              {services.map((service, i) => (
                <div key={service.title} className="reveal" style={{ transitionDelay:`${i * .1}s` }}>
                  <div className="gc" style={{ padding:'2rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem' }}>
                      <div style={{ width:56, height:56, background:'linear-gradient(135deg,rgba(13,148,136,.1),rgba(5,150,105,.08))', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <service.icon className="w-7 h-7 text-teal-600" />
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'.5rem' }}>
                        <span style={{ background:'rgba(13,148,136,.08)', color:'#0D9488', fontSize:'.78rem', fontWeight:700, padding:'.28rem .8rem', borderRadius:999, border:'1px solid rgba(13,148,136,.2)' }}>
                          {service.price}
                        </span>
                        <span style={{ background:'#f1f5f9', color:'#64748b', fontSize:'.7rem', fontWeight:600, padding:'.2rem .6rem', borderRadius:6 }}>
                          {service.category}
                        </span>
                      </div>
                    </div>
                    <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1.1rem', color:'#0A0A0A', marginBottom:'1rem', lineHeight:1.3 }}>{service.title}</h3>
                    <p style={{ color:'#64748b', fontSize:'.9rem', lineHeight:1.65, marginBottom:'1.5rem' }}>{service.desc}</p>
                    <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'.5rem', marginBottom:'1.5rem' }}>
                      {service.features.map(feature => (
                        <li key={feature} style={{ display:'flex', alignItems:'center', gap:'.5rem', fontSize:'.85rem', color:'#475569' }}>
                          <CheckCircle className="w-4 h-4 text-teal-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="bp" style={{ width:'100%', justifyContent:'center', fontSize:'.85rem', padding:'.7rem' }}>
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section style={{ padding:'6rem 0', background:'#f8fafc' }}>
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
            <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
              <div className="sl" style={{ justifyContent:'center' }}>◆ Our Process</div>
              <h2 style={{ fontFamily:'Syne', fontSize:'2.4rem', fontWeight:800, letterSpacing:'-.02em', color:'#0A0A0A', marginBottom:'1rem' }}>
                How We <span className="gradient-text">Deliver Excellence</span>
              </h2>
              <p style={{ color:'#64748b', fontSize:'1rem', maxWidth:500, margin:'0 auto', lineHeight:1.7 }}>
                A proven methodology that ensures successful outcomes every time.
              </p>
            </div>
            <div className="grid4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.5rem' }}>
              {process.map((step, i) => (
                <div key={step.step} className="reveal" style={{ transitionDelay:`${i * .1}s` }}>
                  <div className="cc" style={{ textAlign:'center', padding:'2rem' }}>
                    <div style={{ width:64, height:64, background:'linear-gradient(135deg,#0D9488,#059669)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'Syne', fontWeight:800, fontSize:'1.2rem', margin:'0 auto 1.5rem' }}>
                      {step.step}
                    </div>
                    <div style={{ width:48, height:48, background:'rgba(13,148,136,.08)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem' }}>
                      <step.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1rem', color:'#0A0A0A', marginBottom:'1rem' }}>{step.title}</h3>
                    <p style={{ color:'#64748b', fontSize:'.85rem', lineHeight:1.65 }}>{step.desc}</p>
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
              Ready to Transform Your<br/>Business?
            </h2>
            <p style={{ color:'rgba(255,255,255,.82)', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2.5rem', maxWidth:540, margin:'0 auto 2.5rem' }}>
              Let's discuss how our services can help you achieve your digital transformation goals.
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
