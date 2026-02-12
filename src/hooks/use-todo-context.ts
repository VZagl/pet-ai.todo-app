import { useContext } from 'react';
import type { i_todoContextValue } from '../contexts/todo-context';
import { TodoContext } from '../contexts/todo-context';

const TODO_PROVIDER_ERROR = 'useTodoContext must be used within TodoProvider';

/**
 * Хук доступа к контексту задач: список задач, счётчик активных и действия (добавить, переключить, удалить, обновить).
 * Использовать только внутри дерева, обёрнутого в TodoProvider; вне провайдера вызов приведёт к ошибке.
 * @returns значение контекста (todos, activeCount, addTodo, toggleTodo, deleteTodo, updateTodo)
 * @throws если вызван вне TodoProvider
 */
export function useTodoContext(): i_todoContextValue {
	const value = useContext(TodoContext);
	if (value === null) {
		throw new Error(TODO_PROVIDER_ERROR);
	}
	return value;
}
