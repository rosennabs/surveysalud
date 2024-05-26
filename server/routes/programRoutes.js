const express = require("express");
const router = express.Router();
const { saveProgram } = require("../db/queries/program");

//Enter a program
router.post('/', async(req, res) => {
  try {
    const program = await saveProgram(req.body);
    res.status(201).json(program);
  } catch (error) {
    console.error("Error saving program to database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;