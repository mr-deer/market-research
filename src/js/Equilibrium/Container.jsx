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
    fetch('http://localhost:3000/api/equilibrium')
      .then(response => response.ok ? response.json() : console.error('Error while fetching equilibrium'))
      .then(equilibrium => this.setState({ Qt: equilibrium.Q_t, Pt: equilibrium.P_t }));
  }

  render() {
    const data = {
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
          data: this.state.Qt,
        },
      ],
    }

    const options = {
      pointDot: false,
    }

    return (
      <div>
        <div>
          Qt:
          <Line data={data} options={options} width="1200" height="600" />
        </div>
        <div>------------------------------------------------------------------------</div>
        <div>
          Pt:
          {this.state.Pt}
        </div>
      </div>
    )
  }
}
