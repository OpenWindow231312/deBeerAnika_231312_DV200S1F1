import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartCompare = ({ product1, product2 }) => {
  if (!product1?.nutriments || !product2?.nutriments) return null;

  const labels = ["Sugar", "Fat", "Salt", "Protein", "Calories"];

  const getData = (p) => [
    p.nutriments.sugars_100g || 0,
    p.nutriments.fat_100g || 0,
    p.nutriments.salt_100g || 0,
    p.nutriments.proteins_100g || 0,
    p.nutriments["energy-kcal_100g"] || 0,
  ];

  const data = {
    labels,
    datasets: [
      {
        label: product1.product_name,
        data: getData(product1),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: product2.product_name,
        data: getData(product2),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    animation: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChartCompare;
