// import userServices from '../services/user.services';
const { google } = require("googleapis");
const OAuth2Data = require("../utils/google_key.json");
// import { userModel } from '../models';
const userModel = require("../model/user");

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
var authed = false;

exports.goggleLogin = async (req, res) => {
  if (!authed) {
    // Generate an OAuth URL and redirect there
    const url = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/gmail.readonly",
      ],
    });
    console.log("hfdhgd",url);
    res.redirect(url);
  } else {
    var oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: "v2",
    });
    const profile = await oauth2.userinfo.v2.me.get();
    // console.log(profile.data);
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    // console.log(gmail);
    const gmailprofileData = await gmail.users.getProfile({ userId: "me" });
    // console.log(gmailprofileData.data);

    const findUser = await userModel.findOne({
      email: gmailprofileData.data.emailAddress,
    });
    if (!findUser) {
      const user = {
        firstName: profile.data.name.split(" ")[0],
        lastName: profile.data.name.split(" ")[1],
        email: gmailprofileData.data.emailAddress,
      };
      const data = new userModel(user);
      try {
        const result = await data.save();
        res.send("Logged in successfully");
        console.log("Result >>::", result);
      } catch (error) {
        console.log(error);
      }
      // userServices.saveUserData({
      // 	firstName: profile.data.name.split(' ')[0],
      // 	lastName: profile.data.name.split(' ')[1],
      // 	email: gmailprofileData.data.emailAddress,
      // 	isVerified: true,
      // });
    }
  }
};

exports.checkGoggle = (req, res) => {
  const code = req.query.code;
  if (code) {
    // Get an access token based on our OAuth code
    oAuth2Client.getToken(code, function (err, tokens) {
      if (err) {
        console.log("Error authenticating");
        console.log(err);
      } else {
        console.log("Successfully authenticated");
        oAuth2Client.setCredentials(tokens);
        authed = true;
        res.redirect(`/?e=${tokens.id_token}`);
      }
    });
  }
};
