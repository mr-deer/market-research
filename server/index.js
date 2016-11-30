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

app.get('/equilibrium', (req, res) => {
  const equilibriumMarket = simulateEquilibriumMarket();
  equilibriumMarket.P_t = equilibriumMarket.P_t.map(number => String(number).replace('.', ','));
  equilibriumMarket.Q_t = equilibriumMarket.Q_t.map(number => String(number).replace('.', ','))
  res.render('result', {
    Q_t: equilibriumMarket.Q_t,
    q_length: equilibriumMarket.Q_t.length,
    P_t: equilibriumMarket.P_t,
    p_length: equilibriumMarket.P_t.length
  })
})

app.get('/deficit', (req, res) => {
  const deficitMarket = simulateTradeDeficitMarket();
  deficitMarket.P_t = deficitMarket.P_t.map(number => String(number).replace('.', ','));
  deficitMarket.Q_t = deficitMarket.Q_t.map(number => String(number).replace('.', ','))
  res.render('result', {
    Q_t: deficitMarket.Q_t,
    q_length: deficitMarket.Q_t.length,
    P_t: deficitMarket.P_t,
    p_length: deficitMarket.P_t.length
  })
})

app.get('/overstock', (req, res) => {
  const overstockMarket = simulateOverstockMarket();
  overstockMarket.P_t = overstockMarket.P_t.map(number => String(number).replace('.', ','));
  overstockMarket.Q_t = overstockMarket.Q_t.map(number => String(number).replace('.', ','))
  res.render('result', {
    Q_t: overstockMarket.Q_t,
    q_length: overstockMarket.Q_t.length,
    P_t: overstockMarket.P_t,
    p_length: overstockMarket.P_t.length
  })
})


app.listen(8080, () => {
  console.log('Server is available on http://localhost:8080');
})
