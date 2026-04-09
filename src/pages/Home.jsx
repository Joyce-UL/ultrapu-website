import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Shield, Leaf, ChevronRight, Factory, Clock, CheckCircle2, Quote, Zap, Globe, Users } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { company } from '../data/company'
import { productCategories, newArrivals, newsItems } from '../data/products'
import ProductCard from '../components/ProductCard'
import NewsCard from '../components/NewsCard'
import Hero from '../components/Hero'

// Animated section wrapper with stagger control
function AnimateSection({ children, className = '', delay = 0, direction = 'up' }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const directionMap = {
    up: 'translate-y-12',
    down: 'translate-y--12',
    left: 'translate-x-[-40px]',
    right: 'translate-x-[40px]',
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directionMap[direction]}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Section heading component for consistent styling
function SectionHeading({ label, title, description, light = false, center = true }) {
  return (
    <AnimateSection className={center ? 'text-center' : ''}>
      <span className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
        {label}
      </span>
      <h2 className={`heading-xl text-3xl sm:text-4xl lg:text-5xl mb-4 ${light ? 'text-white' : ''}`}>
        {title}
      </h2>
      <div className={`w-16 h-[2px] bg-accent rounded-full ${center ? 'mx-auto' : ''} mb-6`} />
      {description && (
        <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''} ${light ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </AnimateSection>
  )
}

// Divider between sections
function SectionDivider({ dark = false }) {
  return (
    <div className={`w-full h-px ${dark ? 'bg-surface-border' : 'bg-primary-100'}`} />
  )
}

const iconMap = {
  award: Award,
  shield: Shield,
  leaf: Leaf,
  zap: Zap,
  factory: Factory,
  globe: Globe,
  users: Users,
  clock: Clock,
  layers: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  headphones: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  ),
}

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* ========== Products Preview ========== */}
      <section className="section-light py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Products"
            title="Premium Leather Materials"
            description="From classic PU leather to cutting-edge microfiber and specialty series — we have the perfect material for every application."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16">
            {productCategories.materials.map((mat, i) => (
              <AnimateSection key={mat.id} delay={i * 100}>
                <ProductCard product={mat} type="material" />
              </AnimateSection>
            ))}
          </div>

          <AnimateSection className="text-center mt-14">
            <Link to="/products" className="btn-outline text-base group">
              Explore All Products
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateSection>
        </div>
      </section>

      <SectionDivider />



      {/* ========== Certifications ========== */}
      <section className="bg-primary-100 py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 texture-pattern" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Quality Assurance"
            title="Certified & Trusted"
            description="All products meet international quality and safety standards, ensuring reliability for every partner."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16">
            {company.certifications.map((cert, i) => {
              const IconComp = cert.icon === 'shield' ? Shield : cert.icon === 'leaf' ? Leaf : cert.icon === 'recycle' ? Leaf : CheckCircle2
              return (
                <AnimateSection key={cert.name} delay={i * 100}>
                  <div className="card-shine bg-white border border-primary-200 rounded-2xl p-8 text-center card-hover h-full flex flex-col items-center justify-center shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                      <IconComp size={30} className="text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-primary-950 mb-2">{cert.name}</h3>
                    <p className="text-primary-500 text-sm leading-relaxed">{cert.description}</p>
                  </div>
                </AnimateSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== Why Choose Us / Capabilities ========== */}
      <section className="section-light py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimateSection direction="left">
              <span className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
                Why Choose Us
              </span>
              <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl mb-6">
                Our Core Advantages
              </h2>
              <div className="w-16 h-[2px] bg-accent rounded-full mb-8" />
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                With professional R&D capabilities, strict quality control, and a customer-first service philosophy, we deliver exceptional value to partners worldwide.
              </p>
              <ul className="space-y-3 mb-8">
                {['Strict quality inspection on every production batch', 'Custom colors, thickness, and textures available', 'Fast sample delivery within 5 business days', 'Dedicated technical support team'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-outline group">
                Learn More About Us
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimateSection>

            <div className="grid sm:grid-cols-2 gap-5">
              {company.capabilities.map((cap, i) => {
                const IconComp = iconMap[cap.icon] || Award
                return (
                  <AnimateSection key={cap.title} delay={i * 100} direction="right">
                    <div className="bg-white rounded-2xl p-7 card-hover border border-primary-100 shadow-sm h-full">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <IconComp size={22} className="text-accent" />
                      </div>
                      <h3 className="font-display font-bold text-lg mb-2">{cap.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{cap.description}</p>
                    </div>
                  </AnimateSection>
                )
              })}
            </div>
          </div>
        </div>
      </section>

{/* ========== CTA Section ========== */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent-light to-accent-dark" />
        <div className="absolute inset-0 opacity-[0.07]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-primary-950 text-sm font-medium mb-8">
              <Quote size={14} />
              Get Started Today
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-950 mb-6 leading-tight">
              Ready to Find Your<br className="hidden sm:block" /> Perfect Leather?
            </h2>
            <p className="text-primary-950/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Get in touch with our team for free samples, technical consultation, or a customized quote. We're here to help you find the ideal material solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-950 text-white font-semibold rounded-xl hover:bg-primary-900 transition-all hover:scale-[1.03] shadow-lg shadow-primary-950/20">
                Request a Quote
                <ArrowRight size={18} />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent font-semibold rounded-xl hover:bg-gray-50 transition-all hover:scale-[1.03] shadow-lg shadow-white/30">
                Browse Products
              </Link>
            </div>
          </AnimateSection>
        </div>
      </section>
    </div>
  )
}
