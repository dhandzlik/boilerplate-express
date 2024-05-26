let express = require('express');
const { setupBackgroundApp } = require('fcc-express-bground');
let app = express();
require('dotenv').config();
var bodyParser = require("body-parser");

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

let response

app.get("/json", (req, res) => {
    if(process.env.MESSAGE_STYLE === "uppercase") {
        response = "HELLO JSON"
    } else {
        response = "Hello json";
    }

    res.json({
        message: response
    });
});

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({
        time: req.time
    });
});

app.get("/:word/echo", (req, res) => {
    res.json({
        echo: req.params.word
    });
});

app.get("/name", (req, res) => {
    res.json({
        name: req.query.first + " " + req.query.last
    })
});

app.post("/name", (req, res) => {
    res.json({
        name: req.body.first + " " + req.body.last
    })
})

 module.exports = app;