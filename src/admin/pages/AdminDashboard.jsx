import React, { useEffect, useState } from 'react'
import { Package, FileText, Inbox, TrendingUp, Eye, Clock } from 'lucide-react'
import { getProducts } from '../../firebase/products'
import { getBlogPosts } from '../../firebase/blog'
import { getInquiries } from '../../firebase/inquiries'

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-white/10">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-600 mt-1">{sub}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, blogs: 0, inquiries: 0, newInquiries: 0 })
  const [recentInquiries, setRecentInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [products, blogs, inquiries] = await Promise.all([
          getProducts(),
          getBlogPosts(),
          getInquiries(),
        ])
        setStats({
          products: products.length,
          blogs: blogs.filter(b => b.published).length,
          inquiries: inquiries.length,
          newInquiries: inquiries.filter(i => i.status === 'new').length,
        })
        setRecentInquiries(inquiries.slice(0, 5))
      } catch (e) {
        // Firebase not configured yet
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Package} label="Products" value={loading ? '—' : stats.products} sub="Total listed" color="bg-blue-600" />
        <StatCard icon={FileText} label="Blog Posts" value={loading ? '—' : stats.blogs} sub="Published" color="bg-purple-600" />
        <StatCard icon={Inbox} label="Inquiries" value={loading ? '—' : stats.inquiries} sub="Total received" color="bg-green-600" />
        <StatCard icon={TrendingUp} label="New Inquiries" value={loading ? '—' : stats.newInquiries} sub="Unread" color="bg-orange-600" />
      </div>

      {/* Recent Inquiries */}
      <div className="bg-gray-900 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="font-semibold text-white">Recent Inquiries</h2>
          <a href="/admin/inquiries" className="text-xs text-blue-400 hover:text-blue-300">View all →</a>
        </div>
        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="px-6 py-8 text-center text-gray-500 text-sm">Loading...</div>
          ) : recentInquiries.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500 text-sm">No inquiries yet</div>
          ) : recentInquiries.map((inq) => (
            <div key={inq.id} className="flex items-center gap-4 px-6 py-3">
              <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-xs font-bold text-blue-400">
                {inq.company?.[0]?.toUpperCase() || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{inq.company || 'Unknown'}</p>
                <p className="text-xs text-gray-500 truncate">{inq.product || ''} · {inq.email || ''}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                inq.status === 'new' ? 'bg-green-500/20 text-green-400' :
                inq.status === 'replied' ? 'bg-blue-500/20 text-blue-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {inq.status || 'new'}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Clock size={11} />
                {inq.createdAt?.toDate ? new Date(inq.createdAt.toDate()).toLocaleDateString() : '—'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
