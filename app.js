const express = require("express");
const app = express();
require("dotenv").config();

const requestRouter = require("./routes/request");
const oAuthRouter = require("./routes/oauth");

app.options("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "content-type, credentials, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "GET", "POST");
  res.status(200);
  next();
});

app.use("/oauth", oAuthRouter);
app.use("/request", requestRouter);

app.get("/oauth", (req, res) => {
  res.send("Learning nodejs");
});

const { PORT, HOSTNAME } = process.env;
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
});
