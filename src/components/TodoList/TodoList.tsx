import type { i_todo } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodoList.scss';

interface i_todoListProps {
	/** Массив задач для отображения */
	todos: i_todo[];
}

/**
 * Компонент списка задач
 * Отображает список TodoItem или сообщение о пустом списке
 */
export const TodoList = ({ todos }: i_todoListProps) => {
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
				<TodoItem key={todo.id} todo={todo} />
			))}
		</ul>
	);
};
