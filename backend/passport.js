const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new FacebookStrategy({
    clientID        : "2083384268536731",
    clientSecret    : "8492c5bf2592179fbea81de14994b362",
    callbackURL     : "http://localhost:4001/auth/facebook/callback",
},
function(accessToken, refreshToken, profile, done) {
    console.log(profile)
  return done(null, profile);
}
));