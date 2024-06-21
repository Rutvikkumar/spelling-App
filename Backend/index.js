// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const spellingRoutes = require("./routes/spellingRouts");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 3000;
const uri = process.env.MONGODBURL;

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(cors());

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Use Routes
app.use("/spellings", spellingRoutes);

app.listen(port, () => {
  console.log("Server is running on port 7000");
});
