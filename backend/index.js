const connectToMongo = require("./db")
const express = require('express')
var cors = require('cors')
require("dotenv").config();
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./config/passport");


connectToMongo();

const app = express()
const port = 5000

app.use(cors())


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