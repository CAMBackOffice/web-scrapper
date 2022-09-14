/**
 * Get todays date in dd.mm.yyyy format.
 * @returns string dd.mm.yyyy
 */
function today() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }
  today = dd + '.' + mm + '.' + yyyy;
  return today.toString();
}

module.exports = today;
