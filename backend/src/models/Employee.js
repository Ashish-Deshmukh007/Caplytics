const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  monthlyCost: Number,
  utilization: {
    type: Number,
    default: 0.8
  },
  skills: [String]
});

module.exports = mongoose.model('Employee', EmployeeSchema);
