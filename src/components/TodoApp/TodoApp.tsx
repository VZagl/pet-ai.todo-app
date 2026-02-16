import { useTranslation } from 'react-i18next';
import { useFilter } from '../../hooks/use-filter';
import { useTodoContext } from '../../hooks/use-todo-context';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { TodoFooter } from '../TodoFooter/TodoFooter';
import { TodoInput } from '../TodoInput/TodoInput';
import { TodoList } from '../TodoList/TodoList';
import './TodoApp.scss';

/**
 * Корневой компонент TODO приложения
 * Управляет состоянием и координирует взаимодействие между компонентами
 */
export const TodoApp = () => {
	const { t } = useTranslation();
	const { todos, activeCount, completedCount, addTodo } = useTodoContext();
	const { filter, setFilter, filteredTodos } = useFilter(todos);

	return (
		<div className='todo-app'>
			<div className='todo-app__container'>
				<header className='todo-app__header'>
					<LanguageSwitcher />
					<h1 className='todo-app__title'>{t('app.title')}</h1>
					<p className='todo-app__subtitle'>{t('app.subtitle')}</p>
				</header>

				<main className='todo-app__main'>
					<TodoInput onAdd={addTodo} />
					<div className='todo-app__list-area'>
						<TodoList todos={filteredTodos} />
					</div>
					{todos.length > 0 && (
						<TodoFooter activeCount={activeCount} completedCount={completedCount} currentFilter={filter} onFilterChange={setFilter} />
					)}
				</main>
			</div>
		</div>
	);
};
