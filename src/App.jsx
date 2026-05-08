import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import {
  Sun, Moon, Bell, Search, Settings, Home, Heart,
  MapPin, Bed, Maximize2, Building2, Trash2, Phone, Bot,
  Sparkles, TrendingUp, Download, Filter, ChevronLeft,
  ChevronRight, Plus, ArrowUpRight, ArrowDownRight, ArrowRight,
  Eye, MessageCircle, X, LogOut, Shield, Clock, Camera,
  CheckCircle, AlertCircle, BarChart2, User, Lock,
  Zap, FileText, Save, Smartphone, Monitor, Upload,
  AlertTriangle, DollarSign, Check, BellOff,
  ChevronDown, ChevronUp, Star, RefreshCw, Trash,
  Calendar, BarChart3, Key
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════
const T = {
  uz: {
    nav: { listings:"E'lonlar", compare:'Solishtirish', favorites:'Sevimlilar', login:'Kirish', logout:'Chiqish', admin:'Admin' },
    home: {
      hero_title:"O'zingizga qulay uy joy qidiring",
      hero_sub:"Millionlab ma'lumotlarni tahlil qilamiz — siz faqat o'z uyingizni toping",
      search_placeholder:"Shahar yoki tuman qidiring...", property_type:"Mulk turi", search_btn:'Qidirish',
      market_insights:'Bozor tahlili', ai_driven:"Narx tendensiyalari yirik O'zbek shaharlari bo'yicha",
      view_report:"Hisobotni ko'rish", featured:"Tanlangan E'lonlar",
      cta_title:"Narxlashni sinab ko'ring", cta_sub:"Har qanday mulkning haqiqiy bozor qiymatini aniqlang",
      try_valuation:'Narxlashni boshlash', contact_advisor:'Maslahat olish',
      show_all_regions:'Barcha viloyatlarni ko\'rish', hide_regions:'Yashirish',
      region_analysis:'Viloyat tahlili'
    },
    listings: {
      title:"Mavjud E'lonlar", filters:'Filtrlar', price_range:"Narx oralig'i ($)",
      districts:'Tumanlar', rooms:'Xonalar', all:'Barchasi', property_type:'Mulk turi',
      apply_filters:'Filtrlarni qo\'llash', smart_filter:'Aqlli saralash',
      properties_found:"mulk topildi", sort_by:'Saralash',
      price_low:'Narx: pastdan', price_high:'Narx: balanddan', no_results:"Hech qanday natija topilmadi"
    },
    compare: {
      title:'Mulklarni Solishtirish', sub:'Qiyosiy tahlil',
      features:'Xususiyatlar', total_price:'Jami narx', price_m2:'Narx/m²',
      specs:'Parametrlar', ai_explanation:'Tahlil',
      book_tour:'Tur buyurtma qilish', view_details:"Batafsil ko'rish",
      market_pulse:'Bozor holati', export:'Hisobotni eksport qilish',
      export_sub:"PDF formatida to'liq taqqoslash hisobotini yuklab oling", download_pdf:'PDF yuklab olish'
    },
    favorites: {
      title:'Sevimlilar', sub:"Saqlab qo'yilgan e'lonlar va narx o'zgarishlari",
      market_intelligence:'Bozor tahlili', view_trends:"Tendensiyani ko'rish",
      price_alerts:'Narx ogohlantirishlari', alerts_sub:"Sevimlilaringiz narxi tushganda darhol xabar oling",
      alerts_active:"Ogohlantirishlar yoqilgan", empty:"Hali sevimlilar yo'q."
    },
    listing_detail: {
      analysis:'Narx tahlili', analysis_sub:"Bozor ma'lumotlari asosida baholandi",
      estimated:'Taxminiy qiymat', current_price:'Joriy narx',
      area_avg:"Tuman o'rtachasi",
      description:'Tavsif', contact_seller:"Sotuvchi bilan bog'lanish",
      advisor:'Maslahatchi', amenities:'Qulayliklar', back:'Orqaga'
    },
    profile: {
      premium:'Premium foydalanuvchi', upgrade:'Yangilash', logout:'Chiqish',
      my_listings:"Mening e'lonlarim", manage:"E'lonlaringizni boshqaring",
      new_listing:"Yangi e'lon", active:'Faol',
      credits:'Kreditlar', account_settings:'Hisob sozlamalari', security:'Xavfsizlik',
      save:'Saqlash', full_name:"To'liq ism", email:'Email', phone:'Telefon',
      two_factor:'2-faktorli autentifikatsiya', password:'Parol',
      login_history:'Kirish tarixi', danger_zone:'Xavfli zona', deactivate:"Hisobni o'chirish",
      overview:"Umumiy ko'rinish", member_since:"A'zolik sanasi"
    },
    add_listing: {
      basic_info:"Asosiy ma'lumot", specs:'Parametrlar', media:'Media', price:'Narx',
      specs_sub:"Aniq ma'lumot kiriting",
      total_area:'Umumiy maydon (m²)', living_area:'Yashash maydoni (m²)',
      num_rooms:'Xonalar soni', amenities:'Qulayliklar', floor_level:'Qavat',
      total_floors:'Jami qavatlar', back:'Orqaga', continue:'Davom etish',
      tips:'Maslahatlar', maximize:"E'lonni yaxshilang",
      tip_text:"3 ta va undan ko'p rasm qo'shish ko'rishlarni 3x oshiradi.",
      live_quality:'Sifat bali', live_preview:"Ko'rinish",
      studio:'Studiya', property_title_label:"E'lon sarlavhasi",
      district_label:'Tuman', address_label:'Manzil', property_type_label:'Mulk turi',
      city_label:'Shahar', photos_sub:'Rasm yuklash uchun bosing',
      photos_hint:'PNG, JPG • Bir nechta rasm', negotiable:'Kelishiladi',
      for_sale:'Sotish', for_rent:'Ijaraga berish',
      monthly_rent:'Oylik ijara ($)', deposit:"Garov to'lovi ($)",
      publish_btn:"E'lonni nashr etish", success_msg:"E'loningiz muvaffaqiyatli qo'shildi!",
      admin_only:"E'lon qo'shish faqat admin uchun"
    },
    notifications: {
      title:"Bildirishnomalar", mark_all:"Barchasini o'qilgan deb belgilash",
      empty:"Bildirishnomalar yo'q", new_listing:"Yangi e'lon qo'shildi",
      price_drop:"Narx tushdi", insight:"Tahlil tayyor", welcome:"Xush kelibsiz!",
    },
    common: { apartment:'Kvartira', villa:'Villa', studio:'Studiya', penthouse:'Penthouse', cancel:'Bekor qilish' }
  },
  en: {
    nav: { listings:'Listings', compare:'Compare', favorites:'Favorites', login:'Login', logout:'Logout', admin:'Admin' },
    home: {
      hero_title:'Find Your Perfect Home',
      hero_sub:'We analyze millions of data points — you just find your home',
      search_placeholder:'Search city or district...', property_type:'Property Type', search_btn:'Search',
      market_insights:'Market Insights', ai_driven:'Price trends across major Uzbek cities',
      view_report:'View Report', featured:'Featured Listings',
      cta_title:'Try Property Valuation', cta_sub:'Discover the true market value of any property',
      try_valuation:'Start Valuation', contact_advisor:'Get Advice',
      show_all_regions:'Show All Regions', hide_regions:'Hide', region_analysis:'Region Details'
    },
    listings: {
      title:'Available Listings', filters:'Filters', price_range:'Price Range ($)',
      districts:'Districts', rooms:'Rooms', all:'All', property_type:'Property Type',
      apply_filters:'Apply Filters', smart_filter:'Smart Filter',
      properties_found:'properties found', sort_by:'Sort by',
      price_low:'Price: Low to High', price_high:'Price: High to Low', no_results:'No results found'
    },
    compare: {
      title:'Compare Properties', sub:'Side-by-side analysis',
      features:'Features', total_price:'Total Price', price_m2:'Price/m²',
      specs:'Specifications', ai_explanation:'Analysis',
      book_tour:'Book a Tour', view_details:'View Details',
      market_pulse:'Market Pulse', export:'Export Report',
      export_sub:'Download a full PDF comparison report', download_pdf:'Download PDF'
    },
    favorites: {
      title:'Your Favorites', sub:'Saved listings and price shift alerts',
      market_intelligence:'Market Intelligence', view_trends:'View Trends',
      price_alerts:'Price Alerts', alerts_sub:'Get instant notifications when favorites drop',
      alerts_active:'Alerts Active', empty:'No favorites yet.'
    },
    listing_detail: {
      analysis:'Price Analysis', analysis_sub:'Based on market data',
      estimated:'Estimated Value', current_price:'Current Price',
      area_avg:'Area Average',
      description:'Description', contact_seller:'Contact Seller',
      advisor:'Advisor Chat', amenities:'Amenities', back:'Back'
    },
    profile: {
      premium:'Premium User', upgrade:'Upgrade Plan', logout:'Logout',
      my_listings:'My Listings', manage:'Manage your listings',
      new_listing:'New Listing', active:'Active',
      credits:'Credits', account_settings:'Account Settings', security:'Security',
      save:'Save Changes', full_name:'Full Name', email:'Email', phone:'Phone',
      two_factor:'Two-Factor Auth', password:'Password',
      login_history:'Login History', danger_zone:'Danger Zone', deactivate:'Deactivate',
      overview:'Overview', member_since:'Member Since'
    },
    add_listing: {
      basic_info:'Basic Info', specs:'Specs', media:'Media', price:'Price',
      specs_sub:'Add accurate details for better valuation',
      total_area:'Total Area (m²)', living_area:'Living Area (m²)',
      num_rooms:'Number of Rooms', amenities:'Amenities', floor_level:'Floor Level',
      total_floors:'Total Floors', back:'Back', continue:'Continue',
      tips:'Tips', maximize:'Improve your listing',
      tip_text:'Adding 3+ photos increases views by 3x.',
      live_quality:'Quality score', live_preview:'Preview',
      studio:'Studio', property_title_label:'Listing Title',
      district_label:'District', address_label:'Address', property_type_label:'Property Type',
      city_label:'City', photos_sub:'Click to upload photos',
      photos_hint:'PNG, JPG • Multiple photos supported', negotiable:'Negotiable',
      for_sale:'For Sale', for_rent:'For Rent',
      monthly_rent:'Monthly Rent ($)', deposit:'Security Deposit ($)',
      publish_btn:'Publish Listing', success_msg:'Your listing has been published!',
      admin_only:'Adding listings is for admins only'
    },
    notifications: {
      title:"Notifications", mark_all:"Mark all as read",
      empty:"No notifications", new_listing:"New listing added",
      price_drop:"Price dropped", insight:"Analysis ready", welcome:"Welcome!",
    },
    common: { apartment:'Apartment', villa:'Villa', studio:'Studio', penthouse:'Penthouse', cancel:'Cancel' }
  },
  ru: {
    nav: { listings:'Объявления', compare:'Сравнение', favorites:'Избранное', login:'Войти', logout:'Выйти', admin:'Админ' },
    home: {
      hero_title:'Найдите удобное жильё для себя',
      hero_sub:'Мы анализируем миллионы данных — вам остаётся только найти дом',
      search_placeholder:'Поиск по городу или району...', property_type:'Тип недвижимости', search_btn:'Поиск',
      market_insights:'Аналитика рынка', ai_driven:'Тенденции цен по городам Узбекистана',
      view_report:'Отчёт о рынке', featured:'Рекомендуемые объявления',
      cta_title:'Оценка недвижимости', cta_sub:'Узнайте реальную рыночную стоимость любой недвижимости',
      try_valuation:'Начать оценку', contact_advisor:'Консультация',
      show_all_regions:'Показать все регионы', hide_regions:'Скрыть', region_analysis:'Анализ региона'
    },
    listings: {
      title:'Доступные объявления', filters:'Фильтры', price_range:'Диапазон цен ($)',
      districts:'Районы', rooms:'Комнаты', all:'Все', property_type:'Тип недвижимости',
      apply_filters:'Применить фильтры', smart_filter:'Умный фильтр',
      properties_found:'объектов найдено', sort_by:'Сортировка',
      price_low:'Цена: по возрастанию', price_high:'Цена: по убыванию', no_results:'Результаты не найдены'
    },
    compare: {
      title:'Сравнение объектов', sub:'Сравнительный анализ',
      features:'Характеристики', total_price:'Полная цена', price_m2:'Цена/м²',
      specs:'Параметры', ai_explanation:'Анализ',
      book_tour:'Забронировать тур', view_details:'Подробнее',
      market_pulse:'Пульс рынка', export:'Экспорт отчёта',
      export_sub:'Скачайте полный PDF-отчёт', download_pdf:'Скачать PDF'
    },
    favorites: {
      title:'Избранное', sub:'Сохранённые объявления и прогнозы цен',
      market_intelligence:'Аналитика рынка', view_trends:'Просмотр трендов',
      price_alerts:'Оповещения о ценах', alerts_sub:'Получайте уведомления при снижении цены',
      alerts_active:'Оповещения активны', empty:'Избранного пока нет.'
    },
    listing_detail: {
      analysis:'Анализ цены', analysis_sub:'На основе рыночных данных',
      estimated:'Оценочная стоимость', current_price:'Текущая цена',
      area_avg:'Среднее по району',
      description:'Описание', contact_seller:'Связаться с продавцом',
      advisor:'Советник', amenities:'Удобства', back:'Назад'
    },
    profile: {
      premium:'Премиум', upgrade:'Обновить', logout:'Выйти',
      my_listings:'Мои объявления', manage:'Управляйте объявлениями',
      new_listing:'Новое объявление', active:'Активно',
      credits:'Кредиты', account_settings:'Настройки аккаунта', security:'Безопасность',
      save:'Сохранить', full_name:'Полное имя', email:'Электронная почта', phone:'Телефон',
      two_factor:'Двухфакторная аутентификация', password:'Пароль',
      login_history:'История входов', danger_zone:'Опасная зона', deactivate:'Деактивировать',
      overview:'Обзор', member_since:'Участник с'
    },
    add_listing: {
      basic_info:'Основное', specs:'Параметры', media:'Медиа', price:'Цена',
      specs_sub:'Добавьте точные данные',
      total_area:'Общая площадь (м²)', living_area:'Жилая площадь (м²)',
      num_rooms:'Количество комнат', amenities:'Удобства', floor_level:'Этаж',
      total_floors:'Всего этажей', back:'Назад', continue:'Продолжить',
      tips:'Советы', maximize:'Улучшите объявление',
      tip_text:'Добавление 3+ фотографий увеличивает просмотры в 3 раза.',
      live_quality:'Оценка качества', live_preview:'Предпросмотр',
      studio:'Студия', property_title_label:'Заголовок объявления',
      district_label:'Район', address_label:'Адрес', property_type_label:'Тип недвижимости',
      city_label:'Город', photos_sub:'Нажмите для загрузки',
      photos_hint:'PNG, JPG • Несколько файлов', negotiable:'Договорная',
      for_sale:'Продажа', for_rent:'Аренда',
      monthly_rent:'Ежемесячная аренда ($)', deposit:'Залог ($)',
      publish_btn:'Опубликовать объявление', success_msg:'Объявление успешно опубликовано!',
      admin_only:'Добавление объявлений только для администраторов'
    },
    notifications: {
      title:"Уведомления", mark_all:"Отметить все как прочитанные",
      empty:"Нет уведомлений", new_listing:"Добавлено новое объявление",
      price_drop:"Цена снизилась", insight:"Анализ готов", welcome:"Добро пожаловать!",
    },
    common: { apartment:'Квартира', villa:'Вилла', studio:'Студия', penthouse:'Пентхаус', cancel:'Отмена' }
  }
};

// ═══════════════════════════════════════════════════════════════
// REGION DATA
// ═══════════════════════════════════════════════════════════════
const ALL_REGIONS = [
  { city:'Tashkent', pricePerM2:'$1,240/m²', price:1240, change:'+4.2%', trend:'up', score:94, listings:48, avgRooms:2.8, topDistrict:'Mirabad', growth:'Yuqori', risk:'Past', note:'Mirabaddagi yuqori talab narxlarni oshirmoqda.', highlights:['Metro yaqinligi','Yangi qurilmalar','Yuqori likvidlik'], color:'#7C3AED' },
  { city:'Samarkand', pricePerM2:'$890/m²', price:890, change:'+2.8%', trend:'up', score:78, listings:31, avgRooms:3.1, topDistrict:'Markaz', growth:"O'rtacha", risk:'Past', note:"Turizm o'sishi ijara daromadlarini oshirmoqda.", highlights:['Turizm markazi','Tarixiy hudud','Ijara talabi yuqori'], color:'#2F81F7' },
  { city:'Bukhara', pricePerM2:'$720/m²', price:720, change:'+1.5%', trend:'up', score:65, listings:19, avgRooms:3.4, topDistrict:'Markaz', growth:'Sekin', risk:"O'rtacha", note:"Turist o'sishi ijara daromadlarini oshirmoqda.", highlights:['Arzon narxlar',"O'sish potentsiali",'UNESCO obidalar'], color:'#10B981' },
  { city:'Namangan', pricePerM2:'$680/m²', price:680, change:'+3.1%', trend:'up', score:71, listings:24, avgRooms:3.2, topDistrict:'Eski shahar', growth:"O'rtacha", risk:'Past', note:"Sanoat o'sishi bilan birga turar-joy talabi oshmoqda.", highlights:['Faol sanoat','Arzon narx',"Demografik o'sish"], color:'#F59E0B' },
  { city:'Andijan', pricePerM2:'$650/m²', price:650, change:'+2.3%', trend:'up', score:68, listings:21, avgRooms:3.0, topDistrict:'Markaz', growth:"O'rtacha", risk:"O'rtacha", note:"Ferghana vodiysi iqtisodiyoti rivojlanmoqda.", highlights:['Geografik afzallik',"O'sib borayotgan bozor",'Arzon'], color:'#EF4444' },
  { city:'Fergana', pricePerM2:'$700/m²', price:700, change:'+2.6%', trend:'up', score:70, listings:22, avgRooms:3.1, topDistrict:'Markaz', growth:"O'rtacha", risk:'Past', note:"Savdo markazi sifatida rivojlanmoqda.", highlights:['Savdo markazi','Transport ulanish','Barqaror narx'], color:'#8B5CF6' },
  { city:'Qarshi', pricePerM2:'$580/m²', price:580, change:'+1.8%', trend:'up', score:60, listings:15, avgRooms:3.3, topDistrict:'Yangi qurilma', growth:'Sekin', risk:"O'rtacha", note:'Neft-gaz sanoati xodimlardan talab oshmoqda.', highlights:['Neft-gaz sanoati','Arzon narx','Investitsiya imkoni'], color:'#06B6D4' },
  { city:'Jizzax', pricePerM2:'$520/m²', price:520, change:'+0.9%', trend:'stable', score:52, listings:11, avgRooms:3.5, topDistrict:'Markaz', growth:'Sekin', risk:'Yuqori', note:"Iqtisodiy faollik hali rivojlanish bosqichida.", highlights:['Eng arzon narx',"O'sish imkoni",'Kichik bozor'], color:'#84CC16' },
  { city:'Termiz', pricePerM2:'$560/m²', price:560, change:'+1.2%', trend:'up', score:55, listings:13, avgRooms:3.6, topDistrict:'Chegara hududi', growth:'Sekin', risk:"O'rtacha", note:"Chegara savdosi faolligi ta'sir ko'rsatmoqda.", highlights:["Chegara savdosi",'Ijara imkoni','Strategik joylashuv'], color:'#F97316' },
  { city:"Nukus", pricePerM2:'$480/m²', price:480, change:'+0.5%', trend:'stable', score:45, listings:9, avgRooms:3.8, topDistrict:'Markaz', growth:'Sekin', risk:'Yuqori', note:"Qoraqalpog'iston poytaxti, sekin rivojlanish.", highlights:['Poytaxt afzalligi','Arzon narx','Rivojlanish potentsiali'], color:'#EC4899' },
  { city:'Navoiy', pricePerM2:'$610/m²', price:610, change:'+2.1%', trend:'up', score:63, listings:17, avgRooms:3.2, topDistrict:"Ko'k ko'l", growth:"O'rtacha", risk:'Past', note:"Kimyo sanoati o'sishi bilan birga talabkorlik oshmoqda.", highlights:['Kimyo sanoati','Barqaror talab','Yangi loyihalar'], color:'#0EA5E9' },
  { city:"Urganch", pricePerM2:'$540/m²', price:540, change:'+1.6%', trend:'up', score:57, listings:14, avgRooms:3.4, topDistrict:'Yangi shahar', growth:'Sekin', risk:"O'rtacha", note:"Xorazm viloyati markazi sifatida rivojlanmoqda.", highlights:["Viloyat markazi","Turizm o'sishi",'Arzon narx'], color:'#A855F7' },
];

// ═══════════════════════════════════════════════════════════════
// LISTINGS DATA
// ═══════════════════════════════════════════════════════════════
export const mockListings = [
  { id:1, title:'Premium Apartment in Mirabad', district:'Mirabad', city:'Tashkent', price:145000, estimatedValue:158000, pricePerM2:1708, rooms:3, size:85, floor:5, totalFloors:12, status:'underpriced', badge:'-8.4% Underpriced', images:['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop'], address:'Mirabad Avenue, 14A, Tashkent', views:342, favorites:28, inquiries:12, description:'Stunning 3-bedroom apartment with panoramic city views. European renovation, designer furniture included.', amenities:['Air Conditioning','Parking','Security','Balcony','High-speed WiFi'], agent:{name:'Alisher Karimov',title:'Senior Agent',rating:4.9,reviews:87} },
  { id:2, title:'City Tower Suite', district:'Yunusabad', city:'Tashkent', price:210000, estimatedValue:195000, pricePerM2:1615, rooms:2, size:130, floor:14, totalFloors:18, status:'overpriced', badge:'+7.2% Overpriced', images:['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop'], address:'Tashkent City Tower, Block B', views:567, favorites:41, inquiries:19, description:'Luxury suite in Tashkent City. Breathtaking skyline views.', amenities:['Smart Home','Concierge','Pool','Gym','Valet Parking'], agent:{name:'Nilufar Rashidova',title:'Luxury Specialist',rating:4.8,reviews:64} },
  { id:3, title:'Classic Flat in Chilanzar', district:'Chilanzar', city:'Tashkent', price:89000, estimatedValue:91000, pricePerM2:1247, rooms:2, size:72, floor:3, totalFloors:9, status:'fair', badge:'Fair Value', images:['https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=600&auto=format&fit=crop'], address:'Chilanzar District, Str. 3, Building 12', views:189, favorites:14, inquiries:6, description:'Well-maintained 2-bedroom flat in established residential area.', amenities:['Balcony','Storage Room','Intercom'], agent:{name:'Bobur Toshmatov',title:'Residential Agent',rating:4.6,reviews:43} },
  { id:4, title:'Modern Studio in Mirzo Ulugbek', district:'Mirzo Ulugbek', city:'Tashkent', price:65000, estimatedValue:71000, pricePerM2:1444, rooms:1, size:45, floor:7, totalFloors:16, status:'underpriced', badge:'-8.0% Underpriced', images:['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop'], address:'Mirzo Ulugbek District, New Building Complex', views:224, favorites:31, inquiries:9, description:'Compact modern studio perfect for young professionals.', amenities:['Air Conditioning','High-speed WiFi','Balcony'], agent:{name:'Alisher Karimov',title:'Senior Agent',rating:4.9,reviews:87} },
  { id:5, title:'Family Villa in Yunusabad', district:'Yunusabad', city:'Tashkent', price:380000, estimatedValue:375000, pricePerM2:1520, rooms:5, size:250, floor:1, totalFloors:3, status:'fair', badge:'Fair Value', images:['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop'], address:'Yunusabad, Premium Quarter', views:412, favorites:55, inquiries:22, description:'Spacious family villa with private garden and swimming pool.', amenities:['Pool','Garden','Garage','Security','Smart Home'], agent:{name:'Nilufar Rashidova',title:'Luxury Specialist',rating:4.8,reviews:64} },
  { id:6, title:'Budget Apartment in Sergeli', district:'Sergeli', city:'Tashkent', price:42000, estimatedValue:45000, pricePerM2:840, rooms:2, size:50, floor:2, totalFloors:5, status:'underpriced', badge:'-6.7% Underpriced', images:['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop'], address:'Sergeli District, Block 14', views:98, favorites:8, inquiries:3, description:'Affordable 2-room apartment, recently repaired.', amenities:['Balcony','Storage'], agent:{name:'Bobur Toshmatov',title:'Residential Agent',rating:4.6,reviews:43} },
  { id:7, title:'Penthouse in Yakkasaray', district:'Yakkasaray', city:'Tashkent', price:320000, estimatedValue:310000, pricePerM2:2133, rooms:4, size:150, floor:17, totalFloors:17, status:'overpriced', badge:'+3.2% Overpriced', images:['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop'], address:'Yakkasaray, Central Tower', views:287, favorites:33, inquiries:15, description:'Top floor penthouse with 360° panoramic views of Tashkent.', amenities:['Terrace','Smart Home','Pool','Concierge','Gym'], agent:{name:'Nilufar Rashidova',title:'Luxury Specialist',rating:4.8,reviews:64} },
  { id:8, title:'Renovated 3-Room in Almazar', district:'Almazar', city:'Tashkent', price:98000, estimatedValue:105000, pricePerM2:1225, rooms:3, size:80, floor:4, totalFloors:10, status:'underpriced', badge:'-6.7% Underpriced', images:['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format&fit=crop'], address:'Almazar District, Dustlik Street', views:156, favorites:19, inquiries:7, description:'Fully renovated 3-bedroom apartment with modern finishes.', amenities:['Air Conditioning','Balcony','Parking'], agent:{name:'Alisher Karimov',title:'Senior Agent',rating:4.9,reviews:87} },
  { id:9, title:'Studio Near Compass', district:'Mirabad', city:'Tashkent', price:75000, estimatedValue:78000, pricePerM2:1667, rooms:1, size:45, floor:8, totalFloors:14, status:'fair', badge:'Fair Value', images:['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop'], address:'Mirabad, Compass Shopping Center Area', views:201, favorites:22, inquiries:8, description:'Modern studio in prime location near Compass shopping mall.', amenities:['High-speed WiFi','Security','Air Conditioning'], agent:{name:'Bobur Toshmatov',title:'Residential Agent',rating:4.6,reviews:43} },
  { id:10, title:'Luxury 4-Room in Samarkand', district:'Markaz', city:'Samarkand', price:185000, estimatedValue:190000, pricePerM2:925, rooms:4, size:200, floor:3, totalFloors:8, status:'fair', badge:'Fair Value', images:['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop'], address:'Samarkand, Registon yonida', views:134, favorites:16, inquiries:5, description:'Spacious luxury apartment near historical Registon square.', amenities:['Garden View','Parking','Security','Balcony'], agent:{name:'Nilufar Rashidova',title:'Luxury Specialist',rating:4.8,reviews:64} },
  { id:11, title:'Cozy 2-Room in Bukhara', district:'Shahrisabz', city:'Bukhara', price:58000, estimatedValue:62000, pricePerM2:829, rooms:2, size:70, floor:2, totalFloors:5, status:'underpriced', badge:'-6.5% Underpriced', images:['https://images.unsplash.com/photo-1615529179035-bd38e8fde8e0?w=600&auto=format&fit=crop'], address:"Bukhara, Shahriston ko'chasi", views:89, favorites:11, inquiries:4, description:'Charming apartment in ancient Bukhara city center.', amenities:['Historic View','Courtyard','Air Conditioning'], agent:{name:'Bobur Toshmatov',title:'Residential Agent',rating:4.6,reviews:43} },
  { id:12, title:'New Build in Namangan', district:'Eski shahar', city:'Namangan', price:72000, estimatedValue:74000, pricePerM2:800, rooms:3, size:90, floor:5, totalFloors:9, status:'fair', badge:'Fair Value', images:['https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&auto=format&fit=crop'], address:'Namangan, Yangi mahalla', views:112, favorites:9, inquiries:3, description:'Brand new 3-room apartment in Namangan city.', amenities:['New Building','Balcony','Parking','Air Conditioning'], agent:{name:'Alisher Karimov',title:'Senior Agent',rating:4.9,reviews:87} },
  { id:13, title:'Investment Flat in Fergana', district:'Markaz', city:'Fergana', price:82000, estimatedValue:88000, pricePerM2:820, rooms:2, size:100, floor:3, totalFloors:7, status:'underpriced', badge:'-6.8% Underpriced', images:['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop'], address:'Fergana, Central Boulevard', views:145, favorites:17, inquiries:6, description:'Great investment opportunity in Fergana city center.', amenities:['Balcony','Security','High-speed WiFi'], agent:{name:'Nilufar Rashidova',title:'Luxury Specialist',rating:4.8,reviews:64} },
  { id:14, title:'Villa in Tashkent Hills', district:'Yunusabad', city:'Tashkent', price:550000, estimatedValue:540000, pricePerM2:2200, rooms:6, size:250, floor:1, totalFloors:2, status:'overpriced', badge:'+1.9% Overpriced', images:['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop'], address:'Yunusabad Hills, Private Road', views:321, favorites:47, inquiries:18, description:'Exclusive private villa in the prestigious hills area.', amenities:['Pool','Garden','Garage','Smart Home','Tennis Court','Cinema'], agent:{name:'Nilufar Rashidova',title:'Luxury Specialist',rating:4.8,reviews:64} },
  { id:15, title:'Affordable Studio in Chilanzar', district:'Chilanzar', city:'Tashkent', price:38000, estimatedValue:42000, pricePerM2:844, rooms:1, size:45, floor:1, totalFloors:5, status:'underpriced', badge:'-9.5% Underpriced', images:['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&auto=format&fit=crop'], address:"Chilanzar, Bog'cha Street", views:78, favorites:12, inquiries:4, description:'Compact affordable studio, perfect for first-time buyers.', amenities:['Balcony'], agent:{name:'Bobur Toshmatov',title:'Residential Agent',rating:4.6,reviews:43} },
  { id:16, title:'Premium Flat in Center-1', district:'Center-1', city:'Tashkent', price:195000, estimatedValue:200000, pricePerM2:1950, rooms:3, size:100, floor:9, totalFloors:12, status:'fair', badge:'Fair Value', images:['https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&auto=format&fit=crop'], address:'Center-1, Amir Temur Boulevard', views:289, favorites:34, inquiries:14, description:'Premium 3-bedroom flat on Amir Temur Boulevard.', amenities:['Smart Home','Concierge','Parking','Security','Gym'], agent:{name:'Alisher Karimov',title:'Senior Agent',rating:4.9,reviews:87} },
  { id:17, title:'3-Room in Mirzo Ulugbek', district:'Mirzo Ulugbek', city:'Tashkent', price:115000, estimatedValue:120000, pricePerM2:1278, rooms:3, size:90, floor:6, totalFloors:12, status:'underpriced', badge:'-4.2% Underpriced', images:['https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&auto=format&fit=crop'], address:'Mirzo Ulugbek, Science Street', views:167, favorites:21, inquiries:8, description:'Spacious 3-room apartment near science institutes.', amenities:['Balcony','Parking','Air Conditioning'], agent:{name:'Bobur Toshmatov',title:'Residential Agent',rating:4.6,reviews:43} },
  { id:18, title:'Duplex in Yakkasaray', district:'Yakkasaray', city:'Tashkent', price:260000, estimatedValue:255000, pricePerM2:1733, rooms:4, size:150, floor:10, totalFloors:14, status:'overpriced', badge:'+2.0% Overpriced', images:['https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&auto=format&fit=crop'], address:'Yakkasaray, Navoi Street', views:198, favorites:26, inquiries:11, description:'Two-level luxury duplex apartment with stunning city views.', amenities:['Terrace','Smart Home','Parking','Security'], agent:{name:'Nilufar Rashidova',title:'Luxury Specialist',rating:4.8,reviews:64} },
];

// ═══════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════
const ADMIN_USER = { id:'admin', name:'Administrator', email:'admin@gmail.com', password:'admin123', role:'admin', credits:999, phone:'+998 99 000 00 00', avatar:null, joinDate:'2023-01-01' };
let registeredUsers = [ADMIN_USER];
const findUser = (email, password) => registeredUsers.find(u => u.email===email && u.password===password);
const findUserByEmail = (email) => registeredUsers.find(u => u.email===email);
const updateUser = (id, updates) => { registeredUsers = registeredUsers.map(u => u.id===id ? {...u,...updates} : u); };
const registerUser = (name, email, password) => {
  const user = { id:'user_'+Date.now(), name, email, password, role:'user', credits:50, phone:'', avatar:null, joinDate:new Date().toISOString().split('T')[0] };
  registeredUsers.push(user); return user;
};

// ═══════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════
const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('uz');
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [publishedListings, setPublishedListings] = useState([]);
  const [notifications, setNotifications] = useState([
    { id:1, type:'price_drop', read:false, time:'2 daqiqa oldin', listing:'Premium Apartment in Mirabad', amount:'-$5,000' },
    { id:2, type:'insight', read:false, time:'15 daqiqa oldin', text:'Mirabad tumani narxlari bu oyda 4.2% oshdi' },
    { id:3, type:'new_listing', read:false, time:'1 soat oldin', listing:'Modern Studio in Yunusabad' },
    { id:4, type:'welcome', read:true, time:'Bugun', text:'UyNarx ga xush kelibsiz!' },
  ]);

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  const t = T[lang];
  const toggleTheme = () => setTheme(t => t==='light'?'dark':'light');
  const login = (u) => setUser(u);
  const logout = () => setUser(null);
  const toggleFavorite = (id) => setFavorites(f => f.includes(id)?f.filter(x=>x!==id):[...f,id]);
  const updateCurrentUser = (updates) => { updateUser(user.id,updates); setUser(prev=>({...prev,...updates})); };
  const addListing = (listing) => { setPublishedListings(p=>[listing,...p]); setNotifications(n=>[{id:Date.now(),type:'new_listing',read:false,time:'Hozir',listing:listing.title},...n]); };
  const markAllRead = () => setNotifications(n=>n.map(x=>({...x,read:true})));
  const unreadCount = notifications.filter(n=>!n.read).length;

  return (
    <AppContext.Provider value={{ theme,toggleTheme,lang,setLang,t,user,login,logout,favorites,toggleFavorite,updateCurrentUser,publishedListings,addListing,notifications,markAllRead,unreadCount }}>
      {children}
    </AppContext.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════
// CSS — EXACT COLORS AS SPECIFIED
// ═══════════════════════════════════════════════════════════════
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@600;700;800&display=swap');
    :root {
      --primary:#7C3AED; --secondary:#6D28D9; --tertiary:#10B981;
      --bg:#F5F3FF; --bg2:#FFFFFF; --bg3:#EDE9FE;
      --border:#DDD6FE; --text:#1E1B4B; --text2:#4C1D95; --text3:#7C3AED;
      --shadow:0 1px 3px rgba(124,58,237,0.08); --shadow-md:0 4px 6px rgba(124,58,237,0.1);
      --shadow-lg:0 10px 15px rgba(124,58,237,0.15); --radius:12px; --radius-sm:8px;
    }
    [data-theme="dark"] {
      --primary:#2F81F7; --secondary:#388BFD; --tertiary:#3FB950;
      --bg:#0D1117; --bg2:#161B22; --bg3:#21262D;
      --border:#30363D; --text:#E6EDF3; --text2:#8B949E; --text3:#484F58;
      --shadow:0 1px 3px rgba(0,0,0,0.4); --shadow-md:0 4px 6px rgba(0,0,0,0.4);
      --shadow-lg:0 10px 15px rgba(0,0,0,0.5);
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'DM Sans','Segoe UI',sans-serif; background:var(--bg); color:var(--text); transition:background 0.3s,color 0.3s; }

    @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes floatSide { 0%,100%{transform:translateX(0) rotate(-1deg)} 50%{transform:translateX(8px) rotate(1deg)} }
    @keyframes roofBob { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(1deg)} }
    @keyframes windowGlow { 0%,100%{opacity:0.6} 50%{opacity:1} }
    @keyframes chimneySteam { 0%{opacity:0;transform:translateY(0) scaleX(1)} 100%{opacity:0;transform:translateY(-30px) scaleX(2)} }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.05)} }
    @keyframes popIn { 0%{transform:scale(0.5);opacity:0} 80%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes notifPop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.25)} }
    @keyframes priceTag { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-6px) rotate(3deg)} }
    @keyframes gradientMove { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes treeSway { 0%,100%{transform:rotate(-2deg) scaleX(1)} 50%{transform:rotate(2deg) scaleX(0.97)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

    .fade-in { animation:fadeIn 0.4s ease both; }
    .slide-in { animation:slideIn 0.25s ease; }
    .float-anim { animation:float 3.5s ease-in-out infinite; }
    .pulse-anim { animation:pulse 2s ease-in-out infinite; }
    .spin { animation:spin 1s linear infinite; }
    .stagger-1{animation-delay:0.05s} .stagger-2{animation-delay:0.1s} .stagger-3{animation-delay:0.15s} .stagger-4{animation-delay:0.2s} .stagger-5{animation-delay:0.25s} .stagger-6{animation-delay:0.3s}

    .app { min-height:100vh; display:flex; flex-direction:column; }
    .nav { background:var(--bg2); border-bottom:1px solid var(--border); position:sticky; top:0; z-index:100; }
    .nav-inner { max-width:1200px; margin:0 auto; padding:0 24px; height:60px; display:flex; align-items:center; gap:32px; }
    .nav-logo { font-family:'Sora',sans-serif; font-weight:800; font-size:18px; color:var(--primary); cursor:pointer; display:flex; align-items:center; gap:6px; transition:transform 0.2s; }
    .nav-logo:hover { transform:scale(1.04); }
    .nav-logo span { color:var(--tertiary); }
    .nav-links { display:flex; gap:4px; flex:1; }
    .nav-link { padding:6px 14px; border-radius:8px; cursor:pointer; font-size:14px; font-weight:500; color:var(--text2); border:none; background:none; transition:all 0.2s; }
    .nav-link:hover { background:var(--bg3); color:var(--text); }
    .nav-link.active { color:var(--primary); border-bottom:2px solid var(--primary); border-radius:0; }
    .nav-actions { display:flex; align-items:center; gap:8px; margin-left:auto; }
    .nav-icon-btn { width:36px; height:36px; border:none; background:var(--bg3); border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--text2); transition:all 0.2s; position:relative; }
    .nav-icon-btn:hover { background:var(--border); color:var(--text); transform:scale(1.08); }
    .notif-dot { position:absolute; top:-2px; right:-2px; width:16px; height:16px; background:#EF4444; border-radius:50%; border:2px solid var(--bg2); display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:800; color:#fff; animation:notifPop 2s ease-in-out infinite; }

    .btn { padding:8px 18px; border-radius:var(--radius-sm); font-weight:600; font-size:14px; cursor:pointer; border:none; transition:all 0.2s; display:inline-flex; align-items:center; gap:6px; }
    .btn-primary { background:var(--primary); color:#fff; }
    .btn-primary:hover { opacity:0.9; transform:translateY(-1px); box-shadow:var(--shadow-md); }
    .btn-secondary { background:var(--bg3); color:var(--text); }
    .btn-secondary:hover { background:var(--border); }
    .btn-teal { background:var(--tertiary); color:#fff; }
    .btn-teal:hover { opacity:0.9; }
    .btn-outline { background:transparent; color:var(--text); border:1px solid var(--border); }
    .btn-outline:hover { background:var(--bg3); }
    .btn-danger { background:#DC2626; color:#fff; }
    .btn-danger:hover { background:#b91c1c; }
    .btn-sm { padding:5px 12px; font-size:13px; }
    .btn-lg { padding:12px 28px; font-size:16px; }
    .btn-ghost { background:none; border:none; color:var(--text2); cursor:pointer; padding:6px 10px; border-radius:6px; font-size:13px; display:inline-flex; align-items:center; gap:5px; transition:all 0.2s; }
    .btn-ghost:hover { background:var(--bg3); color:var(--text); }

    .badge { display:inline-flex; align-items:center; gap:4px; padding:3px 8px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; }
    .badge-under { background:#DCFCE7; color:#16A34A; }
    .badge-over { background:#FEE2E2; color:#DC2626; }
    .badge-fair { background:#DBEAFE; color:#2563EB; }
    .badge-stable { background:#F3F4F6; color:#6B7280; }
    [data-theme="dark"] .badge-under { background:#14532D; color:#4ADE80; }
    [data-theme="dark"] .badge-over { background:#7F1D1D; color:#FCA5A5; }
    [data-theme="dark"] .badge-fair { background:#1E3A8A; color:#93C5FD; }
    [data-theme="dark"] .badge-stable { background:#374151; color:#9CA3AF; }

    .card { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); box-shadow:var(--shadow); overflow:hidden; }
    .card-hover { transition:all 0.3s; }
    .card-hover:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }

    .listing-card { cursor:pointer; position:relative; transition:transform 0.3s,box-shadow 0.3s; }
    .listing-card:hover { transform:translateY(-4px); box-shadow:0 12px 28px rgba(124,58,237,0.15); }
    [data-theme="dark"] .listing-card:hover { box-shadow:0 12px 28px rgba(0,0,0,0.4); }
    .listing-img { width:100%; height:180px; object-fit:cover; display:block; transition:transform 0.4s; }
    .listing-card:hover .listing-img { transform:scale(1.04); }
    .listing-badge { position:absolute; top:10px; left:10px; }
    .listing-fav { position:absolute; top:10px; right:10px; width:32px; height:32px; background:rgba(255,255,255,0.92); border:none; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
    [data-theme="dark"] .listing-fav { background:rgba(22,27,34,0.92); }
    .listing-fav:hover { transform:scale(1.2); }
    .listing-body { padding:14px; }
    .listing-price { font-family:'Sora',sans-serif; font-weight:700; font-size:20px; color:var(--text); }
    .listing-title { font-size:14px; font-weight:500; color:var(--text); margin:4px 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .listing-loc { font-size:12px; color:var(--text3); display:flex; align-items:center; gap:4px; }
    .listing-meta { display:flex; gap:12px; margin-top:8px; font-size:12px; color:var(--text2); }
    .listing-bar { height:3px; border-radius:2px; margin-top:8px; }
    .bar-under { background:linear-gradient(to right,#10B981,#059669); }
    .bar-over { background:linear-gradient(to right,#EF4444,#DC2626); }
    .bar-fair { background:linear-gradient(to right,#3B82F6,#2563EB); }

    .grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
    .grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
    .grid-2 { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }
    @media(max-width:1100px){.grid-4{grid-template-columns:repeat(2,1fr);}}
    @media(max-width:900px){.grid-3{grid-template-columns:repeat(2,1fr);}}
    @media(max-width:600px){.grid-4,.grid-3,.grid-2{grid-template-columns:1fr;}}

    .page { flex:1; }
    .container { max-width:1200px; margin:0 auto; padding:0 24px; }

    .input { padding:10px 14px; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg2); color:var(--text); font-size:14px; width:100%; outline:none; transition:border-color 0.2s,box-shadow 0.2s; font-family:'DM Sans',sans-serif; }
    .input:focus { border-color:var(--primary); box-shadow:0 0 0 3px rgba(124,58,237,0.1); }
    .input::placeholder { color:var(--text3); }
    .input:disabled { opacity:0.6; cursor:not-allowed; }
    [data-theme="dark"] .input { background:var(--bg3); color:var(--text); }
    [data-theme="dark"] .input::placeholder { color:#484F58; }
    [data-theme="dark"] .input:focus { border-color:var(--primary); background:var(--bg2); }
    .label { font-size:13px; font-weight:600; color:var(--text2); margin-bottom:6px; display:block; }
    .select { padding:10px 14px; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg2); color:var(--text); font-size:14px; width:100%; outline:none; cursor:pointer; }
    [data-theme="dark"] .select { background:var(--bg3); color:var(--text); }
    [data-theme="dark"] .select option { background:var(--bg2); }
    .hero-search .input,.hero-search .select { background:rgba(255,255,255,0.96); color:#1E1B4B; border:none; }
    .hero-search .input::placeholder { color:#7C3AED; }
    [data-theme="dark"] .hero-search .input,[data-theme="dark"] .hero-search .select { background:rgba(22,27,34,0.96); color:var(--text); }

    .check-item { display:flex; align-items:center; gap:8px; cursor:pointer; font-size:14px; margin-bottom:6px; color:var(--text); }
    .check-item input { accent-color:var(--primary); }
    .room-btns { display:flex; gap:6px; flex-wrap:wrap; }
    .room-btn { width:36px; height:36px; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg2); color:var(--text); font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; }
    .room-btn.active { background:var(--primary); color:#fff; border-color:var(--primary); transform:scale(1.08); }
    .toggle { position:relative; width:44px; height:24px; display:inline-block; }
    .toggle input { opacity:0; width:0; height:0; }
    .toggle-slider { position:absolute; cursor:pointer; inset:0; background:var(--border); border-radius:24px; transition:0.2s; }
    .toggle-slider:before { content:''; position:absolute; width:18px; height:18px; left:3px; bottom:3px; background:#fff; border-radius:50%; transition:0.2s; }
    .toggle input:checked + .toggle-slider { background:var(--tertiary); }
    .toggle input:checked + .toggle-slider:before { transform:translateX(20px); }

    .footer { background:var(--bg2); border-top:1px solid var(--border); padding:24px; margin-top:auto; }
    .footer-inner { max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; }
    .footer-logo { font-family:'Sora',sans-serif; font-weight:800; color:var(--primary); }
    .footer-link { font-size:13px; color:var(--text3); cursor:pointer; display:block; margin-bottom:4px; transition:color 0.2s; }
    .footer-link:hover { color:var(--text); }

    .section-title { font-family:'Sora',sans-serif; font-size:28px; font-weight:700; color:var(--text); }
    .section-sub { color:var(--text2); font-size:15px; margin-top:6px; }

    /* AI box — only in profile sidebar */
    .ai-box { background:var(--primary); color:#fff; border-radius:var(--radius); padding:16px; }
    [data-theme="dark"] .ai-box { background:#1C2A3A; border:1px solid var(--primary); color:var(--text); }

    .cta-section { background:linear-gradient(135deg,#7C3AED,#6D28D9); color:#fff; border-radius:var(--radius); padding:28px 32px; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; }
    [data-theme="dark"] .cta-section { background:linear-gradient(135deg,#161B22,#1C2A3A); border:1px solid var(--primary); }

    .progress-bar { height:6px; background:rgba(255,255,255,0.2); border-radius:4px; overflow:hidden; }
    .progress-fill { height:100%; border-radius:4px; background:rgba(255,255,255,0.9); transition:width 0.5s; }
    [data-theme="dark"] .progress-bar { background:var(--border); }
    [data-theme="dark"] .progress-fill { background:var(--primary); }

    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:200; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(4px); }
    .modal { background:var(--bg2); border-radius:var(--radius); padding:28px; max-width:520px; width:100%; box-shadow:var(--shadow-lg); border:1px solid var(--border); max-height:90vh; overflow-y:auto; animation:slideIn 0.25s ease; }
    .modal-lg { max-width:780px; }

    .lang-btn { padding:4px 10px; border:1px solid var(--border); border-radius:6px; background:none; color:var(--text2); font-size:13px; font-weight:600; cursor:pointer; transition:all 0.2s; }
    .lang-btn.active { background:var(--primary); color:#fff; border-color:var(--primary); }
    .sidebar-link { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:var(--radius-sm); color:var(--text2); cursor:pointer; font-size:14px; font-weight:500; transition:all 0.2s; }
    .sidebar-link:hover { background:var(--bg3); color:var(--text); }
    .sidebar-link.active { background:var(--primary); color:#fff; }
    .pagination { display:flex; align-items:center; gap:6px; justify-content:center; margin-top:32px; }
    .page-btn { width:36px; height:36px; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg2); color:var(--text); font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
    .page-btn.active { background:var(--primary); color:#fff; border-color:var(--primary); }
    .page-btn:hover:not(.active) { background:var(--bg3); }
    .steps { display:flex; align-items:center; justify-content:center; gap:0; margin-bottom:32px; }
    .step { display:flex; flex-direction:column; align-items:center; gap:6px; }
    .step-num { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; border:2px solid var(--border); background:var(--bg2); color:var(--text3); transition:all 0.3s; }
    .step-num.done,.step-num.active { background:var(--primary); border-color:var(--primary); color:#fff; }
    .step-label { font-size:12px; color:var(--text3); font-weight:500; white-space:nowrap; }
    .step-line { width:60px; height:2px; background:var(--border); margin:0 4px 18px; transition:background 0.3s; }
    .step-line.done { background:var(--primary); }

    /* HERO — uy rasmi bilan */
    .hero {
      height:500px;
      background: linear-gradient(135deg,rgba(124,58,237,0.90),rgba(109,40,217,0.82)),
        url('https://domplan.uz/assets/xususiy-f8156be8.jpg') center/cover;
      display:flex; align-items:center; justify-content:center; text-align:center; color:#fff; position:relative; overflow:hidden;
    }
    [data-theme="dark"] .hero {
      background: linear-gradient(135deg,rgba(13,17,23,0.95),rgba(47,129,247,0.45)),
        url('https://domplan.uz/assets/xususiy-f8156be8.jpg') center/cover;
    }
    .hero-title { font-family:'Sora',sans-serif; font-size:42px; font-weight:800; line-height:1.15; animation:fadeIn 0.8s ease both; }
    .hero-sub { font-size:16px; opacity:0.9; margin:14px 0 32px; animation:fadeIn 0.8s ease 0.2s both; }
    .hero-search { display:flex; gap:8px; max-width:640px; margin:0 auto; flex-wrap:wrap; animation:fadeIn 0.8s ease 0.4s both; }
    .hero-search .input { flex:1; min-width:160px; }
    .hero-search .select { flex:0 0 160px; }

    /* Floating house SVG */
    .hero-house { position:absolute; right:60px; top:50%; transform:translateY(-55%); width:200px; height:220px; pointer-events:none; }
    @media(max-width:900px){.hero-house{display:none;}}
    .hero-house svg { width:100%; height:100%; }

    /* Floating info cards on hero */
    .hero-chip { position:absolute; backdrop-filter:blur(12px); background:rgba(255,255,255,0.14); border:1px solid rgba(255,255,255,0.28); border-radius:24px; padding:8px 14px; color:#fff; font-size:12px; font-weight:600; display:flex; align-items:center; gap:6px; white-space:nowrap; }
    .hero-chip-1 { bottom:48px; left:48px; animation:float 4s ease-in-out infinite; }
    .hero-chip-2 { top:72px; right:300px; animation:float 5s ease-in-out 0.5s infinite; }
    .hero-chip-3 { top:110px; left:48px; animation:float 3.5s ease-in-out 1s infinite; }

    .region-card { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:18px; cursor:pointer; transition:all 0.3s; }
    .region-card:hover { transform:translateY(-3px); box-shadow:var(--shadow-md); border-color:var(--primary); }
    .market-bar { display:flex; gap:3px; margin:10px 0; }
    .market-bar-item { height:20px; flex:1; border-radius:3px; transition:height 0.3s; }
    .region-card:hover .market-bar-item { height:26px; }

    .compare-table { width:100%; border-collapse:collapse; }
    .compare-table th,.compare-table td { padding:12px 16px; text-align:left; border-bottom:1px solid var(--border); font-size:14px; color:var(--text); }
    .compare-table th { font-weight:600; color:var(--text2); font-size:13px; background:var(--bg3); }
    .compare-table tr:hover td { background:var(--bg3); }

    .stars { color:#F59E0B; font-size:13px; }
    .agent-card { display:flex; align-items:center; gap:10px; padding:12px; background:var(--bg3); border-radius:var(--radius-sm); margin-bottom:8px; }
    .agent-avatar { width:40px; height:40px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px; }
    .stats-row { display:flex; gap:6px; font-size:12px; color:var(--text3); }
    .stat-item { display:flex; align-items:center; gap:3px; }

    .filter-sidebar { width:260px; flex-shrink:0; }
    .listings-layout { display:flex; gap:24px; }
    .listings-main { flex:1; min-width:0; }
    .gallery-thumb { display:flex; gap:6px; margin-top:6px; }
    .gallery-thumb img { width:60px; height:45px; object-fit:cover; border-radius:6px; cursor:pointer; opacity:0.7; transition:opacity 0.2s; }
    .gallery-thumb img.active { opacity:1; outline:2px solid var(--primary); }

    .photo-upload-area { border:2px dashed var(--border); border-radius:var(--radius); padding:32px; text-align:center; cursor:pointer; transition:all 0.2s; background:var(--bg3); color:var(--text2); }
    .photo-upload-area:hover { border-color:var(--primary); background:var(--bg2); }

    .settings-section { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:20px; margin-bottom:16px; }
    .settings-row { display:flex; justify-content:space-between; align-items:center; padding:14px; background:var(--bg3); border-radius:var(--radius-sm); margin-bottom:8px; transition:background 0.2s; }
    .settings-row:hover { background:var(--border); }

    .alert { padding:12px 16px; border-radius:var(--radius-sm); font-size:14px; display:flex; align-items:center; gap:8px; margin-bottom:12px; }
    .alert-success { background:#DCFCE7; color:#15803D; border:1px solid #86EFAC; }
    .alert-danger { background:#FEE2E2; color:#B91C1C; border:1px solid #FCA5A5; }
    [data-theme="dark"] .alert-success { background:#14532D; color:#4ADE80; }
    [data-theme="dark"] .alert-danger { background:#7F1D1D; color:#FCA5A5; }

    .device-card { display:flex; align-items:center; gap:12px; padding:14px; background:var(--bg3); border-radius:var(--radius-sm); margin-bottom:8px; }
    .device-card.current { border:1px solid var(--primary); }
    .admin-badge { background:linear-gradient(135deg,#F59E0B,#D97706); color:#fff; font-size:11px; font-weight:700; padding:2px 8px; border-radius:12px; }
    .stat-card { background:var(--bg3); border-radius:var(--radius-sm); padding:16px; text-align:center; transition:transform 0.2s; }
    .stat-card:hover { transform:translateY(-2px); }
    .activity-item { display:flex; align-items:flex-start; gap:12px; padding:12px 0; border-bottom:1px solid var(--border); }
    .activity-item:last-child { border-bottom:none; }
    .activity-dot { width:8px; height:8px; border-radius:50%; background:var(--primary); margin-top:6px; flex-shrink:0; }
    .wizard-card { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:28px; }
    .filter-tag { display:inline-flex; align-items:center; gap:4px; padding:4px 10px; border-radius:20px; background:var(--primary); color:#fff; font-size:12px; font-weight:600; }

    .notif-dropdown { position:absolute; top:46px; right:0; width:340px; background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); box-shadow:var(--shadow-lg); z-index:300; animation:slideDown 0.2s ease; max-height:400px; overflow-y:auto; }
    .notif-item { display:flex; gap:10px; padding:12px 16px; border-bottom:1px solid var(--border); transition:background 0.15s; cursor:pointer; }
    .notif-item:hover { background:var(--bg3); }
    .notif-item.unread { border-left:3px solid var(--primary); background:rgba(124,58,237,0.04); }
    [data-theme="dark"] .notif-item.unread { background:rgba(47,129,247,0.06); }
    .shimmer { background:linear-gradient(90deg,var(--bg3) 25%,var(--border) 50%,var(--bg3) 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:8px; }
  `}</style>
);

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
const fmtPrice = (p) => '$' + p.toLocaleString();
const getBadgeClass = (s) => s==='underpriced'?'badge badge-under':s==='overpriced'?'badge badge-over':'badge badge-fair';
const getBarClass = (s) => s==='underpriced'?'listing-bar bar-under':s==='overpriced'?'listing-bar bar-over':'listing-bar bar-fair';

// ═══════════════════════════════════════════════════════════════
// HOUSE SVG ANIMATION — uyga bog'liq
// ═══════════════════════════════════════════════════════════════
function HouseAnimation() {
  return (
    <div className="hero-house">
      <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stars background */}
        {[[15,18],[185,12],[170,55],[10,70],[190,100],[30,160]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="1.8" fill="white"
            style={{animation:`windowGlow ${1.5+i*0.4}s ease-in-out ${i*0.3}s infinite`,opacity:0.7}}/>
        ))}

        {/* Cloud */}
        <g style={{animation:'floatSide 5s ease-in-out infinite',opacity:0.25}}>
          <ellipse cx="35" cy="28" rx="18" ry="9" fill="white"/>
          <ellipse cx="50" cy="24" rx="13" ry="8" fill="white"/>
          <ellipse cx="22" cy="32" rx="10" ry="6" fill="white"/>
        </g>

        {/* Left tree */}
        <g style={{animation:'treeSway 3s ease-in-out infinite',transformOrigin:'28px 190px'}}>
          <rect x="25" y="168" width="5" height="28" rx="2" fill="rgba(255,255,255,0.3)"/>
          <ellipse cx="27.5" cy="158" rx="16" ry="20" fill="rgba(16,185,129,0.55)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
          <ellipse cx="27.5" cy="148" rx="12" ry="16" fill="rgba(16,185,129,0.45)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        </g>

        {/* Right tree */}
        <g style={{animation:'treeSway 4s ease-in-out 0.8s infinite',transformOrigin:'170px 190px'}}>
          <rect x="167" y="168" width="5" height="28" rx="2" fill="rgba(255,255,255,0.3)"/>
          <ellipse cx="169.5" cy="160" rx="13" ry="17" fill="rgba(16,185,129,0.5)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <ellipse cx="169.5" cy="150" rx="10" ry="14" fill="rgba(16,185,129,0.4)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
        </g>

        {/* House body */}
        <rect x="45" y="118" width="110" height="80" rx="4"
          fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>

        {/* Roof */}
        <path d="M34 122 L100 58 L166 122 Z"
          fill="rgba(124,58,237,0.75)" stroke="rgba(255,255,255,0.65)" strokeWidth="2"
          style={{animation:'roofBob 5s ease-in-out infinite'}}/>

        {/* Chimney */}
        <rect x="128" y="72" width="12" height="28" rx="2"
          fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
        {/* Smoke puffs */}
        {[0,1,2].map(i=>(
          <circle key={i} cx={134+i*1.5} cy={64-i*10} r={3+i*2}
            fill="rgba(255,255,255,0.22)"
            style={{animation:`chimneySteam ${1.5+i*0.5}s ease-out ${i*0.5}s infinite`}}/>
        ))}

        {/* Left window */}
        <rect x="58" y="132" width="30" height="26" rx="3"
          fill="rgba(255,230,80,0.55)" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5"
          style={{animation:`windowGlow 2.5s ease-in-out infinite`}}/>
        <line x1="73" y1="132" x2="73" y2="158" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        <line x1="58" y1="145" x2="88" y2="145" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>

        {/* Right window */}
        <rect x="112" y="132" width="30" height="26" rx="3"
          fill="rgba(160,220,255,0.5)" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5"
          style={{animation:`windowGlow 3s ease-in-out 0.8s infinite`}}/>
        <line x1="127" y1="132" x2="127" y2="158" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        <line x1="112" y1="145" x2="142" y2="145" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>

        {/* Door */}
        <rect x="82" y="158" width="36" height="40" rx="4"
          fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
        <circle cx="113" cy="178" r="2.5" fill="rgba(255,220,0,0.9)"/>

        {/* Ground */}
        <path d="M10 198 Q100 192 190 198 L190 210 L10 210 Z"
          fill="rgba(255,255,255,0.12)"/>

        {/* Floating price tag */}
        <g style={{animation:'priceTag 3s ease-in-out infinite'}}>
          <rect x="54" y="38" width="82" height="26" rx="13"
            fill="rgba(124,58,237,0.92)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
          <text x="95" y="56" textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="Sora,sans-serif">$145,000</text>
        </g>
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════════
function SuccessToast({ message, onClose }) {
  useEffect(()=>{const t=setTimeout(onClose,2800);return ()=>clearTimeout(t);},[onClose]);
  return (
    <div style={{position:'fixed',bottom:24,right:24,background:'#10B981',color:'#fff',padding:'12px 20px',borderRadius:10,fontWeight:600,fontSize:14,display:'flex',alignItems:'center',gap:8,zIndex:999,boxShadow:'0 8px 24px rgba(0,0,0,0.2)',animation:'slideIn 0.3s ease'}}>
      <CheckCircle size={16}/> {message}
    </div>
  );
}

function ConfirmModal({ title, message, confirmText, danger, onConfirm, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{maxWidth:380}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
          <div style={{width:40,height:40,background:'#FEE2E2',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}><AlertTriangle size={20} color="#DC2626"/></div>
          <h3 style={{fontFamily:'Sora,sans-serif',color:'var(--text)'}}>{title}</h3>
        </div>
        <p style={{color:'var(--text2)',fontSize:14,marginBottom:20}}>{message}</p>
        <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>
          <button className="btn btn-outline" onClick={onClose}>Bekor qilish</button>
          <button className={`btn ${danger?'btn-danger':'btn-primary'}`} onClick={()=>{onConfirm();onClose();}}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════
function NotificationsDropdown({ onClose }) {
  const { t, notifications, markAllRead } = useApp();
  const notifT = t.notifications;
  const getIcon = (type) => {
    const map = {
      price_drop:<div style={{width:36,height:36,borderRadius:'50%',background:'#FEE2E2',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><TrendingUp size={16} color="#DC2626"/></div>,
      insight:<div style={{width:36,height:36,borderRadius:'50%',background:'#EDE9FE',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><BarChart2 size={16} color="#7C3AED"/></div>,
      new_listing:<div style={{width:36,height:36,borderRadius:'50%',background:'#DCFCE7',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Home size={16} color="#16A34A"/></div>,
      welcome:<div style={{width:36,height:36,borderRadius:'50%',background:'#DBEAFE',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Star size={16} color="#2563EB"/></div>,
    };
    return map[type]||map.welcome;
  };
  const getTitle = (n) => {
    if (n.type==='price_drop') return `${notifT.price_drop}: ${n.listing} (${n.amount})`;
    if (n.type==='insight') return notifT.insight;
    if (n.type==='new_listing') return `${notifT.new_listing}: ${n.listing}`;
    if (n.text) return n.text;
    return notifT.welcome;
  };
  return (
    <div className="notif-dropdown">
      <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,background:'var(--bg2)',zIndex:1}}>
        <span style={{fontWeight:700,fontSize:15,color:'var(--text)'}}>{notifT.title}</span>
        <button className="btn-ghost btn-sm" style={{fontSize:12}} onClick={markAllRead}>{notifT.mark_all}</button>
      </div>
      {notifications.length===0
        ?<div style={{padding:32,textAlign:'center',color:'var(--text3)'}}><BellOff size={24} style={{margin:'0 auto 8px',display:'block',opacity:0.4}}/><p style={{fontSize:13}}>{notifT.empty}</p></div>
        :notifications.map(n=>(
          <div key={n.id} className={`notif-item ${!n.read?'unread':''}`}>
            {getIcon(n.type)}
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:!n.read?700:400,color:'var(--text)',lineHeight:1.4,marginBottom:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{getTitle(n)}</div>
              <div style={{fontSize:11,color:'var(--text3)',display:'flex',alignItems:'center',gap:4}}><Clock size={10}/>{n.time}</div>
            </div>
            {!n.read&&<div style={{width:8,height:8,borderRadius:'50%',background:'var(--primary)',flexShrink:0,marginTop:4}}/>}
          </div>
        ))
      }
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// AUTH MODAL
// ═══════════════════════════════════════════════════════════════
function AuthModal({ onClose }) {
  const { login } = useApp();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleLogin = () => {
    setLoading(true); setError('');
    setTimeout(()=>{ const f=findUser(email,password); if(f){login(f);onClose();}else setError("Email yoki parol noto'g'ri"); setLoading(false); },600);
  };
  const handleRegister = () => {
    if (!name.trim()||!email.trim()||!password.trim()){setError("Barcha maydonlarni to'ldiring");return;}
    if (password.length<6){setError("Parol kamida 6 ta belgi");return;}
    if (findUserByEmail(email)){setError("Bu email allaqachon ro'yxatdan o'tgan");return;}
    setLoading(true);
    setTimeout(()=>{const u=registerUser(name,email,password);login(u);onClose();setLoading(false);},600);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:20,color:'var(--primary)'}}>qulayUy<span style={{color:'var(--tertiary)'}}> </span></div>
          <button className="nav-icon-btn" onClick={onClose}><X size={16}/></button>
        </div>
        <div style={{display:'flex',background:'var(--bg3)',borderRadius:8,padding:4,marginBottom:20}}>
          {['login','register'].map(m=>(
            <button key={m} onClick={()=>{setMode(m);setError('');}} style={{flex:1,padding:'8px',border:'none',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:14,transition:'all 0.2s',background:mode===m?'var(--bg2)':'transparent',color:mode===m?'var(--primary)':'var(--text2)',boxShadow:mode===m?'var(--shadow)':'none'}}>
              {m==='login'?'Kirish':"Ro'yxat"}
            </button>
          ))}
        </div>
        {error&&<div className="alert alert-danger"><AlertCircle size={16}/>{error}</div>}
        {mode==='register'&&<div style={{marginBottom:12}}><label className="label">To'liq ism</label><input className="input" placeholder="Ismingiz" value={name} onChange={e=>setName(e.target.value)}/></div>}
        <div style={{marginBottom:12}}><label className="label">Email</label><input className="input" type="email" placeholder="email@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
        <div style={{marginBottom:20}}><label className="label">Parol</label><input className="input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(mode==='login'?handleLogin():handleRegister())}/></div>
        <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={mode==='login'?handleLogin:handleRegister} disabled={loading}>
          {loading?'...':mode==='login'?'Kirish':"Ro'yxatdan o'tish"}
        </button>
        <div style={{marginTop:16,padding:12,background:'var(--bg3)',borderRadius:8}}>
          <p style={{fontSize:12,color:'var(--text3)',marginBottom:4,fontWeight:600}}>Demo:</p>
          <p style={{fontSize:12,color:'var(--text3)'}}>👑 Admin: admin@gmail.com / admin123</p>
          <p style={{fontSize:12,color:'var(--text3)'}}>👤 User: o'z emailingiz bilan ro'yxatdan o'ting</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════
function Navbar({ page, setPage }) {
  const { t, theme, toggleTheme, lang, setLang, user, logout, unreadCount } = useApp();
  const [showAuth, setShowAuth] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);
  useEffect(()=>{
    const h=(e)=>{if(notifRef.current&&!notifRef.current.contains(e.target))setShowNotif(false);};
    document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h);
  },[]);
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo" onClick={()=>setPage('home')}>qulayUy<span> </span></div>
          <div className="nav-links">
            {['listings','compare','favorites'].map(p=>(
              <button key={p} className={`nav-link ${page===p?'active':''}`} onClick={()=>setPage(p)}>{t.nav[p]}</button>
            ))}
            {user?.role==='admin'&&<button className={`nav-link ${page==='profile'?'active':''}`} onClick={()=>setPage('profile')} style={{color:'#F59E0B'}}>👑 {t.nav.admin}</button>}
          </div>
          <div className="nav-actions">
            <div style={{display:'flex',gap:3}}>
              {['uz','en','ru'].map(l=><button key={l} className={`lang-btn ${lang===l?'active':''}`} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}
            </div>
            <button className="nav-icon-btn" onClick={toggleTheme}>{theme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</button>
            <div style={{position:'relative'}} ref={notifRef}>
              <button className="nav-icon-btn" onClick={()=>setShowNotif(!showNotif)}>
                <Bell size={16}/>
                {unreadCount>0&&<span className="notif-dot">{unreadCount>9?'9+':unreadCount}</span>}
              </button>
              {showNotif&&<NotificationsDropdown onClose={()=>setShowNotif(false)}/>}
            </div>
            {user
              ?<button className="nav-icon-btn" onClick={()=>setPage('profile')} style={{background:user.role==='admin'?'#F59E0B':'var(--primary)',color:'#fff',fontWeight:700,fontSize:14}}>{user.name.slice(0,2).toUpperCase()}</button>
              :<button className="btn btn-primary btn-sm" onClick={()=>setShowAuth(true)}>{t.nav.login}</button>
            }
          </div>
        </div>
      </nav>
      {showAuth&&<AuthModal onClose={()=>setShowAuth(false)}/>}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// LISTING CARD
// ═══════════════════════════════════════════════════════════════
function ListingCard({ listing, onClick, animDelay=0 }) {
  const { favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(listing.id);
  const StatusIcon = listing.status==='underpriced'?ArrowUpRight:listing.status==='overpriced'?ArrowDownRight:ArrowRight;
  return (
    <div className="card listing-card fade-in" onClick={onClick} style={{animationDelay:`${animDelay}s`}}>
      <div style={{overflow:'hidden',height:180}}>
        {listing.images?.[0]
          ?<img src={listing.images[0]} alt={listing.title} className="listing-img"/>
          :<div style={{width:'100%',height:180,background:'var(--bg3)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--text3)'}}><Home size={32}/></div>
        }
      </div>
      <div className="listing-badge"><span className={getBadgeClass(listing.status)}><StatusIcon size={11}/> {listing.badge}</span></div>
      <button className="listing-fav" onClick={e=>{e.stopPropagation();toggleFavorite(listing.id);}}>
        {isFav?<Heart size={15} fill="red" color="red"/>:<Heart size={15}/>}
      </button>
      <div className="listing-body">
        <div className="listing-price">{fmtPrice(listing.price)}</div>
        <div className="listing-title">{listing.title}</div>
        <div className="listing-loc"><MapPin size={11}/> {listing.district}, {listing.city}</div>
        <div className="listing-meta">
          <span style={{display:'flex',alignItems:'center',gap:3}}><Bed size={11}/> {listing.rooms}</span>
          <span style={{display:'flex',alignItems:'center',gap:3}}><Maximize2 size={11}/> {listing.size} m²</span>
          <span style={{display:'flex',alignItems:'center',gap:3}}><Building2 size={11}/> {listing.floor}/{listing.totalFloors}</span>
        </div>
        <div className={getBarClass(listing.status)} style={{width:listing.status==='underpriced'?'70%':listing.status==='overpriced'?'90%':'75%'}}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VALUATION MODAL
// ═══════════════════════════════════════════════════════════════
function ValuationModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({city:'Tashkent',district:'Mirabad',rooms:2,size:'',floor:'',condition:'Yaxshi',type:'Kvartira'});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const districts = {Tashkent:['Mirabad','Yunusabad','Chilanzar','Mirzo Ulugbek','Yakkasaray','Sergeli'],Samarkand:['Markaz',"Kattaqo'rg'on",'Urgut'],Bukhara:['Markaz','Kogon'],Namangan:['Markaz','Chortoq'],Fergana:['Markaz','Quvasoy']};
  const region = ALL_REGIONS.find(r=>r.city===form.city)||ALL_REGIONS[0];
  const calculate = () => {
    setLoading(true);
    setTimeout(()=>{
      const base=region.price;
      const cM=form.condition==='Yangi'?1.15:form.condition==='Yaxshi'?1.0:0.85;
      const fM=parseInt(form.floor)>10?1.08:parseInt(form.floor)===1?0.93:1.0;
      const rM=form.rooms<=1?0.95:form.rooms>=4?1.05:1.0;
      const estPerM2=Math.round(base*cM*fM*rM);
      setResult({estPerM2,totalEst:estPerM2*parseInt(form.size||80),marketAvg:base,diff:Math.round((estPerM2/base-1)*100),region});
      setLoading(false);setStep(3);
    },1500);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:40,height:40,background:'var(--primary)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><DollarSign size={20}/></div>
            <div><div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:17,color:'var(--text)'}}>Narx Baholash</div><div style={{fontSize:12,color:'var(--text2)'}}>Mulk bozor qiymatini aniqlang</div></div>
          </div>
          <button className="nav-icon-btn" onClick={onClose}><X size={16}/></button>
        </div>
        <div style={{display:'flex',gap:4,marginBottom:20}}>{[1,2,3].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:step>=s?'var(--primary)':'var(--border)',transition:'all 0.3s'}}/>)}</div>
        {step===1&&(
          <div className="fade-in">
            <h3 style={{fontWeight:700,marginBottom:16,color:'var(--text)'}}>Joylashuv</h3>
            <div style={{marginBottom:14}}><label className="label">Shahar</label><select className="select" value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value,district:'Markaz'}))}>{ALL_REGIONS.map(r=><option key={r.city}>{r.city}</option>)}</select></div>
            <div style={{marginBottom:14}}><label className="label">Tuman</label><select className="select" value={form.district} onChange={e=>setForm(f=>({...f,district:e.target.value}))}>{(districts[form.city]||['Markaz']).map(d=><option key={d}>{d}</option>)}</select></div>
            <div style={{marginBottom:20}}>
              <label className="label">Mulk turi</label>
              <div style={{display:'flex',gap:8}}>
                {['Kvartira','Villa','Studiya'].map(ty=>(
                  <button key={ty} onClick={()=>setForm(f=>({...f,type:ty}))} style={{flex:1,padding:'10px',border:`2px solid ${form.type===ty?'var(--primary)':'var(--border)'}`,borderRadius:8,background:form.type===ty?'var(--bg3)':'transparent',color:form.type===ty?'var(--primary)':'var(--text)',fontWeight:600,cursor:'pointer',fontSize:13,transition:'all 0.2s'}}>{ty}</button>
                ))}
              </div>
            </div>
            <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={()=>setStep(2)}>Davom etish <ChevronRight size={15}/></button>
          </div>
        )}
        {step===2&&(
          <div className="fade-in">
            <h3 style={{fontWeight:700,marginBottom:16,color:'var(--text)'}}>Parametrlar</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
              <div><label className="label">Maydon (m²)</label><input className="input" type="number" placeholder="85" value={form.size} onChange={e=>setForm(f=>({...f,size:e.target.value}))}/></div>
              <div><label className="label">Qavat</label><input className="input" type="number" placeholder="5" value={form.floor} onChange={e=>setForm(f=>({...f,floor:e.target.value}))}/></div>
            </div>
            <div style={{marginBottom:14}}>
              <label className="label">Xonalar soni</label>
              <div className="room-btns">{[1,2,3,4,'5+'].map(r=><button key={r} className={`room-btn ${form.rooms===r?'active':''}`} onClick={()=>setForm(f=>({...f,rooms:r}))}>{r}</button>)}</div>
            </div>
            <div style={{marginBottom:20}}>
              <label className="label">Holati</label>
              <div style={{display:'flex',gap:8}}>
                {['Yangi','Yaxshi',"Ta'mirlash kerak"].map(c=>(
                  <button key={c} onClick={()=>setForm(f=>({...f,condition:c}))} style={{flex:1,padding:'8px 6px',border:`2px solid ${form.condition===c?'var(--primary)':'var(--border)'}`,borderRadius:8,background:form.condition===c?'var(--bg3)':'transparent',color:form.condition===c?'var(--primary)':'var(--text)',fontWeight:600,cursor:'pointer',fontSize:12,transition:'all 0.2s'}}>{c}</button>
                ))}
              </div>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button className="btn btn-outline" onClick={()=>setStep(1)}><ChevronLeft size={15}/> Orqaga</button>
              <button className="btn btn-primary" style={{flex:1,justifyContent:'center'}} onClick={calculate} disabled={!form.size||loading}>
                {loading?<><RefreshCw size={15} className="spin"/> Hisoblanmoqda...</>:<><DollarSign size={15}/> Hisoblash</>}
              </button>
            </div>
          </div>
        )}
        {step===3&&result&&(
          <div className="fade-in">
            <div style={{background:'linear-gradient(135deg,var(--primary),var(--secondary))',borderRadius:12,padding:20,color:'#fff',marginBottom:20,textAlign:'center'}}>
              <div style={{fontSize:12,opacity:0.8,marginBottom:4}}>Taxminiy bozor qiymati</div>
              <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:36}}>{fmtPrice(result.totalEst)}</div>
              <div style={{fontSize:14,opacity:0.85,marginTop:4}}>${result.estPerM2}/m² • {form.city}</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
              {[["Bozor o'rtacha",fmtPrice(result.marketAvg)+'/m²'],['Hisoblangan',fmtPrice(result.estPerM2)+'/m²'],['Farq',`${result.diff>0?'+':''}${result.diff}%`],['Holat',result.diff<-5?'Arzon 🎉':result.diff>5?'Yuqori ⚠️':'Adolatli ✅']].map(([k,v])=>(
                <div key={k} style={{background:'var(--bg3)',borderRadius:10,padding:'12px 14px'}}>
                  <div style={{fontSize:11,color:'var(--text3)',marginBottom:4}}>{k}</div>
                  <div style={{fontWeight:700,fontSize:15,color:'var(--text)'}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:10}}>
              <button className="btn btn-outline" onClick={()=>{setStep(1);setResult(null);}} style={{flex:1,justifyContent:'center'}}><RefreshCw size={14}/> Qayta</button>
              <button className="btn btn-primary" onClick={onClose} style={{flex:1,justifyContent:'center'}}><CheckCircle size={14}/> Tayyor</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ADVISOR MODAL
// ═══════════════════════════════════════════════════════════════
function AdvisorModal({ onClose }) {
  const bestDeals = mockListings.filter(l=>l.status==='underpriced').sort((a,b)=>a.price-b.price).slice(0,4);
  const cheapestR = [...ALL_REGIONS].sort((a,b)=>a.price-b.price)[0];
  const bestR = [...ALL_REGIONS].sort((a,b)=>b.score-a.score)[0];
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={e=>e.stopPropagation()} style={{maxWidth:720}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:40,height:40,background:'var(--primary)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><Bot size={20}/></div>
            <div><div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:18,color:'var(--text)'}}>Bozor Maslahati</div><div style={{fontSize:12,color:'var(--text2)'}}>Hozirgi eng yaxshi takliflar</div></div>
          </div>
          <button className="nav-icon-btn" onClick={onClose}><X size={16}/></button>
        </div>
        <div style={{background:'linear-gradient(135deg,var(--primary),var(--secondary))',borderRadius:12,padding:20,marginBottom:20,color:'#fff'}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>Tavsiya</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            {[
              {label:'Eng arzon viloyat',value:cheapestR.city,sub:cheapestR.pricePerM2},
              {label:'Eng yuqori potentsial',value:bestR.city,sub:`Ball: ${bestR.score}/100`},
              {label:"Toshkent o'rtacha",value:'$1,240/m²',sub:'Mirabad eng qimmat'},
              {label:"Arzon e'lonlar",value:`${bestDeals.length} ta`,sub:'Hozir mavjud'},
            ].map((item,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.15)',borderRadius:8,padding:12}}>
                <div style={{fontSize:11,opacity:0.8,marginBottom:4}}>{item.label}</div>
                <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:18}}>{item.value}</div>
                <div style={{fontSize:11,opacity:0.75,marginTop:2}}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:12,color:'var(--text)',display:'flex',alignItems:'center',gap:6}}><TrendingUp size={16} color="#10B981"/> Eng yaxshi narxdagi mulklar</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {bestDeals.map(l=>(
              <div key={l.id} style={{background:'var(--bg3)',borderRadius:10,padding:12,display:'flex',gap:10,alignItems:'center'}}>
                <img src={l.images[0]} style={{width:52,height:52,borderRadius:8,objectFit:'cover',flexShrink:0}} alt={l.title}/>
                <div style={{minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:13,color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{l.title}</div>
                  <div style={{fontSize:12,color:'var(--text2)'}}>{l.district}</div>
                  <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:14,color:'var(--primary)'}}>{fmtPrice(l.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={onClose}><CheckCircle size={15}/> Yopish</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TOUR MODAL
// ═══════════════════════════════════════════════════════════════
function TourModal({ listing, onClose }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);
  const dates = [];
  for (let i=1;i<=7;i++){const d=new Date();d.setDate(d.getDate()+i);dates.push({label:d.toLocaleDateString('uz-UZ',{weekday:'short',day:'numeric',month:'short'}),value:d.toISOString().split('T')[0]});}
  const times = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'];
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:40,height:40,background:'var(--primary)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><Calendar size={20}/></div>
            <div><div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:17,color:'var(--text)'}}>Tur Buyurtma</div><div style={{fontSize:12,color:'var(--text2)'}}>{listing?.title}</div></div>
          </div>
          <button className="nav-icon-btn" onClick={onClose}><X size={16}/></button>
        </div>
        {done?(
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{width:72,height:72,background:'#DCFCE7',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',animation:'popIn 0.5s ease'}}><CheckCircle size={36} color="#16A34A"/></div>
            <h3 style={{fontFamily:'Sora,sans-serif',color:'var(--text)',marginBottom:8}}>Muvaffaqiyatli!</h3>
            <p style={{color:'var(--text2)',fontSize:14,marginBottom:4}}>Sana: <strong>{selectedDate}</strong> | Vaqt: <strong>{selectedTime}</strong></p>
            <p style={{fontSize:13,color:'var(--text3)',marginBottom:20}}>Agent siz bilan tez orada bog'lanadi.</p>
            <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={onClose}>Yopish</button>
          </div>
        ):(
          <>
            <div style={{marginBottom:14}}><label className="label">Sanani tanlang *</label><div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{dates.map(d=><button key={d.value} onClick={()=>setSelectedDate(d.value)} style={{padding:'6px 10px',border:`2px solid ${selectedDate===d.value?'var(--primary)':'var(--border)'}`,borderRadius:8,background:selectedDate===d.value?'var(--bg3)':'transparent',color:selectedDate===d.value?'var(--primary)':'var(--text)',fontWeight:600,cursor:'pointer',fontSize:12,transition:'all 0.2s'}}>{d.label}</button>)}</div></div>
            <div style={{marginBottom:14}}><label className="label">Vaqtni tanlang *</label><div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{times.map(t=><button key={t} onClick={()=>setSelectedTime(t)} style={{padding:'6px 12px',border:`2px solid ${selectedTime===t?'var(--primary)':'var(--border)'}`,borderRadius:8,background:selectedTime===t?'var(--bg3)':'transparent',color:selectedTime===t?'var(--primary)':'var(--text)',fontWeight:600,cursor:'pointer',fontSize:13,transition:'all 0.2s'}}>{t}</button>)}</div></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
              <div><label className="label">Ismingiz *</label><input className="input" placeholder="Ism Familiya" value={name} onChange={e=>setName(e.target.value)}/></div>
              <div><label className="label">Telefon *</label><input className="input" placeholder="+998 90 123 45 67" value={phone} onChange={e=>setPhone(e.target.value)}/></div>
            </div>
            <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',opacity:(!selectedDate||!selectedTime||!name||!phone)?0.5:1}} onClick={()=>{if(selectedDate&&selectedTime&&name&&phone)setDone(true);}}>
              <Calendar size={15}/> Turni Tasdiqlash
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MARKET PULSE MODAL
// ═══════════════════════════════════════════════════════════════
function MarketPulseModal({ onClose }) {
  const [activeCity, setActiveCity] = useState('Tashkent');
  const cd = ALL_REGIONS.find(r=>r.city===activeCity)||ALL_REGIONS[0];
  const months=['Yan','Fev','Mar','Apr','May','Iyu','Iyu','Avg','Sen','Okt','Noy','Dek'];
  const history=[88,90,91,93,94,92,96,98,100,103,105,108].map(v=>Math.round(cd.price*v/100));
  const maxV=Math.max(...history),minV=Math.min(...history);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={e=>e.stopPropagation()} style={{maxWidth:720}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:40,height:40,background:'var(--primary)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><BarChart3 size={20}/></div>
            <div><div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:18,color:'var(--text)'}}>Bozor Holati</div><div style={{fontSize:12,color:'var(--text2)'}}>Viloyatlar bo'yicha tahlil</div></div>
          </div>
          <button className="nav-icon-btn" onClick={onClose}><X size={16}/></button>
        </div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:20}}>
          {ALL_REGIONS.map(r=><button key={r.city} onClick={()=>setActiveCity(r.city)} style={{padding:'5px 12px',border:`2px solid ${activeCity===r.city?r.color:'var(--border)'}`,borderRadius:20,background:activeCity===r.city?`${r.color}18`:'transparent',color:activeCity===r.city?r.color:'var(--text2)',fontWeight:600,cursor:'pointer',fontSize:12,transition:'all 0.2s'}}>{r.city}</button>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:20}}>
          {[['Narx/m²',cd.pricePerM2,cd.color],['Ball',`${cd.score}/100`,'#10B981'],["E'lonlar",`${cd.listings} ta`,'#2F81F7'],["O'rtacha xona",`${cd.avgRooms}`,'#F59E0B']].map(([k,v,c])=>(
            <div key={k} style={{background:'var(--bg3)',borderRadius:10,padding:14,borderTop:`3px solid ${c}`,textAlign:'center'}}>
              <div style={{fontSize:11,color:'var(--text3)',marginBottom:4}}>{k}</div>
              <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:18,color:'var(--text)'}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{background:'var(--bg3)',borderRadius:12,padding:20,marginBottom:20}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:14,color:'var(--text)',display:'flex',alignItems:'center',gap:6}}><TrendingUp size={14} color={cd.color}/> {cd.city} — 2024 narx dinamikasi</div>
          <div style={{display:'flex',alignItems:'flex-end',gap:3,height:90}}>
            {history.map((v,i)=>{
              const h=Math.round(((v-minV)/(maxV-minV||1))*75+15);
              return <div key={i} style={{flex:1,height:`${h}px`,background:i===11?cd.color:'var(--border)',borderRadius:'4px 4px 0 0',transition:'all 0.3s',cursor:'pointer',position:'relative'}}
                onMouseEnter={e=>e.currentTarget.style.background=cd.color}
                onMouseLeave={e=>e.currentTarget.style.background=i===11?cd.color:'var(--border)'}/>;
            })}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:4,fontSize:10,color:'var(--text3)'}}>{months.map(m=><span key={m}>{m}</span>)}</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
          <div>
            <div style={{fontWeight:700,fontSize:13,marginBottom:8,color:'var(--text)'}}>Afzalliklar</div>
            {cd.highlights.map((h,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 0',borderBottom:i<cd.highlights.length-1?'1px solid var(--border)':'none'}}><CheckCircle size={13} color="#10B981"/><span style={{fontSize:13,color:'var(--text)'}}>{h}</span></div>)}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:13,marginBottom:8,color:'var(--text)'}}>Ko'rsatkichlar</div>
            {[["O'sish",cd.growth],['Xavf',cd.risk],['Top tuman',cd.topDistrict]].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid var(--border)',fontSize:13}}><span style={{color:'var(--text2)'}}>{k}</span><span style={{fontWeight:600,color:'var(--text)'}}>{v}</span></div>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={onClose}><CheckCircle size={15}/> Yopish</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PDF MODAL
// ═══════════════════════════════════════════════════════════════
function PdfModal({ items, onClose }) {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const handleDownload = () => {
    setGenerating(true);
    setTimeout(()=>{
      const content = ['UyNarx — Mulk Taqqoslash Hisoboti','='.repeat(40),`Sana: ${new Date().toLocaleDateString('uz-UZ')}`,'',
        ...items.map(item=>[`${item.title}`,`  Manzil: ${item.address}`,`  Narx: $${item.price.toLocaleString()} ($${item.pricePerM2}/m²)`,`  ${item.rooms} xona, ${item.size} m², ${item.floor}/${item.totalFloors} qavat`,`  Holat: ${item.badge}`,`  Taxminiy: $${item.estimatedValue.toLocaleString()}`,''].join('\n'))
      ].join('\n');
      const blob=new Blob([content],{type:'text/plain;charset=utf-8'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');a.href=url;a.download='uynarx-hisobot.txt';
      document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
      setGenerating(false);setDone(true);
    },2000);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:440}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:40,height:40,background:'var(--primary)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><FileText size={20}/></div>
            <div><div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:17,color:'var(--text)'}}>Hisobot Yuklab Olish</div><div style={{fontSize:12,color:'var(--text2)'}}>{items.length} ta mulk taqqoslama</div></div>
          </div>
          <button className="nav-icon-btn" onClick={onClose}><X size={16}/></button>
        </div>
        {done?(
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{width:72,height:72,background:'#DCFCE7',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',animation:'popIn 0.5s ease'}}><CheckCircle size={36} color="#16A34A"/></div>
            <h3 style={{fontFamily:'Sora,sans-serif',color:'var(--text)',marginBottom:8}}>Yuklandi!</h3>
            <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:16}} onClick={onClose}><CheckCircle size={15}/> Yopish</button>
          </div>
        ):(
          <>
            {items.map(item=>(
              <div key={item.id} style={{display:'flex',gap:10,background:'var(--bg3)',borderRadius:10,padding:10,marginBottom:8,alignItems:'center'}}>
                <img src={item.images[0]} style={{width:48,height:48,borderRadius:8,objectFit:'cover',flexShrink:0}} alt={item.title}/>
                <div><div style={{fontWeight:600,fontSize:13,color:'var(--text)'}}>{item.title}</div><div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:14,color:'var(--primary)'}}>{fmtPrice(item.price)}</div></div>
              </div>
            ))}
            <button className="btn btn-primary btn-lg" style={{width:'100%',justifyContent:'center',marginTop:12}} onClick={handleDownload} disabled={generating}>
              {generating?<><RefreshCw size={16} className="spin"/> Tayyorlanmoqda...</>:<><Download size={16}/> Yuklab Olish</>}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DETAIL MODAL (compare page)
// ═══════════════════════════════════════════════════════════════
function ListingDetailModal({ listing, onClose, onTour }) {
  if (!listing) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={e=>e.stopPropagation()} style={{maxWidth:680}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
          <div><h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:20,color:'var(--text)',marginBottom:4}}>{listing.title}</h2><p style={{fontSize:13,color:'var(--text2)',display:'flex',alignItems:'center',gap:4}}><MapPin size={12}/>{listing.address}</p></div>
          <button className="nav-icon-btn" onClick={onClose}><X size={16}/></button>
        </div>
        <div style={{height:180,borderRadius:12,overflow:'hidden',marginBottom:14}}><img src={listing.images[0]} alt={listing.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:14}}>
          {[[<DollarSign size={13}/>,'Narx',fmtPrice(listing.price)],[<Maximize2 size={13}/>,'Maydon',`${listing.size} m²`],[<Bed size={13}/>,'Xona',listing.rooms],[<Building2 size={13}/>,'Qavat',`${listing.floor}/${listing.totalFloors}`]].map(([icon,k,v])=>(
            <div key={k} style={{background:'var(--bg3)',borderRadius:10,padding:'10px 12px',textAlign:'center'}}>
              <div style={{fontSize:11,color:'var(--text3)',display:'flex',alignItems:'center',justifyContent:'center',gap:3,marginBottom:3}}>{icon}{k}</div>
              <div style={{fontWeight:700,fontSize:15,color:'var(--text)'}}>{v}</div>
            </div>
          ))}
        </div>
        <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.6,marginBottom:14}}>{listing.description}</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:18}}>
          {listing.amenities.map(a=><span key={a} style={{padding:'4px 10px',background:'var(--bg3)',borderRadius:20,fontSize:12,color:'var(--text)',display:'flex',alignItems:'center',gap:4}}><CheckCircle size={11}/>{a}</span>)}
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="btn btn-outline" style={{flex:1,justifyContent:'center'}} onClick={onClose}><X size={14}/> Yopish</button>
          <button className="btn btn-primary" style={{flex:2,justifyContent:'center'}} onClick={()=>{onTour(listing);onClose();}}><Calendar size={15}/> Tur Buyurtma</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════
function HomePage({ setPage, setSelectedListing }) {
  const { t } = useApp();
  const [search, setSearch] = useState('');
  const [propType, setPropType] = useState('');
  const [showAllRegions, setShowAllRegions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showValuation, setShowValuation] = useState(false);
  const [showAdvisor, setShowAdvisor] = useState(false);
  const visibleRegions = showAllRegions ? ALL_REGIONS : ALL_REGIONS.slice(0,3);

  return (
    <div className="page">
      {showValuation&&<ValuationModal onClose={()=>setShowValuation(false)}/>}
      {showAdvisor&&<AdvisorModal onClose={()=>setShowAdvisor(false)}/>}
      {selectedRegion&&(
        <div className="modal-overlay" onClick={()=>setSelectedRegion(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:620}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:12,height:12,borderRadius:'50%',background:selectedRegion.color}}/>
                <h2 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:22,color:'var(--text)'}}>{selectedRegion.city}</h2>
                <span className={`badge ${selectedRegion.trend==='up'?'badge-under':'badge-stable'}`}>{selectedRegion.change}</span>
              </div>
              <button className="nav-icon-btn" onClick={()=>setSelectedRegion(null)}><X size={16}/></button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:16}}>
              {[['Narx/m²',selectedRegion.pricePerM2,selectedRegion.color],['Ball',`${selectedRegion.score}/100`,'#10B981'],["E'lonlar",`${selectedRegion.listings} ta`,'#2F81F7'],["O'r. xona",`${selectedRegion.avgRooms}`,'#F59E0B']].map(([k,v,c])=>(
                <div key={k} style={{background:'var(--bg3)',borderRadius:10,padding:12,borderTop:`3px solid ${c}`,textAlign:'center'}}>
                  <div style={{fontSize:11,color:'var(--text3)',marginBottom:3}}>{k}</div>
                  <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:16,color:'var(--text)'}}>{v}</div>
                </div>
              ))}
            </div>
            <p style={{color:'var(--text2)',fontSize:13,marginBottom:14,fontStyle:'italic'}}>"{selectedRegion.note}"</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:20}}>
              {selectedRegion.highlights.map((h,i)=><span key={i} style={{padding:'5px 12px',background:'var(--bg3)',borderRadius:20,fontSize:12,display:'flex',alignItems:'center',gap:4,color:'var(--text)'}}><CheckCircle size={12} color="#10B981"/>{h}</span>)}
            </div>
            <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={()=>setSelectedRegion(null)}><CheckCircle size={15}/> Yopish</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="hero">
        {/* Floating chips */}
        <div className="hero-chip hero-chip-1"><TrendingUp size={14} color="#10B981"/> <span>+4.2% o'sish</span></div>
        <div className="hero-chip hero-chip-2"><Home size={14}/> <span>2,400+ E'lonlar</span></div>
        <div className="hero-chip hero-chip-3"><MapPin size={14}/> <span>12 Viloyat</span></div>

        {/* House animation */}
        <HouseAnimation/>

        <div style={{position:'relative',zIndex:1,maxWidth:580,margin:'0 auto',padding:'0 20px'}}>
          <h1 className="hero-title">{t.home.hero_title}</h1>
          <p className="hero-sub">{t.home.hero_sub}</p>
          <div className="hero-search">
            <input className="input" placeholder={t.home.search_placeholder} value={search} onChange={e=>setSearch(e.target.value)}/>
            <select className="select" value={propType} onChange={e=>setPropType(e.target.value)}>
              <option value="">{t.home.property_type}</option>
              <option>{t.common.apartment}</option><option>{t.common.villa}</option>
              <option>{t.common.studio}</option><option>{t.common.penthouse}</option>
            </select>
            <button className="btn btn-primary" onClick={()=>setPage('listings')} style={{background:'rgba(255,255,255,0.2)',border:'1px solid rgba(255,255,255,0.5)',backdropFilter:'blur(10px)'}}>
              <Search size={15}/> {t.home.search_btn}
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{background:'var(--bg2)',borderBottom:'1px solid var(--border)',padding:'14px 24px'}}>
        <div style={{maxWidth:1200,margin:'0 auto',display:'flex',gap:0,justifyContent:'center'}}>
          {[['2,400+', "Faol e'lonlar",'var(--primary)'],['12','Viloyat','var(--tertiary)'],['94%','Aniqlik','#F59E0B'],['$1,240',"O'rtacha m²",'#2F81F7']].map(([num,label,color],i)=>(
            <div key={i} className={`fade-in stagger-${i+1}`} style={{textAlign:'center',padding:'6px 32px',borderRight:i<3?'1px solid var(--border)':'none'}}>
              <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:20,color}}>{num}</div>
              <div style={{fontSize:12,color:'var(--text3)',marginTop:1}}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{padding:'40px 24px'}}>
        {/* Market insights */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div><h2 className="section-title" style={{fontSize:22}}>{t.home.market_insights}</h2><p style={{fontSize:13,color:'var(--text2)'}}>{t.home.ai_driven}</p></div>
          <button className="btn btn-outline btn-sm" onClick={()=>setPage('compare')}>{t.home.view_report} <ArrowRight size={13}/></button>
        </div>
        <div className="grid-3" style={{marginBottom:16}}>
          {visibleRegions.map((m,i)=>(
            <div key={m.city} className={`region-card fade-in stagger-${Math.min(i+1,6)}`} style={{borderTop:`3px solid ${m.color}`}} onClick={()=>setSelectedRegion(m)}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:m.color}}/>
                  <span style={{fontSize:12,fontWeight:700,color:'var(--text3)'}}>{m.city}</span>
                </div>
                <span className={`badge ${m.trend==='up'?'badge-under':'badge-stable'}`} style={{fontSize:10}}>
                  {m.trend==='up'?<TrendingUp size={9}/>:<ArrowRight size={9}/>} {m.change}
                </span>
              </div>
              <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:22,margin:'6px 0',color:'var(--text)'}}>{m.pricePerM2}</div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                <div style={{flex:1,height:4,background:'var(--border)',borderRadius:2,overflow:'hidden'}}>
                  <div style={{width:`${m.score}%`,height:'100%',background:m.color,borderRadius:2}}/>
                </div>
                <span style={{fontSize:11,fontWeight:700,color:'var(--text2)'}}>{m.score}/100</span>
              </div>
              <div className="market-bar">
                {[...Array(8)].map((_,j)=><div key={j} className="market-bar-item" style={{background:j<6?'var(--border)':j===6?'var(--secondary)':m.color,opacity:0.6+j*0.05}}/>)}
              </div>
              <p style={{fontSize:11,color:'var(--text2)',fontStyle:'italic',marginBottom:8}}>"{m.note}"</p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:11,color:'var(--text3)'}}>{m.listings} ta e'lon</span>
                <button className="btn-ghost" style={{fontSize:11,padding:'3px 8px'}}>{t.home.region_analysis} <ChevronRight size={11}/></button>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginBottom:40}}>
          <button className="btn btn-secondary" onClick={()=>setShowAllRegions(!showAllRegions)}>
            {showAllRegions?<><ChevronUp size={15}/>{t.home.hide_regions}</>:<><ChevronDown size={15}/>{t.home.show_all_regions} ({ALL_REGIONS.length})</>}
          </button>
        </div>

        {/* Featured */}
        <h2 className="section-title fade-in" style={{fontSize:22,marginBottom:20}}>{t.home.featured}</h2>
        <div className="grid-4" style={{marginBottom:40}}>
          {mockListings.slice(0,4).map((l,i)=><ListingCard key={l.id} listing={l} animDelay={i*0.08} onClick={()=>{setSelectedListing(l.id);setPage('listing');}}/>)}
        </div>

        {/* Feature cards — uy ikonalari bilan */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:40}}>
          {[
            {icon:<Home size={24}/>,title:"Ko'p E'lonlar",desc:"18+ viloyat va tumanlarda yuz minglab mulklar",color:'var(--primary)',delay:0},
            {icon:<TrendingUp size={24}/>,title:"Narx Tahlili",desc:"12 ta viloyat bo'yicha real vaqt bozor ma'lumoti",color:'var(--tertiary)',delay:0.1},
            {icon:<MapPin size={24}/>,title:"Joylashuv",desc:"Har bir mulk uchun aniq manzil va tuman ma'lumoti",color:'#2F81F7',delay:0.2},
          ].map((item,i)=>(
            <div key={i} className="card card-hover fade-in" style={{padding:24,animationDelay:`${item.delay}s`,borderTop:`3px solid ${item.color}`}}>
              <div style={{width:48,height:48,borderRadius:12,background:`${item.color}18`,display:'flex',alignItems:'center',justifyContent:'center',color:item.color,marginBottom:14,animation:`float ${3+i}s ease-in-out infinite`}}>{item.icon}</div>
              <div style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:16,color:'var(--text)',marginBottom:6}}>{item.title}</div>
              <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.6}}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cta-section fade-in">
          <div>
            <h3 style={{fontFamily:'Sora,sans-serif',fontSize:22,marginBottom:6}}>{t.home.cta_title}</h3>
            <p style={{fontSize:14,opacity:0.9}}>{t.home.cta_sub}</p>
          </div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <button className="btn" style={{background:'rgba(255,255,255,0.18)',color:'#fff',fontWeight:700,border:'1px solid rgba(255,255,255,0.4)'}} onClick={()=>setShowValuation(true)}>
              <DollarSign size={15}/> {t.home.try_valuation}
            </button>
            <button className="btn" style={{background:'transparent',color:'#fff',fontWeight:700,border:'1px solid rgba(255,255,255,0.45)'}} onClick={()=>setShowAdvisor(true)}>
              <Bot size={15}/> {t.home.contact_advisor}
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LISTINGS PAGE
// ═══════════════════════════════════════════════════════════════
function ListingsPage({ setPage, setSelectedListing }) {
  const { t, publishedListings } = useApp();
  const allListings = [...publishedListings,...mockListings];
  const [filters, setFilters] = useState({district:[],rooms:null,minPrice:'',maxPrice:'',sort:'price_asc',status:'',city:''});
  const [currentPage, setCurrentPage] = useState(1);
  const [smartApplied, setSmartApplied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const perPage = 9;
  const districts = ['Yunusabad','Mirzo Ulugbek','Chilanzar','Yakkasaray','Mirabad','Center-1','Sergeli','Almazar'];
  const cities = [...new Set(allListings.map(l=>l.city))];
  const toggleDistrict = d=>setFilters(f=>({...f,district:f.district.includes(d)?f.district.filter(x=>x!==d):[...f.district,d]}));

  const handleSmartFilter = ()=>{
    setFilters(f=>({...f,status:'underpriced',sort:'views_desc'}));
    setSmartApplied(true);setShowInfo(true);setTimeout(()=>setShowInfo(false),3000);setCurrentPage(1);
  };
  const resetFilters = ()=>{ setFilters({district:[],rooms:null,minPrice:'',maxPrice:'',sort:'price_asc',status:'',city:''});setSmartApplied(false); };

  let filtered=[...allListings];
  if(filters.rooms) filtered=filtered.filter(l=>l.rooms===filters.rooms);
  if(filters.minPrice) filtered=filtered.filter(l=>l.price>=parseInt(filters.minPrice));
  if(filters.maxPrice) filtered=filtered.filter(l=>l.price<=parseInt(filters.maxPrice));
  if(filters.district.length>0) filtered=filtered.filter(l=>filters.district.some(d=>l.district.toLowerCase().includes(d.toLowerCase())));
  if(filters.status) filtered=filtered.filter(l=>l.status===filters.status);
  if(filters.city) filtered=filtered.filter(l=>l.city===filters.city);
  if(filters.sort==='price_asc') filtered.sort((a,b)=>a.price-b.price);
  else if(filters.sort==='price_desc') filtered.sort((a,b)=>b.price-a.price);
  else if(filters.sort==='views_desc') filtered.sort((a,b)=>b.views-a.views);

  const totalPages=Math.ceil(filtered.length/perPage);
  const paged=filtered.slice((currentPage-1)*perPage,currentPage*perPage);
  const activeCount=[filters.district.length>0,!!filters.rooms,!!filters.minPrice,!!filters.maxPrice,!!filters.status,!!filters.city].filter(Boolean).length;

  return (
    <div className="page">
      {showInfo&&<div style={{position:'fixed',top:80,right:24,background:'var(--primary)',color:'#fff',padding:'12px 20px',borderRadius:10,fontWeight:600,fontSize:14,display:'flex',alignItems:'center',gap:8,zIndex:999,animation:'slideIn 0.3s ease'}}><TrendingUp size={16}/> Eng yaxshi takliflar saralandi!</div>}
      <div className="container" style={{padding:'32px 24px'}}>
        <div className="listings-layout">
          <aside className="filter-sidebar">
            <div className="card" style={{padding:16}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                <h3 style={{fontWeight:700,display:'flex',alignItems:'center',gap:6,color:'var(--text)'}}><Filter size={15}/> {t.listings.filters}</h3>
                {activeCount>0&&<button className="btn-ghost btn-sm" onClick={resetFilters} style={{fontSize:12,color:'#DC2626'}}><X size={12}/> Tozalash</button>}
              </div>
              {smartApplied&&<div style={{marginBottom:10}}><span className="filter-tag"><TrendingUp size={11}/> Aqlli saralash</span></div>}
              <div style={{marginBottom:14}}><label className="label">Shahar</label><select className="select" value={filters.city} onChange={e=>{setFilters(f=>({...f,city:e.target.value}));setCurrentPage(1);}}><option value="">{t.listings.all}</option>{cities.map(c=><option key={c}>{c}</option>)}</select></div>
              <div style={{marginBottom:14}}><label className="label">{t.listings.price_range}</label><div style={{display:'flex',gap:6}}><input className="input" placeholder="Min $" value={filters.minPrice} onChange={e=>{setFilters(f=>({...f,minPrice:e.target.value}));setCurrentPage(1);}}/><input className="input" placeholder="Max $" value={filters.maxPrice} onChange={e=>{setFilters(f=>({...f,maxPrice:e.target.value}));setCurrentPage(1);}}/></div></div>
              <div style={{marginBottom:14}}>
                <label className="label">Holat</label>
                <div style={{display:'flex',flexDirection:'column',gap:5}}>
                  {[['','Barchasi'],['underpriced','Arzonlashgan'],['fair','Bozor narxi'],['overpriced','Qimmatroq']].map(([val,label])=>(
                    <label key={val} className="check-item"><input type="radio" name="status" checked={filters.status===val} onChange={()=>{setFilters(f=>({...f,status:val}));setCurrentPage(1);}} style={{accentColor:'var(--primary)'}}/>{label}</label>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:14}}><label className="label">{t.listings.districts}</label><div style={{maxHeight:156,overflowY:'auto'}}>{districts.map(d=><label key={d} className="check-item"><input type="checkbox" checked={filters.district.includes(d)} onChange={()=>{toggleDistrict(d);setCurrentPage(1);}}/> {d}</label>)}</div></div>
              <div style={{marginBottom:14}}>
                <label className="label">{t.listings.rooms}</label>
                <div className="room-btns">{[null,1,2,3,'4+'].map((r,i)=><button key={i} className={`room-btn ${filters.rooms===r?'active':''}`} onClick={()=>{setFilters(f=>({...f,rooms:r}));setCurrentPage(1);}}>{r===null?t.listings.all:r}</button>)}</div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={handleSmartFilter}><TrendingUp size={14}/> {t.listings.smart_filter}</button>
                <button className="btn btn-secondary" style={{width:'100%',justifyContent:'center'}} onClick={()=>setCurrentPage(1)}><Filter size={14}/> {t.listings.apply_filters}</button>
              </div>
            </div>
          </aside>
          <div className="listings-main">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div>
                <h1 className="section-title">{t.listings.title}</h1>
                <p style={{fontSize:14,color:'var(--text2)',marginTop:4}}>{filtered.length} {t.listings.properties_found}{smartApplied&&<span style={{marginLeft:8,fontSize:12,color:'var(--primary)',fontWeight:600}}>• Aqlli saralash faol</span>}</p>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:13,color:'var(--text2)'}}>{t.listings.sort_by}:</span>
                <select className="select" style={{width:'auto'}} value={filters.sort} onChange={e=>{setFilters(f=>({...f,sort:e.target.value}));setCurrentPage(1);}}>
                  <option value="price_asc">{t.listings.price_low}</option>
                  <option value="price_desc">{t.listings.price_high}</option>
                  <option value="views_desc">Ko'p ko'rilgan</option>
                </select>
              </div>
            </div>
            {paged.length===0
              ?<div style={{textAlign:'center',padding:60,color:'var(--text3)'}}><Home size={40} className="float-anim" style={{margin:'0 auto 12px',display:'block',opacity:0.3}}/><p>{t.listings.no_results}</p><button className="btn btn-secondary" style={{marginTop:12}} onClick={resetFilters}>Filtrlarni tozalash</button></div>
              :<div className="grid-3">{paged.map((l,i)=><ListingCard key={l.id} listing={l} animDelay={i*0.05} onClick={()=>{setSelectedListing(l.id);setPage('listing');}}/>)}</div>
            }
            {totalPages>1&&(
              <div className="pagination">
                <button className="page-btn" onClick={()=>setCurrentPage(p=>Math.max(1,p-1))}><ChevronLeft size={16}/></button>
                {[...Array(Math.min(totalPages,7))].map((_,i)=><button key={i+1} className={`page-btn ${currentPage===i+1?'active':''}`} onClick={()=>setCurrentPage(i+1)}>{i+1}</button>)}
                {totalPages>7&&<><span style={{color:'var(--text3)',padding:'0 4px'}}>...</span><button className="page-btn" onClick={()=>setCurrentPage(totalPages)}>{totalPages}</button></>}
                <button className="page-btn" onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))}><ChevronRight size={16}/></button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LISTING DETAIL PAGE
// ═══════════════════════════════════════════════════════════════
function ListingDetailPage({ listingId, setPage }) {
  const { t, favorites, toggleFavorite, publishedListings } = useApp();
  const allListings=[...publishedListings,...mockListings];
  const listing=allListings.find(l=>l.id===listingId);
  const [activeImg, setActiveImg] = useState(0);
  const [showTour, setShowTour] = useState(false);

  if (!listing) return <div style={{textAlign:'center',padding:80,color:'var(--text3)'}}><Home size={36} style={{margin:'0 auto 12px',display:'block',opacity:0.3}}/><p>Mulk topilmadi</p><button className="btn btn-primary" style={{marginTop:12}} onClick={()=>setPage('listings')}>E'lonlarga qaytish</button></div>;
  const isFav=favorites.includes(listing.id);

  return (
    <div className="page">
      {showTour&&<TourModal listing={listing} onClose={()=>setShowTour(false)}/>}
      <div className="container" style={{padding:'32px 24px'}}>
        <button className="btn btn-outline btn-sm fade-in" style={{marginBottom:20}} onClick={()=>setPage('listings')}><ChevronLeft size={14}/> {t.listing_detail.back}</button>
        <div style={{position:'relative',height:360,borderRadius:12,overflow:'hidden',background:'var(--bg3)',marginBottom:12,animation:'fadeIn 0.4s ease'}}>
          <img src={listing.images[activeImg]||listing.images[0]} alt={listing.title} style={{width:'100%',height:'100%',objectFit:'cover',transition:'opacity 0.3s'}}/>
          <span className={getBadgeClass(listing.status)} style={{position:'absolute',top:14,left:14,padding:'6px 12px',fontSize:12}}>{listing.badge}</span>
        </div>
        {listing.images.length>1&&<div className="gallery-thumb">{listing.images.map((img,i)=><img key={i} src={img} alt="" className={activeImg===i?'active':''} onClick={()=>setActiveImg(i)}/>)}</div>}

        <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:28,marginTop:20}}>
          <div>
            <h1 className="fade-in" style={{fontFamily:'Sora,sans-serif',fontSize:28,fontWeight:800,marginBottom:4,color:'var(--text)'}}>{listing.title}</h1>
            <p style={{color:'var(--text2)',marginBottom:16,display:'flex',alignItems:'center',gap:4}}><MapPin size={14}/> {listing.address}</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
              {[[<DollarSign size={13}/>,'Narx',fmtPrice(listing.price)],[<Maximize2 size={13}/>,'Maydon',`${listing.size} m²`],[<Bed size={13}/>,'Xona',listing.rooms],[<Building2 size={13}/>,'Qavat',`${listing.floor}/${listing.totalFloors}`]].map(([icon,k,v],i)=>(
                <div key={k} className={`fade-in stagger-${i+1}`} style={{background:'var(--bg3)',borderRadius:10,padding:'12px 14px'}}>
                  <div style={{fontSize:12,color:'var(--text3)',display:'flex',alignItems:'center',gap:4}}>{icon} {k}</div>
                  <div style={{fontWeight:700,fontSize:18,marginTop:2,color:'var(--text)'}}>{v}</div>
                </div>
              ))}
            </div>

            {/* Price analysis */}
            <div className="card" style={{padding:20,marginBottom:24}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
                <div style={{width:32,height:32,background:'var(--primary)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><BarChart2 size={16}/></div>
                <div>
                  <div style={{fontWeight:700,color:'var(--text)'}}>{t.listing_detail.analysis}</div>
                  <div style={{fontSize:12,color:'var(--text2)'}}>{t.listing_detail.analysis_sub}</div>
                </div>
                <div style={{marginLeft:'auto',textAlign:'right'}}>
                  <div style={{fontSize:12,color:'var(--text3)'}}>{t.listing_detail.estimated}</div>
                  <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:20,color:'var(--primary)'}}>{fmtPrice(listing.estimatedValue)}</div>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
                <div style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px'}}><div style={{fontSize:12,color:'var(--text3)'}}>{t.listing_detail.current_price}</div><div style={{fontWeight:700,color:'var(--text)'}}>${(listing.price/listing.size).toFixed(0)}/m²</div></div>
                <div style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px'}}><div style={{fontSize:12,color:'var(--text3)'}}>{t.listing_detail.area_avg}</div><div style={{fontWeight:700,color:'var(--text)'}}>${Math.round(listing.pricePerM2*1.08)}/m²</div></div>
              </div>
              <p style={{fontSize:13,color:'var(--text2)',fontStyle:'italic',borderTop:'1px solid var(--border)',paddingTop:10}}>
                {listing.status==='underpriced'?"Bu mulk bozor o'rtachasidan past narxda — yaxshi investitsiya imkoniyati!":listing.status==='overpriced'?"Bu mulk bozor narxidan yuqori baholangan.":"Bu mulk bozor narxiga mos keladi."}
              </p>
            </div>

            <h2 style={{fontWeight:700,marginBottom:10,color:'var(--text)'}}>{t.listing_detail.description}</h2>
            <p style={{color:'var(--text2)',lineHeight:1.7,marginBottom:24}}>{listing.description}</p>
            <h2 style={{fontWeight:700,marginBottom:10,color:'var(--text)'}}>{t.listing_detail.amenities}</h2>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {listing.amenities.map(a=><span key={a} style={{padding:'6px 12px',background:'var(--bg3)',borderRadius:20,fontSize:13,display:'flex',alignItems:'center',gap:4,color:'var(--text)'}}><CheckCircle size={12}/> {a}</span>)}
            </div>
          </div>

          <div>
            <div className="card" style={{padding:20,position:'sticky',top:80}}>
              <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:24,marginBottom:4,color:'var(--text)'}}>{fmtPrice(listing.price)}</div>
              <div style={{fontSize:13,color:'var(--text2)',marginBottom:16}}>${listing.pricePerM2}/m²</div>
              <button className="btn btn-primary" style={{width:'100%',marginBottom:8,justifyContent:'center'}} onClick={()=>setShowTour(true)}><Calendar size={15}/> Tur Buyurtma</button>
              <button className="btn btn-teal" style={{width:'100%',marginBottom:16,justifyContent:'center'}}><Phone size={15}/> {t.listing_detail.contact_seller}</button>
              <button className="btn btn-outline" style={{width:'100%',justifyContent:'center'}} onClick={()=>toggleFavorite(listing.id)}>
                {isFav?<><Heart size={15} fill="red" color="red"/> Saqlangan</>:<><Heart size={15}/> Saqlash</>}
              </button>
              <hr style={{margin:'16px 0',border:'none',borderTop:'1px solid var(--border)'}}/>
              <div className="agent-card">
                <div className="agent-avatar">{listing.agent.name.slice(0,2).toUpperCase()}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:14,color:'var(--text)'}}>{listing.agent.name}</div>
                  <div style={{fontSize:12,color:'var(--text2)'}}>{listing.agent.title}</div>
                  <div className="stars">{'★'.repeat(Math.floor(listing.agent.rating))} <span style={{color:'var(--text3)',fontSize:11}}>{listing.agent.rating}</span></div>
                </div>
              </div>
              <div className="stats-row" style={{marginTop:12,justifyContent:'center'}}>
                <span className="stat-item"><Eye size={12}/> {listing.views}</span>
                <span className="stat-item"><Heart size={12}/> {listing.favorites}</span>
                <span className="stat-item"><MessageCircle size={12}/> {listing.inquiries}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// COMPARE PAGE
// ═══════════════════════════════════════════════════════════════
function ComparePage({ setPage, setSelectedListing }) {
  const { t, lang } = useApp();
  const items = mockListings.filter(l=>[1,2,4].includes(l.id));
  const best = items[0];
  const [tourListing, setTourListing] = useState(null);
  const [detailListing, setDetailListing] = useState(null);
  const [showMarket, setShowMarket] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const aiTexts = {
    uz:["Mirabad kvartirasi bozordan 8.4% arzon. Investitsiya uchun eng yaxshi imkoniyat.","City Tower bozordan 7.2% qimmat. Prestij uchun ideal, lekin daromad uchun emas.","Mirzo Ulugbek studiyasi bozordan 8% arzon. Yangi bino, metro yaqin."],
    en:["Mirabad apartment 8.4% below market. Best investment opportunity.","City Tower 7.2% above market. Ideal for prestige, not yield.","Mirzo Ulugbek studio 8% below market. New building, near metro."],
    ru:["Квартира в Мирабаде на 8.4% ниже рынка. Лучшая инвестиция.","City Tower на 7.2% выше рынка. Для престижа, не для дохода.","Студия в Мирзо Улугбеке на 8% ниже рынка. Новостройка у метро."],
  };
  const aT = aiTexts[lang]||aiTexts.uz;

  return (
    <div className="page">
      {tourListing&&<TourModal listing={tourListing} onClose={()=>setTourListing(null)}/>}
      {detailListing&&<ListingDetailModal listing={detailListing} onClose={()=>setDetailListing(null)} onTour={l=>{setTourListing(l);}}/>}
      {showMarket&&<MarketPulseModal onClose={()=>setShowMarket(false)}/>}
      {showPdf&&<PdfModal items={items} onClose={()=>setShowPdf(false)}/>}

      <div className="container" style={{padding:'32px 24px'}}>
        <h1 className="section-title fade-in" style={{marginBottom:6}}>{t.compare.title}</h1>
        <p className="section-sub fade-in" style={{marginBottom:28}}>{t.compare.sub}</p>

        <div className="card fade-in" style={{overflow:'visible',marginBottom:24}}>
          <table className="compare-table">
            <thead>
              <tr>
                <th style={{width:160}}>{t.compare.features}</th>
                {items.map(item=>(
                  <th key={item.id} style={{textAlign:'center',position:'relative'}}>
                    {item.id===best.id&&<div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'var(--primary)',color:'#fff',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:10,whiteSpace:'nowrap'}}>BEST VALUE</div>}
                    <div style={{height:120,borderRadius:10,overflow:'hidden',margin:'8px 0',cursor:'pointer'}} onClick={()=>setDetailListing(item)}>
                      <img src={item.images[0]} alt={item.title} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.3s'}} onMouseEnter={e=>e.target.style.transform='scale(1.05)'} onMouseLeave={e=>e.target.style.transform='scale(1)'}/>
                    </div>
                    <div style={{fontWeight:700,fontSize:13,color:'var(--text)'}}>{item.title}</div>
                    <div style={{fontSize:11,color:'var(--text3)'}}>{item.district}</div>
                    <span className={getBadgeClass(item.status)} style={{marginTop:4,fontSize:10}}>{item.badge}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr><td style={{fontWeight:600,color:'var(--text2)',fontSize:13}}>{t.compare.total_price}</td>{items.map(i=><td key={i.id} style={{textAlign:'center',fontWeight:700,fontFamily:'Sora,sans-serif',color:'var(--text)'}}>{fmtPrice(i.price)}</td>)}</tr>
              <tr><td style={{fontWeight:600,color:'var(--text2)',fontSize:13}}>{t.compare.price_m2}</td>{items.map(i=><td key={i.id} style={{textAlign:'center',fontWeight:600,color:i.id===best.id?'var(--tertiary)':'var(--text)'}}>${i.pricePerM2}/m²</td>)}</tr>
              <tr><td style={{fontWeight:600,color:'var(--text2)',fontSize:13}}>{t.compare.specs}</td>{items.map(i=><td key={i.id} style={{textAlign:'center',fontSize:13,color:'var(--text)'}}>{i.rooms} xona • {i.size} m²<br/><span style={{color:'var(--text3)'}}>{i.floor}/{i.totalFloors} qavat</span></td>)}</tr>
              <tr><td style={{fontWeight:600,color:'var(--text2)',fontSize:13}}>Taxminiy qiymat</td>{items.map(i=><td key={i.id} style={{textAlign:'center',fontFamily:'Sora,sans-serif',fontWeight:700,color:'var(--primary)'}}>{fmtPrice(i.estimatedValue)}</td>)}</tr>
              <tr><td style={{fontWeight:600,color:'var(--text2)',fontSize:13}}>{t.compare.ai_explanation}</td>{items.map((item,i)=><td key={item.id} style={{fontSize:12,color:'var(--text2)',background:item.id===best.id?'rgba(16,185,129,0.06)':undefined,lineHeight:1.5}}>{aT[i]}</td>)}</tr>
              <tr>
                <td/>
                {items.map(item=>(
                  <td key={item.id} style={{textAlign:'center',paddingTop:14,paddingBottom:14}}>
                    <div style={{display:'flex',flexDirection:'column',gap:6}}>
                      <button className="btn btn-primary btn-sm" style={{width:'100%',justifyContent:'center'}} onClick={()=>setTourListing(item)}><Calendar size={13}/> {t.compare.book_tour}</button>
                      <button className="btn btn-outline btn-sm" style={{width:'100%',justifyContent:'center'}} onClick={()=>setDetailListing(item)}><Eye size={13}/> {t.compare.view_details}</button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          <div className="card fade-in card-hover" style={{padding:20,cursor:'pointer'}} onClick={()=>setShowMarket(true)}>
            <h3 style={{fontWeight:700,marginBottom:8,display:'flex',alignItems:'center',gap:6,color:'var(--text)'}}><BarChart3 size={16} color="var(--primary)"/> {t.compare.market_pulse}</h3>
            <p style={{fontSize:13,color:'var(--text2)',marginBottom:12}}>Yunusabaddagi mulk narxlari oxirgi chorakda 4.2% oshdi. <span style={{color:'var(--primary)',fontWeight:600}}>Batafsil →</span></p>
            <div style={{display:'flex',gap:4,alignItems:'flex-end',height:64}}>
              {[40,45,42,48,44,50,52,65].map((h,i)=><div key={i} style={{flex:1,height:`${h}px`,background:i===7?'var(--primary)':'var(--border)',borderRadius:4}}/>)}
            </div>
          </div>
          <div className="card fade-in card-hover" style={{padding:20}}>
            <div style={{fontSize:11,fontWeight:700,color:'var(--tertiary)',marginBottom:4,textTransform:'uppercase'}}>Pro xususiyat</div>
            <h3 style={{fontWeight:700,marginBottom:8,color:'var(--text)'}}>{t.compare.export}</h3>
            <p style={{fontSize:13,color:'var(--text2)',marginBottom:14}}>{t.compare.export_sub}</p>
            <div style={{background:'var(--bg3)',borderRadius:8,padding:10,marginBottom:14}}>
              {['Narx taqqoslash','Bozor tahlili',"Qulayliklar ro'yxati"].map((item,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'var(--text2)',marginBottom:4}}>
                  <CheckCircle size={11} color="#10B981"/>{item}
                </div>
              ))}
            </div>
            <button className="btn btn-teal" style={{width:'100%',justifyContent:'center'}} onClick={()=>setShowPdf(true)}><Download size={15}/> {t.compare.download_pdf}</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAVORITES PAGE
// ═══════════════════════════════════════════════════════════════
function FavoritesPage({ setPage, setSelectedListing }) {
  const { t, favorites, toggleFavorite } = useApp();
  const favListings = mockListings.filter(l=>favorites.includes(l.id));
  const [alertsOn, setAlertsOn] = useState(true);
  return (
    <div className="page">
      <div className="container" style={{padding:'32px 24px'}}>
        <div className="fade-in" style={{marginBottom:24}}>
          <h1 className="section-title">{t.favorites.title}</h1>
          <p className="section-sub">{t.favorites.sub}</p>
        </div>
        {favListings.length===0
          ?<div style={{textAlign:'center',padding:60,color:'var(--text3)'}}>
            <Heart size={48} className="float-anim" style={{margin:'0 auto 12px',display:'block',opacity:0.3}}/>
            <p>{t.favorites.empty}</p>
            <button className="btn btn-primary" style={{marginTop:16}} onClick={()=>setPage('listings')}>E'lonlarga o'tish</button>
           </div>
          :<div className="grid-3" style={{marginBottom:28}}>
            {favListings.map((l,i)=>(
              <div key={l.id} className="card listing-card fade-in" style={{position:'relative',animationDelay:`${i*0.08}s`}}>
                <button onClick={()=>toggleFavorite(l.id)} style={{position:'absolute',top:10,left:10,zIndex:2,width:28,height:28,background:'rgba(255,255,255,0.9)',border:'none',borderRadius:50,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'background 0.2s'}} onMouseEnter={e=>e.currentTarget.style.background='#FEE2E2'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.9)'}><Trash2 size={13}/></button>
                <div style={{overflow:'hidden',height:160}}><img src={l.images[0]} alt={l.title} className="listing-img" style={{height:160}} onClick={()=>{setSelectedListing(l.id);setPage('listing');}}/></div>
                <div className="listing-body" onClick={()=>{setSelectedListing(l.id);setPage('listing');}}>
                  <div className="listing-price">{fmtPrice(l.price)}</div>
                  <div className="listing-title">{l.title}</div>
                  <div className="listing-loc"><MapPin size={11}/> {l.district}, {l.city}</div>
                </div>
              </div>
            ))}
           </div>
        }
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:20}}>
          <div style={{background:'linear-gradient(135deg,var(--primary),var(--secondary))',borderRadius:12,padding:20,color:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}><TrendingUp size={20}/><span style={{fontWeight:700,fontSize:15}}>{t.favorites.market_intelligence}</span></div>
              <p style={{fontSize:13,opacity:0.9}}>Sevimlilaringizga asoslanib, Mirabad mulklari kelgusi chorakda 4.2% oshishi kutilmoqda.</p>
            </div>
            <button className="btn" style={{background:'rgba(255,255,255,0.2)',color:'#fff',flexShrink:0,border:'1px solid rgba(255,255,255,0.3)'}}>{t.favorites.view_trends}</button>
          </div>
          <div className="card" style={{padding:20}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}><Bell size={20} color="var(--text)"/><span style={{fontWeight:700,color:'var(--text)'}}>{t.favorites.price_alerts}</span></div>
            <p style={{fontSize:13,color:'var(--text2)',marginBottom:12}}>{t.favorites.alerts_sub}</p>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontSize:13,color:'var(--text)'}}>{t.favorites.alerts_active}</span>
              <label className="toggle"><input type="checkbox" checked={alertsOn} onChange={()=>setAlertsOn(!alertsOn)}/><span className="toggle-slider"/></label>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════════════════════════════
function ProfilePage({ setPage }) {
  const { t, user, logout, updateCurrentUser } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToast] = useState('');
  const [confirmModal, setConfirmModal] = useState(null);
  const isAdmin = user?.role==='admin';
  const showToast = msg=>setToast(msg);

  if (!user) return (
    <div className="page" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:80}}>
      <div style={{textAlign:'center'}}>
        <Lock size={48} className="float-anim" style={{margin:'0 auto 12px',display:'block',opacity:0.3,color:'var(--text)'}}/>
        <p style={{color:'var(--text2)',marginBottom:16}}>Profilingizni ko'rish uchun tizimga kiring</p>
      </div>
    </div>
  );

  const tabs = isAdmin
    ?[{id:'overview',icon:<BarChart2 size={15}/>,label:"Dashboard"},{id:'listings',icon:<Home size={15}/>,label:"Barcha e'lonlar"},{id:'users',icon:<User size={15}/>,label:"Foydalanuvchilar"},{id:'settings',icon:<Settings size={15}/>,label:t.profile.account_settings},{id:'security',icon:<Shield size={15}/>,label:t.profile.security}]
    :[{id:'overview',icon:<BarChart2 size={15}/>,label:t.profile.overview},{id:'listings',icon:<Home size={15}/>,label:t.profile.my_listings},{id:'settings',icon:<Settings size={15}/>,label:t.profile.account_settings},{id:'security',icon:<Shield size={15}/>,label:t.profile.security}];

  return (
    <div className="page">
      {toast&&<SuccessToast message={toast} onClose={()=>setToast('')}/>}
      {confirmModal&&<ConfirmModal {...confirmModal} onClose={()=>setConfirmModal(null)}/>}
      <div className="container" style={{padding:'32px 24px'}}>
        <div className="card fade-in" style={{padding:24,marginBottom:24,display:'flex',alignItems:'center',gap:20}}>
          <div style={{width:72,height:72,borderRadius:'50%',background:isAdmin?'linear-gradient(135deg,#F59E0B,#D97706)':'var(--primary)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:28,fontWeight:800,flexShrink:0}}>
            {user.avatar?<img src={user.avatar} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} alt="av"/>:user.name.slice(0,2).toUpperCase()}
          </div>
          <div style={{flex:1}}>
            <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
              <h2 style={{fontFamily:'Sora,sans-serif',fontSize:22,fontWeight:800,color:'var(--text)'}}>{user.name}</h2>
              {isAdmin&&<span className="admin-badge">👑 Admin</span>}
            </div>
            <p style={{color:'var(--text2)',fontSize:13}}>{user.email}</p>
            <p style={{color:'var(--text3)',fontSize:12,marginTop:2}}>{t.profile.member_since}: {user.joinDate}</p>
          </div>
          <div style={{display:'flex',gap:8}}>
            {!isAdmin&&<button className="btn btn-primary btn-sm"><TrendingUp size={13}/> {t.profile.upgrade}</button>}
            <button className="btn btn-outline btn-sm" onClick={()=>{logout();setPage('home');}}><LogOut size={14}/> {t.profile.logout}</button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:24}}>
          <div>
            <div className="card fade-in" style={{padding:12,marginBottom:12}}>
              <div style={{fontSize:11,fontWeight:700,color:'var(--text3)',padding:'8px 14px',textTransform:'uppercase'}}>{isAdmin?'Admin Panel':'Mening hisobim'}</div>
              {tabs.map(({id,icon,label})=><div key={id} className={`sidebar-link ${activeTab===id?'active':''}`} onClick={()=>setActiveTab(id)}>{icon} {label}</div>)}
            </div>
            <div className="ai-box fade-in" style={{padding:16}}>
              <div style={{fontSize:11,fontWeight:700,opacity:0.7,marginBottom:4}}>{t.profile.credits}</div>
              <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:28}}>{user.credits}<span style={{fontSize:14,opacity:0.7}}>/350</span></div>
              <div className="progress-bar" style={{marginTop:8}}><div className="progress-fill" style={{width:`${Math.min(100,(user.credits/350)*100)}%`}}/></div>
            </div>
          </div>

          <div>
            {activeTab==='overview'&&(
              <div className="fade-in">
                <h2 style={{fontWeight:700,marginBottom:16,color:'var(--text)'}}>{isAdmin?'Dashboard':t.profile.overview}</h2>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20}}>
                  {(isAdmin
                    ?[[registeredUsers.length,"Foydalanuvchilar",<User size={20}/>,'var(--primary)'],[mockListings.length,"Jami e'lonlar",<Home size={20}/>,'#10B981'],[mockListings.filter(l=>l.status==='underpriced').length,'Arzon mulklar',<TrendingUp size={20}/>,'#F59E0B']]
                    :[[2,"Faol e'lonlar",<Home size={20}/>,'var(--primary)'],[28,"Ko'rishlar",<Eye size={20}/>,'#10B981'],[user.credits,t.profile.credits,<DollarSign size={20}/>,'#F59E0B']]
                  ).map(([num,label,icon,color],i)=>(
                    <div key={label} className={`stat-card fade-in stagger-${i+1}`} style={{borderTop:`3px solid ${color}`}}>
                      <div style={{color,marginBottom:8,animation:`float ${3+i}s ease-in-out infinite`}}>{icon}</div>
                      <div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:24,color:'var(--text)'}}>{num}</div>
                      <div style={{fontSize:12,color:'var(--text2)'}}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:'var(--bg3)',borderRadius:12,padding:20,border:'1px solid var(--border)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}><TrendingUp size={18} color="var(--primary)"/><span style={{fontWeight:700,fontSize:15,color:'var(--text)'}}>Tavsiya</span></div>
                  {isAdmin?<p style={{fontSize:13,color:'var(--text2)'}}>Mirabad tumani so'nggi oyda +8.4% o'sish ko'rsatdi.</p>:<p style={{fontSize:13,color:'var(--text2)'}}>Sevimlilaringiz asosida Mirabad mulki keyingi chorakda 4.2% o'sishi kutilmoqda.</p>}
                </div>
              </div>
            )}

            {activeTab==='listings'&&(
              <div className="fade-in">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                  <div><h2 style={{fontWeight:700,color:'var(--text)'}}>{isAdmin?"Barcha e'lonlar":t.profile.my_listings}</h2><p style={{fontSize:13,color:'var(--text2)'}}>{t.profile.manage}</p></div>
                  {isAdmin&&<button className="btn btn-primary btn-sm" onClick={()=>setPage('add_listing')}><Plus size={14}/> {t.profile.new_listing}</button>}
                </div>
                <div className="grid-2">
                  {(isAdmin?mockListings.slice(0,6):mockListings.slice(0,2)).map((l,i)=>(
                    <div key={l.id} className={`card fade-in stagger-${Math.min(i+1,6)}`} style={{overflow:'hidden'}}>
                      <div style={{position:'relative',overflow:'hidden',height:140}}>
                        <img src={l.images[0]} alt={l.title} style={{width:'100%',height:140,objectFit:'cover',transition:'transform 0.3s'}} onMouseEnter={e=>e.target.style.transform='scale(1.05)'} onMouseLeave={e=>e.target.style.transform='scale(1)'}/>
                        <span className={getBadgeClass(l.status)} style={{position:'absolute',top:8,left:8}}>{l.badge}</span>
                      </div>
                      <div style={{padding:14}}>
                        <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                          <span style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:16,color:'var(--text)'}}>{fmtPrice(l.price)}</span>
                          <span className="badge badge-under" style={{fontSize:9}}>Faol</span>
                        </div>
                        <p style={{fontSize:12,color:'var(--text2)',marginBottom:8}}>{l.district} • {l.rooms} xona • {l.size}m²</p>
                        <div className="stats-row" style={{marginBottom:10}}>
                          <span className="stat-item"><Eye size={11}/> {l.views}</span>
                          <span className="stat-item"><Heart size={11}/> {l.favorites}</span>
                          <span className="stat-item"><MessageCircle size={11}/> {l.inquiries}</span>
                        </div>
                        <div style={{display:'flex',gap:6}}>
                          <button className="btn btn-secondary btn-sm" style={{flex:1,justifyContent:'center'}}>Tahrirlash</button>
                          <button className="btn btn-outline btn-sm" style={{color:'#DC2626',borderColor:'#DC2626'}} onClick={()=>setConfirmModal({title:"E'lon o'chirilsinmi?",message:"Bu amalni qaytarib bo'lmaydi.",confirmText:"O'chirish",danger:true,onConfirm:()=>showToast("E'lon o'chirildi!")})}><Trash2 size={12}/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {isAdmin&&(
                  <div style={{border:'2px dashed var(--border)',borderRadius:12,padding:24,textAlign:'center',marginTop:16,cursor:'pointer',color:'var(--text3)',transition:'all 0.2s'}} onClick={()=>setPage('add_listing')} onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--primary)';e.currentTarget.style.color='var(--primary)';}} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text3)';}}>
                    <Plus size={24} style={{margin:'0 auto 8px',display:'block'}}/><div style={{fontWeight:600}}>Yangi E'lon Qo'shish</div>
                  </div>
                )}
              </div>
            )}

            {activeTab==='users'&&isAdmin&&(
              <div className="fade-in">
                <h2 style={{fontWeight:700,marginBottom:16,color:'var(--text)'}}>Foydalanuvchilar</h2>
                {registeredUsers.map((u,i)=>(
                  <div key={u.id} className={`settings-row fade-in stagger-${Math.min(i+1,6)}`} style={{marginBottom:8}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:38,height:38,borderRadius:'50%',background:u.role==='admin'?'#F59E0B':'var(--primary)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:13}}>{u.name.slice(0,2).toUpperCase()}</div>
                      <div><div style={{fontWeight:600,fontSize:14,color:'var(--text)'}}>{u.name}</div><div style={{fontSize:12,color:'var(--text2)'}}>{u.email}</div></div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      {u.role==='admin'&&<span className="admin-badge">Admin</span>}
                      <span style={{fontSize:12,color:'var(--text3)'}}>{u.joinDate}</span>
                      {u.role!=='admin'&&<button className="btn btn-outline btn-sm" style={{fontSize:11,color:'#DC2626',borderColor:'#DC2626'}}>Bloklash</button>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab==='settings'&&<SettingsTab user={user} updateCurrentUser={updateCurrentUser} showToast={showToast}/>}
            {activeTab==='security'&&<SecurityTab user={user} logout={logout} setPage={setPage} showToast={showToast} setConfirmModal={setConfirmModal}/>}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

function SettingsTab({ user, updateCurrentUser, showToast }) {
  const [phone, setPhone] = useState(user.phone||'');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const fileRef = useRef(null);
  const handleSave = ()=>{
    if(newPass&&newPass.length<6){setPassError("Parol kamida 6 belgi");return;}
    if(newPass&&newPass!==confirmPass){setPassError("Parollar mos emas");return;}
    setPassError('');
    const updates={phone};if(newPass) updates.password=newPass;
    updateCurrentUser(updates);setNewPass('');setConfirmPass('');showToast("Sozlamalar saqlandi!");
  };
  const handlePhoto=e=>{
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();r.onload=ev=>{updateCurrentUser({avatar:ev.target.result});showToast("Rasm yangilandi!");};r.readAsDataURL(f);
  };
  return (
    <div className="fade-in">
      <h2 style={{fontWeight:700,marginBottom:20,color:'var(--text)'}}>Hisob Sozlamalari</h2>
      <div className="settings-section">
        <h3 style={{fontWeight:700,marginBottom:12,fontSize:15,color:'var(--text)'}}>Profil rasmi</h3>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <div style={{width:64,height:64,borderRadius:'50%',overflow:'hidden',background:'var(--primary)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:24,fontWeight:800}}>
            {user.avatar?<img src={user.avatar} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="av"/>:user.name.slice(0,2).toUpperCase()}
          </div>
          <div>
            <button className="btn btn-secondary btn-sm" onClick={()=>fileRef.current.click()}><Upload size={13}/> Rasmni o'zgartirish</button>
            <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={handlePhoto}/>
            <p style={{fontSize:11,color:'var(--text3)',marginTop:4}}>JPG, PNG • Maks 5MB</p>
          </div>
        </div>
      </div>
      <div className="settings-section">
        <h3 style={{fontWeight:700,marginBottom:12,fontSize:15,color:'var(--text)'}}>Asosiy ma'lumotlar</h3>
        <div style={{marginBottom:12}}><label className="label">To'liq ism</label><input className="input" value={user.name} disabled/><p style={{fontSize:11,color:'var(--text3)',marginTop:4}}>Ismni o'zgartirish mumkin emas</p></div>
        <div><label className="label">Email</label><input className="input" value={user.email} disabled/></div>
      </div>
      <div className="settings-section">
        <h3 style={{fontWeight:700,marginBottom:12,fontSize:15,color:'var(--text)'}}>Telefon raqami</h3>
        <input className="input" placeholder="+998 90 123 45 67" value={phone} onChange={e=>setPhone(e.target.value)}/>
      </div>
      <div className="settings-section">
        <h3 style={{fontWeight:700,marginBottom:12,fontSize:15,color:'var(--text)'}}>Parolni o'zgartirish</h3>
        {passError&&<div className="alert alert-danger"><AlertCircle size={14}/>{passError}</div>}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div><label className="label">Yangi parol</label><input className="input" type="password" placeholder="••••••••" value={newPass} onChange={e=>{setNewPass(e.target.value);setPassError('');}}/></div>
          <div><label className="label">Tasdiqlash</label><input className="input" type="password" placeholder="••••••••" value={confirmPass} onChange={e=>{setConfirmPass(e.target.value);setPassError('');}}/></div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleSave}><Save size={15}/> Saqlash</button>
    </div>
  );
}

function SecurityTab({ user, logout, setPage, showToast, setConfirmModal }) {
  const [twoFA, setTwoFA] = useState(false);
  const [loginNotif, setLoginNotif] = useState(true);
  const [sessions, setSessions] = useState([
    {id:1,device:'Chrome — Windows',location:'Tashkent, UZ',time:'Hozir faol',current:true,icon:<Monitor size={16}/>},
    {id:2,device:'iPhone Safari',location:'Tashkent, UZ',time:'2 kun oldin',current:false,icon:<Smartphone size={16}/>},
  ]);
  return (
    <div className="fade-in">
      <h2 style={{fontWeight:700,marginBottom:20,color:'var(--text)'}}>Xavfsizlik</h2>
      <div className="settings-section">
        <h3 style={{fontWeight:700,marginBottom:12,fontSize:15,color:'var(--text)'}}>Autentifikatsiya</h3>
        <div className="settings-row"><div><div style={{fontWeight:600,color:'var(--text)'}}>2-Faktorli autentifikatsiya</div><div style={{fontSize:12,color:'var(--text2)'}}>SMS orqali qo'shimcha himoya</div></div><label className="toggle"><input type="checkbox" checked={twoFA} onChange={()=>{setTwoFA(!twoFA);showToast(twoFA?'2FA o\'chirildi':'2FA yoqildi!');}}/><span className="toggle-slider"/></label></div>
        <div className="settings-row"><div><div style={{fontWeight:600,color:'var(--text)'}}>Kirish bildirishnomalari</div><div style={{fontSize:12,color:'var(--text2)'}}>Yangi qurilmadan kirishda xabar</div></div><label className="toggle"><input type="checkbox" checked={loginNotif} onChange={()=>{setLoginNotif(!loginNotif);showToast('Sozlama saqlandi!');}}/><span className="toggle-slider"/></label></div>
      </div>
      <div className="settings-section">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <h3 style={{fontWeight:700,fontSize:15,color:'var(--text)'}}>Faol seanslar</h3>
          <button className="btn btn-outline btn-sm" style={{color:'#DC2626',borderColor:'#DC2626'}} onClick={()=>setConfirmModal({title:'Barcha seanslar tugatilsinmi?',message:'Joriy qurilmadan tashqari barchasi chiqariladi.',confirmText:'Tugatish',danger:true,onConfirm:()=>setSessions(s=>s.filter(x=>x.current))})}>Barchasini tugatish</button>
        </div>
        {sessions.map(s=>(
          <div key={s.id} className={`device-card ${s.current?'current':''}`}>
            <div style={{color:s.current?'var(--primary)':'var(--text3)'}}>{s.icon}</div>
            <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:'var(--text)'}}>{s.device}</div><div style={{fontSize:12,color:'var(--text2)'}}>{s.location} • {s.time}</div></div>
            {s.current?<span className="badge badge-under" style={{fontSize:10}}>Joriy</span>:<button className="btn btn-outline btn-sm" style={{color:'#DC2626',borderColor:'#DC2626'}} onClick={()=>setSessions(ss=>ss.filter(x=>x.id!==s.id))}>Tugatish</button>}
          </div>
        ))}
      </div>
      <div style={{border:'1px solid #DC2626',borderRadius:12,padding:20}}>
        <div style={{color:'#DC2626',fontWeight:700,marginBottom:8,display:'flex',alignItems:'center',gap:6}}><AlertTriangle size={16}/> Xavfli zona</div>
        <p style={{fontSize:13,color:'var(--text2)',marginBottom:16}}>Hisobingizni o'chirish barcha ma'lumotlarni butunlay yo'q qiladi.</p>
        <button className="btn btn-danger btn-sm" onClick={()=>setConfirmModal({title:"Hisob o'chirilsinmi?",message:"Bu amalni bekor qilib bo'lmaydi.",confirmText:"O'chirish",danger:true,onConfirm:()=>{logout();setPage('home');}})}>
          <Trash size={13}/> Hisobni o'chirish
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ADD LISTING — ADMIN ONLY
// ═══════════════════════════════════════════════════════════════
function AddListingPage({ setPage }) {
  const { t, user, addListing } = useApp();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [basic, setBasic] = useState({title:'',district:'Mirabad',address:'',propertyType:'Kvartira',city:'Tashkent'});
  const [specs, setSpecs] = useState({totalArea:'',livingArea:'',rooms:2,amenities:[],floorLevel:'4',totalFloors:''});
  const [photos, setPhotos] = useState([]);
  const [priceData, setPriceData] = useState({price:'',listingType:'sale',deposit:'',negotiable:false});
  const fileRef = useRef(null);
  const amenityList = ['Air Conditioning','Central Heating','High-speed WiFi','Smart Home','Balcony','Parking Space','Security','Pool','Garden','Intercom','Gym','Storage'];

  const qualityScore = Math.min(100,
    (basic.title.length>5?20:0)+(basic.address.length>5?10:0)+
    (specs.totalArea?15:0)+(specs.amenities.length*4)+(photos.length*8)+(priceData.price?15:0)
  );

  const toggleAmenity = a => setSpecs(s=>({...s,amenities:s.amenities.includes(a)?s.amenities.filter(x=>x!==a):[...s.amenities,a]}));

  const handlePhotos = e => {
    Array.from(e.target.files).forEach(file=>{
      const r=new FileReader();r.onload=ev=>setPhotos(p=>[...p,ev.target.result]);r.readAsDataURL(file);
    });
  };

  const validate = (s) => {
    const errs={};
    if(s===1){if(!basic.title.trim()) errs.title="Sarlavha kiritilmadi";if(!basic.address.trim()) errs.address="Manzil kiritilmadi";}
    if(s===2){if(!specs.totalArea||parseInt(specs.totalArea)<10) errs.totalArea="Maydon 10m²dan katta bo'lishi kerak";}
    if(s===3){if(photos.length===0) errs.photos="Kamida 1 ta rasm zarur";}
    if(s===4){if(!priceData.price||parseInt(priceData.price)<1000) errs.price="To'g'ri narx kiriting (min $1,000)";}
    setErrors(errs);return Object.keys(errs).length===0;
  };

  const goNext = () => { if(validate(step)) setStep(step+1); };

  const handlePublish = () => {
    if(!validate(4)) return;
    const newL={
      id:Date.now(),title:basic.title,district:basic.district,city:basic.city,address:basic.address,
      price:parseInt(priceData.price),pricePerM2:Math.round(parseInt(priceData.price)/(parseInt(specs.totalArea)||80)),
      estimatedValue:Math.round(parseInt(priceData.price)*1.05),
      rooms:typeof specs.rooms==='number'?specs.rooms:parseInt(specs.rooms)||1,
      size:parseInt(specs.totalArea)||80,floor:parseInt(specs.floorLevel)||4,totalFloors:parseInt(specs.totalFloors)||12,
      status:'fair',badge:'Fair Value',
      images:photos.length>0?photos:['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop'],
      amenities:specs.amenities,description:`${basic.title}. ${basic.district} tumanida joylashgan.`,
      views:0,favorites:0,inquiries:0,
      agent:{name:user.name,title:'Admin',rating:5.0,reviews:0}
    };
    addListing(newL);setDone(true);setTimeout(()=>setPage('listings'),2500);
  };

  if (!user||user.role!=='admin') return (
    <div className="page" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:80}}>
      <div style={{textAlign:'center'}}>
        <Lock size={48} className="float-anim" style={{margin:'0 auto 12px',display:'block',opacity:0.3,color:'var(--text)'}}/>
        <p style={{color:'var(--text2)',fontWeight:600,marginBottom:8}}>{t.add_listing.admin_only}</p>
        <p style={{color:'var(--text3)',fontSize:13}}>Admin akkauntidan foydalaning: admin@gmail.com</p>
        <button className="btn btn-primary" style={{marginTop:20}} onClick={()=>setPage('home')}>Bosh sahifaga qaytish</button>
      </div>
    </div>
  );

  if (done) return (
    <div className="page" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:80}}>
      <div style={{textAlign:'center'}}>
        <div style={{width:80,height:80,background:'#DCFCE7',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',animation:'popIn 0.5s ease'}}><CheckCircle size={40} color="#16A34A"/></div>
        <h2 style={{fontFamily:'Sora,sans-serif',color:'var(--text)',marginBottom:8,animation:'fadeIn 0.4s ease 0.3s both'}}>Muvaffaqiyatli!</h2>
        <p style={{color:'var(--text2)',animation:'fadeIn 0.4s ease 0.5s both'}}>{t.add_listing.success_msg}</p>
      </div>
    </div>
  );

  const stepLabels=[t.add_listing.basic_info,t.add_listing.specs,t.add_listing.media,t.add_listing.price];

  return (
    <div className="page">
      <div className="container" style={{padding:'32px 24px',maxWidth:960}}>
        <div className="steps">
          {stepLabels.map((label,i)=>(
            <React.Fragment key={i}>
              <div className="step" onClick={()=>i<step-1&&setStep(i+1)} style={{cursor:i<step-1?'pointer':'default'}}>
                <div className={`step-num ${i+1<step?'done':i+1===step?'active':''}`}>{i+1<step?<CheckCircle size={14}/>:i+1}</div>
                <div className="step-label" style={{color:i+1===step?'var(--primary)':undefined}}>{label}</div>
              </div>
              {i<3&&<div className={`step-line ${i+1<step?'done':''}`}/>}
            </React.Fragment>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:24}}>
          {/* ── STEP 1 ── */}
          {step===1&&(
            <div className="wizard-card fade-in">
              <h2 style={{fontWeight:700,marginBottom:6,color:'var(--text)'}}>{t.add_listing.basic_info}</h2>
              <p style={{fontSize:13,color:'var(--text2)',marginBottom:20}}>E'loningiz haqida asosiy ma'lumotlarni kiriting</p>
              <div style={{marginBottom:14}}>
                <label className="label">{t.add_listing.property_title_label} *</label>
                <input className="input" style={{borderColor:errors.title?'#DC2626':undefined}} placeholder="Masalan: 3 xonali zamonaviy kvartira Mirabadda" value={basic.title} onChange={e=>{setBasic(b=>({...b,title:e.target.value}));setErrors(e=>({...e,title:undefined}));}}/>
                {errors.title&&<p style={{fontSize:12,color:'#DC2626',marginTop:4}}>{errors.title}</p>}
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                <div>
                  <label className="label">{t.add_listing.district_label} *</label>
                  <select className="select" value={basic.district} onChange={e=>setBasic(b=>({...b,district:e.target.value}))}>
                    {['Mirabad','Yunusabad','Chilanzar','Mirzo Ulugbek','Yakkasaray','Sergeli','Almazar','Center-1'].map(d=><option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">{t.add_listing.city_label}</label>
                  <select className="select" value={basic.city} onChange={e=>setBasic(b=>({...b,city:e.target.value}))}>
                    {ALL_REGIONS.map(r=><option key={r.city}>{r.city}</option>)}
                  </select>
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <label className="label">{t.add_listing.address_label} *</label>
                <input className="input" style={{borderColor:errors.address?'#DC2626':undefined}} placeholder="Ko'cha nomi, uy raqami" value={basic.address} onChange={e=>{setBasic(b=>({...b,address:e.target.value}));setErrors(e=>({...e,address:undefined}));}}/>
                {errors.address&&<p style={{fontSize:12,color:'#DC2626',marginTop:4}}>{errors.address}</p>}
              </div>
              <div style={{marginBottom:24}}>
                <label className="label">{t.add_listing.property_type_label}</label>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {['Kvartira','Villa','Studiya','Penthouse'].map(ty=>(
                    <button key={ty} onClick={()=>setBasic(b=>({...b,propertyType:ty}))} style={{padding:'8px 14px',border:`2px solid ${basic.propertyType===ty?'var(--primary)':'var(--border)'}`,borderRadius:8,background:basic.propertyType===ty?'var(--bg3)':'transparent',color:basic.propertyType===ty?'var(--primary)':'var(--text)',fontWeight:600,cursor:'pointer',fontSize:13,transition:'all 0.2s'}}>
                      {ty}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <button className="btn btn-outline" onClick={()=>setPage('profile')}><ChevronLeft size={15}/> {t.add_listing.back}</button>
                <button className="btn btn-primary" onClick={goNext}>{t.add_listing.continue} <ChevronRight size={15}/></button>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step===2&&(
            <div className="wizard-card fade-in">
              <h2 style={{fontWeight:700,marginBottom:6,color:'var(--text)'}}>{t.add_listing.specs}</h2>
              <p style={{fontSize:13,color:'var(--text2)',marginBottom:20}}>{t.add_listing.specs_sub}</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                <div>
                  <label className="label">{t.add_listing.total_area} *</label>
                  <input className="input" type="number" style={{borderColor:errors.totalArea?'#DC2626':undefined}} placeholder="85" value={specs.totalArea} onChange={e=>{setSpecs(s=>({...s,totalArea:e.target.value}));setErrors(e=>({...e,totalArea:undefined}));}}/>
                  {errors.totalArea&&<p style={{fontSize:12,color:'#DC2626',marginTop:4}}>{errors.totalArea}</p>}
                </div>
                <div><label className="label">{t.add_listing.living_area}</label><input className="input" type="number" placeholder="60" value={specs.livingArea} onChange={e=>setSpecs(s=>({...s,livingArea:e.target.value}))}/></div>
              </div>
              <div style={{marginBottom:14}}>
                <label className="label">{t.add_listing.num_rooms}</label>
                <div className="room-btns">
                  {['Studio',1,2,3,4,'5+'].map((r,i)=>(
                    <button key={i} className={`room-btn ${specs.rooms===r?'active':''}`} style={{width:r==='Studio'?68:36,fontSize:r==='Studio'?11:14}} onClick={()=>setSpecs(s=>({...s,rooms:r}))}>{r}</button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <label className="label">{t.add_listing.amenities}</label>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
                  {amenityList.map(a=>(
                    <label key={a} className="check-item" style={{padding:'8px 10px',background:specs.amenities.includes(a)?'rgba(124,58,237,0.08)':'var(--bg3)',borderRadius:8,margin:0,border:`1px solid ${specs.amenities.includes(a)?'var(--primary)':'transparent'}`,transition:'all 0.2s'}}>
                      <input type="checkbox" checked={specs.amenities.includes(a)} onChange={()=>toggleAmenity(a)} style={{accentColor:'var(--primary)'}}/><span style={{fontSize:12}}>{a}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:24}}>
                <div><label className="label">{t.add_listing.floor_level}</label><input className="input" type="number" placeholder="4" value={specs.floorLevel} onChange={e=>setSpecs(s=>({...s,floorLevel:e.target.value}))}/></div>
                <div><label className="label">{t.add_listing.total_floors}</label><input className="input" type="number" placeholder="12" value={specs.totalFloors} onChange={e=>setSpecs(s=>({...s,totalFloors:e.target.value}))}/></div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <button className="btn btn-outline" onClick={()=>setStep(1)}><ChevronLeft size={15}/> {t.add_listing.back}</button>
                <button className="btn btn-primary" onClick={goNext}>{t.add_listing.continue} <ChevronRight size={15}/></button>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step===3&&(
            <div className="wizard-card fade-in">
              <h2 style={{fontWeight:700,marginBottom:6,color:'var(--text)'}}>{t.add_listing.media}</h2>
              <p style={{fontSize:13,color:'var(--text2)',marginBottom:20}}>Mulk rasmlarini yuklang</p>
              <div className="photo-upload-area" onClick={()=>fileRef.current.click()}>
                <Upload size={32} style={{margin:'0 auto 10px',display:'block',color:'var(--primary)',animation:'float 3s ease-in-out infinite'}}/>
                <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{t.add_listing.photos_sub}</div>
                <div style={{fontSize:13,color:'var(--text3)'}}>{t.add_listing.photos_hint}</div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" multiple style={{display:'none'}} onChange={handlePhotos}/>
              {errors.photos&&<p style={{fontSize:12,color:'#DC2626',marginTop:8,textAlign:'center'}}>{errors.photos}</p>}
              {photos.length>0&&(
                <>
                  <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:14}}>
                    {photos.map((p,i)=>(
                      <div key={i} style={{position:'relative',animation:`popIn 0.3s ease ${i*0.05}s both`}}>
                        <img src={p} style={{width:100,height:75,objectFit:'cover',borderRadius:10,display:'block'}} alt={`p${i}`}/>
                        <button onClick={()=>setPhotos(ps=>ps.filter((_,j)=>j!==i))} style={{position:'absolute',top:-6,right:-6,width:22,height:22,background:'#DC2626',border:'none',borderRadius:'50%',cursor:'pointer',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}><X size={11}/></button>
                        {i===0&&<div style={{position:'absolute',bottom:4,left:4,background:'rgba(0,0,0,0.7)',color:'#fff',fontSize:10,padding:'1px 5px',borderRadius:4}}>Asosiy</div>}
                      </div>
                    ))}
                    <div style={{width:100,height:75,border:'2px dashed var(--border)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'var(--text3)',transition:'all 0.2s'}} onClick={()=>fileRef.current.click()} onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--primary)';e.currentTarget.style.color='var(--primary)';}} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text3)';}}>
                      <Plus size={24}/>
                    </div>
                  </div>
                  <div style={{marginTop:10,padding:10,background:'var(--bg3)',borderRadius:8,display:'flex',alignItems:'center',gap:8}}>
                    <CheckCircle size={14} color="#10B981"/>
                    <span style={{fontSize:13,color:'var(--text)'}}>{photos.length} ta rasm yuklandi</span>
                    {photos.length>=3&&<span style={{fontSize:11,color:'#10B981',fontWeight:600,marginLeft:'auto'}}>Ko'rishlar 3x oshadi!</span>}
                  </div>
                </>
              )}
              <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
                <button className="btn btn-outline" onClick={()=>setStep(2)}><ChevronLeft size={15}/> {t.add_listing.back}</button>
                <button className="btn btn-primary" onClick={goNext}>{t.add_listing.continue} <ChevronRight size={15}/></button>
              </div>
            </div>
          )}

          {/* ── STEP 4 ── */}
          {step===4&&(
            <div className="wizard-card fade-in">
              <h2 style={{fontWeight:700,marginBottom:6,color:'var(--text)'}}>{t.add_listing.price}</h2>
              <p style={{fontSize:13,color:'var(--text2)',marginBottom:20}}>Narx va e'lon turini tanlang</p>
              <div style={{marginBottom:16}}>
                <label className="label">E'lon turi</label>
                <div style={{display:'flex',gap:8}}>
                  {[['sale',t.add_listing.for_sale||'Sotish'],['rent',t.add_listing.for_rent||'Ijaraga']].map(([val,label])=>(
                    <button key={val} onClick={()=>setPriceData(p=>({...p,listingType:val}))} style={{flex:1,padding:'10px',border:`2px solid ${priceData.listingType===val?'var(--primary)':'var(--border)'}`,borderRadius:8,background:priceData.listingType===val?'var(--bg3)':'transparent',color:priceData.listingType===val?'var(--primary)':'var(--text)',fontWeight:600,cursor:'pointer',fontSize:14,transition:'all 0.2s'}}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <label className="label">{priceData.listingType==='sale'?'Narx ($) *':'Oylik ijara ($) *'}</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text3)',fontWeight:700,fontSize:16}}>$</span>
                  <input className="input" type="number" style={{paddingLeft:28,borderColor:errors.price?'#DC2626':undefined}} placeholder="85000" value={priceData.price} onChange={e=>{setPriceData(p=>({...p,price:e.target.value}));setErrors(e=>({...e,price:undefined}));}}/>
                </div>
                {errors.price&&<p style={{fontSize:12,color:'#DC2626',marginTop:4}}>{errors.price}</p>}
                {priceData.price&&specs.totalArea&&<p style={{fontSize:12,color:'var(--tertiary)',marginTop:6,fontWeight:600,display:'flex',alignItems:'center',gap:4}}><TrendingUp size={12}/> ≈ ${Math.round(parseInt(priceData.price)/(parseInt(specs.totalArea)||80))}/m²</p>}
              </div>
              {priceData.listingType==='rent'&&(
                <div style={{marginBottom:14}}>
                  <label className="label">Garov to'lovi ($)</label>
                  <div style={{position:'relative'}}>
                    <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text3)',fontWeight:700}}>$</span>
                    <input className="input" type="number" style={{paddingLeft:28}} placeholder="2400" value={priceData.deposit} onChange={e=>setPriceData(p=>({...p,deposit:e.target.value}))}/>
                  </div>
                </div>
              )}
              <label className="check-item" style={{marginBottom:20,padding:'10px 14px',background:'var(--bg3)',borderRadius:8}}>
                <input type="checkbox" style={{accentColor:'var(--primary)'}} checked={priceData.negotiable} onChange={e=>setPriceData(p=>({...p,negotiable:e.target.checked}))}/>
                <span style={{fontWeight:500}}>{t.add_listing.negotiable}</span>
              </label>
              {priceData.price&&parseInt(priceData.price)>0&&(
                <div style={{background:'var(--bg3)',borderRadius:12,padding:16,marginBottom:20,animation:'fadeIn 0.3s ease'}}>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:10,color:'var(--text)',display:'flex',alignItems:'center',gap:6}}><BarChart2 size={14} color="var(--primary)"/> Narx Tahlili</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
                    {[['Kiritilgan',fmtPrice(parseInt(priceData.price))],['Taxminiy',fmtPrice(Math.round(parseInt(priceData.price)*1.05))],['Narx/m²',specs.totalArea?`$${Math.round(parseInt(priceData.price)/(parseInt(specs.totalArea)||80))}/m²`:'—']].map(([k,v])=>(
                      <div key={k} style={{textAlign:'center'}}>
                        <div style={{fontSize:11,color:'var(--text3)',marginBottom:3}}>{k}</div>
                        <div style={{fontWeight:700,fontFamily:'Sora,sans-serif',fontSize:14,color:'var(--text)'}}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{display:'flex',justifyContent:'space-between',gap:10}}>
                <button className="btn btn-outline" onClick={()=>setStep(3)}><ChevronLeft size={15}/> {t.add_listing.back}</button>
                <button className="btn btn-primary btn-lg" style={{flex:1,justifyContent:'center'}} onClick={handlePublish}>
                  <CheckCircle size={16}/> {t.add_listing.publish_btn}
                </button>
              </div>
            </div>
          )}

          {/* ── SIDEBAR ── */}
          <div>
            <div style={{background:'var(--primary)',borderRadius:12,padding:16,marginBottom:12,color:'#fff'}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,fontWeight:700,fontSize:14}}><Zap size={15}/> {t.add_listing.tips}</div>
              <p style={{fontSize:12,opacity:0.9,lineHeight:1.6,marginBottom:12}}>{t.add_listing.tip_text}</p>
              <div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:6}}>
                  <span>{t.add_listing.live_quality}</span><span style={{fontWeight:700}}>{qualityScore}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width:`${qualityScore}%`}}/>
                </div>
                <div style={{marginTop:6,fontSize:11,opacity:0.85}}>
                  {qualityScore<40?"⚠️ Asosiy ma'lumotlarni to'ldiring":qualityScore<70?'📈 Yaxshi! Davom eting':'🎉 Ajoyib!'}
                </div>
              </div>
            </div>

            <div className="card" style={{padding:14,marginBottom:12}}>
              <div style={{fontSize:12,fontWeight:700,color:'var(--text2)',marginBottom:10,display:'flex',alignItems:'center',gap:6}}><Eye size={12}/> {t.add_listing.live_preview}</div>
              <div style={{height:110,borderRadius:8,overflow:'hidden',marginBottom:8,background:'var(--bg3)',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                {photos[0]?<img src={photos[0]} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="preview"/>:<div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,color:'var(--text3)'}}><Home size={28} className="float-anim"/><span style={{fontSize:11}}>Rasm kutilmoqda...</span></div>}
                {photos.length>1&&<div style={{position:'absolute',bottom:4,right:4,background:'rgba(0,0,0,0.6)',color:'#fff',fontSize:10,padding:'2px 6px',borderRadius:6}}>+{photos.length-1}</div>}
              </div>
              <div style={{fontWeight:700,fontSize:13,color:'var(--text)',marginBottom:2}}>{basic.title||'Mulk nomi...'}</div>
              <div style={{fontSize:12,color:'var(--text3)',marginBottom:5,display:'flex',alignItems:'center',gap:4}}><MapPin size={11}/> {basic.district}, {basic.city}</div>
              {priceData.price&&<div style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:17,color:'var(--primary)',marginBottom:5}}>{fmtPrice(parseInt(priceData.price)||0)}</div>}
              <div style={{display:'flex',gap:10,fontSize:12,color:'var(--text2)'}}>
                {specs.totalArea&&<span style={{display:'flex',alignItems:'center',gap:2}}><Maximize2 size={11}/>{specs.totalArea}m²</span>}
                {specs.rooms&&<span style={{display:'flex',alignItems:'center',gap:2}}><Bed size={11}/>{specs.rooms}</span>}
              </div>
            </div>

            <div className="card" style={{padding:12}}>
              {[[basic.title&&basic.address,t.add_listing.basic_info],[!!specs.totalArea,t.add_listing.specs],[photos.length>0,t.add_listing.media],[!!priceData.price,t.add_listing.price]].map(([ok,label],i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,padding:'5px 8px',borderRadius:6,background:i+1===step?'var(--bg3)':'transparent',transition:'background 0.2s'}}>
                  <div style={{width:20,height:20,borderRadius:'50%',background:ok?'#DCFCE7':i+1===step?'rgba(124,58,237,0.12)':'var(--bg3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    {ok?<Check size={12} color="#16A34A"/>:<span style={{color:i+1===step?'var(--primary)':'var(--text3)',fontSize:10,fontWeight:700}}>{i+1}</span>}
                  </div>
                  <span style={{color:ok?'var(--tertiary)':i+1===step?'var(--primary)':'var(--text2)',fontWeight:ok||i+1===step?600:400,fontSize:13}}>{label}</span>
                  {i+1===step&&<span style={{marginLeft:'auto',fontSize:10,color:'var(--primary)',fontWeight:700}}>←</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="footer" style={{marginTop:48}}>
      <div className="footer-inner">
        <div>
          <div className="footer-logo">qulayUy</div>
          <div style={{fontSize:12,color:'var(--text3)',marginTop:4}}>© 2025 qulayUy. O'zbekiston aqlli ko'chmas mulk platformasi.</div>
        </div>
        <div style={{display:'flex',gap:40}}>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:'var(--text2)',marginBottom:8}}>PLATFORM</div>
            {["Foydalanish shartlari",'Maxfiylik siyosati'].map(l=><div key={l} className="footer-link">{l}</div>)}
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:'var(--text2)',marginBottom:8}}>YORDAM</div>
            {['AI metodologiya',"Qo'llab-quvvatlash"].map(l=><div key={l} className="footer-link">{l}</div>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════
function AppInner() {
  const [page, setPage] = useState('home');
  const [selectedListing, setSelectedListing] = useState(null);

  const renderPage = () => {
    switch(page) {
      case 'home': return <HomePage setPage={setPage} setSelectedListing={setSelectedListing}/>;
      case 'listings': return <ListingsPage setPage={setPage} setSelectedListing={setSelectedListing}/>;
      case 'listing': return <ListingDetailPage listingId={selectedListing} setPage={setPage}/>;
      case 'compare': return <ComparePage setPage={setPage} setSelectedListing={setSelectedListing}/>;
      case 'favorites': return <FavoritesPage setPage={setPage} setSelectedListing={setSelectedListing}/>;
      case 'profile': return <ProfilePage setPage={setPage}/>;
      case 'add_listing': return <AddListingPage setPage={setPage}/>;
      default: return <HomePage setPage={setPage} setSelectedListing={setSelectedListing}/>;
    }
  };

  return (
    <div className="app">
      <GlobalStyles/>
      <Navbar page={page} setPage={setPage}/>
      {renderPage()}
    </div>
  );
}

export default function App() {
  return <AppProvider><AppInner/></AppProvider>;
}
