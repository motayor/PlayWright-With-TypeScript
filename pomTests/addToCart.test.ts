import test, { chromium, expect } from "@playwright/test";

import RegisterPage from "../pomPages/registerPage";
import LoginPage from "../pomPages/loginPage";
import HomePage from "../pomPages/HomePage";
import fashionPage from "../pomPages/fashionPage";
import { register } from "module";

// make email and password reusable
const email = 'exterbal@user.com';
const password = 'password1234';

test.describe('Ecommerce Playground Tests', () => {
    
    test('Register Account', async () => {
        const browser = await chromium.launch({headless: false});
        const page = await browser.newPage();

        const register = new RegisterPage(page);
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register');
        await register.enterFirstName('John');
        await register.enterLastName('Doe');
        await register.enterEmail(email);
        await register.enterTelephone('1234567890');
        await register.enterPassword(password);   
        await register.enterConfirmPassword(password);
        expect(await register.isSubscribeChecked()).toBeChecked();
        await register.clickPrivacyPolicy();
        await register.clickContinueToRegister();

        await page.waitForTimeout(3000);
    })


    test('Login Test', async () => {
        const browser = await chromium.launch({headless: false});
        const page = await browser.newPage();
        
        const login = new LoginPage(page);
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        
        expect(await page).toHaveTitle('Account Login');

        await page.waitForTimeout(6000);
    })

    test('Add to Item cart test', async () => {
        const browser = await chromium.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://ecommerce-playground.lambdatest.io/route=account/login');

        const homePage = new HomePage(page);
        const fashion = new fashionPage(page);
        const login = new LoginPage(page);

        await login.loginDetails(email, password);
        await homePage.clickOnShopByCategories();
        await homePage.chooseFashionAccessories();
        await fashion.clickOnFirstFashionItem();
        await fashion.isCartVisible();
        await page.waitForTimeout(3000);
    }) 

})