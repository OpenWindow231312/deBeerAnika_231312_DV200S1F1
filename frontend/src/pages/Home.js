import React, { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import SearchBar from '../components/Searchbar';
import SummaryCard from '../components/SummaryCard';
import './Home.css';

const BarChart = lazy(() => import('../components/BarChart'));
const PieChart = lazy(() => import('../components/PieChart'));
const RadarChartSingle = lazy(() => import('../components/RadarChartSingle'));

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
      console.error('Default fetch failed:', err.message);
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

      <div className="card-wrapper mb-4">
        <SearchBar onSelect={setSelectedProduct} />
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : selectedProduct ? (
        <>
          <div className="card-wrapper summary-card-row mb-4">
            <SummaryCard title="Product" value={selectedProduct.product_name} />
            <SummaryCard title="Calories" value={`${nutriments['energy-kcal_100g'] || 0} kcal`} />
            <SummaryCard title="Sugar" value={`${nutriments.sugars_100g || 0} g`} />
          </div>

          <Suspense fallback={<div className="spinner"></div>}>
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
                <RadarChartSingle product={selectedProduct} />
              </div>
            </div>
          </Suspense>
        </>
      ) : (
        <p>No product selected.</p>
      )}
    </div>
  );
};

export default Home;