import React, { useState } from 'react'
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle, Linkedin, Youtube, Facebook, Instagram } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { company, socialLinks } from '../data/company'

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

const productOptions = [
  'PU Leather',
  'Microfiber Leather',
  'Suedeking Series',
  'E-Color Series',
  'Custom / Other',
]

const applicationOptions = [
  'Footwear / Shoes',
  'Bags & Luggage',
  'Automotive Interior',
  'Furniture',
  'Garment / Fashion',
  'Gloves (Golf/Baseball/Ski/Work)',
  'Other',
]

const inquiryTypes = [
  'Request Product Sample',
  'Get Price Quote',
  'Technical Consultation',
  'Custom Development',
  'General Inquiry',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    inquiryType: '',
    products: [],
    applications: [],
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
    }, 1500)
  }

  return (
    <div className="section-light">
      {/* Hero */}
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 texture-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Get In Touch</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-950 mb-6">
              Contact Us
            </h1>
            <p className="text-primary-600 max-w-2xl mx-auto text-lg">
              Whether you need samples, quotes, or technical advice — we're here to help. Fill out the form below or reach us directly.
            </p>
          </AnimateSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2">
              <AnimateSection>
                <h2 className="heading-lg text-2xl mb-6">Let's Connect</h2>
                <div className="line-accent mb-8" />

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Email</h4>
                      <a href={`mailto:${company.email}`} className="text-gray-600 hover:text-accent transition-colors">
                        {company.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <MessageCircle size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">WhatsApp</h4>
                      <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent transition-colors">
                        {company.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Phone size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Phone</h4>
                      <a href={`tel:${company.phone}`} className="text-gray-600 hover:text-accent transition-colors">
                        {company.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Address</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{company.address.en}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Clock size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Business Hours</h4>
                      <p className="text-gray-600 text-sm">Mon–Fri: 9:00 AM – 6:00 PM (GMT+8)</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="font-semibold text-sm mb-3">Follow Us</h4>
                  <div className="flex gap-3">
                    {socialLinks.youtube && (
                      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center hover:bg-accent hover:text-primary-950 transition-all">
                        <Youtube size={18} className="text-gray-600" />
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center hover:bg-accent hover:text-primary-950 transition-all">
                        <Linkedin size={18} className="text-gray-600" />
                      </a>
                    )}
                    {socialLinks.facebook && (
                      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center hover:bg-accent hover:text-primary-950 transition-all">
                        <Facebook size={18} className="text-gray-600" />
                      </a>
                    )}
                    {socialLinks.whatsapp && (
                      <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center hover:bg-accent hover:text-primary-950 transition-all">
                        <MessageCircle size={18} className="text-gray-600" />
                      </a>
                    )}
                    {socialLinks.instagram && (
                      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center hover:bg-accent hover:text-primary-950 transition-all">
                        <Instagram size={18} className="text-gray-600" />
                      </a>
                    )}
                  </div>
                </div>
              </AnimateSection>
            </div>

            {/* Right: Inquiry Form */}
            <div className="lg:col-span-3">
              <AnimateSection delay={100}>
                <div className="bg-white rounded-3xl border border-primary-200 shadow-xl p-6 sm:p-10">
                  {submitted ? (
                    // Success State
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-500" />
                      </div>
                      <h3 className="font-display font-bold text-2xl mb-3">Inquiry Received!</h3>
                      <p className="text-gray-600 mb-2">
                        Thank you for reaching out. Our team will review your inquiry and respond within <strong>24 hours</strong>.
                      </p>
                      <p className="text-gray-500 text-sm mb-8">
                        For urgent matters, feel free to contact us directly via WhatsApp: {company.whatsapp}
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({
                            name: '', company: '', email: '', phone: '', country: '',
                            inquiryType: '', products: [], applications: [], message: '',
                          })
                        }}
                        className="btn-outline"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="heading-lg text-2xl mb-2">Send Inquiry</h2>
                      <p className="text-gray-500 text-sm mb-8">Fields marked * are required</p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-primary-50/50"
                              placeholder="John Smith"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Company / Organization
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-primary-50/50"
                              placeholder="ABC Leather Co."
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-primary-50/50"
                              placeholder="john@company.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone / WhatsApp
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-primary-50/50"
                              placeholder="+1 234 567 890"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country / Region *
                          </label>
                          <input
                            type="text"
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-primary-50/50"
                            placeholder="United States"
                          />
                        </div>

                        {/* Inquiry Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Inquiry Type *
                          </label>
                          <select
                            name="inquiryType"
                            required
                            value={formData.inquiryType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-primary-50/50"
                          >
                            <option value="">Select inquiry type...</option>
                            {inquiryTypes.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>

                        {/* Products */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Products of Interest
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {productOptions.map((p) => (
                              <label key={p} className="cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="products"
                                  value={p}
                                  checked={formData.products.includes(p)}
                                  onChange={handleChange}
                                  className="sr-only peer"
                                />
                                <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium border transition-all peer-checked:bg-accent peer-checked:text-primary-950 peer-checked:border-accent ${
                                  formData.products.includes(p)
                                    ? 'bg-accent text-primary-950 border-accent'
                                    : 'bg-primary-50 text-gray-600 border-primary-200 hover:border-accent/50'
                                }`}>
                                  {p}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Applications */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Application Fields
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {applicationOptions.map((a) => (
                              <label key={a} className="cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="applications"
                                  value={a}
                                  checked={formData.applications.includes(a)}
                                  onChange={handleChange}
                                  className="sr-only peer"
                                />
                                <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                                  formData.applications.includes(a)
                                    ? 'bg-accent text-primary-950 border-accent'
                                    : 'bg-primary-50 text-gray-600 border-primary-200 hover:border-accent/50'
                                }`}>
                                  {a}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Message *
                          </label>
                          <textarea
                            name="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-primary-50/50 resize-none"
                            placeholder="Please describe your requirements, intended use, quantity needed, or any other details..."
                          />
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn-primary w-full justify-center text-base py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              Send Inquiry
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </AnimateSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection>
            <div className="rounded-3xl overflow-hidden border border-primary-200 h-80 bg-primary-50 flex items-center justify-center relative">
              <div className="text-center">
                <MapPin size={48} className="text-accent mx-auto mb-4" />
                <h3 className="font-display font-bold text-lg mb-2">{company.name.en}</h3>
                <p className="text-gray-500">{company.address.en}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(company.address.en)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline mt-4 text-sm"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </AnimateSection>
        </div>
      </section>
    </div>
  )
}
