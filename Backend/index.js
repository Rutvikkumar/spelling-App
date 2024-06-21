// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const spellingRoutes = require("./routes/spellingRouts");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/spellingsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Use Routes
app.use("/spellings", spellingRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
