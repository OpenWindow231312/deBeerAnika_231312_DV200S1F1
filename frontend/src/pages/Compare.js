import React, { useState, lazy, Suspense, useEffect } from "react";
import SearchBar from "../components/Searchbar";
import SkeletonLoader from "../components/SkeletonLoader";
import "./Compare.css";
import "../index.css";

const BarChart = lazy(() => import("../components/BarChartCompare"));
const PieChart = lazy(() => import("../components/PieChart"));
const RadarChart = lazy(() => import("../components/RadarChartCompare"));

const Compare = () => {
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  // Load products from localStorage if they exist
  useEffect(() => {
    const savedProduct1 = localStorage.getItem("product1");
    const savedProduct2 = localStorage.getItem("product2");

    if (savedProduct1) {
      setProduct1(JSON.parse(savedProduct1));
    }

    if (savedProduct2) {
      setProduct2(JSON.parse(savedProduct2));
    }
  }, []);

  // Store products in localStorage whenever they change
  useEffect(() => {
    if (product1) {
      localStorage.setItem("product1", JSON.stringify(product1));
    }
    if (product2) {
      localStorage.setItem("product2", JSON.stringify(product2));
    }
  }, [product1, product2]);

  return (
    <div className="compare-wrapper">
      <h1 className="compare-title">🍽️ Compare Two Products</h1>

      <div className="search-pair">
        <SearchBar onSelect={setProduct1} />
        <SearchBar onSelect={setProduct2} />
      </div>

      {product1 && product2 && (
        <>
          {/* Product Comparison Columns */}
          <div className="compare-columns">
            {[product1, product2].map((product, idx) => (
              <div className="compare-card" key={idx}>
                <h2 className="compare-product-name">
                  {product.product_name || "Unnamed Product"}
                </h2>
                <p className="compare-meta">
                  {product.quantity} —{" "}
                  {product.categories_tags?.[0]?.replace("en:", "")}
                </p>
                <img
                  src={product.image_front_url}
                  alt="product"
                  className="compare-image"
                />
                {product.labels_tags?.length > 0 && (
                  <div className="label-tag">
                    {product.labels_tags[0].replace("en:", "").toUpperCase()}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Charts */}
          <Suspense fallback={<SkeletonLoader />}>
            <div className="compare-chart">
              <h2 className="chart-title">Nutritional Values</h2>
              <BarChart product1={product1} product2={product2} />
            </div>

            {/* Pie Charts */}
            <div className="compare-pie-row">
              <div className="compare-pie-col">
                <h2 className="chart-title">{product1.product_name}</h2>
                <PieChart product={product1} />
              </div>
              <div className="compare-pie-col">
                <h2 className="chart-title">{product2.product_name}</h2>
                <PieChart product={product2} />
              </div>
            </div>

            <div className="compare-chart">
              <h2 className="chart-title">Additive & Nutrition Profile</h2>
              <RadarChart product1={product1} product2={product2} />
            </div>
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Compare;
