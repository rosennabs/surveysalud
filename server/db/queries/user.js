const db = require('../dbConnection');

// Function to save users to the database
const saveUser = async (user) => {
  const { first_name, last_name, email, password } = user;

  try {
    const query =
      `INSERT INTO users (first_name, last_name, email, password) 
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `;
    const values = [first_name, last_name, email, password];

    const result = await db.query(query, values);
    return result.rows[0];

  } catch (err) {
    throw err;
  }
};

//Function to find user in the database
const findUserbyEmail = async (email) => {
  try {
    const query = `
    SELECT * FROM users
    WHERE LOWER(email) = LOWER($1);
    `;
    const result = await db.query(query, [email]);
    return result.rows[0];

  } catch (error) {
    console.error('Error finding user by email: ', error);
    throw error;
  }
};

module.exports = {
  saveUser,
  findUserbyEmail
};