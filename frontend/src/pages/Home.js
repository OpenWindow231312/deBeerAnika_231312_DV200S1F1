import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import SearchBar from "../components/Searchbar";
import SummaryCard from "../components/SummaryCard";
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
      <div className="dashboard-layout">
        {/* Top Row */}
        <div className="top-row">
          {/* Left Section */}
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
              <SummaryCard
                title="CALORIES"
                value={`${nutriments["energy-kcal_100g"] || 0}`}
              />
              <SummaryCard title="FAT" value={`${nutriments.fat_100g || 0}g`} />
              <SummaryCard
                title="SUGAR"
                value={`${nutriments.sugars_100g || 0}g`}
              />
            </div>
          </div>

          {/* Bar Chart Widget */}
          <div className="bar-chart-container">
            <div className="bar-chart-body">
              <Suspense fallback={<div className="spinner"></div>}>
                <BarChart product={selectedProduct} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="bottom-row">
          <div className="pie-chart-container">
            <div className="pie-chart-body">
              <Suspense fallback={<div className="spinner"></div>}>
                <PieChart product={selectedProduct} />
              </Suspense>
            </div>
          </div>

          <div className="radar-chart-container">
            <div className="radar-chart-body">
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
