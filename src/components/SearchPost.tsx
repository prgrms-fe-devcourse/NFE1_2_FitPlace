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
            onClick={() => console.log(postList)} // 데이터를 콘솔에 출력해봅니다.}
          />
        ))}
      </div>
      <section>
        <p className="font-bold text-xl mb-3">검색 결과</p>
        <div className="h-1/2">
          {data.map((value, index) => (
            <Health_post
              title={value.title}
              channel_name={value.channel.name}
              id={value._id}
              key={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
const SearchPost = (props) => {
    const exerciseList = ["전체", "축구", "야구", "러닝", "자전거"];
    const [activeButton, setActiveButton] = useState("전체");
    const {postList} = props;

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
                    {postList.map((value, index) => (
                             <Health_post
                             title={value.title}
                             channel_name={value.name}
                             id={value._id}
                             key={index}
                           />
           
                    ))}
                
                </div>
            </section>
        </div>
    );
};
export default SearchPost;
