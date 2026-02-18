/**
 * Режим цветовой схемы: авто (системные настройки), светлая или тёмная
 */
export type ColorScheme = 'auto' | 'light' | 'dark';

/**
 * Вариант темы: Default, Ocean, Forest, Sunset, Lavender
 */
export type ThemeVariant = 'default' | 'ocean' | 'forest' | 'sunset' | 'lavender';

/**
 * Набор цветовых токенов для одной схемы (light или dark)
 */
export interface ThemePalette {
	'--color-bg': string;
	'--color-surface': string;
	'--color-text': string;
	'--color-text-muted': string;
	'--color-border': string;
	'--color-border-light': string;
	'--color-primary': string;
	'--color-primary-hover': string;
	'--color-on-primary': string;
	'--color-bg-hover': string;
	'--gradient-bg': string;
	'--color-success': string;
	'--color-danger': string;
	/** Полупрозрачный primary для focus ring (box-shadow) */
	'--color-focus-ring': string;
	/** Полупрозрачный danger для focus ring при ошибке */
	'--color-danger-focus': string;
}

/**
 * Конфигурация темы: light и dark палитры
 */
export interface ThemeConfig {
	light: ThemePalette;
	dark: ThemePalette;
}

/**
 * Все темы: вариант → конфиг (light + dark)
 */
export type ThemeDefinitions = Record<ThemeVariant, ThemeConfig>;
