import { test, Browser, expect, Page, firefox } from "@playwright/test";


test('getByRole test', async()=>{
    const browser:Browser = await firefox.launch({headless:false});
    const page: Page = await browser.newPage();
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    await expect(page.getByRole('heading', {name: 'Register Account'})).toBeVisible();
    await expect(page.getByRole('link', {name:'Privacy Policy'}).first).toBeTruthy;
    await expect(page.getByRole('radio', {name:'No'})).toBeChecked();
    await page.getByRole('radio', {name:'Yes'}).click();

    await page.waitForTimeout(2000);
    await expect(page.getByRole('checkbox')).toBeVisible();
    await page.getByRole('checkbox').check();
    await page.waitForTimeout(5000);


});