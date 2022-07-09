const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const userModel = require("../model/user");

// dotenv.config();
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
        clientID        : "2083384268536731",
        clientSecret    : "8492c5bf2592179fbea81de14994b362",
        callbackURL     : "http://localhost:4001/auth/facebook/callback",
        profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile._json)
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name
      };
      new userModel(userData).save();
      done(null, profile);
    }
  )
);
