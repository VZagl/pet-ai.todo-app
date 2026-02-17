import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TodoProvider } from '../../contexts/TodoProvider';
import { useTodoContext } from '../../hooks/use-todo-context';
import i18n from '../../i18n/config';
import type { i_todo } from '../../types/todo';
import { TodoItem } from './TodoItem';

vi.mock('../../hooks/use-todo-context', () => ({
	useTodoContext: vi.fn(() => ({
		todos: [],
		activeCount: 0,
		completedCount: 0,
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
	beforeEach(async () => {
		await i18n.changeLanguage('ru');
	});

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
			completedCount: 0,
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
			completedCount: 0,
			addTodo: vi.fn(),
			toggleTodo: vi.fn(),
			deleteTodo,
			updateTodo: vi.fn(),
		});

		render(<TodoItem todo={mockTodo} />);

		const deleteButton = screen.getByTestId('todo-item-delete');
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

	describe('Inline-редактирование', () => {
		it('должен переводить в режим редактирования при клике по кнопке редактирования', async () => {
			const user = userEvent.setup();
			renderTodoItem(mockTodo);

			const editButton = screen.getByTestId('todo-item-edit');
			await user.click(editButton);

			expect(screen.getByTestId('todo-item-edit-input')).toBeInTheDocument();
			expect(screen.getByTestId('todo-item-save')).toBeInTheDocument();
			expect(screen.getByTestId('todo-item-cancel')).toBeInTheDocument();
		});

		it('двойной клик по тексту не должен переводить в режим редактирования', async () => {
			const user = userEvent.setup();
			renderTodoItem(mockTodo);

			const text = screen.getByText('Test task');
			await user.dblClick(text);

			expect(screen.queryByTestId('todo-item-edit-input')).not.toBeInTheDocument();
		});

		it('должен вызывать updateTodo при сохранении через Enter', async () => {
			const user = userEvent.setup();
			const updateTodo = vi.fn();
			vi.mocked(useTodoContext).mockReturnValue({
				todos: [],
				activeCount: 0,
				completedCount: 0,
				addTodo: vi.fn(),
				toggleTodo: vi.fn(),
				deleteTodo: vi.fn(),
				updateTodo,
			});
			render(<TodoItem todo={mockTodo} />);

			await user.click(screen.getByTestId('todo-item-edit'));
			const input = screen.getByTestId('todo-item-edit-input');
			await user.clear(input);
			await user.type(input, 'Updated task');
			await user.keyboard('{Enter}');

			expect(updateTodo).toHaveBeenCalledWith('1', 'Updated task');
			expect(updateTodo).toHaveBeenCalledTimes(1);
		});

		it('должен отменять редактирование по Escape без вызова updateTodo', async () => {
			const user = userEvent.setup();
			const updateTodo = vi.fn();
			vi.mocked(useTodoContext).mockReturnValue({
				todos: [],
				activeCount: 0,
				completedCount: 0,
				addTodo: vi.fn(),
				toggleTodo: vi.fn(),
				deleteTodo: vi.fn(),
				updateTodo,
			});
			render(<TodoItem todo={mockTodo} />);

			await user.click(screen.getByTestId('todo-item-edit'));
			const input = screen.getByTestId('todo-item-edit-input');
			await user.clear(input);
			await user.type(input, 'Changed text');
			await user.keyboard('{Escape}');

			expect(updateTodo).not.toHaveBeenCalled();
			expect(screen.getByText('Test task')).toBeInTheDocument();
		});

		it('должен отменять редактирование при клике на кнопку «Отмена»', async () => {
			const user = userEvent.setup();
			const updateTodo = vi.fn();
			vi.mocked(useTodoContext).mockReturnValue({
				todos: [],
				activeCount: 0,
				completedCount: 0,
				addTodo: vi.fn(),
				toggleTodo: vi.fn(),
				deleteTodo: vi.fn(),
				updateTodo,
			});
			render(<TodoItem todo={mockTodo} />);

			await user.click(screen.getByTestId('todo-item-edit'));
			const input = screen.getByTestId('todo-item-edit-input');
			await user.clear(input);
			await user.type(input, 'Changed text');
			await user.click(screen.getByTestId('todo-item-cancel'));

			expect(updateTodo).not.toHaveBeenCalled();
			expect(screen.getByText('Test task')).toBeInTheDocument();
		});

		it('должен сохранять изменения при клике на кнопку «Сохранить»', async () => {
			const user = userEvent.setup();
			const updateTodo = vi.fn();
			vi.mocked(useTodoContext).mockReturnValue({
				todos: [],
				activeCount: 0,
				completedCount: 0,
				addTodo: vi.fn(),
				toggleTodo: vi.fn(),
				deleteTodo: vi.fn(),
				updateTodo,
			});
			render(<TodoItem todo={mockTodo} />);

			await user.click(screen.getByTestId('todo-item-edit'));
			const input = screen.getByTestId('todo-item-edit-input');
			await user.clear(input);
			await user.type(input, 'New text');
			await user.click(screen.getByTestId('todo-item-save'));

			expect(updateTodo).toHaveBeenCalledWith('1', 'New text');
			expect(updateTodo).toHaveBeenCalledTimes(1);
		});

		it('не должен сохранять пустую строку (валидация)', async () => {
			const user = userEvent.setup();
			const updateTodo = vi.fn();
			vi.mocked(useTodoContext).mockReturnValue({
				todos: [],
				activeCount: 0,
				completedCount: 0,
				addTodo: vi.fn(),
				toggleTodo: vi.fn(),
				deleteTodo: vi.fn(),
				updateTodo,
			});
			render(<TodoItem todo={mockTodo} />);

			await user.click(screen.getByTestId('todo-item-edit'));
			const input = screen.getByTestId('todo-item-edit-input');
			await user.clear(input);
			await user.click(screen.getByTestId('todo-item-save'));

			expect(updateTodo).not.toHaveBeenCalled();
			expect(screen.getByTestId('todo-item-edit-input')).toBeInTheDocument();
		});

		it('кнопки редактирования и удаления disabled в режиме редактирования; после выхода disabled 400 ms, затем enabled', async () => {
			vi.useFakeTimers();
			renderTodoItem(mockTodo);

			fireEvent.click(screen.getByTestId('todo-item-edit'));

			expect(screen.queryByTestId('todo-item-edit')).not.toBeInTheDocument();
			expect(screen.queryByTestId('todo-item-delete')).not.toBeInTheDocument();

			fireEvent.click(screen.getByTestId('todo-item-save'));

			expect(screen.getByTestId('todo-item-edit')).toBeDisabled();
			expect(screen.getByTestId('todo-item-delete')).toBeDisabled();

			act(() => {
				vi.advanceTimersByTime(400);
			});

			expect(screen.getByTestId('todo-item-edit')).not.toBeDisabled();
			expect(screen.getByTestId('todo-item-delete')).not.toBeDisabled();

			vi.useRealTimers();
		});
	});
});
