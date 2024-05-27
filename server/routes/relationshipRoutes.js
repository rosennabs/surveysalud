const express = require('express');
const router = express.Router();
const { saveRelationship } = require('../db/queries/relationship');


router.post('/', async (req, res) => {
  //Start a transaction upon receiving a post request
  try {
    const relationship = await saveRelationship(req.body);
    console.log("Relationship response: ", req.body);
    res.status(201).json(relationship);
  }
  catch (error) {
    console.error('Error saving relationship to db ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

module.exports = router;