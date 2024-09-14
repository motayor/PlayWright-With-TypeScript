import test, { Browser, BrowserContext, firefox, Page } from "@playwright/test";


test('authPopups test', async()=>{
    const browser:Browser = await firefox.launch({headless:false});
    const brContext: BrowserContext = await browser.newContext();
    
    const page:Page = await brContext.newPage();

    const username = 'pwtest@opencart.com';
    const password = 'playwright@123';
    await page.setExtraHTTPHeaders({'Authorization': createAuthHeader(username, password)});

    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    // await page.goto('https://oasis-trim-manager.qa.is.autodatacorp.org/');


    // await new Promise(r => setTimeout(r, 3000));  //prevents your script from closing before the browser closes
})

function createAuthHeader(username: string, password: string) {
    return 'Basic' + btoa(username + ':' + password); //if authourization type is Basic
}   
