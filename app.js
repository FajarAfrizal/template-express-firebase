const express = require("express");
const app = express();
const db = require("./src/db");
const logger = require('./src/helpers/logger');
const { errorStack, notFound  } = require("./src/middlewares/handle-error")
const routes = require("./src/routes");

app.get("/", (req, res) => {
    res.send("Selamat datang di aplikasi Express.js dengan Firebase!");
});

const port = process.env.PORT || '3000';
const host = process.env.HOST || 'localhost';

app.listen(port);
logger('info', 'Server', `Server is listening on: http://${host}:${port}`);
db()

app.use('/', routes);

app.use(errorStack);
app.use(notFound);