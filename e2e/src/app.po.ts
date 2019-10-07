import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
  waitForCanvasToLoad(element) {
    return function () {
      return browser.executeScript("!!arguments[0].getImageData();", element.getWebElement());
    }
  }
}
