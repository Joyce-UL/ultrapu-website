import React, { useRef, useEffect } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { lang, setLang, languages, currentLangInfo } = useLanguage()
  const dropdownRef = useRef(null)
  const [showDropdown, setShowDropdown] = React.useState(false)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg
          bg-white/10 hover:bg-white/20 backdrop-blur-sm
          border border-white/20 transition-all duration-200
          text-sm font-medium min-w-[120px]
        `}
      >
        <Globe size={16} />
        <span className="flex-1 text-left">{currentLangInfo.flag} {currentLangInfo.native}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div
          className={`
            absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto
            bg-white rounded-xl shadow-2xl z-50
            border border-gray-100
          `}
          style={{ minWidth: '200px' }}
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Select Language
            </span>
          </div>

          {/* Language List */}
          <div className="py-2">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code)
                  setShowDropdown(false)
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5
                  hover:bg-gray-50 transition-colors duration-150
                  ${lang === l.code ? 'bg-blue-50' : ''}
                `}
              >
                <span className="text-xl">{l.flag}</span>
                <div className="flex-1 text-left">
                  <div className={`font-medium ${lang === l.code ? 'text-blue-600' : 'text-gray-800'}`}>
                    {l.native}
                  </div>
                  <div className="text-xs text-gray-500">{l.name}</div>
                </div>
                {lang === l.code && (
                  <Check size={16} className="text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
