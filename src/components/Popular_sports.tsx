import React from "react";

const Popular_sports = ({ name }) => {
  return (
    <button className="bg-gray-100 p-5 w-48 h-24 rounded-md shadow-lg m-2 text-left font-bold transition-transform duration-300 ease-in-out hover:bg-gray-200  hover:shadow-xl">
      {name} 모임
    </button>
  );
};

export default Popular_sports;
