import test, { expect, firefox } from "@playwright/test";


test('Login test demo', async() =>{

    const browser = await firefox.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://ecommerce-playground.lambdatest.io/');

    await page.locator('//*[@id="widget-navbar-217834"]/ul/li[6]/a/div/span').hover();
    // await page.locator('span[class="title"]').nth(19).hover();
    await page.click('text=Login');

    await expect(page).toHaveTitle('Account Login');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');

    await page.waitForTimeout(3000);


    await page.fill('input[name="email"]', 'myUsername');
    await page.fill('input[name="password"]', 'myPassword');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    
    



})