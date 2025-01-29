import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { UseWeatherData } from "../hooks/useWeatherData";
import SuggestionsList from "./SuggestionList";
import { useCitySuggestions } from "../hooks/useCitySuggestions";

export interface SearchBarProps {
  setIsModalOpen: (value: boolean) => void;
  setSelectedCity: (city: string | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setIsModalOpen,
  setSelectedCity,
}) => {
  const [city, setCity] = useState<string>("");
  const { fetchWeather } = UseWeatherData();
  const { suggestions, handleDebouncedSearch, clearSuggestions } =
    useCitySuggestions();
  const { loading, error } = useSelector(
    (state: RootState) => state.weatherData
  );

  const handleCityClick = (selectedCity: string) => {
    setCity(selectedCity);
    clearSuggestions();
    fetchWeather(selectedCity);
    setSelectedCity(selectedCity);
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-gray-50 p-4 rounded-lg shadow-lg">
      <div className="flex items-end justify-end">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-3 py-1 bg-gray-800/20 text-white rounded-md shadow-md text-end mb-4 active:scale-95 transition-transform ease-in-out duration-150"
        >
          ESC
        </button>
      </div>

      <div className="p-4 bg-gray-100 text-black rounded-lg shadow-md w-80 relative">
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            handleDebouncedSearch(e.target.value);
          }}
          placeholder="Enter city name..."
          className="p-2 border rounded w-full bg-gray-200 text-black border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        {suggestions.length > 0 && (
          <div className="top-full left-0 w-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50 mt-1">
            <SuggestionsList
              suggestions={suggestions}
              error={error}
              onSelect={handleCityClick}
            />
          </div>
        )}

        {loading && (
          <p className="text-sm text-blue-500">Fetching weather...</p>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SearchBar;
