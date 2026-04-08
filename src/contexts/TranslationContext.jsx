import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react'
import { languages } from '../translations/config'

// 创建上下文
const TranslationContext = createContext()

// 翻译提供器组件
export function TranslationProvider({ children }) {
  const [currentLang, setCurrentLang] = useState('en')
  const [isTranslating, setIsTranslating] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const translateInitialized = useRef(false)

  // 初始化翻译系统
  useEffect(() => {
    // 加载 Google Translate
    loadGoogleTranslate()

    // 检测浏览器语言
    const savedLang = localStorage.getItem('ultrapu-lang')
    if (savedLang) {
      setCurrentLang(savedLang)
      if (savedLang !== 'en') {
        setTimeout(() => doTranslate(savedLang), 1500)
      }
    } else {
      const detected = detectBrowserLanguage()
      setCurrentLang(detected)
      if (detected !== 'en') {
        setTimeout(() => doTranslate(detected), 1500)
      }
    }
  }, [])

  // 加载 Google Translate Element
  const loadGoogleTranslate = () => {
    if (window.google?.translate?.TranslateElement) {
      return
    }

    const existingScript = document.getElementById('google-translate-script')
    if (existingScript) return

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: languages.map(l => l.code).join(','),
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      }, 'google-translate-element')
    }
  }

  // 检测浏览器语言
  const detectBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage
    const langCode = browserLang.split('-')[0]

    // 精确匹配
    const exactMatch = languages.find(l =>
      l.code.toLowerCase() === browserLang.toLowerCase() ||
      l.code.toLowerCase().startsWith(langCode)
    )
    if (exactMatch) return exactMatch.code

    return 'en'
  }

  // 执行翻译
  const doTranslate = useCallback((targetLang) => {
    if (targetLang === 'en') {
      // 恢复英文 - 移除翻译
      resetTranslation()
      return
    }

    setIsTranslating(true)

    // 等待 Google Translate 加载
    const tryTranslate = () => {
      const selectElement = document.querySelector('.goog-te-combo')

      if (selectElement) {
        selectElement.value = targetLang
        selectElement.dispatchEvent(new Event('change'))

        // 更新页面方向 (RTL)
        const lang = languages.find(l => l.code === targetLang)
        if (lang?.rtl) {
          document.documentElement.dir = 'rtl'
        } else {
          document.documentElement.dir = 'ltr'
        }

        setCurrentLang(targetLang)
        localStorage.setItem('ultrapu-lang', targetLang)
        setIsTranslating(false)
        translateInitialized.current = true
      } else {
        // 再试一次
        setTimeout(tryTranslate, 500)
      }
    }

    tryTranslate()
  }, [])

  // 重置翻译
  const resetTranslation = () => {
    document.documentElement.dir = 'ltr'

    // 移除 Google Translate 覆盖层
    const frame = document.querySelector('.goog-iframe-widget')
    if (frame) frame.remove()

    const banner = document.querySelector('.goog-te-banner-frame')
    if (banner) banner.remove()

    // 重新加载页面以恢复原始语言
    window.location.reload()
  }

  // 切换语言
  const switchLanguage = useCallback((langCode) => {
    setShowDropdown(false)
    doTranslate(langCode)
  }, [doTranslate])

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 当前语言信息
  const currentLangInfo = languages.find(l => l.code === currentLang) || languages[0]

  const value = {
    currentLang,
    currentLangInfo,
    languages,
    isTranslating,
    showDropdown,
    setShowDropdown,
    switchLanguage,
    translateInitialized: translateInitialized.current,
  }

  return (
    <TranslationContext.Provider value={value}>
      {/* Google Translate 容器（隐藏） */}
      <div id="google-translate-element" style={{ display: 'none' }} />

      {children}
    </TranslationContext.Provider>
  )
}

// Hook
export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }
  return context
}
