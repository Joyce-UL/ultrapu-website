import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowDown } from 'lucide-react'

// Simplified, modern Hero component - B2B professional style
export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] lg:min-h-[900px] overflow-hidden">
      {/* Background - Gradient with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-surface-dark">
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Elegant gradient orbs */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vh] overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/[0.05] blur-[120px]" />
          <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-accent/[0.03] blur-[80px]" />
        </div>

        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] overflow-hidden">
          <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent/[0.04] blur-[100px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
          
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-8 transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[-20px] opacity-0'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Premium Synthetic Leather Manufacturer
          </div>

          {/* Main Headline */}
          <h1
            className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            High-Performance
            <span className="block text-gradient">Synthetic Materials</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            Waterborne PU, microfiber & specialty materials engineered for automotive, footwear & professional applications.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <Link 
              to="/products" 
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-950 font-semibold rounded-lg hover:bg-accent-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
            >
              Explore Products
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="text-accent/60 animate-bounce" />
      </div>

    </section>
  )
}
