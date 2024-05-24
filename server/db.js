require("dotenv").config(); //run npm install dotenv

const { Pool } = require("pg"); //run npm install pg

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Function to save users to the database
const saveUser = async (user) => {
  const { first_name, last_name, email, password } = user;
  try {
    const result = await db.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, password]
    );
    return result.rows[0];
  }
  catch (err) {
    throw err;
  }
}


module.exports = {
  db,
  saveUser,
};
