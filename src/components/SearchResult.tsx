import React from "react";
import Health_post from "../components/Health_post";
import Button from "../components/Button";

const SearchResult = () => {
    return (
        <div>
            <div className="postCategory">
                <Button label="전체" color="green" size="mid" />
                <Button label="러닝" color="grey" size="mid" />
                <Button label="풋살" color="grey" size="mid" />
                <Button label="야구" color="grey" size="mid" />
                <Button label="테니스" color="grey" size="mid" />
                <Button label="자전거" color="grey" size="mid" />
            </div>
            <section>
                <p className="font-bold mt-11 text-xl mb-3">인기 모임</p>
                <div className="h-1/2">
                    <Health_post title={"러닝 크루 모집"} />
                    <Health_post title={"배드민턴 치실분"} />
                    <Health_post title={"서로 헬스 보조해요!"} />
                    <Health_post title={"4:4 풋살 인원 구합니다"} />
                    <Health_post title={"1:1 농구 해요!"} />
                </div>
            </section>
        </div>
    );
};

export default SearchResult;
