// routes/spellingRoutes.js
const express = require('express');
const router = express.Router();
const spellingController = require('../controllers/spellingController');

router.post('/', spellingController.createSpelling);
router.get('/', spellingController.getAllSpellings);
router.get('/search', spellingController.getSpelling);
router.put('/update/:word', spellingController.updateSpelling);

router.delete('/:word', spellingController.deleteSpelling);

module.exports = router;
