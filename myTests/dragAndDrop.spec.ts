import test, { Browser, chromium, firefox, Locator, Page } from "@playwright/test";
import { url } from "inspector";


test('drag & drop', async()=>{
    const browser: Browser = await chromium.launch({headless:false, channel: 'chrome'});
    const page: Page = await browser.newPage();

    await page.goto('http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html');

    let city: string = '#box6';
    let con3: string = '#box106';

    //drag and drop
    const src = page.locator(city);
    const dst = page.locator(con3);

    // Approach 1: mouse drag/drop actions 
    // await src.hover();
    // await page.mouse.down();

    // await dst.hover();
    // await page.mouse.up();


    // Approach 2: using dragTo method
    await src.dragTo(dst);

    await page.waitForTimeout(3000);

})


// Draggng and Dropping elements within a frame/iFrame
test('iframe: drag and drop', async()=>{
    const browser:Browser = await firefox.launch({headless:false});
    const page:Page = await browser.newPage();

    await page.goto('https://jqueryui.com/droppable/');
    await page.waitForTimeout(2000);

    await page.waitForSelector('iframe.demo-frame');

    //switch to the frame
    const iframe = await page.frameLocator('.demo-frame');
    
    const source = await iframe.locator('#draggable');
    const dest = iframe.locator('#droppable');

    //drag and drop
    await source.dragTo(dest);

    await page.waitForTimeout(3000);


})