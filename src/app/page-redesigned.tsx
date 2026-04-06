"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Code, 
  Zap, 
  Shield,
  TrendingUp,
  Database,
  Globe,
  Users,
  Award,
  CheckCircle
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  const services = [
    {
      title: "Web Development",
      desc: "Custom web applications built with modern frameworks and best practices.",
      icon: Code,
      features: ["React/Next.js", "TypeScript", "Responsive Design"]
    },
    {
      title: "Cloud Solutions",
      desc: "Scalable cloud infrastructure designed for growth and reliability.",
      icon: Globe,
      features: ["AWS/Azure", "Microservices", "DevOps"]
    },
    {
      title: "Data Analytics",
      desc: "Transform your data into actionable insights with advanced analytics.",
      icon: Database,
      features: ["Machine Learning", "Data Visualization", "Real-time Analytics"]
    },
    {
      title: "Security",
      desc: "Enterprise-grade security solutions to protect your digital assets.",
      icon: Shield,
      features: ["Security Audits", "Encryption", "Compliance"]
    }
  ];

  const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "50+", label: "Team Members" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      content: "Entercom Solutions transformed our digital presence. Their expertise and dedication are unmatched.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CTO, StartupHub",
      content: "The best development team we've worked with. They delivered beyond our expectations.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Product Manager, InnovateCo",
      content: "Professional, reliable, and innovative. They helped us scale our infrastructure seamlessly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Building Digital
                <span className="text-teal-600"> Excellence</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
                We create innovative digital solutions that drive growth and transform businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="px-8 py-4 text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="secondary" className="px-8 py-4 text-lg border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Client Testimonials
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              What our clients say about working with us
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-8 rounded-xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-600">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Let's discuss how we can help you achieve your digital goals
            </p>
            <Link href="/contact">
              <Button className="px-8 py-4 text-lg bg-white text-teal-600 hover:bg-slate-100 rounded-lg transition-colors">
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Entercom Solutions</h3>
              <p className="text-slate-400">
                Building digital excellence since 2025.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/services" className="hover:text-white transition-colors">Web Development</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Cloud Solutions</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Data Analytics</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">GitHub</Link></li>
                <li><Link href="mailto:info@entercomsolutions.com" className="hover:text-white transition-colors">Email Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2026 Entercom Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
