
//Run browser not in incognito mode
// use browser context to launch browser in non-incognito mode
// browser context is a way to manage browser sessions


import test, { Browser, BrowserContext, chromium, firefox, Page, webkit } from "@playwright/test";


test('No Incognito', async()=>{

    // const browser:BrowserContext =  await chromium.launchPersistentContext('', {headless:false, channel: 'chrome'});
    
    //[optional] store the session data in the ./session folder
    const browser:BrowserContext = await firefox.launchPersistentContext('', {headless:false});  
   
   
    //Typicaly this opens two tabs/pages. One for the browser and one for the page
    //You force the browser to open only one tabe/page by using the following code
    const pages:Page[] = browser.pages();      //get all the pages in an array
    const page:Page = pages[0];               //stick to the first page
  
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    // await page.waitForTimeout(10000);
})