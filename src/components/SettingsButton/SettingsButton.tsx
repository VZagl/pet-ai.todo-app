import { useTranslation } from 'react-i18next';
import settingsIcon from '../../assets/settings.svg';
import './SettingsButton.scss';

interface SettingsButtonProps {
	onClick: () => void;
}

/**
 * Кнопка открытия модального окна настроек.
 */
export const SettingsButton = ({ onClick }: SettingsButtonProps) => {
	const { t } = useTranslation();

	return (
		<button
			type='button'
			className='settings-button'
			onClick={onClick}
			aria-label={t('theme.settingsLabel')}
			data-testid='settings-button'
		>
			<img src={settingsIcon} alt='' aria-hidden width={20} height={20} />
		</button>
	);
};
