const { Builder } = require("selenium-webdriver");
const { T, click, type, waitVisible } = require("./_helpers");

const BASE_URL = "https://hotel-booking-ui-czp6.onrender.com";

(async function () {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(BASE_URL);

    await click(driver, T("start-booking-btn"));
    await type(driver, T("city-input"), "Istanbul");

    // checkout < checkin (invalid)
    await type(driver, T("checkin-input"), "2026-01-12");
    await type(driver, T("checkout-input"), "2026-01-10");

    await click(driver, T("search-btn"));

    const err = await waitVisible(driver, T("date-error"));
    const msg = (await err.getText()).toLowerCase();

    if (!msg.includes("after") && !msg.includes("check")) {
      throw new Error("Expected date error message, got: " + msg);
    }

    console.log("✅ 02 Invalid Date PASSED. Error shown:", await err.getText());
  } finally {
    await driver.quit();
  }
})();
