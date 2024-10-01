import React, { useState } from "react";
import HomeIcon from "../assets/navbar/Home.svg";
import SearchIcon from "../assets/navbar/Search.svg";
import PostIcon from "../assets/navbar/newPost.svg";
import MyIcon from "../assets/navbar/My.svg";
import RankingIcon from "../assets/navbar/Ranking.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav_on, setNav_on] = useState(false);

  const handleMouseEnter = () => {
    setNav_on(true);
  };

  const handleMouseLeave = () => {
    setNav_on(false);
  };

  return (
    <>
      {nav_on ? (
        <div
          className={`w-140 fixed bottom-0 flex flex-col items-center border-2 border-gray-200 border-b-gray-200 drop-shadow-2xl transition-all duration-300 ${
            nav_on ? "opacity-100 translate-y-0" : "opacity-100 translate-y-12"
          }`}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full h-[56px] bg-white flex justify-between items-center px-20">
            <Link to="/">
              <button className="group mt-3">
                <img
                  src={HomeIcon}
                  alt="Home"
                  className="w-9 h-9 transition-transform duration-200 group-hover:scale-125"
                />
              </button>
            </Link>
            <Link to="/search">
              <button className="group mt-3">
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="w-9 h-9 transition-transform duration-200 group-hover:scale-125"
                />
              </button>
            </Link>
            <Link to="/notionAdd">
              <button className="group mt-3">
                <img
                  src={PostIcon}
                  alt="NewPost"
                  className="w-9 h-9 transition-transform duration-200 group-hover:scale-125"
                />
              </button>
            </Link>
            <Link to="/ranking">
              <button className="group mt-3">
                <img
                  src={RankingIcon}
                  alt="Ranking"
                  className="w-9 h-9 transition-transform duration-200 group-hover:scale-125"
                />
              </button>
            </Link>
            <Link to="/profile">
              <button className="group mt-3">
                <img
                  src={MyIcon}
                  alt="My"
                  className="w-9 h-9 transition-transform duration-200 group-hover:scale-125"
                />
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-140 fixed bottom-0 flex flex-col items-center border-2 border-gray-200 border-b-gray-200 drop-shadow-2xl">
          <button
            className="bg-white w-full h-[15px]"
            onMouseEnter={handleMouseEnter}
          ></button>
        </div>
      )}
    </>
  );
};

export default Navbar;
