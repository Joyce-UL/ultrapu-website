import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowDown } from 'lucide-react'

function AnimatedStat({ stat, delay }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = stat.value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= stat.value) {
        setCount(stat.value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, stat.value])

  return (
    <div className="text-center">
      <div className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-primary-950 mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-primary-500 font-medium tracking-wide uppercase">
        {stat.label}
      </div>
    </div>
  )
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background - Clean white with subtle yellow grid */}
      <div className="absolute inset-0 bg-white">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(64, 64, 64, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(64, 64, 64, 1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Accent orb top-right */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent/[0.06] blur-[100px]" />
        </div>

        {/* Accent orb bottom-left */}
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] overflow-hidden">
          <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-accent/[0.05] blur-[80px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">

          {/* Main Headline */}
          <h1
            className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-950 leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            High-Performance
            <span className="block text-accent">Synthetic Materials</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl text-primary-600 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
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
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-300 text-primary-800 font-semibold rounded-lg hover:border-accent hover:text-accent transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>

          {/* Stats Section - centered within max-w content */}
          <div className="mt-16 lg:mt-20">
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-8 lg:gap-20 max-w-3xl w-full">
                {[
                  { value: 50, suffix: '+', label: 'Product Series' },
                  { value: 20, suffix: '+', label: 'Countries Served' },
                  { value: 200, suffix: '+', label: 'Global Clients' },
                ].map((stat, i) => (
                  <AnimatedStat key={stat.label} stat={stat} delay={i * 100} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-xs text-primary-400 tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="text-accent animate-bounce" />
      </div>

    </section>
  )
}
