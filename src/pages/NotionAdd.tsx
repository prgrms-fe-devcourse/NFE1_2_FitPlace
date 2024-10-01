import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import arrowforward from "../assets/arrowforward.svg";
import Button from "../components/Button";
import Header from "../components/Header";
import NotionCategory from "../components/NotionCategory";
import axios from "axios";

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
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const NotionAdd: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [image, setImage] = useState<File | null>(null); // 선택된 파일
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 업로드된 이미지 URL

  useEffect(() => {
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
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseInt(value, 10) : value,
      }));
    },
    []
  );

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImage(file); // 선택된 파일을 저장
        const formData = new FormData();
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
          const imageBlob = await response.blob();
          const blobUrl = URL.createObjectURL(imageBlob);

          setImageUrl(blobUrl); // 업로드된 이미지 URL 설정
          setFormData((prev) => ({ ...prev, image: blobUrl })); // 폼 데이터에 이미지 URL 저장
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
        }
      }
    },
    []
  );

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

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

  const getChannelId = (selectedChannel: string): string => {
    const channel = channels.find((ch) => ch.name === selectedChannel);
    if (channel) {
      return channel._id;
    }
    const otherChannel = channels.find((ch) => ch.name === "기타");
    return otherChannel ? otherChannel._id : "";
  };

  const handleSubmit = async () => {
    const channelId = getChannelId(formData.channel);

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
      image: formData.image, // 이미지 URL 포함
      meetingInfo: formData.meetingInfo, // 추가된 모임 설명 필드
    };

    const submitData = new FormData();
    submitData.append("title", JSON.stringify(customJsonData));
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
            <label htmlFor="title" className="flex font-bold text-xl mt-6">
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
                  시작 시간
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
                  종료 시간
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
              placeholder="장소를 입력해주세요."
              className="border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5"
            />
          </div>

          <div>
            <label htmlFor="image" className="flex font-bold text-xl mt-6">
              이미지
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2.5"
            />
          </div>

          <div>
            <label
              htmlFor="meetingInfo"
              className="flex font-bold text-xl mt-6"
            >
              모임 설명
            </label>
            <textarea
              id="meetingInfo"
              name="meetingInfo"
              value={formData.meetingInfo}
              onChange={handleChange}
              placeholder="모임에 대한 설명을 입력해주세요."
              className="border-2 border-solid border-[#e8e8e8] w-[600px] h-[120px] mt-2.5 text-lg pl-2.5"
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button text="완료" onClick={handleSubmit} icon={arrowforward} />
          </div>
        </form>
      </div>
    </>
  );
};

export default NotionAdd;
