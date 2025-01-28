import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useCitySuggestions } from "../hooks/useCitySuggestions";
import { UseWeatherData } from "../hooks/useWeatherData";
import SuggestionsList from "./SuggestionList";

const SearchBar: React.FC = () => {
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
  };

  return (
    <div className="flex flex-col items-center relative w-80">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name..."
        className="p-2 border rounded w-full"
      />

      {loading && (
        <p className="text-sm text-blue-500 mt-1">Fetching weather...</p>
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      <SuggestionsList
        suggestions={suggestions}
        error={error}
        onSelect={handleCityClick}
      />
    </div>
  );
};

export default SearchBar;
