/**
 * Some forms require you to select a date from a date picker.
 * this test shows how to handle date pickers in Playwright
 */

import test, { Browser, firefox, Page } from "@playwright/test";
import moment from 'moment';

test('Calendar w/ fill function', async()=>{
    const browser: Browser = await firefox.launch({headless:false});
    const context = await browser.newContext();
    const page:Page = await context.newPage();

    page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo');

    let date = "2012-12-25"; //consider required date format

    await page.fill('id=birthday', date); //fill the date picker input field with the date
    await page.waitForTimeout(3000); //wait for 3 seconds

})

test('calendar w/ locator fill', async()=>{
    const browser: Browser = await firefox.launch({headless:false});
    const page:Page = await browser.newPage();

    page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo');

    await page.click('//input[@placeholder="Start date"]');

    const mmYY = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]");
    const prevAction = page.locator("(//table[@class='table-condensed']//th[@class='prev'])[1]");
    const nextAction = page.locator("(//table[@class='table-condensed']//th[@class='next'])[1]");

    //choose a date in the previous month
    await prevAction.click(); //click on the previous month
    await page.click("//td[@class='day'][contains(text(),'25')]");  //click on Day 25
    await page.waitForTimeout(3000); //wait for 3 seconds
})

test.only('calendar fill w/ moment function', async()=>{
    /**
     * Moment.js is a popular JavaScript library for parsing, validating, manipulating, and formatting dates.
     * Alternatives to Moments.js include date-fns, Luxon, and Day.js
     */
    const browser: Browser = await firefox.launch({headless:false});
    const page = await browser.newPage();

    page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo');

    //call the moment function to pick past date
    await calendarPicker(20, "December 2018"); 
    await page.waitForTimeout(5000); 

    //call the moment function to pick future date
    // page.reload(); //reload the page
    // await calendarPicker(20, "December 2025");
    // await page.waitForTimeout(3000); 

    //call the moment function to pick current date
    // page.reload();
    // await calendarPicker(14, moment().format("MMMM YYYY"));  
    // await page.waitForTimeout(5000); 


    //create a moment function to handle the date picker
    async function calendarPicker(date: number, selectedDate:string){
        await page.click('//input[@placeholder="Start date"]');

        //specify locators from the date picker
        const mmYY = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]");
        const prevAction = page.locator("(//table[@class='table-condensed']//th[@class='prev'])[1]");
        const nextAction = page.locator("(//table[@class='table-condensed']//th[@class='next'])[1]");

        //[optional] Verify if the selected date comes before the current mmYY, return Boolean
        const currentMonth = moment(selectedDate, "MMMM YYYY").isBefore(); //consider format
        console.log(currentMonth + `: '${selectedDate}' comes before today`); //print the result

        while (await mmYY.textContent() != selectedDate){
            //while the shown monthYear is not the selected date, keep clicking prevAction
            if (currentMonth){
                await prevAction.click(); //click on the previous month
            } else {
                await nextAction.click(); //click on the next month
            }
        } 
        //click on the 20th day of the selected month
        await page.click(`//td[@class='day'][text()='${date}']`);   //Note backticks '`' symbol 'coz of the string interpolation
        await page.waitForTimeout(3000); //wait for 3 seconds
        //close calendar widget
        // await page.click('//input[@placeholder="Start date"]'); //click on the date picker input field to close the widget
        //OR
        await page.keyboard.press('Escape'); //press the 'Escape' key to close the widget
    }
})

