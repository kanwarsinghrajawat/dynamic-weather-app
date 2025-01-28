import "./App.css";
import React from "react";
import { UseWeatherData } from "./hooks/useWeatherData";
import Header from "./components/Header";

const App: React.FC = () => {
  const handleClick = () => {
    UseWeatherData("bangalore");
  };

  return (
    <div>
      <Header />
      <button onClick={handleClick}>Get Weather</button>
    </div>
  );
};

export default App;
