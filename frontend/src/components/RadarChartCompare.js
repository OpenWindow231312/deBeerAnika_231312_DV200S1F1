import React, { useRef, useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import "../components/RadarChartSingle.css"; // Ensure shared styles
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

const RadarChartCompare = ({ product1, product2 }) => {
  const chartRef = useRef(null);
  const [gradientFill1, setGradientFill1] = useState(null); // Gradient for product1
  const [gradientFill2, setGradientFill2] = useState(null); // Gradient for product2

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;

      // Create the same orange gradient used in RadarChartSingle for product1 (center light, outer dark)
      const gradient1 = ctx.createRadialGradient(0.5, 0.5, 0, 0.5, 0.5, 0.5); // Radial gradient
      gradient1.addColorStop(0, "#FF914D"); // Lighter orange at the center
      gradient1.addColorStop(1, "#FFD580"); // Soft orange on the outer edges
      setGradientFill1(gradient1);

      // Create green gradient for product2
      const gradient2 = ctx.createRadialGradient(0.5, 0.5, 0, 0.5, 0.5, 0.5); // Radial gradient
      gradient2.addColorStop(0, "#4CAF50"); // Green at the center
      gradient2.addColorStop(1, "#81C784"); // Lighter green on the outer edges
      setGradientFill2(gradient2);
    }
  }, [product1, product2]);

  if (!product1?.nutriments || !product2?.nutriments) return null;

  const getData = (p) => [
    p.nova_group || 0,
    p.additives_n || 0,
    p.nutriments["saturated-fat_100g"] || 0,
    p.nutriments.salt_100g || 0,
  ];

  const data = {
    labels: ["Nova Score", "Additives", "Saturated Fat", "Salt"],
    datasets: [
      {
        label: product1.product_name,
        data: getData(product1),
        backgroundColor: gradientFill1 || "rgba(255, 145, 77, 0.2)", // Orange gradient
        borderColor: "#cc5500", // Dark orange border
        pointBackgroundColor: "#cc5500",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#cc5500",
        borderWidth: 0, // No border
        tension: 0.4,
      },
      {
        label: product2.product_name,
        data: getData(product2),
        backgroundColor: gradientFill2 || "rgba(76, 175, 80, 0.2)", // Green gradient
        borderColor: "#4CAF50", // Green border
        pointBackgroundColor: "#4CAF50",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#4CAF50",
        borderWidth: 0, // No border
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
          color: "#000", // Black legend text
          font: {
            family: "Montserrat",
            size: 14,
            weight: "500",
          },
        },
      },
      tooltip: {
        backgroundColor: "#fff", // White background for tooltip
        titleColor: "#cc5500", // Dark orange title
        bodyColor: "#000", // Body text color (black)
        borderColor: "#cc5500", // Dark orange border
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
          color: "#000", // Black radar axis labels
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

export default RadarChartCompare;
