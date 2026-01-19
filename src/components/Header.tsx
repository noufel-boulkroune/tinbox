import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Restaurant, LocalizedString } from '../types';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  restaurant: Restaurant;
}

export function Header({ restaurant }: HeaderProps) {
  const { t, localize, language } = useLanguage();
  const [showInfo, setShowInfo] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Helper to get localized value or string
  const getLocalizedValue = (value: string | LocalizedString | undefined): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return localize(value);
  };

  // Get today's hours
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const hoursValue = restaurant.hours[today];
  const todayHours = hoursValue
    ? (typeof hoursValue === 'string' ? hoursValue : hoursValue[language] || hoursValue.en)
    : t('header.closed');

  const showLogo = restaurant.logo && !logoError;

  return (
    <header className="bg-white border-b border-surface-200 sticky top-0 z-50 safe-area-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo and Name */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Logo */}
            {showLogo ? (
              <img
                src={restaurant.logo}
                alt={restaurant.name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-md"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl sm:text-2xl">T</span>
              </div>
            )}

            {/* Name & tagline */}
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-surface-900">
                {restaurant.name}
              </h1>
              <p className="text-xs sm:text-sm text-surface-500 max-w-xs sm:max-w-md truncate">
                {getLocalizedValue(restaurant.tagline)}
              </p>
            </div>
          </div>

          {/* Right side: Info + Language */}
          <div className="flex items-center gap-2">
            {/* Info button */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`p-2 rounded-full transition-colors ${restaurant.backgroundImage
                  ? 'bg-white/20 hover:bg-white/30 text-white'
                  : 'hover:bg-surface-100 text-surface-600'
                }`}
              aria-label="Restaurant information"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            <LanguageSelector />
          </div>
        </div>

        {/* Collapsible info section */}
        {showInfo && (
          <div className="pb-4 animate-fade-in">
            <div className="bg-surface-50 rounded-xl p-4 space-y-3">
              {/* Description */}
              {restaurant.description && (
                <p className="text-sm text-surface-700 whitespace-pre-line">
                  {getLocalizedValue(restaurant.description)}
                </p>
              )}

              {/* Hours */}
              <div className="flex items-center gap-2 text-sm text-surface-600">
                <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{t('header.today')}:</span>
                <span>{todayHours}</span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 text-sm text-surface-600">
                <svg className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{getLocalizedValue(restaurant.address)}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 text-sm text-surface-600">
                <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${restaurant.phone}`} className="text-primary-600 hover:underline font-medium">
                  {restaurant.phone}
                </a>
              </div>

              {/* Services */}
              <div className="flex items-center gap-2 pt-1">
                {Array.isArray(restaurant.services) ? (
                  restaurant.services.map(service => (
                    <span
                      key={service}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium"
                    >
                      {t(`service.${service}`)}
                    </span>
                  ))
                ) : (
                  Object.entries(restaurant.services).map(([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium"
                    >
                      {localize(value)}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
