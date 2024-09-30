import React, { useEffect, useState } from "react";
import CommentItem from "../components/CommentItem";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const [comment, setComment] = useState();

  const CommentLoading = async () => {
    try {
      const response = await axios.get(
        `https://kdt.frontend.5th.programmers.co.kr:5009/posts/${id}`
      );
      setComment(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CommentLoading();
  }, []);

  useEffect(() => {
    console.log(comment);
  }, [comment]);

  return (
    <>
      <div className="relative bg-white w-140 mx-auto min-h-screen flex flex-col">
        <div className="flex-grow p-3">
          <div className="text-sm text-[#AFE327] mb-1 font-bold">모집중!</div>
          <div className="text-xl font-bold mb-4">풋살 4 vs 4 모집 ⚽</div>
          <div className="text-sm text-gray-600 mb-8">풋살⚽</div>
          {comment &&
            comment.comments.map((item, idx) => (
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
              />
              <Button label="등록" size="small" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentPage;
