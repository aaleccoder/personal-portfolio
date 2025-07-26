import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Optional: Control when locale prefixes are shown
  // 'always' - always show locale prefix (/en/page, /es/page)
  // 'as-needed' - only show for non-default locales (/page, /es/page)
  // 'never' - never show locale prefix (requires domain-based routing)
  localePrefix: 'always',
  
  // Define pathnames that should be excluded from locale routing
  pathnames: {
    '/': '/',
    // Admin routes should not be localized
    '/admin': '/admin'
  }
});