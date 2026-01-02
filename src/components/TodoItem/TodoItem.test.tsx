import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem } from './TodoItem';
import type { Todo } from '../../types/todo';

describe('TodoItem', () => {
	const mockTodo: Todo = {
		id: '1',
		text: 'Test task',
		completed: false,
		createdAt: Date.now(),
	};

	it('должен отображать текст задачи', () => {
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		render(
			<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />
		);

		expect(screen.getByText('Test task')).toBeInTheDocument();
	});

	it('должен отображать чекбокс', () => {
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		render(
			<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />
		);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();
	});

	it('должен отображать чекбокс как отмеченный для завершенной задачи', () => {
		const completedTodo: Todo = { ...mockTodo, completed: true };
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		render(
			<TodoItem todo={completedTodo} onToggle={onToggle} onDelete={onDelete} />
		);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeChecked();
	});

	it('должен вызывать onToggle при клике на чекбокс', async () => {
		const user = userEvent.setup();
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		render(
			<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />
		);

		const checkbox = screen.getByRole('checkbox');
		await user.click(checkbox);

		expect(onToggle).toHaveBeenCalledWith('1');
		expect(onToggle).toHaveBeenCalledTimes(1);
	});

	it('должен вызывать onDelete при клике на кнопку удаления', async () => {
		const user = userEvent.setup();
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		render(
			<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />
		);

		const deleteButton = screen.getByRole('button', {
			name: /удалить задачу/i,
		});
		await user.click(deleteButton);

		expect(onDelete).toHaveBeenCalledWith('1');
		expect(onDelete).toHaveBeenCalledTimes(1);
	});

	it('должен применять класс completed для завершенной задачи', () => {
		const completedTodo: Todo = { ...mockTodo, completed: true };
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		const { container } = render(
			<TodoItem todo={completedTodo} onToggle={onToggle} onDelete={onDelete} />
		);

		const todoItem = container.querySelector('.todo-item');
		expect(todoItem).toHaveClass('completed');
	});

	it('должен иметь правильные aria-label атрибуты', () => {
		const onToggle = vi.fn();
		const onDelete = vi.fn();

		render(
			<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />
		);

		expect(
			screen.getByLabelText(/отметить задачу "Test task" как выполненную/i)
		).toBeInTheDocument();
		expect(
			screen.getByLabelText(/удалить задачу "Test task"/i)
		).toBeInTheDocument();
	});
});
