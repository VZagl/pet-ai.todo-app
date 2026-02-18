import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { STORAGE_KEY } from '../../constants/todo';
import { ThemeProvider } from '../../contexts/ThemeProvider';
import { TodoProvider } from '../../contexts/TodoProvider';
import { TodoApp } from './TodoApp';

function renderTodoApp() {
	return render(
		<ThemeProvider>
			<TodoProvider>
				<TodoApp />
			</TodoProvider>
		</ThemeProvider>,
	);
}

describe('TodoApp - Integration', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('должен отображать заголовок приложения', () => {
		renderTodoApp();

		expect(screen.getByText('TODO')).toBeInTheDocument();
		expect(screen.getByText(/управление задачами/i)).toBeInTheDocument();
	});

	it('должен добавлять новую задачу', async () => {
		const user = userEvent.setup();

		renderTodoApp();

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		const button = screen.getByRole('button', { name: /добавить задачу/i });

		await user.type(input, 'New task');
		await user.click(button);

		expect(screen.getByText('New task')).toBeInTheDocument();
	});

	it('должен отмечать задачу как выполненную', async () => {
		const user = userEvent.setup();

		renderTodoApp();

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

		renderTodoApp();

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

		renderTodoApp();

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

		renderTodoApp();

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

		renderTodoApp();

		// Добавляем задачи
		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		const addButton = screen.getByRole('button', { name: /добавить/i });

		await user.type(input, 'Task 1');
		await user.click(addButton);

		await user.type(input, 'Task 2');
		await user.click(addButton);

		await user.type(input, 'Task 3');
		await user.click(addButton);

		// Проверяем счётчик (формат «X задач осталось из Y»)
		const footer = screen.getByRole('contentinfo');
		expect(within(footer).getByText(/3 задачи осталось из 3/)).toBeInTheDocument();

		// Отмечаем одну задачу
		const checkbox = screen.getAllByRole('checkbox')[0];
		await user.click(checkbox);

		// Счётчик должен обновиться: 2 активных из 3
		expect(within(footer).getByText(/2 задачи осталось из 3/)).toBeInTheDocument();
	});

	it('счетчик отображается только в footer, а не в названиях задач', async () => {
		const user = userEvent.setup();
		renderTodoApp();

		// Создаем ситуацию, когда число "5" может быть в разных местах
		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		await user.type(input, 'Задача номер 5');
		await user.click(screen.getByRole('button', { name: /добавить/i }));

		// Добавляем еще задачи, чтобы счетчик стал "5"
		for (let i = 1; i <= 4; i++) {
			await user.clear(input);
			await user.type(input, `Задача ${i}`);
			await user.click(screen.getByRole('button', { name: /добавить/i }));
		}

		// Позитивная проверка: счётчик «5 задач осталось из 5» в footer
		const footer = screen.getByRole('contentinfo');
		expect(within(footer).getByText(/5 задач осталось из 5/)).toBeInTheDocument();

		// Проверяем, что число "5" есть и в названии задачи, и в счётчике
		const taskList = screen.getByRole('list');
		expect(within(taskList).getByText(/5/)).toBeInTheDocument(); // В названии задачи
		expect(within(footer).getByText(/5 задач осталось/)).toBeInTheDocument(); // В счётчике
		// Оба элемента существуют, но within() позволяет различить их
	}, 10000);

	it('текст "осталось" отображается только в footer, а не в названиях задач', async () => {
		const user = userEvent.setup();
		renderTodoApp();

		// Создаем ситуацию, когда слово "осталось" может быть в разных местах
		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		await user.type(input, 'Задача, которая осталось невыполненной');
		await user.click(screen.getByRole('button', { name: /добавить/i }));

		// Добавляем еще одну задачу, чтобы счетчик показал "2 задачи осталось"
		await user.type(input, 'Еще одна задача');
		await user.click(screen.getByRole('button', { name: /добавить/i }));

		// Позитивная проверка: счётчик «2 задачи осталось из 2» в footer
		const footer = screen.getByRole('contentinfo');
		expect(within(footer).getByText(/2 задачи осталось из 2/)).toBeInTheDocument();

		// «осталось» есть и в названии задачи, и в счётчике
		const taskList = screen.getByRole('list');
		expect(within(taskList).getByText(/осталось/i)).toBeInTheDocument(); // В названии задачи
		expect(within(footer).getByText(/осталось/i)).toBeInTheDocument(); // В счётчике
		// Оба элемента существуют, но within() позволяет различить их
	});

	it('не должен показывать footer если нет задач', () => {
		renderTodoApp();

		expect(screen.queryByText(/осталось/i)).not.toBeInTheDocument();
	});

	it('должен сохранять задачи в localStorage', async () => {
		const user = userEvent.setup();

		renderTodoApp();

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		await user.type(input, 'Persistent task');
		await user.click(screen.getByRole('button', { name: /добавить/i }));

		// Ждём появления задачи (гарантирует применение state и effect)
		expect(await screen.findByText('Persistent task')).toBeInTheDocument();

		// Проверяем localStorage
		const stored = localStorage.getItem(STORAGE_KEY);
		expect(stored).not.toBeNull();

		const parsed = JSON.parse(stored!);
		expect(parsed).toHaveLength(1);
		expect(parsed[0].text).toBe('Persistent task');
	});
});
