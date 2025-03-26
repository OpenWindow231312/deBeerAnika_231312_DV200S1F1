import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChartCompare = ({ product1, product2 }) => {
  if (!product1?.nutriments || !product2?.nutriments) return null;

  const getData = (p) => [
    p.nova_group || 0,
    p.additives_n || 0,
    p.nutriments["saturated-fat_100g"] || 0,
    p.nutriments.salt_100g || 0,
  ];

  const data = {
    labels: ["Nova Score", "Additives", "Saturated Fat", "Salt"],
    datasets: [
      {
        label: product1.product_name,
        data: getData(product1),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#36a2eb",
        borderWidth: 2,
      },
      {
        label: product2.product_name,
        data: getData(product2),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "#ff6384",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    animation: false,
    responsive: true,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-body">
        <h4 className="card-title fw-bold text-muted mb-4">
          🧭 Additive & Nutrition Profile
        </h4>
        <div style={{ minHeight: "300px" }}>
          <Radar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RadarChartCompare;
