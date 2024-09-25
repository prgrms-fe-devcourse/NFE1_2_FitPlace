import React from "react";
import Button from "../components/Button";

const Search = () => {
    return (
        <div className="w-140 h-full border-solid border-2 border-neutral-400">
            <div className="searchInput">
                <input type="text" placeholder="검색어를 입력해주세요." />
            </div>
            <div className="searchCategory">
                <Button label="포스트" color="green" size="mid" />
                <Button label="사용자" color="grey" size="mid" />
            </div>
            <div className="postCategory">
                <Button label="전체" color="green" size="mid" />
                <Button label="러닝" color="grey" size="mid" />
                <Button label="풋살" color="grey" size="mid" />
                <Button label="야구" color="grey" size="mid" />
                <Button label="테니스" color="grey" size="mid" />
                <Button label="자전거" color="grey" size="mid" />
            </div>
        </div>
    );
};

export default Search;
