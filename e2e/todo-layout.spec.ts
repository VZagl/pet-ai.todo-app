import { expect } from '@playwright/test';
import { test } from './fixtures';

/**
 * E2E тест стабильности layout (creative-app-redesign)
 * Проверяет, что header, input, footer закреплены и не смещаются при разном количестве задач.
 * Footer прижат к низу окна, прокручивается только список задач.
 */
test.describe('Стабильность layout', () => {
	test.use({ viewport: { width: 800, height: 600 } });

	test('закреплённые элементы не смещаются при 0, 1, 2, 20+ задачах', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });
		const addButton = page.getByRole('button', { name: 'Добавить задачу' });

		const getHeaderBox = () => page.getByRole('heading', { name: 'TODO' }).boundingBox();
		const getInputBox = () => input.boundingBox();
		const getFooterBox = () => page.getByRole('contentinfo').boundingBox();
		const getViewportHeight = () => page.viewportSize()!.height;

		// 0 задач — footer не отображается, проверяем header и input
		const headerBox0 = await getHeaderBox();
		const inputBox0 = await getInputBox();
		expect(headerBox0).not.toBeNull();
		expect(inputBox0).not.toBeNull();

		// 1 задача
		await input.fill('Задача 1');
		await addButton.click();
		await page.waitForTimeout(100);

		const headerBox1 = await getHeaderBox();
		const inputBox1 = await getInputBox();
		const footerBox1 = await getFooterBox();
		expect(headerBox1).not.toBeNull();
		expect(inputBox1).not.toBeNull();
		expect(footerBox1).not.toBeNull();

		// Позиции header и input не должны измениться
		expect(headerBox1!.y).toBe(headerBox0!.y);
		expect(inputBox1!.y).toBe(inputBox0!.y);

		// 2 задачи
		await input.fill('Задача 2');
		await addButton.click();
		await page.waitForTimeout(100);

		const headerBox2 = await getHeaderBox();
		const inputBox2 = await getInputBox();
		const footerBox2 = await getFooterBox();
		expect(headerBox2!.y).toBe(headerBox0!.y);
		expect(inputBox2!.y).toBe(inputBox0!.y);
		// Footer остаётся на том же месте (прижат к низу)
		expect(footerBox2!.y).toBe(footerBox1!.y);

		// 20+ задач
		for (let i = 3; i <= 22; i++) {
			await input.fill(`Задача ${i}`);
			await addButton.click();
		}
		await page.waitForTimeout(100);

		const headerBox20 = await getHeaderBox();
		const inputBox20 = await getInputBox();
		const footerBox20 = await getFooterBox();
		expect(headerBox20!.y).toBe(headerBox0!.y);
		expect(inputBox20!.y).toBe(inputBox0!.y);
		// Footer прижат к низу окна
		const viewportHeight = getViewportHeight();
		expect(footerBox20!.y + footerBox20!.height).toBeGreaterThanOrEqual(viewportHeight - 5);
	});

	test('footer прижат к низу окна, прокручивается только список', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Новая задача' });
		const addButton = page.getByRole('button', { name: 'Добавить задачу' });

		// Добавляем 15 задач
		for (let i = 1; i <= 15; i++) {
			await input.fill(`Задача ${i}`);
			await addButton.click();
		}
		await page.waitForTimeout(100);

		const footer = page.getByRole('contentinfo');
		const viewportHeight = page.viewportSize()!.height;
		const footerBox = await footer.boundingBox();
		expect(footerBox).not.toBeNull();
		// Footer у нижней границы viewport
		expect(footerBox!.y + footerBox!.height).toBeGreaterThanOrEqual(viewportHeight - 10);

		// Прокручиваем контент — header и footer должны оставаться видимыми
		const listArea = page.locator('.todo-app__list-area');
		await listArea.evaluate((el) => el.scrollTo(0, el.scrollHeight));
		await page.waitForTimeout(100);

		// Header и footer всё ещё на экране
		await expect(page.getByRole('heading', { name: 'TODO' })).toBeVisible();
		await expect(footer).toBeVisible();
	});
});
