import React from "react";
import PostItem from "../components/PostItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonCommon from "../components/ButtonCommon";

const Search = () => {
    return (
        <div className="w-140 h-full border-solid border-2 border-neutral-400">
            <div className="searchInput">
                <input type="text" placeholder="검색어를 입력해주세요." />
            </div>
            <div className="searchCategory">
                <ButtonCommon label="포스트" color="green" size="mid" />
                <ButtonCommon label="사용자" color="grey" size="mid" />
            </div>
            <div className="postCategory">
                <ButtonCommon label="전체" color="green" size="mid" />
                <ButtonCommon label="러닝" color="grey" size="mid" />
                <ButtonCommon label="풋살" color="grey" size="mid" />
                <ButtonCommon label="야구" color="grey" size="mid" />
                <ButtonCommon label="테니스" color="grey" size="mid" />
                <ButtonCommon label="자전거" color="grey" size="mid" />
            </div>
            <div className="contentsBoxWrap">
                <PostItem />
                <PostItem />
                <PostItem />
            </div>
            <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack>
        </div>
    );
};

export default Search;
