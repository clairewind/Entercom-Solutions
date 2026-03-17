"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  Rocket, 
  Shield, 
  Zap,
  TrendingUp,
  BarChart3,
  Users2,
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Button, Card, Section } from "@/components/ui";

export default function Home() {
  const stats = [
    { label: "Successful Projects", value: "250+", icon: Rocket },
    { label: "Client Growth", value: "45%", icon: TrendingUp },
    { label: "Global Presence", value: "15+", icon: Globe },
    { label: "Team Experts", value: "40+", icon: Users2 },
  ];

  const services = [
    {
      title: "Custom Web Development",
      desc: "High-performance, scalable platforms tailored to your business DNA. We turn complex requirements into elegant code.",
      icon: Code2,
    },
    {
      title: "Mobile App Development",
      desc: "Seamless and intuitive user experiences for iOS and Android. Built with native performance and cross-platform flexibility.",
      icon: Rocket,
    },
    {
      title: "AI & Machine Learning",
      desc: "Intelligent, future-ready systems that automate processes and deliver data-driven insights through neural networks.",
      icon: Cpu,
    },
    {
      title: "Cloud & DevOps",
      desc: "Secure, reliable, and horizontally scalable infrastructure designed to grow with your enterprise vision.",
      icon: Layers,
    },
    {
      title: "Digital Marketing",
      desc: "ROI-focused growth strategies combining performance marketing with cutting-edge SEO and conversion optimization.",
      icon: Zap,
    },
    {
      title: "Cyber Security",
      desc: "Enterprise-grade protection for your digital assets. We ensure your data and systems remain resilient against threats.",
      icon: Shield,
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      desc: "We deep-dive into your business ecosystem to align technology with your core commercial objectives.",
    },
    {
      step: "02",
      title: "Design & Architecture",
      desc: "Crafting bulletproof technical architectures and user-centric designs that scale beautifully.",
    },
    {
      step: "03",
      title: "Agile Development",
      desc: "Building robust solutions in iterative cycles with full transparency and continuous feedback loops.",
    },
    {
      step: "04",
      title: "Testing & Deployment",
      desc: "Rigorous quality assurance followed by a strategic rollout and production-ready monitoring.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  Innovation at Scale
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
                Transforming Ideas into <br />
                <span className="text-gradient">Scalable Solutions</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
                Entercom Solutions designs, builds, and deploys high-performance technology that drives enterprise growth. From intelligent AI to global web platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="gap-2 text-base px-10 py-5">
                  Build With Us <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="secondary" className="text-base px-10 py-5">
                  Start Your Project
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl absolute -z-10 w-full" />
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                  <div className="h-4 bg-slate-50 rounded-full w-full" />
                  <div className="h-4 bg-slate-100 rounded-full w-2/3" />
                  <div className="pt-4 grid grid-cols-3 gap-4">
                    <div className="h-20 bg-teal-50 rounded-xl" />
                    <div className="h-20 bg-teal-500/10 rounded-xl" />
                    <div className="h-20 bg-emerald-50 rounded-xl" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-slate-50 py-20 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex p-3 rounded-xl bg-white border border-slate-200 mb-4 shadow-sm">
                  <stat.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <Section 
          id="services"
          title="Our Core Capabilities"
          subtitle="We bring together world-class engineering, strategic design, and innovative thinking to deliver complete digital transformation."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item) => (
              <Card key={item.title}>
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{item.desc}</p>
                <a href="#" className="inline-flex items-center gap-2 text-teal-600 font-semibold group">
                  Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Card>
            ))}
          </div>
        </Section>

        {/* Process Section */}
        <section id="process" className="bg-slate-900 py-24 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mb-20">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">How We Deliver Value</h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                We go beyond standard development — we solve business problems through a systematic, data-driven approach.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 hidden lg:block -translate-y-1/2" />
              {processSteps.map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 relative z-10 backdrop-blur-sm"
                >
                  <div className="text-6xl font-black text-teal-500/10 absolute -top-4 right-4">{item.step}</div>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                    {item.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <Section
          title="Industries We Scale"
          subtitle="Our engineering expertise spans across highly regulated and mission-critical industries globally."
          className="bg-slate-50"
        >
          <div className="flex flex-wrap gap-4">
            {["E-commerce", "Healthcare", "Logistics", "Education", "FinTech", "Web3"].map((industry) => (
              <motion.span
                key={industry}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl shadow-sm cursor-default"
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </Section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Ready to build something <br />
                <span className="text-teal-600">truly impactful?</span>
              </h2>
              <p className="text-lg text-slate-600 mb-12">
                Whether you're starting from scratch or scaling an existing system, our team of experts is ready to help you navigate your digital transformation.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email Us", val: "contact@entercomsolutions.com" },
                  { icon: MapPin, label: "Our Office", val: "Tech Hub, India" },
                  { icon: Phone, label: "Call Us", val: "+91 (800) 555-0123" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</div>
                      <div className="text-slate-900 font-semibold">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg" />
            <span className="text-xl font-bold text-slate-900 tracking-tight">Entercom</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; 2026 Entercom Solutions. Built with engineering excellence.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 hover:text-teal-600 transition-colors">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-teal-600 transition-colors">LinkedIn</a>
            <a href="#" className="text-slate-400 hover:text-teal-600 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
