const express = require("express");
const passport = require("passport");
const OAuth2Data = require("../utils/google_key.json");
const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const axios = require("axios");
const { LoginSignup } = require("../controllers/LoginController");
const sendMail = require("../utils/sendEmail");
const userRouter = express.Router();
const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const createToken = (payload) => {
  jwt.sign(payload, "dgcdcbvc", { expiresIn: 3600 * 5 }, (err, token) => {
    if (err) {
      console.log(err);
    } else {
      console.log("token -->", token);
    }
  });
};

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: REDIRECT_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile) => {
      const UserData = {
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
      };
      const User = await UserModel.findOne({ email: UserData.email });
      if (User && User._id) {
        const payload = {
          id: User._id,
          firstName: User.firstName,
          lastName: User.lastName,
          email: User.email,
        };
        createToken(payload);
        const mailText =
          "<h3>Hello" +
          User.firstName +
          ",<h3>" +
          '<div style="color:#000000;margin-bottom:10px><p>Your Account Successfully Created</p></div>';
        const mailResult = await sendMail("Open Account", User.email, mailText);
        console.log(mailResult);
      } else {
        console.log("vhfhvghhg");
        console.log(UserData);
        const addData = new UserModel(UserData);
        const result = await addData.save();
        console.log(result);
        const payload = {
          id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
        };
        createToken(payload);
        const mailText =
          "<h3>Hello" +
          result.firstName +
          ",<h3>" +
          '<div style="color:#000000;margin-bottom:10px><p>Your Account Successfully Created</p></div>';
        const mailResult = await sendMail(
          "Account create",
          result.email,
          mailText
        );
        console.log(mailResult);
      }
    }
  )
);

userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get("/google/callback", passport.authenticate("google"));

module.exports = userRouter;
// const express = require("express");
// const passport = require("passport");
// const { goggleLogin, checkGoggle } = require("../controllers/LoginController");
// const userRouter = express.Router();

// userRouter.get("/", goggleLogin);
// userRouter.get("/google/callback", checkGoggle);

// module.exports = userRouter;
