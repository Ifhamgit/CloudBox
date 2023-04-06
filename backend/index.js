const connectToMongo = require("./db")
const express = require('express')
var cors = require('cors')
// const passportGoogle = require("./config/passport-google-strategy")
// const session = require('express-session');
require("dotenv").config();
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./config/passport");


connectToMongo();

const app = express()
const port = 5000

// app.use(cors())
app.use(cors({ credentials: true }))


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Availaible routes
app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);





// Configure passport
// passport.use(new GoogleStrategy({
//     clientID: "857209475133-8lqkmdplbh4pj4e6crom6pll7r7nm4l7.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL: "http://localhost:5000/auth/google/callback",
//     userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
// }, 
// async (accessToken, refreshToken, profile, done) => {
//     try {
//         // Check if user already exists in database
//         let user = await User.findOne({ googleId: profile.id });
//         if (user) {
//             // User already exists, return the user
//             done(null, user);
//         } else {
//             // User does not exist, create a new user
//             user = await User.create({
//                 googleId: profile.id,
//                 displayName: profile.displayName,
//                 email: profile.emails[0].value
//             });
//             done(null, user);
//         }
//     } catch (err) {
//         done(err, null);
//     }
// }));

// // Configure session store
// const store = new MongoDBStore({
//     uri: "mongodb://127.0.0.1:27017/cloudbox",
//     collection: 'sessions'
// });

// // Handle errors with session store
// store.on('error', (error) => {
//     console.error(error);
// });

// // Configure session middleware
// app.use(session({
//     secret: "Ifhamisaverygoodb@y",
//     resave: false,
//     saveUninitialized: false,
//     store: store
// }));

// // Initialize passport and session middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Serialize user for session management
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// // Deserialize user for session management
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });


app.listen(port, () => {
   console.log(`CloudBox backend listening on port http://localhost:${port}`)
 })

// const start = async () => {
//   try {
//     await connectToMongo();
//     app.listen(port, () => {
//       console.log(`Example app listening on port http://localhost:${port}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };