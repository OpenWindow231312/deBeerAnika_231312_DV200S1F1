import React, { useState, useRef, useEffect } from "react";
import "../components/Dropdown.css"; // Make sure this file is created

const Dropdown = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(selected || "");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const containerRef = useRef(null);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const handleSelect = (option) => {
    setQuery(option);
    onSelect(option); // Pass the selected option to the parent
    setIsOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={containerRef}>
      <div className="dropdown-input-group">
        <input
          type="text"
          placeholder="Select an option"
          value={query}
          onChange={handleSearch}
          className="dropdown-input"
        />
        <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
          ▼
        </button>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul className="dropdown-menu">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
