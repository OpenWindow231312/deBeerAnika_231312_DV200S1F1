import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [product, setProduct] = useState(null);

  const fetchRandomProduct = async () => {
    try {
      const response = await axios.get(
        "https://world.openfoodfacts.org/cgi/search.pl",
        {
          params: {
            search_terms: "", // leave empty to get a variety
            search_simple: 1,
            action: "process",
            json: 1,
            page_size: 1,
            page: Math.floor(Math.random() * 100), // random page
          },
        }
      );

      const randomProduct = response.data.products[0];

      if (
        randomProduct &&
        randomProduct.product_name &&
        randomProduct.nutriments?.["energy-kcal_100g"]
      ) {
        setProduct({
          name: randomProduct.product_name,
          calories: randomProduct.nutriments["energy-kcal_100g"],
        });
      } else {
        setProduct({
          name: "Unknown Product",
          calories: "N/A",
        });
      }
    } catch (error) {
      console.error("❌ Failed to fetch product:", error.message);
      setProduct({
        name: "Error fetching product",
        calories: "N/A",
      });
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🍽️ Food Product Tester</h1>
      <button
        onClick={fetchRandomProduct}
        style={{ padding: "1rem", fontSize: "1rem" }}
      >
        Get Random Product
      </button>

      {product && (
        <div style={{ marginTop: "2rem" }}>
          <h2>🛒 {product.name}</h2>
          <p>🔥 Calories per 100g: {product.calories}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
