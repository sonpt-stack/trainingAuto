import { test, expect } from '@playwright/test';

test.setTimeout(30000);

test('Google Search - Playwright automation', async ({ page, context }) => {
  // Tránh bị Google phát hiện trình duyệt tự động
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  // 1. ARRANGE: Mở trang Google
  await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });

  
  const acceptBtn = page.getByRole('button', { name: /accept all|tất cả|đồng ý/i });
  if (await acceptBtn.isVisible().catch(() => false)) {
    await acceptBtn.click();
  }

  // 2. ACT: Nhập từ khóa tìm kiếm và nhấn Enter
  const searchInput = page.locator('[name="q"]');
  await searchInput.fill('Playwright automation');
  
  // Đảm bảo lệnh press Enter thực thi cùng với việc chờ trang chuyển hướng
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {}),
    searchInput.press('Enter'),
  ]);

  // 3. ASSERT: Kiểm tra các tiêu đề kết quả tìm kiếm (thẻ h3 trong khung #rso)
  const searchResults = page.locator('#rso h3');

  // Kiểm tra tiêu đề kết quả đầu tiên xuất hiện
  await expect(searchResults.first()).toBeVisible({ timeout: 1000 });

  // Kiểm tra số lượng kết quả lớn hơn 0
  const count = await searchResults.count();
  expect(count).toBeGreaterThan(0);
});