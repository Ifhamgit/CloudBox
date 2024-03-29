const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require('../models/User');
const GithubStrategy = require("passport-github2").Strategy;




passport.use(
	new GoogleStrategy(
		{
			clientID: "857209475133-055o4bii06o51rslcls99dv3pb0mpjpk.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		// function (accessToken, refreshToken, profile, callback) {
		// 	callback(null, profile);
		// }
		async (accessToken, refreshToken, profile, done) => {   //"accessToken is like JWT, "refreshToken is used when accessToken expires to get a new token"
			                                                        //"Profile will contain the info of the user
			     User.findOne({email:profile.emails[0].value}).exec(async (err,user)=>{

			         if(err){
			         console.log("error in google strategy-passport",err);
			         return
			     }
			    //  console.log(profile)
			     if (user) {
			         // User already exists, return the user
			         done(null, user);
			     } else {
			         // User does not exist, create a new user
			         user = await User.create({
			             // googleId: profile.id,
			             name: profile.displayName,
			             email: profile.emails[0].value,
			             password: require('crypto').randomBytes(64).toString('hex')
			         },(err,user)=>{
			             if(err){
			                 console.log("error in creating user in google strategy-passport",err);
			                 return done(null,user)
			             }
			        });
			         done(null, user);

				}
			}); //callback(null, profile);

		}
		
		
	)
);


passport.use(
	new GithubStrategy(
	  {
		clientID: "c4aa204652826a6c3795",
		clientSecret: "98aeeaf676535c7a87d78664869c24500b3cfff1",
		callbackURL: "/auth/github/callback",
		scope: ["profile", "username"],
	  },
	  async (accessToken, refreshToken, profile, done) =>{
		// console.log(profile)
		
	  User.findOne({email:`${profile.username+profile.id}@gmail.com`}).exec(async (err,user)=>{
		if(err){
		console.log("error in github strategy-passport",err);
		return
	}
    
	if (user) {
		// User already exists, return the user
		done(null, user);
	} else {
		// User does not exist, create a new user
		user = await User.create({
			// googleId: profile.id,
			name: profile.username,
			email: `${profile.username+profile.id}@gmail.com`,
			password: require('crypto').randomBytes(64).toString('hex')
		},(err,user)=>{
			if(err){
				console.log("error in creating user in github strategy-passport",err);
				return done(null,user)
			}
	   });
		done(null, user);

   }
}) 
}//callback(null, profile);
	));









passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});