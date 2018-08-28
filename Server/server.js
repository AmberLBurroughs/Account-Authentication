// Set up ======================================================

require("dotenv").config();
//Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const axios      = require('axios');

const passport     = require('passport');
const flash        = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session'); // cookie session

const app  = express();
const PORT = process.env.PORT || 8000;

const routes = require("./routes");
const db     = require("./models");


// Configuration ==============================================

require('./config/passport')(passport); // pass passport for configuration


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Enable CORS so that browsers don't block requests.
app.use((req, res, next) => {
  //access-control-allow-origin http://localhost:3000
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});



// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}


app.use(session({
    key: 'user_sid',
    secret: 'goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8',
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
        httpOnly: false
    }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
// app.use(methodO("_method"));

app.use(routes);



// Launch Server ==============================================

db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    })
})
