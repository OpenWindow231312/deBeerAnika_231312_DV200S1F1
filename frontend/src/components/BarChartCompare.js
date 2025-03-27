import React from "react";
import { Bar } from "react-chartjs-2";
import "../components/BarChartCompare.css";
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

  const product1Data = getData(product1);
  const product2Data = getData(product2);

  const maxValue = Math.max(...product1Data, ...product2Data);
  const yAxisMax = maxValue + 10;
  const yAxisMin = 0;

  const getOrangeGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#FF914D");
    gradient.addColorStop(1, "#FFD580");
    return gradient;
  };

  const getGreenGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#4CAF50");
    gradient.addColorStop(1, "#81C784");
    return gradient;
  };

  const getHoverOrangeGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#e86c00");
    gradient.addColorStop(1, "#ffa53f");
    return gradient;
  };

  const getHoverGreenGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#388e3c");
    gradient.addColorStop(1, "#66bb6a");
    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        label: product1.product_name,
        data: product1Data,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx } = chart;
          return getOrangeGradient(ctx);
        },
        hoverBackgroundColor: (context) => {
          const chart = context.chart;
          const { ctx } = chart;
          return getHoverOrangeGradient(ctx);
        },
        borderWidth: 0,
        borderRadius: 6,
        barThickness: 30,
        barShadow: {
          color: "rgba(0, 0, 0, 0.1)",
          blur: 10,
          offsetX: 4,
          offsetY: 4,
        },
      },
      {
        label: product2.product_name,
        data: product2Data,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx } = chart;
          return getGreenGradient(ctx);
        },
        hoverBackgroundColor: (context) => {
          const chart = context.chart;
          const { ctx } = chart;
          return getHoverGreenGradient(ctx);
        },
        borderWidth: 0,
        borderRadius: 6,
        barThickness: 30,
        barShadow: {
          color: "rgba(0, 0, 0, 0.1)",
          blur: 10,
          offsetX: 4,
          offsetY: 4,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeOutQuad",
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            family: "Montserrat", // Consistent font family
            size: 14, // Size of the text in the legend
            weight: "500", // Font weight for consistency
          },
          color: "#004d26", // Dark green color for legend text
        },
      },
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
        max: yAxisMax,
        min: yAxisMin,
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

export default BarChartCompare;
