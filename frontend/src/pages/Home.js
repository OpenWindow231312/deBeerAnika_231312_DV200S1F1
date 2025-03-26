import React, { useEffect, useState } from "react";
import SearchBar from "../components/Searchbar";
import SummaryCard from "../components/SummaryCard";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import RadarChart from "../components/RadarChart";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultProduct = "Coca-Cola";

  const fetchDefaultProduct = async () => {
    setLoading(true);
    try {
      const url = `https://corsproxy.io/?https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        defaultProduct
      )}&search_simple=1&action=process&json=1&page_size=1`;
      const res = await axios.get(url);
      const product = res.data.products?.[0];
      setSelectedProduct(product || null);
    } catch (err) {
      console.error("Failed to load default product:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultProduct();
  }, []);

  const nutriments = selectedProduct?.nutriments || {};

  return (
    <div className="home-container">
      <h1 className="dashboard-title">🍽️ Food Dashboard</h1>

      {/* Search Bar */}
      <div className="card-wrapper mb-4">
        <SearchBar onSelect={setSelectedProduct} />
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="spinner"></div>
      ) : selectedProduct ? (
        <>
          {/* Summary Cards */}
          <div className="card-wrapper summary-card-row mb-4">
            <SummaryCard title="Product" value={selectedProduct.product_name} />
            <SummaryCard
              title="Calories"
              value={`${nutriments["energy-kcal_100g"] || 0} kcal`}
            />
            <SummaryCard
              title="Sugar"
              value={`${nutriments.sugars_100g || 0} g`}
            />
          </div>

          {/* Charts in One Row */}
          <div className="three-chart-row">
            <div className="card-wrapper chart-col">
              <h5 className="chart-title">Nutrition Breakdown (Bar)</h5>
              <BarChart product={selectedProduct} />
            </div>

            <div className="card-wrapper chart-col">
              <h5 className="chart-title">Macro Ratio (Pie)</h5>
              <PieChart product={selectedProduct} />
            </div>

            <div className="card-wrapper chart-col">
              <h5 className="chart-title">Additive Awareness</h5>
              <RadarChart product={selectedProduct} />
            </div>
          </div>
        </>
      ) : (
        <p>No product selected.</p>
      )}
    </div>
  );
};

export default Home;
