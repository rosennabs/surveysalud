const db = require("../dbConnection");

//Function to save antenatal data to db
const saveChildVaccinationResponses = async (response) => {
  const {
    age,
    bcgVaccine,
    opvVaccine,
    dptVaccine,
    measlesVaccine,
    reasonForMissingVaccinations,
    otherReasons,
    reported_by,
  } = response;

  try {
    const insertQuery = `
INSERT INTO child_vaccination (
  age,
  bcg_vaccine,
  opv_vaccine,
  dpt_vaccine,
  measles_vaccine,
  reason_for_missing_vaccinations,
  other_reasons,
  reported_by
)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `;

    const insertValues = [
      age,
      bcgVaccine,
      opvVaccine,
      dptVaccine,
      measlesVaccine,
      reasonForMissingVaccinations,
      otherReasons,
      reported_by,
    ];

    const result = await db.query(insertQuery, insertValues);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

//Fetch all KP entries
async function fetchChildVaccinationResponses() {
  const data = await db.query("SELECT * FROM child_vaccination;");
  return data.rows;
}

module.exports = {
  saveChildVaccinationResponses,
  fetchChildVaccinationResponses,
};
