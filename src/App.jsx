import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SocialButtons from './components/SocialButtons'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Products from './pages/Products'
import NewArrivals from './pages/NewArrivals'
import Applications from './pages/Applications'
import About from './pages/About'
import Contact from './pages/Contact'
import { LanguageProvider } from './contexts/LanguageContext'
import ProductDetail from './pages/ProductDetail'
import Patterns from './pages/Patterns'
import { AuthProvider, useAuth } from './admin/AuthContext'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'

function AdminGuard() {
  const { user } = useAuth()
  if (!user) return <AdminLogin />
  return <AdminLayout />
}

function PublicSite() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:categoryId" element={<ProductDetail />} />
            <Route path="/patterns" element={<Patterns />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <SocialButtons />
        <ScrollToTop />
      </div>
    </LanguageProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminGuard />} />
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
