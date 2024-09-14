import { Browser, BrowserContext, firefox } from "@playwright/test";
import test from "@playwright/test";

/**
 * We can use dialog listeners to handle alerts and popups in Playwright tests.
*/

test('Handling Alerts', async () => {
    const browser: Browser = await firefox.launch({ headless: false });
    const context: BrowserContext = await browser.newContext();
    const page = await context.newPage();

    //set up a dialog listener
    page.on('dialog', async (alerts) => {
        const text = alerts.message();
        console.log(text);
        await alerts.dismiss();
    });


    // await page.goto('https://www.spicejet.com/');


    //Modal Dialogs
    const context2: BrowserContext = await browser.newContext();
    const page2 = await context2.newPage();

    page2.on('dialog', async (alerts) => {
        console.log(alerts.message());
        await alerts.accept();
    });

    await page2.goto('https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo');
    await page2.click('text=Launch Modal');
    await page.waitForTimeout(2000);
    await page2.click('text=Save Changes');






    await page.waitForTimeout(3000);
})

