import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Todo } from '../../types/todo';
import { TodoList } from './TodoList';

describe('TodoList', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	const mockTodos: Todo[] = [
		{
			id: '1',
			text: 'Task 1',
			completed: false,
			createdAt: Date.now(),
		},
		{
			id: '2',
			text: 'Task 2',
			completed: true,
			createdAt: Date.now(),
		},
		{
			id: '3',
			text: 'Task 3',
			completed: false,
			createdAt: Date.now(),
		},
	];

	it('должен отображать все задачи', () => {
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);

		expect(screen.getByText('Task 1')).toBeInTheDocument();
		expect(screen.getByText('Task 2')).toBeInTheDocument();
		expect(screen.getByText('Task 3')).toBeInTheDocument();
	});

	it('должен отображать сообщение о пустом списке', () => {
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		render(<TodoList todos={[]} onToggle={onToggle} onDelete={onDelete} />);

		expect(screen.getByText(/нет задач для отображения/i)).toBeInTheDocument();
	});

	it('должен отображать правильное количество элементов', () => {
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		const { container } = render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);

		const listItems = container.querySelectorAll('.todo-item');
		expect(listItems).toHaveLength(3);
	});

	it('должен передавать обработчики в TodoItem', () => {
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);

		// Проверяем, что компоненты отрисовались (косвенная проверка передачи props)
		expect(screen.getAllByRole('checkbox')).toHaveLength(3);
		expect(screen.getAllByRole('button')).toHaveLength(3);
	});

	it('должен использовать id задачи как key', () => {
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		// Сценарий 1: Уникальные id - ошибок быть не должно
		const { rerender } = render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);

		expect(consoleErrorSpy).not.toHaveBeenCalled();
		consoleErrorSpy.mockClear();

		// Сценарий 2: Дубликаты id - должна появиться ошибка
		const todosWithDuplicate = [mockTodos[0], ...mockTodos];
		rerender(<TodoList todos={todosWithDuplicate} onToggle={onToggle} onDelete={onDelete} />);

		expect(consoleErrorSpy).toHaveBeenCalled();
		expect(consoleErrorSpy.mock.calls[0][0]).toContain('key');
	});
});
