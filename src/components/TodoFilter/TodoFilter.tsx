import { FILTERS, FILTER_LABELS } from '../../constants/todo';
import type { FilterType } from '../../types/todo';
import './TodoFilter.scss';

interface i_todoFilterProps {
	/** Текущий активный фильтр */
	currentFilter: FilterType;
	/** Обработчик изменения фильтра */
	onFilterChange: (filter: FilterType) => void;
}

/**
 * Компонент фильтрации задач
 * Отображает кнопки для переключения между фильтрами
 */
export const TodoFilter = ({ currentFilter, onFilterChange }: i_todoFilterProps) => {
	return (
		<div className='todo-filter' role='group' aria-label='Фильтр задач'>
			{FILTERS.map((filter) => {
				const isActive = currentFilter === filter;
				return (
					<button
						key={filter}
						type='button'
						className={`todo-filter__button ${isActive ? 'todo-filter__button--active' : ''}`}
						disabled={isActive}
						onClick={() => {
							if (!isActive) onFilterChange(filter);
						}}
						aria-pressed={isActive}
						aria-label={`Показать ${FILTER_LABELS[filter].toLowerCase()} задачи`}
					>
						{FILTER_LABELS[filter]}
					</button>
				);
			})}
		</div>
	);
};
