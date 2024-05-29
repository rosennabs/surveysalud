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

module.exports = router;