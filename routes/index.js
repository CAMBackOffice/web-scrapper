const express = require("express");
const router = express.Router();

const holidayCalendar = require("../calendar");

// scrapper.
router.use("/holiday", holidayCalendar);

module.exports = router;
