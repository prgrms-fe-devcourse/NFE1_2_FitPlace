import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import NotionCategory from "../components/NotionCategory";
import KakaoMap from "./KakaoMap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";

interface FormData {
    title: string;
    channel: string;
    currentMember: string[];
    meetingCapacity: number;
    meetingDate: string;
    meetingStartTime: string;
    meetingEndTime: string;
    isTimeFlexible: boolean;
    meetingSpot: string;
    images: string[];
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
    currentMember: [],
    meetingCapacity: 0,
    meetingDate: "",
    meetingStartTime: "",
    meetingEndTime: "",
    isTimeFlexible: false,
    meetingSpot: "",
    images: [],
    meetingInfo: "",
};

const API_URL = "https://kdt.frontend.5th.programmers.co.kr:5009";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const NotionAdd: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
    const [selectedLocation, setSelectedLocation] = useState<{
        address: string;
        lat: number;
        lng: number;
    } | null>(null);

    const [channels, setChannels] = useState<Channel[]>([]);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleFileChange = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
                const newFiles = Array.from(files);
                setImageFiles((prev) => [...prev, ...newFiles]);

                const newUrls: string[] = [];
                const formData = new FormData();

                for (const file of newFiles) {
                    formData.append("file", file);
                    formData.append("upload_preset", UPLOAD_PRESET);

                    try {
                        const response = await fetch(
                            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                            {
                                method: "POST",
                                body: formData,
                            }
                        );
                        const data = await response.json();
                        newUrls.push(data.secure_url);
                    } catch (error) {
                        console.error("이미지 업로드 실패:", error);
                    }
                }
                setImageUrls((prev) => [...prev, ...newUrls]);
                setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, ...newUrls],
                }));
            }
        },
        []
    );

    const [isRegistered, setIsRegistered] = useState(false);
    const [newPostId, setNewPostId] = useState<string | null>(null);
    const navigate = useNavigate();

    const token = useSelector((state: any) => state.userToken);
    const cookies = new Cookies();

    const saveFormDataToStorage = (data: FormData) => {
        sessionStorage.setItem("notionAddFormData", JSON.stringify(data));
    };

    const resetForm = () => {
        sessionStorage.removeItem("notionAddFormData");
        sessionStorage.removeItem("selectedLocation");
        setFormData(INITIAL_FORM_STATE);
        setSelectedLocation(null);
    };

    useEffect(() => {
        const savedFormData = sessionStorage.getItem("notionAddFormData");
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }

        const savedLocation = sessionStorage.getItem("selectedLocation");
        if (savedLocation) {
            const locationData = JSON.parse(savedLocation);
            const locationString = `${locationData.address},${locationData.lat},${locationData.lng}`;
            setSelectedLocation(locationData);
            setFormData((prev) => ({
                ...prev,
                meetingSpot: locationString,
            }));
        }

        fetchChannels();
    }, []);

    const fetchChannels = async () => {
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
    };

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value, type } = e.target;
            const updatedFormData = {
                ...formData,
                [name]: type === "number" ? parseInt(value, 10) : value,
            };
            setFormData(updatedFormData);
            saveFormDataToStorage(updatedFormData);
        },
        [formData]
    );


    const handleCategorySelect = useCallback(
        (category: string) => {
            setFormData((prev) => ({ ...prev, channel: category }));
            saveFormDataToStorage({ ...formData, channel: category });

    if (!formData.title) {
      alert("제목을 입력해주세요!");
      return;
    } else if (formData.meetingCapacity === 0) {
      alert("모집 인원을 입력해주세요!");
      return;
    } else if (!formData.channel) {
      alert("종목을 선택해주세요!");
      return;
    } else if (!formData.meetingSpot) {
      alert("운동할 위치를 지정해주세요!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/posts/create`, {
        method: "POST",
        headers: {
          Authorization: `${cookieToken || token}`,

        },
        [formData]
    );

    const handleLocationClick = () => {
        navigate("/map");
    };

    const handleSubmit = async () => {
        const cookieToken = cookies.get("token");

        if (!token && !cookieToken) {
            console.error("토큰이 없습니다. 로그인이 필요합니다.");
            return;
        }

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
            image: formData.images,
        };

        const submitData = new FormData();
        submitData.append("title", JSON.stringify(customJsonData));
        submitData.append("channelId", channelId);

        try {
            const response = await fetch(`${API_URL}/posts/create`, {
                method: "POST",
                headers: {
                    Authorization: `${cookieToken || token}`,
                },
                body: submitData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error : ${response.status}`);
            }

            navigate(`/`);
            const data = await response.json();
            console.log("Post 등록 완료:", data);
            setNewPostId(data._id);
            setIsRegistered(true);
            resetForm();
        } catch (error) {
            console.error(
                "Error: ",
                error instanceof Error ? error.message : String(error)
            );
        }
    };

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
                                style={{ height: "300px" }}
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
                        <div className="flex flex-wrap">
                            {imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`uploaded-${index}`}
                                    className="w-[160px] h-[140px] mt-4"
                                />
                            ))}

                            <label
                                htmlFor="image"
                                className="w-[160px] h-[140px] border-2 border-solid rounded text-[#A7E30A] text-xl flex justify-center items-center relative mt-4"
                            >
                                + 사진 업로드
                            </label>

                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute hidden"
                            />
                        </div>
                    </div>

                    {/*사진 초기화하기 */}
                    {imageUrls && imageUrls.length > 0 && (
                        <div className="flex flex-col items-center">
                            <button
                                className="w-1/2 bg-gray-300 my-3 h-10 text-sm hover:bg-gray-400 hover:rounded-2xl transition-all"
                                onClick={() => setImageUrls([])}
                            >
                                사진 초기화
                            </button>
                        </div>
                    )}

                    {/* 모임 등록 버튼 */}
                    <Button
                        label="모임 등록"
                        size="full"
                        color="green"
                        onClick={handleSubmit}
                    />
                </form>
            </div>

            {/* 모임 등록 성공 표시 */}
            {isRegistered && (
                <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
                    <div className="bg-white p-5 border rounded-xl shadow-md">
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-bold mr-4">
                                모임이 성공적으로 등록되었습니다!
                            </p>
                            <Button
                                label="상세보기"
                                size="mid"
                                color="green"
                                onClick={() => {
                                    setIsRegistered(false);
                                    if (newPostId) {
                                        navigate(`/notion/${newPostId}`);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NotionAdd;
