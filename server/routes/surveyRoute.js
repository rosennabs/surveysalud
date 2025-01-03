const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {
  try {

    res.status(201).json(req.body);
  } catch (error) {
    console.error("Error saving selections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
