import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳', native: '中文' },
  { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', native: '한국어' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', native: '日本語' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', native: 'Tiếng Việt' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', native: 'Bahasa Indonesia' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰', native: 'اردو' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', native: 'Français' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', native: 'Deutsch' },
  { code: 'es', name: 'Español', flag: '🇪🇸', native: 'Español' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', native: 'Русский' },
]

export const translations = {
  zh: {
    nav: { home: '首页', products: '产品', newArrivals: '新品', applications: '应用', about: '关于', contact: '联系', getQuote: '获取报价' },
    home: { heroTitle: '高端人造革解决方案', heroSubtitle: '东莞市澳丽德新材料有限公司 - 您值得信赖的PU皮革、超纤及特种材料合作伙伴' },
    products: { title: '产品系列', byMaterial: '按材料分类', byApplication: '按应用分类', viewDetails: '查看详情', downloadCatalog: '下载产品册' },
    productDetail: { specifications: '产品规格', colors: '可选颜色', patterns: '可选纹路', technicalData: '物性数据表', inquiry: '产品询盘' },
    inquiry: { company: '公司名', contact: '联系人', phone: '联系电话', email: '联系邮箱', thickness: '厚度', color: '颜色', category: '产品类别', usage: '用途', quantity: '需求数量', requirements: '特殊要求', submit: '提交询盘' },
    footer: { address: '地址', phone: '电话', email: '邮箱' }
  },
  en: {
    nav: { home: 'Home', products: 'Products', newArrivals: 'New Arrivals', applications: 'Applications', about: 'About', contact: 'Contact', getQuote: 'Get a Quote' },
    home: { heroTitle: 'Premium Synthetic Leather Solutions', heroSubtitle: 'Dongguan Ultra Leather - Your Trusted Partner for PU Leather, Microfiber & Specialty Materials' },
    products: { title: 'Product Series', byMaterial: 'By Material', byApplication: 'By Application', viewDetails: 'View Details', downloadCatalog: 'Download Catalog' },
    productDetail: { specifications: 'Specifications', colors: 'Available Colors', patterns: 'Available Patterns', technicalData: 'Technical Data Sheet', inquiry: 'Product Inquiry' },
    inquiry: { company: 'Company Name', contact: 'Contact Person', phone: 'Phone', email: 'Email', thickness: 'Thickness', color: 'Color', category: 'Product Category', usage: 'Usage', quantity: 'Quantity Needed', requirements: 'Special Requirements', submit: 'Submit Inquiry' },
    footer: { address: 'Address', phone: 'Phone', email: 'Email' }
  },
  ko: {
    nav: { home: '홈', products: '제품', newArrivals: '신제품', applications: '적용분야', about: '회사소개', contact: '문의', getQuote: '견적문의' },
    home: { heroTitle: '고급 인조 가죽 솔루션', heroSubtitle: '동관 울트라 레더 - PU 가죽, 마이크로파이버 및 특수 소재의 신뢰할 수 있는 파트너' },
    products: { title: '제품 시리즈', byMaterial: '소재별', byApplication: '용도별', viewDetails: '자세히 보기', downloadCatalog: '카탈로그 다운로드' },
    productDetail: { specifications: '제품 사양', colors: '사용 가능한 색상', patterns: '사용 가능한 무늬', technicalData: '기술 데이터 시트', inquiry: '제품 문의' },
    inquiry: { company: '회사명', contact: '담당자', phone: '연락처', email: '이메일', thickness: '두께', color: '색상', category: '제품 카테고리', usage: '용도', quantity: '수량', requirements: '특별 요구사항', submit: '문의 제출' },
    footer: { address: '주소', phone: '전화', email: '이메일' }
  },
  ja: {
    nav: { home: 'ホーム', products: '製品', newArrivals: '新製品', applications: '用途', about: '会社概要', contact: 'お問い合わせ', getQuote: '見積もり' },
    home: { heroTitle: '高級合成皮革ソリューション', heroSubtitle: '東莞ウルトラレザー - PUレザー、マイクロファイバー、特殊素材の信頼できるパートナー' },
    products: { title: '製品シリーズ', byMaterial: '素材別', byApplication: '用途別', viewDetails: '詳細を見る', downloadCatalog: 'カタログをダウンロード' },
    productDetail: { specifications: '製品仕様', colors: '利用可能な色', patterns: '利用可能な柄', technicalData: '技術データシート', inquiry: '製品お問い合わせ' },
    inquiry: { company: '会社名', contact: '担当者', phone: '電話番号', email: 'メール', thickness: '厚さ', color: '色', category: '製品カテゴリ', usage: '用途', quantity: '必要数量', requirements: '特別な要件', submit: 'お問い合わせを送信' },
    footer: { address: '住所', phone: '電話', email: 'メール' }
  },
  vi: {
    nav: { home: 'Trang chủ', products: 'Sản phẩm', newArrivals: 'Hàng mới', applications: 'Ứng dụng', about: 'Giới thiệu', contact: 'Liên hệ', getQuote: 'Báo giá' },
    home: { heroTitle: 'Giải pháp Da Tổng hợp Cao cấp', heroSubtitle: 'Ultra Leather Đông Quan - Đối tác đáng tin cậy của bạn cho Da PU, Sợi siêu nhỏ & Vật liệu đặc biệt' },
    products: { title: 'Dòng sản phẩm', byMaterial: 'Theo chất liệu', byApplication: 'Theo ứng dụng', viewDetails: 'Xem chi tiết', downloadCatalog: 'Tải catalog' },
    productDetail: { specifications: 'Thông số kỹ thuật', colors: 'Màu sắc có sẵn', patterns: 'Họa tiết có sẵn', technicalData: 'Bảng dữ liệu kỹ thuật', inquiry: 'Yêu cầu báo giá' },
    inquiry: { company: 'Tên công ty', contact: 'Người liên hệ', phone: 'Điện thoại', email: 'Email', thickness: 'Độ dày', color: 'Màu sắc', category: 'Danh mục sản phẩm', usage: 'Mục đích sử dụng', quantity: 'Số lượng cần', requirements: 'Yêu cầu đặc biệt', submit: 'Gửi yêu cầu' },
    footer: { address: 'Địa chỉ', phone: 'Điện thoại', email: 'Email' }
  },
  id: {
    nav: { home: 'Beranda', products: 'Produk', newArrivals: 'Produk Baru', applications: 'Aplikasi', about: 'Tentang', contact: 'Kontak', getQuote: 'Minta Penawaran' },
    home: { heroTitle: 'Solusi Kulit Sintetis Premium', heroSubtitle: 'Dongguan Ultra Leather - Mitra Tepercaya Anda untuk Kulit PU, Mikrofiber & Material Khusus' },
    products: { title: 'Seri Produk', byMaterial: 'Berdasarkan Material', byApplication: 'Berdasarkan Aplikasi', viewDetails: 'Lihat Detail', downloadCatalog: 'Unduh Katalog' },
    productDetail: { specifications: 'Spesifikasi Produk', colors: 'Warna Tersedia', patterns: 'Pola Tersedia', technicalData: 'Lembar Data Teknis', inquiry: 'Pertanyaan Produk' },
    inquiry: { company: 'Nama Perusahaan', contact: 'Kontak', phone: 'Telepon', email: 'Email', thickness: 'Ketebalan', color: 'Warna', category: 'Kategori Produk', usage: 'Penggunaan', quantity: 'Jumlah yang Dibutuhkan', requirements: 'Persyaratan Khusus', submit: 'Kirim Pertanyaan' },
    footer: { address: 'Alamat', phone: 'Telepon', email: 'Email' }
  },
  ur: {
    nav: { home: 'ہوم', products: 'مصنوعات', newArrivals: 'نئی آمد', applications: 'استعمال', about: 'ہمارے بارے میں', contact: 'رابطہ', getQuote: 'اقتباس حاصل کریں' },
    home: { heroTitle: 'پریمیم مصنوعی چمڑے کے حل', heroSubtitle: 'ڈونگ گوان الٹرا لیٹر - PU لیٹر، مائیکروفائبر اور خصوصی مواد کے لیے آپ کا قابل اعتماد پارٹنر' },
    products: { title: 'پروڈکٹ سیریز', byMaterial: 'مواد کے لحاظ سے', byApplication: 'استعمال کے لحاظ سے', viewDetails: 'تفصیلات دیکھیں', downloadCatalog: 'کیٹلاگ ڈاؤن لوڈ کریں' },
    productDetail: { specifications: 'پروڈکٹ کی تفصیلات', colors: 'دستیاب رنگ', patterns: 'دستیاب پیٹرن', technicalData: 'تکنیکی ڈیٹا شیٹ', inquiry: 'پروڈکٹ انکوائری' },
    inquiry: { company: 'کمپنی کا نام', contact: 'رابطہ شخص', phone: 'فون', email: 'ای میل', thickness: 'موٹائی', color: 'رنگ', category: 'پروڈکٹ کیٹیگری', usage: 'استعمال', quantity: 'درکار مقدار', requirements: 'خصوصی تقاضے', submit: 'انکوائری جمع کریں' },
    footer: { address: 'پتہ', phone: 'فون', email: 'ای میل' }
  },
  fr: {
    nav: { home: 'Accueil', products: 'Produits', newArrivals: 'Nouveautés', applications: 'Applications', about: 'À propos', contact: 'Contact', getQuote: 'Demander un devis' },
    home: { heroTitle: 'Solutions en Cuir Synthétique Premium', heroSubtitle: 'Dongguan Ultra Leather - Votre Partenaire de Confiance pour le Cuir PU, la Microfibre & les Matériaux Spéciaux' },
    products: { title: 'Série de Produits', byMaterial: 'Par Matériau', byApplication: 'Par Application', viewDetails: 'Voir les détails', downloadCatalog: 'Télécharger le catalogue' },
    productDetail: { specifications: 'Spécifications', colors: 'Couleurs disponibles', patterns: 'Motifs disponibles', technicalData: 'Fiche technique', inquiry: 'Demande de renseignements' },
    inquiry: { company: 'Nom de la société', contact: 'Contact', phone: 'Téléphone', email: 'Email', thickness: 'Épaisseur', color: 'Couleur', category: 'Catégorie', usage: 'Utilisation', quantity: 'Quantité', requirements: 'Exigences spéciales', submit: 'Envoyer' },
    footer: { address: 'Adresse', phone: 'Téléphone', email: 'Email' }
  },
  de: {
    nav: { home: 'Startseite', products: 'Produkte', newArrivals: 'Neuheiten', applications: 'Anwendungen', about: 'Über uns', contact: 'Kontakt', getQuote: 'Angebot anfordern' },
    home: { heroTitle: 'Premium Kunstleder Lösungen', heroSubtitle: 'Dongguan Ultra Leather - Ihr vertrauenswürdiger Partner für PU-Leder, Mikrofaser & Spezialmaterialien' },
    products: { title: 'Produktserien', byMaterial: 'Nach Material', byApplication: 'Nach Anwendung', viewDetails: 'Details anzeigen', downloadCatalog: 'Katalog herunterladen' },
    productDetail: { specifications: 'Spezifikationen', colors: 'Verfügbare Farben', patterns: 'Verfügbare Muster', technicalData: 'Technisches Datenblatt', inquiry: 'Produktanfrage' },
    inquiry: { company: 'Firmenname', contact: 'Ansprechpartner', phone: 'Telefon', email: 'E-Mail', thickness: 'Dicke', color: 'Farbe', category: 'Produktkategorie', usage: 'Verwendung', quantity: 'Benötigte Menge', requirements: 'Besondere Anforderungen', submit: 'Anfrage senden' },
    footer: { address: 'Adresse', phone: 'Telefon', email: 'E-Mail' }
  },
  es: {
    nav: { home: 'Inicio', products: 'Productos', newArrivals: 'Novedades', applications: 'Aplicaciones', about: 'Nosotros', contact: 'Contacto', getQuote: 'Solicitar presupuesto' },
    home: { heroTitle: 'Soluciones en Cuero Sintético Premium', heroSubtitle: 'Dongguan Ultra Leather - Su Socio de Confianza para Cuero PU, Microfibra y Materiales Especiales' },
    products: { title: 'Series de Productos', byMaterial: 'Por Material', byApplication: 'Por Aplicación', viewDetails: 'Ver detalles', downloadCatalog: 'Descargar catálogo' },
    productDetail: { specifications: 'Especificaciones', colors: 'Colores disponibles', patterns: 'Patrones disponibles', technicalData: 'Ficha técnica', inquiry: 'Consulta de producto' },
    inquiry: { company: 'Nombre de la empresa', contact: 'Persona de contacto', phone: 'Teléfono', email: 'Correo electrónico', thickness: 'Grosor', color: 'Color', category: 'Categoría', usage: 'Uso', quantity: 'Cantidad necesaria', requirements: 'Requisitos especiales', submit: 'Enviar consulta' },
    footer: { address: 'Dirección', phone: 'Teléfono', email: 'Correo' }
  },
  ru: {
    nav: { home: 'Главная', products: 'Продукция', newArrivals: 'Новинки', applications: 'Применение', about: 'О компании', contact: 'Контакты', getQuote: 'Запросить цену' },
    home: { heroTitle: 'Премиум решения из искусственной кожи', heroSubtitle: 'Dongguan Ultra Leather - Ваш надежный партнер по коже PU, микрофибре и специальным материалам' },
    products: { title: 'Серии продуктов', byMaterial: 'По материалу', byApplication: 'По применению', viewDetails: 'Подробнее', downloadCatalog: 'Скачать каталог' },
    productDetail: { specifications: 'Характеристики', colors: 'Доступные цвета', patterns: 'Доступные узоры', technicalData: 'Технический паспорт', inquiry: 'Запрос продукта' },
    inquiry: { company: 'Название компании', contact: 'Контактное лицо', phone: 'Телефон', email: 'Email', thickness: 'Толщина', color: 'Цвет', category: 'Категория', usage: 'Применение', quantity: 'Необходимое количество', requirements: 'Особые требования', submit: 'Отправить запрос' },
    footer: { address: 'Адрес', phone: 'Телефон', email: 'Email' }
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0]
    const supportedLangs = languages.map(l => l.code)
    if (supportedLangs.includes(browserLang)) {
      setLang(browserLang)
    }
  }, [])

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[lang]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
