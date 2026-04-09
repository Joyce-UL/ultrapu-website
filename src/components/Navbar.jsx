import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { navLinks } from '../data/company'
import LanguageSwitcher from './LanguageSwitcher'

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navBg = isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-primary-200' : 'bg-white'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="font-display font-bold text-primary-950 text-lg">U</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-lg text-primary-950 leading-tight transition-colors duration-300">
                  Ultra Leather
                </div>
                <div className="text-xs text-primary-500 transition-colors duration-300">
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
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-primary-100 ${
                        activeDropdown === link.label ? 'text-accent' : 'text-primary-700'
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-primary-100 ${
                          isActive
                            ? 'text-accent bg-primary-100'
                            : 'text-primary-700 hover:text-primary-950'
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

              {/* Language Switcher */}
              <div className="ml-4">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors text-primary-700 hover:bg-primary-100`}
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
          <div className="bg-white border-t border-primary-200 px-4 py-4 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'text-accent bg-primary-100'
                      : 'text-primary-700 hover:text-primary-950 hover:bg-primary-100'
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

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
