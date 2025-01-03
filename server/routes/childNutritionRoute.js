const express = require('express');
const router = express.Router();
const { saveChildNutritionResponses, fetchChildNutritionResponses } = require('../db/queries/child_nutrition');


router.post('/', async (req, res) => {
  try {
    const response = await saveChildNutritionResponses(req.body);
    res.status(201).json(response);
  }
  catch (error) {
    console.error('Error saving data to db ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

router.get("/", async (req, res) => {
  try {
    const response = await fetchChildNutritionResponses();

    res.status(201).json(response);
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;