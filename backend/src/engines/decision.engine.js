const { calculateGapBySkill } = require('./gap.engine');
const {
  HIRING_LEAD_TIME_MONTHS,
  FORECAST_HORIZON_MONTHS,
  VENDOR_COST_MULTIPLIER
} = require('../config/assumptions');

/**
 * Returns hiring/vendor decisions per skill
 */
async function calculateDecisions() {
  const gapReport = await calculateGapBySkill();

  const decisions = {};

  Object.entries(gapReport).forEach(([skill, data]) => {
    const { gap } = data;

    let decision = 'NO_ACTION';
    let rationale = 'Sufficient capacity';

    if (gap > 0 && gap < 0.25) {
      decision = 'ABSORB';
      rationale = 'Minor gap, manageable internally';
    } else if (gap > 0 && FORECAST_HORIZON_MONTHS < HIRING_LEAD_TIME_MONTHS) {
      decision = 'VENDOR';
      rationale = 'Short-term demand, hiring not viable';
    } else if (gap > 0 && FORECAST_HORIZON_MONTHS >= HIRING_LEAD_TIME_MONTHS) {
      decision = 'HIRE';
      rationale = 'Sustained demand justifies hiring';
    }

    decisions[skill] = {
      ...data,
      decision,
      rationale
    };
  });

  return decisions;
}

module.exports = {
  calculateDecisions
};
