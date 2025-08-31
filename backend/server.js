const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, "../src/dummyData.json");

// Helper to read dummy data
function getDummyData() {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

// GET all users
app.get("/api/users", (req, res) => {
  const data = getDummyData();
  res.json(data.users);
});

// GET all tickets
app.get("/api/tickets", (req, res) => {
  const data = getDummyData();
  res.json(data.tickets);
});

// POST new ticket (in-memory only)
app.post("/api/tickets", (req, res) => {
  const data = getDummyData();
  const newTicket = req.body;
  data.tickets.push(newTicket);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.status(201).json(newTicket);
});

// POST new user (in-memory only)
app.post("/api/users", (req, res) => {
  const data = getDummyData();
  const newUser = req.body;
  data.users.push(newUser);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.status(201).json(newUser);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
