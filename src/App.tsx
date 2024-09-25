import React from "react";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Mainpage />} />
      </Routes>
    </div>
  );
};

export default App;
