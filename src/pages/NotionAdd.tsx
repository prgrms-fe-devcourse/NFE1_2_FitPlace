import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import NotionCategory from "../components/NotionCategory";
import KakaoMap from "./KakaoMap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface FormData {
    title: string;
    channel: string;
    currentMember: number;
    meetingCapacity: number;
    meetingDate: string;
    meetingStartTime: string;
    meetingEndTime: string;
    isTimeFlexible: boolean;
    meetingSpot: string;
    image: string | null;
    meetingInfo: string;
}

interface Channel {
    _id: string;
    name: string;
    description: string;
}

const INITIAL_FORM_STATE: FormData = {
    title: "",
    channel: "",
    currentMember: 0,
    meetingCapacity: 0,
    meetingDate: "",
    meetingStartTime: "",
    meetingEndTime: "",
    isTimeFlexible: false,
    meetingSpot: "",
    image: null,
    meetingInfo: "",
};

const API_URL = "https://kdt.frontend.5th.programmers.co.kr:5009";

const NotionAdd = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.userToken);

    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
    const [selectedLocation, setSelectedLocation] = useState<{
        address: string;
        lat: number;
        lng: number;
    } | null>(null);

    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchChannels();
            const savedLocation = sessionStorage.getItem("selectedLocation");
            if (savedLocation) {
                const locationData = JSON.parse(savedLocation);
                setSelectedLocation(locationData);
                setFormData((prev) => ({
                    ...prev,
                    meetingSpot: locationData.address,
                }));
            }
        }
    }, [token, navigate]);

    const fetchChannels = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/channels`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setChannels(data);
        } catch (error) {
            console.error("Error fetching channels:", error);
        }
    }, []);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value, type } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: type === "number" ? parseInt(value, 10) : value,
            }));
        },
        []
    );

    const handleCategorySelect = useCallback((category: string) => {
        setFormData((prev) => ({ ...prev, channel: category }));
    }, []);

    const handleSubmit = async () => {
        const channelId =
            channels.find((ch) => ch.name === formData.channel)?._id || "";

        const meetingTime = formData.isTimeFlexible
            ? `${formData.meetingDate}, 시간 무관`
            : `${formData.meetingDate} ${formData.meetingStartTime} - ${formData.meetingEndTime}`;

        const customJsonData = {
            title: formData.title,
            currentMember: formData.currentMember,
            meetingCapacity: formData.meetingCapacity,
            meetingTime: meetingTime,
            meetingSpot: formData.meetingSpot,
            channel: formData.channel,
            meetingInfo: formData.meetingInfo,
        };

        const submitData = new FormData();
        submitData.append("title", JSON.stringify(customJsonData));
        submitData.append("channelId", channelId);

        try {
            const response = await fetch(`${API_URL}/posts/create`, {
                method: "POST",
                headers: {
                    Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3Mzk3NTY0fQ.ziDMvpbQF6K61P2POdELAiyLocTIMZ7IZGbe8ZiYlqg`,
                },
                body: submitData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error : ${response.status}`);
            }

            const data = await response.json();
            console.log("Post", data);
        } catch (error) {
            console.error(
                "Error: ",
                error instanceof Error ? error.message : String(error)
            );
        }
    };

    const handleLocationClick = useCallback(() => {
        navigate("/map");
    }, [navigate]);

    return (
        <>
            <Header />
            <div className="bg-white w-[640px] h-full">
                <form className="m-5">
                    {/* 모임 이름 */}
                    <div>
                        <label
                            htmlFor="title"
                            className="flex font-bold text-xl mt-6"
                        >
                            모임 이름
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="모임 이름을 입력해주세요."
                            className="border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5"
                        />
                    </div>

                    {/* 모임 인원 */}
                    <div>
                        <label
                            htmlFor="meetingCapacity"
                            className="flex font-bold text-xl mt-6"
                        >
                            모임 인원
                        </label>
                        <input
                            type="number"
                            id="meetingCapacity"
                            name="meetingCapacity"
                            value={formData.meetingCapacity}
                            onChange={handleChange}
                            placeholder="모임 인원을 입력해주세요."
                            className="border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5"
                        />
                    </div>

                    {/* 운동 종목 */}
                    <div>
                        <h3 className="font-bold text-xl mt-6">운동 종목</h3>
                        <div className="mt-2.5">
                            <NotionCategory onSelect={handleCategorySelect} />
                        </div>
                    </div>

                    {/* 모임 날짜 */}
                    <div>
                        <label
                            htmlFor="meetingDate"
                            className="flex font-bold text-xl mt-6"
                        >
                            모임 날짜
                        </label>
                        <input
                            type="date"
                            id="meetingDate"
                            name="meetingDate"
                            value={formData.meetingDate}
                            onChange={handleChange}
                            className="border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5"
                        />
                    </div>

                    {/* 시간 무관 여부 */}
                    <div>
                        <label
                            htmlFor="isTimeFlexible"
                            className="flex items-center font-bold text-xl mt-6"
                        >
                            <input
                                type="checkbox"
                                id="isTimeFlexible"
                                name="isTimeFlexible"
                                checked={formData.isTimeFlexible}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            시간 무관
                        </label>
                    </div>

                    {!formData.isTimeFlexible && (
                        <>
                            <div>
                                <label
                                    htmlFor="meetingStartTime"
                                    className="flex font-bold text-xl mt-6"
                                >
                                    모임 시작 시간
                                </label>
                                <input
                                    type="time"
                                    id="meetingStartTime"
                                    name="meetingStartTime"
                                    value={formData.meetingStartTime}
                                    onChange={handleChange}
                                    className="border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="meetingEndTime"
                                    className="flex font-bold text-xl mt-6"
                                >
                                    모임 종료 시간
                                </label>
                                <input
                                    type="time"
                                    id="meetingEndTime"
                                    name="meetingEndTime"
                                    value={formData.meetingEndTime}
                                    onChange={handleChange}
                                    className="border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5"
                                />
                            </div>
                        </>
                    )}

                    {/* 모임 장소 */}
                    <div>
                        <label
                            htmlFor="meetingSpot"
                            className="flex font-bold text-xl mt-6"
                        >
                            모임 장소
                        </label>
                        <div
                            className="cursor-pointer relative mt-2.5 border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] flex items-center px-3"
                            onClick={handleLocationClick}
                        >
                            <span>
                                {selectedLocation?.address ||
                                    "모임 장소를 입력해주세요."}
                            </span>
                        </div>
                    </div>

                    {/* 지도 표시 */}
                    {selectedLocation && (
                        <div className="mt-4">
                            <KakaoMap
                                isMarkerFixed={true}
                                location={selectedLocation}
                                style={{ height: "300px" }} // 높이를 300px로 설정
                            />
                        </div>
                    )}

                    {/* 모임 설명 */}
                    <div>
                        <label
                            htmlFor="meetingInfo"
                            className="flex font-bold text-xl mt-6"
                        >
                            모임 설명
                        </label>
                        <input
                            type="text"
                            id="meetingInfo"
                            name="meetingInfo"
                            value={formData.meetingInfo}
                            onChange={handleChange}
                            placeholder="모임 설명을 입력해주세요."
                            className="border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5"
                        />
                    </div>

                    {/* 사진 등록 */}
                    <div className="mb-6">
                        <p className="font-bold text-xl mt-6">사진 등록</p>
                        <label
                            htmlFor="image"
                            className="w-[160px] h-[140px] border-2 border-solid rounded text-[#A7E30A] text-xl flex justify-center items-center relative mt-2.5"
                        >
                            + 사진 업로드
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="absolute hidden"
                        />
                    </div>

                    {/* 모임 등록 버튼 */}
                    <Button
                        label="모임 등록"
                        size="full"
                        color="green"
                        onClick={handleSubmit}
                    />
                </form>
            </div>
        </>
    );
};

export default NotionAdd;
