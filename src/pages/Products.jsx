import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Filter, Grid, LayoutGrid } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { productCategories } from '../data/products'
import ProductCard from '../components/ProductCard'

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

export default function Products() {
  const [activeTab, setActiveTab] = useState('materials')
  const [viewMode, setViewMode] = useState('grid')

  const items = activeTab === 'materials'
    ? productCategories.materials
    : productCategories.applications

  return (
    <div className="section-light">
      {/* Page Hero */}
      <section className="relative bg-primary-950 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 texture-pattern opacity-30" />
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Our Catalog</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Product Series
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              From classic PU leather to cutting-edge specialty materials — explore our complete range designed for every industry.
            </p>
          </AnimateSection>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-40 bg-white border-b border-primary-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Tabs */}
            <div className="flex gap-2">
              {[
                { id: 'materials', label: 'By Material' },
                { id: 'applications', label: 'By Application' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-accent text-primary-950'
                      : 'bg-primary-100 text-gray-600 hover:bg-primary-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-primary-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid size={16} className={viewMode === 'grid' ? 'text-accent' : 'text-gray-400'} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <LayoutGrid size={16} className={viewMode === 'list' ? 'text-accent' : 'text-gray-400'} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'materials' ? (
            <>
              <div className="mb-12">
                <h2 className="heading-lg text-2xl sm:text-3xl mb-2">By Material Type</h2>
                <div className="line-accent mb-4" />
                <p className="text-gray-600">Choose the material that best fits your product requirements.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, i) => (
                  <AnimateSection key={item.id} delay={i * 80}>
                    <ProductCard product={item} type="material" />
                  </AnimateSection>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="heading-lg text-2xl sm:text-3xl mb-2">By Application</h2>
                <div className="line-accent mb-4" />
                <p className="text-gray-600">Find the perfect material for your specific industry.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, i) => (
                  <AnimateSection key={item.id} delay={i * 80}>
                    <ProductCard product={item} type="application" />
                  </AnimateSection>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Need Custom Material?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              We offer custom color matching, thickness adjustment, and functional finishes. Contact us to discuss your specific requirements.
            </p>
            <Link to="/contact" className="btn-primary text-base px-8 py-4">
              Request Custom Sample
              <ArrowRight size={18} />
            </Link>
          </AnimateSection>
        </div>
      </section>
    </div>
  )
}
