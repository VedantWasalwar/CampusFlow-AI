const User = require('../models/User');
const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');

// @desc    Get admin dashboard overall statistics & chart analytics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getAdminDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalOpportunities = await Opportunity.countDocuments();
    const totalApplications = await Application.countDocuments();
    
    const selectedStudents = await Application.countDocuments({ status: 'Selected' });
    const activeApplications = await Application.countDocuments({
      status: { $in: ['Applied', 'Assessment', 'Interview'] }
    });

    // Breakdown of applications by status
    const statusCounts = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const applicationsByStatus = [
      { name: 'Applied', value: 0 },
      { name: 'Assessment', value: 0 },
      { name: 'Interview', value: 0 },
      { name: 'Selected', value: 0 },
      { name: 'Rejected', value: 0 }
    ];

    statusCounts.forEach(item => {
      const found = applicationsByStatus.find(s => s.name === item._id);
      if (found) found.value = item.count;
    });

    // Work Mode distribution
    const workModeCounts = await Opportunity.aggregate([
      { $group: { _id: '$workMode', count: { $sum: 1 } } }
    ]);

    const opportunitiesByWorkMode = workModeCounts.map(item => ({
      name: item._id || 'Remote',
      value: item.count
    }));

    // Selection rate calculation
    const selectionRate = totalApplications > 0
      ? Math.round((selectedStudents / totalApplications) * 100)
      : 0;

    res.json({
      success: true,
      data: {
        stats: {
          totalStudents,
          totalOpportunities,
          totalApplications,
          selectedStudents,
          activeApplications,
          selectionRate
        },
        charts: {
          applicationsByStatus,
          opportunitiesByWorkMode
        }
      }
    });
  } catch (error) {
    console.error('Admin Dashboard Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate admin statistics.'
    });
  }
};

// @desc    Get user list for admin management
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { users }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve student directory.'
    });
  }
};

// @desc    Toggle student active/inactive status
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Student account not found.'
      });
    }

    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Administrator account status cannot be altered here.'
      });
    }

    const { isActive } = req.body;
    user.isActive = typeof isActive === 'boolean' ? isActive : !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: `Account status updated to ${user.isActive ? 'Active' : 'Inactive'}.`,
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update account status.'
    });
  }
};

module.exports = {
  getAdminDashboardStats,
  getUsers,
  toggleUserStatus
};
