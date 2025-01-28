import React, { useState, useRef } from "react";
import { UseWeatherData } from "../hooks/useWeatherData";

const SearchBar: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Stores debounce timer

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);

    // Clear previous debounce timer
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new debounce timer
    debounceTimeout.current = setTimeout(() => {
      if (e.target.value.trim()) {
        UseWeatherData(e.target.value); // Call API without waiting for response
      }
    }, 500); // 500ms debounce delay
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name..."
        className="p-2 border rounded w-80"
      />
    </div>
  );
};

export default SearchBar;
