const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change as per your MySQL user
  password: "", // Add password if set
  database: "test",
});

db.connect(function (err) {
  if (err) {
    console.error("Connection failed: " + err.message);
    return;
  }
  console.log("Connected to MySQL!");

  // Create table with only email and password
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

  db.query(sql, function (err, result) {
    if (err) {
      console.error("Error creating table: " + err.message);
      return;
    }
    console.log("Table 'users' is ready!");
  });
});

module.exports = db;
