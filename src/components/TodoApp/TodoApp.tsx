import { useFilter } from '../../hooks/useFilter';
import { useTodos } from '../../hooks/useTodos';
import { TodoFooter } from '../TodoFooter/TodoFooter';
import { TodoInput } from '../TodoInput/TodoInput';
import { TodoList } from '../TodoList/TodoList';
import './TodoApp.scss';

/**
 * Корневой компонент TODO приложения
 * Управляет состоянием и координирует взаимодействие между компонентами
 */
export const TodoApp = () => {
	// Управление задачами
	const { todos, activeCount, addTodo, toggleTodo, deleteTodo } = useTodos();

	// Управление фильтрацией
	const { filter, setFilter, filteredTodos } = useFilter(todos);

	return (
		<div className='todo-app'>
			<div className='todo-app__container'>
				<header className='todo-app__header'>
					<h1 className='todo-app__title'>TODO</h1>
					<p className='todo-app__subtitle'>Управление задачами</p>
				</header>

				<main className='todo-app__main'>
					<TodoInput onAdd={addTodo} />
					<TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
					{todos.length > 0 && <TodoFooter activeCount={activeCount} currentFilter={filter} onFilterChange={setFilter} />}
				</main>
			</div>
		</div>
	);
};
