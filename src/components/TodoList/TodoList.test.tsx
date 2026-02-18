import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TodoProvider } from '../../contexts/TodoProvider';
import i18n from '../../i18n/config';
import type { i_todo } from '../../types/todo';
import { TodoList } from './TodoList';

function renderTodoList(todos: i_todo[]) {
	return render(
		<TodoProvider>
			<TodoList todos={todos} />
		</TodoProvider>,
	);
}

describe('TodoList', () => {
	beforeEach(async () => {
		await i18n.changeLanguage('ru');
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	const mockTodos: i_todo[] = [
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
		renderTodoList(mockTodos);

		expect(screen.getByText('Task 1')).toBeInTheDocument();
		expect(screen.getByText('Task 2')).toBeInTheDocument();
		expect(screen.getByText('Task 3')).toBeInTheDocument();
	});

	it('должен отображать сообщение о пустом списке', () => {
		renderTodoList([]);

		expect(screen.getByText(/нет задач для отображения/i)).toBeInTheDocument();
	});

	it('должен отображать правильное количество элементов', () => {
		const { container } = renderTodoList(mockTodos);

		const listItems = container.querySelectorAll('.todo-item');
		expect(listItems).toHaveLength(3);
	});

	it('должен передавать обработчики в TodoItem', () => {
		renderTodoList(mockTodos);

		// Проверяем, что компоненты отрисовались (косвенная проверка передачи props)
		// 3 чекбокса + 3 grip + 3 edit + 3 delete = 12 интерактивных элементов
		expect(screen.getAllByRole('checkbox')).toHaveLength(3);
		expect(screen.getAllByTestId('todo-item-grip')).toHaveLength(3);
		expect(screen.getAllByTestId('todo-item-edit')).toHaveLength(3);
		expect(screen.getAllByTestId('todo-item-delete')).toHaveLength(3);
	});

	it('должен использовать id задачи как key', () => {
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		// Сценарий 1: Уникальные id - ошибок быть не должно
		const { rerender } = render(
			<TodoProvider>
				<TodoList todos={mockTodos} />
			</TodoProvider>,
		);

		expect(consoleErrorSpy).not.toHaveBeenCalled();
		consoleErrorSpy.mockClear();

		// Сценарий 2: Дубликаты id - должна появиться ошибка
		const todosWithDuplicate = [mockTodos[0], ...mockTodos];
		rerender(
			<TodoProvider>
				<TodoList todos={todosWithDuplicate} />
			</TodoProvider>,
		);

		expect(consoleErrorSpy).toHaveBeenCalled();
		expect(consoleErrorSpy.mock.calls[0][0]).toContain('key');
	});
});
