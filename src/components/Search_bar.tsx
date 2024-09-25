import React from "react";
import Search from "../assets/Search.svg";

const Search_bar = () => {
  return (
    <div className="relative w-full">
      <img
        src={Search}
        alt="search-icon"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-75"
      />
      <input
        className="bg-gray-100 h-8 w-full rounded-md shadow-lg p-5 pl-10"
        placeholder="원하는 정보를 검색하세요!"
        type="text"
      />
    </div>
  );
};

export default Search_bar;
