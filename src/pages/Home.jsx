import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Shield, Leaf, Zap, ChevronRight, Factory, Globe, Users, Clock, CheckCircle2, Quote } from 'lucide-react'
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

      {/* ========== Scroll-Triggered Features Section ========== */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-primary-50/30" />
        <div className="absolute inset-0 backdrop-blur-xl" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/3 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <AnimateSection className="text-center mb-16">
            <span className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
              Why Choose UltraPU
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl mb-4">
              Core Advantages
            </h2>
            <div className="w-16 h-[2px] bg-accent rounded-full mx-auto mb-6" />
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Partner with a manufacturer committed to quality, innovation, and customer success.
            </p>
          </AnimateSection>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1: Premium Quality */}
            <AnimateSection delay={0} direction="left">
              <div className="group relative h-full bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-primary-100/50 shadow-sm hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield size={28} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-primary-950 group-hover:text-accent transition-colors">
                    Premium Quality
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Strict quality inspection on every production batch to ensure consistency and excellence.
                  </p>
                </div>
              </div>
            </AnimateSection>

            {/* Feature 2: Custom Solutions */}
            <AnimateSection delay={100} direction="up">
              <div className="group relative h-full bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-primary-100/50 shadow-sm hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award size={28} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-primary-950 group-hover:text-accent transition-colors">
                    Custom Solutions
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Colors, thickness, and textures fully customizable to meet your specific requirements.
                  </p>
                </div>
              </div>
            </AnimateSection>

            {/* Feature 3: Fast Delivery */}
            <AnimateSection delay={200} direction="right">
              <div className="group relative h-full bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-primary-100/50 shadow-sm hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap size={28} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-primary-950 group-hover:text-accent transition-colors">
                    Fast Delivery
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sample delivery within 5 business days. Fast production lead times for urgent orders.
                  </p>
                </div>
              </div>
            </AnimateSection>

            {/* Feature 4: Global Logistics */}
            <AnimateSection delay={300} direction="left">
              <div className="group relative h-full bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-primary-100/50 shadow-sm hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Globe size={28} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-primary-950 group-hover:text-accent transition-colors">
                    Global Logistics
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    International shipping to 20+ countries with reliable logistics partners worldwide.
                  </p>
                </div>
              </div>
            </AnimateSection>

            {/* Feature 5: Technical Support */}
            <AnimateSection delay={400} direction="up">
              <div className="group relative h-full bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-primary-100/50 shadow-sm hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users size={28} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-primary-950 group-hover:text-accent transition-colors">
                    Technical Support
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Professional R&D team providing technical consultation and product development support.
                  </p>
                </div>
              </div>
            </AnimateSection>

            {/* Feature 6: Eco Certified */}
            <AnimateSection delay={500} direction="right">
              <div className="group relative h-full bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-primary-100/50 shadow-sm hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Leaf size={28} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-primary-950 group-hover:text-accent transition-colors">
                    Eco Certified
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    REACH, OEKO-Tex, and GRS certified products meeting international environmental standards.
                  </p>
                </div>
              </div>
            </AnimateSection>
          </div>
        </div>
      </section>

      <SectionDivider />

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

      {/* ========== Trusted By / Key Stats ========== */}
      <section className="py-20 lg:py-24 bg-primary-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: '50+', label: 'Product Series', icon: Zap },
              { value: '20+', label: 'Countries Served', icon: Globe },
              { value: '200+', label: 'Global Clients', icon: Users },
              { value: '4', label: 'International Certifications', icon: Shield },
            ].map((stat, i) => (
              <AnimateSection key={stat.label} delay={i * 80} className="text-center">
                <stat.icon size={24} className="text-accent mx-auto mb-3" strokeWidth={1.5} />
                <div className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-primary-950 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </AnimateSection>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ========== Certifications ========== */}
      <section className="section-dark py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 texture-pattern" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Quality Assurance"
            title="Certified & Trusted"
            description="All products meet international quality and safety standards, ensuring reliability for every partner."
            light={true}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16">
            {company.certifications.map((cert, i) => {
              const IconComp = cert.icon === 'shield' ? Shield : cert.icon === 'leaf' ? Leaf : cert.icon === 'recycle' ? Leaf : CheckCircle2
              return (
                <AnimateSection key={cert.name} delay={i * 100}>
                  <div className="card-shine bg-surface-card border border-surface-border rounded-2xl p-8 text-center card-hover h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                      <IconComp size={30} className="text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">{cert.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{cert.description}</p>
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

      {/* ========== Applications ========== */}
      <section className="section-dark py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Applications"
            title="Industry Solutions"
            description="Our leather materials serve a wide range of industries, from footwear and automotive to fashion and professional sports."
            light={true}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
            {productCategories.applications.map((app, i) => (
              <AnimateSection key={app.id} delay={i * 80}>
                <Link
                  to={`/applications#${app.id}`}
                  className="block card-shine group bg-surface-card border border-surface-border rounded-2xl p-7 card-hover h-full"
                >
                  <div className="text-5xl mb-5">{app.image}</div>
                  <h3 className="font-display font-bold text-xl text-white mb-1 group-hover:text-accent transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{app.zhName}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{app.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {app.materials.slice(0, 3).map((m) => (
                      <span key={m} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </Link>
              </AnimateSection>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider dark={true} />

      {/* ========== New Arrivals Preview ========== */}
      <section className="section-light py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
                What's New
              </span>
              <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl">New Arrivals</h2>
            </div>
            <Link to="/new-arrivals" className="btn-outline group shrink-0">
              View All New Products
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.slice(0, 3).map((item, i) => (
              <AnimateSection key={item.id} delay={i * 100}>
                <div className="group">
                  <div
                    className="h-56 rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden card-shine"
                    style={{ backgroundColor: item.color + '15', border: `1px solid ${item.color}20` }}
                  >
                    <span className="text-6xl transition-transform duration-500 group-hover:scale-110">
                      {item.application.includes('Gloves') ? '🧤' : item.application.includes('Sports') ? '⚽' : '🚗'}
                    </span>
                    {item.isNew && (
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-accent text-primary-950 text-xs font-bold rounded-full">
                        NEW
                      </div>
                    )}
                  </div>
                  <div className="space-y-2.5">
                    <span className="text-xs text-accent font-semibold tracking-wide">{item.series}</span>
                    <h3 className="font-display font-bold text-lg group-hover:text-accent transition-colors">{item.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-xs px-2.5 py-1 bg-primary-50 text-gray-600 rounded-full border border-primary-100">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== News / Updates ========== */}
      <section className="section-dark py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Updates"
            title="Latest News"
            light={true}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16">
            {newsItems.map((item, i) => (
              <AnimateSection key={item.id} delay={i * 100}>
                <NewsCard news={item} />
              </AnimateSection>
            ))}
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
