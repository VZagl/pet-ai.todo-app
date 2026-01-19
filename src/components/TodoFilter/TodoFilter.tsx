import { FILTERS, FILTER_LABELS } from '../../constants/todo';
import type { FilterType } from '../../types/todo';
import './TodoFilter.scss';

interface TodoFilterProps {
	/** Текущий активный фильтр */
	currentFilter: FilterType;
	/** Обработчик изменения фильтра */
	onFilterChange: (filter: FilterType) => void;
}

/**
 * Компонент фильтрации задач
 * Отображает кнопки для переключения между фильтрами
 */
export const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
	return (
		<div className='todo-filter' role='group' aria-label='Фильтр задач'>
			{FILTERS.map((filter) => (
				<button
					key={filter}
					type='button'
					className={`todo-filter__button ${currentFilter === filter ? 'todo-filter__button--active' : ''}`}
					onClick={() => onFilterChange(filter)}
					aria-pressed={currentFilter === filter}
					aria-label={`Показать ${FILTER_LABELS[filter].toLowerCase()} задачи`}
				>
					{FILTER_LABELS[filter]}
				</button>
			))}
		</div>
	);
};
