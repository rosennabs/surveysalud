const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { saveUser, findUserbyEmail } = require("../db/queries/user");
const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET;

//Register a user
router.post("/register", async (req, res) => {
  try {

    const { first_name, last_name, email, password } = req.body;

    //Check if the user already exists
    const existingUser = await findUserbyEmail(email);

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists!' });
    }

    //Hash user password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await saveUser({first_name, last_name, email, password: hashedPassword});
    res.status(201).json(newUser);

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Login a user
router.post("/login", async (req, res) => {
  try {
    const { first_name, email, password } = req.body;

    //Find user by email
    const user = await findUserbyEmail(email);

    if (!user) {
      console.log("User not found: ", user);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    //Compare user password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    //Generate a JWT token after successful authentication
    const token = jwt.sign({ userId: user.id, email: user.email, first_name: user.first_name}, JWT_SECRET, { expiresIn: '1h' });
   
    //Return the token and user data
    res.status(200).json({
      token,
      user: { id: user.id, email: user.email, first_name: user.first_name },
    });

  

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;