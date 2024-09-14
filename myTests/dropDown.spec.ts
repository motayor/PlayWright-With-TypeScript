import { Browser, firefox, Page, Locator} from "@playwright/test";
import test from "@playwright/test";
import { log } from "console" 
import { CLIENT_RENEG_LIMIT } from "tls";

test('drop down', async()=>{
    const browser:Browser = await firefox.launch({headless:false});
    const page:Page = await browser.newPage();

    await page.goto('https://www.orangehrm.com/orangehrm-30-day-trial/');
    // await page.waitForTimeout(2000);

    // const countryDropDown = page.locator('select#Form_getForm_Country');
    // //await countryDropDown.selectOption({label: 'United States'}); //using label
    // await countryDropDown.selectOption({value: 'Libya'});       //using value
    //await countryDropDown.selectOption({index: 3});           //using index  
    // // await countryDropDown.selectOption({text: 'United States'}); //using text


    //can also use the following code
    const countryDropDown = 'select#Form_getForm_Country';
    await page.selectOption(countryDropDown, {label: 'United States'});

    //print out all th options in the drop down i.e. select#Form_getForm_Country > options
    const allOptions = await page.$$('select#Form_getForm_Country > option');
    console.log('Number of options in the drop down: ' + allOptions.length);

    for(const e of allOptions){
        const txt = await e.textContent();
        // console.log('Option: ' + txt);   
        
        //select a specific option: Nigeria
        if(txt === 'Nigeria'){
            await page.selectOption(countryDropDown, {label: txt});;
            break;
            // console.log("Option Nigeria selected");
        }
        
    }

    await page.waitForTimeout(3000);




})