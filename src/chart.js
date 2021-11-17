import React, { Component } from "react";
import Chart from "chart.js/auto";

import { calcCompBands } from "./utils";

export default class LineChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const data = calcCompBands();
    console.log(data);
    const ctx = this.chartRef.current.getContext("2d");

    new Chart(ctx, {
      data: {
        datasets: [
          {
            type: "bar",
            data: data,
            label: "Salary"
          }
        ]
      },
      options: {
        parsing: {
          xAxisKey: "level",
          yAxisKey: "range"
        }
      }
    });
  }
  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
