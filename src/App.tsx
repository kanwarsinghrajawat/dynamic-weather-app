import "./App.css";
import React from "react";
import { UseWeatherData } from "./hooks/useWeatherData";

const App: React.FC = () => {
  const handleClick = () => {
    UseWeatherData("bangalore");
  };

  return (
    <div>
      <button onClick={handleClick}>Get Weather</button>
    </div>
  );
};

export default App;
