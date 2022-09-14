const holidayCalendar = require('../calendar/holidayCalendar');
const { logger } = require('../utils/logger');

exports.getHolidays = async (req, res) => {
  try {
    const data = await holidayCalendar();
    logger.info(data);

    res.status(200).json(data);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
