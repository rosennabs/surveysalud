const express = require('express');
const router = express.Router();
const { saveKnowledgeProduct } = require('../db/queries/kp');

router.post('/', async (req, res) => {
  try {
    const knowledge_product = await saveKnowledgeProduct(req.body);
    res.status(201).json(knowledge_product);
  }
  catch (error) {
    console.error("Error saving program to database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;