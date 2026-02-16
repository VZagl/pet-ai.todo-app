import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher', () => {
	it('должен отображать кнопку переключателя', () => {
		render(<LanguageSwitcher />);
		expect(screen.getByTestId('language-switcher-button')).toBeInTheDocument();
	});

	it('должен открывать dropdown при клике', async () => {
		const user = userEvent.setup();
		render(<LanguageSwitcher />);

		await user.click(screen.getByTestId('language-switcher-button'));

		expect(screen.getByTestId('language-option-ru')).toBeInTheDocument();
		expect(screen.getByTestId('language-option-en')).toBeInTheDocument();
	});

	it('должен переключать язык при выборе', async () => {
		const user = userEvent.setup();
		render(<LanguageSwitcher />);

		await user.click(screen.getByTestId('language-switcher-button'));
		await user.click(screen.getByTestId('language-option-en'));

		// Dropdown закрывается после выбора
		expect(screen.queryByTestId('language-option-en')).not.toBeInTheDocument();
	});
});
