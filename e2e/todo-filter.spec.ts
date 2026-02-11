import { expect } from '@playwright/test';
import { test } from './fixtures';

test.describe('Фильтрация задач', () => {
	test.beforeEach(async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });
		const addButton = page.getByRole('button', { name: 'Добавить задачу' });

		await input.fill('Активная задача');
		await addButton.click();

		await input.fill('Завершённая задача');
		await addButton.click();

		// Отметить вторую как выполненную
		const checkbox = page.getByRole('checkbox', { name: /Отметить задачу "Завершённая задача"/ });
		await checkbox.click();
	});

	test('должен показывать все задачи по фильтру «Все»', async ({ page }) => {
		// По умолчанию активен фильтр «Все» — проверяем видимость обеих задач
		await expect(page.getByText('Активная задача')).toBeVisible();
		await expect(page.getByText('Завершённая задача')).toBeVisible();
	});

	test('должен показывать только активные по фильтру «Активные»', async ({ page }) => {
		const filterActive = page.getByRole('button', { name: 'Показать активные задачи' });
		await filterActive.click();

		await expect(page.getByText('Активная задача')).toBeVisible();
		await expect(page.getByText('Завершённая задача')).not.toBeVisible();
	});

	test('должен показывать только завершённые по фильтру «Завершенные»', async ({ page }) => {
		const filterCompleted = page.getByRole('button', { name: 'Показать завершенные задачи' });
		await filterCompleted.click();

		await expect(page.getByText('Активная задача')).not.toBeVisible();
		await expect(page.getByText('Завершённая задача')).toBeVisible();
	});

	test('должен переключаться между фильтрами', async ({ page }) => {
		await expect(page.getByText('Активная задача')).toBeVisible();
		await expect(page.getByText('Завершённая задача')).toBeVisible();

		await page.getByRole('button', { name: 'Показать активные задачи' }).click();
		await expect(page.getByText('Завершённая задача')).not.toBeVisible();

		await page.getByRole('button', { name: 'Показать завершенные задачи' }).click();
		await expect(page.getByText('Активная задача')).not.toBeVisible();
		await expect(page.getByText('Завершённая задача')).toBeVisible();

		await page.getByRole('button', { name: 'Показать все задачи' }).click();
		await expect(page.getByText('Активная задача')).toBeVisible();
		await expect(page.getByText('Завершённая задача')).toBeVisible();
	});
});
