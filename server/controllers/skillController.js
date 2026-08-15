const Opportunity = require('../models/Opportunity');
const { analyzeSkillGap } = require('../services/skillGapService');

// @desc    Analyze student skill gap against opportunity requirement
// @route   POST /api/skills/analyze
// @access  Private
const analyzeSkills = async (req, res) => {
  try {
    const { opportunityId, customRequiredSkills, customStudentSkills } = req.body;
    const student = req.user;

    let targetSkills = customRequiredSkills || [];

    if (opportunityId) {
      const opportunity = await Opportunity.findById(opportunityId);
      if (opportunity) {
        targetSkills = opportunity.requiredSkills;
      }
    }

    const studentSkills = customStudentSkills || student.skills || [];

    const analysisResult = analyzeSkillGap(studentSkills, targetSkills);

    res.json({
      success: true,
      data: {
        analysis: analysisResult,
        studentSkills,
        targetSkills
      }
    });
  } catch (error) {
    console.error('Skill Gap Analysis Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error executing skill gap analysis.'
    });
  }
};

module.exports = {
  analyzeSkills
};
