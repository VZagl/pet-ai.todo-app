import { useMemo, useState } from 'react';
import type { FilterType, i_todo } from '../types/todo';
import { filterTodos } from '../utils/todo-helpers';

/**
 * Кастомный хук для управления фильтрацией задач
 * @param todos - Массив всех задач
 * @returns Объект с отфильтрованными задачами, текущим фильтром и функцией изменения фильтра
 */
export function useFilter(todos: i_todo[]) {
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
