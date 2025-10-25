/**
 * Application Constants
 * Centralized location for all constant values used throughout the application
 */

// User roles
export const USER_ROLES = ['admin', 'user', 'moderator', 'editor', 'manager'] as const
export type UserRole = typeof USER_ROLES[number]

// Status values
export const STATUSES = ['active', 'inactive'] as const
export type Status = typeof STATUSES[number]

// Product categories
export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Accessories',
  'Furniture',
  'Clothing',
  'Books'
] as const
export type ProductCategory = typeof PRODUCT_CATEGORIES[number]

// Navigation menu items (locale-independent keys)
export const MENU_ITEMS = [
  { key: 'dashboard', href: '/admin/dashboard', icon: 'Dashboard' },
  { key: 'users', href: '/admin/users', icon: 'People' },
  { key: 'products', href: '/admin/products', icon: 'Inventory' },
] as const

// Available locales
export const AVAILABLE_LOCALES = [
  { code: 'en', labelKey: 'language.english' },
  { code: 'th', labelKey: 'language.thai' },
] as const
