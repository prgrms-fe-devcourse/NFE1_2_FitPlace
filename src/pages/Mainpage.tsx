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
  const [post, setPost] = useState([]);

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

  const Popular_post = async () => {
    try {
      const response = await axios.get(
        "https://kdt.frontend.5th.programmers.co.kr:5009/posts"
      );
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Popular_Channel();
    Popular_post();
  }, []);

  const Sort_Channel = channel
    .sort((a, b) => b.posts.length - a.posts.length)
    .slice(0, 5); //post가 많은 순서대로 정렬.

  const Sort_Post = post
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 6);

  useEffect(() => {
    console.log("post:", Sort_Post);
  }, [Sort_Post]);

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
              <Popular_sports
                name={Sort_Channel[0].name}
                description={Sort_Channel[0].description}
                postLength={Sort_Channel[0].posts.length}
              />
              <Popular_sports
                name={Sort_Channel[1].name}
                description={Sort_Channel[1].description}
                postLength={Sort_Channel[1].posts.length}
              />
              <Popular_sports
                name={Sort_Channel[2].name}
                description={Sort_Channel[2].description}
                postLength={Sort_Channel[2].posts.length}
              />
            </div>
            <div className="flex mx-24">
              <Popular_sports
                name={Sort_Channel[3].name}
                description={Sort_Channel[3].description}
                postLength={Sort_Channel[3].posts.length}
              />
              <Popular_sports
                name={Sort_Channel[4].name}
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
                  channel_name={post.channel.name}
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
