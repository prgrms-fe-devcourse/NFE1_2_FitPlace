import React from "react";
import Button from "../components/Button";
import Search_bar from "../components/Search_bar";
import SearchResult from "../components/SearchResult";

const Search = () => {
    return (
        <div className="w-140 min-h-screen bg-white p-3">
            <section className="mb-6">
                <Search_bar placeholder="검색어를 입력해주세요." />
            </section>
            <div className="mb-4 flex">
                <Button label="포스트" color="green" size="mid" />
                <Button label="사용자" color="grey" size="mid" />
            </div>
            <SearchResult />
        </div>
    );
};

export default Search;
