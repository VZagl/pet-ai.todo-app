import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeProvider';

export type { ColorScheme, ThemeVariant } from '../styles/themes/theme-types';

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within ThemeProvider');
	}
	return context;
}
