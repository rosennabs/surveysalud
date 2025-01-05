const express = require("express");
const router = express.Router();
const {
  saveChildVaccinationResponses,
  fetchChildVaccinationResponses,
 fetchChildVaccinationEntriesByMonth
} = require("../db/queries/child_vaccination");

router.post("/", async (req, res) => {
  try {
    const response = await saveChildVaccinationResponses(req.body);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error saving data to db ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await fetchChildVaccinationResponses();

    res.status(201).json(response);
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/monthly_entries", async (req, res) => {
  try {
    const response = await fetchChildVaccinationEntriesByMonth();

    res.status(201).json(response);
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
