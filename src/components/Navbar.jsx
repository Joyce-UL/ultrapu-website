import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { navLinks } from '../data/company'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isHome = location.pathname === '/'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-dark shadow-2xl py-3'
            : isHome
            ? 'bg-transparent py-5'
            : 'glass-dark py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="font-display font-bold text-primary-950 text-lg">U</span>
              </div>
              <div className="hidden sm:block">
                <div className={`font-display font-bold text-lg leading-tight transition-colors duration-300 ${
                  isScrolled || !isHome ? 'text-white' : 'text-white'
                }`}>
                  Ultra Leather
                </div>
                <div className={`text-xs transition-colors duration-300 ${
                  isScrolled || !isHome ? 'text-gray-400' : 'text-gray-300'
                }`}>
                  Premium Synthetic Leather
                </div>
              </div>
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {navLinks.map((link) => (
                <div key={link.path} className="relative">
                  {link.children ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-white/10 ${
                        isScrolled || !isHome ? 'text-white/80 hover:text-white' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-white/10 ${
                          isActive
                            ? 'text-accent bg-white/10'
                            : (isScrolled || !isHome)
                            ? 'text-white/80 hover:text-white'
                            : 'text-white/80 hover:text-white'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <NavLink
                to="/contact"
                className="ml-4 btn-primary text-sm"
              >
                Get a Quote
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled || !isHome ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-primary-950 border-t border-surface-border px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'text-accent bg-white/5'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3">
              <NavLink to="/contact" className="btn-primary w-full justify-center">
                Get a Quote
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for non-home pages */}
      {!isHome && <div className="h-16" />}
    </>
  )
}
