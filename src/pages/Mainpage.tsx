import React, { useEffect, useState } from "react";
import Search from "../assets/Search.svg";
import Popular_sports from "../components/Popular_sports";
import Health_post from "../components/Health_post";
import Search_bar from "../components/Search_bar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQueries, useQuery } from "react-query";

interface Posttype {
  likes: [];
  comments: [];
  _id: string;
  title: string;
  channel: {
    name: string;
  };
}

interface Channeltype {
  authRequired: boolean;
  description: string;
  name: string;
  posts: [];
}

const Mainpage = () => {
  const userData = useSelector(
    (state: { currentUser: object }) => state.currentUser
  );

  const FetchChannel = async () => {
    const response = await axios.get(
      "https://kdt.frontend.5th.programmers.co.kr:5009/channels"
    );
    console.log("채널 데이터 가져옴");
    return response.data;
  };

  const FetchPost = async () => {
    const response = await axios.get(
      "https://kdt.frontend.5th.programmers.co.kr:5009/posts"
    );
    console.log("포스트 데이터 가져옴");
    return response.data;
  };

  const {
    isLoading: isChannelLoading,
    data: channelData,
    isError: isChannelError,
  } = useQuery("get-channel", FetchChannel);

  const {
    isLoading: isPostLoading,
    data: PostData,
    isError: isPostError,
  } = useQuery("get-post", FetchPost);

  if (isChannelLoading || isPostLoading) {
    return <div>Loading...</div>;
  }

  if (isChannelError || isPostError) {
    return <div>Error 발생</div>;
  }

  const Sort_Channel = channelData || [];

  const Sort_Post = PostData || [];

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
            <p className="font-bold mt-11 text-xl mb-3">인기 종목</p>
            <div className="flex">
              <Popular_sports
                name={Sort_Channel[13].name}
                description={Sort_Channel[0].description}
                postLength={Sort_Channel[0].posts.length}
              />
              <Popular_sports
                name={Sort_Channel[14].name}
                description={Sort_Channel[1].description}
                postLength={Sort_Channel[1].posts.length}
              />
              <Popular_sports
                name={Sort_Channel[15].name}
                description={Sort_Channel[2].description}
                postLength={Sort_Channel[2].posts.length}
              />
            </div>
            <div className="flex mx-24">
              <Popular_sports
                name={Sort_Channel[11].name}
                description={Sort_Channel[3].description}
                postLength={Sort_Channel[3].posts.length}
              />
              <Popular_sports
                name={Sort_Channel[12].name}
                description={Sort_Channel[4].description}
                postLength={Sort_Channel[4].posts.length}
              />
            </div>
          </section>
        )}

        <section>
          <p className="font-bold mt-11 text-xl mb-3">인기 모임</p>

          <div className="h-1/2">
            {Sort_Post.length > 0 &&
              Sort_Post.map((post, index) => (
                <Health_post
                  title={post.title}
                  channel_name={post.channel?.name}
                  id={post._id}
                  key={index}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Mainpage;
