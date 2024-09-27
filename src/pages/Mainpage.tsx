import React, { useEffect, useState } from "react";
import Search from "../assets/Search.svg";
import Popular_sports from "../components/Popular_sports";
import Health_post from "../components/Health_post";
import Search_bar from "../components/Search_bar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";

const Mainpage = () => {
  const [channel, setChannel] = useState([]);

  const Popular_Channel = async () => {
    try {
      const response = await axios.get(
        "https://kdt.frontend.5th.programmers.co.kr:5009/channels"
      );
      setChannel(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Popular_Channel();
  }, []);

  useEffect(() => {
    console.log(channel);
  }, [channel]);

  const Sort_Channel = channel
    .sort((a, b) => b.posts.length - a.posts.length)
    .slice(0, 5); //post가 많은 순서대로 정렬.
  useEffect(() => {
    console.log(Sort_Channel);
  }, [Sort_Channel]);

  return (
    <>
      <Header />
      <div className="w-140 min-h-screen bg-white p-3">
        {/* 검색창 */}
        <Link to="/search">
          <button className="w-full">
            <Search_bar placeholder="검색" />
          </button>
        </Link>
        {Sort_Channel.length > 0 && (
          <section className="mt-11">
            <p className="font-bold mt-11 text-xl mb-3">인기종목</p>
            <div className="flex">
              <Popular_sports name={Sort_Channel[0].name} />
              <Popular_sports name={Sort_Channel[1].name} />
              <Popular_sports name={Sort_Channel[2].name} />
            </div>
            <div className="flex mx-24">
              <Popular_sports name={Sort_Channel[3].name} />
              <Popular_sports name={Sort_Channel[4].name} />
            </div>
          </section>
        )}

        <section>
          <p className="font-bold mt-11 text-xl mb-3">인기 모임</p>
          <div className="h-1/2">
            <Health_post title={"러닝 크루 모집"} />
            <Health_post title={"배드민턴 치실분"} />
            <Health_post title={"서로 헬스 보조해요!"} />
            <Health_post title={"4:4 풋살 인원 구합니다"} />
            <Health_post title={"1:1 농구 해요!"} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Mainpage;
