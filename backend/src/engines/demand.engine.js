const ProjectDemand = require('../models/ProjectDemand');
const { FORECAST_HORIZON_MONTHS } = require('../config/assumptions');

/**
 * Calculates total demand per skill (PM/month)
 * across all active projects
 */
async function calculateDemandBySkill() {
  const projects = await ProjectDemand.find();

  const demandMap = {};

  projects.forEach(project => {
    const { startMonth, endMonth, skillDemand } = project;

    // Check if project is within forecast window
    if (startMonth > FORECAST_HORIZON_MONTHS) return;

    skillDemand.forEach(sd => {
      if (!demandMap[sd.skill]) {
        demandMap[sd.skill] = 0;
      }

      demandMap[sd.skill] += sd.pmPerMonth;
    });
  });

  return demandMap;
}

module.exports = {
  calculateDemandBySkill
};
