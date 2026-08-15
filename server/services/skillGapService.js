/**
 * Smart Skill Gap Analyzer Service
 * Evaluates student skill profiles against role requirements and provides
 * precise skill breakdown, match percentages, and prioritized learning roadmaps.
 */

function analyzeSkillGap(studentSkills = [], requiredSkills = []) {
  // Normalize skills for case-insensitive matching
  const cleanStudent = studentSkills.map(s => s.trim().toLowerCase());
  const cleanRequired = requiredSkills.map(s => s.trim());

  const matchingSkills = [];
  const missingSkills = [];

  cleanRequired.forEach(reqSkill => {
    const isMatched = cleanStudent.some(stSkill => stSkill === reqSkill.toLowerCase());
    if (isMatched) {
      matchingSkills.push(reqSkill);
    } else {
      missingSkills.push(reqSkill);
    }
  });

  const totalRequired = cleanRequired.length;
  const matchPercentage = totalRequired > 0 
    ? Math.round((matchingSkills.length / totalRequired) * 100) 
    : 100;

  // Categorize missing skills by learning priority
  // Essential core technologies get HIGH, supporting libraries/tools get MEDIUM/LOW
  const highPriorityKeywords = ['react', 'node.js', 'python', 'java', 'sql', 'javascript', 'typescript', 'express', 'mongodb', 'c++'];
  
  const recommendations = missingSkills.map(skill => {
    const sLower = skill.toLowerCase();
    let priority = 'MEDIUM';
    let estimatedHours = 20;

    if (highPriorityKeywords.some(kw => sLower.includes(kw))) {
      priority = 'HIGH';
      estimatedHours = 40;
    } else if (sLower.includes('git') || sLower.includes('docker') || sLower.includes('css') || sLower.includes('html') || sLower.includes('tail')) {
      priority = 'LOW';
      estimatedHours = 10;
    }

    return {
      skill,
      priority,
      estimatedHours,
      action: `Complete hands-on projects and tutorials focusing on ${skill} core concepts.`
    };
  });

  // Overall readiness feedback
  let readinessLevel = 'Beginning';
  let message = 'Significant skill gap identified. Focus on building foundational prerequisites.';
  if (matchPercentage >= 80) {
    readinessLevel = 'High Readiness';
    message = 'Excellent skill match! You possess almost all key requirements for this position.';
  } else if (matchPercentage >= 50) {
    readinessLevel = 'Moderate Readiness';
    message = 'Good progress! Focus on high-priority missing skills to boost your application success.';
  }

  return {
    matchPercentage,
    matchingSkills,
    missingSkills,
    recommendations,
    readinessLevel,
    message,
    totalRequired: cleanRequired.length,
    matchedCount: matchingSkills.length
  };
}

module.exports = {
  analyzeSkillGap
};
