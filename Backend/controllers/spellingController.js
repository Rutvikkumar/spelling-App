const Spelling = require("../models/spellingModel");

exports.createSpelling = async (req, res) => {
  const { word, meaning } = req.body;

  // Trim and normalize the word
  const normalizedWord = word.trim().toLowerCase();

  try {
    // Check if the spelling already exists
    const existingSpelling = await Spelling.findOne({ word: normalizedWord });
    if (existingSpelling) {
      return res.status(400).json({ message: 'Spelling already exists' });
    }

    // Create new spelling
    const newSpelling = new Spelling({ word: normalizedWord, meaning });
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
    if (!word) {
      return res
        .status(400)
        .json({ message: "Word query parameter is required" });
    }
    // Find spellings that match the regex
    const spellings = await Spelling.find({
      word: new RegExp(`^${word}$`, "i"),
    });
    // Log the found spellings
    if (spellings.length === 0) {
      return res.status(404).json({ message: "Spellingsssss not found" });
    }
    res.json(spellings);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
//! update spelling
exports.updateSpelling = async (req, res) => {
  const { word } = req.params;
  const { meaning } = req.body;
  try {
    const spelling = await Spelling.findOneAndUpdate(
      { word },
      { word, meaning }, 
      { new: true, runValidators: true }
    );
    if (!spelling)
      return res.status(404).json({ message: "Spelling not found" });
    res.json(spelling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSpelling = async (req, res) => {
  try {
    const spelling = await Spelling.findOneAndDelete({ word: req.params.word });
    if (!spelling)
      return res.status(404).json({ message: "Spelling not found" });
    res.json({ message: "Spelling deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

