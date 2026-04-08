import React from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useTranslation } from '../contexts/TranslationContext'
import { languages } from '../translations/config'

export default function LanguageSwitcher() {
  const {
    currentLang,
    currentLangInfo,
    showDropdown,
    setShowDropdown,
    switchLanguage,
    isTranslating,
  } = useTranslation()

  return (
    <div className="relative" ref={(el) => { this.dropdownRef = el }}>
      {/* Toggle Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg
          bg-white/10 hover:bg-white/20 backdrop-blur-sm
          border border-white/20 transition-all duration-200
          text-sm font-medium min-w-[120px]
        `}
        disabled={isTranslating}
      >
        {isTranslating ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>翻译中...</span>
          </>
        ) : (
          <>
            <Globe size={16} />
            <span className="flex-1 text-left">{currentLangInfo.flag} {currentLangInfo.native}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div
          className={`
            absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto
            bg-white rounded-xl shadow-2xl z-50
            border border-gray-100
            animate-fadeIn
          `}
          style={{ minWidth: '200px' }}
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              选择语言 / Select Language
            </span>
          </div>

          {/* Language List */}
          <div className="py-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5
                  hover:bg-gray-50 transition-colors duration-150
                  ${currentLang === lang.code ? 'bg-primary/5' : ''}
                `}
              >
                <span className="text-xl">{lang.flag}</span>
                <div className="flex-1 text-left">
                  <div className={`font-medium ${currentLang === lang.code ? 'text-primary' : 'text-gray-800'}`}>
                    {lang.native}
                  </div>
                  <div className="text-xs text-gray-500">{lang.name}</div>
                </div>
                {currentLang === lang.code && (
                  <Check size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs text-gray-400">
              Powered by Google Translate
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
