import test, { Browser, firefox, Page } from "@playwright/test";

test('mouse action', async()=>{
    const browser: Browser = await firefox.launch({headless:false});
    const page:Page = await browser.newPage();

    page.goto('https://demo.guru99.com/test/simple_context_menu.html');
    console.log(await page.title())
    await page.waitForTimeout(2000);

    //doubleclick
    await page.getByText('Double-Click Me To See Alert').dblclick();
    await page.waitForTimeout(2000);

    //right click
    await page.getByText('right click me').click({button: 'right'});
    await page.waitForTimeout(2000);

    //click + shift
    page.goto('https://the-internet.herokuapp.com/shifting_content');   
    await page.getByText('Example 1: Menu Element').click({modifiers: ['Shift']});
    await page.waitForTimeout(2000);


    //click + control   
    await page.getByText('Example 1: Menu Element').click({modifiers: ['Control']});
    await page.waitForTimeout(2000);

   
})   

