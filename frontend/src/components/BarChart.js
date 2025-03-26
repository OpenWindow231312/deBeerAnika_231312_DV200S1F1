import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const categories = [
  "snacks",
  "beverages",
  "breakfasts",
  "desserts",
  "biscuits",
];

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const sugarAverages = [];

      for (const category of categories) {
        try {
          const url = `https://corsproxy.io/?https://world.openfoodfacts.org/category/${category}.json`;
          const res = await axios.get(url);

          const products = res.data.products?.slice(0, 50) || [];

          const totalSugar = products.reduce((sum, p) => {
            const sugar = p.nutriments?.sugars_100g || 0;
            return sum + sugar;
          }, 0);

          const avgSugar = products.length
            ? (totalSugar / products.length).toFixed(1)
            : 0;
          sugarAverages.push(avgSugar);
        } catch (err) {
          console.error(`Failed to fetch category ${category}:`, err.message);
          sugarAverages.push(0);
        }
      }

      setChartData({
        labels: categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
        datasets: [
          {
            label: "Avg Sugar (per 100g)",
            data: sugarAverages,
            backgroundColor: "#a22",
          },
        ],
      });
    };

    fetchCategoryData();
  }, []);

  if (!chartData) return <p>Loading Bar Chart...</p>;

  return (
    <div>
      <h3>Average Sugar per Category</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
