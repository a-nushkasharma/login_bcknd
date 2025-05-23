// models/Survey.js
const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Others'] },
  age: { type: Number },
  address: { type: String },
  state: { type: String, required: true },
  hasChildren: { type: String, enum: ['yes', 'no'], required: true },
  childrenCount: { type: Number },
  childrenAge: { type: Number },

  // New Fields
  kidsUseTech: { type: String, enum: ['yes', 'no'] },
  screenTime: { type: Number }, // average screen time in hours
  kidsUseTechPurposes: [{ type: String }],
  devicesUsed: [String],
  otherDevice: { type: String },
  otherPurpose: { type: String },

  troubledByUsage: { type: String, enum: ['yes', 'no'] },

  techServiceUsage: { type: String },
  techService: { type: String },
  serviceLack: { type: String },
  palanamExpectation: { type: String },
  expectedServices: { type: String },

  troubledByOwnUsage: { type: String },
  issuesFaced: { type: String },
  majorConcerns: [{ type: String }],
  otherConcern: { type: String },

  palanamExpectations: [{ type: String }],
  additionalRequirements: { type: String },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Survey', surveySchema);
