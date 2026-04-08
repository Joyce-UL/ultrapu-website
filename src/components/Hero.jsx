import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowDown, Award, Globe, Factory, Shield } from 'lucide-react'
import { company } from '../data/company'

// Animated counter component with improved animation
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
      { threshold: 0.3 }
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
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

// Floating decorative element component
function FloatingDecor({ className, delay = 0 }) {
  return (
    <div
      className={`absolute rounded-full ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

// Animated line decoration
function AnimatedLine({ className = "" }) {
  return (
    <div className={`h-px bg-gradient-to-r from-transparent via-accent to-transparent ${className}`} />
  )
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  // Entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Auto-rotate slides with smooth transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  // Slides configuration - more professional and focused on B2B
  const slides = [
    {
      badge: 'Leading Manufacturer',
      title: 'Premium Synthetic',
      titleHighlight: 'Leather Solutions',
      subtitle: 'Engineering high-performance PU leather, microfiber & specialty materials for global brands since 2023.',
      cta: 'Explore Products',
      ctaLink: '/products',
      secondaryCta: 'Get a Quote',
      secondaryLink: '/contact',
      bgGradient: 'from-primary-950 via-surface-dark to-primary-900',
      accentColor: 'accent',
      stats: [
        { icon: Factory, value: '10,000+', label: 'Monthly Output (m²)' },
        { icon: Globe, value: '20+', label: 'Countries Served' },
        { icon: Award, value: '50+', label: 'Product Series' },
        { icon: Shield, value: '4', label: 'Certifications' },
      ],
    },
    {
      badge: 'Innovation Hub',
      title: 'Waterborne',
      titleHighlight: 'Technology',
      subtitle: 'Eco-conscious waterborne PU series with superior color fastness, meeting REACH & OEKO-TEX standards.',
      cta: 'View Series',
      ctaLink: '/products',
      secondaryCta: 'Request Samples',
      secondaryLink: '/contact',
      bgGradient: 'from-surface-dark via-primary-950 to-primary-900',
      accentColor: 'accent-light',
      stats: [
        { icon: Shield, value: 'REACH', label: 'Certified' },
        { icon: Globe, value: '0', label: 'VOC Emissions' },
        { icon: Award, value: 'A+', label: 'Safety Rating' },
        { icon: Globe, value: '100%', label: 'Water-Based' },
      ],
    },
    {
      badge: 'Industry Solutions',
      title: 'Performance',
      titleHighlight: 'Materials',
      subtitle: 'From automotive interiors to professional gloves, our materials deliver exceptional durability & comfort.',
      cta: 'View Applications',
      ctaLink: '/applications',
      secondaryCta: 'Contact Sales',
      secondaryLink: '/contact',
      bgGradient: 'from-primary-900 via-surface-dark to-primary-950',
      accentColor: 'accent',
      stats: [
        { icon: Factory, value: '5', label: 'Industry Sectors' },
        { icon: Award, value: '10+', label: 'Years Experience' },
        { icon: Globe, value: '50+', label: 'Brand Partners' },
        { icon: Shield, value: '99%', label: 'Quality Rate' },
      ],
    },
    {
      badge: 'Custom Solutions',
      title: 'Tailored',
      titleHighlight: 'Partnerships',
      subtitle: 'Custom color matching, thickness optimization & specialized formulations to meet your unique requirements.',
      cta: 'Start Project',
      ctaLink: '/contact',
      secondaryCta: 'View Capabilities',
      secondaryLink: '/about',
      bgGradient: 'from-primary-950 via-primary-900 to-surface-dark',
      accentColor: 'accent-light',
      stats: [
        { icon: Award, value: '48h', label: 'Sample Delivery' },
        { icon: Globe, value: '100%', label: 'Custom Colors' },
        { icon: Factory, value: 'MOQ', label: 'Flexible' },
        { icon: Shield, value: '24/7', label: 'Support' },
      ],
    },
  ]

  const slide = slides[currentSlide]

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] lg:min-h-[800px] overflow-hidden">
      {/* Background Layer */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-all duration-1000 ease-out`}>
        
        {/* Sophisticated texture overlay */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
              opacity: 0.3,
            }}
          />
        </div>

        {/* Elegant geometric decorations */}
        <div className="absolute top-0 right-0 w-[50vw] h-[800px] overflow-hidden">
          <div className="absolute top-20 right-[10vw] w-96 h-96 rounded-full bg-accent/[0.03] blur-3xl animate-float" />
          <div className="absolute top-40 right-[15vw] w-64 h-64 rounded-full bg-accent/[0.05] blur-2xl animate-pulse-slow" />
          <div className="absolute top-60 right-[20vw] w-32 h-32 rounded-full bg-accent/[0.08] blur-xl animate-float" />
        </div>

        <div className="absolute bottom-0 left-0 w-[40vw] h-[600px] overflow-hidden">
          <div className="absolute bottom-20 left-[5vw] w-64 h-64 rounded-full bg-accent/[0.04] blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-40 left-[10vw] w-48 h-48 rounded-full bg-accent/[0.03] blur-2xl animate-float" />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `linear-gradient(rgba(201, 169, 110, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 110, 0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Elegant diagonal lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="#C9A96E" strokeWidth="1" />
          <line x1="20%" y1="0%" x2="100%" y2="80%" stroke="#C9A96E" strokeWidth="0.5" />
          <line x1="0%" y1="40%" x2="60%" y2="100%" stroke="#C9A96E" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6 transition-all duration-700 ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-30px] opacity-0'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {slide.badge}
              </div>

              {/* Headline */}
              <h1
                className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4 transition-all duration-700 delay-100 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              >
                {slide.title}
                <span className="block text-gradient mt-1">{slide.titleHighlight}</span>
              </h1>

              {/* Animated line */}
              <div className={`mb-6 transition-all duration-700 delay-150 ${isVisible ? 'w-20 opacity-100' : 'w-0 opacity-0'}`}>
                <AnimatedLine />
              </div>

              {/* Subtitle */}
              <p
                className={`text-lg sm:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed transition-all duration-700 delay-200 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              >
                {slide.subtitle}
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              >
                <Link 
                  to={slide.ctaLink} 
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-950 font-semibold rounded-lg hover:bg-accent-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20 active:scale-95"
                >
                  {slide.cta}
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to={slide.secondaryLink} 
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                >
                  {slide.secondaryCta}
                </Link>
              </div>

              {/* Trust indicators */}
              <div
                className={`mt-10 flex items-center gap-6 transition-all duration-700 delay-400 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              >
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Shield size={16} className="text-accent" />
                  <span>REACH & OEKO-TEX Certified</span>
                </div>
                <div className="w-px h-4 bg-gray-600" />
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Globe size={16} className="text-accent" />
                  <span>Global Shipping</span>
                </div>
              </div>
            </div>

            {/* Right Visual Element - Abstract leather texture representation */}
            <div className="lg:col-span-5 hidden lg:block">
              <div
                className={`relative transition-all duration-1000 delay-300 ${
                  isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-20 opacity-0 scale-95'
                }`}
              >
                {/* Main visual card */}
                <div className="relative">
                  {/* Decorative rings */}
                  <div className="absolute -inset-8">
                    <div className="absolute inset-0 rounded-full border border-accent/10 animate-spin-slow" style={{ animationDuration: '30s' }} />
                    <div className="absolute inset-4 rounded-full border border-accent/15" />
                    <div className="absolute inset-8 rounded-full border border-accent/20" />
                  </div>
                  
                  {/* Central visual */}
                  <div className="relative bg-gradient-to-br from-surface-card to-surface-dark rounded-3xl p-8 border border-surface-border backdrop-blur-sm">
                    {/* Stats display */}
                    <div className="grid grid-cols-2 gap-4">
                      {slide.stats.map((stat, index) => (
                        <div 
                          key={index}
                          className="bg-primary-950/50 rounded-2xl p-4 text-center border border-surface-border/50"
                          style={{
                            animation: `fadeUp 0.5s ease-out forwards`,
                            animationDelay: `${0.5 + index * 0.1}s`,
                            opacity: 0,
                          }}
                        >
                          <stat.icon size={20} className="mx-auto mb-2 text-accent/80" />
                          <div className="text-xl font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Brand badge */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>Premium Quality Guaranteed</span>
                    </div>
                  </div>

                  {/* Floating accent elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-accent/20 backdrop-blur-sm animate-float border border-accent/30" />
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl bg-accent/10 backdrop-blur-sm animate-pulse-slow border border-accent/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`group relative h-2 rounded-full transition-all duration-500 ${
              i === currentSlide ? 'w-12 bg-accent' : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === currentSlide && (
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-accent whitespace-nowrap opacity-80">
                {slides[i].badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="text-accent animate-bounce" />
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-primary-950/95 backdrop-blur-md border-t border-surface-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center group">
              <div className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-accent transition-colors">
                <CountUp target={company.established} suffix="" />+
              </div>
              <div className="text-xs text-gray-500 mt-1">Established</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-accent transition-colors">
                <CountUp target={50} suffix="+" />
              </div>
              <div className="text-xs text-gray-500 mt-1">Product Series</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-accent transition-colors">
                <CountUp target={20} suffix="+" />
              </div>
              <div className="text-xs text-gray-500 mt-1">Countries Served</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-accent transition-colors">
                4
              </div>
              <div className="text-xs text-gray-500 mt-1">Certifications</div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for spinning animation */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
