import React from "react";

const NotionItem = ({ content }) => {
  return (
    <div className="bg-[#F6F6F6] rounded-[10px] shadow-md p-4 mb-4">
      <div>{content || "내용 없음"}</div>
    </div>
  );
};

export default NotionItem;
