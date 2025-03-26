import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ product }) => {
  if (!product?.nutriments) {
    console.warn("PieChart: Invalid or missing product data.");
    return null;
  }

  const { carbohydrates_100g, fat_100g, proteins_100g } = product.nutriments;

  const data = {
    labels: ["Carbohydrates", "Fat", "Protein"],
    datasets: [
      {
        data: [carbohydrates_100g || 0, fat_100g || 0, proteins_100g || 0],
        backgroundColor: ["#ffcd56", "#ff6384", "#36a2eb"],
        borderWidth: 1,
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
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
