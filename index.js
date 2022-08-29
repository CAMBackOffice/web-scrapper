const server = require("./server");
const { logger } = require("./utils/logger");

// server port
const port = process.env.PORT || 5000;

const startServer = () => {
  server.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  });
};

startServer();
