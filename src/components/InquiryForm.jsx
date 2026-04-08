import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Send, Check } from 'lucide-react'

export default function InquiryForm({ category = '' }) {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    phone: '',
    email: '',
    thickness: '',
    color: '',
    category: category,
    usage: '',
    quantity: '',
    requirements: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // 这里可以添加实际的表单提交逻辑
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Inquiry Submitted!</h3>
        <p className="text-green-600">We'll contact you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-primary-200 p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('inquiry.company')} *
          </label>
          <input
            type="text"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('inquiry.contact')} *
          </label>
          <input
            type="text"
            name="contact"
            required
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Contact person name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('inquiry.phone')} *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="+86 xxx xxxx xxxx"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('inquiry.email')} *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="email@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('inquiry.thickness')}
          </label>
          <select
            name="thickness"
            value={formData.thickness}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">Select thickness</option>
            <option value="0.6mm">0.6mm</option>
            <option value="0.8mm">0.8mm</option>
            <option value="1.0mm">1.0mm</option>
            <option value="1.2mm">1.2mm</option>
            <option value="1.4mm">1.4mm</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('inquiry.color')}
          </label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="e.g., Black, Brown, Custom"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('inquiry.category')}
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-primary-50"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('inquiry.usage')}
          </label>
          <select
            name="usage"
            value={formData.usage}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">Select usage</option>
            <option value="Footwear">Footwear</option>
            <option value="Bags">Bags & Luggage</option>
            <option value="Automotive">Automotive</option>
            <option value="Furniture">Furniture</option>
            <option value="Garment">Garment</option>
            <option value="Gloves">Gloves</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('inquiry.quantity')}
          </label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="e.g., 1000 yards"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('inquiry.requirements')}
          </label>
          <textarea
            name="requirements"
            rows={4}
            value={formData.requirements}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Any special requirements, pattern preferences, certification needs, etc."
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 flex items-center justify-center gap-2 bg-accent text-primary-950 font-semibold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors"
      >
        <Send size={18} />
        {t('inquiry.submit')}
      </button>
    </form>
  )
}
