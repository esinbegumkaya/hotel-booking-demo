const { Builder } = require("selenium-webdriver");
const { T, click, type, waitVisible } = require("./_helpers");

const BASE_URL = "https://hotel-booking-ui-czp6.onrender.com";

(async function () {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(BASE_URL);

    await click(driver, T("start-booking-btn"));
    await type(driver, T("city-input"), "Istanbul");
    await type(driver, T("checkin-input"), "2026-01-10");
    await type(driver, T("checkout-input"), "2026-01-12");
    await click(driver, T("search-btn"));

    await waitVisible(driver, T("hotel-name"));

    await driver.navigate().back();
    await waitVisible(driver, T("city-input"));

    const cityVal = await driver.findElement(T("city-input")).getAttribute("value");
    const checkinVal = await driver.findElement(T("checkin-input")).getAttribute("value");
    const checkoutVal = await driver.findElement(T("checkout-input")).getAttribute("value");

    console.log("✅ 04 Back Navigation State:", { cityVal, checkinVal, checkoutVal });
  } finally {
    await driver.quit();
  }
})();
