import Button from "../../components/Button";

const ProfileImg = () => {
  return (
    <div className="w-140 min-h-screen bg-white p-3 flex flex-col justify-start relative">
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
          <li className="w-[calc(33.33333%_-_1rem)] relative rounded shadow after:block after:pb-100P">
            <img src="/src/assets/defaultProfileImg.svg" alt="예시이미지" className="w-full h-full object-cover absolute" />
            {/* 삭제...버튼...? */}
            <p className="absolute top-0 right-0 cursor-pointer">❌</p>
          </li>
          
          {/* 이미지 업로드 예시 */}
          <li className="w-[calc(33.33333%_-_1rem)] relative rounded shadow after:block after:pb-100P">
            <img src="/src/assets/defaultProfileImg.svg" alt="예시이미지" className="w-full h-full object-cover absolute" />
            {/* 삭제...버튼...? */}
            <p className="absolute top-0 right-0 cursor-pointer">❌</p>
          </li>

          {/* 이미지 업로드 버튼 */}
          <li className="bg-gray-100 hover:bg-gray-200 w-[calc(33.33333%_-_1rem)] relative rounded shadow after:block after:pb-100P">
            <label
              htmlFor="imgUploadInput"
              className="w-full h-full absolute flex justify-center items-center cursor-pointer"
            >
              <p className="text-greenColor font-bold text-xl">+ 사진 업로드</p>
            </label>
            <input type="file" name="" id="imgUploadInput" className="hidden" />
          </li>
        </ul>
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

export default ProfileImg;
