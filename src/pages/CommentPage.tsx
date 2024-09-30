import React, { useEffect, useState } from "react";
import CommentItem from "../components/CommentItem";
import Button from "../components/Button";
import { json, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

// Comment 타입 정의
interface Comment {
  comment: string;
  author: {
    fullName?: string;
  };
  post: string;
}
const CommentPage = (): JSX.Element => {
  const { id } = useParams();
  const [Post, setPost] = useState();
  const [Input_value, setInput_value] = useState("");
  const [ParsingData, setParsingData] = useState("");
  const [cookies] = useCookies(["token"]);

  const token = cookies.token;

  const CommentLoading = async () => {
    try {
      const response = await axios.get(
        `https://kdt.frontend.5th.programmers.co.kr:5009/posts/${id}`
      );
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Post) {
      try {
        const parsedTitle = JSON.parse(Post.title);
        setParsingData(parsedTitle);
      } catch (error) {}
    }
  }, [Post]);

  const Input_comment = (e) => {
    setInput_value(e.target.value);
  };

  const Register_comment = async () => {
    try {
      await axios.post(
        `https://kdt.frontend.5th.programmers.co.kr:5009/comments/create`,
        {
          comment: Input_value,
          postId: id,
        },
        {
          headers: {
            Authorization: `${token}`, // JWT 토큰 추가
          },
        }
      );
      setInput_value("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CommentLoading();
  }, [Post]);

  return (
    <>
      <div className="relative bg-white w-140 mx-auto min-h-screen flex flex-col">
        <div className="flex-grow p-3">
          {ParsingData.currentMember === ParsingData.meetingCapacity ? (
            <div className="text-sm text-rose-600 mb-1 font-bold">
              모집 마감
            </div>
          ) : (
            <div className="text-sm text-[#AFE327] mb-1 font-bold">모집중</div>
          )}

          <div className="text-xl font-bold mb-4">
            {ParsingData.title || "제목 없음"}
          </div>

          <div className="text-sm text-gray-600 mb-8">
            {Post && Post.channel.name}
          </div>

          {Post &&
            Post.comments.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-100 w-full  rounded-md shadow-lg mb-5 p-4 flex flex-col"
              >
                <CommentItem item={item} />
              </div>
            ))}

          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
            <div className="flex w-full">
              <textarea
                placeholder="댓글을 입력하세요"
                className="flex-1 border rounded-[4px] mr-4 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                onChange={(e) => Input_comment(e)}
                value={Input_value}
              />
              <Button
                label="등록"
                size="small"
                onClick={() => Register_comment()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentPage;
