import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ProductCard({ product, type = 'material' }) {
  const emoji = type === 'material'
    ? (product.id === 'pu-leather' ? '🟫' : product.id === 'microfiber' ? '🔵' : product.id === 'suedeking' ? '🟠' : '🟢')
    : product.image

  return (
    <Link to={`/products/${product.id}`} className="group card-shine bg-white rounded-2xl border border-primary-200 overflow-hidden card-hover flex flex-col h-full block">
      {/* Image/Color area */}
      <div
        className="h-48 relative flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: product.color + '15' }}
      >
        <div
          className="text-7xl transition-transform duration-500 group-hover:scale-110"
        >
          {emoji}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-medium flex items-center gap-2">
            View Details <ArrowRight size={18} />
          </span>
        </div>
        {/* Corner accent */}
        <div
          className="absolute top-0 left-0 w-16 h-16"
          style={{
            background: `linear-gradient(135deg, ${product.color}30 0%, transparent 70%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display font-bold text-lg group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm">{product.zhName}</p>
          </div>
          {type === 'material' && (
            <span className="shrink-0 px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-lg">
              {product.composition?.split(' ')[0]}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {product.tagline}
        </p>

        {product.features && (
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 3).map((f) => (
              <span key={f} className="text-xs px-2 py-1 bg-primary-50 text-gray-600 rounded-full border border-primary-200">
                {f}
              </span>
            ))}
          </div>
        )}

        {product.materials && (
          <div className="flex flex-wrap gap-2">
            {product.materials.slice(0, 2).map((m) => (
              <span key={m} className="text-xs px-2 py-1 bg-primary-50 text-gray-600 rounded-full border border-primary-200">
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
