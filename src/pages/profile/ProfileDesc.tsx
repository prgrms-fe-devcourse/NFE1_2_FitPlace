import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Cookies } from "react-cookie";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface UserData {
  fullName: string;
  birth: number;
  userId: string;
  description: string;
  location: string;
  image: string;
}

const ProfileDesc = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const [myToken, setMyToken] = useState("");
  const [textValue, setTextValue] = useState("");
  const [textLength, setTextLength] = useState(0);
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

  const handleEdit = async () => {
    if(textValue.length < 20 || textValue.length > 300) {
      return alert('소개글은 20자에서 300자 사이여야 합니다.')
    } else {
      const putData = { ...myData };
      putData.description = textValue;
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
        <p className="font-bold text-xl">소개글을 작성해주세요.</p>
      </div>

      {/* 하단 입력 영역 */}
      <div className="edit__head-btm mt-6">
        <textarea
          name=""
          id=""
          value={textValue}
          onChange={(e) => {
            setTextValue(e.target.value);
            setTextLength(e.target.value.length);
          }}
          placeholder="입력해주세요"
          className="px-4 py-5 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none rounded-lg shadow w-full font-bold text-xl placeholder:text-greenColor min-h-52 resize-none"
        ></textarea>
        <p
          className="text-gray-400 text-right"
        >{textLength} / 300</p>
      </div>

      {/* 하단 저장 버튼 */}
      <div className="text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]">
        <Button label="저장" size="full" color="green" onClick={handleEdit} />
      </div>
    </div>
  );
};

export default ProfileDesc;
