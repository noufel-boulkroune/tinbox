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
    
    // Header
    'header.closed': 'Closed',
    
    // Tags
    'tag.deal': 'Deal',
    'tag.premium': 'Premium',
    
    // Allergen Filter
    'filter.allergens': 'Allergen Filter',
    'filter.hideAllergens': 'Hide items containing:',
    'filter.clear': 'Clear filters',
    'filter.active': 'active',
    
    // Allergens
    'allergen.nuts': 'Tree Nuts',
    'allergen.celery': 'Celery',
    'allergen.eggs': 'Eggs',
    'allergen.fish': 'Fish',
    'allergen.soy': 'Soy',
    'allergen.mustard': 'Mustard',
    'allergen.sulfites': 'Sulfites',
    'allergen.peanuts': 'Peanuts',
    'allergen.gluten': 'Gluten',
    'allergen.crustaceans': 'Crustaceans',
    'allergen.dairy': 'Dairy',
    'allergen.lupin': 'Lupin',
    'allergen.mollusks': 'Mollusks',
    'allergen.sesame': 'Sesame',
    'allergen.garlic': 'Garlic',
    'allergen.onion': 'Onion',
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
    
    // Header
    'header.closed': 'Fermé',
    
    // Tags
    'tag.deal': 'Promo',
    'tag.premium': 'Premium',
    
    // Allergen Filter
    'filter.allergens': 'Filtre allergènes',
    'filter.hideAllergens': 'Masquer les plats contenant:',
    'filter.clear': 'Effacer les filtres',
    'filter.active': 'actif',
    
    // Allergens
    'allergen.nuts': 'Fruits à coques',
    'allergen.celery': 'Céleri',
    'allergen.eggs': 'Oeufs',
    'allergen.fish': 'Poissons',
    'allergen.soy': 'Soja',
    'allergen.mustard': 'Moutarde',
    'allergen.sulfites': 'Sulfites',
    'allergen.peanuts': 'Arachides',
    'allergen.gluten': 'Céréales (Gluten)',
    'allergen.crustaceans': 'Crustacés',
    'allergen.dairy': 'Lait',
    'allergen.lupin': 'Lupin',
    'allergen.mollusks': 'Mollusques',
    'allergen.sesame': 'Sésame',
    'allergen.garlic': 'Ail',
    'allergen.onion': 'Oignons',
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
    
    // Header
    'header.closed': 'مغلق',
    
    // Tags
    'tag.deal': 'عرض',
    'tag.premium': 'مميز',
    
    // Allergen Filter
    'filter.allergens': 'فلتر المواد المسببة للحساسية',
    'filter.hideAllergens': 'إخفاء الأطباق التي تحتوي على:',
    'filter.clear': 'مسح الفلاتر',
    'filter.active': 'نشط',
    
    // Allergens
    'allergen.nuts': 'مكسرات',
    'allergen.celery': 'كرفس',
    'allergen.eggs': 'بيض',
    'allergen.fish': 'سمك',
    'allergen.soy': 'صويا',
    'allergen.mustard': 'خردل',
    'allergen.sulfites': 'كبريتات',
    'allergen.peanuts': 'فول سوداني',
    'allergen.gluten': 'غلوتين',
    'allergen.crustaceans': 'قشريات',
    'allergen.dairy': 'حليب',
    'allergen.lupin': 'ترمس',
    'allergen.mollusks': 'رخويات',
    'allergen.sesame': 'سمسم',
    'allergen.garlic': 'ثوم',
    'allergen.onion': 'بصل',
  },
};

export const getDirection = (lang: Language): 'ltr' | 'rtl' => {
  return lang === 'ar' ? 'rtl' : 'ltr';
};
