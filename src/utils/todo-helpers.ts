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
	return todos.reduce((count, todo) => count + (!todo.completed ? 1 : 0), 0);
}

/**
 * Объединяет исходный список задач с переупорядоченными элементами по id.
 * Элементы, чьи id есть в reorderedItems, подставляются в порядке их появления в todos.
 * Остальные элементы остаются без изменений.
 * @param todos - Исходный массив задач
 * @param reorderedItems - Переупорядоченный массив (подмножество элементов из todos)
 * @returns Новый массив с обновлённым порядком
 */
export function mergeReorderedItems(todos: i_todo[], reorderedItems: i_todo[]): i_todo[] {
	const reorderedMap = new Map(reorderedItems.map((t) => [t.id, t]));
	const reorderedIds = new Set(reorderedMap.keys());
	let reorderedIndex = 0;

	return todos.map((todo) => {
		if (reorderedIds.has(todo.id)) {
			const item = reorderedItems[reorderedIndex];
			reorderedIndex++;
			return item;
		}
		return todo;
	});
}
