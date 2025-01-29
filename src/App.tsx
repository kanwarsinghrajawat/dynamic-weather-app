import "./App.css";
import React from "react";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/bg.jpg')] p-8">
      <Header />
      <div className="flex"></div>
    </div>
  );
};

export default App;
