const simulatePseudoProcess = (T) => {
  let pseudoProcess = [];
  for(let i = 0; i < T; i++) {
    pseudoProcess.push(Math.random());
  }
  return pseudoProcess;
}

const arrayShift = (arr, N) => {
  for(let i = 0; i < N; i++) {
    arr.unshift(0);
    arr.pop();
  }
}

export const simulateTradeDeficitMarket = (R, Q_m, a, T, P_0, P_1, P_2, Q_0, tau) => {
  let P_min = [];
  let P_max = [];
  let P_t = [];
  let Q_t = [];
  for(let i = 0; i < P_0.length; i++) {
    P_min[i] = P_1[i] + P_2[i];
    P_max[i] = Q_m[i] / a;
  }

  let tempP_t, tempQ_t, tempP1_t;
  let randomProcess = []

  for(let i = 0; i < P_0.length; i++) {
    P_t[i] = [];
    Q_t[i] = [];
    randomProcess[i] = simulatePseudoProcess(T);

    for(let t = 1; t < T; t++) {
      P_t[i][0] = P_0[i];
      Q_t[i][0] = 0;
      tempQ_t = (R * (Q_m[i] + randomProcess[i][t] - a * P_t[i][t - 1])) / (a + R);

      if(tempQ_t < 0 ) {
        tempQ_t = 0;
      }
      tempP_t = P_t[i][t - 1] + tempQ_t / R;
      Q_t[i][t] = tempQ_t;
      P_t[i][t] = tempP_t;
    }
    arrayShift(Q_t[i], tau);
  }

  return { Q_t: Q_t, P_t: P_t};
}

export const simulateOverstockMarket = (R, Q_m, a, T, P_0, P_1, P_2, Q_0, tau) => {
  let P_min = [];
  let P_max = [];
  let P_t = [];
  let Q_t = [];
  for(let i = 0; i < P_0.length; i++) {
    P_min[i] = P_1[i] + P_2[i];
    P_max[i] = Q_m[i] / a;
  }

  let tempP_t, tempQ_t, tempP1_t;
  let randomProcess = [];

  for(let i = 0; i < P_0.length; i++) {
    P_t[i] = [];
    Q_t[i] = [];
    randomProcess[i] = simulatePseudoProcess(T);

    for(let t = 1; t < T; t++) {
      P_t[i][0] = P_0[i];
      Q_t[i][0] = 0;
      tempQ_t = (R * (Q_m[i] + randomProcess[i][t] - (a * P_t[i][t - 1])) + a * Q_m[i] + randomProcess[i][t]) / (2 * a + R);
      tempP_t = (Q_m[i] + randomProcess[i][t] + (R * P_t[i][t - 1])) / (2 * a + R);
      Q_t[i][t] = tempQ_t;
      P_t[i][t] = tempP_t;
    }
    arrayShift(Q_t[i], tau);
  }
  return { Q_t: Q_t, P_t: P_t};
}

export const simulateEquilibriumMarket = (R, Q_m, a, T, P_0, P_1, P_2, Q_0, tau) => {
  let P_min = [];
  let P_max = [];
  let P_t = [];
  let Q_t = [];
  for(let i = 0; i < P_0.length; i++) {
    P_min[i] = P_1[i] + P_2[i];
    P_max[i] = Q_m[i] / a;
  }

  let tempP_t, tempQ_t, tempP1_t;
  let randomProcess = [];

  for(let i = 0; i < P_0.length; i++) {
    P_t[i] = [];
    Q_t[i] = [];
    randomProcess[i] = simulatePseudoProcess(T);

    for(let t = 1; t < T; t++) {
      P_t[i][0] = P_0[i];
      Q_t[i][0] = 0;
      tempQ_t = (R * (Q_m[i] + randomProcess[i][t] - a * P_t[i][t - 1] ) + a * (Q_m[i] + randomProcess[i][t] - a * P_1[i])) / (2 * a + R);
      tempP_t = (Q_m[i] + randomProcess[i][t] - tempQ_t) / a;
      Q_t[i][t] = tempQ_t;
      P_t[i][t] = tempP_t;
    }
    arrayShift(Q_t[i], tau);
  }

  return { Q_t: Q_t, P_t: P_t};
}
