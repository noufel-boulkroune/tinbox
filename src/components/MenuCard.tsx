import { useState, memo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onClick?: () => void;
}

function MenuCardComponent({ item, onClick }: MenuCardProps) {
  const { localize, t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const name = localize(item.name);
  const description = localize(item.description);
  
  // Format price (assuming price is in DA - Algerian Dinar)
  const formattedPrice = new Intl.NumberFormat('fr-DZ').format(item.price);
  const hasOriginalPrice = item.originalPrice && item.originalPrice > item.price;
  const formattedOriginalPrice = hasOriginalPrice 
    ? new Intl.NumberFormat('fr-DZ').format(item.originalPrice!) 
    : null;

  const hasPopularTag = item.tags.includes('popular') || item.tags.includes('bestseller');
  const isSpicy = item.tags.includes('spicy');
  const isVegetarian = item.tags.includes('vegetarian');
  const isNew = item.tags.includes('new');
  const isDeal = item.tags.includes('deal');
  const hasImage = item.image && item.image.length > 0;

  return (
    <article
      className="menu-card bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer border border-surface-100 hover:border-surface-200 flex flex-col"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Image container - only show if has image */}
      {hasImage ? (
        <div className="relative aspect-[4/3] bg-surface-100 overflow-hidden">
          {!imageError ? (
            <img
              src={item.image}
              alt={name}
              loading="lazy"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-100">
              <svg className="w-12 h-12 text-surface-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 skeleton" />
          )}

          {/* Tags overlay */}
          <div className="absolute top-2 start-2 flex gap-1.5 flex-wrap">
            {isDeal && (
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-sm">
                Promo
              </span>
            )}
            {isNew && (
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow-sm">
                {t('tag.new')}
              </span>
            )}
            {hasPopularTag && !isDeal && !isNew && (
              <span className="px-2 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full shadow-sm">
                {item.tags.includes('bestseller') ? t('tag.bestseller') : t('tag.popular')}
              </span>
            )}
            {isSpicy && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-sm flex items-center gap-0.5">
                🌶️
              </span>
            )}
          </div>
        </div>
      ) : (
        /* No image - show tags at top of card */
        (isDeal || isNew || hasPopularTag || isSpicy) && (
          <div className="px-4 pt-4 flex gap-1.5 flex-wrap">
            {isDeal && (
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                Promo
              </span>
            )}
            {isNew && (
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                {t('tag.new')}
              </span>
            )}
            {hasPopularTag && !isDeal && !isNew && (
              <span className="px-2 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                {item.tags.includes('bestseller') ? t('tag.bestseller') : t('tag.popular')}
              </span>
            )}
            {isSpicy && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center gap-0.5">
                🌶️
              </span>
            )}
          </div>
        )
      )}

      {/* Content */}
      <div className={`p-4 flex flex-col flex-1 ${!hasImage && !(isDeal || isNew || hasPopularTag || isSpicy) ? 'pt-4' : ''}`}>
        {/* Name and vegetarian badge */}
        <div className="flex items-start gap-2">
          <h3 className="font-semibold text-surface-900 text-base sm:text-lg leading-tight flex-1">
            {name}
          </h3>
          {isVegetarian && (
            <span className="shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center" title={t('tag.vegetarian')}>
              <span className="text-xs">🌱</span>
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="mt-1.5 text-sm text-surface-500 line-clamp-2 flex-1">
            {description}
          </p>
        )}

        {/* Sizes if available */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.sizes.map((size, idx) => (
              <span key={idx} className="text-xs px-2 py-0.5 bg-surface-100 rounded-full text-surface-600">
                {size.label}: {new Intl.NumberFormat('fr-DZ').format(size.price)} DA
              </span>
            ))}
          </div>
        )}

        {/* Price - prominently displayed */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary-600">
              {formattedPrice} <span className="text-sm font-semibold">DA</span>
            </span>
            {hasOriginalPrice && (
              <span className="text-sm text-surface-400 line-through">
                {formattedOriginalPrice} DA
              </span>
            )}
          </div>
          
          {/* View indicator */}
          <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}

export const MenuCard = memo(MenuCardComponent);
