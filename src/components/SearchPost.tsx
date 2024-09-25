import React, { useState } from "react";
import Health_post from "../components/Health_post";
import Button from "../components/Button";

const SearchPost = () => {
    const exerciseList = ["전체", "축구", "야구", "러닝", "자전거"];
    const [activeButton, setActiveButton] = useState("전체");

    const handleButtonClick = (item: string) => {
        setActiveButton(item);
    };
    return (
        <div>
            <div className="mb-10">
                {exerciseList.map((item, index) => (
                    <Button
                        key={index}
                        label={item}
                        color={item === activeButton ? "green" : "grey"}
                        size="mid"
                        margin="btnMr"
                        onClick={() => handleButtonClick(item)}
                    />
                ))}
            </div>
            <section>
                <p className="font-bold text-xl mb-3">인기 모임</p>
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

export default SearchPost;
