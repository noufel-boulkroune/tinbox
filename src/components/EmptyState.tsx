import { useLanguage } from '../context/LanguageContext';

interface EmptyStateProps {
  onClear?: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-surface-100 flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-surface-900">
        {t('search.noResults')}
      </h3>
      
      <p className="mt-1 text-surface-500">
        {t('search.noResultsDesc')}
      </p>

      {onClear && (
        <button
          onClick={onClear}
          className="mt-4 px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
        >
          Clear Search
        </button>
      )}
    </div>
  );
}
