import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TodoProvider } from '../../contexts/TodoProvider';
import { useTodoContext } from '../../hooks/use-todo-context';
import type { i_todo } from '../../types/todo';
import { TodoItem } from './TodoItem';

vi.mock('../../hooks/use-todo-context', () => ({
	useTodoContext: vi.fn(() => ({
		todos: [],
		activeCount: 0,
		addTodo: vi.fn(),
		toggleTodo: vi.fn(),
		deleteTodo: vi.fn(),
		updateTodo: vi.fn(),
	})),
}));

function renderTodoItem(todo: i_todo) {
	return render(
		<TodoProvider>
			<TodoItem todo={todo} />
		</TodoProvider>,
	);
}

describe('TodoItem', () => {
	const mockTodo: i_todo = {
		id: '1',
		text: 'Test task',
		completed: false,
		createdAt: Date.now(),
	};

	it('должен отображать текст задачи', () => {
		renderTodoItem(mockTodo);

		expect(screen.getByText('Test task')).toBeInTheDocument();
	});

	it('должен отображать чекбокс', () => {
		renderTodoItem(mockTodo);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();
	});

	it('должен отображать чекбокс как отмеченный для завершенной задачи', () => {
		const completedTodo: i_todo = { ...mockTodo, completed: true };

		renderTodoItem(completedTodo);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeChecked();
	});

	it('должен вызывать toggleTodo при клике на чекбокс', async () => {
		const user = userEvent.setup();
		const toggleTodo = vi.fn();
		vi.mocked(useTodoContext).mockReturnValue({
			todos: [],
			activeCount: 0,
			addTodo: vi.fn(),
			toggleTodo,
			deleteTodo: vi.fn(),
			updateTodo: vi.fn(),
		});

		render(<TodoItem todo={mockTodo} />);

		const checkbox = screen.getByRole('checkbox');
		await user.click(checkbox);

		expect(toggleTodo).toHaveBeenCalledWith('1');
		expect(toggleTodo).toHaveBeenCalledTimes(1);
	});

	it('должен вызывать deleteTodo при клике на кнопку удаления', async () => {
		const user = userEvent.setup();
		const deleteTodo = vi.fn();
		vi.mocked(useTodoContext).mockReturnValue({
			todos: [],
			activeCount: 0,
			addTodo: vi.fn(),
			toggleTodo: vi.fn(),
			deleteTodo,
			updateTodo: vi.fn(),
		});

		render(<TodoItem todo={mockTodo} />);

		const deleteButton = screen.getByRole('button', { name: /удалить задачу/i });
		await user.click(deleteButton);

		expect(deleteTodo).toHaveBeenCalledWith('1');
		expect(deleteTodo).toHaveBeenCalledTimes(1);
	});

	it('должен применять класс completed для завершенной задачи', () => {
		const completedTodo: i_todo = { ...mockTodo, completed: true };

		const { container } = renderTodoItem(completedTodo);

		const todoItem = container.querySelector('.todo-item');
		expect(todoItem).toHaveClass('completed');
	});

	it('должен иметь правильные aria-label атрибуты', () => {
		renderTodoItem(mockTodo);

		expect(screen.getByLabelText(/отметить задачу "Test task" как выполненную/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/удалить задачу "Test task"/i)).toBeInTheDocument();
	});
});
