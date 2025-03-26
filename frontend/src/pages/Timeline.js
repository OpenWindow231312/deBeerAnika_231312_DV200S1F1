import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
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

const nutrientOptions = {
  calories: {
    label: "Calories (kcal)",
    key: "energy-kcal_100g",
    color: "#ff6384",
  },
  sugar: { label: "Sugar (g)", key: "sugars_100g", color: "#36a2eb" },
  fat: { label: "Fat (g)", key: "fat_100g", color: "#ffcd56" },
  salt: { label: "Salt (g)", key: "salt_100g", color: "#4bc0c0" },
  protein: { label: "Protein (g)", key: "proteins_100g", color: "#9966ff" },
};

const Timeline = () => {
  const [selectedCategory, setSelectedCategory] = useState("Ice Cream");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleNutrients, setVisibleNutrients] = useState(
    Object.keys(nutrientOptions)
  );

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
        .slice(0, 5);

      setProducts(validProducts);
    } catch (err) {
      console.error("Parallel fetch failed:", err.message);
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
    datasets: visibleNutrients.map((key) => ({
      label: nutrientOptions[key].label,
      data: products.map((p) => p.nutriments?.[nutrientOptions[key].key] || 0),
      borderColor: nutrientOptions[key].color,
      fill: false,
    })),
  };

  const handleToggle = (key) => {
    setVisibleNutrients((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="timeline-page">
      <h1>📈 Nutritional Timeline</h1>

      <div className="dropdown-wrapper">
        <label>Select a category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {Object.keys(categoryProducts).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="toggle-wrapper">
        <label>Show nutrients:</label>
        {Object.keys(nutrientOptions).map((key) => (
          <label key={key} style={{ marginLeft: "10px" }}>
            <input
              type="checkbox"
              checked={visibleNutrients.includes(key)}
              onChange={() => handleToggle(key)}
            />
            {nutrientOptions[key].label}
          </label>
        ))}
      </div>

      <div className="chart-section">
        {loading ? (
          <div className="spinner"></div>
        ) : products.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p>No valid products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Timeline;
