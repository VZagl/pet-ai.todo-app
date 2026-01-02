import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('должен инициализироваться начальным значением', () => {
		const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

		expect(result.current[0]).toBe('initial');
	});

	it('должен загружать значение из localStorage при инициализации', () => {
		localStorage.setItem('test-key', JSON.stringify('stored'));

		const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

		expect(result.current[0]).toBe('stored');
	});

	it('должен обновлять значение и сохранять в localStorage', () => {
		const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

		act(() => {
			result.current[1]('updated');
		});

		expect(result.current[0]).toBe('updated');
		expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
	});

	it('должен поддерживать функциональное обновление', () => {
		const { result } = renderHook(() => useLocalStorage('test-key', 10));

		act(() => {
			result.current[1]((prev) => prev + 5);
		});

		expect(result.current[0]).toBe(15);
		expect(localStorage.getItem('test-key')).toBe('15');
	});

	it('должен работать с объектами', () => {
		const initialObj = { name: 'Test', count: 0 };
		const { result } = renderHook(() => useLocalStorage('test-key', initialObj));

		act(() => {
			result.current[1]({ name: 'Updated', count: 5 });
		});

		expect(result.current[0]).toEqual({ name: 'Updated', count: 5 });
		expect(JSON.parse(localStorage.getItem('test-key')!)).toEqual({
			name: 'Updated',
			count: 5,
		});
	});

	it('должен работать с массивами', () => {
		const { result } = renderHook(() => useLocalStorage('test-key', [1, 2, 3]));

		act(() => {
			result.current[1]([4, 5, 6]);
		});

		expect(result.current[0]).toEqual([4, 5, 6]);
		expect(JSON.parse(localStorage.getItem('test-key')!)).toEqual([4, 5, 6]);
	});

	it('должен использовать начальное значение если localStorage пуст', () => {
		const { result } = renderHook(() => useLocalStorage('non-existent', 'default'));

		expect(result.current[0]).toBe('default');
	});
});
