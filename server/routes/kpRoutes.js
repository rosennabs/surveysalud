const express = require('express');
const router = express.Router();
const { saveKnowledgeProduct, fetchKnowledgeProducts } = require('../db/queries/kp');

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

router.get('/all', async (req, res) => {
  try {
    const kp_data = await fetchKnowledgeProducts();
    
    res.status(201).json(kp_data);
  }
  catch (error) {
    
      console.error("Error fetching data from database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }

});

module.exports = router;