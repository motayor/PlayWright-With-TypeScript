
/**
 * Some hyperlinks produce a pop up window when clicked.
 * This test shows how to handle pop up windows and tabs in Playwright
 */

import test, { Browser, firefox, Page } from "@playwright/test";

test('Popup Tabs & Wins', async()=>{
    const browser: Browser = await firefox.launch({headless:false});
    const context = await browser.newContext();
    const page:Page = await context.newPage();

    await page.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo');

    console.log(page.url() + '\n'); //print the URL of the current page

    //create a catch block to sync clicking and pop up handling
    const [newWindow] = await Promise.all([
        page.waitForEvent('popup'),  //wait for the popup to appear
        await page.click('"Follow On Twitter"')  //click on the hyperlink that opens a new window
    ]);

    console.log(newWindow.url()); //print the URL of the new window
    await page.waitForTimeout(3000); //wait for 3 seconds
    

    //Handle multiple tabs at once
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();

    await page2.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo');

    const [multiTabs] = await Promise.all([
        page2.waitForEvent('popup'), 
        await page2.click('"Follow Twitter & Facebook"')
    ]);

    await multiTabs.waitForLoadState('domcontentloaded'); //wait for the pages to load

    //verify
    const pages = multiTabs.context().pages();
    console.log('No of tabs is: ' + pages.length); //print the number of pages

    await pages[1].bringToFront(); //bring the second tab to the front 
    
    //print tab urls
    pages.forEach(tab => {
        console.log('Tab url: ' + tab.url());
    });

    await page2.waitForTimeout(3000); //wait for 3 seconds
})