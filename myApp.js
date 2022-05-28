//importing the required modules
let express = require("express");
let app = express();
require("dotenv").config(); //importing the dotenv module
console.log("Hello World");

//Giving access to static assets
app.use("/public", express.static(__dirname + "/public"));

// request logger middleware
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//Index get route
app.get("/", function (req, res) {
  //sending index.html
  res.sendFile(__dirname + "/views/index.html");
});

// /json get rote
app.get("/json", function (req, res) {
  //sending json
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase"
        ? "Hello json".toUpperCase()
        : "Hello json",
  });
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date();
    next();
  },
  function (req, res) {
    res.json({
      "time": req.time
    });
  }
);

module.exports = app;
