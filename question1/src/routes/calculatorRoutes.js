const express = require('express');
const calculatorController = require('../controllers/calculatorController');

const router = express.Router();

router.post('/average', calculatorController.calculateAverage);

module.exports = router;
