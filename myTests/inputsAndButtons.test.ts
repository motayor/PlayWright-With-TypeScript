import { chromium, expect, firefox, Page } from "@playwright/test";
import test, {Browser} from "@playwright/test";
import { only } from "node:test";


test('Inputs & Buttons', async()=>{
    const browser: Browser = await chromium.launch({headless:false});
    const page: Page = await browser.newPage();

    page.goto('https://lambdatest.com/selenium-playground/simple-form-demo');
    const messInput = await page.locator('input#user-message');
    console.log(await messInput.getAttribute('placeholder'));
    await expect(messInput).toHaveAttribute('placeholder', 'Please enter your Message');
    console.log('Before data input: ' + await messInput.inputValue());

    await messInput.fill('Hello World');

    console.log('After data input: ' + await messInput.inputValue());

    await page.waitForTimeout(4000);

})

test('dropdown', async()=>{ 
    const browser: Browser = await firefox.launch({headless:false});
    const page2: Page = await browser.newPage();

    page2.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    await page2.selectOption('#select-demo',{label: 'Friday'});
    await page2.waitForTimeout(4000);
})

test('multi-select Option test', async()=>{
    const browser: Browser = await firefox.launch({headless:false});
    const page3: Page = await browser.newPage();

    page3.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    await page3.selectOption('#multi-select',[{label: 'California'},
                                            {value: 'Florida'},
                                            {index: 7}]); 
    
    await page3.waitForTimeout(4000);

})

/**
 * Bootstrap because search and dropdown are combined
 */
test('bootstrap dropdown test', async()=>{
    const browser: Browser = await firefox.launch({headless:false});
    const page4: Page = await browser.newPage();

    page4.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');
    await page4.click('#country+span');  //combine two sibling IDs
    await page4.locator("ul#select2-country-results").locator("li", {hasText:"Japan"}).click();  //selectotr chaining?
    await page4.waitForTimeout(2000);

    //apply the same logic to pick multiple countries
    //create a function 
    await selectCountry('India');
    await selectCountry('Japan');
    await selectCountry('United States of America');
    await selectCountry('Australia');

    async function selectCountry(countryName: string){
        await page4.click('#country+span');
        await page4.locator("ul#select2-country-results").locator("li", {hasText: countryName}).click();
    }
    
    await page4.waitForTimeout(5000);
})
