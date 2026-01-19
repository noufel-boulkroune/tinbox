import { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryClick: (categoryId: string) => void;
}

const categoryIcons: Record<string, JSX.Element> = {
  salad: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  pasta: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  burger: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 18h16c1.1 0 2-.9 2-2 0-.47-.16-.9-.44-1.24-.84-1.04-2.38-1.76-4.56-1.76-1.84 0-3.12.52-4 1-1.08-.6-2.52-1-4-1s-2.92.4-4 1C4.16 14.38 4 14.84 4 15.5c0 1.38 0 2.5 0 2.5zM4 11h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2zM12 2C8 2 4 3.5 4 6h16c0-2.5-4-4-8-4z" />
    </svg>
  ),
  sandwich: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  ),
  taco: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12v4a2 2 0 002 2h10a2 2 0 002-2v-4" />
    </svg>
  ),
  platter: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h18M3 17h18M3 21h18M12 3v4M8 7h8" />
    </svg>
  ),
  pizza: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  fries: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  drink: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  dessert: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 01-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
    </svg>
  ),
};

export function CategoryNav({ categories, activeCategory, onCategoryClick }: CategoryNavProps) {
  const { localize } = useLanguage();
  const navRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll active category into view
  useEffect(() => {
    if (activeRef.current && navRef.current) {
      const nav = navRef.current;
      const button = activeRef.current;
      const scrollLeft = button.offsetLeft - nav.offsetWidth / 2 + button.offsetWidth / 2;
      nav.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div className="bg-white border-b border-surface-200 sticky top-[132px] sm:top-[140px] z-40">
      <div className="max-w-7xl mx-auto">
        <nav
          ref={navRef}
          className="px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="Menu categories"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                ref={isActive ? activeRef : null}
                onClick={() => onCategoryClick(category.id)}
                role="tab"
                aria-selected={isActive}
                className={`
                  category-chip flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0
                  ${isActive
                    ? 'bg-primary-500 text-white shadow-md active'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                  }
                `}
              >
                {categoryIcons[category.icon] || null}
                <span>{localize(category.name)}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
