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
    await click(driver, T("select-hotel-btn"));

    await type(driver, T("firstname-input"), "Esin");
    await type(driver, T("lastname-input"), "Kaya");
    await type(driver, T("email-input"), "esin@test.com");
    await click(driver, T("confirm-booking-btn"));

    await waitVisible(driver, T("success-message"));
    const rid = await waitVisible(driver, T("reservation-id"));

    console.log("✅ 01 Happy Path PASSED. Reservation:", await rid.getText());
  } finally {
    await driver.quit();
  }
})();
