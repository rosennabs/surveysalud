const express = require("express");
const router = express.Router();
const { fetchChildVaccinationEntriesByMonth } = require("../db/queries/child_vaccination");
const { fetchChildNutritionEntriesByMonth } = require("../db/queries/child_nutrition");
const { fetchPostnatalEntriesByMonth } = require("../db/queries/postnatal");
const { fetchAntenatalEntriesByMonth } = require("../db/queries/antenatal");

router.get("/", async (req, res) => {
  try {
    // Fetch all entries in parallel
    const [
      vaccinationEntries,
      nutritionEntries,
      postnatalEntries,
      antenatalEntries,
    ] = await Promise.all([
      fetchChildVaccinationEntriesByMonth(),
      fetchChildNutritionEntriesByMonth(),
      fetchPostnatalEntriesByMonth(),
      fetchAntenatalEntriesByMonth(),
    ]);

    // Combine entries into one array
    const combinedEntries = [
      ...vaccinationEntries,
      ...nutritionEntries,
      ...postnatalEntries,
      ...antenatalEntries,
    ];

    // Aggregate total entries by month
    const aggregatedEntries = combinedEntries.reduce((acc, entry) => {
      const month = entry.month; // e.g., '2024-01-01'
      const totalEntries = parseInt(entry.total_entries, 10); // Convert to a number
      acc[month] = (acc[month] || 0) + totalEntries;
      return acc;
    }, {});

    // Transform aggregated entries back into an array
    const formattedEntries = Object.entries(aggregatedEntries).map(
      ([month, total_entries]) => ({
        month: new Date(month).toISOString().split("T")[0], // Format as 'YYYY-MM-DD'
        total_entries, // aggregated total for the month
      })
    );

    // Return the structured data
    res.status(200).json(formattedEntries);
  } catch (error) {
    console.error("Error fetching dashboard entries:", error);
    res.status(500).json({ error: "Failed to fetch dashboard entries" });
  }
});

module.exports = router;