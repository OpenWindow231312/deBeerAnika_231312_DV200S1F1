import React, { useState, lazy, Suspense } from "react";
import SearchBar from "../components/Searchbar";
import SkeletonLoader from "../components/SkeletonLoader";
import "./Compare.css";

const BarChart = lazy(() => import("../components/BarChartCompare"));
const PieChart = lazy(() => import("../components/PieChart"));
const RadarChart = lazy(() => import("../components/RadarChartCompare"));

const Compare = () => {
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  return (
    <div className="compare-container container">
      <h1>🍽️ Compare Two Products</h1>

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
          {/* Product Columns */}
          <div className="compare-columns">
            <div className="compare-column">
              <h5>{product1.product_name}</h5>
              <p className="text-muted">
                {product1.quantity} —{" "}
                {product1.categories_tags?.[0]?.replace("en:", "")}
              </p>
              <img
                className="product-image"
                src={product1.image_front_url}
                alt="product 1"
              />
              {product1.labels_tags?.length > 0 && (
                <div className="label-tag">
                  {product1.labels_tags[0].replace("en:", "").toUpperCase()}
                </div>
              )}
            </div>

            <div className="compare-column">
              <h5>{product2.product_name}</h5>
              <p className="text-muted">
                {product2.quantity} —{" "}
                {product2.categories_tags?.[0]?.replace("en:", "")}
              </p>
              <img
                className="product-image"
                src={product2.image_front_url}
                alt="product 2"
              />
              {product2.labels_tags?.length > 0 && (
                <div className="label-tag">
                  {product2.labels_tags[0].replace("en:", "").toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Bar Chart */}
          <Suspense fallback={<SkeletonLoader />}>
            <div className="chart-wrapper mt-4">
              <h5>📊 Nutritional Values</h5>
              <BarChart product1={product1} product2={product2} />
            </div>

            {/* Pie Charts */}
            <div className="pie-chart-row">
              <div className="pie-chart-col">
                <h6 className="text-center">{product1.product_name}</h6>
                <PieChart product={product1} />
              </div>
              <div className="pie-chart-col">
                <h6 className="text-center">{product2.product_name}</h6>
                <PieChart product={product2} />
              </div>
            </div>

            {/* Radar Chart for Additive & Nutrition */}
            <div className="chart-wrapper mt-4">
              <h5>🧭 Additive & Nutrition Profile</h5>
              <RadarChart product1={product1} product2={product2} />
            </div>
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Compare;
