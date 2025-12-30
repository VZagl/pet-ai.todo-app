import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTodos } from './useTodos';

describe('useTodos', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('должен инициализироваться пустым массивом задач', () => {
		const { result } = renderHook(() => useTodos());

		expect(result.current.todos).toEqual([]);
		expect(result.current.activeCount).toBe(0);
	});

	it('должен добавлять новую задачу', () => {
		const { result } = renderHook(() => useTodos());

		act(() => {
			result.current.addTodo('New task');
		});

		expect(result.current.todos).toHaveLength(1);
		expect(result.current.todos[0].text).toBe('New task');
		expect(result.current.todos[0].completed).toBe(false);
		expect(result.current.activeCount).toBe(1);
	});

	it('должен обрезать пробелы при добавлении задачи', () => {
		const { result } = renderHook(() => useTodos());

		act(() => {
			result.current.addTodo('  Task with spaces  ');
		});

		expect(result.current.todos[0].text).toBe('Task with spaces');
	});

	it('должен переключать статус задачи', () => {
		const { result } = renderHook(() => useTodos());

		// Добавляем задачу
		act(() => {
			result.current.addTodo('Task to toggle');
		});

		const todoId = result.current.todos[0].id;

		// Переключаем статус
		act(() => {
			result.current.toggleTodo(todoId);
		});

		expect(result.current.todos[0].completed).toBe(true);
		expect(result.current.activeCount).toBe(0);

		// Переключаем обратно
		act(() => {
			result.current.toggleTodo(todoId);
		});

		expect(result.current.todos[0].completed).toBe(false);
		expect(result.current.activeCount).toBe(1);
	});

	it('должен удалять задачу', () => {
		const { result } = renderHook(() => useTodos());

		// Добавляем задачу
		act(() => {
			result.current.addTodo('Task to delete');
		});

		expect(result.current.todos).toHaveLength(1);

		const todoId = result.current.todos[0].id;

		// Удаляем задачу
		act(() => {
			result.current.deleteTodo(todoId);
		});

		expect(result.current.todos).toHaveLength(0);
	});

	it('должен обновлять текст задачи', () => {
		const { result } = renderHook(() => useTodos());

		// Добавляем задачу
		act(() => {
			result.current.addTodo('Original text');
		});

		const todoId = result.current.todos[0].id;

		// Обновляем текст
		act(() => {
			result.current.updateTodo(todoId, 'Updated text');
		});

		expect(result.current.todos[0].text).toBe('Updated text');
	});

	it('должен обрезать пробелы при обновлении текста', () => {
		const { result } = renderHook(() => useTodos());

		act(() => {
			result.current.addTodo('Original');
		});

		const todoId = result.current.todos[0].id;

		act(() => {
			result.current.updateTodo(todoId, '  Updated with spaces  ');
		});

		expect(result.current.todos[0].text).toBe('Updated with spaces');
	});

	it('должен правильно подсчитывать активные задачи', () => {
		const { result } = renderHook(() => useTodos());

		// Добавляем несколько задач
		act(() => {
			result.current.addTodo('Task 1');
			result.current.addTodo('Task 2');
			result.current.addTodo('Task 3');
		});

		expect(result.current.activeCount).toBe(3);

		// Завершаем одну задачу
		act(() => {
			result.current.toggleTodo(result.current.todos[0].id);
		});

		expect(result.current.activeCount).toBe(2);

		// Завершаем еще одну
		act(() => {
			result.current.toggleTodo(result.current.todos[1].id);
		});

		expect(result.current.activeCount).toBe(1);
	});

	it('должен сохранять задачи в localStorage', () => {
		const { result } = renderHook(() => useTodos());

		act(() => {
			result.current.addTodo('Persistent task');
		});

		// Проверяем, что данные сохранены
		const stored = localStorage.getItem('todos');
		expect(stored).not.toBeNull();

		const parsed = JSON.parse(stored!);
		expect(parsed).toHaveLength(1);
		expect(parsed[0].text).toBe('Persistent task');
	});

	it('должен загружать задачи из localStorage при инициализации', () => {
		// Предварительно сохраняем задачи
		const existingTodos = [
			{
				id: '1',
				text: 'Existing task',
				completed: false,
				createdAt: Date.now(),
			},
		];
		localStorage.setItem('todos', JSON.stringify(existingTodos));

		// Инициализируем хук
		const { result } = renderHook(() => useTodos());

		expect(result.current.todos).toHaveLength(1);
		expect(result.current.todos[0].text).toBe('Existing task');
	});

	it('должен генерировать уникальные ID для задач', () => {
		const { result } = renderHook(() => useTodos());

		act(() => {
			result.current.addTodo('Task 1');
			result.current.addTodo('Task 2');
			result.current.addTodo('Task 3');
		});

		const ids = result.current.todos.map((t) => t.id);
		const uniqueIds = new Set(ids);

		expect(uniqueIds.size).toBe(3);
	});
});
