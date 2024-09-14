/**
 * This test shows how to get the type attribute of an input field
 */


import {chromium} from 'playwright';
import {test} from "@playwright/test";

test('Get input field type', async ({}) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.orangehrm.com/30-day-free-trial/');

    // Locate the input field and get its type attribute
    // const inputType = await page.getAttribute('input#search', 'type');
    const inputType = await page.locator('.middleColumn').nth(1).getAttribute('type');
    console.log(`The input field type is: ${inputType}`);

    function validateInput() {
        const input = page.locator('.middleColumn').nth(2).inputValue();
        if (input === null || input.trim() === "") {
            alert("The input field is null or empty");
            return false;
        }
        return true;
    }

    await browser.close();
})

// (async () => {
//     const browser = await chromium.launch();
//     const page = await browser.newPage();
//     await page.goto('https://example.com'); // Replace with your target URL
//
//     // Locate the input field and get its type attribute
//     const inputType = await page.getAttribute('input#your-input-id', 'type');
//     console.log(`The input field type is: ${inputType}`);
//
//     await browser.close();
// })();
