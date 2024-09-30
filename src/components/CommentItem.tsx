import React, { useState, useEffect, useRef } from "react";
import iconUser from "../assets/defaultProfileImg.svg";
import iconMore from "../assets/icon_more.svg";
import axios from "axios";
import { useParams } from "react-router-dom";

interface CommentProps {
  author: {};
  comment: string;
}

const CommentItem = ({ item }: CommentProps): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);
  const timerRef = useRef<number | null>(null);
  const { id } = useParams();

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3Mzk3NTY0fQ.ziDMvpbQF6K61P2POdELAiyLocTIMZ7IZGbe8ZiYlqg`;

  const toggleOptions = () => {
    setShowOptions(true);

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setShowOptions(false);
      timerRef.current = null;
    }, 5000);
  };

  const handleEdit = async () => {
    // 수정 로직
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://kdt.frontend.5th.programmers.co.kr:5009/comments/delete`,
        {
          data: {
            id: item._id, // 삭제할 댓글의 ID
          },
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰 추가
          },
        }
      );
      console.log("댓글 삭제 성공");
    } catch (error) {
      console.log("댓글 삭제 에러", error);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex items-start w-full">
      <div className="w-10 mr-4 flex-shrink-0">
        <img
          src={iconUser}
          alt="user-icon"
          className="w-full h-full object-cover rounded-full overflow-hidden"
        />
      </div>
      <div className="flex-grow">
        <div className="text-sm mb-2 font-bold">{item.author.fullName}</div>
        <div className="text-base">{item.comment}</div>
      </div>
      {item.author.fullName === "STYLED 관리자" && (
        <div className="absolute top-0 right-0">
          {!showOptions ? (
            <img
              src={iconMore}
              alt="more-options"
              className="w-6 h-6 object-contain cursor-pointer"
              onClick={toggleOptions}
            />
          ) : (
            <div className="flex items-center">
              <div
                className="cursor-pointer hover:underline"
                onClick={handleEdit}
              >
                수정
              </div>
              <div className="mx-4 text-gray-300">|</div>
              <div
                className="cursor-pointer text-red-500 hover:underline"
                onClick={() => handleDelete()}
              >
                삭제
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
