import express from 'express';
import bodyParser from 'body-parser';
import {
  simulateRandomProcess,
  simulateEquilibriumMarket,
  simulateTradeDeficitMarket,
  simulateOverstockMarket
 } from './api';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/api/equilibrium', (req, res) => {
  const { R, Q_m, a, T, P_0, P_1, P_2, Q_0, tau } = req.body;
  const equilibriumMarket = simulateEquilibriumMarket(R, Q_m, a, T, P_0, P_1, P_2, Q_0, tau);

  res.status(200).json({
    Q_t: equilibriumMarket.Q_t,
    P_t: equilibriumMarket.P_t,
  });
})

app.post('/api/deficit', (req, res) => {
  const { R, Q_m, a, T, P_0, P_1, P_2, Q_0, tau } = req.body;
  const deficitMarket = simulateTradeDeficitMarket(R, Q_m, a, T, P_0, P_1, P_2, Q_0, tau);

  res.status(200).json({
    Q_t: deficitMarket.Q_t,
    P_t: deficitMarket.P_t
  })
})

app.post('/api/overstock', (req, res) => {
  const { R, Q_m, a, T, P_0, P_1, P_2, Q_0, tau } = req.body;
  const overstockMarket = simulateOverstockMarket(R, Q_m, a, T, P_0, P_1, P_2, Q_0, tau);
  res.status(200).json({
    Q_t: overstockMarket.Q_t,
    P_t: overstockMarket.P_t
  })
})


app.listen(8080, () => {
  console.log('Server is available on http://localhost:8080');
})
