import React, { useState } from "react";

const Navbar = () => {
  const [nav_on, setNav_on] = useState(false);

  const navHandler = () => {
    setNav_on(!nav_on);
  };

  return (
    <>
      {nav_on ? (
        <div className="w-140 fixed bottom-0 flex flex-col items-center border-2 border-gray-300 border-b-gray-200">
          <button className="bg-gray-200 w-full h-[10px]" onClick={navHandler}>
            ...
          </button>
          <div className="w-full h-[46px] bg-gray-200"></div>
        </div>
      ) : (
        <div className="w-140 fixed bottom-0 flex flex-col items-center border-2 border-gray-300 border-b-gray-200">
          <button
            className="bg-gray-200 w-full h-[10px]"
            onClick={navHandler}
          ></button>
        </div>
      )}
    </>
  );
};

export default Navbar;
