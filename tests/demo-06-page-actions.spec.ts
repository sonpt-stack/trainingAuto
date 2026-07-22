/**
 * ============================================================
 * BUỔI 2 – DEMO 06: Các hàm thao tác trang thường dùng
 * ============================================================
 * Mục tiêu: Làm quen các hàm ACT (thao tác) cơ bản
 *
 * Chạy: npx playwright test tests/demo-06-page-actions.spec.ts
 */
/* BTVN
1. Module test Các page actions cơ bản
2. Có 6 test
- test 1: Nhập text vào ô input => 'Nội dung cần nhập'
- test 2: Test click vào checkbox để đánh dấu hoàn thành task
- test 3: Test nhấn phím enter sau khi nhập thông tin
- task 4: Test xóa task
- task 5: Test mở và chọn option trong dropdown
- task 6: Test check và uncheck checkbox

*/ 

import { test, expect } from '@playwright/test';

test.describe('Các hàm thao tác (page actions) cơ bản', () => {
//ARRANGE
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('ACT-01: page.fill() – Nhập text vào ô input', async ({ page }) => {
    // Nhập text//ACTION
    await page.fill('input.new-todo', 'Nội dung cần nhập');
    await page.keyboard.press('Enter');

    // Kiểm tra//ASERT
    await expect(page.locator('.todo-list li'))
      .toContainText('Nội dung cần nhập');
  });
//GIẢI THÍCH EXPECT: Trong locator todo list chứa text "Nội dung cần nhập"

  test('ACT-02: page.click() – Click vào element', async ({ page }) => {
    // Thêm 1 task
    await page.fill('input.new-todo', 'Task cần hoàn thành');
    await page.keyboard.press('Enter');

    // Click vào checkbox để đánh dấu hoàn thành
    await page.click('.todo-list li .toggle');

    // Kiểm tra task đã được đánh dấu hoàn thành (class completed)
    await expect(page.locator('.todo-list li')).toHaveClass(['completed']);
  });

  test('ACT-03: page.keyboard.press() – Nhấn phím', async ({ page }) => {
    // Nhấn Enter sau khi fill
    await page.fill('input.new-todo', 'Task từ bàn phím');
    await page.keyboard.press('Enter');     // Nhấn Enter

    // Nhấn Escape
    // await page.keyboard.press('Escape');

    await expect(page.locator('.todo-list li')).toHaveCount(1);
  });

  test('ACT-04: page.locator().hover() – Hover chuột', async ({ page }) => {
    // Thêm task trước
    await page.fill('input.new-todo', 'Task để hover');
    await page.keyboard.press('Enter');

    // Hover vào task để hiện nút Xóa
    await page.locator('.todo-list li').hover();

    // Click nút xóa (chỉ hiện khi hover)
    await page.click('.todo-list li .destroy');

    // Kiểm tra task đã bị xóa
    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });

  test('ACT-05: page.selectOption() – Chọn dropdown', async ({ page }) => {
    // Mở trang có dropdown
    await page.goto('https://the-internet.herokuapp.com/dropdown');

    // Chọn option trong dropdown
    await page.selectOption('#dropdown', '1');

    // Kiểm tra giá trị đã được chọn
    await expect(page.locator('#dropdown')).toHaveValue('1');

    // Chọn option khác
    await page.selectOption('#dropdown', '2');
    await expect(page.locator('#dropdown')).toHaveValue('2');
  });

  test('ACT-06: page.locator().check() – Check vào checkbox', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');

    // Lấy checkbox đầu tiên
    const checkbox1 = page.locator('input[type="checkbox"]').first();

    // Check vào checkbox (nếu chưa check)
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();

    // Uncheck checkbox
    await checkbox1.uncheck();
    await expect(checkbox1).not.toBeChecked();
  });
});
