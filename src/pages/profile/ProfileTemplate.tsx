import ProfileWrap from "../../components/ProfileWrap";

const ProfileTemplate = () => {
  return (
    <div className="w-140 min-h-screen bg-white p-3">
      <div className="flex flex-col justify-center items-stretch">
        {/* 프로필 상단 정보 영역 */}
        <div className="flex flex-col justify-center items-stretch text-center pt-8 pb-6 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow">
          {/* 프로필 이미지 */}
          <div id="profileImg" className="mx-auto">
            <img src="/src/assets/defaultProfileImg.svg" alt="프로필 사진" />
          </div>
  
          {/* 닉네임 */}
          <div className="mt-2">
            <p className="text-3xl font-bold">닉네임</p>
          </div>

          {/* 운동완료 횟수 */}
          <div className="mt-6">
            <p className="text-base font-normal"><span className="font-bold">0</span>회 오늘의 같이 운동 완료!</p>
          </div>
        </div>

        {/* 하단 기타 정보들 래퍼 */}
        <div className="profile__bottom flex flex-col justify-center items-stretch gap-5 mt-6">
          {/* 소개글 */}
          <ProfileWrap
            category="소개글"
            description="헬스, 수영, 배드민턴 좋아합니다 3대 550칩니다 언더아머 착용중입니다 같이 운동하실 분들 연락주세요"
          />

          {/* 지역 */}
          <ProfileWrap
            category="지역"
            description="서울특별시 강남구 개포동"
          />

          {/* 오늘의 일정 */}
          <ProfileWrap
            category="오늘의 일정"
            description="함께 5:5 풋살하실분 구합니다"
          />

          {/* 후기 */}
          <ProfileWrap
            category="후기"
            description="친절하셨습니다"
          />

          {/* 차단유저 목록 */}
          {/* 타유저 프로필 조회시 안보이게 처리 */}
          <ProfileWrap
            category="차단유저 목록"
            description="고래상어"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTemplate;