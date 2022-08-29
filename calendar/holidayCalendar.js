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
      document.querySelectorAll("table[id='holidayCalendarData'] tr")
    );

    // every tds has 4 childrens, the children 0 is the date,
    // the children 1 is the country, the children 2 is the event
    // and the children 3 is the description.
    let rows = tds.map((td) => {
      let children = Array.from(td.children);
      return {
        date: children[0].innerText,
        country: children[1].innerText,
        event: children[2].innerText,
        description: children[3].innerText,
      };
    });

    // delete \n and empty spaces from rows.country
    rows = rows.map((row) => {
      row.country = row.country.replace(/\n/g, "").trim();
      return row;
    });

    // detele the first two objects of rows. bc they are the table headers.
    rows = rows.slice(2);

    //   // return the rows until rows.date match regex pattern dd.mm.yyyy
    //   return rows.filter((row) => {
    //     return row.date.match(/\d{2}\.\d{2}\.\d{4}/);
    //   });
    return rows;
  });

  browser.close();
  return data;
}

module.exports = holidayCalendar;
