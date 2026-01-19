const mongoose = require('mongoose');

const SkillDemandSchema = new mongoose.Schema({
  skill: String,
  pmPerMonth: Number
});

const ProjectDemandSchema = new mongoose.Schema({
  projectName: String,
  startMonth: Number, // 1 = current month
  endMonth: Number,
  skillDemand: [SkillDemandSchema]
});

module.exports = mongoose.model('ProjectDemand', ProjectDemandSchema);
