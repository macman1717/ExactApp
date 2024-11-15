const {By, Builder, Browser, WebDriver} = require('selenium-webdriver');
const assert = require("assert");

(async function testApplication() {
    let driver;

    try{
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://localhost:4200/exact/student-application');
        let emailInput = await driver.findElement(By.id('email'));
        await emailInput.clear();
        await emailInput.sendKeys('dummy@email.com');
        
        

        let firstNameInput = await driver.findElement(By.id('studentFirstName'));
        await firstNameInput.clear();
        await firstNameInput.sendKeys('John');
        

        let lastNameInput = await driver.findElement(By.id('studentLastName'));
        await lastNameInput.clear();
        await lastNameInput.sendKeys('Doe');
        

        let stuIdInput = await driver.findElement(By.id('student900Number'));
        await stuIdInput.clear();
        await stuIdInput.sendKeys('900123456');
        

        let phoneInput = await driver.findElement(By.id('studentPhone'));
        await phoneInput.clear();
        await phoneInput.sendKeys('1234567890');
        

        let credNumInput = await driver.findElement(By.id('numOfCredits'));
        await credNumInput.clear();
        await credNumInput.sendKeys('50');
        

        let eportInput = await driver.findElement(By.id('SLandSPortfolio'));
        await eportInput.clear();
        await eportInput.sendKeys('dummy@linkedin.com');
        

        let levelSct = await driver.findElement(By.id('scholarLevel'));
        await driver.actions()
            .scroll(0, 0, 0, 0, levelSct)
            .perform();
        await levelSct.click();

        let lvOpt = await driver.findElement(By.xpath('//*[@id="scholarLevel"]/option[2]'));
        await lvOpt.click();

        let permBtn = await driver.findElement(By.id('permissionYesBox'));
        await driver.actions()
            .scroll(0, 0, 0, 0, permBtn)
            .perform();
        await permBtn.click();

        let submitBtn = await driver.findElement(By.id('submitBtn'));
        await driver.actions()
            .scroll(0, 0, 0, 0, submitBtn)
            .perform();
        await submitBtn.click();

        await driver.get('http://localhost:4200/exact/admin-dashboard');

        await driver.manage().setTimeouts({implicit: 5000});

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

        await delay(5000);

        await driver.navigate().refresh();

        let penAppTable = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[4]'));
        await driver.actions()
            .scroll(0, 0, 0, 0, penAppTable)
            .perform();

        let variables = ["John Doe", "900123456", "dummy@email.com", "1234567890", "participant", "50"];
        let count = 0;
        let currApp = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[4]/tbody/tr[1]/td[1]')).getText();

        let expectedPosition = 9;

        while(count < expectedPosition){
            count++;
            currApp = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[4]/tbody/tr[' + count + ']/td[1]')).getText();
        }
        
        let num = 1;
        for (let i = 0; i < 6; i++){
            
            let currResult = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[4]/tbody/tr[' + count + ']/td[' + num +']'));
            let currValue = await currResult.getText();
            assert.equal(variables[i], currValue);
            num++;
        }
        await driver.quit();

        
    }catch (e){
        console.log(e);
    }
    
}())

function delay (ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

