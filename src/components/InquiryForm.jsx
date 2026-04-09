import React, { useState } from 'react'
import { Send, Check } from 'lucide-react'

const labels = {
  company: 'Company Name',
  contact: 'Contact Person',
  phone: 'Phone Number',
  email: 'Email Address',
  thickness: 'Thickness',
  color: 'Color Preference',
  category: 'Product Category',
  usage: 'Intended Use',
  quantity: 'Estimated Quantity',
  requirements: 'Special Requirements',
  submit: 'Submit Inquiry'
}

export default function InquiryForm({ category = '' }) {
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
        <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-600">Your inquiry has been submitted. We'll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {labels.company} *
          </label>
          <input
            type="text"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {labels.contact} *
          </label>
          <input
            type="text"
            name="contact"
            required
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
            placeholder="Contact person name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {labels.phone} *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
            placeholder="+1 234 567 8900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {labels.email} *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
            placeholder="email@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {labels.thickness}
          </label>
          <select
            name="thickness"
            value={formData.thickness}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
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
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {labels.color}
          </label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
            placeholder="Black, Brown, Navy, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {labels.category}
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {labels.usage}
          </label>
          <select
            name="usage"
            value={formData.usage}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
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
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {labels.quantity}
          </label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
            placeholder="e.g., 1000 yards"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {labels.requirements}
        </label>
        <textarea
          name="requirements"
          rows={4}
          value={formData.requirements}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
          placeholder="Please describe any special requirements, pattern preferences, certification needs, sample requests, etc."
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <Send size={18} />
        {labels.submit}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to be contacted by our sales team regarding your inquiry.
      </p>
    </form>
  )
}
