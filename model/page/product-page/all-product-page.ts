import { expect, Page } from "@playwright/test";
import { CommonPage } from "../../common-page";

export class AllProductPage extends CommonPage{
    constructor(page: Page) {
        super(page);
    }

    async isDisplay() {
        await expect(this.page.locator('//h4[normalize-space()="All products"]')).toBeVisible();
    }
}