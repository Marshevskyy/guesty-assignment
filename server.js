// server.js

// BASE SETUP
// ==========

// call the packages we need 
const express = require("express"); // call express
const app = express(); // define our app using express
const RateLimit = require('express-rate-limit'); // define Rate Limit
const bodyParser = require('body-parser'); // body parsing middleware

const port = process.env.PORT || 8080; // set our port

// Config for Rate Limit
const limiter = new RateLimit({
    windowMs: 10*1000, // 10 seconds
    max: 5, // limit each IP to 5 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
    // message: Defaults to 'Too many requests, please try again later.'
    // statusCode: Defaults to 429.
});

//  apply Rate Limmiter to all requests using middlaware
app.use(limiter);

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// Send JSON responses
app.use(bodyParser.json()); 



// REGISTER OUR ROUTES
// test route to make sure everything is working
app.get('/', (req, res) => res.send('Batch Service is up and running'));
// our route will be prefixed with /batch
const batchRoute = require('./src/routes');
app.use('/batch', batchRoute);

// START THE SERVER
// =================
app.listen(port, err => {
	if (err) {
		throw err;
	}
	console.log(`Server up and running on port ${port}`);
});