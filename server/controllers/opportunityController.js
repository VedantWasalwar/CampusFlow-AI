const mongoose = require('mongoose');
const Opportunity = require('../models/Opportunity');

// @desc    Get all opportunities with search, filter, sort & pagination
// @route   GET /api/opportunities
// @access  Public
const getOpportunities = async (req, res) => {
  try {
    const {
      search,
      workMode,
      location,
      company,
      role,
      skill,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const query = {};

    // Global Search across company, role, location, description, requiredSkills
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { company: searchRegex },
        { role: searchRegex },
        { location: searchRegex },
        { requiredSkills: searchRegex }
      ];
    }

    if (workMode && workMode !== 'All') {
      query.workMode = workMode;
    }

    if (location && location !== 'All') {
      query.location = new RegExp(location, 'i');
    }

    if (company) {
      query.company = new RegExp(company, 'i');
    }

    if (role) {
      query.role = new RegExp(role, 'i');
    }

    if (skill) {
      query.requiredSkills = { $in: [new RegExp(skill, 'i')] };
    }

    // Sort order
    let sortOptions = { createdAt: -1 }; // Default Newest
    if (sort === 'deadline') {
      sortOptions = { deadline: 1 };
    } else if (sort === 'newest') {
      sortOptions = { createdAt: -1 };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Opportunity.countDocuments(query);
    const opportunities = await Opportunity.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      count: opportunities.length,
      opportunities,
      data: {
        opportunities,
        pagination: {
          total,
          page: pageNum,
          pages: Math.ceil(total / limitNum),
          limit: limitNum
        }
      }
    });
  } catch (error) {
    console.error('Get Opportunities Error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch opportunities.'
    });
  }
};

// @desc    Get single opportunity by ID
// @route   GET /api/opportunities/:id
// @access  Public
const getOpportunityById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID before querying MongoDB
    if (!id || id === 'undefined' || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    const opportunity = await Opportunity.findById(id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    res.json({
      success: true,
      opportunity,
      data: { opportunity }
    });
  } catch (error) {
    console.error('Get Opportunity By ID Error:', error);
    res.status(404).json({
      success: false,
      message: 'Opportunity not found'
    });
  }
};

// @desc    Create new opportunity (Admin)
// @route   POST /api/opportunities
// @access  Private/Admin
const createOpportunity = async (req, res) => {
  try {
    const {
      company,
      role,
      description,
      location,
      workMode,
      stipend,
      salary,
      requiredSkills,
      eligibility,
      deadline
    } = req.body;

    if (!company || !role || !description || !deadline) {
      return res.status(400).json({
        success: false,
        message: 'Company, role, description, and deadline are required fields.'
      });
    }

    const opportunity = await Opportunity.create({
      company,
      role,
      description,
      location: location || 'Remote',
      workMode: workMode || 'Remote',
      stipend: stipend || 'Competitive',
      salary: salary || '',
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [],
      eligibility: eligibility || 'All Engineering & Technology Branches',
      deadline: new Date(deadline)
    });

    res.status(201).json({
      success: true,
      message: 'Opportunity created successfully.',
      opportunity,
      data: { opportunity }
    });
  } catch (error) {
    console.error('Create Opportunity Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create opportunity.'
    });
  }
};

// @desc    Update opportunity (Admin)
// @route   PUT /api/opportunities/:id
// @access  Private/Admin
const updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    const opportunity = await Opportunity.findById(id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    const fieldsToUpdate = [
      'company', 'role', 'description', 'location', 'workMode',
      'stipend', 'salary', 'requiredSkills', 'eligibility', 'deadline'
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        opportunity[field] = req.body[field];
      }
    });

    await opportunity.save();

    res.json({
      success: true,
      message: 'Opportunity updated successfully.',
      opportunity,
      data: { opportunity }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update opportunity.'
    });
  }
};

// @desc    Delete opportunity (Admin)
// @route   DELETE /api/opportunities/:id
// @access  Private/Admin
const deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    const opportunity = await Opportunity.findById(id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    await opportunity.deleteOne();

    res.json({
      success: true,
      message: 'Opportunity deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete opportunity.'
    });
  }
};

module.exports = {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
};
