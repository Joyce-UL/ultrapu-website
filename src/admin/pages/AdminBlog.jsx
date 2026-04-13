import React, { useEffect, useState } from 'react'
import { getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost, togglePublish } from '../../firebase/blog'
import { Plus, Edit2, Trash2, Globe, EyeOff, X, Save, Loader, BookOpen } from 'lucide-react'

const EMPTY_FORM = { title: '', summary: '', content: '', tags: '', coverImage: '' }
const inputCls = "w-full px-3 py-2.5 bg-gray-800 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500"

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-gray-900 rounded-2xl w-full max-w-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
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

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)

  const load = async () => {
    setLoading(true)
    try { setPosts(await getBlogPosts()) } catch {}
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setModal(true) }
  const openEdit = (p) => { setForm({ ...p, tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || '') }); setEditId(p.id); setModal(true) }

  const handleSave = async () => {
    setSaving(true)
    try {
      const data = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
      if (editId) await updateBlogPost(editId, data)
      else await addBlogPost(data)
      await load()
      setModal(false)
    } catch (e) { alert('Save failed: ' + e.message) }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    await deleteBlogPost(id)
    await load()
  }

  const handleToggle = async (id, published) => {
    await togglePublish(id, !published)
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 text-sm mt-1">Write and publish articles</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium text-white transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-white/10">
        {loading ? (
          <div className="py-16 flex justify-center"><Loader size={24} className="animate-spin text-gray-500" /></div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center">
            <BookOpen size={32} className="mx-auto text-gray-700 mb-3" />
            <p className="text-gray-500 text-sm">No posts yet. Write your first article!</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {posts.map(p => (
              <div key={p.id} className="flex items-start gap-4 px-6 py-4 hover:bg-white/3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-white truncate">{p.title}</p>
                    {p.published && <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Published</span>}
                    {!p.published && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-400">Draft</span>}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{p.summary}</p>
                  {Array.isArray(p.tags) && p.tags.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {p.tags.map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => handleToggle(p.id, p.published)} className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                    p.published ? 'text-green-400 hover:bg-green-500/10' : 'text-gray-400 hover:bg-white/10'
                  }`}>
                    {p.published ? <Globe size={13} /> : <EyeOff size={13} />}
                    {p.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Edit2 size={15} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <Modal title={editId ? 'Edit Post' : 'New Post'} onClose={() => setModal(false)}>
          <div className="space-y-4">
            <Field label="Title *">
              <input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Article title" />
            </Field>
            <Field label="Summary">
              <input className={inputCls} value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} placeholder="Brief description" />
            </Field>
            <Field label="Cover Image URL">
              <input className={inputCls} value={form.coverImage} onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))} placeholder="https://..." />
            </Field>
            <Field label="Tags (comma separated)">
              <input className={inputCls} value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Industry News, PU Leather, Sustainability" />
            </Field>
            <Field label="Content *">
              <textarea rows={10} className={inputCls} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Write your article content here..." />
            </Field>
            <button onClick={handleSave} disabled={saving} className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-colors">
              {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
