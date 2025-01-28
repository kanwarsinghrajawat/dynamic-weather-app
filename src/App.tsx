import "./App.css";
import React from "react";
import Header from "./components/Header";
import { UseWeatherData } from "./hooks/useWeatherData";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const App: React.FC = () => {
  const handleClick = () => {
    UseWeatherData();
  };
  const weatherData = useSelector((state: RootState) => state.weatherData);
  console.log(weatherData, "weatherData");

  return (
    <div>
      <Header />
      <button onClick={handleClick}>Get Weather</button>
    </div>
  );
};

export default App;
