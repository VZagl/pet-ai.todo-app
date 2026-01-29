import { describe, expect, it } from 'vitest';
import type { i_todo } from '../types/todo';
import { filterTodos, generateId, getActiveCount } from './todo-helpers';

describe('todoHelpers', () => {
	describe('generateId', () => {
		it('должен генерировать уникальные ID', () => {
			const id1 = generateId();
			const id2 = generateId();

			expect(id1).not.toBe(id2);
			expect(typeof id1).toBe('string');
			expect(typeof id2).toBe('string');
		});

		it('должен генерировать ID с timestamp', () => {
			const id = generateId();
			const timestamp = id.split('-')[0];

			expect(Number(timestamp)).toBeGreaterThan(0);
		});
	});

	describe('filterTodos', () => {
		const todos: i_todo[] = [
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

		it('должен возвращать все задачи при фильтре "all"', () => {
			const filtered = filterTodos(todos, 'all');

			expect(filtered).toHaveLength(3);
			expect(filtered).toEqual(todos);
		});

		it('должен возвращать только активные задачи при фильтре "active"', () => {
			const filtered = filterTodos(todos, 'active');

			expect(filtered).toHaveLength(2);
			expect(filtered.every((todo) => !todo.completed)).toBe(true);
		});

		it('должен возвращать только завершенные задачи при фильтре "completed"', () => {
			const filtered = filterTodos(todos, 'completed');

			expect(filtered).toHaveLength(1);
			expect(filtered.every((todo) => todo.completed)).toBe(true);
		});

		it('должен возвращать пустой массив для пустого списка задач', () => {
			const filtered = filterTodos([], 'all');

			expect(filtered).toHaveLength(0);
		});
	});

	describe('getActiveCount', () => {
		it('должен подсчитывать количество активных задач', () => {
			const todos: i_todo[] = [
				{
					id: '1',
					text: 'Active 1',
					completed: false,
					createdAt: Date.now(),
				},
				{
					id: '2',
					text: 'Completed',
					completed: true,
					createdAt: Date.now(),
				},
				{
					id: '3',
					text: 'Active 2',
					completed: false,
					createdAt: Date.now(),
				},
			];

			const count = getActiveCount(todos);

			expect(count).toBe(2);
		});

		it('должен возвращать 0 для пустого списка', () => {
			const count = getActiveCount([]);

			expect(count).toBe(0);
		});

		it('должен возвращать 0 если все задачи завершены', () => {
			const todos: i_todo[] = [
				{
					id: '1',
					text: 'Completed 1',
					completed: true,
					createdAt: Date.now(),
				},
				{
					id: '2',
					text: 'Completed 2',
					completed: true,
					createdAt: Date.now(),
				},
			];

			const count = getActiveCount(todos);

			expect(count).toBe(0);
		});

		it('должен возвращать общее количество если все задачи активны', () => {
			const todos: i_todo[] = [
				{
					id: '1',
					text: 'Active 1',
					completed: false,
					createdAt: Date.now(),
				},
				{
					id: '2',
					text: 'Active 2',
					completed: false,
					createdAt: Date.now(),
				},
			];

			const count = getActiveCount(todos);

			expect(count).toBe(2);
		});
	});
});
