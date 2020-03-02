const express = require("express");
const db = require("./db");
const imageRouter = require("./image/router");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./auth/router");
const userRouter = require("./user/router");

const app = express();
const corsMiddleware = cors();
const jsonParser = bodyParser.json();

app.use(corsMiddleware);
app.use(jsonParser);
app.use(imageRouter);
app.use(authRouter);
app.use(userRouter);

const port = process.env.PORT || 4000;

app.listen(
  port,
  console.log(
    `Portal ${port} boot up sequence initiated, Stargate link to homeworld confirmed!`
  )
);
