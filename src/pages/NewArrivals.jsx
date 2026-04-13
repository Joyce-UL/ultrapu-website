import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { newArrivals, productCategories } from '../data/products'

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

export default function NewArrivals() {
  useEffect(() => {
    document.title = 'New Arrivals - Latest Products | UltraPU'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Discover our latest PU leather and microfiber products. Stay updated with new arrivals in synthetic leather materials.')
    }
  }, [])

  return (
    <div className="section-light">
      {/* Hero */}
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 texture-pattern" />
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent/[0.06] blur-3xl animate-pulse" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6">
              <Sparkles size={16} className="fill-current" />
              Just Released
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-950 mb-6">
              New Arrivals
            </h1>
            <p className="text-primary-600 max-w-2xl mx-auto text-lg">
              Discover our latest material innovations — fresh colors, new technologies, and upgraded performance.
            </p>
          </AnimateSection>
        </div>
      </section>

      {/* New Products Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.map((item, i) => (
              <AnimateSection key={item.id} delay={i * 120}>
                <article className="group bg-white rounded-2xl border border-primary-200 overflow-hidden card-hover">
                  {/* Image */}
                  <div
                    className="h-56 relative flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: item.color + '15' }}
                  >
                    <span className="text-8xl transform group-hover:scale-110 transition-transform duration-500">
                      {item.application.includes('Gloves') ? '🧤' : item.application.includes('Sports') ? '⚽' : '🚗'}
                    </span>
                    {item.isNew && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-primary-950 text-xs font-bold rounded-full flex items-center gap-1">
                        <Sparkles size={12} className="fill-current" />
                        NEW
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-2 py-1 bg-accent/10 text-accent rounded-full">
                        {item.series}
                      </span>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3 group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.features.map((f) => (
                        <span key={f} className="text-xs px-2 py-1 bg-primary-50 text-gray-700 rounded-full border border-primary-200">
                          {f}
                        </span>
                      ))}
                    </div>
                    <Link to="/contact" className="btn-outline text-sm w-full justify-center">
                      Request Sample
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              </AnimateSection>
            ))}
          </div>
        </div>
      </section>

      {/* Other Materials */}
      <section className="bg-primary-50 py-16 sm:py-20 border-t border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection className="mb-10">
            <h2 className="heading-lg text-2xl sm:text-3xl mb-2">Also Available</h2>
            <div className="line-accent mb-4" />
          </AnimateSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {productCategories.materials.filter(m => !newArrivals.find(n => n.series.includes(m.name))).map((mat, i) => (
              <AnimateSection key={mat.id} delay={i * 80}>
                <div className="bg-white rounded-xl border border-primary-200 p-5 flex items-center gap-4 card-hover">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                    style={{ backgroundColor: mat.color + '15' }}
                  >
                    {mat.id === 'pu-leather' ? '🟫' : mat.id === 'microfiber' ? '🔵' : '🟠'}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm">{mat.name}</h4>
                    <p className="text-gray-500 text-xs">{mat.zhName}</p>
                  </div>
                </div>
              </AnimateSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
