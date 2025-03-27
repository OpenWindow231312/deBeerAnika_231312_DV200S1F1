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
  const [hoveredPoint, setHoveredPoint] = useState(null); // To show the hovered point's data

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;

      // Create the same orange gradient used in RadarChartSingle for product1 (center light, outer dark)
      const gradient1 = ctx.createRadialGradient(0.5, 0.5, 0, 0.5, 0.5, 0.5); // Radial gradient
      gradient1.addColorStop(0, "#FF914D"); // Lighter orange at the center
      gradient1.addColorStop(1, "#FFD580"); // Soft orange on the outer edges
      setGradientFill1(gradient1);

      // Create a darker shade of the orange for product2 (darker orange)
      const gradient2 = ctx.createRadialGradient(0.5, 0.5, 0, 0.5, 0.5, 0.5); // Radial gradient
      gradient2.addColorStop(0, "#e86c00"); // Darker orange at the center
      gradient2.addColorStop(1, "#ffa53f"); // Richer orange tone on the outer edges
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
        backgroundColor: gradientFill2 || "rgba(255, 99, 132, 0.2)", // Darker Orange gradient
        borderColor: "#e86c00", // Darker orange border
        pointBackgroundColor: "#e86c00",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#e86c00",
        borderWidth: 0, // No border
        tension: 0.4,
      },
    ],
  };

const options = {
  responsive: true,
  animation: { duration: 800 },
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#000", // Black legend text
        font: {
          family: "Montserrat",
          size: 14, // Adjust the font size here for the legend
          weight: "500",
        },
      },
    },
    tooltip: {
      backgroundColor: "#fff", // White background for tooltip
      titleColor: "#cc5500", // Dark orange title
      bodyColor: "#000", // Black body text color
      borderColor: "#cc5500", // Dark orange border
      borderWidth: 1,
      padding: 12, // Increased padding for larger tooltips
      cornerRadius: 6,
      titleFont: {
        family: "Montserrat",
        weight: "600",
        size: 18, // Increase the title font size here
      },
      bodyFont: {
        family: "Montserrat",
        size: 16, // Increase the body font size here
      },
      callbacks: {
        // Custom tooltip text with additional information
        label: function (context) {
          let label = context.dataset.label || "";
          let value = context.raw;
          switch (context.label) {
            case "Nova Score":
              return `${label}: ${value} (Higher is better, scores from 1 to 4)`;
            case "Additives":
              return `${label}: ${value} (Number of additives in the product)`;
            case "Saturated Fat":
              return `${label}: ${value}g (Healthier with lower fat)`;
            case "Salt":
              return `${label}: ${value}g (Lower salt is recommended)`;
            default:
              return `${label}: ${value}`;
          }
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          family: "Montserrat",
          size: 14, // Font size for Y-axis
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
          size: 14, // Font size for X-axis
        },
        color: "#444",
      },
      grid: {
        display: false,
      },
    },
  },
};

  // Hover effect on chart points (glow effect)
  const handleHover = (event, chartElement) => {
    const point = chartElement[0];
    if (point) {
      setHoveredPoint(point);
    }
  };

  return (
    <div className="radarChartBody">
      <Radar
        ref={chartRef}
        data={data}
        options={options}
        onHover={handleHover}
      />
      {hoveredPoint && (
        <div className="hover-tooltip">
          <p>{hoveredPoint.element.$context.dataset.label}</p>
          <p>{hoveredPoint.element.$context.raw}</p>
        </div>
      )}
    </div>
  );
};

export default RadarChartCompare;
