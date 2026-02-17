import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import checkIcon from '../../assets/check.svg';
import closeIcon from '../../assets/close.svg';
import editIcon from '../../assets/edit.svg';
import { MAX_TODO_LENGTH } from '../../constants/todo';
import { useTodoContext } from '../../hooks/use-todo-context';
import type { i_todo } from '../../types/todo';
import './TodoItem.scss';

const ACTION_BUTTONS_DELAY_MS = 400;

interface i_todoItemProps {
	/** Объект задачи */
	todo: i_todo;
}

/**
 * Компонент элемента задачи
 * Отображает чекбокс, текст задачи, кнопки редактирования и удаления.
 * Inline-редактирование доступно только через кнопку редактирования.
 */
export const TodoItem = memo(({ todo }: i_todoItemProps) => {
	const { t } = useTranslation();
	const { toggleTodo, deleteTodo, updateTodo } = useTodoContext();

	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState('');
	const [error, setError] = useState('');
	const [actionButtonsEnabled, setActionButtonsEnabled] = useState(true);
	const inputRef = useRef<HTMLInputElement>(null);
	const delayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const toggleStatus = todo.completed ? t('todoItem.statusCompleted') : t('todoItem.statusActive');

	const enterEditMode = useCallback(() => {
		setIsEditing(true);
		setEditValue(todo.text);
		setError('');
		setActionButtonsEnabled(false);
	}, [todo.text]);

	const exitEditMode = useCallback(() => {
		setIsEditing(false);
		setError('');
		setActionButtonsEnabled(false);
		if (delayTimeoutRef.current) {
			clearTimeout(delayTimeoutRef.current);
			delayTimeoutRef.current = null;
		}
		delayTimeoutRef.current = setTimeout(() => {
			setActionButtonsEnabled(true);
			delayTimeoutRef.current = null;
		}, ACTION_BUTTONS_DELAY_MS);
	}, []);

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
			inputRef.current?.select();
		}
	}, [isEditing]);

	useEffect(() => {
		return () => {
			if (delayTimeoutRef.current) {
				clearTimeout(delayTimeoutRef.current);
			}
		};
	}, []);

	const handleSave = useCallback(() => {
		const trimmedValue = editValue.trim();

		if (!trimmedValue) {
			setError(t('todoItem.errorEmpty'));
			return;
		}

		if (trimmedValue.length > MAX_TODO_LENGTH) {
			setError(t('todoItem.errorMaxLength', { max: MAX_TODO_LENGTH }));
			return;
		}

		updateTodo(todo.id, trimmedValue);
		exitEditMode();
	}, [editValue, todo.id, updateTodo, exitEditMode, t]);

	const handleCancel = useCallback(() => {
		setEditValue(todo.text);
		exitEditMode();
	}, [todo.text, exitEditMode]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				handleSave();
			} else if (e.key === 'Escape') {
				e.preventDefault();
				e.stopPropagation();
				handleCancel();
			}
		},
		[handleSave, handleCancel],
	);

	const handleToggle = () => {
		toggleTodo(todo.id);
	};

	const handleDelete = () => {
		deleteTodo(todo.id);
	};

	return (
		<li className={`todo-item ${todo.completed ? 'completed' : ''} ${error ? 'todo-item--error' : ''}`}>
			<div className={`todo-item__content ${isEditing ? 'todo-item__content--editing' : ''}`}>
				<input
					type='checkbox'
					className='todo-item__checkbox'
					checked={todo.completed}
					onChange={handleToggle}
					aria-label={t('todoItem.ariaToggle', { text: todo.text, status: toggleStatus })}
				/>

				{isEditing ? (
					<>
						<div className='todo-item__edit-wrapper'>
							<input
								ref={inputRef}
								type='text'
								className={`todo-item__edit ${error ? 'todo-item__edit--error' : ''}`}
								value={editValue}
								onChange={(e) => {
									setEditValue(e.target.value);
									if (e.target.value.length > MAX_TODO_LENGTH) {
										setError(t('todoItem.errorMaxLength', { max: MAX_TODO_LENGTH }));
									} else {
										setError('');
									}
								}}
								onKeyDown={handleKeyDown}
								aria-label={t('todoItem.ariaEditInput')}
								aria-invalid={!!error}
								aria-describedby={error ? 'todo-item-edit-error' : undefined}
								data-testid='todo-item-edit-input'
							/>
						</div>
						<button
							type='button'
							className='todo-item__btn todo-item__btn--save'
							onClick={handleSave}
							aria-label={t('todoItem.ariaSave')}
							data-testid='todo-item-save'
						>
							<img src={checkIcon} alt='' aria-hidden />
						</button>
						<button
							type='button'
							className='todo-item__btn todo-item__btn--cancel'
							onClick={handleCancel}
							aria-label={t('todoItem.ariaCancel')}
							data-testid='todo-item-cancel'
						>
							<img src={closeIcon} alt='' aria-hidden />
						</button>
					</>
				) : (
					<>
						<span className='todo-item__text'>{todo.text}</span>
						<button
							className='todo-item__btn todo-item__btn--edit'
							onClick={enterEditMode}
							disabled={!actionButtonsEnabled}
							aria-label={t('todoItem.ariaEdit', { text: todo.text })}
							type='button'
							data-testid='todo-item-edit'
						>
							<img src={editIcon} alt='' aria-hidden />
						</button>
						<button
							className='todo-item__btn todo-item__btn--delete'
							onClick={handleDelete}
							disabled={!actionButtonsEnabled}
							aria-label={t('todoItem.ariaDelete', { text: todo.text })}
							type='button'
							data-testid='todo-item-delete'
						>
							×
						</button>
					</>
				)}
			</div>
			{error && (
				<p id='todo-item-edit-error' className='todo-item__error' role='alert'>
					{error}
				</p>
			)}
		</li>
	);
});

TodoItem.displayName = 'TodoItem';
