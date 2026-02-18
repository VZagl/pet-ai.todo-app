import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import closeIcon from '../../assets/close.svg';
import { useTheme } from '../../hooks/use-theme';
import type { ThemeVariant } from '../../styles/themes/theme-types';
import { ThemeSelectionTab } from '../ThemeSelectionTab/ThemeSelectionTab';
import './SettingsModal.scss';

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

/**
 * Модальное окно настроек с табами.
 * При закрытии с несохранёнными изменениями — запрос подтверждения.
 */
export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
	const { t } = useTranslation();
	const { themeVariant, effectiveScheme, setColorScheme, setThemeVariant } = useTheme();

	const [draftVariant, setDraftVariant] = useState<ThemeVariant>(themeVariant);
	const [draftScheme, setDraftScheme] = useState<'light' | 'dark'>(effectiveScheme);
	const [showConfirm, setShowConfirm] = useState(false);

	const hasUnsavedChanges = draftVariant !== themeVariant || draftScheme !== effectiveScheme;

	// Сброс draft при открытии
	useEffect(() => {
		if (isOpen) {
			setDraftVariant(themeVariant);
			setDraftScheme(effectiveScheme);
			setShowConfirm(false);
		}
	}, [isOpen, themeVariant, effectiveScheme]);

	const handleCloseRequest = useCallback(() => {
		if (hasUnsavedChanges) {
			setShowConfirm(true);
		} else {
			onClose();
		}
	}, [hasUnsavedChanges, onClose]);

	const handleCloseWithSave = useCallback(() => {
		setThemeVariant(draftVariant);
		setColorScheme(draftScheme);
		setShowConfirm(false);
		onClose();
	}, [draftVariant, draftScheme, setThemeVariant, setColorScheme, onClose]);

	const handleCloseWithDiscard = useCallback(() => {
		setShowConfirm(false);
		onClose();
	}, [onClose]);

	const handleAccept = useCallback(() => {
		setThemeVariant(draftVariant);
		setColorScheme(draftScheme);
		onClose();
	}, [draftVariant, draftScheme, setThemeVariant, setColorScheme, onClose]);

	const handleReject = useCallback(() => {
		onClose();
	}, [onClose]);

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			handleCloseRequest();
		}
	};

	useEffect(() => {
		if (!isOpen) return;
		const onEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleCloseRequest();
		};
		document.addEventListener('keydown', onEscape);
		return () => document.removeEventListener('keydown', onEscape);
	}, [isOpen, handleCloseRequest]);

	if (!isOpen) return null;

	return (
		<div className='settings-modal' role='dialog' aria-modal='true' aria-labelledby='settings-modal-title'>
			<div className='settings-modal__overlay' onClick={handleOverlayClick} role='presentation' />
			<div className='settings-modal__window'>
				<button
					type='button'
					className='settings-modal__close'
					onClick={handleCloseRequest}
					aria-label={t('theme.settingsLabel')}
					data-testid='settings-modal-close'
				>
					<img src={closeIcon} alt='' width={24} height={24} />
				</button>

				{showConfirm ? (
					<div className='settings-modal__confirm' data-testid='settings-unsaved-confirm'>
						<p className='settings-modal__confirm-title'>{t('theme.unsavedTitle')}</p>
						<div className='settings-modal__confirm-actions'>
							<button
								type='button'
								className='settings-modal__confirm-btn settings-modal__confirm-btn--discard'
								onClick={handleCloseWithDiscard}
							>
								{t('theme.unsavedDiscard')}
							</button>
							<button
								type='button'
								className='settings-modal__confirm-btn settings-modal__confirm-btn--save'
								onClick={handleCloseWithSave}
							>
								{t('theme.unsavedSave')}
							</button>
						</div>
					</div>
				) : (
					<>
						<h2 id='settings-modal-title' className='settings-modal__title'>
							{t('theme.settingsTabTheme')}
						</h2>
						<div className='settings-modal__tabs'>
							<ThemeSelectionTab
								draftVariant={draftVariant}
								draftScheme={draftScheme}
								onVariantChange={setDraftVariant}
								onSchemeChange={setDraftScheme}
								onAccept={handleAccept}
								onReject={handleReject}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
