import { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  resultCount?: number;
}

export function SearchBar({ value, onChange, onClear, resultCount }: SearchBarProps) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on Cmd+K or Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        onClear();
        inputRef.current?.blur();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClear]);

  return (
    <div className="relative">
      <div className="relative">
        {/* Search icon */}
        <svg
          className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full h-12 ps-10 pe-10 bg-surface-100 border-0 rounded-xl text-surface-900 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all search-input"
          aria-label="Search menu"
        />

        {/* Clear button */}
        {value && (
          <button
            onClick={onClear}
            className="absolute end-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-200 transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Result count when searching */}
      {value && resultCount !== undefined && (
        <p className="mt-2 text-sm text-surface-500 text-center">
          {resultCount === 0 
            ? t('search.noResults')
            : `${resultCount} ${resultCount === 1 ? 'item' : 'items'} found`
          }
        </p>
      )}
    </div>
  );
}
