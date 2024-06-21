const Spelling = require("../models/spellingModel");

// Create a new spelling
exports.createSpelling = async (req, res) => {
  const { word, meaning } = req.body;
  const newSpelling = new Spelling({ word, meaning });
  try {
    await newSpelling.save();
    res.status(201).json(newSpelling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all spellings
exports.getAllSpellings = async (req, res) => {
  try {
    const spellings = await Spelling.find();
    res.json(spellings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific spelling

exports.getSpelling = async (req, res) => {
  try {
    const word = req.query.word;

    // Log the received query parameter
    console.log("Received word:", word);

    if (!word) {
      return res
        .status(400)
        .json({ message: "Word query parameter is required" });
    }

    // Create a case-insensitive regular expression
    const regex = new RegExp(word, "i");
    console.log("Regex:", regex);

    // Find spellings that match the regex

    const spellings = await Spelling.find({
      word: new RegExp(`^${word}$`, "i"),
    });

    // Log the found spellings
    console.log("Found spellings:", spellings);

    if (spellings.length === 0) {
      return res.status(404).json({ message: "Spelling not found" });
    }

    res.json(spellings);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Update a spelling
exports.updateSpelling = async (req, res) => {
  const { word, meaning } = req.body;
  try {
    const spelling = await Spelling.findByIdAndUpdate(
      req.params.id,
      { word, meaning, language },
      { new: true, runValidators: true }
    );
    if (!spelling)
      return res.status(404).json({ message: "Spelling not found" });
    res.json(spelling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a spelling
exports.deleteSpelling = async (req, res) => {
  try {
    const spelling = await Spelling.findByIdAndDelete(req.params.id);
    if (!spelling)
      return res.status(404).json({ message: "Spelling not found" });
    res.json({ message: "Spelling deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
