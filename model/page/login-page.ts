import { expect, Page } from "@playwright/test";
import { CommonPage } from "../common-page";


export class LoginPage extends CommonPage{
    constructor(page: Page) {
        super(page);
    }

    async adminLogin() {
        await this.inputTextBoxByLabel('Email', 'namvh@leadsgen.asia');
        await this.clickButtonByLabel('Login')
        await this.inputTextBoxByLabel('Enter your password', '2408122001Nam@');
        await this.clickButtonByLabel('Continue')
        await expect(this.page.getByText('Your sales activity')).toBeVisible();
    }
}