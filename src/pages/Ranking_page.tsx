import React from "react";
import Header from "../components/Header";
import Ranking_Title from "../assets/Ranking_title.svg";
import TestImg from "../assets/Testimg.svg";

const Ranking_page = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen bg-white w-140 overflow-y-hidden border-2 border-white border-t-gray-400">
        <img className="mt-8" src={Ranking_Title} alt="Ranking_Title" />
        <section className="flex justify-center mt-10">
          <div className="flex flex-col justify-center text-center">
            <img
              src={TestImg}
              alt="test img"
              className="mx-5 rounded-full border-8 border-gray-200 w-36 h-36 mb-3"
            />
            <p className="text-2xl">한승철</p>
            <p className="text-sm">운동횟수</p>
          </div>
          <div className="flex flex-col justify-center text-center">
            <img
              src={TestImg}
              alt="test img"
              className="mx-5 rounded-full border-8 border-amber-200 mb-3"
            />
            <p className="text-2xl">한승철</p>
            <p className="text-sm">운동횟수</p>
          </div>
          <div className="flex flex-col justify-center text-center">
            <img
              src={TestImg}
              alt="test img"
              className="mx-5 rounded-full border-8 border-amber-400 w-36 h-36 mb-3"
            />
            <p className="text-2xl">한승철</p>
            <p className="text-sm">운동횟수</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ranking_page;
