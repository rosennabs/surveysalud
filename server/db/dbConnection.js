const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); //point to the env file 
const { Pool } = require("pg"); //run npm install pg


// Determine environment
const isDevelopment = process.env.NODE_ENV === "development";

// Setup the database connection for local development or production (Supabase)
const db = new Pool(
  isDevelopment
    ? {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      }
    : {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false, // Required for Supabase
        },
      }
);

module.exports = db;
