import React from "react";

const Health_post = ({ title }) => {
  return (
    <div className="bg-gray-100 h-32 w-full rounded-md shadow-lg mb-5 p-5 flex flex-col">
      <p className="font-bold text-lg mb-3">{title}</p>
      <div className="mb-2 text-sm flex">
        <p className="text-lime-400 font-bold">모집 중!</p>
        <span className="mx-3 opacity-5">|</span>
        2024.09.13 19:00 ~ 20:00
      </div>
      <div className="text-sm flex">
        양재 시민의 숲역
        <span className="mx-3 opacity-5">|</span>
        2명 / 6명
        <span className="mx-3 opacity-5">|</span>
        러닝
      </div>
    </div>
  );
};

export default Health_post;
