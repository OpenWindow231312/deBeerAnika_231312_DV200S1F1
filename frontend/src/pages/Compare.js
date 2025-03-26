import React, { useState } from "react";
import SearchBar from "../components/Searchbar";
import { Radar, Bar } from "react-chartjs-2";

const Compare = () => {
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  const getNutrition = (p) => {
    if (!p?.nutriments) return [0, 0, 0, 0, 0];
    return [
      p.nutriments.sugars_100g || 0,
      p.nutriments.fat_100g || 0,
      p.nutriments.salt_100g || 0,
      p.nutriments.proteins_100g || 0,
      p.nutriments["energy-kcal_100g"] || 0,
    ];
  };

  const labels = ["Sugar", "Fat", "Salt", "Protein", "Calories"];
  const nutrition1 = getNutrition(product1);
  const nutrition2 = getNutrition(product2);

  const radarData = {
    labels,
    datasets: [
      {
        label: product1?.product_name || "Product 1",
        data: nutrition1,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "blue",
        borderWidth: 2,
      },
      {
        label: product2?.product_name || "Product 2",
        data: nutrition2,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "red",
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: product1?.product_name || "Product 1",
        data: nutrition1,
        backgroundColor: "#36a2eb",
      },
      {
        label: product2?.product_name || "Product 2",
        data: nutrition2,
        backgroundColor: "#ff6384",
      },
    ],
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Compare Products</h1>

      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
        <div>
          <h3>Product 1</h3>
          <SearchBar onSelect={setProduct1} />
        </div>
        <div>
          <h3>Product 2</h3>
          <SearchBar onSelect={setProduct2} />
        </div>
      </div>

      {product1 && product2 && (
        <>
          <div style={{ margin: "2rem 0" }}>
            <h3>Radar Chart</h3>
            <Radar data={radarData} />
          </div>

          <div style={{ margin: "2rem 0" }}>
            <h3>Bar Chart</h3>
            <Bar data={barData} />
          </div>
        </>
      )}
    </div>
  );
};

export default Compare;
