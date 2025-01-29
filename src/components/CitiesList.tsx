import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeCity } from "../store/slices/weatherDataSlice";
import { FiTrash2 } from "react-icons/fi";

interface CitiesListProps {
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
}

const CitiesList: React.FC<CitiesListProps> = ({
  selectedCity,
  setSelectedCity,
}) => {
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.weatherData.cities);

  const cityNames = Object.keys(cities);

  if (cityNames.length === 0) {
    return (
      <div className="text-center text-gray-700 dark:text-gray-300">
        No cities added yet.
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:h-[37rem] overflow-y-auto max-h-[20rem]">
      {cityNames.map((cityName) => {
        const isSelected = cityName === selectedCity;
        const cityWeather = cities[cityName];
        return (
          <div
            key={cityName}
            className={`p-4 rounded-lg cursor-pointer flex justify-between items-center
              ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : " bg-white/10 dark:bg-gray-800/20 backdrop-blur-md shadow-lg rounded-lg text-gray-800 dark:text-gray-200"
              }`}
            onClick={() => setSelectedCity(cityName)}
          >
            <div>
              <h3 className="font-semibold">
                {cityWeather.name}, {cityWeather.sys.country}
              </h3>
              <p className="text-sm">{cityWeather.main.temp}°C</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeCity(cityName));
                if (isSelected) {
                  setSelectedCity(null);
                }
              }}
              className="text-red-500 hover:text-red-700"
              title="Remove City"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CitiesList;
