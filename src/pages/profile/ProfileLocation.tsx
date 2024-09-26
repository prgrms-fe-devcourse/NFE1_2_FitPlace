import { locationList } from "../../data/location";

import Button from "../../components/Button";
import { useRef, useState } from "react";

const ProfileLocation = () => {

  const [locaNum, setLocaNum] = useState(0);
  const [cityNum, setCityNum] = useState(0);

  // 도, 광역시 선택시 시군구 스크롤 최상단으로
  const myRef = useRef<HTMLUListElement>(null);

  const scrollTop = () => {
    if (myRef.current) {myRef.current.scrollTop = 0}
  }

  return (
    <div className="w-140 min-h-screen bg-white p-3 border flex flex-col justify-start relative">
      {/* 상단 안내문구 */}
      <div className="edit__head-top">
        <p className="font-bold text-xl">살고 있는 지역을 선택해주세요.</p>
      </div>

      {/* 하단 입력 영역 */}
      <div className="edit__head-btm mt-6 h-[calc(68vh)] bg-gray-100 py-6">
        <ul className="flex justify-center items-start h-full">
          {/* 광역시, 도 선택 */}
          <li className="w-full text-center text-xl text-locationColor h-full overflow-scroll" style={{scrollbarWidth: "none"}}>
            {
              locationList.map((province, idx) => {
                return (
                  <div
                    key={idx}
                    className={`cursor-pointer py-3 hover:bg-gray-200 ${locaNum === idx ? "text-greenColor font-bold" : null}`}
                    onClick={() => {
                      setLocaNum(idx)
                      setCityNum(0)
                      scrollTop();
                    }}
                  ><span>{province.name}</span></div>
                )
              })
            }
          </li>
          
          {/* 시, 군, 구 선택 */}
          {/* ref는 도, 광역시 선택시 상단으로 가는 기능입니다 */}
          <ul className="w-full text-center text-xl text-locationColor h-full overflow-scroll" style={{scrollbarWidth: "none"}} ref={myRef}>
            {
              locationList[locaNum].subArea.map((city, idx) => {
                return (
                  <div
                    key={idx}
                    className={`cursor-pointer py-3 hover:bg-gray-200 ${cityNum === idx ? "text-greenColor font-bold" : null} relative`}
                    onClick={() => setCityNum(idx)}
                  >
                    <span>{city}</span>
                    {cityNum === idx ? <span><img src="/src/assets/check.svg" alt="선택되었습니다" className="absolute bottom-1/2 right-12 translate-y-1/2" /></span> : null}
                  </div>
                )
              })
            }
          </ul>
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

export default ProfileLocation;