const db = require('../dbConnection');

// Function to save users to the database
const saveUser = async (user) => {
  const { first_name, last_name, email, password } = user;

  try {
    const checkQuery = `
    SELECT * FROM users
    WHERE LOWER(first_name) = LOWER ($1) AND LOWER(last_name) = LOWER($2) AND email = $3 AND password = $4;
    `;

    const values = [first_name, last_name, email, password];

    const checkResult = await db.query(checkQuery, values);

    if (checkResult.rows.length === 0) {
      const insertQuery =
        "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)";
      
      const result = await db.query(insertQuery, values);
      return result.rows[0];
    } else {
      return checkResult.rows[0];
    }
 
    
  } catch (err) {
    throw err;
  }
};

module.exports = {
  saveUser
}