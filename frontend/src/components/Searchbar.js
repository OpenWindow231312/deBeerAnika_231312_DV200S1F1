import React, { useState } from "react";

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const url = `https://corsproxy.io/?https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=5`;
      const res = await fetch(url);
      const data = await res.json();

      setResults(data.products || []);
    } catch (err) {
      console.error("Search failed:", err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a food item..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.length > 0 && (
        <ul>
          {results.map((product) => (
            <li key={product.code}>
              <button onClick={() => onSelect(product)}>
                {product.product_name || "Unnamed Product"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
