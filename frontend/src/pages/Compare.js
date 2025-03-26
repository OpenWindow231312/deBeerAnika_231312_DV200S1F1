import React, { useState } from "react";
import SearchBar from "../components/Searchbar";
import { Bar, Radar, Pie } from "react-chartjs-2";
import "./Compare.css"; 

const Compare = () => {
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [showIngredients1, setShowIngredients1] = useState(false);
  const [showIngredients2, setShowIngredients2] = useState(false);

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

  const getPieData = (p) => {
    const n = p?.nutriments || {};
    return {
      labels: ["Carbohydrates", "Fat", "Protein"],
      datasets: [
        {
          data: [
            n.carbohydrates_100g || 0,
            n.fat_100g || 0,
            n.proteins_100g || 0,
          ],
          backgroundColor: ["#ffcd56", "#ff6384", "#36a2eb"],
        },
      ],
    };
  };

  const labels = ["Sugar", "Fat", "Salt", "Protein", "Calories"];
  const nutrition1 = getNutrition(product1);
  const nutrition2 = getNutrition(product2);

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

  return (
    <div className="compare-page">
      <h1>🍽️ Compare Two Products</h1>

      <div className="search-section">
        <SearchBar onSelect={setProduct1} />
        <SearchBar onSelect={setProduct2} />
      </div>

      {product1 && product2 && (
        <>
          <div className="compare-columns">
            {[product1, product2].map((product, i) => (
              <div key={i} className="product-col">
                <h2>{product.product_name || "Unnamed Product"}</h2>
                <p>
                  <strong>Category:</strong>{" "}
                  {product.categories_tags?.[0]?.replace("en:", "") || "N/A"}
                </p>
                <p>
                  <strong>Quantity:</strong> {product.quantity || "N/A"}
                </p>

                <div className="image-wrapper">
                  <img
                    src={product.image_front_url}
                    alt="product"
                    className="product-image"
                  />
                  {product.labels_tags?.length > 0 && (
                    <span className="sticker">
                      {product.labels_tags[0].replace("en:", "").toUpperCase()}
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    i === 0
                      ? setShowIngredients1(true)
                      : setShowIngredients2(true)
                  }
                >
                  Ingredients
                </button>

                {(i === 0 && showIngredients1) ||
                (i === 1 && showIngredients2) ? (
                  <div className="modal">
                    <div className="modal-content">
                      <h3>Ingredients</h3>
                      <p>
                        {product.ingredients_text ||
                          "No ingredients info available."}
                      </p>
                      <button
                        onClick={() =>
                          i === 0
                            ? setShowIngredients1(false)
                            : setShowIngredients2(false)
                        }
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="chart-section full-width">
            <h3>📊 Nutritional Values (per 100g)</h3>
            <Bar data={barData} />
          </div>

          <div className="chart-section pie-charts">
            <div>
              <h4>{product1.product_name}</h4>
              <Pie data={getPieData(product1)} />
            </div>
            <div>
              <h4>{product2.product_name}</h4>
              <Pie data={getPieData(product2)} />
            </div>
          </div>

          <div className="chart-section full-width">
            <h3>🧭 Nutrition Profile Comparison</h3>
            <Radar data={radarData} />
          </div>
        </>
      )}
    </div>
  );
};

export default Compare;
