import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import CitiesList from "./components/CitiesList";
import WeatherDetails from "./components/WeatherDetails";

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat dark:bg-[url('/bg.jpg')] bg-[url('/light-bg.jpg')] p-8">
      <Header />
      <div className="flex mt-4 p-6">
        <div className="w-1/3 pr-4">
          <CitiesList
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>

        <div className="w-2/3 pl-4">
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
