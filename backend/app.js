const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const isLoggedIn = require("./Middleware/auth");
const passport = require("passport");
const bp = require('body-parser')
const FacebookStrategy = require("passport-facebook").Strategy;
// require("./passport");
const cookieSession = require("cookie-session");
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    name: "facebook-auth-session",
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
passport.use(
  new FacebookStrategy(
    {
      clientID: "2083384268536731",
      clientSecret: "8492c5bf2592179fbea81de14994b362",
      callbackURL: "http://localhost:4001/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(accessToken);
      return cb(null, profile);
    }
  )
);
// require('./auth')(passport);
// Routes imports
// app.get("/", (req, res) => {
//   // console.log(req.user)
//   res.send(`Hello world ${req.user.displayName}`);
// });
// app.get("/auth/error", (req, res) => res.send("Unknown Error"));
// app.get("/auth/facebook", passport.authenticate("facebook"));
// app.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   function (req, res) {
//     console.log(req.user);
//     res.redirect("/");
//   }
// );
// app.get("/", isLoggedIn, (req, res) => {
//   res.send(`Hello world ${req.user.displayName}`);
// });
// app.get("/logout", (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect("/");
// });
app.get("/auth/facebook", passport.authenticate("facebook"))
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  function(req, res) {
    console.log("req", req.user)
    res.render("data", {
      user: req.user,
    })
  }
)
app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  })
})
const files = require("./routes/fileRoute");
const Product = require("./routes/productRoute");
// const Login = require("./routes/Login_SignUp_Routes")

app.use("/user", files);
app.use("/product", Product);
// app.use("/",Login)
app.use(errorMiddleware);

// app.post("/register", async (req, res) => {

//     // Our register logic starts here
//     try {
//       // Get user input
//       const { first_name, last_name, email, password } = req.body;

//       // Validate user input
//       if (!(email && password && first_name && last_name)) {
//         res.status(400).send("All input is required");
//       }

//       // check if user already exist
//       // Validate if user exist in our database
//       const oldUser = await User.findOne({ email });

//       if (oldUser) {
//         return res.status(409).send("User Already Exist. Please Login");
//       }

//       //Encrypt user password
//       encryptedPassword = await bcrypt.hash(password, 10);

//       // Create user in our database
//       const user = await User.create({
//         first_name,
//         last_name,
//         email: email.toLowerCase(), // sanitize: convert email to lowercase
//         password: encryptedPassword,
//       });

//       // return new user
//       res.status(201).json(user);
//     } catch (err) {
//       console.log(err);
//     }
//     // Our register logic ends here
//   });

// Logic goes here

module.exports = app;
