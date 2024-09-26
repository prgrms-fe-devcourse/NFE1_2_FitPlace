import React from "react";
import KakaoMap from "../pages/KakaoMap"; // KakaoMap 컴포넌트 임포트
import Header from "../components/Header";

const LocationSetting = () => {
  return (
    <>
      <Header />
      <div className="w-140 h-full mx-auto bg-white">
        {/* 상단 제목 */}
        <div className="pt-5 px-4 pb-2">
          <h2 className="text-xl font-bold">장소를 선택해주세요.</h2>
        </div>

        {/* 입력칸 */}
        <div className="p-4">
          <input
            type="text"
            placeholder="입력해주세요."
            className="w-full p-4 bg-[#F6F6F6] text-[#666666] border border-gray-300 rounded-lg mb-6"
          />

          {/* KakaoMap 지도 */}
          <div className="mb-8">
            <KakaoMap />
          </div>

          {/* 저장 버튼 */}
          <button className="w-full bg-[#AFE327] text-white p-4 rounded-lg">
            저장
          </button>
        </div>
      </div>
    </>
  );
};

export default LocationSetting;
