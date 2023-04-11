const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const passport = require("passport");



JWT_Secret = "Ifhamisvaryvarygoodb@y"    //We make a signature for JWT
                                        // It is used to catch the users who try to tamper with our authToken


// Route:1 - Create a user using: POST "/api/auth/createuser". Does not require authentication.(No login required)
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),
],  async (req,res)=>{
    let success = false
   
    // console.log(req.body) // This line will print whatever is sent in the body of the request.
    // const user = User(req.body)
    
    // user.save()
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });  

}  
    try {
        
   
     //check whether the user with this email already exits
     let user = await User.findOne({email:req.body.email})
     if(user){
        return res.status(400).json({success, error:"Sorry a user with this email already exist"})
     }
     //Creating new user
    const salt = await bcrypt.genSalt(10)  //This function creates a salt of 10 digits, this also returns a promise.
    const secPass = await bcrypt.hash(req.body.password, salt)  // It is marked await because it returns a promise .
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    })


    // .then(user => res.json(user)).catch(err =>{console.log(err),res.json({error:"Please enter a unique value for email", message:err.message})})
    //  res.send(req.body)


    const data = {        //This is the payload
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data, JWT_Secret)   //data here is object and second parameter is the signature string
    // res.json(user)
    success = true
    res.json({success, authToken})

    } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error")
    }

})


//Route:-2 Autheticate a user using: POST "/api/auth/login". Does not require authentication.(No login required)
router.post('/login',[
    
    body('email', 'Enter a valid email').isEmail(),  //We will authenticate the email, if the email is wrong server will not be bothered further
    body('password', "password cannot be blank").notEmpty(),  // A blank password cannot be entered

],  async (req,res)=>{
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  
    }


const {email, password} = req.body       //Destructuring, taking out email and pass from req.body
try {
    let user =  await User.findOne({email})    //variable declared with let is only accessible within the block of code it is declared in, including any nested blocks.
    if(!user){
        
        return res.status(400).json({success, error:"Please try to login with correct credentials"})  //We do not give the error message
                                                                                    // that the user does not exist, because it can be a hacker.
    }

    const passwordCompare = await bcrypt.compare(password, user.password)  //It compares all the hashes and things internally
    if(!passwordCompare){
        success = false
        return res.status(400).json({success, error:"Please try to login with correct credentials"})
    }

    const data = {        //This is the payload
        user:{
            id:user.id 
        }
    }
    const authToken = jwt.sign(data, JWT_Secret)   //data here is object and second parameter is the signature string
    // res.json(user)
    success = true
    res.json({success, authToken})

} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server Error")
}
})


//Route:-3 Get loggedin user details: POST "/api/auth/getuser". login is required, which means we have to send the JWT.
router.post('/getuser', fetchuser, async (req,res)=>{   //passing the middleware in the arguments, and after that only the “async (req,res) will run.”
try {
    userID = req.user.id
    const user = await User.findById(userID).select("-password")  //we're excluding the password field from the query result, presumably for security reasons.
    res.send(user)
    //We do not write the fetching code here only because it could be required anywhere anytime, if we add extra features in our website.
    //We wrote it inside the middleware fucntion "fetchuser.js"

} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server Error")
}
})






//Route:-4(OAuth login)  Successful login happens on this route: GET "/auth/login/success". login is not required.  

router.get("/login/success",async (req, res) => {
    let success=true
    //  console.log(req.user)
     
	if (req.user) {
        if(req.user.email){
        const {email} = req.user
        
        let user =  await User.findOne({email}) 
        var data = {        //This is the payload
            user:{
                id:user.id
            }
        }
    }
        if(req.user.username){
        const {username} = req.user
        
        let user =  await User.findOne({username}) 
        console.log(user)
        var data = {        //This is the payload
            user:{
                id:user.id
        
            }
        }
        console.log(user.id)
    }
        const authToken = jwt.sign(data, JWT_Secret)
		res.status(200).json({
            success,
			error: false,
			message: "Successfully Loged In",
			user: req.user,
            authToken  
		});
           //data here is object and second parameter is the signature string
        // res.json(user)   
	}
    else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});



// router.get("/login/failed", (req, res) => {
// 	res.status(401).json({
// 		error: true,
// 		message: "Log in failure",
// 	});
// });



//Route:-5(OAuth Signup)  Successful SignUp happens on this route: GET "/auth/login/created". login is not required.
router.get("/login/created", (req, res) => {
	res.status(200).json({
		
		message: "Sign Up completed, User has been created, Log In / repeat the process to continue",
	});
});


//Route:-6(Google login)  Authntication of user happens on this route: GET "/auth/google". login is not required.
router.get("/google", passport.authenticate("google", ["profile", "email"]));


//Route:-7(Google login)  Google callback happens on this route: GET "/auth/google/callback". login is not required.
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:3000/",
		// failureRedirect: "http://localhost:5000/auth/login/failed"
		failureRedirect: "http://localhost:5000/auth/login/created"
	})
);



//Route:-8(OAuth logout)  Successful logout happens on this route: GET "/auth/logout". login is required.
 router.get("/logout",  (req, res) => {

    req.logout();
    res.clearCookie('session');
 	res.redirect("http://localhost:3000/login");
    
 });





 router.get('/github',
  passport.authenticate('github', { scope: [ 'profile', "email" ] }));


router.get('/github/callback', 
  passport.authenticate('github', { 
  successRedirect: "http://localhost:3000/",
  // failureRedirect: "http://localhost:5000/auth/login/failed"
  failureRedirect: "http://localhost:5000/auth/login/created"

   }));


module.exports = router;











