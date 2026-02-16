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

/**
 * Переключатель языка — кнопка с иконкой глобуса, dropdown со списком языков.
 * Список строится динамически из supportedLngs, названия берутся из language.name.
 */
export const LanguageSwitcher = () => {
	const { t, i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const currentLng = i18n.language?.split('-')[0] ?? 'ru';
	const supportedLngs = (Array.isArray(i18n.options.supportedLngs) ? i18n.options.supportedLngs : []).filter(
		(l: unknown): l is string => l !== 'cimode' && typeof l === 'string',
	);
	const sortedLanguages = [...supportedLngs].sort((a, b) => t('language.name', { lng: a }).localeCompare(t('language.name', { lng: b })));

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
					{sortedLanguages.map((code) => (
						<li key={code} role='option' aria-selected={currentLng === code}>
							<button
								type='button'
								className={`language-switcher__option ${currentLng === code ? 'language-switcher__option--active' : ''}`}
								onClick={() => handleLanguageChange(code)}
								onKeyDown={(e) => handleKeyDown(e, code)}
								data-testid={`language-option-${code}`}
							>
								{t('language.name', { lng: code })}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
