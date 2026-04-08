import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { productCategories } from '../data/products'

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

export default function Applications() {
  return (
    <div className="section-light">
      {/* Hero */}
      <section className="relative bg-primary-950 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 texture-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Industry Solutions</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Application Fields
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Our materials serve diverse industries — from fashion to automotive, from sports to professional protection.
            </p>
          </AnimateSection>
        </div>
      </section>

      {/* Application sections */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {productCategories.applications.map((app, i) => (
            <div key={app.id} id={app.id}>
              <AnimateSection>
                <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                  {/* Left: Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl">{app.image}</span>
                      <div>
                        <h2 className="heading-lg text-2xl sm:text-3xl">{app.name}</h2>
                        <p className="text-gray-500">{app.zhName}</p>
                      </div>
                    </div>
                    <div className="line-accent mb-6" />
                    <p className="text-gray-600 text-lg mb-6">{app.description}</p>

                    {/* Materials */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-3">Recommended Materials</h4>
                      <div className="flex flex-wrap gap-2">
                        {app.materials.map((m) => (
                          <span key={m} className="text-sm px-3 py-1.5 bg-accent/10 text-accent rounded-full font-medium border border-accent/30">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sub-categories for gloves */}
                    {app.subCategories && (
                      <div className="mb-6 bg-primary-50 rounded-xl p-4">
                        <h4 className="font-semibold text-sm text-gray-700 mb-3">Glove Categories</h4>
                        <div className="space-y-2">
                          {app.subCategories.map((sub) => (
                            <div key={sub.name} className="flex items-center gap-2">
                              <CheckCircle size={14} className="text-accent shrink-0" />
                              <div>
                                <span className="font-medium text-sm text-gray-800">{sub.name}</span>
                                <span className="text-gray-500 text-sm ml-2">— {sub.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link to="/contact" className="btn-primary">
                      Get Samples for {app.name}
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Right: Visual */}
                  <div className="flex-1">
                    <div
                      className="aspect-square max-w-md w-full rounded-3xl flex items-center justify-center relative overflow-hidden card-shine"
                      style={{ backgroundColor: app.color + '15', border: `1px solid ${app.color}30` }}
                    >
                      <span className="text-[120px] sm:text-[160px]">{app.image}</span>
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${app.color}20 0%, transparent 70%)`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </AnimateSection>

              {/* Divider */}
              {i < productCategories.applications.length - 1 && (
                <div className="border-t border-primary-200 mt-20" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Not Sure Which Material to Choose?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Our technical team can recommend the best material based on your specific application, performance requirements, and budget.
            </p>
            <Link to="/contact" className="btn-primary text-base px-8 py-4">
              Get Free Consultation
              <ArrowRight size={18} />
            </Link>
          </AnimateSection>
        </div>
      </section>
    </div>
  )
}
