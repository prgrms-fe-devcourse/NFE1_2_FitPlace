import React from 'react';


const NotionAdd = () => {

  return (
    
    <div className='bg-white w-[640px] h-full' >
      <header>
        <button><i></i></button>
        <h1>모임 만들기</h1>
      </header>
      <form action="#" className='m-5'>
        <div >
          <label htmlFor="meetName" className='flex font-bold text-xl mt-20'>모임 이름</label>
          <input type="text" id='meetName' placeholder='모임 이름을 입력해주세요.' className='border-2 border-solid border-[#e8e8e8] w-[600px] mt-2.5 text-lg pl-2.5'/>
        </div>
        <div>
          <label htmlFor="meetPersonnel" className='flex font-bold text-xl mt-6'>모임 인원</label>
          <input type="text" id='meetPersonnel' placeholder='모임 인원을 입력해주세요' className='border-2 border-solid border-[#e8e8e8] w-[600px] mt-2.5 text-lg pl-2.5'/>
        </div>
        <div>
          <h3 className='font-bold text-xl mt-6'>운동 종목</h3>
          <div className='mt-2.5 flex'>
            <label htmlFor="baseball" className='w-20 h-10 bg-[#F6F6F6] rounded text-lg flex justify-center items-center'>야구</label>
            <input type='radio' name='sports' id='baseball' value='야구'/>
            <label htmlFor="soccer" className='w-20 h-10 bg-[#F6F6F6] rounded text-lg flex justify-center items-center'>축구</label>
            <input type='radio' name='sports' id='soccer' value='축구'/>
            <label htmlFor="tennis" className='w-20 h-10 bg-[#F6F6F6] rounded text-lg flex justify-center items-center'>테니스</label>
            <input type='radio' name='sports' id='tennis' value='테니스'/>
            <label htmlFor="basketball" className='w-20 h-10 bg-[#F6F6F6] rounded text-lg flex justify-center items-center'>농구</label>
            <input type='radio' name='sports' id='basketball' value='농구'/>
            <label htmlFor="directInput" className='w-20 h-10 bg-[#F6F6F6] rounded text-lg flex justify-center items-center'>직접 입력</label>
            <input type='radio' name='sports' id='directInput' value='직접 입력'/>
          </div>
        </div>
        <div>
          <label htmlFor="meetexposition" className='flex font-bold text-xl mt-6'>모임 설명</label>
          <input type="text" id='meetexposition' placeholder='모임에 대한 설명을 입력해주세요.' className='border-2 border-solid border-[#e8e8e8] w-[600px] h-32 mt-2.5 text-lg pl-2.5'/>
        </div>
        <div>
          <p className='font-bold text-xl mt-6'>운동장소</p>
          <div className='mt-2.5 border-2 border-solid border-[#e8e8e8] w-[600px] '>
            <label htmlFor="selectLocation" className='text-[#656565] pl-2.5'>위치 선택</label>
            <button id='selectLocation'></button>
          </div>
        </div>
        <div>
          <label htmlFor="meetImg" className='flex font-bold text-xl mt-6'>사진 등록</label>
          <input type="file" id='meetImg' className='mt-2.5' />
        </div>
      </form>    
    </div>
  );
};

export default NotionAdd;