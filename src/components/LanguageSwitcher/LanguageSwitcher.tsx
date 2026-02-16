import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss';

/** Иконка глобуса — локальный inline SVG (offline) */
const GlobeIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='20'
		height='20'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
	>
		<circle cx='12' cy='12' r='10' />
		<path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
		<path d='M2 12h20' />
	</svg>
);

/** Языки с названиями на родном языке (не переводятся) */
const LANGUAGES = [
	{ code: 'en', label: 'English' },
	{ code: 'ru', label: 'Русский' },
] as const;

/**
 * Переключатель языка — кнопка с иконкой глобуса, dropdown со списком языков
 */
export const LanguageSwitcher = () => {
	const { t, i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const currentLng = i18n.language?.split('-')[0] ?? 'ru';
	// Локаль 'en' для стабильного порядка: English → Русский (независимо от системной локали)
	const sortedLanguages = [...LANGUAGES].sort((a, b) => a.label.localeCompare(b.label, 'en'));

	const handleLanguageChange = useCallback(
		(lng: string) => {
			i18n.changeLanguage(lng);
			setIsOpen(false);
		},
		[i18n],
	);

	const handleClickOutside = useCallback((e: MouseEvent) => {
		if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		}
		return () => document.removeEventListener('click', handleClickOutside);
	}, [isOpen, handleClickOutside]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent, lng: string) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				handleLanguageChange(lng);
			}
		},
		[handleLanguageChange],
	);

	return (
		<div className='language-switcher' ref={containerRef} data-testid='language-switcher'>
			<button
				type='button'
				className='language-switcher__button'
				onClick={() => setIsOpen(!isOpen)}
				aria-label={t('language.switcherLabel')}
				aria-expanded={isOpen}
				aria-haspopup='listbox'
				data-testid='language-switcher-button'
			>
				<GlobeIcon />
			</button>
			{isOpen && (
				<ul className='language-switcher__dropdown' role='listbox' aria-label={t('language.switcherLabel')}>
					{sortedLanguages.map(({ code, label }) => (
						<li key={code} role='option' aria-selected={currentLng === code}>
							<button
								type='button'
								className={`language-switcher__option ${currentLng === code ? 'language-switcher__option--active' : ''}`}
								onClick={() => handleLanguageChange(code)}
								onKeyDown={(e) => handleKeyDown(e, code)}
								data-testid={`language-option-${code}`}
							>
								{label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
