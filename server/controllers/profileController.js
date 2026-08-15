const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Get logged in user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile data.'
    });
  }
};

// @desc    Update profile details
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const {
      name,
      phone,
      college,
      degree,
      branch,
      graduationYear,
      skills,
      github,
      linkedin,
      portfolio
    } = req.body;

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (college !== undefined) user.college = college;
    if (degree !== undefined) user.degree = degree;
    if (branch !== undefined) user.branch = branch;
    if (graduationYear !== undefined) user.graduationYear = Number(graduationYear) || null;
    if (skills !== undefined) user.skills = Array.isArray(skills) ? skills : [];
    if (github !== undefined) user.github = github;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (portfolio !== undefined) user.portfolio = portfolio;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: { user }
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile.'
    });
  }
};

// @desc    Upload resume PDF/DOC/DOCX
// @route   POST /api/profile/resume
// @access  Private
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume file (PDF, DOC, or DOCX).'
      });
    }

    const user = await User.findById(req.user._id);

    // Delete old resume file if exists
    if (user.resume && user.resume.filePath) {
      const oldPath = path.join(__dirname, '..', user.resume.filePath);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const relativePath = `/uploads/${req.file.filename}`;

    user.resume = {
      fileName: req.file.originalname,
      filePath: relativePath,
      uploadDate: new Date()
    };

    await user.save();

    res.json({
      success: true,
      message: 'Resume uploaded successfully.',
      data: {
        resume: user.resume
      }
    });
  } catch (error) {
    console.error('Upload Resume Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload resume file.'
    });
  }
};

// @desc    Download / view resume
// @route   GET /api/profile/resume
// @access  Private
const getResume = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.resume || !user.resume.filePath) {
      return res.status(404).json({
        success: false,
        message: 'No resume uploaded yet.'
      });
    }

    const fullPath = path.join(__dirname, '..', user.resume.filePath);
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({
        success: false,
        message: 'Resume file not found on server.'
      });
    }

    res.sendFile(fullPath);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to access resume file.'
    });
  }
};

// @desc    Delete resume file
// @route   DELETE /api/profile/resume
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.resume && user.resume.filePath) {
      const oldPath = path.join(__dirname, '..', user.resume.filePath);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    user.resume = {
      fileName: '',
      filePath: '',
      uploadDate: null
    };

    await user.save();

    res.json({
      success: true,
      message: 'Resume removed successfully.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove resume.'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
  getResume,
  deleteResume
};
