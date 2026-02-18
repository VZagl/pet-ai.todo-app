import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import i18n from '../../i18n/config';
import type { FilterType } from '../../types/todo';
import { TodoFooter } from './TodoFooter';

describe('TodoFooter', () => {
	const mockOnFilterChange = vi.fn();

	/** Props по умолчанию для TodoFooter (формат по фильтру) */
	const getProps = (overrides?: {
		activeCount?: number;
		completedCount?: number;
		currentFilter?: FilterType;
	}) => ({
		activeCount: 5,
		completedCount: 7,
		currentFilter: 'all' as FilterType,
		onFilterChange: mockOnFilterChange,
		...overrides,
	});

	beforeEach(async () => {
		await i18n.changeLanguage('ru');
		mockOnFilterChange.mockClear();
	});

	describe('Rendering', () => {
		it('должен отрендерить элемент footer', () => {
			render(<TodoFooter {...getProps({ activeCount: 0, completedCount: 0 })} />);

			const footer = screen.getByRole('contentinfo');
			expect(footer).toBeInTheDocument();
			expect(footer).toHaveClass('todo-footer');
		});

		it('должен отрендерить счётчик и кнопки фильтров', () => {
			render(<TodoFooter {...getProps()} />);

			const footer = screen.getByRole('contentinfo');
			expect(within(footer).getByText(/5 задач осталось из 12/)).toBeInTheDocument();
			expect(screen.getByText('Все')).toBeInTheDocument();
			expect(screen.getByText('Активные')).toBeInTheDocument();
			expect(screen.getByText('Завершенные')).toBeInTheDocument();
		});
	});

	describe('Отображение счётчика', () => {
		it('фильтр all: формат «X задач осталось из Y»', () => {
			render(<TodoFooter {...getProps({ activeCount: 5, completedCount: 7 })} />);
			const footer = screen.getByRole('contentinfo');
			expect(within(footer).getByText(/5 задач осталось из 12/)).toBeInTheDocument();
		});

		it('фильтр all: склонение задача/задачи/задач', () => {
			const { rerender } = render(<TodoFooter {...getProps({ activeCount: 1, completedCount: 0 })} />);
			expect(screen.getByText(/1 задача осталась из 1/)).toBeInTheDocument();

			rerender(<TodoFooter {...getProps({ activeCount: 2, completedCount: 1 })} />);
			expect(screen.getByText(/2 задачи осталось из 3/)).toBeInTheDocument();

			rerender(<TodoFooter {...getProps({ activeCount: 5, completedCount: 3 })} />);
			expect(screen.getByText(/5 задач осталось из 8/)).toBeInTheDocument();
		});

		it('фильтр active: формат «X задач осталось»', () => {
			render(<TodoFooter {...getProps({ activeCount: 5, completedCount: 7, currentFilter: 'active' })} />);
			expect(screen.getByText(/5 задач осталось/)).toBeInTheDocument();
			expect(screen.queryByText(/из 12/)).not.toBeInTheDocument();
		});

		it('фильтр completed: формат «X задач завершено»', () => {
			render(<TodoFooter {...getProps({ activeCount: 5, completedCount: 7, currentFilter: 'completed' })} />);
			expect(screen.getByText(/7 задач завершено/)).toBeInTheDocument();
		});

		it('фильтр completed: склонение завершено', () => {
			const { rerender } = render(
				<TodoFooter {...getProps({ activeCount: 0, completedCount: 1, currentFilter: 'completed' })} />,
			);
			expect(screen.getByText(/1 задача завершена/)).toBeInTheDocument();

			rerender(
				<TodoFooter {...getProps({ activeCount: 0, completedCount: 2, currentFilter: 'completed' })} />,
			);
			expect(screen.getByText(/2 задачи завершено/)).toBeInTheDocument();
		});
	});

	describe('Интеграция фильтра', () => {
		it('передаёт currentFilter в TodoFilter', () => {
			render(<TodoFooter {...getProps({ currentFilter: 'active' })} />);
			const activeButton = screen.getByText('Активные');
			expect(activeButton).toHaveClass('todo-filter__button--active');
		});

		it('вызывает onFilterChange при клике', async () => {
			const user = userEvent.setup();
			render(<TodoFooter {...getProps()} />);
			const activeButton = screen.getByText('Активные');
			await user.click(activeButton);
			expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
			expect(mockOnFilterChange).toHaveBeenCalledWith('active');
		});

		it('обновляет активную кнопку при смене фильтра', () => {
			const { rerender } = render(<TodoFooter {...getProps()} />);
			expect(screen.getByText('Все')).toHaveClass('todo-filter__button--active');

			rerender(<TodoFooter {...getProps({ currentFilter: 'completed' })} />);
			expect(screen.getByText('Все')).not.toHaveClass('todo-filter__button--active');
			expect(screen.getByText('Завершенные')).toHaveClass('todo-filter__button--active');
		});
	});

	describe('Обновление счётчика', () => {
		it('обновляет текст при изменении activeCount/completedCount', () => {
			const { rerender } = render(<TodoFooter {...getProps({ activeCount: 5, completedCount: 7 })} />);
			expect(screen.getByText(/5 задач осталось из 12/)).toBeInTheDocument();

			rerender(<TodoFooter {...getProps({ activeCount: 1, completedCount: 0 })} />);
			expect(screen.getByText(/1 задача осталась из 1/)).toBeInTheDocument();
		});

		it('обновляет склонение при изменении count', () => {
			const { rerender } = render(<TodoFooter {...getProps({ activeCount: 1, completedCount: 0 })} />);
			expect(screen.getByText(/задача осталась/)).toBeInTheDocument();

			rerender(<TodoFooter {...getProps({ activeCount: 2, completedCount: 1 })} />);
			expect(screen.getByText(/задачи осталось/)).toBeInTheDocument();

			rerender(<TodoFooter {...getProps({ activeCount: 5, completedCount: 0 })} />);
			expect(screen.getByText(/задач осталось/)).toBeInTheDocument();
		});
	});

	describe('Граничные случаи', () => {
		it('обрабатывает отрицательный activeCount', () => {
			render(<TodoFooter {...getProps({ activeCount: -1, completedCount: 0 })} />);
			// i18n plural: -1 → one (задача), компонент не падает
			expect(screen.getByText(/-1 .+ (осталась|осталось) из -1/)).toBeInTheDocument();
		});

		it('обрабатывает большое число', () => {
			render(<TodoFooter {...getProps({ activeCount: 9999, completedCount: 0 })} />);
			expect(screen.getByText(/9999 задач осталось из 9999/)).toBeInTheDocument();
		});

		it('работает для всех типов фильтров', () => {
			const filters: FilterType[] = ['all', 'active', 'completed'];
			filters.forEach((filter) => {
				const { unmount } = render(<TodoFooter {...getProps({ currentFilter: filter })} />);
				const footer = screen.getByRole('contentinfo');
				expect(within(footer).getByText(/осталась|осталось|завершена|завершено/)).toBeInTheDocument();
				unmount();
			});
		});
	});

	describe('Accessibility', () => {
		it('использует семантический элемент footer', () => {
			render(<TodoFooter {...getProps()} />);
			const footer = screen.getByRole('contentinfo');
			expect(footer.tagName).toBe('FOOTER');
		});

		it('имеет доступные кнопки фильтров', () => {
			render(<TodoFooter {...getProps()} />);
			expect(screen.getByLabelText('Показать все задачи')).toBeInTheDocument();
			expect(screen.getByLabelText('Показать активные задачи')).toBeInTheDocument();
			expect(screen.getByLabelText('Показать завершенные задачи')).toBeInTheDocument();
		});
	});

	describe('Проверка отсутствия ложноположительных совпадений', () => {
		it('счётчик отображается в footer при конфликтном контенте', () => {
			render(
				<div>
					<div data-testid='other-content'>Задача номер 5</div>
					<TodoFooter {...getProps({ activeCount: 5, completedCount: 7 })} />
				</div>,
			);
			const footer = screen.getByRole('contentinfo');
			expect(within(footer).getByText(/5 задач осталось из 12/)).toBeInTheDocument();
		});

		it('текст "осталось" отображается в footer при конфликтном контенте', () => {
			render(
				<div>
					<div data-testid='other-content'>Задача, которая осталось невыполненной</div>
					<TodoFooter {...getProps({ activeCount: 2, completedCount: 1 })} />
				</div>,
			);
			const footer = screen.getByRole('contentinfo');
			expect(within(footer).getByText(/2 задачи осталось из 3/)).toBeInTheDocument();
		});

		it('счётчик с числом 3 отображается в footer при конфликтном контенте', () => {
			render(
				<div>
					<div data-testid='task-1'>Задача 3</div>
					<div data-testid='task-2'>Task номер 3</div>
					<TodoFooter {...getProps({ activeCount: 3, completedCount: 0 })} />
				</div>,
			);
			const footer = screen.getByRole('contentinfo');
			expect(within(footer).getByText(/3 задачи осталось из 3/)).toBeInTheDocument();
		});
	});
});
