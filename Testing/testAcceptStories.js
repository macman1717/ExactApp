const {By, Builder, Browser, until} = require('selenium-webdriver');
const assert = require("assert");

(async function testAcceptStory() {
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

        await delay(2000);

        await driver.manage().setTimeouts({implicit: 2000});


        let penStoryTable = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[2]'));
        await driver.actions()
            .scroll(0, 0, 0, 0, penStoryTable)
            .perform();

        let count = 0;
        let currApp = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[2]/tbody/tr[1]/td[1]')).getText();
        let expectedPosition = 9;
        while(count < expectedPosition){
            count++;
            currApp = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[2]/tbody/tr[' + count + ']/td[1]')).getText();
        }
            
        let approveTestStory = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[2]/tbody/tr[' + count + ']/td[5]/button[1]/i'));
        await approveTestStory.click();

        let asFourBtn = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/nav[1]/ul/li[5]/button'));
        await driver.actions()
            .scroll(0, 0, 0, 0, asFourBtn)
            .perform();
        await asFourBtn.click();

        let acceptStoryTable = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[1]'));
        await driver.actions()
        .scroll(0, 0, 0, 0, acceptStoryTable)
        .perform();

        count = 0;
        currApp = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[1]/tbody/tr[1]/td[1]')).getText();
        expectedPosition = 6;
        
        while(count < expectedPosition){
            count++;
            currApp = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[1]/tbody/tr['+ count +']/td[1]')).getText();
        }

        let variables = ["John Doe", "dummy@ggc.edu", "This is a test submission to make sure this system is functional."];
        let num = 1;
        for (let i = 0; i < 3; i++){
            
            let currResult = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[1]/tbody/tr['+ count +']/td['+ num +']'));
            let currValue = await currResult.getText();
            assert.equal(variables[i], currValue);
            num++;
        }

        await driver.quit();
    }catch(e){
        console.log(e);
    }
    
}())
function delay (ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}