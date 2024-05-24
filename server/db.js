require("dotenv").config(); //run npm install dotenv

const { Pool } = require("pg"); //run npm install pg

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});



db.query("SELECT * FROM programs", (err, res) => {
  console.log(err ? err.message : res.rows);
});

db.query("SELECT current_database()", (err, res) => {
  if (err) {
    console.error("Error executing query:", err.message);
  } else {
    console.log("Connected to database:", res.rows[0].current_database);
  }
});
module.exports = {
  db
};
