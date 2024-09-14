/**To get an accurate web element locator, you can use the locator chaining technique. 
 * This technique involves using multiple locators to get the desired web element. 
 * Locator chaining is useful when you cannot locate a web element using a single locator.
 * 
 * It employs the double greater than (>>) symbol to chain multiple locators.
 *    i.e. css=article >> css=.bar > .baz >> css=span[attr=value]
 * 
 * For example, you can use the following code snippet to locate a web element using multiple locators:
*/

import test, { Browser, chromium, Page } from "@playwright/test";

 

test('chain locators', async()=>{
    const browser: Browser = await chromium.launch({headless:false});
    const page: Page = await browser.newPage();

    await page.goto('https://orangehrm.com/30-day-free-trial/');

    //Chaining Selectors
    // await page.locator('form#Form_getForm >> #Form_getForm_Name').fill('Dave Smith');
    // await page.locator('form#Form_getForm >> text=Get Your Free Trial').click();

    //It is more efficient to Chain Locators
    // const form = page.locator('form#Form_getForm');
    // const getYourFreeTrialBtn = page.getByRole('button', {name: 'Get Your Free Trial'});
    // await form.locator(getYourFreeTrialBtn).click();  //useful incase there are multiple buttons on the page. This one specifies that the btn must be in the form.
    
    //OR
    await page.locator('form#Form_getForm').locator('#Form_getForm_Name').fill('Dave Smith');
    await page.locator('form#Form_getForm').locator('text=Get Your Free Trial').click();


    await page.waitForTimeout(4000);

})

