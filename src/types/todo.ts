/**
 * Интерфейс задачи (TODO item)
 */
export interface i_todo {
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
export interface i_todoState {
	/** Массив всех задач */
	todos: i_todo[];
	/** Текущий активный фильтр */
	filter: FilterType;
}
