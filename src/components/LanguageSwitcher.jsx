import React from 'react'
import { useLanguage, languages } from '../contexts/LanguageContext'
import { Globe, ChevronDown, Check } from 'lucide-react'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)
  const currentLang = languages.find(l => l.code === lang)

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 text-sm font-medium"
        style={{ minWidth: '140px' }}
      >
        <Globe size={16} className="text-white/80" />
        <span className="text-base">{currentLang?.flag}</span>
        <span className="flex-1 text-white">{currentLang?.name}</span>
        <ChevronDown 
          size={16} 
          className={`text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  setLang(language.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  lang === language.code 
                    ? 'bg-primary-50 text-primary' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl w-8 text-center">{language.flag}</span>
                <span className="flex-1 text-sm font-medium">{language.name}</span>
                <span className="text-xs text-gray-400 mr-2">{language.native}</span>
                {lang === language.code && (
                  <Check size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out;
        }
      `}</style>
    </div>
  )
}
