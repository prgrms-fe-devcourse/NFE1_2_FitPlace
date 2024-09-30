import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import arrowforward from "../assets/arrowforward.svg";
import Button from "../components/Button";
import Header from "../components/Header";
import NotionCategory from "../components/NotionCategory";

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
};

const API_URL = "https://kdt.frontend.5th.programmers.co.kr:5009";

const NotionAdd: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {},
        []
    );

    const handleCategorySelect = useCallback((category: string) => {
        setFormData((prev) => ({ ...prev, channel: category }));
    }, []);

    const handleTimeFlexibleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { checked } = e.target;
            setFormData((prev) => ({
                ...prev,
                isTimeFlexible: checked,
                meetingStartTime: checked ? "" : prev.meetingStartTime,
                meetingEndTime: checked ? "" : prev.meetingEndTime,
            }));
        },
        []
    );

    const handleSubmit = async () => {
        const channelId = getChannelId(formData.channel);

        const customJsonData = {
            title: formData.title,
            currentMember: formData.currentMember,
            meetingCapacity: formData.meetingCapacity,
            meetingDate: formData.meetingDate,
            isTimeFlexible: formData.isTimeFlexible,
            meetingStartTime: formData.isTimeFlexible
                ? ""
                : formData.meetingStartTime,
            meetingEndTime: formData.isTimeFlexible
                ? ""
                : formData.meetingEndTime,
            meetingSpot: formData.meetingSpot,
            channel: formData.channel,
        };

        const submitData = new FormData();
        submitData.append("title", JSON.stringify(customJsonData));
        if (imageFile) {
            submitData.append("image", imageFile);
            // 실제 File 객체 추가
        }
        submitData.append("channelId", channelId);

        try {
            const response = await fetch(`${API_URL}/posts/create`, {
                method: "POST",
                headers: {
                    Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDA0OTkzfQ.EziIP1HOZoU6tUyfSm1T7xhrmYkf0L60ItKo6kSErhs`,
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

    return (
        <>
            <Header />
            <div className="bg-white w-[640px] h-full">
                <form className="m-5">
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

                    <div>
                        <h3 className="font-bold text-xl mt-6">운동 종목</h3>
                        <div className="mt-2.5">
                            <NotionCategory onSelect={handleCategorySelect} />
                        </div>
                    </div>

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
                                onChange={handleTimeFlexibleChange}
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

                    <div>
                        <label
                            htmlFor="meetingSpot"
                            className="flex font-bold text-xl mt-6"
                        >
                            모임 장소
                        </label>
                        <input
                            type="text"
                            id="meetingSpot"
                            name="meetingSpot"
                            value={formData.meetingSpot}
                            onChange={handleChange}
                            placeholder="모임 장소를 입력해주세요."
                            className="border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5"
                        />
                    </div>

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
                            onChange={handleFileChange}
                            className="absolute hidden"
                        />
                    </div>

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
