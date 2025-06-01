import { test, expect } from '@playwright/test';

const BASE_URL = 'https://24slides.com/templates/featured';

test.describe('24Slides Login & Download Tests', () => {
  test('TC001 - Login via Email with Valid Credentials and Download Template', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: /Log in/i }).click();

    // Isi form login
    await page.getByPlaceholder('Enter your email').fill('dianhafidz98@gmai.com');
    await page.getByPlaceholder('Enter your password').fill('njengg98');
    await page.getByRole('button', { name: /Log in/i }).click();

    // Tunggu redirect kembali ke halaman template
    await page.waitForURL(/\/templates\/featured/);

    // Klik template pertama
    const firstTemplate = page.locator('a[href*="/templates/"]:visible').first();
    await firstTemplate.click();

    // Klik tombol Download
    const downloadButton = page.getByRole('button', { name: /Download/i });
    await expect(downloadButton).toBeVisible();
    await downloadButton.click();

    // Verifikasi unduhan berhasil (redirect ke file atau download terjadi)
    await expect(page).toHaveURL(/download/);
  });

  test('TC007 - Try to Download Without Logging In', async ({ page }) => {
    await page.goto(BASE_URL);

    // Klik template pertama
    const firstTemplate = page.locator('a[href*="/templates/"]:visible').first();
    await firstTemplate.click();

    // Klik tombol Download
    const downloadButton = page.getByRole('button', { name: /Download/i });
    await downloadButton.click();

    // Harus diarahkan ke halaman login
    await expect(page).toHaveURL(/login/);
  });
});

