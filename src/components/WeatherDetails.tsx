import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  FaMapMarkerAlt,
  FaCompass,
  FaWind,
  FaCloudSun,
  FaSun,
  FaCloud,
  FaEye,
  FaTint,
  FaTachometerAlt,
} from "react-icons/fa";

interface WeatherDetailsProps {
  cityName: string;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ cityName }) => {
  const cityWeather = useSelector(
    (state: RootState) => state.weatherData.cities[cityName]
  );

  if (!cityWeather) return null;

  const weatherCondition = cityWeather.weather[0].main.toLowerCase();
  const backgroundImages: { [key: string]: string } = {
    clear: "/sunny.jpg",
    clouds: "/cloud-sky.jpg",
    rain: "/rainy.jpg",
    snow: "/snow.jpg",
    fog: "/foggy.jpg",
  };

  const backgroundImageUrl = backgroundImages[weatherCondition];

  const sunriseTime = new Date(
    cityWeather.sys.sunrise * 1000
  ).toLocaleTimeString();
  const sunsetTime = new Date(
    cityWeather.sys.sunset * 1000
  ).toLocaleTimeString();

  return (
    <div
      className="bg-cover bg-center text-white p-6 rounded-lg shadow-lg bg-white/20 dark:bg-gray-900/20"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-2xl font-semibold flex items-center">
          <FaMapMarkerAlt className="mr-2 text-yellow-300" />
          {cityWeather.name}, {cityWeather.sys.country}
        </h2>
        <div className="flex items-center mt-4 sm:mt-0">
          <div className="ml-4">
            <p className="text-4xl md:text-5xl font-bold">
              {cityWeather.main.temp}°C
            </p>
            <p className="capitalize text-lg">
              {cityWeather.weather[0].description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 lg:pt-20">
        <div className="bg-black/50 p-4 md:p-6 rounded-lg flex items-center">
          <FaWind className="text-blue-300 text-xl md:text-2xl mr-3 md:mr-4" />
          <div>
            <p className="text-xs md:text-sm">Wind Speed</p>
            <p className="font-semibold text-sm md:text-lg">
              {cityWeather.wind.speed} m/s
            </p>
          </div>
        </div>

        <div className="bg-black/50 p-4 md:p-6 rounded-lg flex items-center">
          <FaCompass className="text-red-300 text-xl md:text-2xl mr-3 md:mr-4" />
          <div>
            <p className="text-xs md:text-sm">Wind Direction</p>
            <p className="font-semibold text-sm md:text-lg">
              {cityWeather.wind.deg}°
            </p>
          </div>
        </div>

        <div className="bg-black/50 p-4 md:p-6 rounded-lg flex items-center">
          <FaTint className="text-green-300 text-xl md:text-2xl mr-3 md:mr-4" />
          <div>
            <p className="text-xs md:text-sm">Humidity</p>
            <p className="font-semibold text-sm md:text-lg">
              {cityWeather.main.humidity}%
            </p>
          </div>
        </div>

        <div className="bg-black/50 p-4 md:p-6 rounded-lg flex items-center">
          <FaTachometerAlt className="text-yellow-300 text-xl md:text-2xl mr-3 md:mr-4" />
          <div>
            <p className="text-xs md:text-sm">Pressure</p>
            <p className="font-semibold text-sm md:text-lg">
              {cityWeather.main.pressure} hPa
            </p>
          </div>
        </div>

        <div className="bg-black/50 p-4 md:p-6 rounded-lg flex items-center">
          <FaCloud className="text-indigo-300 text-xl md:text-2xl mr-3 md:mr-4" />
          <div>
            <p className="text-xs md:text-sm">Cloudiness</p>
            <p className="font-semibold text-sm md:text-lg">
              {cityWeather.clouds.all}%
            </p>
          </div>
        </div>

        <div className="bg-black/50 p-4 md:p-6 rounded-lg flex items-center">
          <FaEye className="text-purple-300 text-xl md:text-2xl mr-3 md:mr-4" />
          <div>
            <p className="text-xs md:text-sm">Visibility</p>
            <p className="font-semibold text-sm md:text-lg">
              {cityWeather.visibility / 1000} km
            </p>
          </div>
        </div>

        <div className="bg-black/50 p-4 md:p-6 rounded-lg flex items-center">
          <FaSun className="text-orange-300 text-xl md:text-2xl mr-3 md:mr-4" />
          <div>
            <p className="text-xs md:text-sm">Sunrise</p>
            <p className="font-semibold text-sm md:text-lg">{sunriseTime}</p>
          </div>
        </div>

        <div className="bg-black/50 p-4 md:p-6 rounded-lg flex items-center">
          <FaCloudSun className="text-red-300 text-xl md:text-2xl mr-3 md:mr-4" />
          <div>
            <p className="text-xs md:text-sm">Sunset</p>
            <p className="font-semibold text-sm md:text-lg">{sunsetTime}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${cityWeather.coord.lat},${cityWeather.coord.lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-200 text-sm md:text-base"
        >
          View Weather Map
        </a>
      </div>
    </div>
  );
};

export default WeatherDetails;
