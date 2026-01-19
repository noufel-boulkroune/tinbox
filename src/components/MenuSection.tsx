import { memo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MenuCard } from './MenuCard';
import type { Category, MenuItem } from '../types';

interface MenuSectionProps {
  category: Category;
  items: MenuItem[];
  onItemClick?: (item: MenuItem) => void;
}

function MenuSectionComponent({ category, items, onItemClick }: MenuSectionProps) {
  const { localize } = useLanguage();

  if (items.length === 0) return null;

  return (
    <section id={category.id} className="scroll-mt-36">
      {/* Category header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-surface-900">
            {localize(category.name)}
          </h2>
          <p className="text-sm text-surface-500 mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      {/* Items grid - responsive for all screen sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </div>
    </section>
  );
}

export const MenuSection = memo(MenuSectionComponent);
