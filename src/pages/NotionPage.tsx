import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/FitPlaceLogo.svg";
import iconUser from "../assets/icon_user_profile.svg";
import favorite from "../assets/favorite.svg";
import commentIcon from "../assets/commentIcon.svg";
import NotionItem from "../components/NotionItem";
import Button from "../components/Button";
import Header from "../components/Header";
import KakaoMap from "./KakaoMap"; // KakaoMap 컴포넌트 불러오기
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

interface ParsedPost {
  _id: string;
  actualTitle: string;
  meetingCapacity: number;
  currentMember: number;
  channel: string;
  meetingDate: string;
  meetingInfo: string;
  meetingStartTime: string;
  meetingEndTime: string;
  isTimeFlexible: boolean;
  meetingSpot: string;
  image: [];
  author: string;
  createdAt: string;
  updatedAt: string;
  likes: any[];
  comments: any[];
}

const NotionPage = () => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const modalBackground = useRef();
  const { id } = useParams();

  const [postData, setPostData] = useState<ParsedPost | null>(null);
  const [PrevData, setPrevData] = useState({});
  const [location, setLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);

  const parsePostData = (post: any): ParsedPost => {
    try {
      const parsedTitle = JSON.parse(post.title);

      const [address, lat, lng] = parsedTitle.meetingSpot.split(",");

      setLocation({
        address,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });

      return {
        ...post,
        actualTitle: parsedTitle.title,
        meetingCapacity: parseInt(parsedTitle.meetingCapacity, 10),
        currentMember: parseInt(parsedTitle.currentMember, 10),
        channel: parsedTitle.channel,
        meetingDate: parsedTitle.meetingDate,
        meetingTime: parsedTitle.meetingTime,
        isTimeFlexible: parsedTitle.isTimeFlexible,
        meetingInfo: parsedTitle.meetingInfo,
        meetingSpot: parsedTitle.meetingSpot,
        image: parsedTitle.image,
      };
    } catch (error) {
      console.error("Error parsing post title:", error);
      return post;
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const API_URL = "https://kdt.frontend.5th.programmers.co.kr:5009";
        const postId = id;
        const response = await fetch(`${API_URL}/posts/${postId}`, {
          headers: {
            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDE0ODU5fQ.Al40jxy-6yrAoANrY3fQA1joeNw08-fjByus_ZfxXSk`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const parsedData = parsePostData(data);
        setPostData(parsedData);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [id]);

  if (!postData) {
    return <div>Loading...</div>;
  }
  //게시글 삭제 코드 입니다. 충돌 방지--------------------------------------------------------
  const Delete_post = async () => {
    try {
      await axios.delete(
        `https://kdt.frontend.5th.programmers.co.kr:5009/posts/delete/`,
        {
          headers: {
            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDE0ODU5fQ.Al40jxy-6yrAoANrY3fQA1joeNw08-fjByus_ZfxXSk`,
          },
          data: {
            id: id,
          },
        }
      );

      navigate("/");
    } catch (error) {
      console.log("게시글 삭제 실패", error);
    }
  };
  //-------------------------------------------
  return (
    <>
      <Header />
      <div className="bg-white w-[640px] min-h-screen">
        <div id="container" className="m-5 relative">
          {deleteModal && (
            <div className="flex justify-center absolute w-full h-full backdrop-blur-sm items-center">
              <div
                className="w-[400px] h-[200px] flex justify-center items-center border-2 border-solid border-[#000000] rounded-xl bg-white"
                onClick={(e) => {
                  if (e.target === modalBackground.current) {
                    setDeleteModal(false);
                  }
                }}
              >
                <div>
                  <p>게시글을 삭제할까요?</p>
                  <div className="flex gap-5 mt-2">
                    <Button
                      label="삭제"
                      size="mid"
                      color="green"
                      onClick={Delete_post}
                    />
                    <Button
                      label="취소"
                      size="mid"
                      color="green"
                      onClick={() => setDeleteModal(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <section>
            <div>
              <div className="flex justify-between">
                {postData.currentMember === postData.meetingCapacity ? (
                  <p className="text-sm text-rose-600 font-bold">모집 마감</p>
                ) : (
                  <p className="text-sm text-[#AFE327] font-bold">모집 중</p>
                )}

                <div className="text-xs text-[#898989] flex gap-2">
                  <Link to={`/notionFix/${id}`}>
                    <button>수정</button>
                  </Link>
                  |<button onClick={() => setDeleteModal(true)}>삭제</button>
                </div>
              </div>

              <h3 className="text-2xl font-bold">{postData.actualTitle}</h3>
              <p className="text-lg text-[#666666] pt-2.5"></p>
            </div>
          </section>
          <section className="mt-7">
            <div className="flex flex-col gap-3">
              <div className="flex gap-5">
                <p className="text-lg font-bold">장소</p>
                {/* 장소명만 표시 */}
                <p className="text-sm text-[#7e7e7e]">
                  {location?.address || "장소 없음"}
                </p>
              </div>
              <div className="flex gap-5">
                <p className="text-lg font-bold">일시</p>
                <p className="text-sm text-[#7e7e7e]">
                  {postData.meetingTime || "시간 무관"}
                </p>
              </div>
            </div>
          </section>
          <section className="mt-7">
            <div>
              <NotionItem content={postData.meetingInfo} />
            </div>
            {postData.image && postData.image.length > 0 ? (
              postData.image.map((URL, i) => (
                <div
                  className="flex flex-wrap justify-center border-2 border-gray-200 my-2"
                  key={i}
                >
                  <img
                    className="w-96 h-96"
                    src={URL}
                    alt="게시글사진"
                    id="notionImg"
                  />
                </div>
              ))
            ) : (
              <p className="my-10">사진이 없습니다.</p>
            )}
          </section>
          <section className="mt-11 flex flex-col gap-5">
            <div>
              <p className="text-lg font-bold">
                멤버 <span>{postData.currentMember || "0명"}</span> /{" "}
                {postData.meetingCapacity}명
              </p>
            </div>
            <div className="flex gap-10 ">
              <div className="flex flex-col text-center gap-1.5">
                <img src={iconUser} alt="프로필이미지" />
                <p>풋살풋살</p>
              </div>
              <div className="flex flex-col text-center gap-1.5">
                <img src={iconUser} alt="프로필이미지" />
                <p>김동동</p>
              </div>
            </div>
          </section>
          <section className="mt-14">
            <div className="flex flex-col gap-4">
              <p className="text-lg font-bold">운동장소</p>
              <p className="text-sm text-[#7e7e7e]">
                {location?.address || "장소 없음"}
              </p>
            </div>
            {/* 지도 표시 */}
            {location && (
              <div className="mt-4">
                <KakaoMap
                  isMarkerFixed={true}
                  location={{ lat: location.lat, lng: location.lng }}
                  style={{ height: "300px" }}
                />
              </div>
            )}
          </section>
          <div className="mt-5 flex justify-between">
            <div className="w-10/12">
              <Button label="참가 신청하기" size="full" color="green" />
            </div>
            <div className="flex gap-2.5">
              <div className="w-8">
                <button>
                  <img src={favorite} alt="좋아요버튼" />
                </button>
              </div>
              <div className="w-8">
                <Link to={`/notion/${id}/comments`}>
                  <button>
                    <img src={commentIcon} alt="메세지버튼" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotionPage;
