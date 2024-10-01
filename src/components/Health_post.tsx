import React from "react";
import { Link } from "react-router-dom";

const Health_post = ({ title, channel_name, id }) => {
  let titleObject;

  // title이 JSON 형식인지 확인하는 함수
  const isValidJson = (str) => {
    if (typeof str !== "string") return false;
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  try {
    // title이 유효한 JSON인지 확인 후 파싱
    if (isValidJson(title)) {
      titleObject = JSON.parse(title);
      console.log("Parsing successful:", titleObject);
    } else {
      // title이 JSON이 아니면 그대로 사용
      titleObject = { title: title };
    }
  } catch (error) {
    console.error("JSON 파싱 오류:", error);
    titleObject = { title: title };
  }


  return (
    <Link to={`/notion/${id}`}>
      <button className="bg-gray-100 h-32 w-full rounded-md shadow-lg mb-5 p-5 flex flex-col transition-transform duration-300 ease-in-out hover:bg-gray-200 hover:shadow-xl">
        <p className="font-bold text-lg mb-3">
          {titleObject.title || "제목 없음"}
        </p>
        <div className="mb-2 text-sm flex">
          {titleObject.currentMember === titleObject.meetingCapacity ? (
            <p className="text-rose-600	 font-bold">모집 마감</p>
          ) : (
            <p className="text-lime-400 font-bold">모집 중</p>
          )}

          <span className="mx-3 opacity-5">|</span>
          {titleObject.meetingTime || "기간 없음"}
        </div>
        <div className="text-sm flex">
          {titleObject.meetingSpot || "장소 없음"}
          <span className="mx-3 opacity-5">|</span>
          {titleObject.currentMember || 0}명 /{" "}
          {titleObject.meetingCapacity || 0}명
          <span className="mx-3 opacity-5">|</span>
          {channel_name || "기타"}
        </div>
      </button>
    </Link>
  );
};

export default Health_post;
