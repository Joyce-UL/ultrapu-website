import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { ArrowLeft, Download, ChevronLeft, ChevronRight, Check, Send, Mail, Phone, MapPin, Globe } from 'lucide-react'
import InquiryForm from '../components/InquiryForm'

function AnimateSection({ children, className = '', delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Sample product gallery images (using placeholder colors based on product)
const productImages = [
  { id: 1, type: 'main', label: 'Surface Texture' },
  { id: 2, type: 'detail', label: 'Cross Section' },
  { id: 3, type: 'detail', label: 'Edge Detail' },
  { id: 4, type: 'detail', label: 'Material Close-up' },
]

// Technical specifications data
const technicalSpecs = {
  'Fabric Information': [
    { property: 'Thickness', value: '0.6mm - 1.4mm', standard: 'ASTM D1777' },
    { property: 'Width', value: '54" (137cm)', standard: 'ASTM D3774' },
    { property: 'Composition', value: '100% Polyurethane on Polyester backing', standard: '' },
    { property: 'Weight', value: '280-450 g/m²', standard: 'ASTM D3776' },
    { property: 'MOQ', value: '500 yards / color', standard: '' },
  ],
  'Physical Properties': [
    { property: 'Abrasion Resistance', value: '≥50,000 cycles', standard: 'ASTM D4060' },
    { property: 'Tear Strength', value: '≥30 N/mm', standard: 'ASTM D624' },
    { property: 'Tensile Strength', value: '≥15 MPa', standard: 'ASTM D638' },
    { property: 'Hydrolysis Resistance', value: '72 hrs @ 70°C', standard: 'ISO 1419' },
    { property: 'Flame Resistance', value: 'Pass FMVSS 302', standard: 'DOT CMVSS 302' },
    { property: 'Cut Resistance', value: 'Grade 3+', standard: 'EN ISO 13997' },
    { property: 'UV Resistance (Yellowing)', value: 'Grade 4-5', standard: 'ASTM D4329' },
  ],
  'Color Fastness': [
    { property: 'Washing Fastness', value: 'Grade 4-5', standard: 'ISO 105-C06' },
    { property: 'Light Fastness', value: 'Grade 4-5', standard: 'AATCC 16E' },
    { property: 'Rubbing Fastness', value: 'Grade 4-5 (Dry/Wet)', standard: 'AATCC 8/AATCC 16' },
    { property: 'Perspiration Fastness', value: 'Grade 4-5', standard: 'ISO 105-E04' },
  ],
  'Environmental & Compliance': [
    { property: 'Formaldehyde Content', value: '<20 ppm', standard: 'ISO 17226' },
    { property: 'VOC Emission', value: '<50 μg/m³', standard: 'VDA 270' },
    { property: 'Recyclable Content', value: 'Available (GRS Certified)', standard: 'GRS v5.0' },
    { property: 'REACH Compliance', value: 'Full Compliance', standard: 'EU Regulation' },
  ],
}

export default function ProductDetail() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)

  useEffect(() => {
    document.title = `Product Details - Premium ${categoryId?.replace('-', ' ')} | UltraPU`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', `Explore ${categoryId?.replace('-', ' ')} product specifications, technical data, colors, patterns, and request a quote.`)
    }
  }, [categoryId])

  // Product data based on category ID
  const productData = {
    'pu-leather': {
      name: 'PU Leather',
      tagline: 'Classic Quality, Wide Applications',
      category: 'Synthetic Leather',
      origin: 'Made in China',
      description: 'High-quality polyurethane synthetic leather with texture remarkably close to genuine leather. Features excellent wear resistance, superior durability, and outstanding cost-effectiveness. The classic choice for various consumer products including footwear, bags, furniture, and garments.',
      composition: '100% Polyurethane on Polyester backing',
      features: [
        'Premium PU surface with authentic leather feel',
        'Excellent abrasion and scratch resistance',
        'Superior color fastness for lasting appearance',
        'Wide range of colors and finishes available',
        'Cost-effective alternative to genuine leather',
        'Easy to clean and maintain',
      ],
      applications: ['Footwear', 'Bags & Luggage', 'Furniture Upholstery', 'Garments & Fashion Accessories', 'Automotive Interiors'],
      color: '#8B7355',
      accentColor: '#A08060',
    },
    'microfiber': {
      name: 'Microfiber Leather',
      tagline: 'Premium Ultra-Fine Fiber Technology',
      category: 'Advanced Materials',
      origin: 'Made in China',
      description: 'State-of-the-art ultra-fine fiber technology creates a compact, three-dimensional network structure. Features incredibly delicate texture, exceptional tear strength, and excellent hydrolysis resistance. The ideal choice for premium products requiring superior performance.',
      composition: '40% PU + 60% Nylon (Ultra-fine fiber base)',
      features: [
        'Ultra-fine fiber structure mimics natural leather',
        'Exceptional tear and tensile strength',
        'Superior hydrolysis and aging resistance',
        'Excellent breathability and comfort',
        'Eco-friendly and recyclable materials',
        'Premium touch and visual appearance',
      ],
      applications: ['Luxury Footwear', 'Premium Bags', 'Automotive Seats', 'High-End Furniture', 'Professional Sports Gear'],
      color: '#6B7B8C',
      accentColor: '#8090A0',
    },
    'suedeking': {
      name: 'Suedeking Series',
      tagline: 'Vibrant Colors, Exceptional Durability',
      category: 'Suede Microfiber',
      origin: 'Made in China',
      description: 'Independently developed colorful suede microfiber material featuring color fastness far exceeding similar products in the market. Rich and lasting colors maintained through rigorous testing. Especially suitable for high-end sports goods, fashion products, and applications requiring vibrant aesthetics.',
      composition: '40% PU + 60% Nylon (Microfiber suede base)',
      features: [
        'Ultra-high color fastness (Grade 4+)',
        'Soft and luxurious suede texture',
        'Extensive color palette with custom options',
        'Excellent abrasion resistance',
        'Lightweight and flexible construction',
        'Enhanced grip and tactile properties',
      ],
      applications: ['Golf Gloves', 'Ski & Snowboard Gloves', 'Fashion Garments', 'Sports Equipment', 'Luxury Accessories'],
      color: '#9B6B5A',
      accentColor: '#B08070',
    },
    'e-color': {
      name: 'E-Color Series',
      tagline: 'Touchscreen Conductive Technology',
      category: 'Smart Materials',
      origin: 'Made in China',
      description: 'Innovative conductive suede material specifically designed for smart touch devices. Combines touchscreen conductivity with fashionable aesthetics. Ideal for touchscreen gloves and other smart wearable products, providing sensitive touch response while maintaining style.',
      composition: 'Conductive Fiber + Microfiber Base',
      features: [
        'Multi-point touchscreen conductivity',
        'High sensitivity touch response',
        'Fashion-forward color options',
        'Maintains warmth and comfort',
        'Durable conductive properties',
        'Washable without losing conductivity',
      ],
      applications: ['Touchscreen Gloves', 'Smart Wearables', 'Tech Fashion Accessories', 'Winter Sports Gear', 'Fashion Electronics'],
      color: '#5A7B6B',
      accentColor: '#7090A0',
    },
    'footwear': {
      name: 'Footwear Materials',
      tagline: 'Comfort for Every Step',
      category: 'Application Solutions',
      origin: 'Made in China',
      description: 'From sports shoes to dress shoes, casual shoes to professional footwear, our leather materials provide premium surface solutions for all types of footwear. Collaborate with leading brands worldwide to deliver comfort, durability, and style in every step.',
      composition: 'Various: PU Leather, Microfiber, Suedeking Series',
      features: [
        'Excellent breathability and moisture management',
        'Superior flexibility for natural movement',
        'Outstanding durability for extended wear',
        'Wide range of textures and finishes',
        'Consistent quality for mass production',
        'Eco-friendly options available',
      ],
      applications: ['Sports Shoes', 'Casual Shoes', 'Dress Shoes', 'Work Boots', 'Sandals & Slippers'],
      color: '#7B8B6B',
      accentColor: '#90A080',
    },
    'bags': {
      name: 'Bags & Luggage Materials',
      tagline: 'Crafting Quality Bags',
      category: 'Application Solutions',
      origin: 'Made in China',
      description: 'Handbags, backpacks, wallets, travel bags — our materials provide durable and fashionable outer fabric for all types of bag products. Designed to withstand daily use while maintaining elegant appearance.',
      composition: 'Various: PU Leather, Microfiber Leather',
      features: [
        'Exceptional scratch and abrasion resistance',
        'Water-resistant properties available',
        'Lightweight yet durable construction',
        'Premium texture and visual appeal',
        'Easy cleaning and maintenance',
        'Custom colors and finishes available',
      ],
      applications: ['Handbags', 'Backpacks', 'Wallets', 'Travel Bags', 'Briefcases'],
      color: '#8B7B5B',
      accentColor: '#A09070',
    },
    'automotive': {
      name: 'Automotive Materials',
      tagline: 'Premium Driving Experience',
      category: 'Application Solutions',
      origin: 'Made in China',
      description: 'Car seats, steering wheel covers, interior panels — high-performance leather materials meeting the demanding standards of the automotive industry. Features superior wear resistance, UV resistance, and reliable quality for lasting beauty.',
      composition: 'Microfiber Leather, Premium PU Leather',
      features: [
        'OEM-grade quality standards',
        'Superior abrasion and UV resistance',
        'Excellent hydrolysis stability',
        'Low VOC emissions for interior air quality',
        'Flame retardant options available',
        'Easy cleaning and maintenance',
      ],
      applications: ['Car Seats', 'Steering Wheels', 'Door Panels', 'Center Consoles', 'Headliners'],
      color: '#5B6B7B',
      accentColor: '#7080A0',
    },
    'furniture': {
      name: 'Furniture Materials',
      tagline: 'Home Aesthetics Choice',
      category: 'Application Solutions',
      origin: 'Made in China',
      description: 'Sofas, seating, office furniture — our leather materials provide elegant surface decoration solutions for residential and commercial spaces. Combining beauty, comfort, and durability for furniture that stands the test of time.',
      composition: 'PU Leather, Microfiber Leather',
      features: [
        'Luxurious leather-like appearance',
        'Excellent wear and tear resistance',
        'Easy cleaning and maintenance',
        'Stain-resistant options available',
        'Fire retardant treatments available',
        'Eco-friendly material options',
      ],
      applications: ['Sofa Upholstery', 'Office Chairs', 'Restaurant Seating', 'Hotel Furniture', 'Home Decor'],
      color: '#6B5B7B',
      accentColor: '#8070A0',
    },
    'garment': {
      name: 'Garment & Fashion Materials',
      tagline: 'Express Your Style',
      category: 'Application Solutions',
      origin: 'Made in China',
      description: 'Leather garments, fashion accessories, leather goods decoration — diverse color and texture options to meet the design needs of the fashion industry. From bold statements to subtle elegance, our materials help bring creative visions to life.',
      composition: 'Suedeking Series, Premium PU Leather',
      features: [
        'Extensive color range including custom options',
        'Soft and comfortable hand feel',
        'Excellent drape and formability',
        'Lightweight construction for garments',
        'High color fastness for lasting beauty',
        'Sustainable and recycled options',
      ],
      applications: ['Leather Jackets', 'Fashion Accessories', 'Belt & Trim', 'Footwear Uppers', 'Sports Apparel'],
      color: '#7B5B6B',
      accentColor: '#A08090',
    },
    'gloves': {
      name: 'Glove Materials',
      tagline: 'Professional Protection, Precise Touch',
      category: 'Application Solutions',
      origin: 'Made in China',
      description: 'Covering golf gloves, baseball gloves, ski gloves, work gloves, and high-performance professional series. Our materials provide the best touch, grip, and protection for different application scenarios.',
      composition: 'E-Color Series, Suedeking Series, Microfiber Leather',
      features: [
        'Excellent grip and control',
        'Superior tactile sensitivity',
        'Breathable and moisture-wicking',
        'Enhanced durability at grip points',
        'Touchscreen compatibility (E-Color)',
        'Professional-grade performance',
      ],
      applications: ['Golf Gloves', 'Baseball Gloves', 'Ski Gloves', 'Work Gloves', 'Cycling Gloves'],
      color: '#5B7B6B',
      accentColor: '#70A090',
    },
  }

  const product = productData[categoryId] || productData['pu-leather']

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Product Image Gallery */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `radial-gradient(circle at 25% 25%, ${product.color}40 0%, transparent 50%)`,
        }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <button
              onClick={() => navigate('/products')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back to Products</span>
            </button>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Product Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${product.color}30 0%, ${product.accentColor}20 100%)`
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="w-32 h-32 mx-auto rounded-full mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${product.color}40` }}
                    >
                      <span className="text-6xl">🎨</span>
                    </div>
                    <p className="text-white/60 text-sm">{productImages[activeImage].label}</p>
                  </div>
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden transition-all ${
                      activeImage === idx 
                        ? 'ring-2 ring-white shadow-lg' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${product.color}40 0%, ${product.accentColor}30 100%)`
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="text-white">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4" 
                style={{ backgroundColor: `${product.color}40`, color: product.accentColor }}>
                {product.category}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl text-white/70 mb-6">{product.tagline}</p>
              
              <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
                <span className="flex items-center gap-1">
                  <Globe size={14} />
                  {product.origin}
                </span>
              </div>

              <p className="text-white/80 leading-relaxed mb-8">{product.description}</p>

              {/* Key Features */}
              <div className="space-y-3 mb-8">
                {product.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" 
                      style={{ backgroundColor: `${product.color}40` }}>
                      <Check size={12} style={{ color: product.accentColor }} />
                    </div>
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105"
                  style={{ backgroundColor: product.color }}
                >
                  Request a Quote
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-white/30 hover:bg-white/10 transition-all">
                  <Download size={18} />
                  Download Spec Sheet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Product Overview */}
            <div className="lg:col-span-1">
              <AnimateSection>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Product Overview</h2>
                  
                  {/* Composition */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Composition</h3>
                    <p className="text-gray-900">{product.composition}</p>
                  </div>

                  {/* Available Colors */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Available Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Black', 'Brown', 'Navy', 'Gray', 'Beige', 'Red', 'Blue', 'White'].map((color) => (
                        <div 
                          key={color}
                          className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 cursor-pointer hover:scale-110 transition-transform">
                        +50
                      </div>
                    </div>
                  </div>

                  {/* Applications */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Applications</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app) => (
                        <span 
                          key={app}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: `${product.color}15`, color: product.color }}
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateSection>
            </div>

            {/* Right Column - Technical Specifications */}
            <div className="lg:col-span-2">
              <AnimateSection delay={100}>
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Technical Specifications</h2>
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                      <Download size={16} />
                      Download Full TDS
                    </button>
                  </div>

                  <div className="space-y-8">
                    {Object.entries(technicalSpecs).map(([category, specs]) => (
                      <div key={category}>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{category}</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {specs.map((spec, idx) => (
                            <div key={idx} className="p-4 rounded-lg bg-gray-50">
                              <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-medium text-gray-900">{spec.property}</span>
                              </div>
                              <span className="text-lg font-semibold text-gray-900">{spec.value}</span>
                              {spec.standard && <p className="text-xs text-gray-400 mt-1">{spec.standard}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateSection>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Section - placed prominently after specs */}
      <section className="py-16 lg:py-20 bg-white" id="inquiry">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">Request a Sample or Quote</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Tell us your requirements and we'll get back to you within 24 hours.</p>
            </div>
          </AnimateSection>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left - Contact Info */}
            <AnimateSection>
              <div className="bg-gray-900 rounded-2xl p-8 text-white h-full">
                <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                <p className="text-white/70 mb-8">
                  Contact our sales team for product samples, custom specifications, or detailed quotations.
                </p>

                <div className="space-y-5 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-white/70" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-0.5">Email</p>
                      <p className="font-medium">info@ultrapu.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-white/70" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-0.5">Phone</p>
                      <p className="font-medium">+86 769-8888-8888</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-white/70" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-0.5">Address</p>
                      <p className="font-medium">Dongguan, Guangdong, China</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-white/60">
                    <strong className="text-white">Free Samples:</strong> We offer free A4-size samples for quality evaluation. Custom samples with specific colors or specs are available on request.
                  </p>
                </div>
              </div>
            </AnimateSection>

            {/* Right - Inquiry Form */}
            <AnimateSection delay={100}>
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Send Us an Inquiry</h3>
                <p className="text-gray-500 mb-6">Fill out the form below and we'll get back to you shortly.</p>
                <InquiryForm category={product.name} />
              </div>
            </AnimateSection>
          </div>
        </div>
      </section>
    </div>
  )
}
