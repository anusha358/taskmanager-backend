// Launching a http server
const express = require("express");
const app = express();
const taskRouter = require("./Routes/task.router");
const errorController = require("./controllers/errorController");
const tasksController = require("./controllers/task.controller");
const bodyParser = require("body-parser");
const mongoConnect = require("./utils/mongodb").mongoConnect;
const helmet = require("helmet");
const compression = require("compression");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const https = require("https");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(process.env.NODE_ENV);
// const privateKey = fs.readFileSync("server.key");
// const certificate = fs.readFileSync("server.cert");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS,PUT,DELETE,PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authoriztion");
  next();
});

app.use(taskRouter);

app.use(errorController.get404);
const acesslogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: acesslogStream }));

mongoConnect(() => {
  // https
  //   .createServer({ key: privateKey, cert: certificate }, app)
  app.listen(process.env.PORT || 8080);
});
