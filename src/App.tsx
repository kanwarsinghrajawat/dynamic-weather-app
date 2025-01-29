import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CitiesList from "./components/CitiesList";
import WeatherDetails from "./components/WeatherDetails";
import { UseWeatherData } from "./hooks/useWeatherData";

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { fetchWeather } = UseWeatherData();

  useEffect(() => {
    const defaultCity = "Delhi";
    fetchWeather(defaultCity);
    setSelectedCity(defaultCity);
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat dark:bg-[url('/bg.jpg')] bg-[url('/light-bg.jpg')] p-8">
      <Header setSelectedCity={setSelectedCity} />
      <div className="flex flex-col lg:flex-row mt-4 p-6">
        <div className="lg:w-1/3 w-full lg:pr-4">
          <CitiesList
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>

        <div className="lg:w-2/3 w-full lg:pl-4 mt-6 lg:mt-0">
          {selectedCity ? (
            <WeatherDetails cityName={selectedCity} />
          ) : (
            <div className="text-center text-gray-700 dark:text-gray-300">
              Select a city to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
