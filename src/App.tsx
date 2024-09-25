import KakaoMap from "./KakaoMap"; // KakaoMap 컴포넌트 임포트 관련 코드
import React from "react";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<Mainpage />} />
      </Routes>
    </div>
  );
};

export default App;
