import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { FilterType } from '../../types/todo';
import { TodoFooter } from './TodoFooter';

describe('TodoFooter', () => {
	const mockOnFilterChange = vi.fn();

	beforeEach(() => {
		mockOnFilterChange.mockClear();
	});

	describe('Rendering', () => {
		it('should render footer element', () => {
			render(<TodoFooter activeCount={0} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			const footer = screen.getByRole('contentinfo');
			expect(footer).toBeInTheDocument();
			expect(footer).toHaveClass('todo-footer');
		});

		it('should render counter and filter components', () => {
			render(<TodoFooter activeCount={5} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			// Counter
			expect(screen.getByText('5')).toBeInTheDocument();

			// Filter buttons
			expect(screen.getByText('Все')).toBeInTheDocument();
			expect(screen.getByText('Активные')).toBeInTheDocument();
			expect(screen.getByText('Завершенные')).toBeInTheDocument();
		});
	});

	describe('Counter display', () => {
		it('should display 0 active tasks', () => {
			render(<TodoFooter activeCount={0} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('0')).toBeInTheDocument();
			expect(screen.getByText('задач осталось')).toBeInTheDocument();
		});

		it('should display 1 active task with correct word form', () => {
			render(<TodoFooter activeCount={1} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('1')).toBeInTheDocument();
			expect(screen.getByText('задача осталось')).toBeInTheDocument();
		});

		it('should display 2 active tasks with correct word form', () => {
			render(<TodoFooter activeCount={2} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('2')).toBeInTheDocument();
			expect(screen.getByText('задачи осталось')).toBeInTheDocument();
		});

		it('should display 3 active tasks with correct word form', () => {
			render(<TodoFooter activeCount={3} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('3')).toBeInTheDocument();
			expect(screen.getByText('задачи осталось')).toBeInTheDocument();
		});

		it('should display 4 active tasks with correct word form', () => {
			render(<TodoFooter activeCount={4} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('4')).toBeInTheDocument();
			expect(screen.getByText('задачи осталось')).toBeInTheDocument();
		});

		it('should display 5 active tasks with correct word form', () => {
			render(<TodoFooter activeCount={5} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('5')).toBeInTheDocument();
			expect(screen.getByText('задач осталось')).toBeInTheDocument();
		});

		it('should display 10 active tasks with correct word form', () => {
			render(<TodoFooter activeCount={10} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('10')).toBeInTheDocument();
			expect(screen.getByText('задач осталось')).toBeInTheDocument();
		});

		it('should display 21 active task with correct word form', () => {
			render(<TodoFooter activeCount={21} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('21')).toBeInTheDocument();
			expect(screen.getByText('задача осталось')).toBeInTheDocument();
		});

		it('should display 22 active tasks with correct word form', () => {
			render(<TodoFooter activeCount={22} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('22')).toBeInTheDocument();
			expect(screen.getByText('задачи осталось')).toBeInTheDocument();
		});

		it('should display 25 active tasks with correct word form', () => {
			render(<TodoFooter activeCount={25} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('25')).toBeInTheDocument();
			expect(screen.getByText('задач осталось')).toBeInTheDocument();
		});

		it('should display 100 active tasks with correct word form', () => {
			render(<TodoFooter activeCount={100} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('100')).toBeInTheDocument();
			expect(screen.getByText('задач осталось')).toBeInTheDocument();
		});
	});

	describe('Filter integration', () => {
		it('should pass currentFilter to TodoFilter', () => {
			render(<TodoFooter activeCount={5} currentFilter='active' onFilterChange={mockOnFilterChange} />);

			const activeButton = screen.getByText('Активные');
			expect(activeButton).toHaveClass('todo-filter__button--active');
		});

		it('should pass onFilterChange to TodoFilter', async () => {
			const user = userEvent.setup();
			render(<TodoFooter activeCount={5} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			const activeButton = screen.getByText('Активные');
			await user.click(activeButton);

			expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
			expect(mockOnFilterChange).toHaveBeenCalledWith('active');
		});

		it('should update when filter changes', () => {
			const { rerender } = render(<TodoFooter activeCount={5} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			let allButton = screen.getByText('Все');
			expect(allButton).toHaveClass('todo-filter__button--active');

			rerender(<TodoFooter activeCount={5} currentFilter='completed' onFilterChange={mockOnFilterChange} />);

			allButton = screen.getByText('Все');
			const completedButton = screen.getByText('Завершенные');

			expect(allButton).not.toHaveClass('todo-filter__button--active');
			expect(completedButton).toHaveClass('todo-filter__button--active');
		});
	});

	describe('Counter updates', () => {
		it('should update counter when activeCount changes', () => {
			const { rerender } = render(<TodoFooter activeCount={5} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('5')).toBeInTheDocument();
			expect(screen.getByText('задач осталось')).toBeInTheDocument();

			rerender(<TodoFooter activeCount={1} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('1')).toBeInTheDocument();
			expect(screen.getByText('задача осталось')).toBeInTheDocument();
		});

		it('should update word form when activeCount changes', () => {
			const { rerender } = render(<TodoFooter activeCount={1} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('задача осталось')).toBeInTheDocument();

			rerender(<TodoFooter activeCount={2} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('задачи осталось')).toBeInTheDocument();

			rerender(<TodoFooter activeCount={5} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('задач осталось')).toBeInTheDocument();
		});
	});

	describe('Edge cases', () => {
		it('should handle negative activeCount gracefully', () => {
			render(<TodoFooter activeCount={-1} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('-1')).toBeInTheDocument();
		});

		it('should handle very large activeCount', () => {
			render(<TodoFooter activeCount={9999} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('9999')).toBeInTheDocument();
			expect(screen.getByText('задач осталось')).toBeInTheDocument();
		});

		it('should work with all filter types', () => {
			const filters: FilterType[] = ['all', 'active', 'completed'];

			filters.forEach((filter) => {
				const { unmount } = render(<TodoFooter activeCount={5} currentFilter={filter} onFilterChange={mockOnFilterChange} />);

				expect(screen.getByText('5')).toBeInTheDocument();

				unmount();
			});
		});
	});

	describe('Accessibility', () => {
		it('should have semantic footer element', () => {
			render(<TodoFooter activeCount={5} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			const footer = screen.getByRole('contentinfo');
			expect(footer.tagName).toBe('FOOTER');
		});

		it('should have accessible filter buttons', () => {
			render(<TodoFooter activeCount={5} currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByLabelText('Показать все задачи')).toBeInTheDocument();
			expect(screen.getByLabelText('Показать активные задачи')).toBeInTheDocument();
			expect(screen.getByLabelText('Показать завершенные задачи')).toBeInTheDocument();
		});
	});
});
