import React from "react";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Ranking_page from "./pages/Ranking_page";
import Location from "./pages/LocationSetting";
import SearchPage from "./pages/SearchPage";
import Header from "./components/Header";
import Login from './pages/register/Login';
import Register from './pages/register/Register';
import NotionAdd from './pages/NotionAdd';
import NotionPage from "./pages/NotionPage";


const App = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ranking" element={<Ranking_page />} />
        <Route path="/map" element={<Location />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/notionAdd" element={<NotionAdd />} />
        <Route path="/notion" element={<NotionPage />} />
      </Routes> 
    </div>
  );
};

export default App;
