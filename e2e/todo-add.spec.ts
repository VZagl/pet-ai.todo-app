import { expect } from '@playwright/test';
import { MAX_TODO_LENGTH } from '../src/constants/todo';
import { test } from './fixtures';

test.describe('Добавление задачи', () => {
	test('должен добавить задачу по Enter', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });

		await input.fill('Купить молоко');
		await input.press('Enter');

		await expect(page.getByText('Купить молоко')).toBeVisible();
		await expect(input).toHaveValue('');
	});

	test('должен добавить задачу по кнопке «Добавить»', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });
		const addButton = page.getByRole('button', { name: 'Добавить задачу' });

		await input.fill('Пройти собеседование');
		await addButton.click();

		await expect(page.getByText('Пройти собеседование')).toBeVisible();
		await expect(input).toHaveValue('');
	});

	test('должен показать ошибку при пустой строке', async ({ page }) => {
		// Кнопка отключена при пустом input — вызываем submit программно
		await page.locator('form.todo-input').evaluate((form) => (form as HTMLFormElement).requestSubmit());

		await expect(page.getByRole('alert')).toContainText('Введите текст задачи');
		await expect(page.getByText('Нет задач для отображения')).toBeVisible();
	});

	test('должен показать ошибку при превышении длины', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });
		const longText = 'а'.repeat(MAX_TODO_LENGTH + 1);

		await input.click();
		await input.fill(longText);

		await expect(page.getByRole('alert')).toContainText(`Максимальная длина задачи: ${MAX_TODO_LENGTH} символов`);
	});

	test('должен добавить задачу максимальной длины', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });
		const addButton = page.getByRole('button', { name: 'Добавить задачу' });
		const validLongText = 'а'.repeat(MAX_TODO_LENGTH);

		await input.click();
		await input.fill(validLongText);
		await addButton.click();

		await expect(page.getByText(validLongText)).toBeVisible();
	});
});
