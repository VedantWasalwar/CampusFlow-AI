const SavedOpportunity = require('../models/SavedOpportunity');
const Opportunity = require('../models/Opportunity');

// @desc    Save an opportunity
// @route   POST /api/saved
// @access  Private/Student
const saveOpportunity = async (req, res) => {
  try {
    const { opportunityId } = req.body;
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
        message: 'Opportunity not found.'
      });
    }

    const existingSave = await SavedOpportunity.findOne({ userId, opportunityId });
    if (existingSave) {
      return res.status(400).json({
        success: false,
        message: 'Opportunity is already saved.'
      });
    }

    const saved = await SavedOpportunity.create({ userId, opportunityId });
    const populated = await SavedOpportunity.findById(saved._id).populate('opportunityId');

    res.status(201).json({
      success: true,
      message: 'Opportunity saved successfully.',
      data: { saved: populated }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save opportunity.'
    });
  }
};

// @desc    Get user's saved opportunities
// @route   GET /api/saved
// @access  Private/Student
const getSavedOpportunities = async (req, res) => {
  try {
    const savedItems = await SavedOpportunity.find({ userId: req.user._id })
      .populate('opportunityId')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        saved: savedItems.filter(item => item.opportunityId !== null)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to retrieve saved opportunities.'
    });
  }
};

// @desc    Remove saved opportunity
// @route   DELETE /api/saved/:id
// @access  Private/Student
const unsaveOpportunity = async (req, res) => {
  try {
    const { id } = req.params; // Can be savedId or opportunityId
    const userId = req.user._id;

    // Check if ID matches SavedOpportunity document ID or opportunityId
    let saved = await SavedOpportunity.findOne({
      userId,
      $or: [{ _id: id }, { opportunityId: id }]
    });

    if (!saved) {
      return res.status(404).json({
        success: false,
        message: 'Saved opportunity bookmark not found.'
      });
    }

    await saved.deleteOne();

    res.json({
      success: true,
      message: 'Opportunity removed from saved list.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove saved opportunity.'
    });
  }
};

module.exports = {
  saveOpportunity,
  getSavedOpportunities,
  unsaveOpportunity
};
