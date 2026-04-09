import React from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'

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

const patterns = [
  { id: 'p1', name: 'Litchi Grain', nameZh: '荔枝纹', description: 'Classic leather texture with small, uniform grain pattern', category: 'Embossed' },
  { id: 'p2', name: 'Cross Grain', nameZh: '十字纹', description: 'Elegant cross-hatch pattern, popular for high-end bags', category: 'Embossed' },
  { id: 'p3', name: 'Nappa', nameZh: '纳帕纹', description: 'Smooth, soft texture with minimal grain', category: 'Plain' },
  { id: 'p4', name: 'Crazy Horse', nameZh: '疯马纹', description: 'Vintage pull-up effect that changes color when stretched', category: 'Special' },
  { id: 'p5', name: 'Saffiano', nameZh: '十字纹', description: 'Diagonal cross-hatch with wax finish, scratch-resistant', category: 'Embossed' },
  { id: 'p6', name: 'Pebbled', nameZh: '卵石纹', description: 'Rounded, irregular grain pattern resembling pebbles', category: 'Embossed' },
  { id: 'p7', name: 'Crocodile', nameZh: '鳄鱼纹', description: 'Exotic crocodile skin pattern', category: 'Animal Print' },
  { id: 'p8', name: 'Snake', nameZh: '蛇纹', description: 'Elegant snake skin pattern with scale texture', category: 'Animal Print' },
  { id: 'p9', name: 'Patent', nameZh: '漆皮纹', description: 'High-gloss, mirror-like finish', category: 'Special' },
  { id: 'p10', name: 'Suede', nameZh: '绒面', description: 'Soft, napped surface with velvet touch', category: 'Plain' },
  { id: 'p11', name: 'Carbon Fiber', nameZh: '碳纤维纹', description: 'Modern carbon fiber weave pattern', category: 'Technical' },
  { id: 'p12', name: 'Perforated', nameZh: '打孔纹', description: 'Pattern with small holes for breathability', category: 'Technical' },
]

export default function Patterns() {
  const { t } = useLanguage()

  return (
    <div className="section-light">
      {/* Hero */}
      <section className="relative bg-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 texture-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Texture Collection</span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-950 mb-4">
              Available Patterns
            </h1>
            <p className="text-primary-600 max-w-2xl mx-auto text-lg">
              Explore our comprehensive collection of surface textures and patterns. Custom patterns available upon request.
            </p>
          </AnimateSection>
        </div>
      </section>

      {/* Patterns Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {patterns.map((pattern, i) => (
              <AnimateSection key={pattern.id} delay={i * 50}>
                <div className="bg-white rounded-xl shadow-sm border border-primary-200 overflow-hidden hover:shadow-lg hover:border-accent transition-all group">
                  <div className="aspect-square bg-primary-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                    🎨
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                      {pattern.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-2">{pattern.name}</h3>
                    <p className="text-sm text-gray-500">{pattern.nameZh}</p>
                    <p className="text-sm text-gray-600 mt-2">{pattern.description}</p>
                  </div>
                </div>
              </AnimateSection>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Pattern CTA */}
      <section className="bg-primary-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-950 mb-4">
              Need a Custom Pattern?
            </h2>
            <p className="text-primary-600 mb-8">
              We can create custom embossed patterns based on your design. Send us your pattern requirements.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 bg-accent text-primary-950 font-semibold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors">
              Request Custom Pattern
            </a>
          </AnimateSection>
        </div>
      </section>
    </div>
  )
}
