import React, { useEffect, useState } from 'react'
import { getInquiries, updateInquiryStatus, addInquiryNote } from '../../firebase/inquiries'
import { Mail, Phone, Package, MessageSquare, ChevronDown, ChevronUp, Loader, Inbox } from 'lucide-react'

const STATUS_STYLES = {
  new: 'bg-green-500/20 text-green-400',
  read: 'bg-blue-500/20 text-blue-400',
  replied: 'bg-purple-500/20 text-purple-400',
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [noteInput, setNoteInput] = useState({})
  const [filter, setFilter] = useState('all')

  const load = async () => {
    setLoading(true)
    try { setInquiries(await getInquiries()) } catch {}
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleStatus = async (id, status) => {
    await updateInquiryStatus(id, status)
    await load()
  }

  const handleNote = async (id) => {
    if (!noteInput[id]?.trim()) return
    await addInquiryNote(id, noteInput[id])
    setNoteInput(n => ({ ...n, [id]: '' }))
    await load()
  }

  const filtered = filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Inquiries</h1>
          <p className="text-gray-400 text-sm mt-1">Customer inquiry records</p>
        </div>
        <div className="flex gap-2">
          {['all', 'new', 'read', 'replied'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-colors ${
              filter === s ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="py-16 flex justify-center"><Loader size={24} className="animate-spin text-gray-500" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center bg-gray-900 rounded-2xl border border-white/10">
            <Inbox size={32} className="mx-auto text-gray-700 mb-3" />
            <p className="text-gray-500 text-sm">No inquiries yet</p>
          </div>
        ) : filtered.map(inq => (
          <div key={inq.id} className="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div
              className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-white/3"
              onClick={() => {
                setExpanded(e => e === inq.id ? null : inq.id)
                if (inq.status === 'new') handleStatus(inq.id, 'read')
              }}
            >
              <div className="w-9 h-9 rounded-full bg-blue-600/20 flex items-center justify-center text-sm font-bold text-blue-400 flex-shrink-0">
                {inq.company?.[0]?.toUpperCase() || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white truncate">{inq.company}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[inq.status] || STATUS_STYLES.new}`}>
                    {inq.status || 'new'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{inq.product} · {inq.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600 hidden md:block">
                  {inq.createdAt?.toDate ? new Date(inq.createdAt.toDate()).toLocaleDateString() : '—'}
                </span>
                {expanded === inq.id ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
              </div>
            </div>

            {/* Expanded detail */}
            {expanded === inq.id && (
              <div className="px-6 pb-6 border-t border-white/10">
                <div className="grid md:grid-cols-2 gap-4 mt-4 mb-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} className="text-gray-500 flex-shrink-0" />
                      <span className="text-gray-300">{inq.email || '—'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} className="text-gray-500 flex-shrink-0" />
                      <span className="text-gray-300">{inq.phone || '—'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Package size={14} className="text-gray-500 flex-shrink-0" />
                      <span className="text-gray-300">{inq.product || '—'}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    {inq.quantity && <p className="text-gray-400"><span className="text-gray-600">Quantity:</span> {inq.quantity}</p>}
                    {inq.thickness && <p className="text-gray-400"><span className="text-gray-600">Thickness:</span> {inq.thickness}</p>}
                    {inq.colorPreference && <p className="text-gray-400"><span className="text-gray-600">Color:</span> {inq.colorPreference}</p>}
                    {inq.intendedUse && <p className="text-gray-400"><span className="text-gray-600">Usage:</span> {inq.intendedUse}</p>}
                  </div>
                </div>
                {inq.message && (
                  <div className="p-3 bg-gray-800 rounded-xl text-sm text-gray-300 mb-4">
                    <p className="text-xs text-gray-500 mb-1">Message:</p>
                    {inq.message}
                  </div>
                )}
                {inq.note && (
                  <div className="p-3 bg-blue-900/20 border border-blue-500/20 rounded-xl text-sm text-gray-300 mb-4">
                    <p className="text-xs text-blue-400 mb-1">Note:</p>
                    {inq.note}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Status buttons */}
                  <div className="flex gap-2">
                    {['new', 'read', 'replied'].map(s => (
                      <button key={s} onClick={() => handleStatus(inq.id, s)} className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-colors ${
                        inq.status === s ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {/* Note input */}
                  <div className="flex flex-1 gap-2">
                    <input
                      value={noteInput[inq.id] || ''}
                      onChange={e => setNoteInput(n => ({ ...n, [inq.id]: e.target.value }))}
                      placeholder="Add a note..."
                      className="flex-1 px-3 py-1.5 bg-gray-800 border border-white/10 rounded-lg text-white text-xs placeholder-gray-600 focus:outline-none focus:border-blue-500"
                    />
                    <button onClick={() => handleNote(inq.id)} className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs text-white transition-colors">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
