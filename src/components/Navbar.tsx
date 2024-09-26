import React, { useState } from "react";
import HomeIcon from "../assets/navbar/Home.svg";
import SearchIcon from "../assets/navbar/Search.svg";
import PostIcon from "../assets/navbar/newPost.svg";
import MyIcon from "../assets/navbar/My.svg";
import RankingIcon from "../assets/navbar/Ranking.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav_on, setNav_on] = useState(false);

  const navHandler = () => {
    setNav_on(!nav_on);
  };

  return (
    <>
      {nav_on ? (
        <div className="w-140 fixed bottom-0 flex flex-col items-center border-2 border-gray-300 border-b-gray-200">
          <button
            className="bg-white w-full h-[10px]"
            onClick={navHandler}
          ></button>
          <div className="w-full h-[45px] bg-white flex justify-between items-center px-20">
            <Link to="/">
              <button className="group">
                <img
                  src={HomeIcon}
                  alt="Home"
                  className="w-9 h-9 transition-transform duration-200 group-hover:scale-110"
                />
              </button>
            </Link>
            <Link to="/search">
              <button className="group">
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="w-9 h-9 transition-transform duration-200 group-hover:scale-110"
                />
              </button>
            </Link>
            <Link to="/notionAdd">
              <button className="group">
                <img
                  src={PostIcon}
                  alt="NewPost"
                  className="w-9 h-9 transition-transform duration-200 group-hover:scale-110"
                />
              </button>
            </Link>
            <Link to="/ranking">
              <button className="group">
                <img
                  src={RankingIcon}
                  alt="Ranking"
                  className="w-9 h-9 transition-transform duration-200 group-hover:scale-110"
                />
              </button>
            </Link>
            <Link to="/profile">
              <button className="group">
                <img
                  src={MyIcon}
                  alt="My"
                  className="w-9 h-9 transition-transform duration-200 group-hover:scale-110"
                />
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-140 fixed bottom-0 flex flex-col items-center border-2 border-gray-300 border-b-gray-200">
          <button
            className="bg-white w-full h-[10px]"
            onClick={navHandler}
          ></button>
        </div>
      )}
    </>
  );
};

export default Navbar;
