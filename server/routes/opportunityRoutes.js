const express = require('express');
const router = express.Router();
const {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
} = require('../controllers/opportunityController');
const { authenticateUser, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', getOpportunities);
router.get('/:id', getOpportunityById);
router.post('/', authenticateUser, requireAdmin, createOpportunity);
router.put('/:id', authenticateUser, requireAdmin, updateOpportunity);
router.delete('/:id', authenticateUser, requireAdmin, deleteOpportunity);

module.exports = router;
