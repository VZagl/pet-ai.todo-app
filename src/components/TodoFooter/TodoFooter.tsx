import { useTranslation } from 'react-i18next';
import type { FilterType } from '../../types/todo';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import './TodoFooter.scss';

interface i_todoFooterProps {
	/** Количество активных задач */
	activeCount: number;
	/** Количество завершённых задач */
	completedCount: number;
	/** Текущий активный фильтр */
	currentFilter: FilterType;
	/** Обработчик изменения фильтра */
	onFilterChange: (filter: FilterType) => void;
}

/**
 * Компонент подвала приложения
 * Отображает счётчик по фильтру и кнопки фильтров
 */
export const TodoFooter = ({
	activeCount,
	completedCount,
	currentFilter,
	onFilterChange,
}: i_todoFooterProps) => {
	const { t } = useTranslation();
	const totalCount = activeCount + completedCount;
	const taskWordActive = t('todoFooter.task', { count: activeCount });
	const taskWordCompleted = t('todoFooter.task', { count: completedCount });
	const leftWord = t('todoFooter.left', { count: activeCount });
	const completedWord = t('todoFooter.completed', { count: completedCount });

	let counterText: string;
	switch (currentFilter) {
		case 'all':
			counterText = t('todoFooter.counterAll', {
				active: activeCount,
				task: taskWordActive,
				left: leftWord,
				total: totalCount,
			});
			break;
		case 'active':
			counterText = t('todoFooter.counterActive', {
				count: activeCount,
				task: taskWordActive,
				left: leftWord,
			});
			break;
		case 'completed':
			counterText = t('todoFooter.counterCompleted', {
				count: completedCount,
				task: taskWordCompleted,
				completed: completedWord,
			});
			break;
		default:
			counterText = t('todoFooter.counterAll', {
				active: activeCount,
				task: taskWordActive,
				left: leftWord,
				total: totalCount,
			});
	}

	return (
		<footer className='todo-footer'>
			<div className='todo-footer__counter'>
				<span className='todo-footer__label'>{counterText}</span>
			</div>
			<TodoFilter currentFilter={currentFilter} onFilterChange={onFilterChange} />
		</footer>
	);
};
