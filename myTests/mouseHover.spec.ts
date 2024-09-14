import test, { Browser, BrowserContext, chromium, firefox, Page } from "@playwright/test";
import { text } from "stream/consumers";


test('mouse hover', async()=>{
    const browser: Browser = await firefox.launch({headless:false});
    // const brContxt: BrowserContext = await browser.newContext({recordVideo:{dir: 'videos/'}});
    // const page: Page = await brContxt.newPage();

    const page:Page = await browser.newPage();

    // Set up a counter for the number of alerts
    let alertCount = 0;

    // Set up a dialog listener
    page.on('dialog', async (dialog) => {
        const text: string = dialog.message();
        console.log(text);

        // Handle the first and second alert
        if (alertCount === 0) {
            await dialog.accept();
        } else if (alertCount === 1) {
            await dialog.accept();
        }

        // Increment the alert counter
        alertCount++;
    });

    await page.goto('https://bigbasket.com/');
    await page.locator('[id="headlessui-menu-button-\\:R5bab6\\:"]').click();

    // Hover over the beverage category and click
    await page.locator('[id="headlessui-menu-items-\\:R9bab6\\:"]')
        .getByRole('link', { name: 'Beverages' }).hover();
    await page.waitForTimeout(3000);

    // Hover over the tea category
    await page.locator('[id="headlessui-menu-items-\\:R9bab6\\:"]')
        .getByRole('link', { name: 'Tea', exact: true }).hover();
    await page.waitForTimeout(2000);

    // Click on the 'Tea Bags' link
    await page.locator('[id="headlessui-menu-items-\\:R9bab6\\:"]')
        .getByRole('link', { name: 'Tea Bags' }).click();
    await page.waitForTimeout(2000);

    // Wait for the page to load
    await page.waitForLoadState('networkidle');



    // // Mouse Hover
    // await page.getByText('Category').first().hover();
    // await page.getByText('SpiceMAX').first().click();

    // // Wait for the alerts to be handled
    // await page.waitForTimeout(3000);

    // await page.waitForTimeout(3000);
    console.log(await page.title());



})
