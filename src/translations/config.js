// 支持的语言列表（含阿拉伯语 RTL 支持）
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', native: 'English', rtl: false },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳', native: '简体中文', rtl: false },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼', native: '繁體中文', rtl: false },
  { code: 'es', name: 'Español', flag: '🇪🇸', native: 'Español', rtl: false },
  { code: 'fr', name: 'Français', flag: '🇫🇷', native: 'Français', rtl: false },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', native: 'العربية', rtl: true },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', native: 'Русский', rtl: false },
  { code: 'pt', name: 'Português', flag: '🇵🇹', native: 'Português', rtl: false },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', native: 'Deutsch', rtl: false },
  { code: 'ja', name: '日本語', flag: '🇯🇵', native: '日本語', rtl: false },
  { code: 'ko', name: '한국어', flag: '🇰🇷', native: '한국어', rtl: false },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', native: 'Tiếng Việt', rtl: false },
  { code: 'th', name: 'ไทย', flag: '🇹🇭', native: 'ไทย', rtl: false },
  { code: 'id', name: 'Bahasa', flag: '🇮🇩', native: 'Bahasa Indonesia', rtl: false },
]

// Google Translate API 配置
export const GOOGLE_TRANSLATE_CONFIG = {
  // 使用 Google Translate 网页版（无需 API Key）
  widgetUrl: '//translate.google.com/translate_a/element.js',
}

// 语言别名映射（兼容不同命名）
export const langCodeAliases = {
  'zh': 'zh-CN',
  'zh-Hans': 'zh-CN',
  'zh-Hant': 'zh-TW',
  'pt-BR': 'pt',
  'pt-PT': 'pt',
}
