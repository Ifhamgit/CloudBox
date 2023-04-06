// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const passport = require("passport");
// const authRoute = require("../routes/auth");
// const cookieSession = require("cookie-session");
// const passportStrategy = require("./passport");
// const app = express();
// // const User = require('../models/User');
// // const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// app.use(
// 	cookieSession({
// 		name: "session",
// 		keys: ["cyberwolve"],
// 		maxAge: 24 * 60 * 60 * 100,
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		methods: "GET,POST,PUT,DELETE",
// 		credentials: true,
// 	})
// );

// app.use("/auth", authRoute);

// // const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Listenting on port ${port}...`));

// // http://localhost:3000/
// // passport.use(new GoogleStrategy({
// //     clientID: "857209475133-8lqkmdplbh4pj4e6crom6pll7r7nm4l7.apps.googleusercontent.com",
// //     clientSecret: "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",
// //     callbackURL: "http://localhost:3000/users/auth/google/callback",
// //     // userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
// // },

// //  async (accessToken, refreshToken, profile, done) => {   //"accessToken is like JWT, "refreshToken is used when accessToken expires to get a new token"
// //                                                         //"Profile will contain the info of the user"

// //     User.findOne({email:profile.emails[0].value}).exec(async (err,user)=>{
// //         if(err){
// //         console.log("error in google strategy-passport",err);
// //         return
// //     }
// //     console.log(profile)
// //     if (user) {
// //         // User already exists, return the user
// //         done(null, user);
// //     } else {
// //         // User does not exist, create a new user
// //         user = await User.create({
// //             // googleId: profile.id,
// //             name: profile.displayName,
// //             email: profile.emails[0].value,
// //             password: crypto.randomBytes(20).toString("hex")
// //         },(err,user)=>{
// //             if(err){
// //                 console.log("error in creating user in google strategy-passport",err);
// //                 return done(null,user)
// //             }
// //         });
// //         done(null, user);
// //     }

// //     })
// // }))

// module.exports = passport