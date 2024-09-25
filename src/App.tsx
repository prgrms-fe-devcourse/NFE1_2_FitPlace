import KakaoMap from './KakaoMap'; // KakaoMap 컴포넌트 임포트 관련 코드
import React from "react";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import NotionAdd from './pages/NotionAdd';


const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<NotionAdd />} />
      </Routes> 
    </div>
  );
};

export default App;
