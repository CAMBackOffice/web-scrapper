const router = require("express").Router();
const { getHolidays } = require("./controller");

router.route("/").get(getHolidays);

module.exports = router;
