const { calculateCostForecast } = require('./cost.engine');

function applyScenario(baseValue, factor) {
  return baseValue * factor;
}

async function simulateScenario(type = 'NORMAL') {
  const baseReport = await calculateCostForecast();

  let capacityFactor = 1;
  let costFactor = 1;

  if (type === 'BEST') {
    capacityFactor = 1.1;
    costFactor = 0.95;
  }

  if (type === 'WORST') {
    capacityFactor = 0.85;
    costFactor = 1.2;
  }

  const scenarioReport = {};

  Object.entries(baseReport).forEach(([skill, data]) => {
    scenarioReport[skill] = {
      ...data,
      scenario: type,
      adjustedCapacity: Number((data.capacity * capacityFactor).toFixed(2)),
      adjustedMonthlyCost: Number((data.monthlyCost * costFactor).toFixed(2)),
      adjustedTotalCost: Number((data.totalCost * costFactor).toFixed(2))
    };
  });

  return scenarioReport;
}

module.exports = { simulateScenario };
