import React from "react";

const Popular_sports = ({ name }) => {
  return (
    <button className="bg-gray-100 p-5 w-48 h-24 rounded-md shadow-lg m-2 text-left font-bold">
      {name} 모임
    </button>
  );
};

export default Popular_sports;
