import React from "react";
import { Radar } from "react-chartjs-2";

const RadarChart = ({ product1, product2 }) => {
  const convertNutriScore = (grade) => {
    const map = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    return map[grade?.toLowerCase()] || 0;
  };

  const getScoreData = (product) => {
    if (!product) return [0, 0, 0, 0];

    const additives = product.additives_tags?.length || 0;
    const nova = product.nova_group || 0;
    const nutri = convertNutriScore(product.nutriscore_grade);
    const ingredients = product.ingredients_text?.split(",").length || 0;

    return [additives, nova, nutri, ingredients];
  };

  const labels = [
    "Additives Count",
    "NOVA Group (1–4)",
    "NutriScore (1–5)",
    "Ingredients Count",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: product1?.product_name || "Product 1",
        data: getScoreData(product1),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#36a2eb",
        borderWidth: 2,
      },
      {
        label: product2?.product_name || "Product 2",
        data: getScoreData(product2),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "#ff6384",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h3>🧪 Additive Awareness</h3>
      <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
        This radar chart shows how processed each product is:
        <ul>
          <li>
            <strong>Additives Count:</strong> Number of additives like
            preservatives, colorants, etc.
          </li>
          <li>
            <strong>NOVA Group:</strong> 1 = unprocessed, 4 = ultra-processed.
          </li>
          <li>
            <strong>NutriScore:</strong> 1 (A) = healthiest, 5 (E) = least
            healthy.
          </li>
          <li>
            <strong>Ingredient Count:</strong> More ingredients = more complex
            processing.
          </li>
        </ul>
      </p>
      <Radar data={data} />
    </div>
  );
};

export default RadarChart;
