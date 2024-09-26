import React from "react";

const Rank = ({ name, img, count }) => {
  return (
    <div className="flex items-center justify-between w-full border-2 border-white border-b-gray-400 p-5">
      <div className="flex items-center">
        <img src={img} alt="profile" className="mr-3" />
        <p className="font-bold text-xl">{name}</p>
      </div>
      <p className="font-bold text-md">참여 횟수: {count}회</p>
    </div>
  );
};

export default Rank;
