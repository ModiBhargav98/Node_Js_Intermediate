const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
// const isLoggedIn = require("./Middleware/auth");
const passport = require("passport");
const bp = require('body-parser')
const cookieSession = require("cookie-session");
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

const files = require("./routes/fileRoute");
const Product = require("./routes/productRoute");
const Login = require("./routes/Login_SignUp_Routes")

app.use("/user", files);
app.use("/product", Product);
app.use("/",Login)
app.use(errorMiddleware);


module.exports = app;
