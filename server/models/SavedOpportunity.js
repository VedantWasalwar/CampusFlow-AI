const mongoose = require('mongoose');

const savedOpportunitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate saves
savedOpportunitySchema.index({ userId: 1, opportunityId: 1 }, { unique: true });

module.exports = mongoose.model('SavedOpportunity', savedOpportunitySchema);
