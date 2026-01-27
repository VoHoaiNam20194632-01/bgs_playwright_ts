import { test, expect, Page } from "@playwright/test";
import { invalidLogin } from "../../../data/login/login-data";
import { LoginPage } from "../../../model/page/login-page";
import { UI_ADMIN_LOGIN_URL } from "../../../model/utils/constants-utils";

let loginPage: LoginPage
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(UI_ADMIN_LOGIN_URL);
})

test("Verify admin login successful", async ({ page }) => {
    await loginPage.adminLogin();
});
for (let data of invalidLogin) {
    test(data.testCaseName, async ({ page }) => {
        let emailValue = data.input['Email'] ?? '';
        let passwordValue = data.input['Enter your password'] ?? '';

        // nhập Email và click login
        await loginPage.inputTextBoxByLabel('Email',emailValue);
        await loginPage.clickButtonByLabel('Login');

        if(data.expect['Email']){
            await loginPage.verifyValidationMessageByLabel('Email',data.expect['Email']);
            // Đảm bảo không đi tiếp đến Home page
            await expect(
                page.getByText('Your sales activity')
            ).not.toBeVisible({ timeout: 3000 });

            // Dừng test ở đây (không cần kiểm tra password)
            return;
        }
        // Bước 2: Nếu không lỗi email → điền password và click Continue
        // (chỉ chạy khi không có lỗi email ở bước 1)
        await loginPage.inputTextBoxByLabel('Enter your password', passwordValue);
        await loginPage.clickButtonByLabel('Continue');

        // Kiểm tra lỗi password (nếu có trong expect)
        if (data.expect['Enter your password']) {
            await loginPage.verifyValidationMessageByLabel(
                'Enter your password',
                data.expect['Enter your password']
            );
        }

        // Luôn kiểm tra không vào được Home Page (negative case)
        await expect(
            page.getByText('Your sales activity')
        ).not.toBeVisible({ timeout: 3000 });
    });
}
