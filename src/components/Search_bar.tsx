import React, { ChangeEvent } from "react";
import { useLocation } from "react-router-dom"; // useLocation 훅을 가져옵니다.
import Search from "../assets/Search.svg";

interface SearchBarProps {
  getValue: (value: string) => void;
  value?: string;
  inputValue?: string;
  handleKeydown?: any;
}

const Search_bar: React.FC<SearchBarProps> = ({
  value = "",
  getValue,
  handleKeydown,
}) => {
  const location = useLocation(); // 현재 경로를 가져옵니다.

  const pushValue = (e: ChangeEvent<HTMLInputElement>) => {
    getValue(e.target.value);
  };

  return (
    <div className="relative w-full">
      <img
        src={Search}
        alt="search-icon"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-75"
      />

      <input
        className="bg-gray-100 h-8 w-full rounded-md shadow-lg p-5 pl-10"
        value={value}
        type="text"
        onChange={pushValue}
        onKeyDown={handleKeydown}
        id="invalue"
        autoFocus={location.pathname === "/search"} // 경로가 /search일 때만 자동 포커스 적용
      />
    </div>
  );
};

export default Search_bar;
