import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/translation.json';
import ru from '../locales/ru/translation.json';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			ru: { translation: ru },
			en: { translation: en },
		},
		fallbackLng: 'ru',
		lng: 'ru',
		supportedLngs: ['ru', 'en'],
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupLocalStorage: 'i18nextLng',
		},
		react: {
			useSuspense: false,
		},
	});

i18n.on('languageChanged', (lng) => {
	document.documentElement.lang = lng.split('-')[0];
});

// Установить lang сразу после init (детектор может изменить язык асинхронно)
i18n.on('initialized', () => {
	document.documentElement.lang = i18n.language?.split('-')[0] ?? 'ru';
});

export default i18n;
