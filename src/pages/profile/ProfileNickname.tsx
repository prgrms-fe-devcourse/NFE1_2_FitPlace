
const ProfileNickname = () => {
  return (
    <div className="w-140 min-h-screen bg-white p-3 border flex flex-col justify-start">
      {/* 상단 안내문구 */}
      <div className="edit__head-top">
        <p className="font-bold text-xl">프로필 사진을 등록해주세요.</p>
        <p className="font-normal text-sm mt-2">최대 2장까지 등록할 수 있어요.</p>
      </div>

      {/* 하단 입력 영역 */}
      <div className="edit__head-btm mt-6">
        <ul>
          <li>
            <label htmlFor="imgUploadInput" className="cursor-pointer">
              <p className="text-greenColor font-bold text-xl">+ 사진 업로드</p>
            </label>
            <input
              type="file"
              name=""
              id="imgUploadInput"
              className="hidden"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileNickname;