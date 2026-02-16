import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MAX_TODO_LENGTH } from '../../constants/todo';
import './TodoInput.scss';

interface i_todoInputProps {
	/** Обработчик добавления новой задачи */
	onAdd: (text: string) => void;
}

/**
 * Компонент ввода новой задачи
 * Управляет локальным состоянием input поля и валидацией
 */
export const TodoInput = ({ onAdd }: i_todoInputProps) => {
	const { t } = useTranslation();
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);

		// Валидация длины
		if (value.length > MAX_TODO_LENGTH) {
			setError(t('todoInput.errorMaxLength', { max: MAX_TODO_LENGTH }));
		} else {
			setError('');
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const trimmedValue = inputValue.trim();

		// Валидация: пустая строка
		if (!trimmedValue) {
			setError(t('todoInput.errorEmpty'));
			return;
		}

		// Валидация: превышение длины
		if (trimmedValue.length > MAX_TODO_LENGTH) {
			setError(t('todoInput.errorMaxLength', { max: MAX_TODO_LENGTH }));
			return;
		}

		// Добавление задачи
		onAdd(trimmedValue);

		// Очистка поля и ошибок
		setInputValue('');
		setError('');
	};

	return (
		<form className='todo-input' onSubmit={handleSubmit}>
			<div className='todo-input__wrapper'>
				<input
					type='text'
					className={`todo-input__field ${error ? 'todo-input__field--error' : ''}`}
					placeholder={t('todoInput.placeholder')}
					value={inputValue}
					onChange={handleChange}
					aria-label={t('todoInput.ariaNewTask')}
					aria-invalid={!!error}
					aria-describedby={error ? 'todo-input-error' : undefined}
				/>
				<button
					type='submit'
					className='todo-input__button'
					disabled={!inputValue.trim() || inputValue.length > MAX_TODO_LENGTH}
					aria-label={t('todoInput.ariaAddTask')}
					data-testid='todo-input-add'
				>
					{t('todoInput.addButton')}
				</button>
			</div>
			{error && (
				<p id='todo-input-error' className='todo-input__error' role='alert'>
					{error}
				</p>
			)}
		</form>
	);
};
