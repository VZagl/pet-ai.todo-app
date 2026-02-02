import { useContext } from 'react';
import type { i_todoContextValue } from '../contexts/todo-context';
import { TodoContext } from '../contexts/todo-context';

const TODO_PROVIDER_ERROR = 'useTodoContext must be used within TodoProvider';

/**
 * Хук доступа к значению контекста TODO (состояние и действия из useTodos).
 * @throws если вызван вне TodoProvider
 */
export function useTodoContext(): i_todoContextValue {
	const value = useContext(TodoContext);
	if (value === null) {
		throw new Error(TODO_PROVIDER_ERROR);
	}
	return value;
}
