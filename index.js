const express = require("express");
const db = require("./db");
const Model = require("./image/model");

const app = express();

const port = process.env.PORT || 4000;

app.listen(
  port,
  console.log(
    `Portal ${port} boot up sequence initiated, Stargate link to homeworld confirmed!`
  )
);
