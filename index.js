const express = require("express");
const db = require("./db");
const imageRouter = require("./image/router");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const corsMiddleware = cors();
const jsonParser = bodyParser.json();

app.use(corsMiddleware);
app.use(jsonParser);
app.use(imageRouter);

const port = process.env.PORT || 4000;

app.listen(
  port,
  console.log(
    `Portal ${port} boot up sequence initiated, Stargate link to homeworld confirmed!`
  )
);
