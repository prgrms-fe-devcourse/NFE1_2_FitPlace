import React, { useEffect, useState } from "react";
import KakaoMap from "./KakaoMap";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const LocationSetting = () => {
  const [inputValue, setInputValue] = useState("");
  const [isMarkerFixed, setIsMarkerFixed] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.556135, // 초기값: 서울역 좌표
    lng: 126.972608,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedLocation = sessionStorage.getItem("selectedLocation");
    if (savedLocation) {
      const locationData = JSON.parse(savedLocation);
      setInputValue(locationData.address);
      setCurrentPosition({
        lat: locationData.lat,
        lng: locationData.lng,
      });
      setIsMarkerFixed(true);
      setIsEditable(false); 
    }
  }, []);

  const handleSave = () => {
    if (inputValue.trim() === "") {
      alert("장소를 입력해주세요.");
    } else {
      setIsMarkerFixed(true);
      setIsEditable(false);

      sessionStorage.setItem("selectedLocation", JSON.stringify({
        address: inputValue,
        lat: currentPosition.lat,
        lng: currentPosition.lng
      }));

      navigate("/notionAdd");
    }
  };

  const handleEdit = () => {
    setIsMarkerFixed(false);
    setIsEditable(true);
  };

  const handleMapCenterChange = (lat: number, lng: number) => {
    setCurrentPosition({ lat, lng });
  };

  return (
    <>
      <Header />
      <div className="w-140 h-full mx-auto bg-white">
        <div className="pt-5 px-4 pb-2">
          <h2 className="text-xl font-bold">장소를 선택해주세요.</h2>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="입력해주세요."
            className="w-full p-4 bg-[#F6F6F6] text-[#666666] border border-gray-300 rounded-lg mb-6"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={!isEditable} 
          />

          <div className="mb-8">
            <KakaoMap
              isMarkerFixed={isMarkerFixed}
              location={currentPosition}
              onCenterChange={handleMapCenterChange} 
            />
          </div>

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
