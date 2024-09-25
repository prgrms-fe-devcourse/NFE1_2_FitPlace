import React from "react";
import Search from "../assets/Search.svg";
import Popular_sports from "../components/Popular_sports";
import Health_post from "../components/Health_post";
import Search_bar from "../components/Search_bar";

const Mainpage = () => {
    return (
        <div className="w-140 min-h-screen bg-white p-3">
            {/* 검색창 */}
            <Search_bar placeholder="검색" />
            <section className="mt-11">
                <p className="font-bold mt-11 text-xl mb-3">인기종목</p>
                <div className="flex">
                    <Popular_sports name={"축구"} />
                    <Popular_sports name={"야구"} />
                    <Popular_sports name={"헬스"} />
                </div>
                <div className="flex mx-24">
                    <Popular_sports name={"런닝"} />
                    <Popular_sports name={"농구"} />
                </div>
            </section>
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
    );
};

export default Mainpage;
