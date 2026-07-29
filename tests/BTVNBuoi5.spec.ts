import { test, expect } from '@playwright/test';

test('Đăng nhập thành công với tài khoản hợp lệ', async ({ page }) => {
  // 1. ARRANGE: Mở trang đăng nhập
  await page.goto('https://the-internet.herokuapp.com/login');

  // 2. ACT: Nhập thông tin và click Login
  // Ưu tiên dùng user-centric locators (getByLabel, getByRole)
  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. ASSERT: Kiểm tra thông báo thành công xuất hiện
  const flashMessage = page.locator('#flash');
  
  // Kiểm tra banner thông báo có chứa đoạn text mong muốn
  await expect(flashMessage).toBeVisible();
  await expect(flashMessage).toContainText('You logged into a secure area!');
});