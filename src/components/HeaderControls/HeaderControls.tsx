import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { SettingsButton } from '../SettingsButton/SettingsButton';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import './HeaderControls.scss';

interface HeaderControlsProps {
	onSettingsClick: () => void;
}

/**
 * Контейнер кнопок в header: ThemeToggle | LanguageSwitcher | SettingsButton.
 */
export const HeaderControls = ({ onSettingsClick }: HeaderControlsProps) => {
	return (
		<div className='header-controls'>
			<ThemeToggle />
			<LanguageSwitcher />
			<SettingsButton onClick={onSettingsClick} />
		</div>
	);
};
