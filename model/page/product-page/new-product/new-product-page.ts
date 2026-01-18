import { expect, Page } from "@playwright/test";
import { CommonPage } from "../../../common-page";
import path from "path";

export class NewProductPage extends CommonPage {
    constructor(page: Page) {
        super(page);
    }

    async isDisplayByPopup(textPopup: string) {
        await expect(this.page.locator(`//span[normalize-space()="${textPopup}"]`)).toBeVisible();
    }
    async notDisplayByPopup(textPopup: string) {
        await expect(this.page.locator(`//span[normalize-space()="${textPopup}"]`)).not.toBeVisible();
    }
    async addProductType(baseName: string) {
        await this.isDisplayByPopup('Add product type');
        await this.inputTextBoxByLabel('Add product type', baseName);
        await this.clickTextByLabel(baseName);
        await this.clickButtonByLabelOfPopup('Add product type', 'Save')
        await this.notDisplayByPopup('Add product type');
    }

    async designColor(baseName: string) {
        const PopupDesignLocator = this.page.locator(`//bgs-design-editor-dialog`);
        const productTypeItemLocator = this.page.locator(`//bgs-product-type-item[.//span[normalize-space()="${baseName}"]]`);
        await expect(PopupDesignLocator.locator('//span[normalize-space()="Design"]')).toBeVisible();
        let iconAddColorXpath = `//button[@severity="secondary"]`;
        await productTypeItemLocator.locator(iconAddColorXpath).click();
        const { current, maxColorAdd } = await this.getQtyColorCurrenctAndTotalColorAddMax(baseName);
        const listTextColorBase = await this.getListColorBaseProductActive(baseName);
        if (maxColorAdd > 1 && maxColorAdd < listTextColorBase.length) {
            for (let i = 0; i < maxColorAdd - current; i++) {
                let colorAddXpath = `//span[normalize-space()="${listTextColorBase[i]}"]`
                this.page.locator(colorAddXpath).click();
            }
        } else {
            for (let i = 0; i < listTextColorBase.length; i++) {
                let colorAddXpath = `//span[normalize-space()="${listTextColorBase[i]}"]`
                this.page.locator(colorAddXpath).click();
            }
        }
        let buttonCloseDialogAddColorXpath = `//div[starts-with(text(), 'Add color')]//svg-icon`;
        this.page.locator(buttonCloseDialogAddColorXpath).click();
    }

    async getSizeRecommendBase(baseName: string) {
        let textRecommendSizeProductXpath = `//div[contains(text(), 'Recommend')]`;
        const textRecommendSizeProduct = await this.page.locator(textRecommendSizeProductXpath).textContent();
        const match = textRecommendSizeProduct?.match(/\d+x\d+/);

        if (match) {
            const sizeStr = match[0];  // "2100x2400"

            console.log("size recommend base", sizeStr);  // Kết quả: "2100x2400"
            return sizeStr;
        } else {
            console.log(`Không tìm size recommend base : ${baseName}`);
        }
    }

    async uploadImageProduct(baseName: string) {
        const productTypeItem = this.page.locator(`//bgs-product-type-item[.//span[normalize-space()="${baseName}"]]`);
        await productTypeItem.click();
        await this.clickButtonByLabel('Add image');
        await this.getSizeRecommendBase(baseName);
    }

    async getListColorBaseProductActive(baseName: string) {
        const productTypeItem = this.page.locator(`//bgs-product-type-item[.//span[normalize-space()="${baseName}"]]`);
        let listColorBaseLocator = productTypeItem.locator(`(//div[starts-with(text(), 'Add color')]//following::div)[1]//div[contains(concat(' ',normalize-space(@class),' '),' cursor-pointer ')]//span`);
        // Lấy tất cả text của các span (danh sách màu)
        const colorTexts = await listColorBaseLocator.allInnerTexts();

        // Làm sạch text nếu cần (trim, loại bỏ rỗng)
        const cleanedColors = colorTexts
            .map(text => text.trim())
            .filter(text => text.length > 0);

        return cleanedColors;
    }

    async getQtyColorCurrenctAndTotalColorAddMax(baseName: string) {
        // const ptoductTypeItem = this.page.locator(`//bgs-product-type-item[.//span[normalize-space()="${baseName}"]]`);
        let inforQtyColorProductLocator = this.page.locator(`//div[@role="dialog"]//div[starts-with(text(), 'Add color')]`);
        const text = await inforQtyColorProductLocator.textContent() || '';
        const match = text.match(/\((\d+)\/(\d+)\)/);
        if (match) {
            const current = Number(match[1]); // 1
            const maxColorAdd = Number(match[2]);   // 12
            return { current, maxColorAdd };
        }

        throw new Error(`Không tìm thấy số lượng màu trong product: "${baseName}"`);
    }

}
