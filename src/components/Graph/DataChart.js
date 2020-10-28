import React from "react";
import { Line } from "react-chartjs-2";

const DataChart = (props) => {
  return (
    <div className="chart">
      <br />
      <h3>Biểu Đồ Báo Cáo:</h3>
      <Line
        data={props.sort}
        options={{
          title: {
            display: true,
            fontSize: 25,
          },
          legend: {
            display: true,
            position: "bottom",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  max: props.maxCount + 500,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default DataChart;
