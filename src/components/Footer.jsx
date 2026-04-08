import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Youtube, Linkedin, Facebook, MessageCircle } from 'lucide-react'
import { company, socialLinks, navLinks } from '../data/company'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-950 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-primary-950 text-lg">U</span>
              </div>
              <div>
                <div className="font-display font-bold text-lg">Ultra Leather</div>
                <div className="text-xs text-gray-400">Premium Synthetic Leather</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {company.slogan.en}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">
              {company.name.en}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-accent">Products</h4>
            <ul className="space-y-2">
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
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-accent mt-0.5 shrink-0" />
                <a href={`mailto:${company.email}`} className="text-gray-400 hover:text-accent transition-colors text-sm">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <a href={`tel:${company.whatsapp}`} className="text-gray-400 hover:text-accent transition-colors text-sm block">
                    {company.whatsapp}
                  </a>
                  <span className="text-gray-500 text-xs">{company.phone}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  {company.address.en}
                </span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                  <Youtube size={16} className="text-gray-400 hover:text-primary-950 transition-colors" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                  <Linkedin size={16} className="text-gray-400 hover:text-primary-950 transition-colors" />
                </a>
              )}
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                  <Facebook size={16} className="text-gray-400 hover:text-primary-950 transition-colors" />
                </a>
              )}
              {socialLinks.whatsapp && (
                <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                  <MessageCircle size={16} className="text-gray-400 hover:text-primary-950 transition-colors" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {currentYear} {company.name.en}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Privacy Policy</span>
            <span>|</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
