const app = require("express")();
const cors = require("cors");
const bodyParser = require("express").json();
const routes = require("./routes");
const morgan = require("morgan");

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser);
app.use(morgan("dev"));
app.use(routes);

module.exports = app;
