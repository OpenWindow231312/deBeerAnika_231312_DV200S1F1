import React, { useState, lazy, Suspense } from "react";
import SearchBar from "../components/Searchbar";
import SkeletonLoader from "../components/SkeletonLoader";
import "./Compare.css";

const BarChart = lazy(() => import("../components/BarChart"));
const PieChart = lazy(() => import("../components/PieChart"));
const NutritionRadarChart = lazy(() =>
  import("../components/NutritionRadarChart")
);

const Compare = () => {
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [showIngredients1, setShowIngredients1] = useState(false);
  const [showIngredients2, setShowIngredients2] = useState(false);

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

  return (
    <div className="compare-container container">
      <h1 className="compare-title">🍽️ Compare Two Products</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar onSelect={setProduct1} />
        </div>
        <div className="col-md-6">
          <SearchBar onSelect={setProduct2} />
        </div>
      </div>

      {product1 && product2 && (
        <>
          {/* Product Info Columns */}
          <div className="compare-columns">
            {[product1, product2].map((product, i) => (
              <div key={i} className="compare-column">
                <h5>{product.product_name}</h5>
                <p className="text-muted">
                  {product.categories_tags?.[0]?.replace("en:", "") || "N/A"} —{" "}
                  {product.quantity || "N/A"}
                </p>

                <div className="product-image-wrapper">
                  <img src={product.image_front_url} alt="product" />
                  {product.labels_tags?.[0] && (
                    <div className="label-tag">
                      {product.labels_tags[0].replace("en:", "").toUpperCase()}
                    </div>
                  )}
                </div>

                <button
                  className="btn btn-outline-primary ingredient-button"
                  onClick={() =>
                    i === 0
                      ? setShowIngredients1(true)
                      : setShowIngredients2(true)
                  }
                >
                  View Ingredients
                </button>

                {(i === 0 && showIngredients1) ||
                (i === 1 && showIngredients2) ? (
                  <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Ingredients</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() =>
                              i === 0
                                ? setShowIngredients1(false)
                                : setShowIngredients2(false)
                            }
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p>
                            {product.ingredients_text ||
                              "No ingredients listed."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <Suspense fallback={<SkeletonLoader />}>
            <div className="chart-wrapper">
              <h5>📊 Nutritional Values</h5>
              <BarChart product1={product1} product2={product2} />
            </div>

            <div className="pie-chart-row">
              <div className="pie-chart-col">
                <h6 className="text-center">{product1.product_name}</h6>
                <PieChart product={product1} disableAnimation />
              </div>
              <div className="pie-chart-col">
                <h6 className="text-center">{product2.product_name}</h6>
                <PieChart product={product2} disableAnimation />
              </div>
            </div>

            <div className="chart-wrapper mt-4">
              <h5>🧭 Additive & Nutrition Profile</h5>
              <NutritionRadarChart product1={product1} product2={product2} />
            </div>
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Compare;
