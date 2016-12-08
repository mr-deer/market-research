import React from 'react';
import { Line } from 'react-chartjs';

export default class Overstock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Qt: [],
      Pt: [],
      count: 3,
      isGraphs: false,
      R: 50,
      Q_m: [4,5,5],
      a: 0.4,
      T: 200,
      P_0: [7,8,5],
      P_1: [3,3,4],
      P_2: [0.1,0.1,0.2],
      Q_0: [0,0,0],
      tau: 20
    }
  }

  calculate = () => {

    fetch('http://localhost:3000/api/overstock', {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        R: this.state.R,
        Q_m: this.handleArray(this.state.Q_m),
        a: this.state.a,
        T: this.state.T,
        P_0: this.handleArray(this.state.P_0),
        P_1: this.handleArray(this.state.P_1),
        P_2: this.handleArray(this.state.P_2),
        Q_0: this.handleArray(this.state.Q_0),
        tau: this.state.tau
      })
    })
    .then(response => response.ok ? response.json() : console.error('Error while fetching overstock'))
    .then(overstock => this.setState({ Qt: overstock.Q_t, Pt: overstock.P_t }));
    this.setState({ isGraphs: true })
    console.log(this.state);
  }

  handleArray = (arr) => {
    arr = arr.map((item) => parseFloat(item));
    return arr;
  }

  handleValue = (value) => {
    const tempString = value;
    let arr = tempString.split(',');
    arr = arr.map((item) => item.trim());
    return arr;
  }

  onChangeCount = (e) => {
    this.setState({ count: e.target.value })
  }
  onChangeR = (e) => {
    this.setState({ R: e.target.value })
  }
  onChangeA = (e) => {
    this.setState({ A: e.target.value })
  }
  onChangeQ_m = (e) => {
    this.setState({ Q_m: this.handleValue(e.target.value) });
  }
  onChangeT = (e) => {
    this.setState({ T: e.target.value })
  }
  onChangeP_0 = (e) => {
    this.setState({ P_0: this.handleValue(e.target.value) })
  }
  onChangeP_1 = (e) => {
    this.setState({ P_1: this.handleValue(e.target.value) })
  }
  onChangeP_2 = (e) => {
    this.setState({ P_2: this.handleValue(e.target.value) })
  }
  onChangeQ_0 = (e) => {
    this.setState({ Q_0: this.handleValue(e.target.value) })
  }
  onChangeTau = (e) => {
    this.setState({ tau: e.target.value })
  }

  render() {
    const count = this.state.count;
    let datasetsQt = [];
    let datasetsPt = [];
    for(let i = 0; i < count; i++) {
      let color;
      switch(i) {
        case 0:
          color = "red";
          break;
        case 1:
          color = "blue";
          break;
        case 2:
          color = "green";
          break;
        case 3:
          color = "yellow";
          break;
        case 4:
          color = "gray";
          break;
        default:
          color = "black";
          break;
      }

       datasetsQt.push({
         label: `${i + 1}`,
         fillColor: "rgba(0,0,0,0)",
         strokeColor: color,
         data: this.state.Qt[i]
       })
       datasetsPt.push({
         label: `${i + 1}`,
         fillColor: "rgba(0,0,0,0)",
         strokeColor: color,
         data: this.state.Pt[i]
       })
    }

    const dataQt = {
      labels: ['Q_t'],
      datasets: datasetsQt,
    }

    const dataPt = {
      labels : ['P_t'],
      datasets: datasetsPt,
    }

    const options = {
      pointDot: false,
    }

    return (
      <div>
        {
          this.state.isGraphs ?
          <div>
              <Line data={dataQt} options={options} width="1400" height="300" />
              <Line data={dataPt} options={options} width="1400" height="300" />
          </div>
          : null
        }
        <div>
          <div>{this.state.count}</div>
          <div style={styles.labelGroup}>
            <label style={styles.label}>Count:
              <input type="text" name="count" ref="count" value={this.state.count} onChange={this.onChangeCount}/>
            </label>
            <label style={styles.label}>R:
              <input type="text" name="R" ref="R" value={this.state.R} onChange={this.onChangeR}/>
            </label>
            <label style={styles.label}>a:
              <input type="text" name="a" ref="a" value={this.state.a} onChange={this.onChangeA}/>
            </label>
            <label>T:
              <input type="text" name="T" ref="T" value={this.state.T} onChange={this.onChangeT}/>
            </label>
          </div>
          <div style={styles.labelGroup}>
            <label style={styles.label}>Q_m:
              <input type="text" name="Q_m" ref="Q_m" value={this.state.Q_m} onChange={this.onChangeQ_m}/>
            </label>
            <label style={styles.label}>P_0:
              <input type="text" name="P_0" ref="P_0" value={this.state.P_0} onChange={this.onChangeP_0}/>
            </label>
            <label style={styles.label}>P_1:
              <input type="text" name="P_1" ref="P_1" value={this.state.P_1} onChange={this.onChangeP_1}/>
            </label>
          </div>
          <div>
            <label style={styles.label}>P_2:
              <input type="text" name="P_2" ref="P_2" value={this.state.P_2} onChange={this.onChangeP_2}/>
            </label>
            <label style={styles.label}>Q_0:
              <input type="text" name="Q_0" ref="Q_0" value={this.state.Q_0} onChange={this.onChangeQ_0}/>
            </label>
            <label>tau:
              <input type="text" name="tau" ref="tau" value={this.state.tau} onChange={this.onChangeTau}/>
            </label>
          </div>
          <button onClick={this.calculate} style={styles.btn}>Calculate</button>
        </div>
      </div>
    )
  }
}

const styles = {
  label: {
    marginRight: '10px',
  },
  labelGroup: {
    marginBottom: '10px',
  },
  btn: {
    padding: '5px',
    marginTop: '10px',
    fontSize: '18px'
  }
}
