import { useCallback } from 'react';
import { STORAGE_KEY } from '../constants/todo';
import type { Todo } from '../types/todo';
import { generateId, getActiveCount } from '../utils/todoHelpers';
import { useLocalStorage } from './useLocalStorage';

/**
 * Кастомный хук для управления состоянием задач с CRUD операциями
 * @returns Объект с задачами, счетчиком активных задач и функциями управления
 */
export function useTodos() {
	const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, []);

	/**
	 * Добавляет новую задачу
	 * @param text - Текст задачи
	 */
	const addTodo = useCallback(
		(text: string) => {
			const newTodo: Todo = {
				id: generateId(),
				text: text.trim(),
				completed: false,
				createdAt: Date.now(),
			};
			setTodos((prev) => [...prev, newTodo]);
		},
		[setTodos],
	);

	/**
	 * Переключает статус выполнения задачи
	 * @param id - ID задачи
	 */
	const toggleTodo = useCallback(
		(id: string) => {
			setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
		},
		[setTodos],
	);

	/**
	 * Удаляет задачу
	 * @param id - ID задачи
	 */
	const deleteTodo = useCallback(
		(id: string) => {
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		},
		[setTodos],
	);

	/**
	 * Обновляет текст задачи
	 * @param id - ID задачи
	 * @param text - Новый текст
	 */
	const updateTodo = useCallback(
		(id: string, text: string) => {
			setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text: text.trim() } : todo)));
		},
		[setTodos],
	);

	// Подсчет активных задач
	const activeCount = getActiveCount(todos);

	return {
		todos,
		activeCount,
		addTodo,
		toggleTodo,
		deleteTodo,
		updateTodo,
	};
}
