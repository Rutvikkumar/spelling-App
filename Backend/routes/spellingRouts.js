// routes/spellingRoutes.js
const express = require('express');
const router = express.Router();
const spellingController = require('../controllers/spellingController');

router.post('/', spellingController.createSpelling);
router.get('/', spellingController.getAllSpellings);
router.get('/search', spellingController.getSpelling);
router.put('/:id', spellingController.updateSpelling);
router.delete('/:id', spellingController.deleteSpelling);

module.exports = router;
