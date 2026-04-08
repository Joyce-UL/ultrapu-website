import React, { useState, useEffect } from 'react'
import { socialLinks } from '../data/company'
import { Youtube, Linkedin, Facebook, MessageCircle, Instagram, X, ChevronUp } from 'lucide-react'

const socialIcons = {
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
  whatsapp: MessageCircle,
  instagram: Instagram,
}

const socialNames = {
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
}

export default function SocialButtons() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeLinks = Object.entries(socialLinks)
    .filter(([key, url]) => key !== 'whatsappNumber' && url && url.length > 0)
    .filter(([key]) => ['youtube', 'linkedin', 'facebook', 'whatsapp', 'instagram'].includes(key))

  if (!isVisible) return null

  return (
    <>
      {/* Desktop floating bar */}
      <div
        className={`fixed right-6 bottom-8 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {/* Social links */}
        <div
          className={`flex flex-col gap-2 transition-all duration-400 overflow-hidden ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {activeLinks.map(([key, url]) => {
            const Icon = socialIcons[key] || MessageCircle
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3"
                title={socialNames[key]}
              >
                <span className="absolute right-full mr-2 px-2 py-1 bg-primary-950 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {socialNames[key]}
                </span>
                <div className="w-11 h-11 rounded-full bg-surface-card border border-surface-border flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all shadow-lg">
                  <Icon size={18} className="text-white group-hover:text-primary-950 transition-colors" />
                </div>
              </a>
            )
          })}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-11 h-11 rounded-full bg-accent border-2 border-accent flex items-center justify-center hover:bg-accent-dark hover:scale-110 transition-all shadow-lg"
          aria-label="Toggle social links"
        >
          {isExpanded ? (
            <X size={18} className="text-primary-950" />
          ) : (
            <MessageCircle size={18} className="text-primary-950" />
          )}
        </button>

        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-surface-card border border-surface-border flex items-center justify-center hover:bg-primary-800 hover:border-primary-700 hover:scale-110 transition-all shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp size={18} className="text-white" />
        </button>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-primary-950/95 backdrop-blur-md border-t border-surface-border safe-area-bottom">
        <div className="flex items-center justify-around py-3 px-4">
          {activeLinks.slice(0, 4).map(([key, url]) => {
            const Icon = socialIcons[key] || MessageCircle
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1"
              >
                <div className="w-10 h-10 rounded-full bg-surface-card border border-surface-border flex items-center justify-center">
                  <Icon size={18} className="text-white" />
                </div>
                <span className="text-[10px] text-gray-400">{socialNames[key]}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Mobile bottom spacer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden h-16 bg-transparent" />
    </>
  )
}
