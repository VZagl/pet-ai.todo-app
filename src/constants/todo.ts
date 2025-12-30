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
 * Названия фильтров для отображения
 */
export const FILTER_LABELS: Record<FilterType, string> = {
	all: 'Все',
	active: 'Активные',
	completed: 'Завершенные',
};

/**
 * Значения фильтров (для программного использования)
 */
export const FILTERS: FilterType[] = ['all', 'active', 'completed'];
