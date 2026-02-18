import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { THEME_COLOR_SCHEME_KEY, THEME_VARIANT_KEY } from '../constants/todo';
import { themeDefinitions } from '../styles/themes/theme-definitions';
import type { ColorScheme, ThemeVariant } from '../styles/themes/theme-types';
import { loadFromStorage, saveToStorage } from '../utils/storage';

type EffectiveScheme = 'light' | 'dark';

interface ThemeContextValue {
	colorScheme: ColorScheme;
	themeVariant: ThemeVariant;
	effectiveScheme: EffectiveScheme;
	setColorScheme: (scheme: ColorScheme) => void;
	setThemeVariant: (variant: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getEffectiveScheme(colorScheme: ColorScheme): EffectiveScheme {
	if (colorScheme === 'auto') {
		if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}
		return 'light';
	}
	return colorScheme;
}

function applyTheme(variant: ThemeVariant, scheme: EffectiveScheme): void {
	const palette = themeDefinitions[variant][scheme];
	const root = document.documentElement;
	for (const [key, value] of Object.entries(palette)) {
		root.style.setProperty(key, value);
	}
}

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() =>
		loadFromStorage(THEME_COLOR_SCHEME_KEY, 'auto' as ColorScheme),
	);
	const [themeVariant, setThemeVariantState] = useState<ThemeVariant>(() =>
		loadFromStorage(THEME_VARIANT_KEY, 'default' as ThemeVariant),
	);

	const effectiveScheme = getEffectiveScheme(colorScheme);

	// Применение темы при монтировании и при изменении
	useEffect(() => {
		applyTheme(themeVariant, effectiveScheme);
	}, [themeVariant, effectiveScheme]);

	// Слушатель prefers-color-scheme при auto
	useEffect(() => {
		if (colorScheme !== 'auto') return;
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => {
			applyTheme(themeVariant, getEffectiveScheme('auto'));
		};
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	}, [colorScheme, themeVariant]);

	// Персистентность
	const setColorScheme = useCallback((scheme: ColorScheme) => {
		setColorSchemeState(scheme);
		saveToStorage(THEME_COLOR_SCHEME_KEY, scheme);
	}, []);

	const setThemeVariant = useCallback((variant: ThemeVariant) => {
		setThemeVariantState(variant);
		saveToStorage(THEME_VARIANT_KEY, variant);
	}, []);

	// Синхронизация между вкладками
	useEffect(() => {
		const handler = (e: StorageEvent) => {
			if (e.key === THEME_COLOR_SCHEME_KEY && e.newValue) {
				setColorSchemeState(JSON.parse(e.newValue) as ColorScheme);
			}
			if (e.key === THEME_VARIANT_KEY && e.newValue) {
				setThemeVariantState(JSON.parse(e.newValue) as ThemeVariant);
			}
		};
		window.addEventListener('storage', handler);
		return () => window.removeEventListener('storage', handler);
	}, []);

	const value = useMemo<ThemeContextValue>(
		() => ({
			colorScheme,
			themeVariant,
			effectiveScheme,
			setColorScheme,
			setThemeVariant,
		}),
		[colorScheme, themeVariant, effectiveScheme, setColorScheme, setThemeVariant],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { ThemeContext };
