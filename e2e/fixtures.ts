import { test as base } from '@playwright/test';

/**
 * Fixture с изоляцией localStorage между тестами.
 * Очищает localStorage после первой загрузки и перезагружает страницу.
 * Не использует addInitScript, чтобы page.reload() в тестах не очищал данные.
 */
export const test = base.extend({
	page: async ({ page }, run) => {
		await page.goto('/');
		await page.evaluate(() => localStorage.clear());
		await page.reload();
		await run(page);
	},
});

export { expect } from '@playwright/test';
