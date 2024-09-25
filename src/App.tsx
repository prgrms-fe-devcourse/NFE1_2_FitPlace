import KakaoMap from './pages/KakaoMap'; // KakaoMap 컴포넌트 임포트 관련 코드
import React from "react";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Login from './pages/register/Login';
import Register from './pages/register/Register';


const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes> 
    </div>
  );
};

export default App;
