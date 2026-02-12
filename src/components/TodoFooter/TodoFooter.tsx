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
 * Правильное склонение для русского языка (задача/задачи/задач)
 */
function getTaskWord(count: number): string {
	const lastDigit = count % 10;
	const lastTwoDigits = count % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		return 'задач';
	}
	if (lastDigit === 1) {
		return 'задача';
	}
	if (lastDigit >= 2 && lastDigit <= 4) {
		return 'задачи';
	}
	return 'задач';
}

/**
 * Формирует текст счётчика по фильтру (creative-app-redesign)
 */
function getCounterText(activeCount: number, completedCount: number, currentFilter: FilterType): string {
	const totalCount = activeCount + completedCount;

	switch (currentFilter) {
		case 'all':
			return `${activeCount} ${getTaskWord(activeCount)} осталось из ${totalCount}`;
		case 'active':
			return `${activeCount} ${getTaskWord(activeCount)} осталось`;
		case 'completed':
			return `${completedCount} ${getTaskWord(completedCount)} завершено`;
		default:
			return `${activeCount} ${getTaskWord(activeCount)} осталось из ${totalCount}`;
	}
}

/**
 * Компонент подвала приложения
 * Отображает счётчик по фильтру и кнопки фильтров
 */
export const TodoFooter = ({ activeCount, completedCount, currentFilter, onFilterChange }: i_todoFooterProps) => {
	const counterText = getCounterText(activeCount, completedCount, currentFilter);

	return (
		<footer className='todo-footer'>
			<div className='todo-footer__counter'>
				<span className='todo-footer__label'>{counterText}</span>
			</div>
			<TodoFilter currentFilter={currentFilter} onFilterChange={onFilterChange} />
		</footer>
	);
};
