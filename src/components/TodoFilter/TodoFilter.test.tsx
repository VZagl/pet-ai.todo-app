import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { FilterType } from '../../types/todo';
import { TodoFilter } from './TodoFilter';

describe('TodoFilter', () => {
	const mockOnFilterChange = vi.fn();

	beforeEach(() => {
		mockOnFilterChange.mockClear();
	});

	describe('Rendering', () => {
		it('should render all filter buttons', () => {
			render(<TodoFilter currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByText('Все')).toBeInTheDocument();
			expect(screen.getByText('Активные')).toBeInTheDocument();
			expect(screen.getByText('Завершенные')).toBeInTheDocument();
		});

		it('should have role="group" with aria-label', () => {
			render(<TodoFilter currentFilter='all' onFilterChange={mockOnFilterChange} />);

			const group = screen.getByRole('group', { name: 'Фильтр задач' });
			expect(group).toBeInTheDocument();
		});

		it('should render buttons with correct type', () => {
			render(<TodoFilter currentFilter='all' onFilterChange={mockOnFilterChange} />);

			const buttons = screen.getAllByRole('button');
			buttons.forEach((button) => {
				expect(button).toHaveAttribute('type', 'button');
			});
		});
	});

	describe('Active state', () => {
		it('should mark "Все" button as active when currentFilter is "all"', () => {
			render(<TodoFilter currentFilter='all' onFilterChange={mockOnFilterChange} />);

			const allButton = screen.getByText('Все');
			expect(allButton).toHaveClass('todo-filter__button--active');
			expect(allButton).toHaveAttribute('aria-pressed', 'true');
		});

		it('should mark "Активные" button as active when currentFilter is "active"', () => {
			render(<TodoFilter currentFilter='active' onFilterChange={mockOnFilterChange} />);

			const activeButton = screen.getByText('Активные');
			expect(activeButton).toHaveClass('todo-filter__button--active');
			expect(activeButton).toHaveAttribute('aria-pressed', 'true');
		});

		it('should mark "Завершенные" button as active when currentFilter is "completed"', () => {
			render(<TodoFilter currentFilter='completed' onFilterChange={mockOnFilterChange} />);

			const completedButton = screen.getByText('Завершенные');
			expect(completedButton).toHaveClass('todo-filter__button--active');
			expect(completedButton).toHaveAttribute('aria-pressed', 'true');
		});

		it('should only have one active button at a time', () => {
			render(<TodoFilter currentFilter='active' onFilterChange={mockOnFilterChange} />);

			const buttons = screen.getAllByRole('button');
			const activeButtons = buttons.filter((btn) => btn.classList.contains('todo-filter__button--active'));

			expect(activeButtons).toHaveLength(1);
		});
	});

	describe('User interactions', () => {
		it('should call onFilterChange with "all" when "Все" button is clicked', async () => {
			const user = userEvent.setup();
			render(<TodoFilter currentFilter='active' onFilterChange={mockOnFilterChange} />);

			const allButton = screen.getByText('Все');
			await user.click(allButton);

			expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
			expect(mockOnFilterChange).toHaveBeenCalledWith('all');
		});

		it('should call onFilterChange with "active" when "Активные" button is clicked', async () => {
			const user = userEvent.setup();
			render(<TodoFilter currentFilter='all' onFilterChange={mockOnFilterChange} />);

			const activeButton = screen.getByText('Активные');
			await user.click(activeButton);

			expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
			expect(mockOnFilterChange).toHaveBeenCalledWith('active');
		});

		it('should call onFilterChange with "completed" when "Завершенные" button is clicked', async () => {
			const user = userEvent.setup();
			render(<TodoFilter currentFilter='all' onFilterChange={mockOnFilterChange} />);

			const completedButton = screen.getByText('Завершенные');
			await user.click(completedButton);

			expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
			expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
		});

		it('should call onFilterChange when clicking on already active filter', async () => {
			const user = userEvent.setup();
			render(<TodoFilter currentFilter='all' onFilterChange={mockOnFilterChange} />);

			const allButton = screen.getByText('Все');
			await user.click(allButton);

			expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
			expect(mockOnFilterChange).toHaveBeenCalledWith('all');
		});
	});

	describe('Accessibility', () => {
		it('should have proper aria-label for each button', () => {
			render(<TodoFilter currentFilter='all' onFilterChange={mockOnFilterChange} />);

			expect(screen.getByLabelText('Показать все задачи')).toBeInTheDocument();
			expect(screen.getByLabelText('Показать активные задачи')).toBeInTheDocument();
			expect(screen.getByLabelText('Показать завершенные задачи')).toBeInTheDocument();
		});

		it('should set aria-pressed="true" only for active button', () => {
			render(<TodoFilter currentFilter='active' onFilterChange={mockOnFilterChange} />);

			const allButton = screen.getByText('Все');
			const activeButton = screen.getByText('Активные');
			const completedButton = screen.getByText('Завершенные');

			expect(allButton).toHaveAttribute('aria-pressed', 'false');
			expect(activeButton).toHaveAttribute('aria-pressed', 'true');
			expect(completedButton).toHaveAttribute('aria-pressed', 'false');
		});

		it('should be keyboard accessible', async () => {
			const user = userEvent.setup();
			render(<TodoFilter currentFilter='all' onFilterChange={mockOnFilterChange} />);

			const allButton = screen.getByText('Все');
			const activeButton = screen.getByText('Активные');

			// Tab to first button
			await user.tab();
			expect(allButton).toHaveFocus();

			// Tab to second button
			await user.tab();
			expect(activeButton).toHaveFocus();

			// Press Enter
			await user.keyboard('{Enter}');
			expect(mockOnFilterChange).toHaveBeenCalledWith('active');
		});
	});

	describe('Edge cases', () => {
		it('should handle rapid clicks without issues', async () => {
			const user = userEvent.setup();
			render(<TodoFilter currentFilter='all' onFilterChange={mockOnFilterChange} />);

			const activeButton = screen.getByText('Активные');

			// Rapid clicks
			await user.click(activeButton);
			await user.click(activeButton);
			await user.click(activeButton);

			expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
		});

		it('should work with different filter types', () => {
			const filters: FilterType[] = ['all', 'active', 'completed'];

			filters.forEach((filter) => {
				const { unmount } = render(<TodoFilter currentFilter={filter} onFilterChange={mockOnFilterChange} />);

				const buttons = screen.getAllByRole('button');
				const activeButtons = buttons.filter((btn) => btn.classList.contains('todo-filter__button--active'));

				expect(activeButtons).toHaveLength(1);

				unmount();
			});
		});
	});
});
