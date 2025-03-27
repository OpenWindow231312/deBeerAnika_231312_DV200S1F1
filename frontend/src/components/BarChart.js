import React from "react";
import { Bar } from "react-chartjs-2";
import "../components/BarChart.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ product }) => {
  if (!product?.nutriments) return null;

  const { nutriments } = product;

  const data = {
    labels: ["Sugar", "Fat", "Salt", "Protein", "Calories"],
    datasets: [
      {
        label: product.product_name,
        data: [
          nutriments.sugars_100g || 0,
          nutriments.fat_100g || 0,
          nutriments.salt_100g || 0,
          nutriments.proteins_100g || 0,
          nutriments["energy-kcal_100g"] || 0,
        ],
        backgroundColor: "#a22",
      },
    ],
  };

  const options = {
    animation: false,
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-body">
        <h4 className="card-title fw-bold text-muted mb-4">
          Nutrition Breakdown
        </h4>
        <div style={{ minHeight: "300px" }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
