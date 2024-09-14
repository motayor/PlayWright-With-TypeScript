

import { testPOM, expectPOM } from "../pombase/pomFixtures";   // import the fixture

import RegisterPage from "../pomPages/registerPage";
import LoginPage from "../pomPages/loginPage";
import HomePage from "../pomPages/HomePage";
import fashionPage from "../pomPages/fashionPage";

import { chromium } from "@playwright/test";

// make email and password reusable
const email = 'exterbal@user.com';
const password = 'password1234';

testPOM.describe('Ecommerce Playground Tests', () => {
    
    testPOM('Register Account', async ({registerPage}) => {
        const browser = await chromium.launch({headless: false});
        const page = await browser.newPage();

//       const register = new RegisterPage(page); //Since we now have a fixture, we can remove the instantiation of the RegisterPage class
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register');
        //use method from the fixture
        await registerPage.enterFirstName('John');
        await registerPage.enterLastName('Doe');
        await registerPage.enterEmail(email);
        await registerPage.enterTelephone('1234567890');
        await registerPage.enterPassword(password);   
        await registerPage.enterConfirmPassword(password);
        await expectPOM(registerPage.isSubscribeChecked()).toBeChecked();
        await registerPage.clickPrivacyPolicy();
        await registerPage.clickContinueToRegister();

        await page.waitForTimeout(3000);
    })


    testPOM('Login Test', async ({loginPage}) => {
        const browser = await chromium.launch({headless: false});
        const page = await browser.newPage();
        
//        const login = new LoginPage(page);  //same here, we can remove the instantiation of the LoginPage class
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();
        await expectPOM(page).toHaveTitle("My Account");


        await page.waitForTimeout(3000);
    })

    testPOM('Add to Item cart test', async ({loginPage, homePage, fashionPage} ) => {
        const browser = await chromium.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://ecommerce-playground.lambdatest.io/route=account/login');

        //same here too
        // const homePage = new HomePage(page);  
        // const fashion = new fashionPage(page);
        // const login = new LoginPage(page);

        await LoginPage.loginDetails(email, password);
        await homePage.clickOnShopByCategories();
        await homePage.chooseFashionAccessories();
        await fashionPage.clickOnFirstFashionItem();
        await fashionPage.isCartVisible();
        await page.waitForTimeout(3000);
    }) 

})