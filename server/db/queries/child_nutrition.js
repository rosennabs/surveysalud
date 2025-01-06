const db = require("../dbConnection");

//Function to save antenatal data to db
const saveChildNutritionResponses = async (nutritionResponses) => {
  const {
    age,
    childWeight,
    exclusiveBreastfeeding,
    ageComplementaryFoods,
    mealFrequency,
    lastGrowthCheckup,
    growthChartAtHome,
    reported_by,
  } = nutritionResponses;

  try {
    const insertQuery = `
INSERT INTO child_nutrition (
  age,
  child_weight,
  exclusive_breastfeeding,
  age_complementary_foods,
  meal_frequency,
  last_growth_checkup,
  growth_chart_at_home,
  reported_by
)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `;

    const insertValues = [
      age,
      childWeight,
      exclusiveBreastfeeding,
      ageComplementaryFoods,
      mealFrequency,
      lastGrowthCheckup,
      growthChartAtHome,
      reported_by,
    ];

    const result = await db.query(insertQuery, insertValues);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

//Fetch all KP entries
async function fetchChildNutritionResponses() {
  const data = await db.query("SELECT * FROM child_nutrition;");
  return data.rows;
}

// Fetch total entries grouped by date
async function fetchChildNutritionEntriesByMonth() {
  const data = await db.query(`
   SELECT 
      DATE_TRUNC('month', created_at) AS month, 
      COUNT(*) AS total_entries
    FROM child_nutrition
    GROUP BY month
    ORDER BY month;
  `);
  return data.rows; // Returns { date: 'YYYY-MM-DD', total_entries: number } truncated to the first day of each month
}
module.exports = { saveChildNutritionResponses, fetchChildNutritionResponses, fetchChildNutritionEntriesByMonth };
