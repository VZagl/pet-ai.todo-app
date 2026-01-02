import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveToStorage, loadFromStorage } from './storage';

describe('storage utils', () => {
	beforeEach(() => {
		// Очистка localStorage перед каждым тестом
		localStorage.clear();
		// Очистка моков
		vi.clearAllMocks();
	});

	describe('saveToStorage', () => {
		it('должен сохранять данные в localStorage', () => {
			const key = 'test-key';
			const data = { name: 'Test', value: 42 };

			saveToStorage(key, data);

			const stored = localStorage.getItem(key);
			expect(stored).toBe(JSON.stringify(data));
		});

		it('должен сохранять примитивные типы', () => {
			saveToStorage('string', 'test');
			saveToStorage('number', 123);
			saveToStorage('boolean', true);

			expect(localStorage.getItem('string')).toBe('"test"');
			expect(localStorage.getItem('number')).toBe('123');
			expect(localStorage.getItem('boolean')).toBe('true');
		});

		it('должен выбрасывать ошибку при неудачном сохранении', () => {
			// Мокаем setItem для выброса ошибки
			const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
				throw new Error('QuotaExceededError');
			});

			expect(() => saveToStorage('key', 'data')).toThrow(
				'Не удалось сохранить данные'
			);

			// Восстанавливаем оригинальную реализацию
			spy.mockRestore();
		});
	});

	describe('loadFromStorage', () => {
		it('должен загружать данные из localStorage', () => {
			const key = 'test-key';
			const data = { name: 'Test', value: 42 };
			localStorage.setItem(key, JSON.stringify(data));

			const loaded = loadFromStorage(key, {});

			expect(loaded).toEqual(data);
		});

		it('должен возвращать значение по умолчанию, если данных нет', () => {
			const defaultValue = { default: true };

			const loaded = loadFromStorage('non-existent', defaultValue);

			expect(loaded).toEqual(defaultValue);
		});

		it('должен возвращать значение по умолчанию при ошибке парсинга', () => {
			const key = 'corrupted-key';
			const defaultValue = { default: true };
			localStorage.setItem(key, 'invalid json');

			const loaded = loadFromStorage(key, defaultValue);

			expect(loaded).toEqual(defaultValue);
		});

		it('должен загружать примитивные типы', () => {
			localStorage.setItem('string', '"test"');
			localStorage.setItem('number', '123');
			localStorage.setItem('boolean', 'true');

			expect(loadFromStorage('string', '')).toBe('test');
			expect(loadFromStorage('number', 0)).toBe(123);
			expect(loadFromStorage('boolean', false)).toBe(true);
		});
	});
});
