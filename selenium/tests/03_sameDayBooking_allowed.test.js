const { Builder } = require("selenium-webdriver");
const { T, click, type } = require("./_helpers");

const BASE_URL = "https://hotel-booking-ui-czp6.onrender.com";

(async function () {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(BASE_URL);

    await click(driver, T("start-booking-btn"));
    await type(driver, T("city-input"), "Istanbul");

    // same-day
    await type(driver, T("checkin-input"), "2026-01-10");
    await type(driver, T("checkout-input"), "2026-01-10");

    await click(driver, T("search-btn"));

    const hasResults = (await driver.findElements(T("hotel-name"))).length > 0;
    const hasError = (await driver.findElements(T("date-error"))).length > 0;

    if (!hasResults && !hasError) {
      throw new Error("Expected either results or date-error for same-day booking.");
    }

    console.log("✅ 03 Same-day Edge PASSED. Results:", hasResults, "Error:", hasError);
  } finally {
    await driver.quit();
  }
})();
