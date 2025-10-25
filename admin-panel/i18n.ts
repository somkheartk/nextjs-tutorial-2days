import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
export const locales = ['en', 'th'] as const;
export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as typeof locales[number])) notFound();

  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
