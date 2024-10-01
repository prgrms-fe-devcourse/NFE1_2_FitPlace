import React, { useState, useEffect, useRef } from "react";
import iconUser from "../assets/defaultProfileImg.svg";
import iconMore from "../assets/icon_more.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

interface CommentProps {
  author: {};
  comment: string;
}

const CommentItem = ({ item }: CommentProps): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);
  const timerRef = useRef<number | null>(null);
  const { id } = useParams();

  const [cookies] = useCookies(["token"]);

  const token = cookies.token;

  // const toggleOptions = () => {

  //   setShowOptions(true);

  //   if (timerRef.current !== null) {
  //     clearTimeout(timerRef.current);
  //   }

  //   timerRef.current = window.setTimeout(() => {
  //     setShowOptions(false);
  //     timerRef.current = null;
  //   }, 5000);
  // };

  // const handleEdit = async () => {
  //   // 수정 로직
  // };

  let parsingObject;
  try {
    // 이중 파싱: 이스케이프된 문자열을 먼저 일반 문자열로 변환 후 JSON 파싱
    parsingObject = JSON.parse(item.author.fullName);
    console.log("parsing", parsingObject);
  } catch (error) {
    console.error("JSON 파싱 오류:", error);
    parsingObject = {};
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");

    if (isConfirmed) {
      try {
        await axios.delete(
          `https://kdt.frontend.5th.programmers.co.kr:5009/comments/delete`,
          {
            data: {
              id: item._id, // 삭제할 댓글의 ID
            },
            headers: {
              Authorization: `${token}`, // JWT 토큰 추가
            },
          }
        );
        console.log("댓글 삭제 성공");
      } catch (error) {
        alert("삭제 할 수 없는 댓글입니다.");
        console.log("댓글 삭제 에러", error);
      }
    } else {
      console.log("삭제가 취소되었습니다.");
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
        <div className="text-sm mb-2 font-bold">{parsingObject.fullName}</div>
        <div className="text-base">{item.comment}</div>
      </div>
      {item.author.fullName && (
        <div className="absolute top-0 right-0">
          {/* {!showOptions ? (
            <img
              src={iconMore}
              alt="more-options"
              className="w-6 h-6 object-contain cursor-pointer"
              onClick={toggleOptions}
            />
          ) : ( */}
          <div className="flex items-center">
            {/* <div
                className="cursor-pointer hover:underline"
                onClick={handleEdit}
              >
                수정
              </div> */}
            <div
              className="cursor-pointer text-red-400 hover:underline text-sm"
              onClick={() => handleDelete()}
            >
              삭제
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
