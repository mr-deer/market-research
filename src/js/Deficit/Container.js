import React from 'react';
import { Line } from 'react-chartjs';

export default class Deficit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Qt: [],
      Pt: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/deficit')
      .then(response => response.ok ? response.json() : console.error('Error while fetching deficit'))
      .then(deficit => this.setState({ Qt: deficit.Q_t, Pt: deficit.P_t }));
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
