import Button from "../../components/Button";

const ProfileNickname = () => {
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
        />
      </div>

      {/* 하단 저장 버튼 */}
      <div className="text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]">
        <Button
          label="저장"
          size="full"
          color="green"
        />
      </div>
    </div>
  );
};

export default ProfileNickname;