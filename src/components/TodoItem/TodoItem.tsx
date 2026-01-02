import { memo } from 'react';
import type { Todo } from '../../types/todo';
import './TodoItem.css';

interface TodoItemProps {
	/** Объект задачи */
	todo: Todo;
	/** Обработчик переключения статуса */
	onToggle: (id: string) => void;
	/** Обработчик удаления */
	onDelete: (id: string) => void;
}

/**
 * Компонент элемента задачи
 * Отображает чекбокс, текст задачи и кнопку удаления
 */
export const TodoItem = memo(({ todo, onToggle, onDelete }: TodoItemProps) => {
	const handleToggle = () => {
		onToggle(todo.id);
	};

	const handleDelete = () => {
		onDelete(todo.id);
	};

	return (
		<li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
			<div className='todo-item__content'>
				<input
					type='checkbox'
					className='todo-item__checkbox'
					checked={todo.completed}
					onChange={handleToggle}
					aria-label={`Отметить задачу "${todo.text}" как ${todo.completed ? 'невыполненную' : 'выполненную'}`}
				/>
				<span className='todo-item__text'>{todo.text}</span>
			</div>
			<button className='todo-item__delete' onClick={handleDelete} aria-label={`Удалить задачу "${todo.text}"`} type='button'>
				×
			</button>
		</li>
	);
});

TodoItem.displayName = 'TodoItem';
