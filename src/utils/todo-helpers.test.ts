import { describe, expect, it } from 'vitest';
import type { i_todo } from '../types/todo';
import { filterTodos, generateId, getActiveCount, mergeReorderedItems } from './todo-helpers';

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

	describe('mergeReorderedItems', () => {
		const todos: i_todo[] = [
			{ id: '1', text: 'First', completed: false, createdAt: 1 },
			{ id: '2', text: 'Second', completed: false, createdAt: 2 },
			{ id: '3', text: 'Third', completed: false, createdAt: 3 },
		];

		it('должен менять порядок элементов согласно reorderedItems', () => {
			const reordered = [todos[2], todos[0], todos[1]];

			const result = mergeReorderedItems(todos, reordered);

			expect(result[0]).toEqual(todos[2]);
			expect(result[1]).toEqual(todos[0]);
			expect(result[2]).toEqual(todos[1]);
		});

		it('должен сохранять порядок элементов, не входящих в reorderedItems', () => {
			const todosWithExtra: i_todo[] = [
				...todos,
				{ id: '4', text: 'Fourth', completed: false, createdAt: 4 },
			];
			const reordered = [todos[1], todos[0]];

			const result = mergeReorderedItems(todosWithExtra, reordered);

			expect(result[0]).toEqual(todos[1]);
			expect(result[1]).toEqual(todos[0]);
			expect(result[2]).toEqual(todos[2]);
			expect(result[3].id).toBe('4');
		});

		it('должен возвращать пустой массив для пустого todos', () => {
			const result = mergeReorderedItems([], []);

			expect(result).toEqual([]);
		});
	});
});
