import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { UseWeatherData } from "../hooks/useWeatherData";
import SuggestionsList from "./SuggestionList";
import { useCitySuggestions } from "../hooks/useCitySuggestions";

interface SearchBarProps {
  setIsModalOpen: (value: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setIsModalOpen }) => {
  const [city, setCity] = useState<string>("");
  const { fetchWeather } = UseWeatherData();

  const { loading, error } = useSelector(
    (state: RootState) => state.weatherData
  );

  const { suggestions, handleDebouncedSearch, clearSuggestions } =
    useCitySuggestions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCity(inputValue);
    handleDebouncedSearch(inputValue);
  };

  const handleCityClick = (selectedCity: string) => {
    setCity(selectedCity);
    clearSuggestions();
    fetchWeather(selectedCity);
    setIsModalOpen(false); // Close modal when city is selected
  };

  return (
    <div className="relative">
      <div className="p-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-md w-80 relative">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name..."
          className="p-2 border rounded w-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50 mt-1">
            <SuggestionsList
              suggestions={suggestions}
              error={error}
              onSelect={handleCityClick}
            />
          </div>
        )}

        {loading && (
          <p className="text-sm text-blue-500 mt-1">Fetching weather...</p>
        )}
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default SearchBar;
