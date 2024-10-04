import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import Search from "../assets/Search.svg";

interface SearchBarProps {
    getValue: (value: string) => void;
    value?: string; // value는 string 또는 undefined로 지정
    inputValue?: string;
    handleKeydown?: any;
}
const Search_bar: React.FC<SearchBarProps> = ({ value = "", getValue, handleKeydown }) => {

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
          
            />

        </div>
    );

}



export default Search_bar;
