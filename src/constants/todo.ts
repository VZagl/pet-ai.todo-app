import type { FilterType } from '../types/todo';

/**
 * Ключ для хранения данных в localStorage
 */
export const STORAGE_KEY = 'todos';

/**
 * Максимальная длина текста задачи
 */
export const MAX_TODO_LENGTH = 500;

/**
 * Значения фильтров (для программного использования)
 */
export const FILTERS: FilterType[] = ['all', 'active', 'completed'];

/**
 * Ключ для хранения colorScheme в localStorage
 */
export const THEME_COLOR_SCHEME_KEY = 'theme-color-scheme';

/**
 * Ключ для хранения themeVariant в localStorage
 */
export const THEME_VARIANT_KEY = 'theme-variant';
