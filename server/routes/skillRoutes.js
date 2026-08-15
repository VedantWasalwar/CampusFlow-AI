const express = require('express');
const router = express.Router();
const { analyzeSkills } = require('../controllers/skillController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/analyze', authenticateUser, analyzeSkills);

module.exports = router;
