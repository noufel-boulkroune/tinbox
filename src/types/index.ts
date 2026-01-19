export type Language = 'en' | 'fr' | 'ar';

export interface LocalizedString {
  en: string;
  fr: string;
  ar: string;
}

export interface LocalizedHours {
  en: string;
  fr: string;
  ar: string;
}

export interface Restaurant {
  name: string;
  tagline: string | LocalizedString;
  description?: string | LocalizedString;
  logo?: string;
  backgroundImage?: string;
  address: string | LocalizedString;
  phone: string;
  hours: Record<string, string | LocalizedHours>;
  services: string[] | Record<string, LocalizedString>;
}

export interface Category {
  id: string;
  name: LocalizedString;
  icon: string;
}

export interface MenuItemSize {
  label: string;
  price: number;
  originalPrice?: number;
}

export interface Allergen {
  id: string;
  name: LocalizedString;
  icon: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  originalPrice?: number;
  image: string;
  tags: string[];
  allergens?: string[];
  sizes?: MenuItemSize[];
  available: boolean;
}

export interface MenuData {
  restaurant: Restaurant;
  categories: Category[];
  allergens?: Allergen[];
  items: MenuItem[];
}
