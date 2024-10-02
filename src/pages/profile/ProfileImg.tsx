import { ReactEventHandler, useEffect, useState } from "react";
import Button from "../../components/Button";
import axios from "axios";
import { Cookies } from "react-cookie";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
interface UserData {
  fullName: string;
  birth: number;
  userId: string;
  description: string;
  location: string;
  image: string[];
}

const ProfileImg = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();

  let imgUrl = "";
  const [myToken, setMyToken] = useState("");
  const [myData, setMyData] = useState<UserData>();

  useEffect(() => {
    setMyToken(cookie.get("token").replace(/bearer\s+/g, ""));
    try {
      axios
        .get("https://kdt.frontend.5th.programmers.co.kr:5009/auth-user", {
          headers: {
            Authorization: `bearer ${myToken}`,
          },
        })
        .then((res) => {
          setMyData(JSON.parse(res.data.fullName));
        });
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  }, [cookie]);

  const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 어레이 개수가 2개 이상이면 불가하게끔 하는거 넣어야 함 10-02
    if (!e.target.files) {
      return;
    } else {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`,
          formData
        );
        imgUrl = response.data.secure_url;
        putImg(imgUrl);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const putImg = async (imgUrlParams: string) => {
    if (imgUrlParams || imgUrlParams !== "") {
      const putData = { ...myData };
      if (Array.isArray(putData.image)) {
        putData.image.push(imgUrlParams);
      } else {
        putData.image = [];
        putData.image.push(imgUrlParams);
      }
      const submitData = JSON.stringify(putData);
      await axios
        .put(
          "https://kdt.frontend.5th.programmers.co.kr:5009/settings/update-user",
          {
            fullName: submitData,
          },
          {
            headers: {
              Authorization: `bearer ${myToken}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alert("수정 되었습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form className="w-140 min-h-screen bg-white p-3 flex flex-col justify-start relative">
      {/* 상단 안내문구 */}
      <div className="edit__head-top">
        <p className="font-bold text-xl">프로필 사진을 등록해주세요.</p>
        <p className="font-normal text-sm mt-2">
          최대 2장까지 등록할 수 있어요.
        </p>
      </div>

      {/* 하단 입력 영역 */}
      <div className="edit__head-btm mt-6">
        <ul className="flex justify-start items-start flex-wrap gap-4">
          {/* 이미지 업로드 예시 */}
          {Array.isArray(myData?.image) &&
            myData.image.map((img, idx) => {
              return (
                <li className="w-[calc(33.33333%_-_1rem)] relative rounded shadow after:block after:pb-100P">
                  {myData.image.length === 0 ? (
                    <img
                      src="/src/assets/defaultProfileImg.svg"
                      alt="기본 프로필 사진"
                      className="w-full h-full object-cover absolute"
                      key={idx}
                    />
                  ) : (
                    <img
                      src={img}
                      alt={`${myData?.fullName}님의 사진`}
                      className="w-full h-full object-cover absolute"
                      key={idx}
                    />
                  )}
                  {/* 삭제...버튼...? 
                    <p className="absolute top-0 right-0 cursor-pointer">❌</p> */}
                </li>
              );
            })}

          {/* 이미지 업로드 버튼 */}
          <li className="bg-gray-100 hover:bg-gray-200 w-[calc(33.33333%_-_1rem)] relative rounded shadow after:block after:pb-100P">
            <label
              htmlFor="imgUploadInput"
              className="w-full h-full absolute flex justify-center items-center cursor-pointer"
            >
              <p className="text-greenColor font-bold text-xl">+ 사진 업로드</p>
            </label>
            <input
              type="file"
              name=""
              id="imgUploadInput"
              className="hidden"
              accept="image/jpeg, image/png, image/webp"
              onChange={uploadImg}
            />
          </li>
        </ul>
      </div>

      {/* 하단 저장 버튼 */}
      <div className="text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]">
        <Button label="저장" size="full" color="green" />
      </div>
    </form>
  );
};

export default ProfileImg;
