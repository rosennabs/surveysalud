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

module.exports = { saveChildNutritionResponses, fetchChildNutritionResponses };
