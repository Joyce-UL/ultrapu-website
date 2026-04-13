import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Shield, Leaf, CheckCircle, Target, Eye, Heart } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { company } from '../data/company'

function AnimateSection({ children, className = '', delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const certIconMap = {
  shield: Shield,
  leaf: Leaf,
  recycle: Leaf,
  check: CheckCircle,
  award: Award,
}

export default function About() {
  useEffect(() => {
    document.title = 'About Us - Leading PU Leather Manufacturer | UltraPU'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn about Dongguan Ultra Leather, a leading manufacturer of premium PU leather and microfiber materials with 15+ years of experience in synthetic leather production.')
    }
  }, [])
  return (
    <div className="section-light">
      {/* Hero */}
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 texture-pattern" />
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent/[0.06] blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">About Us</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-950 mb-6">
              Who We Are
            </h1>
            <p className="text-primary-600 max-w-2xl mx-auto text-lg">
              A modern enterprise dedicated to premium synthetic leather solutions, serving clients across the globe.
            </p>
          </AnimateSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateSection>
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-accent/10 to-primary-200 flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-6xl">🧵</span>
                  </div>
                  <p className="text-gray-500 text-sm">Est. {company.established}</p>
                </div>
                <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-accent/10" />
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-accent/10" />
              </div>
            </AnimateSection>

            <AnimateSection delay={100}>
              <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Our Story</span>
              <h2 className="heading-xl text-3xl sm:text-4xl mb-6">Premium Leather, Within Reach</h2>
              <div className="line-accent mb-6" />
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {company.description.en}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With a foundation built on quality, innovation, and customer trust, we have grown from a local supplier to a global partner, serving clients in over 20 countries. Our commitment to excellence drives every decision we make.
              </p>
              <Link to="/contact" className="btn-outline">
                Partner With Us
                <ArrowRight size={18} />
              </Link>
            </AnimateSection>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values */}
      <section className="py-16 sm:py-24 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                desc: 'To deliver premium synthetic leather materials that exceed client expectations in quality, innovation, and value.'
              },
              {
                icon: Eye,
                title: 'Our Vision',
                desc: 'To be the most trusted global partner for synthetic leather solutions, setting industry standards for quality and sustainability.'
              },
              {
                icon: Heart,
                title: 'Our Values',
                desc: 'Quality first, innovation driven, customer focused, and eco responsible. These principles guide every product we make.'
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <AnimateSection key={item.title} delay={i * 120}>
                  <div className="bg-white rounded-2xl p-8 border border-primary-200 card-hover h-full">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                      <Icon size={28} className="text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </AnimateSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection className="text-center mb-14">
            <h2 className="heading-xl text-3xl sm:text-4xl mb-4">Our Values</h2>
            <div className="line-accent mx-auto" />
          </AnimateSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.values.map((val, i) => (
              <AnimateSection key={val.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 border border-primary-200 text-center card-hover">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-display font-bold text-accent">{i + 1}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1">{val.title}</h3>
                  <p className="text-gray-600 text-sm">{val.desc}</p>
                </div>
              </AnimateSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-primary-100 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection className="text-center mb-14">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Certifications</span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-primary-950 mb-4">Quality You Can Trust</h2>
            <div className="line-accent mx-auto mb-6" />
            <p className="text-primary-600 max-w-2xl mx-auto">
              All our materials meet rigorous international standards for safety, quality, and environmental responsibility.
            </p>
          </AnimateSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.certifications.map((cert, i) => {
              const IconComp = certIconMap[cert.icon] || Shield
              return (
                <AnimateSection key={cert.name} delay={i * 100}>
                  <div className="card-shine bg-white border border-primary-200 rounded-2xl p-8 text-center card-hover shadow-sm">
                    <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                      <IconComp size={36} className="text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-primary-950 mb-2">{cert.name}</h3>
                    <p className="text-primary-500 text-sm font-medium mb-2">{cert.fullName}</p>
                    <p className="text-gray-500 text-xs">{cert.description}</p>
                  </div>
                </AnimateSection>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
