import React, { useState } from "react";
import Button from "../components/Button";
import Search_bar from "../components/Search_bar";
import SearchResult from "../components/SearchResult";

const Search = () => {
    const buttons = ["포스트", "사용자"];
    const [activeButton, setActiveButton] = useState(buttons[0]);

    const handleButtonClick = (item: string) => {
        setActiveButton(item);
    };

    return (
        <div className="w-140 min-h-screen bg-white p-3">
            <section className="mb-6">
                <Search_bar placeholder="검색어를 입력해주세요." />
            </section>
            <div className="mb-4 flex">
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        label={button}
                        color={activeButton === button ? "green" : "grey"}
                        size="mid"
                        margin="btnMr"
                        onClick={() => handleButtonClick(button)}
                    />
                ))}
            </div>
            <SearchResult />
        </div>
    );
};

export default Search;
