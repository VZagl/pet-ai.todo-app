import { useState, useMemo } from 'react';
import type { Todo, FilterType } from '../types/todo';
import { filterTodos } from '../utils/todoHelpers';

/**
 * Кастомный хук для управления фильтрацией задач
 * @param todos - Массив всех задач
 * @returns Объект с отфильтрованными задачами, текущим фильтром и функцией изменения фильтра
 */
export function useFilter(todos: Todo[]) {
	const [filter, setFilter] = useState<FilterType>('all');

	// Мемоизация отфильтрованных задач для оптимизации
	const filteredTodos = useMemo(() => {
		return filterTodos(todos, filter);
	}, [todos, filter]);

	return {
		filter,
		setFilter,
		filteredTodos,
	};
}
