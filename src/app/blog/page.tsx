"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar-redesigned";
import { Button } from "@/components/ui";
import Footer from "@/components/Footer";
import { ArrowRight, Calendar, Clock, User, Search, Filter, TrendingUp, BookOpen, MessageSquare, Heart, Share2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { blogStorage, BlogPost } from "@/lib/blog";

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

    .bc { border:1px solid #e2e8f0; border-radius:16px; padding:2rem; background:#fff; transition:transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s, border-color .22s; position:relative; overflow:hidden; }
    .bc:hover { transform:translateY(-5px); box-shadow:0 20px 50px rgba(13,148,136,.1); border-color:rgba(13,148,136,.35); }

    .sl { display:inline-flex; align-items:center; gap:.5rem; font-family:'DM Sans',sans-serif; font-size:.75rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--teal); background:rgba(13,148,136,.08); padding:.35rem 1rem; border-radius:999px; margin-bottom:1rem; }

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

export default function BlogPage() {
  useScrollReveal();
  const [triangleSize, setTriangleSize] = useState(50);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  useEffect(() => {
    const updateTriangleSize = () => {
      if (window.innerWidth < 480) setTriangleSize(35);
      else if (window.innerWidth < 768) setTriangleSize(42);
      else setTriangleSize(50);
    };

    updateTriangleSize();
    window.addEventListener('resize', updateTriangleSize);
    return () => window.removeEventListener('resize', updateTriangleSize);
  }, []);

  // Load posts from storage
  useEffect(() => {
    const timer = setTimeout(() => {
      const publishedPosts = blogStorage.getPublishedPosts();
      setPosts(publishedPosts);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Tech", "Web Development", "Design", "Business"];

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.tags.includes(selectedCategory));

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:80, background:'linear-gradient(160deg,#f8fafc 0%,#fff 55%,#f0fdf4 100%)', position:'relative', overflow:'hidden' }}>
          {/* Geometric Triangle Pattern */}
          <div style={{ position:'absolute', inset:0, opacity:0.1, pointerEvents:'none' }}>
            <svg width="100%" height="100%" style={{ overflow:'visible' }}>
              <defs>
                <pattern id="triangles" x="0" y="0" width={`${triangleSize}px`} height={`${triangleSize * 0.86}px`} patternUnits="userSpaceOnUse">
                  <polygon points={`${triangleSize/2},5 ${triangleSize*0.76},${triangleSize*0.44} ${triangleSize*0.24},${triangleSize*0.44}`} fill="none" stroke="#0D9488" strokeWidth="1.2"/>
                  <polygon points={`${triangleSize/2},${triangleSize*0.58} ${triangleSize*0.7},${triangleSize*0.88} ${triangleSize*0.3},${triangleSize*0.88}`} fill="rgba(13,148,136,0.08)" stroke="#0D9488" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#triangles)" />
            </svg>
          </div>
          <div style={{ position:'absolute', top:'-10%', right:'-5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(13,148,136,.06) 0%,transparent 70%)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:'-5%', left:'-8%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(5,150,105,.05) 0%,transparent 70%)', pointerEvents:'none' }}/>
          
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'4rem 1.5rem', position:'relative', zIndex:1, width:'100%' }}>
            <div className="reveal" style={{ textAlign:'center', maxWidth:900, margin:'0 auto' }}>
              <div className="sl" style={{ justifyContent:'center', marginBottom:'1.5rem' }}>◆ Blog</div>
              <h1 style={{ fontSize:'4rem', fontWeight:800, lineHeight:1.08, letterSpacing:'-.03em', color:'#0A0A0A', marginBottom:'1.5rem' }}>
                Insights & <span className="gradient-text">Innovation</span>
              </h1>
              <p style={{ fontSize:'1.2rem', color:'#475569', lineHeight:1.75, maxWidth:600, margin:'0 auto 2.5rem' }}>
                Stay updated with the latest trends, best practices, and innovations in technology and digital transformation.
              </p>
              <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', marginBottom:'2rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'.5rem', background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'.8rem 1.2rem', boxShadow:'0 2px 8px rgba(0,0,0,.08)' }}>
                  <Search className="w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    style={{ border:'none', outline:'none', fontSize:'.9rem', width:200 }}
                  />
                </div>
                <Link href="/contact" className="bp" style={{ fontSize:'.95rem', padding:'.85rem 2rem' }}>Subscribe →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section style={{ padding:'3rem 0', background:'#fff' }}>
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
            <div className="reveal" style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding:'.6rem 1.2rem',
                    borderRadius:999,
                    border: selectedCategory === category ? '1.5px solid #0D9488' : '1px solid #e2e8f0',
                    background: selectedCategory === category ? '#0D9488' : '#fff',
                    color: selectedCategory === category ? '#fff' : '#475569',
                    fontSize:'.85rem',
                    fontWeight:600,
                    cursor: 'pointer',
                    transition: 'all .2s'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section style={{ padding:'4rem 0 6rem', background:'#f8fafc' }}>
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 1.5rem' }}>
            <div className="grid3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
              {filteredPosts.map((post, i) => (
                <article key={post.title} className="reveal" style={{ transitionDelay:`${i * .1}s` }}>
                  <div className="bc" style={{ overflow:'hidden' }}>
                    <div style={{ height:200, background:post.thumbnail ? `url(${post.thumbnail})` : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', position:'relative', backgroundSize:'cover', backgroundPosition:'center' }}>
                      <div style={{ position:'absolute', top:12, left:12, background:'rgba(255,255,255,.9)', backdropFilter:'blur(8px)', borderRadius:999, padding:'.3rem .8rem', fontSize:'.7rem', fontWeight:600, color:'#0D9488' }}>
                        {post.tags[0] || 'Blog'}
                      </div>
                    </div>
                    <div style={{ padding:'1.5rem' }}>
                      <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1.1rem', color:'#0A0A0A', marginBottom:'.8rem', lineHeight:1.3 }}>
                        <Link href="#" style={{ textDecoration:'none', color:'inherit' }}>
                          {post.title}
                        </Link>
                      </h3>
                      <p style={{ color:'#64748b', fontSize:'.9rem', lineHeight:1.65, marginBottom:'1rem' }}>{post.excerpt}</p>
                      <div style={{ display:'flex', alignItems:'center', gap:'.5rem', fontSize:'.8rem', color:'#94a3b8', marginBottom:'1rem' }}>
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                        <span style={{ margin:'0 .5rem' }}>•</span>
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                        <span style={{ margin:'0 .5rem' }}>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'1rem', borderTop:'1px solid #f1f5f9' }}>
                        <div style={{ display:'flex', gap:'1rem' }}>
                          <button style={{ display:'flex', alignItems:'center', gap:'.3rem', color:'#64748b', fontSize:'.8rem', cursor:'pointer' }}>
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </button>
                          <button style={{ display:'flex', alignItems:'center', gap:'.3rem', color:'#64748b', fontSize:'.8rem', cursor:'pointer' }}>
                            <MessageSquare className="w-4 h-4" />
                            {post.comments}
                          </button>
                        </div>
                        <Link href="#" style={{ color:'#0D9488', textDecoration:'none', display:'flex', alignItems:'center', gap:'.3rem', fontSize:'.85rem', fontWeight:600 }}>
                          Read More <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section style={{ padding:'5.5rem 1.5rem', background:'linear-gradient(135deg,#0D9488 0%,#059669 50%,#0891b2 100%)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 20% 50%,rgba(255,255,255,.08) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(255,255,255,.06) 0%,transparent 50%)' }}/>
          <div className="reveal" style={{ maxWidth:760, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.25)', borderRadius:999, padding:'.35rem 1rem', marginBottom:'1.75rem', backdropFilter:'blur(8px)' }}>
              <BookOpen className="w-4 h-4 text-white" />
              <span style={{ fontSize:'.8rem', fontWeight:600, color:'rgba(255,255,255,.9)', letterSpacing:'.06em', textTransform:'uppercase' }}>Stay Updated</span>
            </div>
            <h2 style={{ fontFamily:'Syne', fontSize:'2.8rem', fontWeight:800, color:'#fff', letterSpacing:'-.02em', lineHeight:1.15, marginBottom:'1.25rem' }}>
              Get the Latest Insights<br/>Delivered to Your Inbox
            </h2>
            <p style={{ color:'rgba(255,255,255,.82)', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2.5rem', maxWidth:540, margin:'0 auto 2.5rem' }}>
              Join thousands of developers and tech leaders who get our weekly newsletter with the latest trends and insights.
            </p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', maxWidth:400, margin:'0 auto' }}>
              <input 
                type="email" 
                placeholder="Enter your email"
                style={{ 
                  flex:1, 
                  padding:'.85rem 1.2rem', 
                  borderRadius:10, 
                  border:'1px solid rgba(255,255,255,.3)', 
                  background:'rgba(255,255,255,.1)', 
                  color:'#fff',
                  fontSize:'.9rem',
                  outline:'none'
                }}
              />
              <button className="bp" style={{ background:'#fff', color:'#0D9488', fontSize:'.95rem', padding:'.85rem 1.5rem' }}>
                Subscribe
              </button>
            </div>
            <p style={{ fontSize:'.75rem', color:'rgba(255,255,255,.6)', marginTop:'1rem' }}>
              No spam, unsubscribe anytime.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
