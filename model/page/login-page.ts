import { expect, Page } from "@playwright/test";
import { CommonPage } from "../common-page";
import { ADMIN_PASSWORD, ADMIN_USERNAME, UI_ADMIN_LOGIN_URL } from "../utils/constants-utils";


export class LoginPage extends CommonPage{
    constructor(page: Page) {
        super(page);
    }

    async adminLogin() {
        await this.page.goto(UI_ADMIN_LOGIN_URL);
        await this.inputTextBoxByLabel('Email', ADMIN_USERNAME);
        await this.clickButtonByLabel('Login')
        await this.inputTextBoxByLabel('Enter your password', ADMIN_PASSWORD);
        await this.clickButtonByLabel('Continue')
        await expect(this.page.getByText('Your sales activity')).toBeVisible();
    }
}