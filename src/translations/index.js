// Translation index - import all language files
import en from './en'
import zhCN from './zh-CN'

// 添加更多语言可以在这里导入
// import es from './es'
// import fr from './fr'
// import ar from './ar'
// import ja from './ja'
// import ko from './ko'
// import vi from './vi'
// import th from './th'
// import id from './id'
// import pt from './pt'
// import de from './de'
// import ru from './ru'
// import zhTW from './zh-TW'

export const translations = {
  en,
  'zh-CN': zhCN,
  // 添加更多语言
  // es,
  // fr,
  // ar,
  // ja,
  // ko,
  // vi,
  // th,
  // id,
  // pt,
  // de,
  // ru,
  // 'zh-TW': zhTW,
}

// 快速翻译函数
export function getTranslation(translations, lang, path) {
  const currentTranslations = translations[lang] || translations['en']
  const keys = path.split('.')
  
  let result = currentTranslations
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key]
    } else {
      // 回退到英文
      result = translations['en']
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k]
        } else {
          return path // 返回键名如果翻译不存在
        }
      }
      return result
    }
  }
  return result
}