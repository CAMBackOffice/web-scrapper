const holidayCalendar = require("../calendar/holidayCalendar");

exports.getHolidays = async (req, res) => {
  try {
    const data = await holidayCalendar();

    res.status(200).json(data);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
