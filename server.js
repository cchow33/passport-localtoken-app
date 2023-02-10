const express = require("express");
const app = express();
const passport = require("passport");
const bodyParser = require("body-parser");
const jwt = require("jwt-simple");

const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

const tokenForUser = function (user) {
  return jwt.encode(
    {
      sub: user.myID,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    "bananas"
  );
};

passport.use(
  "login",
  new LocalStrategy(function (username, password, done) {
    const authenticated = username === "John" && password === "Smith";

    console.log("This logs first");

    if (authenticated) {
      return done(null, { myUser: "user", myID: 1234 });
    } else {
      return done(null, false);
    }
  })
);

const requireSignin = passport.authenticate("login", { session: false });

app.post("/login", requireSignin, function (req, res, next) {
  // This is where the login process will happen
  console.log("Then this logs");
  res.send({
    token: tokenForUser(req.user),
  });
});

app.get("/login", function (req, res) {
  // This route serves the HTML to the browser
  res.sendFile(__dirname + "/login.html");
});

app.get("/protected", function (req, res) {
  // This route will be secured to only logged in users eventually
});

app.listen(8000);