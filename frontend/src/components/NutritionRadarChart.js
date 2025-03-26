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

const NutritionRadarChart = ({ product1, product2 }) => {
  const getData = (p) => [
    p.nutriments.sugars_100g || 0,
    p.nutriments.fat_100g || 0,
    p.nutriments.salt_100g || 0,
    p.nutriments.proteins_100g || 0,
    p.nutriments["energy-kcal_100g"] || 0,
  ];

  const data = {
    labels: ["Sugar", "Fat", "Salt", "Protein", "Calories"],
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
        suggestedMax: 100,
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default NutritionRadarChart;
