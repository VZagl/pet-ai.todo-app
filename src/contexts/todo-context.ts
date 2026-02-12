import { createContext } from 'react';
import type { i_todo } from '../types/todo';

/** Значение контекста TODO: состояние и действия */
export interface i_todoContextValue {
	todos: i_todo[];
	activeCount: number;
	completedCount: number;
	addTodo: (text: string) => void;
	toggleTodo: (id: string) => void;
	deleteTodo: (id: string) => void;
	updateTodo: (id: string, text: string) => void;
}

export const TodoContext = createContext<i_todoContextValue | null>(null);
