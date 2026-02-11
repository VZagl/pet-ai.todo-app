import { expect } from '@playwright/test';
import { STORAGE_KEY } from '../src/constants/todo';
import { test } from './fixtures';

test.describe('Персистентность: localStorage', () => {
	test('должен сохранять задачи после перезагрузки страницы', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });
		const addButton = page.getByRole('button', { name: 'Добавить задачу' });

		await input.fill('Задача после перезагрузки');
		await addButton.click();

		await expect(page.getByText('Задача после перезагрузки')).toBeVisible();

		await page.reload();

		await expect(page.getByText('Задача после перезагрузки')).toBeVisible();
	});

	test('должен сохранять состояние задач (completed) в localStorage', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });
		const addButton = page.getByRole('button', { name: 'Добавить задачу' });

		await input.fill('Задача для toggle');
		await addButton.click();

		const checkbox = page.getByRole('checkbox', { name: /Отметить задачу "Задача для toggle"/ });
		await checkbox.click();

		await page.reload();

		await expect(checkbox).toBeChecked();
		await expect(page.getByText('Задача для toggle')).toBeVisible();
	});

	test('должен использовать STORAGE_KEY в localStorage', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });
		const addButton = page.getByRole('button', { name: 'Добавить задачу' });

		await input.fill('Проверка ключа');
		await addButton.click();

		const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
		expect(stored).toBeTruthy();
		expect(stored).toContain('Проверка ключа');
	});
});
