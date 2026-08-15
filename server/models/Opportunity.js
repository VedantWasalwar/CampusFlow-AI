const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      default: 'Remote'
    },
    workMode: {
      type: String,
      enum: ['Remote', 'On-site', 'Hybrid'],
      default: 'Remote'
    },
    stipend: {
      type: String,
      default: 'Competitive'
    },
    salary: {
      type: String,
      default: ''
    },
    requiredSkills: {
      type: [String],
      required: true,
      default: []
    },
    eligibility: {
      type: String,
      default: 'All Engineering & Technology Branches'
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Opportunity', opportunitySchema);
