const { Builder, By, until } = require("selenium-webdriver");

const BASE_URL = "https://hotel-booking-ui-czp6.onrender.com";
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

// Sayfadaki data-testid değerlerini çıkarır
async function dumpTestIds(driver) {
  const html = await driver.getPageSource();
  const re = /data-testid=["']([^"']+)["']/g;
  const set = new Set();
  let m;
  while ((m = re.exec(html)) !== null) set.add(m[1]);

  const list = Array.from(set).sort();
  console.log("✅ data-testid list on current page:");
  console.log(list.join(", ") || "(none found)");
  return list;
}

(async function bookingFlowTest() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(BASE_URL);
    console.log("URL(home):", await driver.getCurrentUrl());

    // Home -> Search
    await click(driver, T("start-booking-btn"));
    console.log("URL(search):", await driver.getCurrentUrl());

    // Search inputs (valid dates)
    await type(driver, T("city-input"), "Istanbul");
    await type(driver, T("checkin-input"), "2026-01-10");
    await type(driver, T("checkout-input"), "2026-01-12");

    await click(driver, T("search-btn"));

    // 2 saniye bekle (routing/render için)
    await driver.sleep(2000);
    console.log("URL(after search):", await driver.getCurrentUrl());

    // Eğer date-error varsa yazdır ve patlat
    const dateErr = await driver.findElements(T("date-error"));
    if (dateErr.length) {
      const msg = await dateErr[0].getText();
      throw new Error("Search validation error: " + msg);
    }

    // 🔥 En kritik: Bu sayfada hangi testid’ler var?
    const ids = await dumpTestIds(driver);

    // Sonuç sayfasında genelde ya hotel-name ya select-hotel-btn olur.
    // Önce select-hotel-btn’yi beklemeyi dene (daha garanti).
    if (ids.includes("select-hotel-btn")) {
      await click(driver, T("select-hotel-btn"));
    } else {
      // hotel-name yoksa bile, başka bir sonuç elementi olabilir. Burada bilerek timeout verdiriyoruz
      // ki loglarda testid listesini görüp doğru ismi seçelim.
      await waitVisible(driver, T("hotel-name"), 20000);
    }

    // Booking page (bu kısma geldiyse devam)
    await type(driver, T("firstname-input"), "Esin");
    await type(driver, T("lastname-input"), "Kaya");
    await type(driver, T("email-input"), "esin@test.com");
    await click(driver, T("confirm-booking-btn"));

    await waitVisible(driver, T("success-message"), 20000);
    const reservationEl = await waitVisible(driver, T("reservation-id"), 20000);

    console.log("✅ PASSED. Reservation:", await reservationEl.getText());
  } finally {
    await driver.quit();
  }
})();
