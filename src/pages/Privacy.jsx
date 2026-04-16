import React, { useEffect } from 'react'
import { Mail, Shield, Lock, Eye, Trash2, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

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

function PrivacySection({ title, icon: Icon, children, delay = 0 }) {
  return (
    <AnimateSection delay={delay}>
      <div className="bg-white rounded-2xl border border-primary-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Icon size={20} className="text-accent" />
          </div>
          <h2 className="font-display font-bold text-xl text-primary-950">{title}</h2>
        </div>
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </AnimateSection>
  )
}

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy | UltraPU'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'UltraPU Privacy Policy - Learn how we collect, use, and protect your personal data in compliance with GDPR regulations.')
    }
  }, [])

  const lastUpdated = 'April 17, 2026'

  return (
    <div className="section-light">
      {/* Hero */}
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 texture-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Legal</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-950 mb-6">
              Privacy Policy
            </h1>
            <p className="text-primary-600 max-w-2xl mx-auto text-lg mb-4">
              Your privacy matters to us. This policy explains how we collect, use, and protect your personal data.
            </p>
            <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
          </AnimateSection>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-primary-50 border-y border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-4 justify-center text-sm">
            {['Data Collection', 'Data Storage', 'Your Rights', 'Contact Us'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
              >
                <ChevronRight size={14} />
                {item}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Introduction */}
          <AnimateSection>
            <div className="bg-accent/5 rounded-2xl p-6 sm:p-8 border border-accent/20">
              <p className="text-gray-700 leading-relaxed">
                <strong>Dongguan Ultra Leather New Materials Co., Ltd.</strong> ("UltraPU", "we", "our", or "us") operates the website{' '}
                <a href="https://www.ultrapu.com" className="text-accent hover:underline">https://www.ultrapu.com</a>.
                We are committed to protecting your privacy and ensuring compliance with the{' '}
                <strong>General Data Protection Regulation (GDPR)</strong> and other applicable data protection laws.
              </p>
            </div>
          </AnimateSection>

          {/* Data Collection */}
          <div id="data-collection" className="space-y-6">
            <PrivacySection title="1. Data Collection" icon={Eye} delay={100}>
              <p className="mb-4">
                When you submit an inquiry through our contact form, we collect the following personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Name</strong> – To address you properly in our communications</li>
                <li><strong>Email address</strong> – To respond to your inquiry</li>
                <li><strong>Company name</strong> – To understand your business context</li>
                <li><strong>Phone/WhatsApp</strong> – Optional, for urgent communications</li>
                <li><strong>Country</strong> – To understand your geographic location</li>
                <li><strong>Message content</strong> – The details of your inquiry</li>
              </ul>
              <p>
                This data is collected via <strong>Formspree</strong>, our third-party form processing service. Formspree processes this data on our behalf in accordance with their own privacy policy.
              </p>
            </PrivacySection>

            {/* Data Storage */}
            <PrivacySection title="2. Data Storage & Security" icon={Lock} delay={200}>
              <p className="mb-4">
                Your personal data is stored securely on servers operated by <strong>Formspree</strong>, which provides enterprise-grade security measures including:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>256-bit SSL encryption for data transmission</li>
                <li>Regular security audits and compliance certifications</li>
                <li>Access controls and authentication measures</li>
                <li>Data backup and recovery procedures</li>
              </ul>
              <p>
                Formspree is GDPR compliant and has implemented appropriate technical and organizational measures to ensure data security.
              </p>
            </PrivacySection>

            {/* Data Usage */}
            <PrivacySection title="3. How We Use Your Data" icon={Shield} delay={300}>
              <p className="mb-4">We use your personal data solely for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Responding to your product inquiries and requests</li>
                <li>Providing quotations for our synthetic leather products</li>
                <li>Sending product samples (upon request)</li>
                <li>Technical consultation regarding our materials</li>
                <li>Improving our products and services</li>
              </ul>
              <p className="mt-4">
                We <strong>never</strong> sell, rent, or share your personal data with third parties for marketing purposes.
              </p>
            </PrivacySection>

            {/* Your Rights */}
            <PrivacySection title="4. Your Rights Under GDPR" icon={Trash2} delay={400}>
              <p className="mb-4">As a data subject, you have the following rights:</p>
              <div className="space-y-4">
                <div className="bg-primary-50 rounded-xl p-4">
                  <h4 className="font-semibold text-primary-950 mb-2">Right of Access</h4>
                  <p className="text-sm text-gray-600">
                    You may request a copy of all personal data we hold about you.
                  </p>
                </div>
                <div className="bg-primary-50 rounded-xl p-4">
                  <h4 className="font-semibold text-primary-950 mb-2">Right to Rectification</h4>
                  <p className="text-sm text-gray-600">
                    You may request correction of inaccurate or incomplete data.
                  </p>
                </div>
                <div className="bg-primary-50 rounded-xl p-4">
                  <h4 className="font-semibold text-primary-950 mb-2">Right to Erasure</h4>
                  <p className="text-sm text-gray-600">
                    You may request deletion of your personal data ("right to be forgotten").
                  </p>
                </div>
                <div className="bg-primary-50 rounded-xl p-4">
                  <h4 className="font-semibold text-primary-950 mb-2">Right to Withdraw Consent</h4>
                  <p className="text-sm text-gray-600">
                    You may withdraw your consent at any time. The withdrawal will not affect the lawfulness of processing before consent was given.
                  </p>
                </div>
                <div className="bg-primary-50 rounded-xl p-4">
                  <h4 className="font-semibold text-primary-950 mb-2">Right to Data Portability</h4>
                  <p className="text-sm text-gray-600">
                    You may request your data in a structured, commonly used, machine-readable format.
                  </p>
                </div>
              </div>
            </PrivacySection>

            {/* Data Retention */}
            <PrivacySection title="5. Data Retention" icon={Eye} delay={500}>
              <p className="mb-4">
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Inquiry data</strong> – Retained for 2 years to facilitate ongoing business relationships</li>
                <li><strong>Active business correspondence</strong> – Retained for 5 years per standard business practices</li>
              </ul>
              <p className="mt-4">
                After these periods, your data will be securely deleted or anonymized.
              </p>
            </PrivacySection>

            {/* Cookies */}
            <PrivacySection title="6. Cookies & Tracking" icon={Shield} delay={600}>
              <p className="mb-4">
                Our website may use essential cookies for basic functionality. We do not use advertising or tracking cookies without your explicit consent.
              </p>
              <p>
                <strong>Essential cookies:</strong> Required for the website to function properly (e.g., language preferences, session management).
              </p>
              <p className="mt-4">
                <strong>Analytics:</strong> If we implement analytics, they will be configured in GDPR-compliant mode with IP anonymization enabled.
              </p>
            </PrivacySection>

            {/* International Transfers */}
            <PrivacySection title="7. International Data Transfers" icon={Lock} delay={700}>
              <p className="mb-4">
                As a company based in China serving global customers, your data may be transferred internationally.
              </p>
              <p>
                Formspree's servers are primarily located in the <strong>United States</strong>. When data is transferred outside the European Economic Area (EEA), we ensure appropriate safeguards are in place through Formspree's compliance with standard contractual clauses and adequacy decisions.
              </p>
            </PrivacySection>

            {/* Contact */}
            <div id="contact-us">
              <AnimateSection delay={800}>
                <div className="bg-primary-950 text-white rounded-2xl p-6 sm:p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <Mail size={28} className="text-accent" />
                  </div>
                  <h2 className="font-display font-bold text-2xl mb-4">Exercise Your Rights</h2>
                  <p className="text-primary-200 mb-6 max-w-lg mx-auto">
                    To exercise any of your GDPR rights, or if you have questions about this privacy policy, please contact us:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="mailto:glove@ultrapu.com"
                      className="inline-flex items-center gap-2 bg-accent text-primary-950 px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
                    >
                      <Mail size={18} />
                      glove@ultrapu.com
                    </a>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 border border-primary-300 text-primary-300 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                    >
                      Contact Form
                    </Link>
                  </div>
                  <p className="text-primary-400 text-sm mt-6">
                    We will respond to your request within <strong>30 days</strong> as required by GDPR.
                  </p>
                </div>
              </AnimateSection>
            </div>

            {/* Footer Note */}
            <AnimateSection delay={900}>
              <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200">
                <p>
                  This privacy policy is provided in English. If you require a translation, please contact us.
                </p>
                <p className="mt-2">
                  © {new Date().getFullYear()} Dongguan Ultra Leather New Materials Co., Ltd. All rights reserved.
                </p>
              </div>
            </AnimateSection>
          </div>
        </div>
      </section>
    </div>
  )
}
