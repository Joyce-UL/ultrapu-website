import React, { useState } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AdminBlog from './pages/AdminBlog'
import AdminInquiries from './pages/AdminInquiries'
import {
  LayoutDashboard, Package, FileText, Inbox,
  LogOut, Menu, X, ChevronRight
} from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-gray-900 border-r border-white/10 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div>
            <p className="font-bold text-sm text-white">Ultra Leather</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
              {user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user?.email}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-white/10 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400">
            <Menu size={20} />
          </button>
          <span className="font-semibold text-sm">Admin Panel</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="products/*" element={<AdminProducts />} />
            <Route path="blog/*" element={<AdminBlog />} />
            <Route path="inquiries" element={<AdminInquiries />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
