// const express = require('express');
// const router = express.Router();

// // Authentication middleware
// const authMiddleware = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         // User is authenticated, continue to next middleware or route handler
//         return next();
//     } else {
//         // User is not authenticated, redirect to login page
//         res.redirect('/login');
//     }
// };

// // Protected routes
// router.get('/', authMiddleware, (req, res) => {
//     res.render('dashboard', { user: req.user });
// });

// module.exports = router;