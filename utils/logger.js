const pino = require("pino");

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: true,
    },
  },
});

module.exports.logger = logger;
