import type { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'header.menu': 'Menu',
    'header.hours': 'Hours',
    'header.today': 'Today',
    
    // Search
    'search.placeholder': 'Search menu...',
    'search.noResults': 'No items found',
    'search.noResultsDesc': 'Try a different search term',
    
    // Categories
    'category.all': 'All',
    
    // Tags
    'tag.popular': 'Popular',
    'tag.bestseller': 'Bestseller',
    'tag.spicy': 'Spicy',
    'tag.vegetarian': 'Vegetarian',
    'tag.new': 'New',
    
    // Actions
    'action.viewDetails': 'View Details',
    'action.close': 'Close',
    
    // Currency
    'currency.symbol': 'DA',
    'currency.format': '{price} DA',
    
    // Services
    'service.takeaway': 'Takeaway',
    'service.dine-in': 'Dine-in',
    
    // Misc
    'misc.unavailable': 'Unavailable',
    'misc.openNow': 'Open Now',
    'misc.closed': 'Closed',
  },
  fr: {
    // Header
    'header.menu': 'Menu',
    'header.hours': 'Horaires',
    'header.today': "Aujourd'hui",
    
    // Search
    'search.placeholder': 'Rechercher...',
    'search.noResults': 'Aucun résultat',
    'search.noResultsDesc': 'Essayez un autre terme',
    
    // Categories
    'category.all': 'Tout',
    
    // Tags
    'tag.popular': 'Populaire',
    'tag.bestseller': 'Meilleure vente',
    'tag.spicy': 'Épicé',
    'tag.vegetarian': 'Végétarien',
    'tag.new': 'Nouveau',
    
    // Actions
    'action.viewDetails': 'Voir détails',
    'action.close': 'Fermer',
    
    // Currency
    'currency.symbol': 'DA',
    'currency.format': '{price} DA',
    
    // Services
    'service.takeaway': 'À emporter',
    'service.dine-in': 'Sur place',
    
    // Misc
    'misc.unavailable': 'Indisponible',
    'misc.openNow': 'Ouvert',
    'misc.closed': 'Fermé',
  },
  ar: {
    // Header
    'header.menu': 'القائمة',
    'header.hours': 'ساعات العمل',
    'header.today': 'اليوم',
    
    // Search
    'search.placeholder': 'ابحث في القائمة...',
    'search.noResults': 'لا توجد نتائج',
    'search.noResultsDesc': 'جرب كلمة بحث مختلفة',
    
    // Categories
    'category.all': 'الكل',
    
    // Tags
    'tag.popular': 'مشهور',
    'tag.bestseller': 'الأكثر مبيعاً',
    'tag.spicy': 'حار',
    'tag.vegetarian': 'نباتي',
    'tag.new': 'جديد',
    
    // Actions
    'action.viewDetails': 'عرض التفاصيل',
    'action.close': 'إغلاق',
    
    // Currency
    'currency.symbol': 'د.ج',
    'currency.format': '{price} د.ج',
    
    // Services
    'service.takeaway': 'للأخذ',
    'service.dine-in': 'محلي',
    
    // Misc
    'misc.unavailable': 'غير متوفر',
    'misc.openNow': 'مفتوح الآن',
    'misc.closed': 'مغلق',
  },
};

export const getDirection = (lang: Language): 'ltr' | 'rtl' => {
  return lang === 'ar' ? 'rtl' : 'ltr';
};
