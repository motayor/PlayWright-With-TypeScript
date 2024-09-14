
import { Browser, firefox, Page } from 'playwright';
import test from '@playwright/test';

test('Download file', async()=>{
    const browser: Browser = await firefox.launch({headless:false});
    const context = await browser.newContext();
    const page:Page = await context.newPage();

    await page.goto('https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo');
    await page.waitForTimeout(2000);
    await page.fill('#textbox', 'This is a test file to be downloaded');
    
    // const txtbox = await page.locator('#textbox');
    // await txtbox.focus();
    // await txtbox.pressSequentially('This is a test file to be downloaded', {delay: 100});
    // await page.waitForTimeout(2000);

    page.click('Generate File');
    console.log('File generated');

    const download = await Promise.all([ // Wait for the download event
        page.waitForEvent('download'), 
        page.click('id=link-to-download')
    ]);
    const fileName = download[0].suggestedFilename(); // Get the file name
    await download[0].saveAs(fileName); // Save the file
    const path = download[0].path(); // Get the path of the file
    console.log('File downloaded at: ', path);

    

})

