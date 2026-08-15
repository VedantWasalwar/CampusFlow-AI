const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadResume,
  getResume,
  deleteResume
} = require('../controllers/profileController');
const { authenticateUser } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', authenticateUser, getProfile);
router.put('/', authenticateUser, updateProfile);

// Resume upload/view/delete
router.post('/resume', authenticateUser, upload.single('resume'), uploadResume);
router.get('/resume', authenticateUser, getResume);
router.delete('/resume', authenticateUser, deleteResume);

module.exports = router;
