export type Language = 'en' | 'fr' | 'ar';

export interface LocalizedString {
  en: string;
  fr: string;
  ar: string;
}

export interface Restaurant {
  name: string;
  tagline: string;
  description?: string;
  logo?: string;
  backgroundImage?: string;
  address: string;
  phone: string;
  hours: Record<string, string>;
  services: string[];
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

export interface MenuItem {
  id: string;
  categoryId: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  originalPrice?: number;
  image: string;
  tags: string[];
  sizes?: MenuItemSize[];
  available: boolean;
}

export interface MenuData {
  restaurant: Restaurant;
  categories: Category[];
  items: MenuItem[];
}
