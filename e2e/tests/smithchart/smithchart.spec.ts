/**
 * Smithchart e2e testing
 */
import { browser, element, By, by } from "@syncfusion/ej2-base/e2e/index";
import { WebElement, Options } from "selenium-webdriver";
import { Property } from "@syncfusion/ej2-base";

if (browser.isDesktop === true) {
    browser.driver.manage().window().setSize(1900, 1200);
}

describe('Smithchart component test spec', () => {
    it('Smithchart Default sample', () => {
        browser.get(browser.basePath + '/demos/smithchart/default.html');
        browser.compareScreen(element(By.id('container')), 'default_smithchart');
    });
});
