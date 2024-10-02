import { Cookies } from "react-cookie";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ResData {
  banned: boolean
  comments: []
  createdAt: string
  email: string
  emailVerified: boolean
  followers: []
  following: []
  fullName: string
  isOnline: boolean
  likes: []
  messages: []
  notifications: []
  posts: []
  role: string
  updatedAt: string
  __v: number;
  _id: string
}
interface UserData {
  fullName: string;
  birth: number;
  userId: string;
  description?: string;
  location?: string;
}

interface RootState {
  currentUser: ResData;
}

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const ProfileNickname = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const [myToken, setMyToken] = useState("");
  const [nickname, setNickname] = useState('');

  const myInfo = useTypedSelector((state) => state.currentUser);
  let myDetailData: UserData | null = null
  
  useEffect(() => {
    try {
      myDetailData = JSON.parse(myInfo.fullName);
    } catch(err) {
      alert('잘못된 접근입니다.')
      navigate('/')
    }
  }, [myInfo])

  useEffect(() => {
    setMyToken(cookie.get("token").replace(/bearer\s+/g, ""));
  }, [cookie]);

  const handleEdit = () => {
    const putData = { ...myDetailData };
    putData.fullName = nickname
    const submitData = { fullName: JSON.stringify(putData) }
    if(nickname.length > 9 || nickname.length < 3 || nickname.includes(' ')) {
      return alert('닉네임은 2 ~ 8자 사이여야 하며 공백이 없어야합니다.')
    } else {
      axios.put(
        "https://kdt.frontend.5th.programmers.co.kr:5009/settings/update-user",submitData ,
        {
          headers: {
            // Authorization: `bearer ${myToken}`,
            Authorization: `bearer fnejkwfjklwehfkjqebnkjbnqejkvnlqeklkevjvkljeqkljekl`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        if(res.status === 200) {
          alert('수정이 완료되었습니다')
          navigate('/')
        } else {
          return null
        }
      })
      .catch(err => {
        if(err.status === 401) {
          alert('올바르지 않은 사용자 입니다.')
          navigate('/')
        } else if (err.status === 404) {
          alert('올바르지 않은 경로의 접근입니다.')
          navigate('/')
        }
      })
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

        {
          nickname.length > 9 || nickname.length < 3 || nickname.includes(' ')
          ? <p className="text-red-600 font-bold text-lg">
              닉네임은 2 ~ 8자 사이여야 하며 공백이 없어야합니다.
            </p>
          : null
        }
      </div>

      {/* 하단 저장 버튼 */}
      <div className="text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]">
        <Button label="저장" size="full" color="green" onClick={handleEdit}/>
      </div>
    </div>
  );
};

export default ProfileNickname;
