import { TypedUseSelectorHook, useSelector } from "react-redux";
import ProfileWrap from "../../components/ProfileWrap";

interface ResData {
  banned: boolean;
  comments: [];
  createdAt: string;
  email: string;
  emailVerified: boolean;
  followers: [];
  following: [];
  fullName: string;
  isOnline: boolean;
  likes: [];
  messages: [];
  notifications: [];
  posts: [];
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface UserData {
  fullName: string;
  birth: number;
  userId: string;
  description?: string;
  location?: string;
}

interface RootState {
  currentUser: ResData
}

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const ProfileTemplate = () => {
  const userData = useTypedSelector(state => state.currentUser);
  const profileData: UserData = JSON.parse(userData.fullName);

  return (
    <div className="w-140 min-h-screen bg-white p-3">
      <div className="flex flex-col justify-center items-stretch">
        {/* 프로필 상단 정보 영역 */}
        <div className="flex flex-col justify-center items-stretch text-center pt-8 pb-6 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow">
          {/* 프로필 이미지 */}
          <div id="profileImg" className="mx-auto">
            <img
              src="/src/assets/defaultProfileImg.svg"
              alt={`${profileData.fullName}님의 프로필 사진`}
            />
          </div>

          {/* 닉네임 */}
          <div className="mt-2">
            <p className="text-3xl font-bold">{profileData.fullName}</p>
          </div>

          {/* 운동완료 횟수 */}
          <div className="mt-6">
            <p className="text-base font-normal">
              <span className="font-bold">0</span>회 오늘의 같이 운동 완료!
            </p>
          </div>
        </div>

        {/* 하단 기타 정보들 래퍼 */}
        <div className="profile__bottom flex flex-col justify-center items-stretch gap-5 mt-6">
          {/* 소개글 */}
          <ProfileWrap
            category="소개글"
            description={ !profileData.description ? "아직 작성하지 않았어요" : "대충 있을때 이거 넣을듯" }
          />

          {/* 지역 */}
          <ProfileWrap category="지역" description={ !profileData.location ? "아직 작성하지 않았어요" : "대충 있을때 이거 넣을듯" } />

          {/* 오늘의 일정 */}
          <ProfileWrap
            category="오늘의 일정"
            description={ !profileData.description ? "오늘 할 일정이 없어요" : "대충 있을때 이거 넣을듯" }
          />

          {/* 후기 */}
          <ProfileWrap category="후기" description={ !profileData.description ? "아직 작성된 후기가 없어요" : "대충 있을때 이거넣을듯" } />

          {/* 차단유저 목록 */}
          {/* 타유저 프로필 조회시 안보이게 처리 */}
          <ProfileWrap category="차단유저 목록" description={ userData.likes.length === 0 ? "아직 차단한 유저가 없어요" : "대충 있을때 이거넣을듯" } />
        </div>
      </div>
    </div>
  );
};

export default ProfileTemplate;
