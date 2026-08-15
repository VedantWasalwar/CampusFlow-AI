const express = require('express');
const router = express.Router();
const {
  applyForOpportunity,
  getMyApplications,
  getApplicationById
} = require('../controllers/applicationController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, applyForOpportunity);
router.get('/my', authenticateUser, getMyApplications);
router.get('/:id', authenticateUser, getApplicationById);

module.exports = router;
