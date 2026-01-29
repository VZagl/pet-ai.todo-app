import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { i_todo } from '../types/todo';
import { useFilter } from './use-filter';

describe('useFilter', () => {
	const mockTodos: i_todo[] = [
		{
			id: '1',
			text: 'Active task 1',
			completed: false,
			createdAt: Date.now(),
		},
		{
			id: '2',
			text: 'Completed task',
			completed: true,
			createdAt: Date.now(),
		},
		{
			id: '3',
			text: 'Active task 2',
			completed: false,
			createdAt: Date.now(),
		},
	];

	it('должен инициализироваться фильтром "all"', () => {
		const { result } = renderHook(() => useFilter(mockTodos));

		expect(result.current.filter).toBe('all');
	});

	it('должен возвращать все задачи при фильтре "all"', () => {
		const { result } = renderHook(() => useFilter(mockTodos));

		expect(result.current.filteredTodos).toHaveLength(3);
		expect(result.current.filteredTodos).toEqual(mockTodos);
	});

	it('должен фильтровать активные задачи', () => {
		const { result } = renderHook(() => useFilter(mockTodos));

		act(() => {
			result.current.setFilter('active');
		});

		expect(result.current.filter).toBe('active');
		expect(result.current.filteredTodos).toHaveLength(2);
		expect(result.current.filteredTodos.every((t) => !t.completed)).toBe(true);
	});

	it('должен фильтровать завершенные задачи', () => {
		const { result } = renderHook(() => useFilter(mockTodos));

		act(() => {
			result.current.setFilter('completed');
		});

		expect(result.current.filter).toBe('completed');
		expect(result.current.filteredTodos).toHaveLength(1);
		expect(result.current.filteredTodos.every((t) => t.completed)).toBe(true);
	});

	it('должен переключаться между фильтрами', () => {
		const { result } = renderHook(() => useFilter(mockTodos));

		// Переключаем на active
		act(() => {
			result.current.setFilter('active');
		});
		expect(result.current.filteredTodos).toHaveLength(2);

		// Переключаем на completed
		act(() => {
			result.current.setFilter('completed');
		});
		expect(result.current.filteredTodos).toHaveLength(1);

		// Переключаем обратно на all
		act(() => {
			result.current.setFilter('all');
		});
		expect(result.current.filteredTodos).toHaveLength(3);
	});

	it('должен реагировать на изменение списка задач', () => {
		const { result, rerender } = renderHook(({ todos }) => useFilter(todos), {
			initialProps: { todos: mockTodos },
		});

		// Устанавливаем фильтр active
		act(() => {
			result.current.setFilter('active');
		});
		expect(result.current.filteredTodos).toHaveLength(2);

		// Обновляем список задач (добавляем новую активную задачу)
		const updatedTodos: i_todo[] = [
			...mockTodos,
			{
				id: '4',
				text: 'New active task',
				completed: false,
				createdAt: Date.now(),
			},
		];

		rerender({ todos: updatedTodos });

		expect(result.current.filteredTodos).toHaveLength(3);
	});

	it('должен возвращать пустой массив для пустого списка задач', () => {
		const { result } = renderHook(() => useFilter([]));

		expect(result.current.filteredTodos).toHaveLength(0);
	});
});
