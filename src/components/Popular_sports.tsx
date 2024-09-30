import React from "react";

const Popular_sports = ({ name, description, postLength }) => {
  return (
    <button className="bg-gray-100 p-5 w-48 h-32 rounded-md shadow-lg m-2 text-left text-xl font-bold transition-transform duration-300 ease-in-out hover:bg-gray-200  hover:shadow-xl">
      {name} 모임 <br />
      <span className="text-sm font-thin">{description}</span> <br />
      <span className="text-sm font-thin">게시글 {postLength}개</span>
    </button>
  );
};

export default Popular_sports;
