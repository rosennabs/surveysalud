const db = require('../dbConnection');

//Function to save program info to db
const saveProgram = async (program) => {
  const { program_name, current_phase, fiscal_year, quarter, end_date } = program;

  try {
    const result = await db.query('INSERT INTO programs (program_name, current_phase, fiscal_year, quarter, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [program_name, current_phase, fiscal_year, quarter, end_date]
    );
    console.log(result.rows[0]);
    return result.rows[0];

  } catch (error) {
    throw error;
  }
};

module.exports = {
  saveProgram
}