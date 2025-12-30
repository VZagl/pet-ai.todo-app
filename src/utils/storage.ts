/**
 * Сохраняет данные в localStorage с автоматической сериализацией
 * @param key - Ключ для хранения
 * @param data - Данные для сохранения
 * @throws {Error} Если сохранение не удалось
 */
export function saveToStorage<T>(key: string, data: T): void {
	try {
		const serialized = JSON.stringify(data);
		localStorage.setItem(key, serialized);
	} catch (error) {
		console.error(`Ошибка сохранения в localStorage (ключ: ${key}):`, error);
		throw new Error('Не удалось сохранить данные');
	}
}

/**
 * Загружает данные из localStorage с автоматической десериализацией
 * @param key - Ключ для загрузки
 * @param defaultValue - Значение по умолчанию, если данных нет
 * @returns Загруженные данные или значение по умолчанию
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
	try {
		const serialized = localStorage.getItem(key);
		if (serialized === null) {
			return defaultValue;
		}
		return JSON.parse(serialized) as T;
	} catch (error) {
		console.error(`Ошибка загрузки из localStorage (ключ: ${key}):`, error);
		return defaultValue;
	}
}
