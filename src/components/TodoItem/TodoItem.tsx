import { memo } from 'react';
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
	const { toggleTodo, deleteTodo } = useTodoContext();

	const handleToggle = () => {
		toggleTodo(todo.id);
	};

	const handleDelete = () => {
		deleteTodo(todo.id);
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
