import React from 'react'
import { Calendar, ArrowRight } from 'lucide-react'

const categoryColors = {
  '新品发布': 'bg-accent/10 text-accent',
  '资质认证': 'bg-green-500/10 text-green-400',
  '展会信息': 'bg-blue-500/10 text-blue-400',
  '行业动态': 'bg-purple-500/10 text-purple-400',
  'Product Launch': 'bg-accent/10 text-accent',
  'Certification': 'bg-green-500/10 text-green-400',
  'Exhibition': 'bg-blue-500/10 text-blue-400',
  'Industry News': 'bg-purple-500/10 text-purple-400',
}

export default function NewsCard({ news }) {
  return (
    <div className="group card-shine bg-surface-card border border-surface-border rounded-2xl overflow-hidden card-hover flex flex-col h-full">
      {/* Color bar */}
      <div className="h-[3px] bg-gradient-to-r from-accent to-accent-dark" />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            categoryColors[news.category] || 'bg-white/10 text-white'
          }`}>
            {news.category}
          </span>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Calendar size={12} />
            {news.date}
          </div>
        </div>

        <h3 className="font-display font-semibold text-white text-base mb-3 group-hover:text-accent transition-colors line-clamp-2 flex-1 leading-snug">
          {news.title}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2 mb-5 leading-relaxed">
          {news.excerpt}
        </p>

        <button className="inline-flex items-center gap-1.5 text-accent text-sm font-medium group-hover:gap-2.5 transition-all mt-auto">
          Read More
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
