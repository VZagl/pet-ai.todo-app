import { useTranslation } from 'react-i18next';
import moonIcon from '../../assets/moon.svg';
import sunIcon from '../../assets/sun.svg';
import { useTheme } from '../../hooks/use-theme';
import './ThemeToggle.scss';

/**
 * Переключатель светлой/тёмной темы.
 * Показывает sun в светлой теме, moon в тёмной.
 * При клике переключает между light и dark (не auto).
 */
export const ThemeToggle = () => {
	const { t } = useTranslation();
	const { effectiveScheme, setColorScheme } = useTheme();

	const isDark = effectiveScheme === 'dark';
	const ariaLabel = isDark ? t('theme.toggleLight') : t('theme.toggleDark');

	const handleClick = () => {
		setColorScheme(isDark ? 'light' : 'dark');
	};

	return (
		<button
			type='button'
			className='theme-toggle'
			onClick={handleClick}
			aria-label={ariaLabel}
			data-testid='theme-toggle'
		>
			<img src={isDark ? sunIcon : moonIcon} alt='' aria-hidden width={20} height={20} />
		</button>
	);
};
