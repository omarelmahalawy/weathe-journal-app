// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 3000;
const server = app.listen(port, listening)

// @listening checking that the local server is running on port

function listening() {
    console.log(`running on localhost: ${port}`)
}

// setting up all route with GET call back function

app.get('/all', sendAllData);

// Callback function to complete GET '/all'
function sendAllData(request, response) {
    response.send(projectData);
    console.log("all data are sent to the client side")
};

// setting up post route
app.post('/addData', addData);

function addData(req, res) {
    projectData.temp = req.body.temp
    projectData.date = req.body.date
    projectData.content = req.body.content
    console.log(projectData);
};