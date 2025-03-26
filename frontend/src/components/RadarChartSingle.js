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

const RadarChartSingle = ({ product }) => {
  if (!product?.nutriments) return null;

  const nova = product.nova_group || 0;
  const additives = product.additives_n || 0;
  const saturatedFat = product.nutriments["saturated-fat_100g"] || 0;
  const salt = product.nutriments.salt_100g || 0;

  const data = {
    labels: ["Nova Score", "Additives", "Saturated Fat", "Salt"],
    datasets: [
      {
        label: product.product_name,
        data: [nova, additives, saturatedFat, salt],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#36a2eb",
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

export default RadarChartSingle;
