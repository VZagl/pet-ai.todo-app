import React, { useState, FormEvent, ChangeEvent } from 'react';
import { MAX_TODO_LENGTH } from '../../constants/todo';
import './TodoInput.css';

interface TodoInputProps {
	/** Обработчик добавления новой задачи */
	onAdd: (text: string) => void;
}

/**
 * Компонент ввода новой задачи
 * Управляет локальным состоянием input поля и валидацией
 */
export const TodoInput = ({ onAdd }: TodoInputProps) => {
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);

		// Валидация длины
		if (value.length > MAX_TODO_LENGTH) {
			setError(`Максимальная длина задачи: ${MAX_TODO_LENGTH} символов`);
		} else {
			setError('');
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const trimmedValue = inputValue.trim();

		// Валидация: пустая строка
		if (!trimmedValue) {
			setError('Введите текст задачи');
			return;
		}

		// Валидация: превышение длины
		if (trimmedValue.length > MAX_TODO_LENGTH) {
			setError(`Максимальная длина задачи: ${MAX_TODO_LENGTH} символов`);
			return;
		}

		// Добавление задачи
		onAdd(trimmedValue);

		// Очистка поля и ошибок
		setInputValue('');
		setError('');
	};

	return (
		<form className="todo-input" onSubmit={handleSubmit}>
			<div className="todo-input__wrapper">
				<input
					type="text"
					className={`todo-input__field ${error ? 'todo-input__field--error' : ''}`}
					placeholder="Что нужно сделать?"
					value={inputValue}
					onChange={handleChange}
					aria-label="Новая задача"
					aria-invalid={!!error}
					aria-describedby={error ? 'todo-input-error' : undefined}
				/>
				<button
					type="submit"
					className="todo-input__button"
					disabled={!inputValue.trim() || inputValue.length > MAX_TODO_LENGTH}
					aria-label="Добавить задачу"
				>
					Добавить
				</button>
			</div>
			{error && (
				<p id="todo-input-error" className="todo-input__error" role="alert">
					{error}
				</p>
			)}
		</form>
	);
};
