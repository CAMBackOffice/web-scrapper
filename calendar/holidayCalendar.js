// const puppeteer = require("puppeteer");

// async function holidayCalendar() {
//   const url = "https://es.investing.com/holiday-calendar/";

//   let browser = await puppeteer.launch({
//     headless: true,
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });
//   let page = await browser.newPage();

//   await page.goto(url, { waitUntil: "networkidle2" });

//   let data = await page.evaluate(() => {
//     // get the table rows with id='holidayCalendarData'.

//     let tds = Array.from(
//       document.querySelectorAll("table[id='holidayCalendarData'] tr td")
//     );

//     let rows = tds.map((td) => td.innerText);

//     // get the dates positions, regex that match dd.mm.yyyy
//     dates = rows.filter((row) => /\d{2}\.\d{2}\.\d{4}/.test(row));

//     // Ex. The position 0 is today, 1 is tomorrow.
//     // we want only the data for position 0.
//     // return rows until dates[1] is found.
//     rows = rows.slice(1, rows.indexOf(dates[1]));

//     // make rows a string and split by \n.
//     rows = rows.join(" ").split("\n");

//     return { date: dates[0], rows };
//   });

//   browser.close();
//   return data;
// }

// // (async () => {
// //   console.log(await holidayCalendar());
// // })();

// module.exports = holidayCalendar;

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

    // every tds has 4 children, the children 0 is the date, the children 1 is the country, the children 2 is the event and the children 3 is the impact.
    let rows = tds.map((td) => {
      let children = Array.from(td.children);
      return {
        date: children[0].innerText,
        country: children[1].innerText,
        event: children[2].innerText,
        impact: children[3].innerText,
      };
    });

    // delete \n and empty spaces from rows.country
    rows = rows.map((row) => {
      row.country = row.country.replace(/\n/g, "").trim();
      return row;
    });

    return rows;
  });

  //Nombre de la bolsa de valores
  browser.close();
  return data;
}

// (async () => {
//   console.log(await holidayCalendar());
// })();

module.exports = holidayCalendar;
