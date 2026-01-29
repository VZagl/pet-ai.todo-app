import type { FilterType, i_todo } from '../types/todo';

/**
 * Генерирует уникальный идентификатор для задачи
 * @returns Уникальный ID
 */
export function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Фильтрует задачи по заданному типу фильтра
 * @param todos - Массив всех задач
 * @param filter - Тип фильтра
 * @returns Отфильтрованный массив задач
 */
export function filterTodos(todos: i_todo[], filter: FilterType): i_todo[] {
	switch (filter) {
		case 'active':
			return todos.filter((todo) => !todo.completed);
		case 'completed':
			return todos.filter((todo) => todo.completed);
		case 'all':
		default:
			return todos;
	}
}

/**
 * Подсчитывает количество активных (незавершенных) задач
 * @param todos - Массив задач
 * @returns Количество активных задач
 */
export function getActiveCount(todos: i_todo[]): number {
	return todos.filter((todo) => !todo.completed).length;
}
