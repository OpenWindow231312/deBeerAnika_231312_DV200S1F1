import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
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

  const options = {
    responsive: true,
    animation: false,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Products",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: getStepSize(),
        },
        title: {
          display: true,
          text: "Nutritional Values per 100g",
        },
      },
    },
  };

  if (loading) return <div className="spinner"></div>;
  if (!data || !data.labels?.length)
    return <p>No valid products found for this category.</p>;

  return <Line data={data} options={options} />;
};

export default LineChart;
