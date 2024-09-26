import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const ProfileEdit = () => {
  return (
    <div className="w-140 min-h-screen bg-white p-3 border flex flex-col justify-center">
      {/* 프로필 수정 링크 상단 */}
      <div className='flex flex-col justify-center items-stretch gap-6'>
        {/* 닉네임 수정 */}
        <Link to={'./nickname'}>
          <div className='flex justify-between items-center px-3 py-2.5 border border-profileBorder rounded'>
            <p className='text-placeholder text-lg'>닉네임</p>
            <img src="/src/assets/LinkIcon.svg" alt="닉네임 수정하기" />
          </div>
        </Link>

        {/* 프로필 사진 수정 */}
        <Link to={'./img'}>
          <div className='flex justify-between items-center px-3 py-2.5 border border-profileBorder rounded'>
            <p className='text-placeholder text-lg'>프로필 사진</p>
            <img src="/src/assets/LinkIcon.svg" alt="프로필 사진 수정하기" />
          </div>
        </Link>

        {/* 프로필 소개글 수정 */}
        <Link to={'./description'}>
          <div className='flex justify-between items-center px-3 py-2.5 border border-profileBorder rounded'>
            <p className='text-placeholder text-lg'>소개글</p>
            <img src="/src/assets/LinkIcon.svg" alt="소개글 수정하기" />
          </div>
        </Link>

        {/* 프로필 지역 수정 */}
        <Link to={'./locate'}>
          <div className='flex justify-between items-center px-3 py-2.5 border border-profileBorder rounded'>
            <p className='text-placeholder text-lg'>지역 선택</p>
            <img src="/src/assets/LinkIcon.svg" alt="지역 선택 수정하기" />
          </div>
        </Link>
      </div>

      {/* 프로필 수정 하단 */}
      {/* 가입 할 때 전용 */}
      <div className='text-center mt-12'>
        <Button
          label='시작하기'
          size='full'
          color='green'
        />
        
        {/* 추후 기능 추가할거라 일단 LINK안넣고 p태그로 했어요 */}
        <p className='mt-8 text-lg text-placeholder'>건너뛰기</p>
      </div>
    </div>
  );
};

export default ProfileEdit;