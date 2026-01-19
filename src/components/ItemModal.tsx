import { useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { MenuItem } from '../types';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export function ItemModal({ item, onClose }: ItemModalProps) {
  const { localize, t } = useLanguage();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  const name = localize(item.name);
  const description = localize(item.description);
  const formattedPrice = new Intl.NumberFormat('fr-DZ').format(item.price);
  const hasOriginalPrice = item.originalPrice && item.originalPrice > item.price;
  const formattedOriginalPrice = hasOriginalPrice 
    ? new Intl.NumberFormat('fr-DZ').format(item.originalPrice!) 
    : null;
  const hasImage = item.image && item.image.length > 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-auto rounded-t-3xl sm:rounded-3xl animate-slide-up safe-area-bottom">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center hover:bg-white transition-colors"
          aria-label={t('action.close')}
        >
          <svg className="w-5 h-5 text-surface-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        {hasImage ? (
          <div className="aspect-video bg-surface-100 relative overflow-hidden">
            <img
              src={item.image}
              alt={name}
              className="w-full h-full object-cover"
            />
            
            {/* Tags */}
            <div className="absolute bottom-3 start-3 flex gap-2 flex-wrap">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    tag === 'spicy' 
                      ? 'bg-red-500 text-white' 
                      : tag === 'vegetarian'
                      ? 'bg-green-500 text-white'
                      : tag === 'deal'
                      ? 'bg-green-500 text-white'
                      : tag === 'new'
                      ? 'bg-blue-500 text-white'
                      : 'bg-primary-500 text-white'
                  }`}
                >
                  {tag === 'deal' ? 'Promo' : t(`tag.${tag}`)}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-14 px-6">
            {/* Tags without image */}
            {item.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      tag === 'spicy' 
                        ? 'bg-red-500 text-white' 
                        : tag === 'vegetarian'
                        ? 'bg-green-500 text-white'
                        : tag === 'deal'
                        ? 'bg-green-500 text-white'
                        : tag === 'new'
                        ? 'bg-blue-500 text-white'
                        : 'bg-primary-500 text-white'
                    }`}
                  >
                    {tag === 'deal' ? 'Promo' : t(`tag.${tag}`)}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`p-6 ${!hasImage && item.tags.length === 0 ? 'pt-14' : ''}`}>
          <h2 id="modal-title" className="text-2xl font-bold text-surface-900">
            {name}
          </h2>
          
          {description && (
            <p className="mt-3 text-surface-600 leading-relaxed">
              {description}
            </p>
          )}

          {/* Sizes */}
          {item.sizes && item.sizes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-surface-700 mb-2">Tailles disponibles:</h3>
              <div className="grid grid-cols-2 gap-2">
                {item.sizes.map((size, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-3 bg-surface-50 rounded-xl"
                  >
                    <span className="font-medium text-surface-800">{size.label}</span>
                    <div className="text-end">
                      <span className="font-bold text-primary-600">
                        {new Intl.NumberFormat('fr-DZ').format(size.price)} DA
                      </span>
                      {size.originalPrice && size.originalPrice > size.price && (
                        <span className="block text-xs text-surface-400 line-through">
                          {new Intl.NumberFormat('fr-DZ').format(size.originalPrice)} DA
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary-600">
                  {formattedPrice}
                </span>
                <span className="text-lg font-semibold text-primary-600">DA</span>
              </div>
              {hasOriginalPrice && (
                <span className="text-sm text-surface-400 line-through">
                  {formattedOriginalPrice} DA
                </span>
              )}
            </div>

            {!item.available && (
              <span className="px-3 py-1 bg-surface-200 text-surface-600 rounded-full text-sm font-medium">
                {t('misc.unavailable')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
