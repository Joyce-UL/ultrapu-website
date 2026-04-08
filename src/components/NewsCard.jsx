import React from 'react'
import { Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NewsCard({ news }) {
  const categoryColors = {
    '新品发布': 'bg-accent/10 text-accent',
    '资质认证': 'bg-green-500/10 text-green-500',
    '展会信息': 'bg-blue-500/10 text-blue-500',
    '行业动态': 'bg-purple-500/10 text-purple-500',
  }

  return (
    <div className="group card-shine bg-surface-card border border-surface-border rounded-2xl overflow-hidden card-hover flex flex-col h-full">
      {/* Color bar */}
      <div className="h-1 bg-gradient-to-r from-accent to-accent-dark" />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            categoryColors[news.category] || 'bg-white/10 text-white'
          }`}>
            {news.category}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Calendar size={12} />
            {news.date}
          </div>
        </div>

        <h3 className="font-display font-semibold text-white text-base mb-3 group-hover:text-accent transition-colors line-clamp-2 flex-1">
          {news.title}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {news.excerpt}
        </p>

        <button className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
          Read More
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
