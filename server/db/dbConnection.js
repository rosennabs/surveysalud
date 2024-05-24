require("dotenv").config(); //run npm install dotenv

const { Pool } = require("pg"); //run npm install pg

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});



module.exports = db;
