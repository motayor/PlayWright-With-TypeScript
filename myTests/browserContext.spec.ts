
import { Browser, Locator, test, expect, Page, BrowserContext } from '@playwright/test';
import { chromium, firefox, webkit } from '@playwright/test';

test('brContext test', async()=>{
    const browser:Browser = await chromium.launch({ channel:'chrome', headless:false});

    const brcontext1:BrowserContext = await browser.newContext();
    const brcontext2:BrowserContext = await browser.newContext();
    
    //Browser1
    const page:Page = await brcontext1.newPage();
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

    const emailId: Locator = await page.locator('input#input-email');
    const password: Locator = await page.locator('input#input-password');
    const loginButton: Locator = await page.locator('input[type="submit"]');

    await emailId.fill('mtn.olups@gmail.com');
    await password.fill('epj-ved4uqj5cpc4FUN');
    await loginButton.click();

    const title = await page.title();
    console.log('Login successfull. Home Page title is: ' + title + '\n');
    expect(title).toEqual('My Account');



    //Browser2
    const page2:Page = await brcontext2.newPage();
    await page2.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const emailId2 = await page2.locator('input#input-email').fill('pwtest@opencart.com');
    const password2 = await page2.locator('input#input-password').fill('playwright@123');
    const loginButton2 = await page2.locator('input[type="submit"]').click();

    console.log('Second Login successfull.');

  

    //close contexts 
    await brcontext1.close();
    await brcontext2.close();

    //close browser
    browser.close();

    await new Promise(r => setTimeout(r, 3000));  //prevents your script from closing before the browser closes


})


