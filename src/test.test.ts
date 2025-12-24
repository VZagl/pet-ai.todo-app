/**
 * Базовые тесты для проверки работоспособности настройки Vitest.
 * Этот файл используется для проверки, что тестовая инфраструктура настроена корректно.
 */
import { expect, test } from 'vitest';

test('проверка работоспособности тестов', () => {
	expect(1 + 1).toBe(2);
});

test('проверка строковых значений', () => {
	expect('vitest').toBe('vitest');
	expect('vitest'.length).toBe(6);
});

test('проверка булевых значений', () => {
	expect(true).toBe(true);
	expect(false).toBe(false);
});
