import React, { useState } from 'react';
import Button from './Button';

const NotionCategory = () => {

  const exerciseList = ["야구", "축구", "테니스", "농구", "직접 입력"];
  const [activeButton, setActiveButton] = useState("야구");

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
    </div>
  );
};

export default NotionCategory;