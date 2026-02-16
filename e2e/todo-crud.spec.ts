import { expect } from '@playwright/test';
import { test } from './fixtures';

test.describe('CRUD: добавление, переключение, удаление', () => {
	test('должен выполнить полный flow: add → toggle → delete', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });
		const addButton = page.getByRole('button', { name: 'Добавить задачу' });
		const footer = page.locator('.todo-footer');

		// Добавление
		await input.fill('Задача для удаления');
		await addButton.click();

		await expect(page.getByText('Задача для удаления')).toBeVisible();
		await expect(footer).toContainText('1 задача осталась');

		// Переключение (отметить как выполненную)
		const checkbox = page.getByRole('checkbox', { name: /Отметить задачу "Задача для удаления"/ });
		await checkbox.click();

		await expect(checkbox).toBeChecked();
		await expect(footer).toContainText('0 задач осталось');

		// Удаление
		const deleteButton = page.getByRole('button', { name: /Удалить задачу "Задача для удаления"/ });
		await deleteButton.click();

		await expect(page.getByText('Задача для удаления')).not.toBeVisible();
		await expect(page.getByText('Нет задач для отображения')).toBeVisible();
	});

	test('должен добавлять несколько задач и обновлять счётчик', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });
		const addButton = page.getByRole('button', { name: 'Добавить задачу' });
		const footer = page.locator('.todo-footer');

		await input.fill('Первая задача');
		await addButton.click();

		await input.fill('Вторая задача');
		await addButton.click();

		await expect(page.getByText('Первая задача')).toBeVisible();
		await expect(page.getByText('Вторая задача')).toBeVisible();
		await expect(footer).toContainText('2 задачи осталось');

		// Отметить первую как выполненную
		const checkbox1 = page.getByRole('checkbox', { name: /Отметить задачу "Первая задача"/ });
		await checkbox1.click();

		await expect(footer).toContainText('1 задача осталась');
	});
});
