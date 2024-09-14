
/** '.Focus()' method allows you to put cursor on an element so yo could do other actions 
 * like typing, clicking, etc.  Or just for visibilty purposes
 *  */

import test, { Browser, expect, firefox } from "@playwright/test";

test('Focus on Element', async()=>{
    const browser:Browser = await firefox.launch({headless:false});
    const page = await browser.newPage();

    // page.goto('https://the-internet.herokuapp.com/login');
    page.goto('https://www.facebook.com/');
    await page.waitForTimeout(2000);

    //focus on email input field
    const uName = await page.locator('input[name="email"]');
    await uName.focus();
    await page.waitForTimeout(2000);
    await uName.fill('myusername@me.com');

    await page.waitForTimeout(4000);
    await expect(uName).toHaveValue('myusername@me.com');




})
