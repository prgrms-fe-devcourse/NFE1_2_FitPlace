import React from "react";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Ranking_page from "./pages/Ranking_page";
import Location from "./pages/LocationSetting";
import ProfileTemplate from "./pages/profile/ProfileTemplate";
import ProfileEdit from "./pages/profile/ProfileEdit";
import ProfileImg from "./pages/profile/ProfileImg";
import ProfileNickname from "./pages/profile/ProfileNickname";
import ProfileDesc from "./pages/profile/ProfileDesc";
import ProfileLocation from "./pages/profile/ProfileLocation";
import SearchPage from "./pages/SearchPage";
import Header from "./components/Header";
import Login from "./pages/register/Login";
import Register from "./pages/register/Register";
import NotionAdd from "./pages/NotionAdd";
import Navbar from "./components/Navbar";
import NotificationPage from "./pages/NotificationPage"; 



const App = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileTemplate />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile/edit/nickname" element={<ProfileNickname />} />
        <Route path="/profile/edit/img" element={<ProfileImg />} />
        <Route path="/profile/edit/desc" element={<ProfileDesc />} />
        <Route path="/profile/edit/location" element={<ProfileLocation />} />
        <Route path="/ranking" element={<Ranking_page />} />
        <Route path="/map" element={<Location />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/notifications" element={<NotificationPage />} /> 
        <Route path="/notionAdd" element={<NotionAdd />} />
      </Routes>
      <Navbar />
    </div>
  );
};

export default App;
