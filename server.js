const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// User model
const User = require("./models/User");

// Home route
app.get("/", (req, res) => {
  res.render("form");
});

// Form submit route
app.post("/submit", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const newUser = new User({
      name,
      email,
      phone,
    });

    await newUser.save();

    res.send("Data saved successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});