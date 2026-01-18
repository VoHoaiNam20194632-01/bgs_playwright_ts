import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../../../model/page/login-page";
import { NewProductPage } from "../../../../model/page/product-page/new-product/new-product-page";
import { HomePage } from "../../../../model/page/home-page/home-page";
import { AllProductPage } from "../../../../model/page/product-page/all-product-page";

let loginPage: LoginPage
let homePage: HomePage
let allProductPage: AllProductPage
let newProductPage: NewProductPage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    allProductPage = new AllProductPage(page);
    newProductPage = new NewProductPage(page);
    await page.goto("https://admin-dev.burgershop.io/authentication/login");
    await loginPage.adminLogin();
})

test("Verify New Product Success", async ({ page }) => {
    await homePage.clickMenuByLabel('Products');
    await page.waitForTimeout(2000)
    await homePage.clickMenuByLabel('All products');
    await page.waitForTimeout(2000)
    await allProductPage.isDisplay();
    await allProductPage.clickButtonByLabel('Create POD product');
    await newProductPage.addProductType('Unisex Tank Top | Gildan 2200 (US)');
    await newProductPage.designColor('Unisex Tank Top | Gildan 2200 (US)');
});