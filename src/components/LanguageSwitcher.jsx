import React from 'react'
import { useLanguage, languages } from '../contexts/LanguageContext'
import { Globe, ChevronDown } from 'lucide-react'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)
  const currentLang = languages.find(l => l.code === lang)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-900/50 hover:bg-primary-800 transition-colors text-sm"
      >
        <Globe size={16} className="text-accent" />
        <span>{currentLang?.flag}</span>
        <span className="hidden sm:inline text-gray-300">{currentLang?.name}</span>
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-primary-200 z-50 max-h-80 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  setLang(language.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary-50 transition-colors ${
                  lang === language.code ? 'bg-accent/10 text-accent' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm">{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
