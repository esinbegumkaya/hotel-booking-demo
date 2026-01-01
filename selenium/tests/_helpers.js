const { By, until } = require("selenium-webdriver");

const T = (id) => By.css(`[data-testid='${id}']`);

async function waitVisible(driver, locator, timeout = 20000) {
  const el = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(el), timeout);
  return el;
}

async function click(driver, locator) {
  const el = await waitVisible(driver, locator);
  await el.click();
}

async function type(driver, locator, text) {
  const el = await waitVisible(driver, locator);
  await el.clear();
  await el.sendKeys(text);
}

module.exports = { T, waitVisible, click, type };
