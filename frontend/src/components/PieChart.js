import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const PieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://corsproxy.io/?https://world.openfoodfacts.org/categories.json`;
        const res = await axios.get(url);

        const top5 = res.data.tags?.slice(0, 5) || [];
        const labels = top5.map((cat) => cat.name);
        const data = top5.map((cat) => cat.products);

        setChartData({
          labels,
          datasets: [
            {
              label: "% of Products",
              data,
              backgroundColor: [
                "#ff6384",
                "#36a2eb",
                "#ffce56",
                "#cc65fe",
                "#2ecc71",
              ],
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch pie chart data:", err.message);
      }
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Loading Pie Chart...</p>;

  return (
    <div>
      <h3>Distribution of Products by Category</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
