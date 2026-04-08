import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Play, ArrowDown, Star } from 'lucide-react'
import { company, socialLinks } from '../data/company'

// Animated counter component
function CountUp({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [typedText, setTypedText] = useState('')
  const fullText = "Premium Synthetic Leather for the World"
  const typingRef = useRef(null)

  // Typewriter effect
  useEffect(() => {
    let i = 0
    typingRef.current = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(typingRef.current)
      }
    }, 50)
    return () => clearInterval(typingRef.current)
  }, [])

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slides = [
    {
      bg: 'bg-gradient-to-br from-primary-950 via-surface-dark to-primary-900',
      badge: '🌟 New Arrivals',
      title: 'Suedeking Series',
      subtitle: '超高色牢度彩色绒面皮革，远超市面同类产品',
      cta: 'Explore Series',
      ctaLink: '/products',
      pattern: true,
    },
    {
      bg: 'bg-gradient-to-br from-surface-dark via-primary-950 to-surface-card',
      badge: '🧤 Performance',
      title: 'E-Color Series',
      subtitle: '触屏导电绒面，专为智能手套而生',
      cta: 'View Details',
      ctaLink: '/products',
      pattern: false,
    },
    {
      bg: 'bg-gradient-to-br from-primary-900 via-surface-dark to-primary-950',
      badge: '🏭 Leading Supplier',
      title: 'Premium Microfiber',
      subtitle: '40% PU + 60% Nylon 超细纤维结构',
      cta: 'Get Samples',
      ctaLink: '/contact',
      pattern: true,
    },
  ]

  const slide = slides[currentSlide]

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${s.bg} ${
            i === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Texture Pattern */}
          {s.pattern && (
            <div className="absolute inset-0 texture-pattern opacity-30" />
          )}

          {/* Geometric shapes */}
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-accent/5 blur-2xl animate-pulse-slow" />
          <div className="absolute top-40 left-1/4 w-2 h-2 rounded-full bg-accent animate-pulse" />

          {/* Decorative lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="30%" x2="100%" y2="70%" stroke="#C9A96E" strokeWidth="0.5" />
            <line x1="30%" y1="100%" x2="70%" y2="0%" stroke="#C9A96E" strokeWidth="0.5" />
          </svg>
        </div>
      ))}

      {/* Overlay gradient */}
      <div className="hero-gradient absolute inset-0" />

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6 transition-all duration-700 ${
                currentSlide === 0 ? 'translate-x-0 opacity-100' : 'translate-x-[-20px] opacity-0'
              }`}
            >
              <Star size={14} className="fill-current" />
              {slide.badge}
            </div>

            {/* Headline */}
            <h1
              className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 transition-all duration-700 ${
                currentSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {slide.title}
              <span className="block text-gradient mt-2">{company.slogan.en}</span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-lg sm:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed transition-all duration-700 delay-100 ${
                currentSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {slide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-200 ${
                currentSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <Link to={slide.ctaLink} className="btn-primary text-base px-8 py-4">
                {slide.cta}
                <ChevronRight size={18} />
              </Link>
              <Link to="/products" className="btn-outline-white text-base px-8 py-4">
                View All Products
              </Link>
            </div>

            {/* Social proof mini */}
            <div
              className={`mt-12 flex items-center gap-6 transition-all duration-700 delay-300 ${
                currentSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dark border-2 border-primary-950 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-950">{i}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-white font-semibold">200+</span> clients worldwide
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === currentSlide ? 'w-8 bg-accent' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="text-accent" />
      </div>

      {/* Quick stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-primary-950/90 backdrop-blur-sm border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-accent">
                <CountUp target={2023} suffix="" />+
              </div>
              <div className="text-xs text-gray-400 mt-1">Established</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-accent">
                <CountUp target={50} suffix="+" />
              </div>
              <div className="text-xs text-gray-400 mt-1">Product Series</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-accent">
                <CountUp target={20} suffix="+" />
              </div>
              <div className="text-xs text-gray-400 mt-1">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-accent">
                4
              </div>
              <div className="text-xs text-gray-400 mt-1">Certifications</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
