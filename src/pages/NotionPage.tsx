import React, { useState, useRef } from 'react';
import logo from '../assets/FitPlaceLogo.svg'
import iconUser from '../assets/icon_user_profile.svg'
import favorite from '../assets/favorite.svg'
import commentIcon from '../assets/commentIcon.svg'
import NotionItem from '../components/NotionItem';
import Button from '../components/Button';
import Header from '../components/Header';



const NotionPage = () => {

  const [deleteModal, setDeleteModal] = useState(false);
  const modalBackground = useRef();

  return (
    <>
     <Header />
      <div className='bg-white w-[640px] h-full'>
        <div id='container' className='m-5 relative'>
          {
            deleteModal &&
            <div className='flex justify-center absolute w-full h-full backdrop-blur-sm items-center'>
              <div className='w-[400px] h-[200px] flex justify-center items-center border-2 border-solid border-[#000000] rounded-xl bg-white' onClick={e => {
                if(e.target === modalBackground.current) {
                  setDeleteModal(false);
                }
              }} >  
                <div>
                  <p>게시글을 삭제할까요?</p>
                  <div className='flex gap-5 mt-2'>
                    <Button label='삭제' size='mid' color='green' />
                    <Button label='취소' size='mid' color='green' onClick={() => setDeleteModal(false)} />
                  </div>
                </div>
              </div>
          </div>
            }
     
        <section>
          <div>
            <div className='flex justify-between'>
              <p className='text-sm text-[#AFE327]'>모집중!</p>
              <div className='text-xs text-[#898989] flex gap-2'>
                <button>수정</button>|<button onClick={()=> setDeleteModal(true)}>삭제</button>
              </div>            
            </div>
            
            <h3 className='text-2xl font-bold'>풋살 4 vs 4 모집</h3>
            <p className='text-lg text-[#666666] pt-2.5'>풋살</p>
          </div>
        </section>
        <section className='mt-7'>
          <div className='flex flex-col gap-3'>
            <div className='flex gap-5'>
              <p className='text-lg font-bold'>장소</p>
              <p className='text-sm text-[#7e7e7e]'>영훈국제중학교</p>
            </div>
            <div className='flex gap-5'>
              <p className='text-lg font-bold'>일시</p>
              <p className='text-sm text-[#7e7e7e]'>2024.09.25 저녁 19시 이후</p>
            </div>
          </div>
        </section>
        <section className='mt-7'>
          <div>
            <NotionItem />
          </div>
          <div className='flex w-[160px] h-[150px] border-2 border-solid rounded-xl'>
            <img src="#" alt="게시글사진" id='notionImg'/>
          </div>
        </section>
        <section className='mt-11 flex flex-col gap-5'>
          <div>
            <p className='text-lg font-bold'>멤버 <span>2명</span> / 4명</p>
          </div>
          <div className='flex gap-10 '>
            <div className='flex flex-col text-center gap-1.5'>
              <img src={iconUser} alt="프로필이미지" />
              <p>풋살풋살</p>
            </div>
            <div className='flex flex-col text-center gap-1.5'>
              <img src={iconUser} alt="프로필이미지" />
              <p>김동동</p>
            </div>
          </div>
        </section>
        <section className='mt-14'>
          <div className='flex flex-col gap-4'>
            <p className='text-lg font-bold'>운동장소</p>
            <p className='text-sm text-[#7e7e7e]'>영훈국제중학교</p>
          </div>
          <div>
            {/* 지도 자리 */}
          </div>
        </section>
        <div className='mt-5 flex justify-between'>
          <div className='w-10/12'>
            <Button label="참가 신청하기" size="full" color="green"/>
          </div>
          <div className='flex gap-2.5'>
            <div className='w-8'>
              <button><img src={favorite} alt="좋아요버튼" /></button>
            </div>
            <div className='w-8'>
              <form action="/notion/comments">
                <button><img src={commentIcon} alt="댓글버튼" /></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>  
  );
};

export default NotionPage;