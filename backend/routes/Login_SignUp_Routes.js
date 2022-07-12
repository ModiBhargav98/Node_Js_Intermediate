const express = require("express");
const passport = require("passport");
const OAuth2Data = require("../utils/google_key.json");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const axios = require("axios");
const { LoginSignup } = require("../controllers/LoginController");
const userRouter = express.Router();
const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: REDIRECT_URL,
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile,done) => {
      // console.log(request)
      if (profile) {
        console.log("hello", profile);
        done(null, profile)

      } else {
        request.status(200).json({
          msg: "Authentication failed please re-login",
        });
      }
    }
  )
);

userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
      console.log(req)
    // res.redirect("/good");
  }
);

// userRouter.route('/login_signup').post(LoginSignup)

// userRouter.get("/fail",(req,res) => {
//   res.send("your are not authenticated user")
// })

module.exports = userRouter;
// const express = require("express");
// const passport = require("passport");
// const {goggleLogin, checkGoggle} = require("../controllers/LoginController")
// const userRouter = express.Router();

// userRouter.get('/auth/facebook',
//   passport.authenticate('facebook'));

// userRouter.get('/auth/facebook/callback',
//   passport.authenticate("facebook", {
//     successRedirect: "/sucess",
//     failureRedirect: "/fail"
//   })
// );

// userRouter.route("fail").get((req,res) => {
//   res.send("Failed attempt");
// })

// userRouter.route("sucess").get((req,res) => {
//   res.send("Success");
// })
// userRouter.get('/', goggleLogin);
// userRouter.get('/google/callback', checkGoggle);

// module.exports = userRouter
