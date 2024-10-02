import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Cookies } from "react-cookie";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import axios from "axios";
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

const ProfileDesc = () => {

  const cookie = new Cookies();
  const navigate = useNavigate();

  const [myToken, setMyToken] = useState("");
  const [textValue, setTextValue] = useState('');
  const [myDetailData, setMyDetailData] = useState<UserData | null>(null)

  const myInfo = useTypedSelector((state) => state.currentUser);
  
  useEffect(() => {
    try {
      setMyDetailData(JSON.parse(myInfo.fullName));
    } catch(err) {
      alert('잘못된 접근입니다.')
      navigate('/login')
    }
  }, [myInfo])

  useEffect(() => {
    setMyToken(cookie.get('token').replace(/bearer\s+/g, ""));
  }, [cookie])

  const handleEdit = () => {
    const putData = { 
      fullName: myDetailData?.fullName,
      description: myDetailData?.description,
      birth: myDetailData?.birth,
      location: myDetailData?.location,
      userId: myDetailData?.userId,
     };
    putData.description = textValue
    const submitData = { fullName: JSON.stringify(putData) }
    axios.put(
      "https://kdt.frontend.5th.programmers.co.kr:5009/settings/update-user",submitData ,
      {
        headers: {
          Authorization: `bearer ${myToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => res.status === 200 ? alert('수정이 완료되었습니다') : null)
    .catch(err => console.error(err))
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
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="입력해주세요"
          className="px-4 py-5 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none rounded-lg shadow w-full font-bold text-xl placeholder:text-greenColor min-h-52 resize-none"></textarea>
      </div>

      {/* 하단 저장 버튼 */}
      <div className="text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]">
        <Button
          label="저장"
          size="full"
          color="green"
          onClick={handleEdit}
        />
      </div>
    </div>
  );
};

export default ProfileDesc;