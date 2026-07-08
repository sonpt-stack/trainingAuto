/**
 * ============================================================
 * BUỔI 2 – DEMO 02: Pattern AAA (Arrange – Act – Assert)
 * ============================================================
 * Mục tiêu: Hiểu cấu trúc 3 phần của mọi test case
 * Pattern AAA là "xương sống" của mọi test case
 *
 *      ARRANGE          →        ACT        →       ASSERT
 *    (Chuẩn bị)            (Thực hiện)           (Kiểm tra)
 *
 * Chạy: npx playwright test tests/demo-02-aaa-pattern.spec.ts
 */
/*BTVN
Bai 3.1
Error: expect(locator).toBeVisible() failed

Locator: locator('#phanthanhson')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Bai 3.2
Do DATA truyền sai selector để test
*/
import { test, expect } from '@playwright/test';

// ─── Ví dụ 1: Tìm kiếm trên Google ───────────────────────────
test('AAA-01: Tìm kiếm từ khóa "Playwright" trên Google', async ({ page }) => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~ ARRANGE ~~~~~~~~~~~~~~~~~~~~~~~~
  // Chuẩn bị: mở trang Google
  await page.goto('https://www.google.com');

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~ ACT ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Thực hiện: nhập từ khóa và nhấn Enter
  await page.fill('textarea[name="q"]', 'Playwright Testing');
  await page.keyboard.press('Enter');

  // ~~~~~~~~~~~~~~~~~~~~~~~~ ASSERT ~~~~~~~~~~~~~~~~~~~~~~~~~
  // Kiểm tra: kết quả tìm kiếm xuất hiện
  await expect(page.locator('#phanthanhson')).toBeVisible();
});


// ─── Ví dụ 2: Form đăng ký ──────────────────────────────────
test('AAA-02: Điền form đăng ký và kiểm tra validation', async ({ page }) => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~ ARRANGE ~~~~~~~~~~~~~~~~~~~~~~~~
  // Demo dùng trang test của Playwright
  await page.goto('https://demo.playwright.dev/todomvc');

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~ ACT ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Thêm 1 todo item
  await page.fill('input.new-todo', 'Học Playwright Automation');
  await page.keyboard.press('Enter');

  // ~~~~~~~~~~~~~~~~~~~~~~~~ ASSERT ~~~~~~~~~~~~~~~~~~~~~~~~~
  // Kiểm tra todo đã xuất hiện trong danh sách
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('.todo-list li label'))
    .toContainText('Học Playwright Automation');
});


// ─── Ví dụ 3: Mô phỏng test case iPortal ────────────────────
test('AAA-03: Mô phỏng tìm kiếm đơn vị trên iPortal', async ({ page }) => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~ ARRANGE ~~~~~~~~~~~~~~~~~~~~~~~~
  // Đăng nhập (giả lập)
  await page.goto('https://dev42-iportal.opdev.vn/iportal/');
  console.log('✅ Bước 1: Đã mở trang iPortal');
  console.log('✅ Bước 2: Đã đăng nhập (nếu có fixture login)');
  console.log('✅ Bước 3: Đã điều hướng đến Merchant Management');

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~ ACT ~~~~~~~~~~~~~~~~~~~~~~~~~~
  console.log('🔄 Bước 4: Nhập từ khóa tìm kiếm "TEST ONEPAY"...');
  console.log('🔄 Bước 5: Click nút "Tìm kiếm"...');

  // ~~~~~~~~~~~~~~~~~~~~~~~~ ASSERT ~~~~~~~~~~~~~~~~~~~~~~~~~
  console.log('🔍 Bước 6: Kiểm tra kết quả hiển thị đúng...');
});
