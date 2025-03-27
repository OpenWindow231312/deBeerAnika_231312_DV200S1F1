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

  // Gradient for normal bars
  const getGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#FF914D"); // Lighter orange
    gradient.addColorStop(1, "#FFD580"); // Soft orange
    return gradient;
  };

  // Gradient for hover effect (more intense)
  const getHoverGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#e86c00"); // Deeper orange
    gradient.addColorStop(1, "#ffa53f"); // Richer tone
    return gradient;
  };

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
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return getGradient(ctx);
        },
        hoverBackgroundColor: (context) => {
          const chart = context.chart;
          const { ctx } = chart;
          return getHoverGradient(ctx);
        },
        borderWidth: 0, // No border
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: { duration: 800 },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        borderColor: "#004d26",
        borderWidth: 1,
        titleColor: "#004d26",
        bodyColor: "#333",
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "Montserrat",
          },
          color: "#444",
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
      x: {
        ticks: {
          font: {
            family: "Montserrat",
          },
          color: "#444",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="barChartBody">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
