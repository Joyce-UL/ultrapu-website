import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { ArrowLeft, Download, Palette, Layers, FileText, Mail } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { productCategories } from '../data/products'
import InquiryForm from '../components/InquiryForm'

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

// 模拟产品子项数据
const generateSubProducts = (categoryId, categoryName) => {
  const subProducts = []
  for (let i = 1; i <= 10; i++) {
    subProducts.push({
      id: `${categoryId}-${i.toString().padStart(3, '0')}`,
      name: `${categoryName} ${String.fromCharCode(64 + i)}`,
      code: `${categoryId.toUpperCase()}-${1000 + i}`,
      thickness: ['0.6mm', '0.8mm', '1.0mm', '1.2mm', '1.4mm'][Math.floor(Math.random() * 5)],
      width: '54"',
      colors: ['Black', 'Brown', 'Navy', 'Gray', 'Beige', 'Red', 'Blue'].slice(0, 3 + Math.floor(Math.random() * 4)),
      pattern: ['Plain', 'Embossed', 'Printed'][Math.floor(Math.random() * 3)],
      moq: '500 yards',
      leadTime: '15-20 days'
    })
  }
  return subProducts
}

// 模拟纹路数据
const patterns = [
  { id: 'p1', name: 'Litchi Grain', nameZh: '荔枝纹', image: null },
  { id: 'p2', name: 'Cross Grain', nameZh: '十字纹', image: null },
  { id: 'p3', name: 'Nappa', nameZh: '纳帕纹', image: null },
  { id: 'p4', name: 'Crazy Horse', nameZh: '疯马纹', image: null },
  { id: 'p5', name: 'Saffiano', nameZh: '十字纹', image: null },
  { id: 'p6', name: 'Pebbled', nameZh: '卵石纹', image: null },
  { id: 'p7', name: 'Crocodile', nameZh: '鳄鱼纹', image: null },
  { id: 'p8', name: 'Snake', nameZh: '蛇纹', image: null },
]

export default function ProductDetail() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = React.useState('specs')

  const category = [...productCategories.materials, ...productCategories.applications].find(
    c => c.id === categoryId
  )

  if (!category) {
    return <div>Product not found</div>
  }

  const subProducts = generateSubProducts(categoryId, category.name)

  return (
    <div className="section-light">
      {/* Hero */}
      <section className="relative bg-primary-950 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 texture-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>
          <AnimateSection>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-gray-400">{category.zhName}</p>
            <p className="text-gray-500 mt-4 max-w-2xl">{category.description}</p>
          </AnimateSection>
        </div>
      </section>

      {/* PDF Download Button */}
      <section className="bg-accent/10 border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Download complete {category.name} catalog with specifications
            </span>
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-primary-950 rounded-lg font-medium hover:bg-accent/90 transition-colors">
              <Download size={18} />
              {t('products.downloadCatalog')} PDF
            </button>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 border-b border-primary-200 mb-8">
            {[
              { id: 'specs', label: t('productDetail.specifications'), icon: FileText },
              { id: 'colors', label: t('productDetail.colors'), icon: Palette },
              { id: 'patterns', label: t('productDetail.patterns'), icon: Layers },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimateSection>
            {activeTab === 'specs' && (
              <div className="bg-white rounded-xl shadow-sm border border-primary-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-primary-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product Code</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Thickness</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Width</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">MOQ</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lead Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subProducts.map((product, i) => (
                      <tr key={product.id} className={i % 2 === 0 ? 'bg-white' : 'bg-primary-50/50'}>
                        <td className="px-4 py-3 text-sm font-mono text-gray-600">{product.code}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{product.thickness}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{product.width}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{product.moq}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{product.leadTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'colors' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {['Black', 'Brown', 'Navy', 'Gray', 'Beige', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Orange', 'White', 'Gold'].map((color) => (
                  <div key={color} className="bg-white rounded-lg p-4 shadow-sm border border-primary-200 text-center">
                    <div 
                      className="w-full aspect-square rounded-lg mb-2"
                      style={{ 
                        backgroundColor: color.toLowerCase(),
                        border: color === 'White' ? '1px solid #e5e7eb' : 'none'
                      }}
                    />
                    <span className="text-sm text-gray-700">{color}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'patterns' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {patterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => navigate('/patterns')}
                    className="bg-white rounded-lg p-4 shadow-sm border border-primary-200 hover:border-accent hover:shadow-md transition-all text-left"
                  >
                    <div className="w-full aspect-video bg-primary-100 rounded-lg mb-3 flex items-center justify-center text-4xl">
                      🎨
                    </div>
                    <h4 className="font-medium text-gray-900">{pattern.name}</h4>
                    <p className="text-sm text-gray-500">{pattern.nameZh}</p>
                  </button>
                ))}
              </div>
            )}
          </AnimateSection>
        </div>
      </section>

      {/* Technical Data Sheet */}
      <section className="py-12 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('productDetail.technicalData')}</h2>
            <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Tensile Strength', value: '≥15 MPa', standard: 'ASTM D638' },
                  { label: 'Tear Strength', value: '≥30 N/mm', standard: 'ASTM D624' },
                  { label: 'Abrasion Resistance', value: '≥50,000 cycles', standard: 'ASTM D4060' },
                  { label: 'Color Fastness', value: 'Grade 4-5', standard: 'AATCC 16' },
                  { label: 'Hydrolysis Resistance', value: '72 hrs', standard: 'ISO 1419' },
                  { label: 'Flame Resistance', value: 'Pass', standard: 'FMVSS 302' },
                  { label: 'VOC Emission', value: '<50 μg/m³', standard: 'VDA 270' },
                  { label: 'Formaldehyde', value: '<20 ppm', standard: 'ISO 17226' },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                    <p className="text-xs text-gray-400">{item.standard}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection>
            <div className="text-center mb-8">
              <Mail size={48} className="text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('productDetail.inquiry')}</h2>
              <p className="text-gray-600">Fill in your requirements and we'll get back to you within 24 hours</p>
            </div>
            <InquiryForm category={category.name} />
          </AnimateSection>
        </div>
      </section>
    </div>
  )
}
