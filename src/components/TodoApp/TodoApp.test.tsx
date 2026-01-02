import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { TodoApp } from './TodoApp';

describe('TodoApp - Integration', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('должен отображать заголовок приложения', () => {
		render(<TodoApp />);

		expect(screen.getByText('TODO')).toBeInTheDocument();
		expect(screen.getByText(/управление задачами/i)).toBeInTheDocument();
	});

	it('должен добавлять новую задачу', async () => {
		const user = userEvent.setup();

		render(<TodoApp />);

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		const button = screen.getByRole('button', { name: /добавить задачу/i });

		await user.type(input, 'New task');
		await user.click(button);

		expect(screen.getByText('New task')).toBeInTheDocument();
	});

	it('должен отмечать задачу как выполненную', async () => {
		const user = userEvent.setup();

		render(<TodoApp />);

		// Добавляем задачу
		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		await user.type(input, 'Task to complete');
		await user.click(screen.getByRole('button', { name: /добавить/i }));

		// Отмечаем как выполненную
		const checkbox = screen.getByRole('checkbox');
		await user.click(checkbox);

		expect(checkbox).toBeChecked();
	});

	it('должен удалять задачу', async () => {
		const user = userEvent.setup();

		render(<TodoApp />);

		// Добавляем задачу
		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		await user.type(input, 'Task to delete');
		await user.click(screen.getByRole('button', { name: /добавить/i }));

		expect(screen.getByText('Task to delete')).toBeInTheDocument();

		// Удаляем задачу
		const deleteButton = screen.getByRole('button', { name: /удалить/i });
		await user.click(deleteButton);

		expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
	});

	it('должен фильтровать активные задачи', async () => {
		const user = userEvent.setup();

		render(<TodoApp />);

		// Добавляем несколько задач
		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		const addButton = screen.getByRole('button', { name: /добавить/i });

		await user.type(input, 'Active task');
		await user.click(addButton);

		await user.type(input, 'Completed task');
		await user.click(addButton);

		// Отмечаем вторую задачу как выполненную
		const checkboxes = screen.getAllByRole('checkbox');
		await user.click(checkboxes[1]);

		// Фильтруем активные
		const activeFilter = screen.getByRole('button', { name: /показать активные/i });
		await user.click(activeFilter);

		expect(screen.getByText('Active task')).toBeInTheDocument();
		expect(screen.queryByText('Completed task')).not.toBeInTheDocument();
	});

	it('должен фильтровать завершенные задачи', async () => {
		const user = userEvent.setup();

		render(<TodoApp />);

		// Добавляем задачи
		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		const addButton = screen.getByRole('button', { name: /добавить/i });

		await user.type(input, 'Active task');
		await user.click(addButton);

		await user.type(input, 'Completed task');
		await user.click(addButton);

		// Отмечаем вторую задачу
		const checkboxes = screen.getAllByRole('checkbox');
		await user.click(checkboxes[1]);

		// Фильтруем завершенные
		const completedFilter = screen.getByRole('button', {
			name: /показать завершенные/i,
		});
		await user.click(completedFilter);

		expect(screen.queryByText('Active task')).not.toBeInTheDocument();
		expect(screen.getByText('Completed task')).toBeInTheDocument();
	});

	it('должен показывать правильный счетчик активных задач', async () => {
		const user = userEvent.setup();

		render(<TodoApp />);

		// Добавляем задачи
		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		const addButton = screen.getByRole('button', { name: /добавить/i });

		await user.type(input, 'Task 1');
		await user.click(addButton);

		await user.type(input, 'Task 2');
		await user.click(addButton);

		await user.type(input, 'Task 3');
		await user.click(addButton);

		// Проверяем счетчик
		expect(screen.getByText('3')).toBeInTheDocument();
		expect(screen.getByText(/осталось/i)).toBeInTheDocument();

		// Отмечаем одну задачу
		const checkbox = screen.getAllByRole('checkbox')[0];
		await user.click(checkbox);

		// Счетчик должен обновиться
		expect(screen.getByText('2')).toBeInTheDocument();
	});

	it('не должен показывать footer если нет задач', () => {
		render(<TodoApp />);

		expect(screen.queryByText(/осталось/i)).not.toBeInTheDocument();
	});

	it('должен сохранять задачи в localStorage', async () => {
		const user = userEvent.setup();

		render(<TodoApp />);

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		await user.type(input, 'Persistent task');
		await user.click(screen.getByRole('button', { name: /добавить/i }));

		// Проверяем localStorage
		const stored = localStorage.getItem('todos');
		expect(stored).not.toBeNull();

		const parsed = JSON.parse(stored!);
		expect(parsed).toHaveLength(1);
		expect(parsed[0].text).toBe('Persistent task');
	});
});
