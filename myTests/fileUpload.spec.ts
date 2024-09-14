

/**
 * File Upload Test, single and multiple file upload methods
 * USe the setInputFiles method to upload files
 */

import test, { Browser, firefox, webkit } from "@playwright/test";
import path from "path";

test('single file upload', async({})=>{
    const browser: Browser = await firefox.launch({headless:false});
    const page = await browser.newPage();

    // await page.goto('https://the-internet.herokuapp.com/upload');
    await page.goto('https://cgi-lib.berkeley.edu/ex/fup.html');

    page.locator("input[name='upfile']").setInputFiles("files/logohusk.jpg");
    await page.waitForTimeout(4000);

    page.locator("input[name='upfile']").setInputFiles([]);  //deselct the uploaded file
    await page.waitForTimeout(4000);

    //create a new file input on the fly  ...from buffer
    await page.locator("input[name='upfile']").setInputFiles({name: 'stroty_book.txt', 
        mimeType: 'text/plain', 
        buffer: Buffer.from('Hello World...this is a story book created for testing purposes')});

})

test('multiple file upload', async({})=>{
    const browser: Browser = await webkit.launch({headless:false});
    const page = await browser.newPage();

    // await page.goto('https://the-internet.herokuapp.com/upload');
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

    page.locator("input[name='filesToUpload']").setInputFiles([path.join("files/logohusk.jpg"), 
        path.join("files/spaceX.jpg")]);
    await page.waitForTimeout(9000);
    
    //deselct the files
    page.locator("input[name='filesToUpload']").setInputFiles([]);  //deselct the files
    await page.waitForTimeout(4000);

})

test.only('file browser dialog', async({})=>{
    const browser: Browser = await firefox.launch({headless:false});
    const page = await browser.newPage();

    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.waitForTimeout(2000);

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('input[type="file"]')
    ]);
    // await fileChooser.setFiles('files/logohusk.jpg');
    await page.waitForTimeout(2000);

    //for multiple files
    const isMutiple = fileChooser.isMultiple();
    console.log('Is multiple: ', isMutiple);   //verify if multiple files can be uploaded
    fileChooser.setFiles(['files/logohusk.jpg', 'files/spaceX.jpg']);

    


}) 