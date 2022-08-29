const puppeteer = require("puppeteer");

async function holidayCalendar() {
  const url = "https://es.investing.com/holiday-calendar/";

  let browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  let page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  let data = await page.evaluate(() => {
    // get the table rows with id='holidayCalendarData'.
    let tds = Array.from(
      document.querySelectorAll("table[id='holidayCalendarData'] tr td")
    );

    let rows = tds.map((td) => td.innerText);

    // get the dates positions
    dates = rows.filter((row) => /\d{2}\.\d{2}\.\d{4}/.test(row));

    // Ex. The position 0 is today, 1 is tomorrow.
    // we want only the data for position 0.
    // return rows until dates[1] is found.
    rows = rows.slice(0, rows.indexOf(dates[1]));

    // make rows a string and split by \n.
    rows = rows.join(" ").split("\n");

    return rows;
  });

  browser.close();
  return { data };
}

// (async () => {
//   console.log(await holidayCalendar());
// })();

module.exports = holidayCalendar;
