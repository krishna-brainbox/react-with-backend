const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "Hello"; // Change this to a secure key

app.use(express.json());
app.use(cors()); 

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "", 
  database: "test",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("Connected to MySQL database");
});

// User signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error creating account" });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
});

// User login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }
  
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  });
});

// User account deletion

app.post('/delete-account', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
  }

  // Check if the user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.length === 0) {
          return res.status(404).json({ message: "User not found." });
      }

      const user = result[0];

      // Compare passwords
      bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return res.status(500).json({ error: err });

          if (!isMatch) {
              return res.status(401).json({ message: "Incorrect password." });
          }

          // Move user to backup table
          db.query("INSERT INTO backup_users (email, password) VALUES (?, ?)", [user.email, user.password], (err) => {
              if (err) return res.status(500).json({ error: err });

              // Delete user from main table
              db.query("DELETE FROM users WHERE email = ?", [email], (err) => {
                  if (err) return res.status(500).json({ error: err });

                  res.json({ message: "Account deleted successfully." });
              });
          });
      });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
