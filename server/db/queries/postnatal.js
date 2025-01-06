const db = require("../dbConnection");

//Function to save antenatal data to db
const savePostnatalResponses = async (postnatalResponses) => {
  const {
    age,
    receivedPostnatalCheckups,
    numberOfPostnatalVisits,
    experiencedComplications,
    receivedBreastfeedingSupport,
    receivedMentalHealthSupport,
    providedNewbornCareInfo,
    additionalComments,
    reported_by,
  } = postnatalResponses;

  try {
    const insertQuery = `
INSERT INTO postnatal_survey (
  age,
  received_postnatal_checkups,
  number_of_postnatal_visits,
  experienced_complications,
  received_breastfeeding_support,
  received_mental_health_support,
  provided_newborn_care_info,
  additional_comments,
  reported_by
)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `;

    const insertValues = [
      age,
      receivedPostnatalCheckups,
      numberOfPostnatalVisits,
      experiencedComplications,
      receivedBreastfeedingSupport,
      receivedMentalHealthSupport,
      providedNewbornCareInfo,
      additionalComments,
      reported_by,
    ];

    const result = await db.query(insertQuery, insertValues);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

//Fetch all KP entries
async function fetchPostnatalResponses() {
  const data = await db.query("SELECT * FROM postnatal_survey;");
  return data.rows;
}

// Fetch total entries grouped by date
async function fetchPostnatalEntriesByMonth() {
  const data = await db.query(`
   SELECT 
      DATE_TRUNC('month', created_at) AS month, 
      COUNT(*) AS total_entries
    FROM postnatal_survey
    GROUP BY month
    ORDER BY month;
  `);
  return data.rows; // Returns { date: 'YYYY-MM-DD', total_entries: number } truncated to the first day of each month
}
module.exports = { savePostnatalResponses, fetchPostnatalResponses, fetchPostnatalEntriesByMonth };
