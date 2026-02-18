import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '../../contexts/ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

function renderWithProvider() {
	return render(
		<ThemeProvider>
			<ThemeToggle />
		</ThemeProvider>,
	);
}

describe('ThemeToggle', () => {
	it('должен отрендерить кнопку переключения темы', () => {
		renderWithProvider();

		const button = screen.getByRole('button', { name: /light theme|dark theme/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute('data-testid', 'theme-toggle');
	});

	it('должен переключать тему при клике', async () => {
		const user = userEvent.setup();
		renderWithProvider();

		const button = screen.getByRole('button', { name: /light theme|dark theme/i });
		const initialLabel = button.getAttribute('aria-label');

		await user.click(button);

		expect(button.getAttribute('aria-label')).not.toBe(initialLabel);
	});
});
