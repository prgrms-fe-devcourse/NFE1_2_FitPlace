import React from "react";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/register/Login";
import Register from "./pages/register/Register";
import Ranking_page from "./pages/Ranking_page";
import Location from "./pages/LocationSetting";
import ProfileTemplate from "./pages/profile/ProfileTemplate";

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileTemplate />} />
        <Route path="/ranking" element={<Ranking_page />} />
        <Route path="/map" element={<Location />} />
      </Routes>
    </div>
  );
};

export default App;
