const { calculateCapacityBySkill } = require('./capacity.engine');
const { calculateDemandBySkill } = require('./demand.engine');

/**
 * Compares demand vs capacity and returns gap analysis per skill
 */
async function calculateGapBySkill() {
  const capacity = await calculateCapacityBySkill();
  const demand = await calculateDemandBySkill();

  const gapReport = {};

  const allSkills = new Set([
    ...Object.keys(capacity),
    ...Object.keys(demand)
  ]);

  allSkills.forEach(skill => {
    const cap = capacity[skill] || 0;
    const dem = demand[skill] || 0;
    const gap = dem - cap;

    let risk = 'OK';
    if (gap > 0 && gap <= 0.5) risk = 'LOW';
    else if (gap > 0.5 && gap <= 1) risk = 'MEDIUM';
    else if (gap > 1) risk = 'HIGH';

    gapReport[skill] = {
      demand: Number(dem.toFixed(2)),
      capacity: Number(cap.toFixed(2)),
      gap: Number(gap.toFixed(2)),
      risk
    };
  });

  return gapReport;
}

module.exports = {
  calculateGapBySkill
};
