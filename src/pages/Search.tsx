import React, { useState } from "react";
import Button from "../components/Button";
import Search_bar from "../components/Search_bar";
import SearchPost from "../components/SearchPost";

const Search = () => {
    const searchCategory = ["포스트", "사용자"];
    const [activeButton, setActiveButton] = useState(searchCategory[0]);

    const handleButtonClick = (item: string) => {
        setActiveButton(item);
    };

    return (
        <div className="w-140 min-h-screen bg-white p-3">
            <section className="mb-6">
                <Search_bar placeholder="검색어를 입력해주세요." />
            </section>
            <div className="mb-4 flex">
                {searchCategory.map((category, index) => (
                    <Button
                        key={index}
                        label={category}
                        color={activeButton === category ? "green" : "grey"}
                        size="mid"
                        margin="btnMr"
                        onClick={() => handleButtonClick(category)}
                    />
                ))}
            </div>
            <SearchPost />
        </div>
    );
};

export default Search;
