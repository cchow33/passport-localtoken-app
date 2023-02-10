const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');

const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.post('/login', function (req, res) {
  // Login process begins here
});

app.get('/login', function (req, res) {
  // This route serves the HTML to the browser
  res.sendFile(__dirname + '/login.html');;
});

app.get('/protected', function (req, res) {
  // This route will be secured to only logged in users eventually
});

app.listen(8000);