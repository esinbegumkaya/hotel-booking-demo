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

    await driver.navigate().refresh();

    const hasHotel = (await driver.findElements(T("hotel-name"))).length > 0;
    const hasSearch = (await driver.findElements(T("city-input"))).length > 0;

    if (!hasHotel && !hasSearch) {
      throw new Error("After refresh, expected either results or search page.");
    }

    console.log("✅ 05 Refresh behavior PASSED. Results:", hasHotel, "Back to Search:", hasSearch);
  } finally {
    await driver.quit();
  }
})();
