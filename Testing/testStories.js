const {By, Builder, Browser, until} = require('selenium-webdriver');
const assert = require("assert");

(async function testStoriesPage() {
    let driver;

    try{
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://localhost:4200/exact');
        let storyTab = await driver.findElement(By.id('ngb-accordion-item-4-toggle'));
        await driver.actions()
            .scroll(0, 0, 0, 0, storyTab)
            .perform();
        await storyTab.click();
        let storyLink = await driver.findElement(By.xpath('//*[@id="ngb-accordion-item-4-collapse"]/div/app-button-link/a/button'));
        await driver.actions()
            .scroll(0, 0, 0, 200, storyTab)
            .perform();
        await driver.manage().setTimeouts({implicit: 500});
        await storyLink.click();

        let submitBtn = await driver.findElement(By.id('submitBtn'));
        await driver.actions()
            .scroll(0, 0, 0, 0, submitBtn)
            .perform();
        let studentFirstName = await driver.findElement(By.id('studentFirstName'));
        studentFirstName.sendKeys('John');

        await delay(1000);

        let studentLastName = await driver.findElement(By.id('studentLastName'));
        studentLastName.sendKeys('Doe');

        await delay(1000);

        let emailInput = await driver.findElement(By.id('email'));
        emailInput.sendKeys('dummy@ggc.edu');

        await delay(1000);

        let contentInput = await driver.findElement(By.id('content'));
        contentInput.sendKeys('This is a test submission to make sure this system is functional.');

        await delay(1000);

        await driver.manage().setTimeouts({implicit: 500});

        await submitBtn.click();

        let loginButton = await driver.findElement(By.linkText('LOGIN'));
        await driver.actions()
            .scroll(0, 0, 0, 0, loginButton)
            .perform();
        await loginButton.click();

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

        let variables = ["John Doe", "dummy@ggc.edu", "This is a test submission to make sure this system is functional."];
        let count = 0;
        let currApp = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[2]/tbody/tr[1]/td[1]')).getText();
        let expectedPosition = 9;
        while(count < expectedPosition){
            count++;
            currApp = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[2]/tbody/tr[' + count + ']/td[1]')).getText();
        }

        let num = 1;
        for (let i = 0; i < 3; i++){
            
            let currResult = await driver.findElement(By.xpath('/html/body/app-root/app-admin-dashboard-page/app-content/div/div/div[1]/table[2]/tbody/tr[' + count + ']/td[' + num +']'));
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