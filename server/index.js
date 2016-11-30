import express from 'express';
import {
  simulateRandomProcess,
  simulateEquilibriumMarket,
  simulateTradeDeficitMarket,
  simulateOverstockMarket
 } from './api';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/api/equilibrium', (req, res) => {
  const equilibriumMarket = simulateEquilibriumMarket();

  res.status(200).json({
    Q_t: equilibriumMarket.Q_t,
    P_t: equilibriumMarket.P_t,
  });
})

app.get('/api/deficit', (req, res) => {
  const deficitMarket = simulateTradeDeficitMarket();
  res.status(200).json({
    Q_t: deficitMarket.Q_t,
    P_t: deficitMarket.P_t
  })
})

app.get('/api/overstock', (req, res) => {
  const overstockMarket = simulateOverstockMarket();
  res.status(200).json({
    Q_t: overstockMarket.Q_t,
    P_t: overstockMarket.P_t,
  })
})


app.listen(8080, () => {
  console.log('Server is available on http://localhost:8080');
})
