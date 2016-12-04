import React from 'react';
import { Line } from 'react-chartjs';

export default class Equilibrium extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Qt: [],
      Pt: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/equilibrium', {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: `R=${50}&Q_m=${4}&a=${0.4}&T=${600}&P_0=${7}&P_1=${3}&P_2=${0.1}&Q_0=${0}&tau=${10}`
    })
      .then(response => response.ok ? response.json() : console.error('Error while fetching equilibrium'))
      .then(equilibrium => this.setState({ Qt: equilibrium.Q_t, Pt: equilibrium.P_t }));
  }

  render() {
    const dataQt= {
      labels: ['1'],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(0,0,0,0)",
          strokeColor: "rgba(75,192,192,1)",
          pointColor: "rgba(75,192,192,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: this.state.Qt
        },
      ],
    }

    const dataPt= {
      labels: ['1'],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(0,0,0,0)",
          strokeColor: "rgba(75,192,192,1)",
          pointColor: "rgba(75,192,192,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: this.state.Pt
        },
      ],
    }

    const options = {
      pointDot: false,
    }

    return (
      <div>
        <div>Qt:</div>
        <div>
          <Line data={dataQt} options={options} width="1200" height="350" />
        </div>
        <div>Pt:</div>
        <div>
          <Line data={dataPt} options={options} width="1200" height="350" />
        </div>
      </div>
    )
  }
}
