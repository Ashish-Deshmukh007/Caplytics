const mongoose = require('mongoose');

const CostConfigSchema = new mongoose.Schema({
  vendorMultiplier: Number,
  hiringCost: Number,
  hiringLeadTimeMonths: Number
});

module.exports = mongoose.model('CostConfig', CostConfigSchema);
