import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import NotionCategory from "../components/NotionCategory";
import KakaoMap from "./KakaoMap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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
  currentMember: 0,
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

const NotionFix: React.FC = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);

  const [channels, setChannels] = useState<Channel[]>([]);

  const [original_data, setOriginal_data] = useState();

  const Get_post_info = async () => {
    try {
      const response = await axios.get(
        `https://kdt.frontend.5th.programmers.co.kr:5009/posts/${id}`
      );
      setOriginal_data(JSON.parse(response.data.title));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Get_post_info();
  }, []);

  useEffect(() => {
    console.log(original_data);
  }, [original_data]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: original_data?.title, // 기존 제목을 기본 값으로 설정
      channel: original_data?.channel,
      currentMember: original_data?.currentMember,
      meetingCapacity: original_data?.meetingCapacity,
      meetingTime: original_data?.meetingTime,
      meetingSpot: original_data?.meetingSpot,
      meetingInfo: original_data?.meetingInfo,
    }));
    setImageUrls(original_data?.image || []); // 기존 이미지 URL로 초기화
  }, [original_data]);

  //이미지 업로드 부분(충돌 방지 주석)---------------------------------------------------------------
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]); // 선택된 파일들
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 업로드된 이미지 URL들

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newFiles = Array.from(files);
        setImageFiles((prev) => [...prev, ...newFiles]); // 기존 파일에 추가

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
            newUrls.push(data.secure_url); // 업로드된 이미지 URL 추가
          } catch (error) {
            console.error("이미지 업로드 실패:", error);
          }
        }
        setImageUrls((prev) => [...prev, ...newUrls]); // 기존 URL에 추가
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...newUrls],
        })); // 폼 데이터에 이미지 URL 배열 저장
      }
    },
    []
  );

  // 이미지 업로드 부분 여기까지---------------------------------------------------------------

  const navigate = useNavigate();

  useEffect(() => {
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

  const handleCategorySelect = useCallback((category: string) => {
    setFormData((prev) => ({ ...prev, channel: category }));
  }, []);

  const handleSubmit = async () => {
    const channelId =
      channels.find((ch) => ch.name === formData.channel)?._id || "";

    const meetingTime = formData.isTimeFlexible
      ? `${formData.meetingDate}, 시간 무관`
      : `${formData.meetingDate} ${formData.meetingStartTime} - ${formData.meetingEndTime}`;

    const imagesToSubmit = [...original_data?.image, ...formData.images];

    const customJsonData = {
      title: formData.title,
      currentMember: formData.currentMember,
      meetingCapacity: formData.meetingCapacity,
      meetingTime: meetingTime,
      meetingSpot: formData.meetingSpot,
      channel: formData.channel,
      image: imagesToSubmit, //이미지 업로드 부분
    };

    const submitData = new FormData();
    submitData.append("title", JSON.stringify(customJsonData));
    submitData.append("channelId", channelId);
    submitData.append("postId", id);

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
      const response = await fetch(`${API_URL}/posts/update`, {
        method: "PUT",
        headers: {
          Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3Mzk3NTY0fQ.ziDMvpbQF6K61P2POdELAiyLocTIMZ7IZGbe8ZiYlqg`,
        },
        body: submitData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error : ${response.status}`);
      }
      navigate(`/notion/${id}`);
      const data = await response.json();
      console.log("Post", data);
    } catch (error) {
      console.log(submitData);
      console.error(
        "Error: ",
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  const handleLocationClick = () => {
    navigate("/map");
  };

  return (
    <>
      <Header />
      <div className="bg-white w-[640px] h-full">
        <form className="m-5">
          {/* 모임 이름 */}
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
                {selectedLocation?.address || "모임 장소를 입력해주세요."}
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
            label="모임 정보 수정하기"
            size="full"
            color="green"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </>
  );
};

export default NotionFix;
