const express = require("express");
const router = express.Router();
const { saveUser } = require("../db/queries/user");


//Register a user
router.post("/", async (req, res) => {
  try {
    const user = await saveUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error saving user to database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;