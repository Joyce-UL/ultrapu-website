import React, { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle, Linkedin, Youtube, Facebook, Instagram } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm, ValidationError } from '@formspree/react'
import { company, socialLinks } from '../data/company'

// ============================================================
// Formspree 配置
// 表单 ID: myklejgp
// 注册地址: https://formspree.io/
// ============================================================
const FORMSPREE_FORM_ID = 'myklejgp'

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

// 成功动画组件
function SuccessAnimation({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center py-16 px-4"
    >
      {/* 成功图标动画 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        className="relative w-28 h-28 mx-auto mb-8"
      >
        {/* 背景圆环 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="absolute inset-0 rounded-full bg-green-500/10"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="absolute inset-2 rounded-full bg-green-500/20"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <CheckCircle size={56} className="text-green-500" />
        </motion.div>
      </motion.div>

      {/* 文字动画 */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="font-display font-bold text-3xl text-primary-950 mb-4"
      >
        Thank You for Your Inquiry!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="text-gray-600 text-lg mb-2"
      >
        Your message has been received successfully.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="text-gray-500 mb-2"
      >
        Our team will review your inquiry and respond within <strong className="text-accent">24 hours</strong>.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="text-gray-400 text-sm mb-10"
      >
        For urgent matters, contact us via WhatsApp: {company.whatsapp}
      </motion.p>

      {/* 重新发送按钮 */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        onClick={onReset}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-outline px-8 py-3"
      >
        Send Another Inquiry
      </motion.button>

      {/* 装饰性元素 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-12 flex justify-center gap-2"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
            className="w-2 h-2 rounded-full bg-accent/40"
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us - Get a Quote | UltraPU'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Contact Dongguan Ultra Leather for product inquiries, price quotes, and technical consultation. Email: info@ultrapu.com')
    }
  }, [])

  // 使用官方 Formspree React Hook
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID)
  
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
  
  // 用于重置表单
  const [resetKey, setResetKey] = useState(0)

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

  const onFormSubmit = async (e) => {
    // 阻止默认行为
    e.preventDefault()
    
    // 构建 Formspree 提交数据
    const submitData = {
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Not provided',
      phone: formData.phone || 'Not provided',
      country: formData.country,
      inquiryType: formData.inquiryType,
      products: formData.products.join(', ') || 'None selected',
      applications: formData.applications.join(', ') || 'None selected',
      message: formData.message,
    }

    // 转换为 Formspree 格式并提交
    const formattedData = new FormData()
    Object.entries(submitData).forEach(([key, value]) => {
      formattedData.append(key, value)
    })

    await handleSubmit(formattedData)
  }

  const handleReset = () => {
    setFormData({
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
    setResetKey((prev) => prev + 1)
  }

  // 提交成功后重置
  useEffect(() => {
    if (state.succeeded) {
      setTimeout(() => {
        handleReset()
      }, 100)
    }
  }, [state.succeeded])

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
                  <AnimatePresence mode="wait">
                    {state.succeeded ? (
                      <SuccessAnimation onReset={handleReset} key="success" />
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h2 className="heading-lg text-2xl mb-2">Send Inquiry</h2>
                        <p className="text-gray-500 text-sm mb-8">Fields marked * are required</p>

                        {/* Formspree 官方方式提交 */}
                        <form onSubmit={onFormSubmit} className="space-y-6" key={resetKey}>
                          {/* Error Message */}
                          {state.errors && state.errors.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2"
                            >
                              <span className="shrink-0 mt-0.5">⚠️</span>
                              <span>
                                {state.errors.map((err, i) => (
                                  <span key={i}>{err.message}</span>
                                ))}
                              </span>
                            </motion.div>
                          )}

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
                              <ValidationError prefix="Name" field="name" errors={state.errors} />
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
                              <ValidationError prefix="Email" field="email" errors={state.errors} />
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
                              Your Message / Requirements *
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
                            <ValidationError prefix="Message" field="message" errors={state.errors} />
                          </div>

                          {/* GDPR Compliance Notice */}
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <p className="text-xs text-gray-500 leading-relaxed">
                              <strong>Privacy Notice:</strong> By clicking "Submit", you agree to our{' '}
                              <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>{' '}
                              and consent to the processing of your personal data for responding to your inquiry.
                              Your data will be handled in accordance with GDPR regulations and will not be shared with third parties.
                            </p>
                          </div>

                          {/* Submit */}
                          <motion.button
                            type="submit"
                            disabled={state.submitting}
                            whileHover={{ scale: state.submitting ? 1 : 1.02 }}
                            whileTap={{ scale: state.submitting ? 1 : 0.98 }}
                            className="btn-primary w-full justify-center text-base py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {state.submitting ? (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2"
                              >
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Submitting...
                              </motion.span>
                            ) : (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2"
                              >
                                <Send size={18} />
                                Submit Inquiry
                              </motion.span>
                            )}
                          </motion.button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
