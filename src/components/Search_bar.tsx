import React, { useEffect, useState } from "react";
import Search from "../assets/Search.svg";

interface SearchBarProps {
    placeholder?: string;
}
const Search_bar: React.FC<SearchBarProps> = ({ placeholder }) => {

    return (
        <div className="relative w-full">
            <img
                src={Search}
                alt="search-icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-75"
            />
            <input
                className="bg-gray-100 h-8 w-full rounded-md shadow-lg p-5 pl-10"
                placeholder={placeholder}
                type="text"
            />
        </div>
    );
};

export default Search_bar;
