import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render initial state and allow toggling', async () => {
		render(Page);

		const heading = page.getByRole('heading', { level: 1, name: 'Is de ON5 vrij?' });
		await expect.element(heading).toBeInTheDocument();

		// Wait for the initial state to load via SSE
		const statusLocator = page.locator('.status p');
		await expect.element(statusLocator).not.toHaveText('Een moment geduld, status wordt geladen...');

		const initialStatus = await statusLocator.textContent();
		expect(['JA!', 'NEE!']).toContain(initialStatus);

		// Click the toggle button
		await page.getByRole('button', { name: 'Toggle Status' }).click();

		// Wait for the state to update by checking that the text content has changed
		await expect.element(statusLocator).not.toHaveText(initialStatus ?? '');

		const newStatus = await statusLocator.textContent();
		expect(newStatus).not.toBe(initialStatus);
		expect(['JA!', 'NEE!']).toContain(newStatus);
	});
});
