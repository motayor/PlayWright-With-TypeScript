/**
 * This is a fixture demo test that works with the fixtures used in addToCartWithFixtures.test.ts
    */

import {test as baseTest, expect} from '@playwright/test';
import RegisterPage from '../pomPages/registerPage';
import LoginPage from '../pomPages/loginPage';
import fashionPage from '../pomPages/fashionPage';
import HomePage from '../pomPages/HomePage';

//specify the type of your fixture onbjects
type myPages = {
    registerPage: RegisterPage,
    loginPage: LoginPage,
    homePage: HomePage,
    fashionPage: fashionPage
}

//extend the myTest fixture
const testPages = baseTest.extend<myPages>({
    
    //give object to all the classes
    registerPage: async ({page},
                         use) => {
        await use(new RegisterPage(page));
    },
    loginPage: async ({page},
                      use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({page},
                     use) => {
        await use(new HomePage(page));
    },
    fashionPage: async ({page},
                        use) => {
        await use(new fashionPage(page));
    }
})

//export the fixture as...
export const testPOM = testPages;
export const expectPOM = testPages.expect;