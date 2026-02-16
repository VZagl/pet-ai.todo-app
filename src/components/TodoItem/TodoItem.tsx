import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTodoContext } from '../../hooks/use-todo-context';
import type { i_todo } from '../../types/todo';
import './TodoItem.scss';

interface i_todoItemProps {
	/** Объект задачи */
	todo: i_todo;
}

/**
 * Компонент элемента задачи
 * Отображает чекбокс, текст задачи и кнопку удаления
 */
export const TodoItem = memo(({ todo }: i_todoItemProps) => {
	const { t } = useTranslation();
	const { toggleTodo, deleteTodo } = useTodoContext();

	const handleToggle = () => {
		toggleTodo(todo.id);
	};

	const handleDelete = () => {
		deleteTodo(todo.id);
	};

	const toggleStatus = todo.completed ? t('todoItem.statusCompleted') : t('todoItem.statusActive');

	return (
		<li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
			<div className='todo-item__content'>
				<input
					type='checkbox'
					className='todo-item__checkbox'
					checked={todo.completed}
					onChange={handleToggle}
					aria-label={t('todoItem.ariaToggle', { text: todo.text, status: toggleStatus })}
				/>
				<span className='todo-item__text'>{todo.text}</span>
			</div>
			<button
				className='todo-item__delete'
				onClick={handleDelete}
				aria-label={t('todoItem.ariaDelete', { text: todo.text })}
				type='button'
				data-testid='todo-item-delete'
			>
				×
			</button>
		</li>
	);
});

TodoItem.displayName = 'TodoItem';
