const mongoose = require('mongoose');

const spellingSchema = new mongoose.Schema({
    word: String,
    meaning: String,
});

const Spelling = mongoose.model('Spelling', spellingSchema);

module.exports = Spelling;