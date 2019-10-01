/*
*   server.js
*   This file is the entry point for the API
*/
require('dotenv').config();

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'), //created User model loading here
    Lot = require('./api/models/lotModel'), //created Lot model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/livelotapi');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/allRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('LiveLot RESTful API server started on: ' + port);
