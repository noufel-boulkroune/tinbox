import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CategoryNav } from './components/CategoryNav';
import { MenuSection } from './components/MenuSection';
import { MenuCard } from './components/MenuCard';
import { ItemModal } from './components/ItemModal';
import { EmptyState } from './components/EmptyState';
import { useMenu } from './hooks/useMenu';
import { useScrollSpy } from './hooks/useScrollSpy';
import type { MenuItem } from './types';

export default function App() {
  const {
    restaurant,
    categories,
    items,
    groupedItems,
    searchQuery,
    setSearchQuery,
    clearSearch,
    activeCategory,
    setActiveCategory,
    filteredCount,
    isSearching,
  } = useMenu();

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Get category IDs for scroll spy (only when not searching)
  const categoryIds = useMemo(() => categories.map(c => c.id), [categories]);
  const { activeSection, scrollToSection } = useScrollSpy(categoryIds);

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    if (isSearching) {
      // If searching, filter by category
      setActiveCategory(categoryId === activeCategory ? null : categoryId);
    } else {
      // If not searching, scroll to section
      scrollToSection(categoryId);
    }
  };

  // Determine active category (from scroll or filter)
  const currentActiveCategory = isSearching ? activeCategory : activeSection;

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <Header restaurant={restaurant} />

      {/* Search Bar */}
      <div className="bg-white border-b border-surface-200 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-xl mx-auto lg:max-w-2xl">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={clearSearch}
              resultCount={isSearching ? filteredCount : undefined}
            />
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <CategoryNav
        categories={categories}
        activeCategory={currentActiveCategory}
        onCategoryClick={handleCategoryClick}
      />

      {/* Main Content - Full width on desktop */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-safe-bottom">
        {items.length === 0 ? (
          <EmptyState onClear={clearSearch} />
        ) : isSearching ? (
          // Search results - responsive grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {items.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        ) : (
          // Grouped by category
          <div className="space-y-12">
            {groupedItems && categories.map((category) => {
              const categoryItems = groupedItems[category.id];
              if (!categoryItems || categoryItems.length === 0) return null;
              
              return (
                <MenuSection
                  key={category.id}
                  category={category}
                  items={categoryItems}
                  onItemClick={setSelectedItem}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-surface-200 py-6 text-center">
        <p className="text-sm text-surface-500">
          {restaurant.name} &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs text-surface-400 mt-1">
          Menu numérique - Scan QR
        </p>
      </footer>

      {/* Item Detail Modal */}
      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
