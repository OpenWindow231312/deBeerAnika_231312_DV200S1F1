import React, { useRef, useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import "../components/RadarChartSingle.css";
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
  const chartRef = useRef(null);
  const [gradientFill, setGradientFill] = useState(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, "#ff914d");
      gradient.addColorStop(1, "#ffd580");
      setGradientFill(gradient);
    }
  }, [product]);

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
        backgroundColor: gradientFill || "rgba(255, 145, 77, 0.2)",
        borderColor: "#cc5500",
        pointBackgroundColor: "#cc5500",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#cc5500",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    animation: {
      duration: 800,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000", // black legend text
          font: {
            family: "Montserrat",
            size: 14,
            weight: "500",
          },
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#cc5500",
        bodyColor: "#000",
        borderColor: "#cc5500",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        titleFont: {
          family: "Montserrat",
          weight: "600",
        },
        bodyFont: {
          family: "Montserrat",
        },
      },
    },
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 10,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        pointLabels: {
          font: {
            family: "Montserrat",
            size: 14,
          },
          color: "#000", // black radar axis labels
        },
        ticks: {
          backdropColor: "transparent",
          color: "#777",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="radarChartBody">
      <Radar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default RadarChartSingle;
