import { Cookies } from "react-cookie";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
interface UserData {
  fullName: string;
  birth: number;
  userId: string;
  description: string;
  location: string;
  image: string;
}

const ProfileNickname = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const [myToken, setMyToken] = useState("");
  const [nickname, setNickname] = useState("");
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

  // 수정할 닉네임 서버로 전송
  const handleEdit = async () => {
    if (nickname.length > 9 || nickname.length < 3 || nickname.includes(" ")) {
      alert("닉네임은 2 ~ 8자 사이여야 하며 공백이 없어야합니다.");
    } else {
      const putData = { ...myData };
      putData.fullName = nickname;
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
    <div className="w-140 min-h-screen bg-white p-3 flex flex-col justify-start relative">
      {/* 상단 안내문구 */}
      <div className="edit__head-top">
        <p className="font-bold text-xl">닉네임을 입력해주세요.</p>
      </div>

      {/* 하단 입력 영역 */}
      <div className="edit__head-btm mt-6">
        <input
          type="text"
          name=""
          id=""
          placeholder="입력해주세요"
          className="px-4 py-5 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none rounded-lg shadow w-full font-bold text-xl placeholder:text-greenColor"
          onChange={(e) => setNickname(e.target.value)}
        />

        {nickname.length > 9 ||
        nickname.length < 3 ||
        nickname.includes(" ") ? (
          <p className="text-red-600 font-bold text-lg">
            닉네임은 2 ~ 8자 사이여야 하며 공백이 없어야합니다.
          </p>
        ) : null}
      </div>

      {/* 하단 저장 버튼 */}
      <div className="text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]">
        <Button label="저장" size="full" color="green" onClick={handleEdit} />
      </div>
    </div>
  );
};

export default ProfileNickname;
