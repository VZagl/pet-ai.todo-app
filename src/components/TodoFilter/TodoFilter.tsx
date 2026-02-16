import { useTranslation } from 'react-i18next';
import { FILTERS } from '../../constants/todo';
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
	const { t } = useTranslation();

	return (
		<div className='todo-filter' role='group' aria-label={t('todoFilter.ariaGroup')}>
			{FILTERS.map((filter) => {
				const isActive = currentFilter === filter;
				const filterLabel = t(`todoFilter.${filter}`);
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
						aria-label={t('todoFilter.ariaShow', { filter: filterLabel.toLowerCase() })}
						data-testid={`todo-filter-${filter}`}
					>
						{filterLabel}
					</button>
				);
			})}
		</div>
	);
};
