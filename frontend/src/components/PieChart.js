import React from "react";
import { Pie } from "react-chartjs-2";
import "../components/PieChart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ product }) => {
  if (!product?.nutriments) return null;

  const { carbohydrates_100g, fat_100g, proteins_100g } = product.nutriments;

  // Unique shades of orange/yellow for each slice
  const baseColors = ["#FFA726", "#FFCC80", "#FFD54F"]; // Carb, Fat, Protein
  const hoverColors = ["#FB8C00", "#FFB74D", "#FFCA28"]; // Intensified on hover

  const data = {
    labels: ["Carbohydrates", "Fat", "Protein"],
    datasets: [
      {
        data: [carbohydrates_100g || 0, fat_100g || 0, proteins_100g || 0],
        backgroundColor: baseColors,
        hoverBackgroundColor: hoverColors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    animation: {
      duration: 700,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 14,
          boxHeight: 14,
          padding: 20,
          color: "#004d26",
          font: {
            family: "Montserrat",
            size: 14,
            weight: "500",
          },
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#004d26",
        bodyColor: "#000",
        borderColor: "#004d26",
        borderWidth: 1,
        titleFont: {
          family: "Montserrat",
          weight: "600",
        },
        bodyFont: {
          family: "Montserrat",
        },
        padding: 10,
        cornerRadius: 6,
      },
    },
  };

  return (
    <div className="pieChartBody">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
