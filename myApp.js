let express = require('express');
let app = express();
require('dotenv').config();

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

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
    })
});

 module.exports = app;