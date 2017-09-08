"use strict"

require('getmodule')

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

var router = getmodule('routes');

app.use(bodyParser());
app.use(express.static("public"));

router(app)

const port = 8080;
const hostname = "localhost";

app.listen(port, onStart());

function onStart() {
    console.log(`Server started at http://${hostname}:${port}`);
};