const express = require('express');
const router = express.Router();
const {
  saveOpportunity,
  getSavedOpportunities,
  unsaveOpportunity
} = require('../controllers/savedController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, saveOpportunity);
router.get('/', authenticateUser, getSavedOpportunities);
router.delete('/:id', authenticateUser, unsaveOpportunity);

module.exports = router;
