const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { saveUser, findUserbyEmail } = require("../db/queries/user");
const SALT_ROUNDS = 12; 

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
    const { email, password } = req.body;

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

    //Return success response
    res.status(200).json({ message: 'Login successful!' });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;