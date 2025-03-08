const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "school_management",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

module.exports = db;
