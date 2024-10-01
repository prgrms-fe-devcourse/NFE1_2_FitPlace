import React, { useEffect, useState } from "react";
import Search from "../assets/Search.svg";

interface SearchBarProps {
    getValue?: any;
    value?: any;

    placeholder?: string;
    getValue: (value: string) => void;
}
const Search_bar: React.FC<SearchBarProps> = ({ value, getValue}) => {

    function pushValue(e) {
        getValue(e.target.value)
    }


    
const Search_bar: React.FC<SearchBarProps> = ({ placeholder, getValue }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        getValue(event.target.value); // 입력값을 부모로 전달
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
            />

        </div>
    );
};

export default Search_bar;
