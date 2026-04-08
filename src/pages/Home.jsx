import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Shield, Leaf, Zap, ChevronRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { company } from '../data/company'
import { productCategories, newArrivals, newsItems } from '../data/products'
import ProductCard from '../components/ProductCard'
import NewsCard from '../components/NewsCard'
import Hero from '../components/Hero'

// Animated section wrapper
function AnimateSection({ children, className = '', delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const iconMap = {
  award: Award,
  shield: Shield,
  leaf: Leaf,
  zap: Zap,
  layers: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  globe: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
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

      {/* Products Preview */}
      <section className="section-light py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection className="text-center mb-16">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Our Products</span>
            <h2 className="heading-xl text-3xl sm:text-4xl md:text-5xl mb-4">
              Premium Leather Materials
            </h2>
            <div className="line-accent mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From classic PU leather to cutting-edge microfiber and specialty series — we have the perfect material for every application.
            </p>
          </AnimateSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.materials.map((mat, i) => (
              <AnimateSection key={mat.id} delay={i * 100}>
                <ProductCard product={mat} type="material" />
              </AnimateSection>
            ))}
          </div>

          <AnimateSection className="text-center mt-12">
            <Link to="/products" className="btn-outline text-base">
              View All Products
              <ArrowRight size={18} />
            </Link>
          </AnimateSection>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-dark py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 texture-pattern" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateSection className="text-center mb-16">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Quality Assurance</span>
            <h2 className="heading-xl text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              Certified & Trusted
            </h2>
            <div className="line-accent mx-auto mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              All products meet international quality and safety standards
            </p>
          </AnimateSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.certifications.map((cert, i) => {
              const IconComp = cert.icon === 'shield' ? Shield : cert.icon === 'leaf' ? Leaf : cert.icon === 'recycle' ? Leaf : Award
              return (
                <AnimateSection key={cert.name} delay={i * 100}>
                  <div className="card-shine bg-surface-card border border-surface-border rounded-2xl p-6 text-center card-hover">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <IconComp size={32} className="text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">{cert.name}</h3>
                    <p className="text-gray-400 text-sm">{cert.description}</p>
                  </div>
                </AnimateSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-light py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateSection>
              <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Why Choose Us</span>
              <h2 className="heading-xl text-3xl sm:text-4xl md:text-5xl mb-6">
                Our Core Advantages
              </h2>
              <div className="line-accent mb-6" />
              <p className="text-gray-600 text-lg mb-8">
                With professional R&D capabilities, strict quality control, and a customer-first service philosophy, we deliver exceptional value to partners worldwide.
              </p>
              <Link to="/about" className="btn-outline">
                Learn More About Us
                <ChevronRight size={18} />
              </Link>
            </AnimateSection>

            <div className="grid sm:grid-cols-2 gap-6">
              {company.capabilities.map((cap, i) => {
                const IconComp = iconMap[cap.icon] || Award
                return (
                  <AnimateSection key={cap.title} delay={i * 100}>
                    <div className="bg-primary-50 rounded-2xl p-6 card-hover border border-primary-200">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <IconComp size={24} className="text-accent" />
                      </div>
                      <h3 className="font-display font-bold text-lg mb-2">{cap.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{cap.description}</p>
                    </div>
                  </AnimateSection>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section-dark py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection className="text-center mb-16">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Applications</span>
            <h2 className="heading-xl text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              Industry Solutions
            </h2>
            <div className="line-accent mx-auto mb-6" />
          </AnimateSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.applications.map((app, i) => (
              <AnimateSection key={app.id} delay={i * 80}>
                <Link
                  to={`/applications#${app.id}`}
                  className="block card-shine group bg-surface-card border border-surface-border rounded-2xl p-6 card-hover"
                >
                  <div className="text-5xl mb-4">{app.image}</div>
                  <h3 className="font-display font-bold text-xl text-white mb-1 group-hover:text-accent transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{app.zhName}</p>
                  <p className="text-gray-500 text-sm">{app.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {app.materials.slice(0, 2).map((m) => (
                      <span key={m} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
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

      {/* New Arrivals Preview */}
      <section className="section-light py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">What's New</span>
              <h2 className="heading-xl text-3xl sm:text-4xl md:text-5xl">New Arrivals</h2>
            </div>
            <Link to="/new-arrivals" className="btn-outline mt-4 sm:mt-0">
              View All New Products
              <ArrowRight size={18} />
            </Link>
          </AnimateSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.slice(0, 3).map((item, i) => (
              <AnimateSection key={item.id} delay={i * 100}>
                <div className="group">
                  <div
                    className="h-48 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden card-shine"
                    style={{ backgroundColor: item.color + '20', border: `1px solid ${item.color}30` }}
                  >
                    <span className="text-6xl">{item.application.includes('Gloves') ? '🧤' : item.application.includes('Sports') ? '⚽' : '🚗'}</span>
                    {item.isNew && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-accent text-primary-950 text-xs font-bold rounded-full">
                        NEW
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs text-accent font-semibold">{item.series}</span>
                    <h3 className="font-display font-bold text-lg group-hover:text-accent transition-colors">{item.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-xs px-2 py-1 bg-primary-100 text-gray-700 rounded-full">
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

      {/* News */}
      <section className="section-dark py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection className="text-center mb-12">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Updates</span>
            <h2 className="heading-xl text-3xl sm:text-4xl md:text-5xl text-white mb-4">Latest News</h2>
            <div className="line-accent mx-auto" />
          </AnimateSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsItems.map((item, i) => (
              <AnimateSection key={item.id} delay={i * 100}>
                <NewsCard news={item} />
              </AnimateSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-dark" />
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-950 mb-6">
              Ready to Find Your Perfect Leather?
            </h2>
            <p className="text-primary-950/70 text-lg mb-8 max-w-2xl mx-auto">
              Get in touch with our team for free samples, technical consultation, or a customized quote. We're here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-950 text-white font-semibold rounded-lg hover:bg-primary-900 transition-all hover:scale-105">
                Request a Quote
                <ArrowRight size={18} />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent font-semibold rounded-lg hover:bg-gray-100 transition-all hover:scale-105">
                Browse Products
              </Link>
            </div>
          </AnimateSection>
        </div>
      </section>
    </div>
  )
}


