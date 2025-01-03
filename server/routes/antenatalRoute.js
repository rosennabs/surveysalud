const express = require('express');
const router = express.Router();
const {saveAntenatalResponses, fetchAntenatalResponses} = require("../db/queries/antenatal");

router.post('/', async (req, res) => {
  try {
    const response = await saveAntenatalResponses(req.body);
    
    res.status(201).json(response);
  }
  catch (error) {
    
      console.error("Error saving data to database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }

});

router.get('/', async (req, res) => {
  try {
    const response = await fetchAntenatalResponses();
    
    res.status(201).json(response);
  }
  catch (error) {
    
      console.error("Error fetching data from database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }

});

module.exports = router;