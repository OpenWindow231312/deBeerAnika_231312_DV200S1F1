import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import "../components/LineChart.css";
import "../index.css";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const LineChart = ({ data, loading }) => {
  const maxValue = useMemo(() => {
    if (!data?.datasets?.length) return 0;
    return Math.max(...data.datasets.flatMap((ds) => ds.data));
  }, [data]);

  const getStepSize = () => {
    if (maxValue <= 10) return 1;
    if (maxValue <= 50) return 5;
    if (maxValue <= 100) return 10;
    if (maxValue <= 500) return 25;
    return 50;
  };

  // Gradient for line chart (orange/green tones for each category)
  const getLineGradient = (ctx, colorStart, colorEnd) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, colorStart); // Lighter color
    gradient.addColorStop(1, colorEnd); // Darker color
    return gradient;
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
            family: "Montserrat",
            size: 14,
            weight: "500",
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
          size: 16, // Larger font for tooltips
        },
        padding: 20,
        cornerRadius: 10,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Shadow for depth
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Products",
        },
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
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: getStepSize(),
          font: {
            family: "Montserrat",
          },
          color: "#444",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        title: {
          display: true,
          text: "Nutritional Values per 100g",
        },
      },
    },
  };

  // Adding gradient for each dataset
  const updatedData = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      borderColor: (context) => {
        const chart = context.chart;
        const { ctx } = chart;
        // Use gradient based on the index (even and odd for color distinction)
        const colorStart = index === 0 ? "#FF914D" : "#4CAF50"; // Orange/Green
        const colorEnd = index === 0 ? "#FFD580" : "#81C784"; // Lighter Orange/Green
        return getLineGradient(ctx, colorStart, colorEnd);
      },
      fill: false, 
      borderWidth: 3, 
      pointRadius: 6, 
      hoverRadius: 8, // Hover effect for points
      tension: 0.4, // Add smoothness to the line
      // Adding shadow to the line itself for depth
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 8,
      shadowColor: "rgba(0, 0, 0, 0.1)", // Subtle shadow effect for depth
    })),
  };

  return (
    <div className="lineChartBody">
      <Line data={updatedData} options={options} />
    </div>
  );
};

export default LineChart;
