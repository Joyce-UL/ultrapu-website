import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Youtube, Linkedin, Facebook, MessageCircle, ArrowUpRight, ChevronRight } from 'lucide-react'
import { company, socialLinks, navLinks } from '../data/company'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-800 text-white">
      {/* CTA band */}
      <div className="border-b border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                Let's Work Together
              </h3>
              <p className="text-primary-300 text-base">
                Get free samples, technical consultation, or a customized quote.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary-950 font-semibold rounded-xl hover:bg-accent-light transition-all hover:scale-[1.03]"
              >
                Get a Quote
                <ArrowUpRight size={16} />
              </Link>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-600 text-white font-semibold rounded-xl hover:border-primary-500 hover:bg-primary-700 transition-all"
              >
                <Mail size={16} />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="font-display font-bold text-primary-950 text-xl">U</span>
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight text-white">Ultra Leather</div>
                <div className="text-xs text-primary-400">Premium Synthetic Leather</div>
              </div>
            </Link>
            <p className="text-primary-300 text-sm leading-relaxed mb-4 max-w-xs">
              {company.slogan.en}
            </p>
            <p className="text-primary-500 text-xs leading-relaxed mb-6">
              {company.name.en}
            </p>

            {/* Social Links */}
            <div className="flex gap-2.5">
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-primary-700 border border-primary-600 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                  <Youtube size={15} className="text-primary-300 group-hover:text-primary-950 transition-colors" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-primary-700 border border-primary-600 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                  <Linkedin size={15} className="text-primary-300 group-hover:text-primary-950 transition-colors" />
                </a>
              )}
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-primary-700 border border-primary-600 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                  <Facebook size={15} className="text-primary-300 group-hover:text-primary-950 transition-colors" />
                </a>
              )}
              {socialLinks.whatsapp && (
                <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-primary-700 border border-primary-600 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                  <MessageCircle size={15} className="text-primary-300 group-hover:text-primary-950 transition-colors" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold mb-5 text-white text-sm tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-300 hover:text-accent transition-colors text-sm inline-flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={12} className="text-primary-500 group-hover:text-accent transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold mb-5 text-white text-sm tracking-wide uppercase">Products</h4>
            <ul className="space-y-3">
              {[
                'PU Leather',
                'Microfiber Leather',
                'Suedeking Series',
                'E-Color Series',
                'Gloves Materials',
              ].map((p) => (
                <li key={p}>
                  <Link
                    to="/products"
                    className="text-primary-300 hover:text-accent transition-colors text-sm inline-flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={12} className="text-primary-500 group-hover:text-accent transition-colors" />
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-2 lg:col-span-4">
            <h4 className="font-display font-semibold mb-5 text-white text-sm tracking-wide uppercase">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-700 border border-primary-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={14} className="text-accent" />
                </div>
                <a href={`mailto:${company.email}`} className="text-primary-300 hover:text-accent transition-colors text-sm leading-relaxed pt-1">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-700 border border-primary-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={14} className="text-accent" />
                </div>
                <div className="pt-1">
                  <a href={`tel:${company.whatsapp}`} className="text-primary-300 hover:text-accent transition-colors text-sm block">
                    {company.whatsapp}
                  </a>
                  <span className="text-primary-500 text-xs">{company.phone}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-700 border border-primary-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-accent" />
                </div>
                <span className="text-primary-300 text-sm leading-relaxed pt-1">
                  {company.address.en}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-primary-500 text-xs">
            © {currentYear} {company.name.en}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-primary-500">
            <Link to="/about" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <span className="text-primary-600">|</span>
            <Link to="/about" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
