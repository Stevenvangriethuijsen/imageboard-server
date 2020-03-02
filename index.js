const express = require("express");
const db = require("./db");
const imageRouter = require("./image/router");

const app = express();
app.use(imageRouter);
const port = process.env.PORT || 4000;

app.listen(
  port,
  console.log(
    `Portal ${port} boot up sequence initiated, Stargate link to homeworld confirmed!`
  )
);
