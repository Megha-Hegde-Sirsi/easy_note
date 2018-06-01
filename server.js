const express = require('express')
const body_parser = require('body-parser')

//create express app
const app = express();

//parse requests of content type application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(body_parser.json())

//configuring the database
const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

//connecting to database
mongoose.connect(dbConfig.url)
    .then(() => {
        console.log('Succesfully connected to database')
    }).catch((err) => {
        console.log('Couldnot connect to the database... Exiting now.....\n' + err);
        process.exit();
    });

//simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to easy todo application. Now keep track of your work by keeping todo with this app" })
});

require('./app/routes/todo.routes.js')(app)

app.listen(3000, () => {
    console.log("Easy notes application server is up at 3000. Thank you")
});