import { useTranslation } from 'react-i18next';
import { themeDefinitions } from '../../styles/themes/theme-definitions';
import type { ThemeVariant } from '../../styles/themes/theme-types';
import './ThemeSelectionTab.scss';

const THEME_VARIANTS: ThemeVariant[] = ['default', 'ocean', 'forest', 'sunset', 'lavender'];

const THEME_LABELS: Record<ThemeVariant, string> = {
	default: 'Default',
	ocean: 'Ocean',
	forest: 'Forest',
	sunset: 'Sunset',
	lavender: 'Lavender',
};

interface ThemeSelectionTabProps {
	draftVariant: ThemeVariant;
	draftScheme: 'light' | 'dark';
	onVariantChange: (v: ThemeVariant) => void;
	onSchemeChange: (s: 'light' | 'dark') => void;
	onAccept: () => void;
	onReject: () => void;
}

/**
 * Таб выбора темы: мини-карточки тем с превью light/dark.
 */
export const ThemeSelectionTab = ({
	draftVariant,
	draftScheme,
	onVariantChange,
	onSchemeChange,
	onAccept,
	onReject,
}: ThemeSelectionTabProps) => {
	const { t } = useTranslation();

	const palette = themeDefinitions[draftVariant];
	const selectedBg = palette[draftScheme]['--color-surface'];
	const selectedBorder = palette[draftScheme]['--color-primary'];

	return (
		<div className='theme-selection-tab'>
			<div className='theme-selection-tab__cards'>
				{THEME_VARIANTS.map((variant) => (
					<div
						key={variant}
						className={`theme-selection-tab__card ${draftVariant === variant ? 'theme-selection-tab__card--selected' : ''}`}
						data-testid={`theme-card-${variant}`}
					>
						<div className='theme-selection-tab__card-name'>{THEME_LABELS[variant]}</div>
						<div className='theme-selection-tab__card-previews'>
							<button
								type='button'
								className={`theme-selection-tab__preview ${draftScheme === 'light' && draftVariant === variant ? 'theme-selection-tab__preview--selected' : ''}`}
								style={
									{
										'--preview-bg': themeDefinitions[variant].light['--color-bg'],
										'--preview-surface': themeDefinitions[variant].light['--color-surface'],
										'--preview-primary': themeDefinitions[variant].light['--color-primary'],
										'--selected-bg': selectedBg,
										'--selected-border': selectedBorder,
									} as React.CSSProperties
								}
								onClick={() => {
									onVariantChange(variant);
									onSchemeChange('light');
								}}
								aria-pressed={draftVariant === variant && draftScheme === 'light'}
								aria-label={`${THEME_LABELS[variant]} light`}
							>
								<span className='theme-selection-tab__preview-dot' />
							</button>
							<button
								type='button'
								className={`theme-selection-tab__preview ${draftScheme === 'dark' && draftVariant === variant ? 'theme-selection-tab__preview--selected' : ''}`}
								style={
									{
										'--preview-bg': themeDefinitions[variant].dark['--color-bg'],
										'--preview-surface': themeDefinitions[variant].dark['--color-surface'],
										'--preview-primary': themeDefinitions[variant].dark['--color-primary'],
										'--selected-bg': selectedBg,
										'--selected-border': selectedBorder,
									} as React.CSSProperties
								}
								onClick={() => {
									onVariantChange(variant);
									onSchemeChange('dark');
								}}
								aria-pressed={draftVariant === variant && draftScheme === 'dark'}
								aria-label={`${THEME_LABELS[variant]} dark`}
							>
								<span className='theme-selection-tab__preview-dot' />
							</button>
						</div>
					</div>
				))}
			</div>
			<div className='theme-selection-tab__actions'>
				<button
					type='button'
					className='theme-selection-tab__btn theme-selection-tab__btn--reject'
					onClick={onReject}
				>
					{t('theme.reject')}
				</button>
				<button
					type='button'
					className='theme-selection-tab__btn theme-selection-tab__btn--accept'
					onClick={onAccept}
				>
					{t('theme.accept')}
				</button>
			</div>
		</div>
	);
};
