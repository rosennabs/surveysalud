const db = require('../dbConnection');

// Function to save users to the database
const saveUser = async (user) => {
  const { first_name, last_name, email, password } = user;
  try {
    const result = await db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, password]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  saveUser
}