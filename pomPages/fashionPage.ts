import { Page } from "@playwright/test";
import { relativeTimeRounding } from "moment";

export default class fashionPage{
    constructor(public page: Page){
    
    }

    async clickOnFirstFashionItem(){
        await this.page.click("(//div[@class='carousel-item active']//img)[2]", {strict: false});
        await this.page.locator("//span[text()='Add to Cart')[1]").click();
    }

    async isCartVisible(){
        const toast = this.page.locator("//div[@id='notification-box-top']");
        await toast.waitFor({state: 'visible'});
        return toast;
    }   

}

