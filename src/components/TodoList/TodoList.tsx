import React from 'react';
import type { Todo } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodoList.css';

interface TodoListProps {
	/** Массив задач для отображения */
	todos: Todo[];
	/** Обработчик переключения статуса задачи */
	onToggle: (id: string) => void;
	/** Обработчик удаления задачи */
	onDelete: (id: string) => void;
}

/**
 * Компонент списка задач
 * Отображает список TodoItem или сообщение о пустом списке
 */
export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
	if (todos.length === 0) {
		return (
			<div className='todo-list-empty'>
				<p className='todo-list-empty__message'>Нет задач для отображения</p>
			</div>
		);
	}

	return (
		<ul className='todo-list'>
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
			))}
		</ul>
	);
};
