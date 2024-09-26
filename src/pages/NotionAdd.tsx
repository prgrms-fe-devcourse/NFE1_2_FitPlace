import React from 'react';
import arrowforward from "../assets/arrowforward.svg";
import reactImg from "../assets/react.svg"
import Button from "../components/Button";


const NotionAdd = () => {

  return (
    
    <div className='bg-white w-[640px] h-full' >
      <form action="#" className='m-5'>
        <div >
          <label htmlFor="meetName" className='flex font-bold text-xl'>모임 이름</label>
          <input type="text" id='meetName' placeholder='모임 이름을 입력해주세요.' className='border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5'/>
        </div>
        <div>
          <label htmlFor="meetPersonnel" className='flex font-bold text-xl mt-6'>모임 인원</label>
          <input type="text" id='meetPersonnel' placeholder='모임 인원을 입력해주세요' className='border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5'/>
        </div>
        <div>
          <h3 className='font-bold text-xl mt-6'>운동 종목</h3>
          <div className='mt-2.5 flex gap-4'>
            <label htmlFor="baseball" className='w-20 h-10 bg-[#F6F6F6] rounded text-lg flex justify-center items-center relative '>야구</label>
            <input type='radio' name='sports' id='baseball' value='야구' className='absolute opacity-0'/>
            <label htmlFor="soccer" className='w-20 h-10 bg-[#F6F6F6] rounded text-lg flex justify-center items-center relative'>축구</label>
            <input type='radio' name='sports' id='soccer' value='축구' className='absolute opacity-0'/>
            <label htmlFor="tennis" className='w-20 h-10 bg-[#F6F6F6] rounded text-lg flex justify-center items-center relative'>테니스</label>
            <input type='radio' name='sports' id='tennis' value='테니스' className='absolute opacity-0'/>
            <label htmlFor="basketball" className='w-20 h-10 bg-[#F6F6F6] rounded text-lg flex justify-center items-center relative'>농구</label>
            <input type='radio' name='sports' id='basketball' value='농구' className='absolute opacity-0'/>
            <label htmlFor="directInput" className='w-20 h-10 bg-[#F6F6F6] rounded text-lg flex justify-center items-center relative'>직접 입력</label>
            <input type='radio' name='sports' id='directInput' value='직접 입력' className='absolute opacity-0'/>
          </div>
        </div>
        <div>
          <label htmlFor="meetexposition" className='flex font-bold text-xl mt-6 '>모임 설명</label>
          <input type="text" id='meetexposition' placeholder='모임에 대한 설명을 입력해주세요.' className='border-2 border-solid border-[#e8e8e8] w-[600px]  h-32 mt-2.5 text-lg pl-2.5'/>
        </div>
        <div>
          <p className='font-bold text-xl mt-6'>운동장소</p>
          <form action='/map' className='mt-2.5 border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] flex justify-between'>
            <label htmlFor="selectLocation" className='text-[#9BA3AF] pl-2.5 pt-1.5 text-lg'>위치 선택</label>
            <button id='selectLocation'>
              <img src={arrowforward} alt="arrowforward" />
            </button>
          </form>
        </div>
        <div className='mb-6'>
          <p className='font-bold text-xl mt-6'>사진 등록</p>
          <label   htmlFor='meetImg' className='w-[160px] h-[140px] border-2 border-solid rounded text-[#A7E30A] text-xl flex justify-center items-center relative mt-2.5'>+ 사진 업로드</label>
          <input type="file" id='meetImg' className='absolute hidden' />
        </div>
        <Button label="모임 등록" size="mid" color="green"/>
      </form>    
    </div>
  );
};

export default NotionAdd;