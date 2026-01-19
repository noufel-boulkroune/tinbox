import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Allergen } from '../types';

interface AllergenFilterProps {
  allergens: Allergen[];
  selectedAllergens: string[];
  onToggleAllergen: (allergenId: string) => void;
  onClearAll: () => void;
}

export function AllergenFilter({
  allergens,
  selectedAllergens,
  onToggleAllergen,
  onClearAll,
}: AllergenFilterProps) {
  const { t, localize } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCount = selectedAllergens.length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all
          ${activeCount > 0
            ? 'bg-red-100 text-red-700 border-2 border-red-300'
            : 'bg-surface-100 text-surface-600 hover:bg-surface-200 border-2 border-transparent'
          }
        `}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span>{t('filter.allergens')}</span>
        {activeCount > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {activeCount}
          </span>
        )}
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full start-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-surface-200 z-50 animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-surface-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-surface-900">{t('filter.hideAllergens')}</h3>
              {activeCount > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  {t('filter.clear')}
                </button>
              )}
            </div>
            {activeCount > 0 && (
              <p className="text-xs text-surface-500 mt-1">
                {activeCount} {t('filter.active')}
              </p>
            )}
          </div>

          {/* Allergen List */}
          <div className="p-3 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {allergens.map((allergen) => {
                const isSelected = selectedAllergens.includes(allergen.id);
                return (
                  <button
                    key={allergen.id}
                    onClick={() => onToggleAllergen(allergen.id)}
                    className={`
                      flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-start
                      ${isSelected
                        ? 'bg-red-100 text-red-700 ring-2 ring-red-300'
                        : 'bg-surface-50 text-surface-700 hover:bg-surface-100'
                      }
                    `}
                  >
                    <span className="text-lg shrink-0">{allergen.icon}</span>
                    <span className="truncate">{localize(allergen.name)}</span>
                    {isSelected && (
                      <svg className="w-4 h-4 ms-auto shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info Footer */}
          <div className="p-3 bg-surface-50 border-t border-surface-100">
            <p className="text-xs text-surface-500 text-center">
              {activeCount > 0 
                ? `Hiding items with selected allergens`
                : `Select allergens to hide from menu`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
