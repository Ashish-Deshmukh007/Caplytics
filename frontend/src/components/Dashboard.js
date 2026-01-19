import React, { useEffect, useState } from 'react';
import API from '../services/api';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const cardStyle = {
  background: '#ffffff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  flex: 1,
  textAlign: 'center'
};

function Dashboard() {
  const [data, setData] = useState({});
  const [scenario, setScenario] = useState('NORMAL');

  useEffect(() => {
    API.get(`/scenario/${scenario}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [scenario]);

  const skills = Object.values(data);

  const totalDemand = skills.reduce((s, x) => s + (x.demand || 0), 0);
  const totalCapacity = skills.reduce(
    (s, x) => s + (x.adjustedCapacity ?? x.capacity ?? 0),
    0
  );
  const totalGap = skills.reduce((s, x) => s + (x.gap || 0), 0);
  const totalCost = skills.reduce(
    (s, x) => s + (x.adjustedTotalCost ?? x.totalCost ?? 0),
    0
  );

  const chartData = Object.entries(data).map(([skill, d]) => ({
    skill,
    capacity: d.adjustedCapacity ?? d.capacity,
    demand: d.demand,
    cost: d.adjustedTotalCost ?? d.totalCost
  }));

  return (
    <div style={{ background: '#f4f6f8', minHeight: '100vh', padding: '30px' }}>
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>
        <h2 style={{ marginBottom: '10px' }}>
          Technology Capacity & Budget Forecasting
        </h2>
        <p style={{ color: '#555', marginBottom: '25px' }}>
          Executive overview of delivery feasibility and cost impact
        </p>

        {/* Scenario Selector */}
        <div style={{ marginBottom: '30px' }}>
          <label>
            <strong>Scenario:&nbsp;</strong>
            <select
              value={scenario}
              onChange={e => setScenario(e.target.value)}
              style={{ padding: '6px 10px', marginLeft: '10px' }}
            >
              <option value="NORMAL">Normal</option>
              <option value="BEST">Best</option>
              <option value="WORST">Worst</option>
            </select>
          </label>
        </div>

        {/* KPI CARDS */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          <div style={cardStyle}>
            <div style={{ color: '#666' }}>Total Demand</div>
            <h3>{totalDemand.toFixed(2)} PM</h3>
          </div>

          <div style={cardStyle}>
            <div style={{ color: '#666' }}>Total Capacity</div>
            <h3>{totalCapacity.toFixed(2)} PM</h3>
          </div>

          <div style={cardStyle}>
            <div style={{ color: '#666' }}>Total Gap</div>
            <h3 style={{ color: totalGap > 0 ? '#d97706' : '#15803d' }}>
              {totalGap.toFixed(2)} PM
            </h3>
          </div>

          <div style={cardStyle}>
            <div style={{ color: '#666' }}>Forecast Cost</div>
            <h3>₹{totalCost.toFixed(0)}</h3>
          </div>
        </div>

        {/* CHARTS */}
        <div style={cardStyle}>
          <h3>Capacity vs Demand</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="capacity" />
              <Bar dataKey="demand" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ height: '30px' }} />

        <div style={cardStyle}>
          <h3>Cost by Skill</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TABLE */}
        <div style={{ ...cardStyle, marginTop: '40px' }}>
          <h3>Detailed Breakdown</h3>
          <table width="100%" cellPadding="10">
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th align="left">Skill</th>
                <th>Capacity</th>
                <th>Demand</th>
                <th>Gap</th>
                <th>Risk</th>
                <th>Decision</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([skill, d]) => (
                <tr key={skill} style={{ borderBottom: '1px solid #eee' }}>
                  <td>{skill}</td>
                  <td align="center">{(d.adjustedCapacity ?? d.capacity).toFixed(2)}</td>
                  <td align="center">{d.demand.toFixed(2)}</td>
                  <td align="center">{d.gap.toFixed(2)}</td>
                  <td align="center">{d.risk}</td>
                  <td align="center">{d.decision}</td>
                  <td align="center">
                    ₹{(d.adjustedTotalCost ?? d.totalCost).toFixed(0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
