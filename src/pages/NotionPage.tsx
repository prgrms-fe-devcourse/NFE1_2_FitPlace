import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/FitPlaceLogo.svg";
import favorite from "../assets/favorite.svg";
import commentIcon from "../assets/commentIcon.svg";
import NotionItem from "../components/NotionItem";
import Button from "../components/Button";
import Header from "../components/Header";
import KakaoMap from "./KakaoMap"; // KakaoMap 컴포넌트 불러오기
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Channel, PostType } from "../types/models";
import { useSelector } from "react-redux";
import axios from "axios";
import CurrentMemberItem from "../components/CurrentMemberItem";

interface ParsedPost {
    _id: string;
    title: string;
    meetingCapacity: number;
    currentMember: string[]; // 모집인원 참가신청
    channel: string;
    meetingTime: string;
    meetingInfo: string;
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
    const API_URL = "https://kdt.frontend.5th.programmers.co.kr:5009";

    const { id } = useParams();
    const postId = id;
    const modalBackground = useRef();

    const [deleteModal, setDeleteModal] = useState(false);
    const [PrevData, setPrevData] = useState<PostType | null>(null); //파싱하기 전의 데이터

    const [postData, setPostData] = useState<ParsedPost | null>(null);
    const [location, setLocation] = useState<{
        address: string;
        lat: number;
        lng: number;
    } | null>(null);
    const [currentMember, setCurrentMember] = useState<string[]>([]);
    const [userName, setUserName] = useState<string>("허허");

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
                title: parsedTitle.title,
                meetingCapacity: parseInt(parsedTitle.meetingCapacity, 10),
                currentMember: parsedTitle.currentMember,
                channel: parsedTitle.channel,
                meetingDate: parsedTitle.meetingDate,
                meetingStartTime: parsedTitle.meetingStartTime,
                meetingEndTime: parsedTitle.meetingEndTime,
                isTimeFlexible: parsedTitle.isTimeFlexible,
                meetingSpot: parsedTitle.meetingSpot,
                image: parsedTitle.image,
            };
        } catch (error) {
            console.error("Error parsing post title:", error);
            return post;
        }
    };

    // 참가신청 클릭 시 모집-----------------------------------------------------------
    const fetchPostData = async () => {
        try {
            const response = await fetch(`${API_URL}/posts/${postId}`, {
                headers: {},
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

    useEffect(() => {
        fetchPostData();
    }, [currentMember, id]);

    if (!postData) {
        return <div>Loading...</div>;
    }

    const channelId = PrevData?.channel._id;

    const handleJoin = () => {
        setUserName(`userName`); // 실제 로그인 시스템에서 가져와야 함
        if (!postData.currentMember?.includes(userName)) {
            // 여기에 서버로 업데이트된 정보를 보내는 API 호출 추가
            setCurrentMember([...postData.currentMember, userName]);
            console.log(userName);
            handleCurrentMember([...postData.currentMember, userName]);
            console.log([...postData.currentMember, userName]);
        } else {
            alert("이미 참가 신청하셨습니다.");
        }
    };
    const handleLeave = () => {
        if (postData.currentMember?.includes(userName)) {
            const updatedMembers = postData.currentMember.filter(
                (member) => member !== userName
            );
            setCurrentMember(updatedMembers);
            handleCurrentMember(updatedMembers);
        } else {
            alert("참가 신청을 하지 않았습니다.");
        }
    };
    const updatePostData = async (updatedTitleString: string) => {
        try {
            console.log(updatedTitleString);
            const reqBody = {
                postId: postId,
                title: updatedTitleString,
                channelId: channelId,
                image: null,
                imageToDeletePublicId: null,
            };

            const response = await axios.put(
                `https://kdt.frontend.5th.programmers.co.kr:5009/posts/update`,
                reqBody,
                {
                    headers: {
                        Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3ODc2Njg2fQ.O3_t47pHP0SeUQt3jUNTezVVLTHQhqCzOnHf4iqrtZ8`,
                    },
                }
            );

            console.log("서버 업데이트 성공");
            // 업데이트 성공 후 포스트 데이터를 다시 가져옵니다.
            await fetchPostData();
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "서버 업데이트 중 오류 발생:"
                    // error.response?.data || error.message
                );
            } else {
                console.error("서버 업데이트 중 알 수 없는 오류 발생:", error);
            }
            throw error;
        }
    };

    const handleCurrentMember = async (members: string[]) => {
        try {
            postData.currentMember = members;

            const updatedData = {
                title: postData.title,
                meetingCapacity: postData.meetingCapacity,
                currentMember: postData.currentMember,
                channel: postData.channel,
                meetingTime: postData.meetingTime,
                isTimeFlexible: postData.isTimeFlexible,
                meetingSpot: postData.meetingSpot,
                image: postData.image,
            };

            const updatedTitleString = JSON.stringify(updatedData);
            console.log("업데이트한 타이틀스트링", updatedTitleString);

            const updatedPost = await updatePostData(updatedTitleString);

            if (updatedPost) console.log("업데이트된 게시물", updatedPost);
            // 성공 처리
        } catch (error) {
            console.error("게시물 업데이트 실패:", error);
            // 오류 처리
        }
    };
    const renderButton = () => {
        if (postData.currentMember.includes(userName)) {
            return (
                <Button
                    label="참가 취소"
                    size="full"
                    color="line"
                    disabled={false}
                    onClick={handleLeave} // 참가 취소 버튼 클릭 시 호출
                />
            );
        } else if (
            postData.currentMember.length > 0 &&
            postData.currentMember.length === postData.meetingCapacity
        ) {
            return (
                <Button
                    label="모집 마감"
                    size="full"
                    color="green"
                    disabled={true}
                />
            );
        } else {
            return (
                <Button
                    label="참가 신청하기"
                    size="full"
                    color="green"
                    onClick={handleJoin}
                />
            );
        }
    };
    // 참가신청 버튼완료 ------------------------------------------------------------

    return (
        <>
            <Header />
            <div className="bg-white w-[640px] h-full">
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
                                        />
                                        <Button
                                            label="취소"
                                            size="mid"
                                            color="green"
                                            onClick={() =>
                                                setDeleteModal(false)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <section>
                        <div>
                            <div className="flex justify-between">
                                {postData.currentMember.length ===
                                postData.meetingCapacity ? (
                                    <p className="text-sm text-rose-600 font-bold">
                                        모집 마감
                                    </p>
                                ) : (
                                    <p className="text-sm text-[#AFE327] font-bold">
                                        모집 중
                                    </p>
                                )}

                                <div className="text-xs text-[#898989] flex gap-2">
                                    <button>수정</button>|
                                    <button
                                        onClick={() => setDeleteModal(true)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold">
                                {postData.title}
                            </h3>
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
                                    {postData.meetingTime || ""}
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="mt-7">
                        <div>
                            <NotionItem content={postData.meetingInfo} />
                        </div>
                        {postData.image && postData?.image.length > 0 ? (
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
                                멤버{" "}
                                {postData.currentMember.length > 0
                                    ? postData.currentMember.length
                                    : 0}{" "}
                                / {postData.meetingCapacity}명
                            </p>
                        </div>
                        <div className="flex gap-10 ">
                            {postData.currentMember &&
                            postData?.currentMember.length > 0 ? (
                                postData.currentMember.map((item, idx) => (
                                    <CurrentMemberItem
                                        key={idx}
                                        userName={item}
                                    />
                                ))
                            ) : (
                                <p>아직 참가자가 없습니다.</p>
                            )}
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
                                    location={{
                                        lat: location.lat,
                                        lng: location.lng,
                                    }}
                                    style={{ height: "300px" }}
                                />
                            </div>
                        )}
                    </section>
                    <div className="mt-5 flex justify-between">
                        <div className="w-10/12">{renderButton()}</div>
                        <div className="flex gap-2.5">
                            <div className="w-8">
                                <button>
                                    <img src={favorite} alt="좋아요버튼" />
                                </button>
                            </div>
                            <div className="w-8">
                                <Link to={`/notion/${id}/comments`}>
                                    <button>
                                        <img
                                            src={commentIcon}
                                            alt="메세지버튼"
                                        />
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
