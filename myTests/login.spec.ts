import{test, expect, Browser, Page, Locator} from '@playwright/test'
import{webkit, chromium, firefox} from '@playwright/test'
import * as authData from "../projectdata/logindata.json";

test('login test', async()=>{
    const browser: Browser = await firefox.launch({headless:false});
    const page:Page = await browser.newPage();

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const emailId: Locator = page.locator('input#input-email');
    const password: Locator = page.locator('input#input-password');
    const loginButton: Locator = page.locator('input[type="submit"]');

    await emailId.fill(authData.userEmail);
    await password.fill(authData.userPassword);
    await loginButton.click();

    const title = await page.title();
        
    console.log('Home Page title is: ' + title + '  ...Login successfull');
    expect(title).toEqual('My Account');

    //Take screenshot
    await page.screenshot({path:'login.png'});

    //Close the browser
    await browser.close();
}

) 


