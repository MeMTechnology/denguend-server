"use strict"

require('getmodule')

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

var authenticateController = require('./controller/authenticate-controller');

var router = getmodule('routes');

app.use(bodyParser());
app.use(express.static("public"));
app.use(cors());

app.post('/api/authenticate',authenticateController.authenticate);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

router(app)

const port = 8080;
const hostname = "localhost";

app.listen(port, onStart());

function onStart() {
    console.log(`Server started at http://${hostname}:${port}`);
};