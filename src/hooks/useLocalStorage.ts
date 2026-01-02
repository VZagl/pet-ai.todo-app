import { useEffect, useState } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

/**
 * Кастомный хук для работы с localStorage с автоматической синхронизацией
 * @param key - Ключ для хранения в localStorage
 * @param initialValue - Начальное значение
 * @returns Кортеж [значение, функция установки значения]
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
	// Инициализация состояния из localStorage или начальным значением
	const [storedValue, setStoredValue] = useState<T>(() => {
		return loadFromStorage(key, initialValue);
	});

	// Обновление localStorage при изменении состояния
	useEffect(() => {
		saveToStorage(key, storedValue);
	}, [key, storedValue]);

	// Обертка для setState с поддержкой функционального обновления
	const setValue = (value: T | ((prev: T) => T)) => {
		setStoredValue((prev) => {
			const newValue = value instanceof Function ? value(prev) : value;
			return newValue;
		});
	};

	return [storedValue, setValue];
}
