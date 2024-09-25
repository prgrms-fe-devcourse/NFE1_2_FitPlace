import React from 'react';
import { Link } from 'react-router-dom';

const ProfileEdit = () => {
  return (
    <div className="w-140 min-h-screen bg-white p-3 border">
      <Link to={'./nickname'}>
        <div className='flex justify-between items-center px-3 py-2.5 border border-profileBorder rounded'>
          <p className='text-placeholder text-lg'>닉네임</p>
          <img src="/src/assets/LinkIcon.svg" alt="닉네임" />
        </div>
      </Link>
      <Link to={'./nickname'}>
        <div className='flex justify-between items-center px-3 py-2.5 border border-profileBorder rounded'>
          <p className='text-placeholder text-lg'>닉네임</p>
          <img src="/src/assets/LinkIcon.svg" alt="닉네임" />
        </div>
      </Link>
      <Link to={'./nickname'}>
        <div className='flex justify-between items-center px-3 py-2.5 border border-profileBorder rounded'>
          <p className='text-placeholder text-lg'>닉네임</p>
          <img src="/src/assets/LinkIcon.svg" alt="닉네임" />
        </div>
      </Link>
      <Link to={'./nickname'}>
        <div className='flex justify-between items-center px-3 py-2.5 border border-profileBorder rounded'>
          <p className='text-placeholder text-lg'>닉네임</p>
          <img src="/src/assets/LinkIcon.svg" alt="닉네임" />
        </div>
      </Link>
    </div>
  );
};

export default ProfileEdit;