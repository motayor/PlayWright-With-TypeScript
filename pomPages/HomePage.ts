import { Page } from "@playwright/test";

export default class HomePage{
    constructor(public page: Page){
    
    }

    async clickOnShopByCategories(){
        await this.page.click("//a[contains(.,'Shop by Category')]");
    }

    async chooseFashionAccessories(){
        await Promise.all([
            this.page.waitForNavigation({waitUntil:"networkidle"}),
            this.page.click("//span[text()[normalize-space()='Fashion and Accessories']]")
        ])
    }


}