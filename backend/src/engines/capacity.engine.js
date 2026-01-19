const Employee = require('../models/Employee');
const { DEFAULT_UTILIZATION } = require('../config/assumptions');

/**
 * Calculates available capacity per skill (PM/month)
 * @returns {Object} { skillName: capacityPM }
 */
async function calculateCapacityBySkill() {
  const employees = await Employee.find();

  const capacityMap = {};

  employees.forEach(emp => {
    const utilization = emp.utilization || DEFAULT_UTILIZATION;

    emp.skills.forEach(skill => {
      if (!capacityMap[skill]) {
        capacityMap[skill] = 0;
      }

      capacityMap[skill] += utilization;
    });
  });

  return capacityMap;
}

module.exports = {
  calculateCapacityBySkill
};
