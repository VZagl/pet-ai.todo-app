import type { ReactNode } from 'react';
import { useTodos } from '../hooks/use-todos';
import { TodoContext } from './todo-context';

/**
 * Провайдер контекста TODO. Инкапсулирует useTodos() и передаёт значение в контекст.
 */
export function TodoProvider({ children }: { children: ReactNode }) {
	const value = useTodos();
	return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
