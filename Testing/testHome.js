const {By, Builder, Browser} = require('selenium-webdriver');

(async function testHomePage() {
    let driver;

    try{
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://localhost:4200/exact'); 
        
        let scholarBtn = await driver.findElement(By.linkText('LEARN MORE ABOUT THE EXACT SCHOLARS PROGRAM'));
        await driver.actions()
            .scroll(0,0,0,0, scholarBtn)
            .perform();
        
        await scholarBtn.click();

        await driver.manage().setTimeouts({implicit: 5000});

        let appBtn = await driver.findElement(By.linkText('START AN APPLICATION'));
        await driver.actions()
            .scroll(0,0,0,0, appBtn)
            .perform();
        
        await appBtn.click();

        await driver.manage().setTimeouts({implicit: 5000});

        let faqBtn = await driver.findElement(By.linkText('FAQ'));
        await driver.actions()
            .scroll(0,0,0,0, faqBtn)
            .perform();

        await faqBtn.click();

        let homeBtn = await driver.findElement(By.xpath('/html/body/app-root/app-faq-page/app-header/div/div/nav/ul/li[1]/a'));

        await homeBtn.click();

        //faculty pages testing

        let facultyLink = await driver.findElement(By.linkText('Faculty Toolbox'));
        await driver.actions()
            .scroll(0,0,0,0, facultyLink)
            .perform();
        
        await facultyLink.click();

        await driver.manage().setTimeouts({implicit: 5000});

        let sfBtn = await driver.findElement(By.xpath('//*[@id="ngb-accordion-item-0-toggle"]'));
        await driver.actions()
            .scroll(0,0,0,0, sfBtn)
            .perform();
        await sfBtn.click();

        await driver.manage().setTimeouts({implicit: 5000});

        await sfBtn.click();

        let ccBtn = await driver.findElement(By.xpath('//*[@id="ngb-accordion-item-1-toggle"]'));
        await driver.actions()
            .scroll(0,0,0,0, ccBtn)
            .perform();

        await ccBtn.click();

        await driver.manage().setTimeouts({implicit: 5000});

        await ccBtn.click();

        let ffBtn = await driver.findElement(By.xpath('//*[@id="ngb-accordion-item-2-toggle"]'));

        await driver.actions()
            .scroll(0,0,0,0, ffBtn)
            .perform();
        
        await ffBtn.click();

        await driver.manage().setTimeouts({implicit: 5000});
    
        await ffBtn.click();

        let atBtn = await driver.findElement(By.xpath('//*[@id="ngb-accordion-item-3-toggle"]'));

        await driver.actions()
            .scroll(0,0,0,0, atBtn)
            .perform();
        
        await atBtn.click();

        await driver.manage().setTimeouts({implicit: 5000});
    
        await atBtn.click();

        let evBtn = await driver.findElement(By.xpath('//*[@id="ngb-accordion-item-4-toggle"]'));

        await driver.actions()
            .scroll(0,0,0,0, evBtn)
            .perform();
        
        await evBtn.click();

        await driver.manage().setTimeouts({implicit: 5000});
    
        await evBtn.click();

        homeBtn = driver.findElement(By.xpath('/html/body/app-root/app-faculty-toolbox-page/app-header/div/div/nav/ul/li[1]/a'));

        await driver.actions()
            .scroll(0,0,0,0, evBtn)
            .perform();

        await homeBtn.click();
        
        await driver.manage().setTimeouts({implicit: 5000});

        //student toolbox

        let studentLink = await driver.findElement(By.linkText('Student Toolbox'));

        await driver.actions()
            .scroll(0,0,0,0, studentLink)
            .perform();

        await studentLink.click();

        await driver.manage().setTimeouts({implicit: 5000});

        let stuPartTab = await driver.findElement(By.xpath('//*[@id="ngb-accordion-item-0-toggle"]'));

        await stuPartTab.click();

        await driver.manage().setTimeouts({implicit: 5000});

        await stuPartTab.click();

        let whatExactTab = await driver.findElement(By.xpath('//*[@id="ngb-accordion-item-1-toggle"]'));

        await driver.actions()
            .scroll(0,0,0,0, whatExactTab)
            .perform();
        
        await whatExactTab.click();

        await driver.manage().setTimeouts({implicit: 5000});

        await whatExactTab.click();

        let howToTab = await driver.findElement(By.xpath('//*[@id="ngb-accordion-item-2-toggle"]'));

        await driver.actions()
            .scroll(0,0,0,0, howToTab)
            .perform();

        await howToTab.click();

        await driver.manage().setTimeouts({implicit: 5000});

        await howToTab.click();

        homeBtn = await driver.findElement(By.xpath('/html/body/app-root/app-student-toolbox-page/app-header/div/div/nav/ul/li[1]/a'));

        await driver.actions()
            .scroll(0,0,0,0, homeBtn)
            .perform();
        
        await homeBtn.click();

        //experiential learing page

        let experientialTab = await driver.findElement(By.linkText('LEARN MORE ABOUT EXPERIENTIAL LEARNING'));

        await driver.actions()
            .scroll(0,0,0,0, experientialTab)
            .perform();

        await experientialTab.click();

        homeBtn = await driver.findElement(By.xpath('/html/body/app-root/app-experiential-learning-page/app-header/div/div/nav/ul/li[1]/a'));

        await homeBtn.click();

        // exact library

        let libraryTab = await driver.findElement(By.xpath('/html/body/app-root/app-root/app-content/div/div/div[1]/app-accordion[2]/div/div/h2/button'));
        await driver.actions()
            .scroll(0,0,0,0, libraryTab)
            .perform();
        
        await libraryTab.click();

        await delay(1000);

        let libraryBtn = await driver.findElement(By.xpath('/html/body/app-root/app-root/app-content/div/div/div[1]/app-accordion[2]/div/div/div/div/app-button-link/a/button'));
        await driver.actions()
            .scroll(0,0,0,0, libraryBtn)
            .perform();

        await libraryBtn.click();

        //await driver.get('http://localhost:4200/exact/library');

        homeBtn = await driver.findElement(By.xpath('/html/body/app-root/app-library-page/app-header/div/div/nav/ul/li[1]/a'));

        await homeBtn.click();

        //team page

        let teamTab = await driver.findElement(By.xpath('//*[@id="ngb-accordion-item-2-toggle"]'));
        await driver.actions()
            .scroll(0,0,0,0, teamTab)
            .perform();
        
        await teamTab.click();

        await driver.get('http://localhost:4200/exact/team');

        homeBtn = await driver.findElement(By.xpath('/html/body/app-root/app-team-page/app-header/div/div/nav/ul/li[1]/a'));

        await homeBtn.click();

        // goals page

        let goalsTab = await driver.findElement(By.xpath('//*[@id="ngb-accordion-item-3-toggle"]'));
        await driver.actions()
            .scroll(0,0,0,0, goalsTab)
            .perform();

        await goalsTab.click();

        await driver.get('http://localhost:4200/exact/goals');

        homeBtn = await driver.findElement(By.xpath('/html/body/app-root/app-goals-page/app-header/div/div/nav/ul/li[1]/a'));
        await homeBtn.click();

        await driver.quit();
    } catch (e){
        console.log(e)
    }
}())

function delay (ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}