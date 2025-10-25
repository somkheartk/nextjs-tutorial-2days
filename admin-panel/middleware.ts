import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  
  // Used when no locale matches
  defaultLocale: defaultLocale,
  
  // Don't redirect to default locale
  localePrefix: 'as-needed'
});

export const config = {
  // Match all pathnames except for
  // - … if they contain a dot (e.g. favicon.ico)
  // - … if they start with /api
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
