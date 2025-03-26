import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSelectFood }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const apiKey = process.env.REACT_APP_CHOMP_API_KEY;

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "https://chompthis.com/api/v2/food/branded/search.php",
        {
          params: {
            name: query,
            api_key: apiKey,
          },
        }
      );

      if (response.data.items) {
        setResults(response.data.items.slice(0, 5)); // Limit results
      }
    } catch (error) {
      console.error("Error fetching food:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for branded food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.length > 0 && (
        <ul>
          {results.map((item) => (
            <li key={item.id}>
              <button onClick={() => onSelectFood(item)}>
                {item.name} ({item.brand})
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
