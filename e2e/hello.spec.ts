import { expect, test } from '@playwright/test';

/**
 * Hello World E2E тест для VAN QA (Technology Validation)
 * Проверяет базовую загрузку приложения и наличие ключевых элементов
 */
test.describe('Загрузка приложения', () => {
	test('должен отобразить страницу pet.todo', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveTitle('pet.todo');
	});

	test('должен содержать поле для ввода новой задачи', async ({ page }) => {
		await page.goto('/');

		const input = page.getByRole('textbox', { name: 'Новая задача' });
		await expect(input).toBeVisible();
	});
});
