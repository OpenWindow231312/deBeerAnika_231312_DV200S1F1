import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";

const RadarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchRandomProduct = async () => {
      try {
        const url = `https://corsproxy.io/?https://world.openfoodfacts.org/cgi/search.pl?search_terms=coca+cola&search_simple=1&action=process&json=1&page_size=1`;
        const res = await fetch(url);
        const data = await res.json();

        const product = data.products?.[0];
        if (!product || !product.nutriments) return;

        const n = product.nutriments;

        setChartData({
          labels: ["Sugar", "Fat", "Salt", "Protein", "Calories"],
          datasets: [
            {
              label: product.product_name || "Unknown Product",
              data: [
                n.sugars_100g || 0,
                n.fat_100g || 0,
                n.salt_100g || 0,
                n.proteins_100g || 0,
                n["energy-kcal_100g"] || 0,
              ],
              backgroundColor: "rgba(162, 34, 34, 0.2)",
              borderColor: "#a22",
              borderWidth: 2,
            },
          ],
        });
      } catch (err) {
        console.error("Radar fetch failed:", err.message);
      }
    };

    fetchRandomProduct();
  }, []);

  if (!chartData) return <p>Loading Radar Chart...</p>;

  return (
    <div>
      <h3>Nutrition Profile</h3>
      <Radar data={chartData} />
    </div>
  );
};

export default RadarChart;
