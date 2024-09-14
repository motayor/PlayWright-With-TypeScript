import { expect, Page } from "@playwright/test";



export default class LoginPage{
    constructor(public page: Page){
    
    }

    async loginDetails(email:string, password:string){
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
    

    async enterEmail(email: string){
        await this.page.locator('#input-email').fill(email);
    }

    async enterPassword(password: string){
        await this.page.locator('#input-password').fill(password);
    }

    async isForgottnPwdLink(){
        return await this.page.locator('a[href*="route=account/forgotten"]').isVisible();
    }

    async clickLoginButton(){
        await this.page.locator('input[type="submit"]').click();
    }

    async accountPageDetails(){
        return this.page.url();
        await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');
        await expect(this.page).toHaveTitle('Account Login');    
    }

}