import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MAX_TODO_LENGTH } from '../../constants/todo';
import { TodoInput } from './TodoInput';

describe('TodoInput', () => {
	it('должен отображать поле ввода и кнопку', () => {
		const onAdd = vi.fn();

		render(<TodoInput onAdd={onAdd} />);

		expect(screen.getByPlaceholderText(/что нужно сделать/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /добавить задачу/i })).toBeInTheDocument();
	});

	it('должен обновлять значение поля при вводе', async () => {
		const user = userEvent.setup();
		const onAdd = vi.fn();

		render(<TodoInput onAdd={onAdd} />);

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		await user.type(input, 'New task');

		expect(input).toHaveValue('New task');
	});

	it('должен вызывать onAdd с введенным текстом при отправке формы', async () => {
		const user = userEvent.setup();
		const onAdd = vi.fn();

		render(<TodoInput onAdd={onAdd} />);

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		await user.type(input, 'New task');

		const button = screen.getByRole('button', { name: /добавить задачу/i });
		await user.click(button);

		expect(onAdd).toHaveBeenCalledWith('New task');
		expect(onAdd).toHaveBeenCalledTimes(1);
	});

	it('должен очищать поле после добавления задачи', async () => {
		const user = userEvent.setup();
		const onAdd = vi.fn();

		render(<TodoInput onAdd={onAdd} />);

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		await user.type(input, 'New task');

		const button = screen.getByRole('button', { name: /добавить задачу/i });
		await user.click(button);

		expect(input).toHaveValue('');
	});

	it('должен обрезать пробелы перед добавлением', async () => {
		const user = userEvent.setup();
		const onAdd = vi.fn();

		render(<TodoInput onAdd={onAdd} />);

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		await user.type(input, '  Task with spaces  ');

		const button = screen.getByRole('button', { name: /добавить задачу/i });
		await user.click(button);

		expect(onAdd).toHaveBeenCalledWith('Task with spaces');
	});

	it('не должен добавлять пустую задачу', async () => {
		const user = userEvent.setup();
		const onAdd = vi.fn();

		render(<TodoInput onAdd={onAdd} />);

		const button = screen.getByRole('button', { name: /добавить задачу/i });
		await user.click(button);

		expect(onAdd).not.toHaveBeenCalled();
		// Кнопка должна быть отключена при пустом вводе
		expect(button).toBeDisabled();
	});

	it('не должен добавлять задачу из одних пробелов', async () => {
		const user = userEvent.setup();
		const onAdd = vi.fn();

		render(<TodoInput onAdd={onAdd} />);

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		const button = screen.getByRole('button', { name: /добавить задачу/i });

		await user.type(input, '   ');

		// Кнопка должна быть отключена
		expect(button).toBeDisabled();

		await user.click(button);

		expect(onAdd).not.toHaveBeenCalled();
	});

	it('должен показывать ошибку при превышении максимальной длины', async () => {
		const user = userEvent.setup();
		const onAdd = vi.fn();

		render(<TodoInput onAdd={onAdd} />);

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		const longText = 'a'.repeat(MAX_TODO_LENGTH + 1);
		await user.type(input, longText);

		expect(screen.getByText(/максимальная длина задачи/i)).toBeInTheDocument();
	});

	it('должен отключать кнопку при пустом вводе', () => {
		const onAdd = vi.fn();

		render(<TodoInput onAdd={onAdd} />);

		const button = screen.getByRole('button', { name: /добавить задачу/i });
		expect(button).toBeDisabled();
	});

	it('должен отключать кнопку при превышении максимальной длины', async () => {
		const user = userEvent.setup();
		const onAdd = vi.fn();

		render(<TodoInput onAdd={onAdd} />);

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		const longText = 'a'.repeat(MAX_TODO_LENGTH + 1);
		await user.type(input, longText);

		const button = screen.getByRole('button', { name: /добавить задачу/i });
		expect(button).toBeDisabled();
	});

	it('должен поддерживать отправку формы по Enter', async () => {
		const user = userEvent.setup();
		const onAdd = vi.fn();

		render(<TodoInput onAdd={onAdd} />);

		const input = screen.getByPlaceholderText(/что нужно сделать/i);
		await user.type(input, 'New task');
		await user.keyboard('{Enter}');

		expect(onAdd).toHaveBeenCalledWith('New task');
	});
});
