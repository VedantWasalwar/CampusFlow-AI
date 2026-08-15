const express = require('express');
const router = express.Router();
const {
  getAdminDashboardStats,
  getUsers,
  toggleUserStatus
} = require('../controllers/adminController');
const {
  getAllApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');
const { authenticateUser, requireAdmin } = require('../middleware/authMiddleware');

router.use(authenticateUser, requireAdmin);

router.get('/dashboard', getAdminDashboardStats);
router.get('/users', getUsers);
router.put('/users/:id/status', toggleUserStatus);
router.get('/applications', getAllApplications);
router.put('/applications/:id/status', updateApplicationStatus);

module.exports = router;
