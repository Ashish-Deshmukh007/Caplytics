const express = require('express');
const cors = require('cors');
const forecastRoutes = require('./routes/forecast.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/api/forecast', forecastRoutes);

module.exports = app;
