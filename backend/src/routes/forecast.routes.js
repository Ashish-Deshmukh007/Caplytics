const express = require('express');
const router = express.Router();

const { calculateCapacityBySkill } = require('../engines/capacity.engine');
const { calculateDemandBySkill } = require('../engines/demand.engine');
const { calculateGapBySkill } = require('../engines/gap.engine');
const { calculateDecisions } = require('../engines/decision.engine');
const { calculateCostForecast } = require('../engines/cost.engine');
const { simulateScenario } = require('../engines/scenario.engine');

router.get('/scenario/:type', async (req, res) => {
  try {
    res.json(await simulateScenario(req.params.type.toUpperCase()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/capacity', async (req, res) => {
  try {
    res.json(await calculateCapacityBySkill());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/demand', async (req, res) => {
  try {
    res.json(await calculateDemandBySkill());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/gap', async (req, res) => {
  try {
    res.json(await calculateGapBySkill());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/decision', async (req, res) => {
  try {
    res.json(await calculateDecisions());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/cost', async (req, res) => {
  try {
    res.json(await calculateCostForecast());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
