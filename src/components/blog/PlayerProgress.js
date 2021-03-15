import React from "react";
import { Card, CardBody } from "shards-react";

import Chart from "../../utils/chart";

export default function PlayerProgressChart(props) {
  const canvasRef = React.createRef();

  React.useEffect(() => {
    if (JSON.stringify(props.accuracyData) !== "{}") {
      const chartConfig = {
        type: "pie",
        data: {
          datasets: [
            {
              hoverBorderColor: "#ffffff",
              data: [
                props.accuracyData.correct || 0,
                props.accuracyData.incorrect || 0,
              ],
              backgroundColor: ["rgba(35,136,35,1)", "rgba(210,34,45,1)"],
            },
          ],
          labels: ["Correct", "Incorrect"],
        },
        options: {
          ...{
            legend: {
              position: "bottom",
              labels: {
                padding: 25,
                boxWidth: 20,
              },
            },
            cutoutPercentage: 0,
            tooltips: {
              custom: false,
              mode: "index",
              position: "nearest",
            },
          },
          ...props.chartOptions,
        },
      };
      new Chart(canvasRef.current, chartConfig);
    }
    // eslint-disable-next-line
  }, [props.accuracyData]);

  return (
    <Card small className="h-100">
      <CardBody className="d-flex py-0">
        {JSON.stringify(props.accuracyData) !== "{}" ? (
          <canvas
            height="220"
            ref={canvasRef}
            className="blog-users-by-device m-auto"
          />
        ) : (
          <a>No data to display</a>
        )}
      </CardBody>
    </Card>
  );
}
