import { useState, useMemo, useCallback } from 'react';
import menuData from '../data/menu.json';
import type { MenuData, MenuItem, Category } from '../types';
import { useLanguage } from '../context/LanguageContext';

const data = menuData as unknown as MenuData;

export function useMenu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { localize } = useLanguage();

  const categories = useMemo(() => data.categories, []);
  const restaurant = useMemo(() => data.restaurant, []);

  const filteredItems = useMemo(() => {
    let items = data.items.filter(item => item.available);

    // Filter by category
    if (activeCategory) {
      items = items.filter(item => item.categoryId === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(item => {
        const name = localize(item.name).toLowerCase();
        const description = localize(item.description).toLowerCase();
        return name.includes(query) || description.includes(query);
      });
    }

    return items;
  }, [searchQuery, activeCategory, localize]);

  const groupedItems = useMemo(() => {
    if (searchQuery.trim()) {
      // When searching, don't group - return flat list
      return null;
    }

    const groups: Record<string, MenuItem[]> = {};
    
    filteredItems.forEach(item => {
      if (!groups[item.categoryId]) {
        groups[item.categoryId] = [];
      }
      groups[item.categoryId].push(item);
    });

    return groups;
  }, [filteredItems, searchQuery]);

  const getCategoryById = useCallback((id: string): Category | undefined => {
    return categories.find(cat => cat.id === id);
  }, [categories]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const clearCategory = useCallback(() => {
    setActiveCategory(null);
  }, []);

  return {
    restaurant,
    categories,
    items: filteredItems,
    groupedItems,
    searchQuery,
    setSearchQuery,
    clearSearch,
    activeCategory,
    setActiveCategory,
    clearCategory,
    getCategoryById,
    totalItems: data.items.length,
    filteredCount: filteredItems.length,
    isSearching: searchQuery.trim().length > 0,
  };
}
