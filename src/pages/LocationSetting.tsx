import React, { useState } from "react";
import KakaoMap from "./KakaoMap"; // KakaoMap 컴포넌트 임포트
import Header from "../components/Header";

const LocationSetting = () => {
  const [inputValue, setInputValue] = useState("");
  const [isMarkerFixed, setIsMarkerFixed] = useState(false); 
  const [isEditable, setIsEditable] = useState(true); 

  // 저장 후 마커 및 입력칸 고정하기
  const handleSave = () => {
    if (inputValue.trim() === "") {
      alert("장소를 입력해주세요."); //경고 메세지
    } else {
      setIsMarkerFixed(true); 
      setIsEditable(false); 
    }
  };

  // 수정 후 마커 및 입력칸 수정하기
  const handleEdit = () => {
    setIsMarkerFixed(false); 
    setIsEditable(true); 
  };

  return (
    <>
      <Header />
      <div className="w-140 h-full mx-auto bg-white">
        {/* 제목 */}
        <div className="pt-5 px-4 pb-2">
          <h2 className="text-xl font-bold">장소를 선택해주세요.</h2>
        </div>

        {/* 입력칸 */}
        <div className="p-4">
          <input
            type="text"
            placeholder="입력해주세요."
            className="w-full p-4 bg-[#F6F6F6] text-[#666666] border border-gray-300 rounded-lg mb-6"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={!isEditable} 
          />

          {/* KakaoMap 지도 */}
          <div className="mb-8">
            <KakaoMap isMarkerFixed={isMarkerFixed} />
          </div>

          {/* 저장 및 수정 버튼 */}
          {isEditable ? (
            <button
              className="w-full bg-[#AFE327] text-white p-4 rounded-lg"
              onClick={handleSave}
            >
              저장
            </button>
          ) : (
            <button
              className="w-full bg-gray-400 text-white p-4 rounded-lg"
              onClick={handleEdit}
            >
              수정하기
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LocationSetting;
