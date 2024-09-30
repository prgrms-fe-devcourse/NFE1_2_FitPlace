import React, { useState } from "react";
import Health_post from "../components/Health_post";
import Button from "../components/Button";
const SearchPost = (props) => {
    const exerciseList = ["전체", "축구", "야구", "러닝", "자전거"];
    const [activeButton, setActiveButton] = useState("전체");
    const { postList } = props;
    const data = postList;
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
                    {data.map((value) => (
                        <Health_post
                            title={value.title}
                            channel_name={value._id}
                            id={value._id}
                            key={value._id}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};
export default SearchPost;
