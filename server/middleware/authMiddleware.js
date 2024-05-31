const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Create middleware to protect routes and validate the JWT token

const authorization = (req, res, next) => {
  //console.log("authorization: ", req);
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing!' });
  }

  //Extract the token from the header which will be the second element in the resulting array
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Token missing!" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    //console.log("Is user authorized? ", payload);
    req.user = payload; // Attach the verified token to the request object
    next();
  }
  catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    } else {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}



module.exports = authorization;