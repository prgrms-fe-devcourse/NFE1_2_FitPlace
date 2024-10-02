import React, { useState } from "react";
import Button from "./Button";

interface NotionCategoryProps {
  onSelect: (category: string) => void;
}

const NotionCategory: React.FC<NotionCategoryProps> = ({ onSelect }) => {
  const exerciseList = [
    "자전거",
    "야구",
    "축구",
    "테니스",
    "농구",
    "직접 입력",
  ];
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (item: string) => {
    setActiveButton(item);
    onSelect(item);
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
    </div>
  );
};

export default NotionCategory;
