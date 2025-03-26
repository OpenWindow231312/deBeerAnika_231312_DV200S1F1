import React, { useState } from "react";
import "../components/Searchbar.css";

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
    <div className="searchbar-container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a food item..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {results.length > 0 && (
        <ul className="list-group">
          {results.map((product) => (
            <li
              key={product.code}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{product.product_name || "Unnamed Product"}</span>
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => onSelect(product)}
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
