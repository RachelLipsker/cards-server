const express = require("express");
const chalk = require("chalk");
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const loggerMiddleware = require("./logger/loggerService");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(corsMiddleware);
app.use(express.json());

app.use(loggerMiddleware());

app.use(express.static("./public"));

app.use(router);

app.use((err, req, res, next) => {
    return handleError(res, 500, "internal error of the server")
});

app.listen(PORT, () => {
    console.log(chalk.yellow("server is listening to port 8080"));
    connectToDb();
});