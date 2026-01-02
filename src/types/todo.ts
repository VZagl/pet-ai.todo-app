/**
 * Интерфейс задачи (TODO item)
 */
export interface Todo {
	/** Уникальный идентификатор задачи */
	id: string;
	/** Текст задачи */
	text: string;
	/** Статус выполнения */
	completed: boolean;
	/** Временная метка создания (Unix timestamp) */
	createdAt: number;
}

/**
 * Тип фильтра для отображения задач
 */
export type FilterType = 'all' | 'active' | 'completed';

/**
 * Состояние приложения TODO
 */
export interface TodoState {
	/** Массив всех задач */
	todos: Todo[];
	/** Текущий активный фильтр */
	filter: FilterType;
}
