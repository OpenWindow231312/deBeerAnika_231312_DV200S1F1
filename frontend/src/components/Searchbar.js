import React, { useState, useRef, useEffect } from "react";
import "../components/Searchbar.css";

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const containerRef = useRef(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const url = `https://corsproxy.io/?https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=5`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.products || []);
    } catch (err) {
      console.error("Search failed:", err.message);
    }
  };

  const handleSelect = (product) => {
    onSelect(product);
    setResults([]);
    setQuery(product.product_name || "");
    setIsSelected(true);
  };

  const clearSelection = () => {
    setQuery("");
    setIsSelected(false);
    onSelect(null); // notify parent to clear selection
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="searchbar-container" ref={containerRef}>
      <div className="searchbar-input-group">
        <input
          type="text"
          placeholder="Search for a food item..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="searchbar-input"
          disabled={isSelected} // Disable after selection
        />
        {isSelected ? (
          <button className="searchbar-clear-button" onClick={clearSelection}>
            ✕
          </button>
        ) : (
          <button className="searchbar-button" onClick={handleSearch}>
            Search
          </button>
        )}
      </div>

      {results.length > 0 && (
        <ul className="searchbar-dropdown">
          {results.map((product) => (
            <li key={product.code} className="searchbar-option">
              <span>{product.product_name || "Unnamed Product"}</span>
              <button onClick={() => handleSelect(product)}>Select</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
