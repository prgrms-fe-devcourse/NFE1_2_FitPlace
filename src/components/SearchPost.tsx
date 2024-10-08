import React, { useState } from "react";
import Health_post from "../components/Health_post";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const SearchPost = (props) => {
  const [activeButton, setActiveButton] = useState("전체");
  const { postList } = props;

  const handleButtonClick = (item: string) => {
    setActiveButton(item);
  };

  return (
    <div>
      <section>
        <p className="font-bold text-xl mb-3 mt-10">포스트 검색 결과</p>
        <div className="h-1/2">
          {postList.map((value, index) => (
            <Link to={`/notion/${value._id}`}>
              <button
                key={index}
                className="bg-gray-100 h-32 w-full rounded-md shadow-lg mb-5 p-5 flex flex-col transition-transform duration-300 ease-in-out hover:bg-gray-200 hover:shadow-xl"
              >
                <p className="font-bold text-lg mb-3">
                  {value.title || "제목 없음"}
                </p>
                <div className="mb-2 text-sm flex">
                  {value.currentMember === value.meetingCapacity ? (
                    <p className="text-rose-600	 font-bold">모집 마감</p>
                  ) : (
                    <p className="text-lime-400 font-bold">모집 중</p>
                  )}
                  <span className="mx-3 opacity-5">|</span>
                  {value.meetingTime || "기간 없음"}
                </div>
                <div className="text-sm flex">
                  {value.meetingSpot.split(",")[0] || "장소 없음"}{" "}
                  {/* 첫 번째 값(장소)만 표시하기 */}
                  <span className="mx-3 opacity-5">|</span>
                </div>
              </button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
export default SearchPost;
