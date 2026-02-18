import { act, renderHook } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '../contexts/ThemeProvider';
import { useTheme } from './use-theme';

function wrapper({ children }: { children: React.ReactNode }) {
	return createElement(ThemeProvider, null, children);
}

describe('useTheme', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('должен возвращать начальные значения по умолчанию', () => {
		const { result } = renderHook(() => useTheme(), { wrapper });

		const { colorScheme, themeVariant, effectiveScheme } = result.current;

		expect(colorScheme).toBe('auto');
		expect(themeVariant).toBe('default');
		expect(['light', 'dark']).toContain(effectiveScheme);
	});

	it('должен переключать colorScheme', () => {
		const { result } = renderHook(() => useTheme(), { wrapper });

		act(() => {
			result.current.setColorScheme('light');
		});

		expect(result.current.colorScheme).toBe('light');
		expect(result.current.effectiveScheme).toBe('light');

		act(() => {
			result.current.setColorScheme('dark');
		});

		expect(result.current.colorScheme).toBe('dark');
		expect(result.current.effectiveScheme).toBe('dark');
	});

	it('должен переключать themeVariant', () => {
		const { result } = renderHook(() => useTheme(), { wrapper });

		act(() => {
			result.current.setThemeVariant('ocean');
		});

		expect(result.current.themeVariant).toBe('ocean');
	});
});
