const db = require("../dbConnection");


//Function to save antenatal data to db
const saveAntenatalResponses = async (antenatalResponses) => {
  const {
    age,
    gestationalAge,
    numberOfCheckups,
    accessibilityCare,
    antenatalSupplements,
    vaccinationsReceived,
    screeningTests,
    healthEducationReceived,
    satisfactionCare,
    additionalComments,
    reported_by
  } = antenatalResponses;

  try {
    const insertQuery = `
INSERT INTO antenatal_survey (age,
gestational_age,
number_of_checkups,
accessibility_care,
antenatal_supplements,
vaccinations_received,
screening_tests,
health_education_received,
satisfaction_care,
additional_comments,
reported_by
)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
    `;
      
      const insertValues = [
        age,
        gestationalAge,
        numberOfCheckups,
        accessibilityCare,
        antenatalSupplements,
        vaccinationsReceived,
        screeningTests,
        healthEducationReceived,
        satisfactionCare,
        additionalComments,
        reported_by
      ];

      const result = await db.query(insertQuery, insertValues);
      return result.rows[0];

  } catch (error) {
    throw error;
  }
};

//Fetch all KP entries
async function fetchAntenatalResponses() {
  const data = await db.query('SELECT * FROM antenatal_survey;');
  return data.rows;
}

// Fetch total entries grouped by date
async function fetchAntenatalEntriesByMonth() {
  const data = await db.query(`
   SELECT 
      DATE_TRUNC('month', created_at) AS month, 
      COUNT(*) AS total_entries
    FROM antenatal_survey
    GROUP BY month
    ORDER BY month;
  `);
  return data.rows; // Returns { date: 'YYYY-MM-DD', total_entries: number } truncated to the first day of each month
}

module.exports = { saveAntenatalResponses, fetchAntenatalResponses, fetchAntenatalEntriesByMonth };
