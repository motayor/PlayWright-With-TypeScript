
/**
 * iFrame is an inline frame that is used to embed another document within the current HTML document
 *      <iframe src="url"></iframe>
 * Framelocator is used to locate the frame in the page
 * but it is not used to interact with the elements inside the frame
 *  - use the frame object to interact with the elements inside the frame
 * - use the frame object to switch to the child frame
 * Frame object is used to interact with the elements inside the frame
 */

import test, { Browser, expect, firefox, Page } from "@playwright/test";
import exp from "constants";

test("handling frames", async()=>{
    const browser: Browser = await firefox.launch({headless:false});
    const page:Page = await browser.newPage();
    

    await page.goto('https://www.letcode.in/frame');
    const allframes = page.frames();          //get all the frames in the page
    console.log('Number of frames in the page: ' + allframes.length);

    //switch to the first/parent-most frame
    const myFrame = page.frame("firstFr")   //use id, name or url of the frame
    console.log('Title of the frame: ' + await myFrame?.title());

    // if(myFrame !== null){     //check if the frame exists
    //     await myFrame.fill('input[name="name"]', 'John Doe');
    // }
    //shorter version of the above code
    await myFrame?.fill('input[name="fname"]', 'John');
    await myFrame?.fill('input[name="lname"]','Doe');
    
    // expect(await myFrame.locator("p.has-text-info").textContent()).toContain('You have entered John Doe');

    await page.waitForTimeout(2000);

    //switch to the inner frame
    const innerframe = await myFrame?.childFrames()[1];  //get the nested child frame index
    await innerframe?.locator('input[name="email"]').scrollIntoViewIfNeeded();
    await innerframe?.locator('input[name="email"]').fill('emailMe@user.com');

    //verify textfield value
    const enteredEmail = await innerframe?.inputValue('input[name="email"]'); //get the value of the input field
    console.log('User entered: ' + enteredEmail);
   
    await page.waitForTimeout(5000);
    // await browser.close();


    //.toHaveValues works only with locators
    // page.goto('https://www.facebook.com/');
    // page.locator('input[name="email"]').fill('adil@adilas.com');
    // await expect(page.locator('input[name="email"]')).toHaveValue('adil@adilas.com');
})