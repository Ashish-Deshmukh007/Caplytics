const mongoose = require('mongoose');

const ScenarioSchema = new mongoose.Schema({
  name: String,
  attritionRate: Number,
  delayFactor: Number,
  costInflation: Number
});

module.exports = mongoose.model('Scenario', ScenarioSchema);
