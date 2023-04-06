// const passport = require('passport');
// const express = require("express")
// const router = express.Router()


// // Redirect the user to Google for authentication
// router.get('/auth/google', passport.authenticate('google', {   //First arguement "google" which is strategy and the second is "scope" which is the info which we are looking to fetch
//     scope: ['profile', 'email']
// }));

// // Handle the Google authentication callback
// router.get('/auth/google/callback', passport.authenticate('google', {
//     failureRedirect: '/login',
//     successRedirect: '/'
// }));

// module.exports = router;