const Employee = require('../models/Employee');
const { calculateDecisions } = require('./decision.engine');
const {
  FORECAST_HORIZON_MONTHS,
  VENDOR_COST_MULTIPLIER
} = require('../config/assumptions');

/**
 * Calculates cost impact of hiring/vendor decisions
 */
async function calculateCostForecast() {
  const decisions = await calculateDecisions();
  const employees = await Employee.find();

  const costReport = {};

  Object.entries(decisions).forEach(([skill, data]) => {
    const { decision, gap } = data;

    // Find average cost for this skill
    const skillEmployees = employees.filter(e =>
      e.skills.includes(skill)
    );

    const avgMonthlyCost =
      skillEmployees.reduce((sum, e) => sum + e.monthlyCost, 0) /
      (skillEmployees.length || 1);

    let monthlyCost = 0;

    if (decision === 'HIRE') {
      monthlyCost = gap * avgMonthlyCost;
    } else if (decision === 'VENDOR') {
      monthlyCost = gap * avgMonthlyCost * VENDOR_COST_MULTIPLIER;
    }

    costReport[skill] = {
      ...data,
      decision,
      monthlyCost: Number(monthlyCost.toFixed(2)),
      totalCost: Number((monthlyCost * FORECAST_HORIZON_MONTHS).toFixed(2))
    };
  });

  return costReport;
}

module.exports = {
  calculateCostForecast
};
