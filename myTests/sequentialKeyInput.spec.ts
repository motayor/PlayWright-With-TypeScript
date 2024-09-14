import test, { Browser, chromium, Page } from "@playwright/test";

/** '.pressSequentialKeys' is a function that allows you to input keys sequentially.
 *  with some delays between each key press.
 * It is useful when you want to simulate a user typing in a text field.
 *  It takes in a string of keys to press and an optional delay between each key press.
 */


test('sequential key input', async()=>{ //page is provided by the test runner

    const browser: Browser = await chromium.launch({headless:false, channel: 'chrome'});
    const page: Page = await browser.newPage();

    // await page.goto('https://the-internet.herokuapp.com/key_presses');
    await page.goto('https://flipkart.com');
    await page.getByPlaceholder('Search for Products, Brands and More')
    .pressSequentially('Laptop', {delay: 500}); //type 'Laptop' with a delay of 500ms between each key press

    
    await page.waitForTimeout(4000);

})
  