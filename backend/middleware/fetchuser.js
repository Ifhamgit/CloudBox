const jwt = require("jsonwebtoken");
JWT_Secret = "Ifhamisvaryvarygoodb@y";

const fetchuser = (req, res, next) => {
  //get user from the JWT token and add id to req object
  const token = req.header("auth-token");  //name of the header we kept is auth-token

  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {  //We implemented try-catch to catch the error if the token is not valid.

    const data = jwt.verify(token, JWT_Secret);
    req.user = data.user; //We get the user here
    
    next(); //next make sures that the next function after the fetchuser in the "auth.js" which is the (req,res) is called.

  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
