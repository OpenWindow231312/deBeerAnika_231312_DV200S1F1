import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import SearchBar from "../components/Searchbar";
import WidgetHeaderHome from "../components/WidgetHeaderHome"; // Importing WidgetHeader
import "./Home.css";

const BarChart = lazy(() => import("../components/BarChart"));
const PieChart = lazy(() => import("../components/PieChart"));
const RadarChartSingle = lazy(() => import("../components/RadarChartSingle"));

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDefaultProduct = async () => {
    setLoading(true);
    try {
      const url = `https://corsproxy.io/?https://world.openfoodfacts.org/cgi/search.pl?search_terms=coca-cola&search_simple=1&action=process&json=1&page_size=1`;
      const res = await axios.get(url);
      setSelectedProduct(res.data.products?.[0] || null);
    } catch (err) {
      console.error("Default fetch failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultProduct();
  }, []);

  const nutriments = selectedProduct?.nutriments || {};

  return (
    <div className="home-wrapper">
      <div className="homeContainer">
        <WidgetHeaderHome title="" />
        <div className="dashboard-layout">
          {/* Top Row */}
          <div className="top-row">
            <div className="left-section">
              <div className="search-box">
                <SearchBar onSelect={setSelectedProduct} />
              </div>

              <div className="product-title-box">
                <h1 className="product-title">
                  {selectedProduct?.product_name || "PRODUCT"}
                </h1>
              </div>

              <div className="summary-group">
                <div>
                  <div className="summary-title">CALORIES</div>
                  <div className="summary-value">
                    {nutriments["energy-kcal_100g"] || 0}
                  </div>
                </div>

                <div>
                  <div className="summary-title">FAT</div>
                  <div className="summary-value">
                    {nutriments.fat_100g || 0}g
                  </div>
                </div>

                <div>
                  <div className="summary-title">SUGAR</div>
                  <div className="summary-value">
                    {nutriments.sugars_100g || 0}g
                  </div>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bar-chart-container">
              <h2 className="chart-title">NUTRITION BREAKDOWN</h2>
              <Suspense fallback={<div className="spinner"></div>}>
                <BarChart product={selectedProduct} />
              </Suspense>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="bottom-row">
            <div className="pie-chart-container">
              <h2 className="chart-title">MACRO RATIO</h2>
              <Suspense fallback={<div className="spinner"></div>}>
                <PieChart product={selectedProduct} />
              </Suspense>
            </div>

            <div className="radar-chart-container">
              <h2 className="chart-title">ADDITIVE AWARENESS</h2>
              <Suspense fallback={<div className="spinner"></div>}>
                <RadarChartSingle product={selectedProduct} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
