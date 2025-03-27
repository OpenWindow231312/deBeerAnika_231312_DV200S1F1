import React, { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "../components/LineChart";
import Dropdown from "../components/Dropdown"; // Import the Dropdown component
import "../../src/index.css";
import "./Timeline.css";

const categoryProducts = {
  "Ice Cream": [
    "Oreo Ice Cream",
    "Salted Caramel Ice Cream",
    "Strawberry Cheesecake Ice Cream",
    "Vanilla Ice Cream",
    "Cornetto",
    "Magnum Almond",
    "Ben & Jerry's Cookie Dough",
  ],
  "Soft Drinks": [
    "Coca-Cola",
    "Pepsi",
    "Fanta Orange",
    "Sprite",
    "Dr Pepper",
    "Mountain Dew",
  ],
  "Breakfast Cereals": [
    "Weet-Bix",
    "Corn Flakes",
    "Coco Pops",
    "All-Bran",
    "Oats So Easy",
    "Jungle Oats",
  ],
  Yogurt: [
    "Activia Strawberry Yogurt",
    "Yoplait Vanilla Yogurt",
    "Danone Plain Yogurt",
    "Parmalat Drinking Yogurt",
    "Woolworths Greek Yogurt",
    "Strawberry Yogurt",
  ],
  Chocolate: [
    "KitKat",
    "Aero Chocolate",
    "Cadbury Dairy Milk",
    "Lindt Milk Chocolate",
    "Bar One",
    "Bounty",
  ],
};

const Timeline = () => {
  const [selectedCategory, setSelectedCategory] = useState("Ice Cream");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductsByName = async () => {
    const names = categoryProducts[selectedCategory];

    const promises = names.map((name) => {
      const url = `https://corsproxy.io/?https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        name
      )}&search_simple=1&action=process&json=1&page_size=1`;

      return axios
        .get(url)
        .then((res) => res.data.products?.[0] || null)
        .catch(() => null);
    });

    setLoading(true);
    try {
      const results = await Promise.all(promises);

      const validProducts = results
        .filter(
          (p) =>
            p &&
            p.product_name &&
            p.nutriments &&
            p.nutriments["energy-kcal_100g"]
        )
        .slice(0, 5); // Limit to 5 for performance

      setProducts(validProducts);
    } catch (err) {
      console.error("❌ Parallel fetch failed:", err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByName();
  }, [selectedCategory]);

  const chartData = {
    labels: products.map((p) => p.product_name),
    datasets: [
      {
        label: "Calories",
        data: products.map((p) => p.nutriments?.["energy-kcal_100g"] || 0),
        borderColor: "#FF914D",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Sugar",
        data: products.map((p) => p.nutriments?.["sugars_100g"] || 0),
        borderColor: "#FFCD56",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Fat",
        data: products.map((p) => p.nutriments?.["fat_100g"] || 0),
        borderColor: "#4CAF50",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Salt",
        data: products.map((p) => p.nutriments?.["salt_100g"] || 0),
        borderColor: "#4BC0C0",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Protein",
        data: products.map((p) => p.nutriments?.["proteins_100g"] || 0),
        borderColor: "#9966FF",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="timeline-page">
      <h1>📈 Nutritional Timeline</h1>

      <div className="dropdown-wrapper">
        <Dropdown
          options={Object.keys(categoryProducts)}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div className="chart-section">
        <LineChart data={chartData} loading={loading} />
      </div>
    </div>
  );
};

export default Timeline;
