/**
 * Sparkline e2e testing
 */
import { browser, element, By, by } from "@syncfusion/ej2-base/e2e/index";
import { WebElement, Options } from "selenium-webdriver";
import { Property } from "@syncfusion/ej2-base";

if (browser.isDesktop === true) {
    browser.driver.manage().window().setSize(1900, 1200);
}

describe('Sparkline component test spec', () => {
    it('Sparkline Default sample', () => {
        browser.get(browser.basePath + '/demos/sparkline/default.html');
        browser.compareScreen(element(By.id('container')), 'default_sparkline');
    });
});
