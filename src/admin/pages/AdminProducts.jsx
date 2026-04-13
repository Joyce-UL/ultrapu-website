import React, { useEffect, useState, useRef } from 'react'
import { getProducts, addProduct, updateProduct, deleteProduct, toggleProductVisibility } from '../../firebase/products'
import { uploadImage, deleteImage } from '../../firebase/storage'
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, Loader, Upload, Image as ImageIcon } from 'lucide-react'

const EMPTY_FORM = {
  name: '', category: '', tagline: '', description: '',
  composition: '', stock: '', visible: true, image: '',
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg border border-white/10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={18} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "w-full px-3 py-2.5 bg-gray-800 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500"

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [modal, setModal] = useState(null) // null | 'add' | 'edit'
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const fileInputRef = useRef(null)

  const load = async () => {
    setLoading(true)
    try { setProducts(await getProducts()) } catch {}
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setModal('edit') }
  const openEdit = (p) => { setForm({ ...p }); setEditId(p.id); setModal('edit') }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadProgress(0)
    try {
      const url = await uploadImage(file, `products/${Date.now()}_${file.name}`, (p) => {
        setUploadProgress(p)
      })
      setForm(f => ({ ...f, image: url }))
    } catch (err) {
      alert('Upload failed: ' + err.message)
    }
    setUploading(false)
  }

  const handleDeleteImage = async () => {
    if (form.image) {
      await deleteImage(form.image)
      setForm(f => ({ ...f, image: '' }))
    }
  }

  const handleSave = async () => {
    if (!form.name) {
      alert('Product name is required!')
      return
    }
    setSaving(true)
    try {
      if (editId) await updateProduct(editId, form)
      else await addProduct(form)
      await load()
      setModal(null)
    } catch (e) { alert('Save failed: ' + e.message) }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    await deleteProduct(id)
    await load()
  }

  const handleToggle = async (id, visible) => {
    await toggleProductVisibility(id, !visible)
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your product catalog</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium text-white transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-white/10">
        {loading ? (
          <div className="py-16 flex justify-center"><Loader size={24} className="animate-spin text-gray-500" /></div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">No products yet. Add your first product!</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-white/10">
                <th className="text-left px-6 py-3">Product</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Stock</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/3">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-800" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
                          <ImageIcon size={20} className="text-gray-600" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-white">{p.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{p.tagline}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell text-sm text-gray-400">{p.category}</td>
                  <td className="px-4 py-4 hidden md:table-cell text-sm text-gray-400">{p.stock || '—'}</td>
                  <td className="px-4 py-4">
                    <button onClick={() => handleToggle(p.id, p.visible)} className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full transition-colors ${
                      p.visible ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-500'
                    }`}>
                      {p.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                      {p.visible ? 'Visible' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal === 'edit' && (
        <Modal title={editId ? 'Edit Product' : 'Add Product'} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Product Name *">
                <input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="PU Leather" />
              </Field>
              <Field label="Category">
                <input className={inputCls} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Synthetic Leather" />
              </Field>
            </div>
            <Field label="Tagline">
              <input className={inputCls} value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} placeholder="Classic Quality, Wide Applications" />
            </Field>
            <Field label="Description">
              <textarea rows={3} className={inputCls} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Product description..." />
            </Field>
            
            {/* Image Upload */}
            <Field label="Product Image">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {form.image ? (
                <div className="relative rounded-xl overflow-hidden bg-gray-800 border border-white/10">
                  <img src={form.image} alt="Product" className="w-full h-40 object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button onClick={() => fileInputRef.current?.click()} className="p-1.5 bg-gray-900/80 hover:bg-gray-900 rounded-lg text-white/80 hover:text-white transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={handleDeleteImage} className="p-1.5 bg-gray-900/80 hover:bg-red-500/80 rounded-lg text-white/80 hover:text-white transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ) : uploading ? (
                <div className="bg-gray-800 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center">
                  <Loader size={24} className="animate-spin text-blue-500 mb-2" />
                  <p className="text-sm text-gray-400">Uploading... {uploadProgress}%</p>
                  <div className="w-32 h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              ) : (
                <button onClick={() => fileInputRef.current?.click()} className="w-full py-8 bg-gray-800 border-2 border-dashed border-white/10 rounded-xl hover:border-blue-500/50 hover:bg-gray-800/80 transition-colors flex flex-col items-center justify-center gap-2">
                  <Upload size={24} className="text-gray-500" />
                  <p className="text-sm text-gray-400">Click to upload image</p>
                  <p className="text-xs text-gray-600">PNG, JPG up to 5MB</p>
                </button>
              )}
            </Field>
            
            <div className="grid grid-cols-2 gap-4">
              <Field label="Composition">
                <input className={inputCls} value={form.composition} onChange={e => setForm(f => ({ ...f, composition: e.target.value }))} placeholder="100% PU on Polyester" />
              </Field>
              <Field label="Stock / Quantity">
                <input className={inputCls} value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} placeholder="e.g. 5000 yards" />
              </Field>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-white/10">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={form.visible} onChange={e => setForm(f => ({ ...f, visible: e.target.checked }))} className="sr-only peer" />
                <div className="w-10 h-6 bg-gray-700 peer-checked:bg-blue-600 rounded-full transition-colors" />
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
              </label>
              <span className="text-sm text-gray-300">Visible on website</span>
            </div>
            <button onClick={handleSave} disabled={saving} className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-colors">
              {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
