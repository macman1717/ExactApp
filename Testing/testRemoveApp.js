const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

(async function testRemoveApp() {
    let driver;
    try{
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://localhost:4200/exact/admin-dashboard');

        let email = await driver.findElement(By.xpath('//*[@id="floatingInput"]'));
        await email.sendKeys('psmith16@ggc.edu');

        await delay(2000);

        let password = await driver.findElement(By.xpath('//*[@id="floatingPassword"]'));
        await password.sendKeys('ExactApp');

        await delay(2000);

        let signInBtn = await driver.findElement(By.xpath('/html/body/app-root/app-login-page/main/form/button'));
        await driver.actions()
            .scroll(0,0,0,0, signInBtn)
            .perform();
        await signInBtn.click();

        await driver.manage().setTimeouts({implicit: 5000});
    
        let expectedPosition = 9;

        let count = 1;
        let currApp = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[4]/tbody/tr[1]/td[1]')).getText();
        while(count < expectedPosition){
            currApp = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[4]/tbody/tr[' + count + ']/td[1]')).getText();
            count++;
        }
        

        let removeBtn = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[4]/tbody/tr[' + count + ']/td[8]/button[3]/i'));
        await driver.actions()
            .scroll(0, 0, 0, 0, removeBtn)
            .perform();

        await removeBtn.click();
    }catch(e){
        console.log(e)
    }
}())

function delay (ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}