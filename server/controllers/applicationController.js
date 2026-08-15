const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const Notification = require('../models/Notification');

// @desc    Apply for an opportunity
// @route   POST /api/applications
// @access  Private/Student
const applyForOpportunity = async (req, res) => {
  try {
    const { opportunityId, notes } = req.body;
    const userId = req.user._id;

    if (!opportunityId) {
      return res.status(400).json({
        success: false,
        message: 'Opportunity ID is required.'
      });
    }

    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Target opportunity does not exist or has been removed.'
      });
    }

    // Duplicate Application Check
    const existingApp = await Application.findOne({ userId, opportunityId });
    if (existingApp) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted an application for this opportunity.'
      });
    }

    const application = await Application.create({
      userId,
      opportunityId,
      status: 'Applied',
      notes: notes || '',
      timeline: [
        {
          status: 'Applied',
          date: new Date(),
          note: 'Application submitted successfully.'
        }
      ]
    });

    // Create Notification
    await Notification.create({
      userId,
      title: 'Application Submitted',
      message: `Your application for ${opportunity.role} at ${opportunity.company} has been received.`,
      type: 'application'
    });

    const populatedApp = await Application.findById(application._id).populate('opportunityId');

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: { application: populatedApp }
    });
  } catch (error) {
    console.error('Apply Opportunity Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application.'
    });
  }
};

// @desc    Get logged in student's applications
// @route   GET /api/applications/my
// @access  Private/Student
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id })
      .populate('opportunityId')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { applications }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to retrieve your applications.'
    });
  }
};

// @desc    Get application by ID
// @route   GET /api/applications/:id
// @access  Private
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('opportunityId')
      .populate('userId', 'name email college branch graduationYear');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application record not found.'
      });
    }

    // Ensure access control (must be application owner or admin)
    if (
      application.userId._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to application.'
      });
    }

    res.json({
      success: true,
      data: { application }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error loading application details.'
    });
  }
};

// @desc    Get all applications (Admin)
// @route   GET /api/admin/applications
// @access  Private/Admin
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('userId', 'name email college degree branch graduationYear skills resume')
      .populate('opportunityId')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { applications }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application records.'
    });
  }
};

// @desc    Update application status (Admin)
// @route   PUT /api/admin/applications/:id/status
// @access  Private/Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const validStatuses = ['Applied', 'Assessment', 'Interview', 'Selected', 'Rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const application = await Application.findById(req.params.id)
      .populate('opportunityId');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found.'
      });
    }

    application.status = status;
    application.timeline.push({
      status,
      date: new Date(),
      note: note || `Status updated to ${status}`
    });

    await application.save();

    // Create student notification
    await Notification.create({
      userId: application.userId,
      title: 'Application Status Updated',
      message: `Your application for ${application.opportunityId.role} at ${application.opportunityId.company} was updated to ${status}.`,
      type: 'application'
    });

    res.json({
      success: true,
      message: `Application status updated to ${status}`,
      data: { application }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update application status.'
    });
  }
};

module.exports = {
  applyForOpportunity,
  getMyApplications,
  getApplicationById,
  getAllApplications,
  updateApplicationStatus
};
