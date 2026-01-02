import type { FilterType } from '../../types/todo';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import './TodoFooter.css';

interface TodoFooterProps {
	/** Количество активных задач */
	activeCount: number;
	/** Текущий активный фильтр */
	currentFilter: FilterType;
	/** Обработчик изменения фильтра */
	onFilterChange: (filter: FilterType) => void;
}

/**
 * Компонент подвала приложения
 * Отображает счетчик активных задач и фильтры
 */
export const TodoFooter = ({ activeCount, currentFilter, onFilterChange }: TodoFooterProps) => {
	// Правильное склонение для русского языка
	const getTaskWord = (count: number): string => {
		const lastDigit = count % 10;
		const lastTwoDigits = count % 100;

		// Исключения для 11-14
		if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
			return 'задач';
		}

		// Правила для последней цифры
		if (lastDigit === 1) {
			return 'задача';
		}
		if (lastDigit >= 2 && lastDigit <= 4) {
			return 'задачи';
		}
		return 'задач';
	};

	const taskWord = getTaskWord(activeCount);

	return (
		<footer className='todo-footer'>
			<div className='todo-footer__counter'>
				<span className='todo-footer__count'>{activeCount}</span>
				<span className='todo-footer__label'> {taskWord} осталось</span>
			</div>
			<TodoFilter currentFilter={currentFilter} onFilterChange={onFilterChange} />
		</footer>
	);
};
