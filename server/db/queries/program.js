const db = require('../dbConnection');

//Function to save program info to db
const saveProgram = async (program) => {
  const { program_name, current_phase, fiscal_year, quarter, end_date } = program;

  try {

    // Check if the record already exists
    const checkQuery = `
    SELECT * FROM programs
    WHERE program_name = $1 AND current_phase = $2 AND fiscal_year = $3 AND quarter = $4 AND end_date = $5;    
    `;

    const values = [
      program_name,
      current_phase,
      fiscal_year,
      quarter,
      end_date,
    ];

    const checkResult = await db.query(checkQuery, values);
    

    if (checkResult.rows.length === 0) {
      const insertQuery = `
      INSERT INTO programs (program_name, current_phase, fiscal_year, quarter, end_date)
      VALUES ($1, $2, $3, $4, $5);
      `;

      const result = await db.query(insertQuery, values);
      //console.log(result.rows[0]);
      return result.rows[0];
    }
    else {
      // If exists, return the existing record
      return checkResult.rows[0];
    }

  } catch (error) {
    throw error;
  }
};

module.exports = {
  saveProgram
}